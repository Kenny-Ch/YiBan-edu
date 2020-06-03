// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    return await db.collection('person').doc(event._id)
      .update({
        data: {
          'matchWaitList': event.matchWaitList
        }
      })
  } catch (e) {
    console.log(e)
  }

}