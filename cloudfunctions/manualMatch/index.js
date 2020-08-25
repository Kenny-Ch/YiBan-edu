// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

/*  参数表：
    teaTel:         //老师电话
    stuTel:         //学生电话
*/


// 云函数入口函数
exports.main = async (event, context) => {
  console.log('传入的参数：', event)
  
  //学生信息
  var stures = await db.collection('person').where({
    'perInfo.tel': event.stuTel
  }).field({
    openid: true,
    matchList: true,
    matchWaitList: true
  }).get()

  //老师信息
  var teares = await db.collection('person').where({
    'perInfo.tel': event.teaTel
  }).field({
    openid: true,
    matchList: true,
    perInfo: true,
    isCheck: true,
    otherInfo: true
  }).get()

  //学生条件判断
  if(stures.data.length == 0 || !stures.data[0].openid) {
    return "学生不存在或出现错误";
  } else if(stures.data[0].matchList.length != 0 || stures.data[0].matchWaitList.length != 0) {
    return "请先解除学生当前和已匹配或待匹配老师的关系后，再进行匹配";
  }

  //老师条件判断
  if(teares.data.length == 0 || !teares.data[0].openid) {
    return "教师不存在或出现错误";
  } else if(teares.data[0].isCheck != 1 || !teares.data[0].otherInfo) {
    return "该教师目前未审核通过或未提交审核信息"
  } else if(teares.data[0].matchWaitList.length+1 > teares.data[0].perInfo.stuNum) {
    return "该教师的匹配学生已达教师预期学生总人数"
  }

  //匹配
  var rr = await cloud.callFunction({
    name: "chooseStuMatch",
    data: {
      res: 1,
      isNew: false,
      teaOpenid: teares.data[0].openid,
      stuOpenid: stures.data[0].openid
    }
  })

  console.log(rr)
  return "匹配成功"
  
}