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
  console.log('传入参数', event)
  var res = await db.collection('person').where({
    openid: event.selfOpenid
  }).field({
    matchList: true,
    matchWaitList: true,
    name: true
  }).get()
  console.log('主用户：', res.data)

  var list = []
  var waitList = []
  
  for(var i=0; i<res.data[0].matchList.length; i++) {
    if(res.data[0].matchList[i] != event.dropOpenid){
      list.push(res.data[0].matchList[i])
    } else {
      cloud.callFunction({
        name: "recordTimeNode",
        data: {
          flag: "matchEnd",
          isNew: false,
          otherOpenid: event.selfOpenid,
          otherName: res.data[0].name,
          openid: event.dropOpenid
        }
      })
      cloud.callFunction({
        name: "recordTimeNode",
        data: {
          flag: "matchBegin",
          isNew: false,
          otherOpenid: event.dropOpenid,
          otherName: "",
          openid: event.selfOpenid
        }
      })
    }
      
  }
  for(var i=0; i<res.data[0].matchWaitList.length; i++) {
    if(res.data[0].matchWaitList[i] != event.dropOpenid)
      waitList.push(res.data[0].matchWaitList[i])
  }
  console.log('修改后的两列表：',list, waitList)

  await db.collection('person').where({
    openid: event.selfOpenid
  }).update({
    data:{
      matchList: list,
      matchWaitList: waitList
    }
  }).then(console.log)
  .catch(console.error)
  
}