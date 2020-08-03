// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command


// 云函数入口函数
exports.main = async(event, context) => {
  console.log('传入的参数:',event)
  const wxContext = cloud.getWXContext()

  var match_lookup = {
    from: 'person',
    localField: 'matchList',
    foreignField: 'openid',
    as: 'personList'
  }

  var matchWait_lookup = {
    from: 'person',
    localField: 'matchWaitList',
    foreignField: 'openid',
    as: 'personWaitList'
  }

  var res = await db.collection('person').where({
    _id: event._id
  }).get()

  if(res.data[0].matchList.length == 0) {
    if(res.data[0].matchWaitList.length == 0) {

      //老师的匹配列表和待匹配列表都为空
      var info = res.data[0]
      delete(info['matchList'])
      delete(info['matchWaitList'])
      info.personList = []
      info.personWaitList = []
      return {
        list:[info]
      }

    } else {

      //老师的匹配列表为空、待匹配列表不为空
      return await db.collection('person').aggregate()
      .match({
        _id: event._id
      })
      .lookup(matchWait_lookup).end()

    }
  } else {
    if(res.data[0].matchWaitList.length == 0) {

      //老师的匹配列表不为空、待匹配列表都为空
      return await db.collection('person').aggregate()
      .match({
        _id: event._id
      })
      .lookup(match_lookup).end()

    } else {

      //老师的匹配列表和待匹配列表都不为空
      return await db.collection('person').aggregate()
      .match({
        _id: event._id
      })
      .lookup(match_lookup).lookup(matchWait_lookup).end()

    }
  }

  
}