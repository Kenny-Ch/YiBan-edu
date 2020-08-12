// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const MAX_LIMIT = 100
/*  参数表：
    "openid": "",(选有) 如果提供openid，则表明是获取个人评论， 如果不提供，则表明是获取所有个人评论
*/

// 云函数入口函数
exports.main = async (event, context) => {
  if(event.hasOwnProperty("openid")) {
    //获取个人评论

    // 先取出集合记录总数
    const countResult = await db.collection('comments').where({
      openid: event.openid
    }).count()
    const total = countResult.total

    // 计算需分几次取
    const batchTimes = Math.ceil(total / 100)

    // 承载所有读操作的 promise 的数组
    var comments = []

    for (let i = 0; i < batchTimes; i++) {
      var res = await db.collection('comments').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
        openid: event.openid
      }).get()
      comments = comments.concat(res.data)
    }

    return [comments]
  
  } else {
      //获取所有评论

      // 先取出集合记录总数
      const countResult = await db.collection('comments').count()
      const total = countResult.total
  
      // 计算需分几次取
      const batchTimes = Math.ceil(total / 100)
  
      // 承载所有读操作的 promise 的数组
      var comments = []
  
      for (let i = 0; i < batchTimes; i++) {
        var res = await db.collection('comments').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
        comments =  comments.concat(res.data)
      }
      return [comments]
    
  }
}
/* 返回值为数组，每一行包含以下内容：
    "openid": "",
    "name": "",                     //用户昵称
    "comment": "",                  //用户留言
    "time": "Date()",               //留言时间
    "isAnonymous": true,            //是否匿名
*/