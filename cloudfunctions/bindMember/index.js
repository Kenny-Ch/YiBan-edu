// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("传入的参数：", event)
  // const wxContext = cloud.getWXContext()

  // 参数
  // openid
  // bindingCode
  // tel

  var res = await db.collection('person').where({
    bindingCode: event.bindingCode,
    'perInfo.tel': event.tel
  }).get()

  console.log('根据bindingCode及tel查询的结果：', res)
  if (res.data.length == 0) {
    console.log('未查询到结果')
    return "绑定失败！请重试"
  } else if (res.data.length > 1) {
    console.log("查询到多个匹配成功的个人信息")
    return "绑定失败！请重试"
  } else if (res.data.length == 1) {
    if (!res.data[0].hasOwnProperty('openid') || res.data[0].openid == null || res.data[0].openid == '') {
      db.collection('person').doc(res.data[0]._id).update({
        data: {
          openid: event.openid
        }
      })
      if (event.hasOwnProperty("isSponsor") && event.isSponsor == true) {
        db.collection('networkSchool').where({
          schoolID: res.data[0].schoolID
        }).update({
          data: {
            openid: event.openid
          }
        })
      }
      return '绑定成功！'
    } else if(res.data[0].openid.length>0){
      console.log('已经绑定了账号',res)
      return '授权码已被其他用户绑定'
    } else {
      console.log('未知错误：',res.data[0].openid)
    }
  }


  // var res = await db.collection('person')
  //   .aggregate()
  //   .match({
  //     bindingCode: _.exists(true)
  //   }).end()

  //   console.log('bindingCode对应的person列表：',res)

  // for (let item of res.list) {
  //   console.log("item的bindingcode:", item.bindingCode, "tel:", item.perInfo.tel, "openid:", item.openid)
  //   if (item.bindingCode == event.bindingCode && item.perInfo.tel == event.tel) {
  //     if (item.openid != undefined && item.openid != null && item.openid != "") {
  //       return '授权码已被其他用户绑定'
  //     } else {
  //       db.collection('person').doc(item._id).update({
  //         data: {
  //           openid: event.openid
  //         }
  //       })
  //       if (event.hasOwnProperty("isSponsor") && event.isSponsor == true) {
  //         db.collection('networkSchool').where({
  //           schoolID: item.schoolID
  //         }).update({
  //           data: {
  //             openid: event.openid
  //           }
  //         })
  //       }
  //       return '绑定成功！'
  //     }
  //   }
  // }
  // return '绑定失败！请重试'
}