// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async(event, context) => {
  //check = pass 通过
  //check = reject 不通过

  if (event.check == 'pass') {
    await db.collection('person').doc(event.id).update({
      data: {
        isCheck: 1
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