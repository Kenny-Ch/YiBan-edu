// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("传入的参数为：", event)

  var res = await db.collection('person').where({
    registerDate: _.exists(false)
  }).update({
    data:{
      registerDate: new Date()
    }
  })

  var res = await db.collection('networkSchool').where({
    date: _.exists(false)
  }).update({
    data:{
      date: new Date()
    }
  })

  return res;
}