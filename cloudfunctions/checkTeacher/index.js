// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate

// 云函数入口函数
exports.main = async(event, context) => {
  console.log(event)
  //check = pass 通过
  //check = reject 不通过
  //id 对应教师的记录id

  if (event.check == 'pass') {
    var res = await db.collection('person').doc(event.id).field({
      schoolID:true,
      registerDate: true
    }).get()
    var schID = res.data.schoolID
    var date = res.data.registerDate
    if(date)
      console.log("日期：",date,date.getTime())
    db.collection('networkSchool').where({
      schoolID: schID
    }).update({
      data:{
        waitCheckTeacherNum:_.inc(-1)
      }
    }).then(console.log)
    .catch(console.error)
    var yibanID = "YB"+schID+date.getTime()

    await db.collection('person').doc(event.id).update({
      data: {
        isCheck: 1,
        yibanID: yibanID
      }
    }).then(function(res) {
      return '通过审核'
    }).catch(function(err) {
      return err
    })
  } else if (event.check == 'reject') {
    await db.collection('person').doc(event.id).update({
      data: {
        isCheck: 2
      }
    }).then(function(res) {
      return '退回申请'
    }).catch(function(err) {
      return err
    })
  } else {
    return 'error'
  }
}