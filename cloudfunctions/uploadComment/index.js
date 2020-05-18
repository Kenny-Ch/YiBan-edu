// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

/*  参数表：
    "openid": "",
    "name": "",                     //用户昵称
    "comment": "",                  //用户留言
    "time": "Date()",               //留言时间
    "isAnonymous": true,            //是否匿名
*/

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('comments').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        openid: event.openid,
        name: event.name,
        comment: event.comment,
        imgUrl: evetn.imgUrl,
        time: new Date(),
        isAnonymous: event.isAnonymous
      }
    })
  } catch (e) {
    console.error(e)
  }
}