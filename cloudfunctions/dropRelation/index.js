// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

/*  参数表：
    selfOpenid:"",               //需要解除关系的本人openid
    dropOpenid:"",               //解除人的openid
*/

// 云函数入口函数
exports.main = async (event, context) => {
  var res = db.collection('person').where({
    openid: event.selfOpenid
  }).field({
    matchList: true,
    matchWaitList: true
  }).get()

  var list = []
  var waitList = []
  
  for(var i=0; i<res.data[0].matchList.length; i++) {
    if(res.data[0].matchList[i] != event.dropOpenid)
      list.push(res.data[0].matchList[i])
  }
  for(var i=0; i<res.data[0].matchWaitList.length; i++) {
    if(res.data[0].matchWaitList[i] != event.dropOpenid)
      waitList.push(res.data[0].matchWaitList[i])
  }

  return await db.collection('person').where({
    openid: event.selfOpenid
  }).update({
    data:{
      matchList: list,
      matchWaitList: waitList
    }
  }).then(console.log)
  .catch(console.error)
  
}