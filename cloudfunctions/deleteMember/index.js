// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

/*  参数表：
    //老师学生二选一
    teaOpenid:"",               //老师的openid 
    stuOpenid:"",               //学生的openid  
    type : ""  stu或tea         //stu是学生，tea是老师
*/

// 云函数入口函数
exports.main = async (event, context) => {

  if(event.type == "stu") { //删除学生信息
    var res = await db.collection('person').where({
      openid: event.stuOpenid
    }).field({
      matchList: true,
      matchWaitList: true
    }).get()

    if(res.data[0].matchWaitList.length != 0){
      for(let openid in res.data[0].matchWaitList){
        cloud.callFunction({
          name: 'dropRelation',
          data: {
            selfOpenid: openid,
            dropOpenid: event.stuOpenid
          }
        })
      }
    }
    if(res.data[0].matchList.length != 0){
      for(let openid in res.data[0].matchList){
        cloud.callFunction({
          name: 'dropRelation',
          data: {
            selfOpenid: openid,
            dropOpenid: event.stuOpenid
          }
        })
      }
    }
    
    try {
      return await db.collection('person').where({
        openid: event.stuOpenid
      }).remove()
    } catch(e) {
      console.error(e)
    }
  } 
  else if (event.type == "tea") { //删除老师信息
    var res = await db.collection('person').where({
      openid: event.teaOpenid
    }).field({
      matchList: true,
      matchWaitList: true
    }).get()

    if(res.data[0].matchWaitList.length != 0){
      for(let openid in res.data[0].matchWaitList){
        cloud.callFunction({
          name: 'dropRelation',
          data: {
            selfOpenid: openid,
            dropOpenid: event.teaOpenid
          }
        })
      }
    }
    if(res.data[0].matchList.length != 0){
      for(let openid in res.data[0].matchList){
        cloud.callFunction({
          name: 'dropRelation',
          data: {
            selfOpenid: openid,
            dropOpenid: event.teaOpenid
          }
        })
      }
    }
    
    try {
      return await db.collection('person').where({
        openid: event.teaOpenid
      }).remove()
    } catch(e) {
      console.error(e)
    }
  }
  
}