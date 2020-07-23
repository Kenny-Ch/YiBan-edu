// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async(event, context) => {
  console.log("传入的参数：",event)
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
    console.log("item的bingdingcode:",item.bindingCode,"tel:",item.perInfo.tel,"openid:",item.openid)
    if (item.bindingCode == event.bindingCode && item.perInfo.tel == event.tel) {
      if (item.openid!=undefined&&item.openid!=null&&item.openid != "") {
        return '授权码已被其他用户绑定'
      } else {
        db.collection('person').doc(item._id).update({
          data: {
            openid: event.openid
          }
        })
        if(event.hasOwnProperty("isSponsor")&&event.isSponsor==true){
          db.collection('networkSchool').where({
            schoolID: item.schoolID
          }).update({
            data: {
              openid: event.openid
            }
          })
        }
        return '绑定成功！'
      }
    }
  }
  return '绑定失败！请重试'
}