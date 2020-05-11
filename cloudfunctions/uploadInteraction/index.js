// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

/*  参数表：
   //interaction(交互：评论、点赞、收藏)
{
    //评论类的
    "flag": "comment",        //类别：评论
    "userOpenid": "",         //用户的openid
    "imgUrl": "",             //头像链接
    "nickname": "",           //昵称
    "contextId": "",          //文章/视频id号
    "comment": "",            //评论

    //或者
    //点赞类
    "flag": "like",           //类别：点赞
    "userOpenid": "",         //用户的openid
    "contextId": "",          //文章/视频id号

    //或者
    //收藏类
    "flag": "store",          //类别：收藏
    "userOpenid": "",         //用户openid
    "contextId": "",          //文章/视频id号
}
*/

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("传入参数：", event)
  var flag = event.flag
  if(flag == 'comment'){
    try {
      return await db.collection('interaction').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          flag: event.flag,
          userOpenid: event.userOpenid,
          imgUrl: event.imgUrl,
          nickname: event.nickname,
          contextId: event.contextId,
          comment: event.comment,
        }
      })
    } catch (e) {
      console.error(e)
    }
  } else if(flag == 'like'){
    try {
      return await db.collection('interaction').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          flag: event.flag,
          contextId: event.contextId,
          comment: event.comment,
          userOpenid: event.userOpenid,
        }
      })
    } catch (e) {
      console.error(e)
    }
  } else if(flag == 'store') {
    try {
      return await db.collection('interaction').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          flag: event.flag,
          contextId: event.contextId,
          comment: event.comment,
          userOpenid: event.userOpenid,
        }
      })
    } catch (e) {
      console.error(e)
    }
  }
  
}