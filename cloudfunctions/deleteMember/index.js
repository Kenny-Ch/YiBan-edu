// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

/*  参数表：
    openid:"",               //被删除成员的openid  
*/

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("传入参数", event)

    var res = await db.collection('person').where({
      openid: event.openid
    }).field({
      matchList: true,
      matchWaitList: true
    }).get()
    console.log("删除成员的信息", res.data[0])

    if(res.data[0].matchWaitList.length != 0){
      for(let i=0; i<res.data[0].matchWaitList.length; i++){
        cloud.callFunction({
          name: 'dropRelation',
          data: {
            selfOpenid: res.data[0].matchWaitList[i],
            dropOpenid: event.openid
          }
        })
      }
    }
    if(res.data[0].matchList.length != 0){
      for(let i=0; i<res.data[0].matchList.length; i++){
        cloud.callFunction({
          name: 'dropRelation',
          data: {
            selfOpenid: res.data[0].matchList[i],
            dropOpenid: event.openid
          }
        })
      }
    }
    
    try {
      await db.collection('person').where({
        openid: event.openid
      }).remove()
      return "删除成功（不保证关联的其他成员相关信息删除成功）"
    } catch(e) {
      console.error(e)
      return {msg:'删除失败',errMsg:e}
    }
  
}
