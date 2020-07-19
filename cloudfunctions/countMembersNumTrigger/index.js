// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const MAX_LIMIT = 100
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {console.log(event)
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
      schoolID: schools[i]
    }).count()
    

    db.collection('networkSchool').where({
      schoolID: schools[i]
    }).update({
      data:{
        studentNum: _.inc(stuRes.total),
        volunteerNum: _.inc(teaRes.total)
      }
    })

    console.log("schoolID:",schools[i],"studentNum:",stuRes.total,"teacherNum:",teaRes.total)
  }

}