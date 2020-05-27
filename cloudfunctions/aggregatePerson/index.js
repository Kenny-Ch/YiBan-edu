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

  return await db.collection('person')
    .aggregate()
    .match({
      _id: event._id
    })
    .lookup({
      from: 'person',
      localField: 'matchList',
      foreignField: 'openid',
      as: 'personList'
    })
    .lookup({
      from: 'person',
      localField: 'matchWaitList',
      foreignField: 'openid',
      as: 'personWaitList'
    }).end()
}