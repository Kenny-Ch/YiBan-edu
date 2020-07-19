// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async(event, context) => {
  // const wxContext = cloud.getWXContext()

  // 参数
  // openid
  // bindingCode
  // tel

  var res = await db.collection('person')
    .aggregate()
    .match({
      bindingCode: _.exists(true)
    }).end()

  for (let item of res.list) {
    if (item.bindingCode == event.bindingCode && item.perInfo.tel == event.tel) {
      if (item.openid != "") {
        return '授权码已被其他用户绑定'
      } else {
        db.collection('person').doc(item._id).update({
          data: {
            openid: event.openid
          }
        })
        return '绑定成功！'
      }
    }
  }
  return '绑定失败！请重试'
}