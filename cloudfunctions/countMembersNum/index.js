// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const MAX_LIMIT = 100
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("传入的参数为：",event)
  if(!event.hasOwnProperty("schoolID")){
   // 先取出集合记录总数
   const countResult = await db.collection('networkSchool').count()
   const total = countResult.total
 
   // 计算需分几次取
   const batchTimes = Math.ceil(total / 100)
 
   // 承载所有读操作的 promise 的数组
   const schools = []
 
   for (let i = 0; i < batchTimes; i++) {
     var res = await db.collection('networkSchool').skip(i * MAX_LIMIT).limit(MAX_LIMIT).field({schoolID:true}).get()
     for(item of res.data){
       schools.push(item.schoolID)
     }
   }

  for(let i=0; i<schools.length; i++) {
    var stuRes = await db.collection('person').where({
      job: 0,
      schoolID: schools[i]
    }).count()
    var teaRes = await db.collection('person').where({
      job: 1,
      schoolID: schools[i],
      isCheck:1,
      openid: _.neq("")
    }).count()
    var waitTeaRes = await db.collection('person').where({
      job: 1,
      schoolID: schools[i],
      isCheck:_.neq(1)
    }).count()
    var waitMatchStuRes = await db.collection('person').where({
      job: 0,
      'matchInfo.schoolID': schools[i],
      matchWaitList: _.size(1)
    }).count()
    

    await db.collection('networkSchool').where({
      schoolID: schools[i]
    }).update({
      data:{
        // studentNum: _.inc(stuRes.total),
        // volunteerNum: _.inc(teaRes.total),
        studentNum: stuRes.total,
        volunteerNum: teaRes.total,
        waitCheckTeacherNum: waitTeaRes.total,
        waitMatchStuNum: waitMatchStuRes.total
      }
    })
    console.log("schoolID:",schools[i],"学生数量:",stuRes.total,"老师数量:",teaRes.total,"待审核老师数量：",waitTeaRes.total,"待匹配学生数量：",waitMatchStuRes.total)
  }
} else {
  var stuRes = await db.collection('person').where({
    job: 0,
    schoolID: event.schoolID
  }).count()
  var teaRes = await db.collection('person').where({
    job: 1,
    schoolID: event.schoolID,
    isCheck:1,
    openid:_.neq("")
  }).count()
  var waitTeaRes = await db.collection('person').where({
    job: 1,
    schoolID: event.schoolID,
    isCheck: 0,
    otherInfo: _.exists(true)
  }).count()
  var waitMatchStuRes = await db.collection('person').where({
    job: 0,
    'matchInfo.schoolID': event.schoolID,
    matchWaitList: _.size(1)
  }).count()

  var waitMatchStu = await db.collection('person').where({
    job: 0,
    'matchInfo.schoolID': event.schoolID,
    matchWaitList: _.size(1)
  }).get()
  console.log("待匹配学生数组：",waitMatchStu)
  console.log("schoolID:",event.schoolID,"学生数量:",stuRes.total,"老师数量:",teaRes.total,"待审核老师数量：",waitTeaRes.total,"待匹配学生数量：",waitMatchStuRes.total)

  await db.collection('networkSchool').where({
    schoolID: event.schoolID
  }).update({
    data:{
      // studentNum: _.inc(stuRes.total),
      // volunteerNum: _.inc(teaRes.total),
      studentNum: stuRes.total,
      volunteerNum: teaRes.total,
      waitCheckTeacherNum: waitTeaRes.total,
      waitMatchStuNum: waitMatchStuRes.total
    }
  })

  return {
    studentNum: stuRes.total,
    volunteerNum: teaRes.total,
    waitCheckTeacherNum: waitTeaRes.total,
    waitMatchStuNum: waitMatchStuRes.total
  }
}

}