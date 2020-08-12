// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

/*  参数表：
    stuOpenid:"",             //学生自己的openid
    teaOpenid:"",             //请求匹配的老师的openid  
*/

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('传入参数：',event)
  var res1
  var res2
  //学生待匹配列表更新
  try {
    res1 = await db.collection('person').where({
      openid: event.stuOpenid
    })
    .update({
      data: {
        matchWaitList: _.push([event.teaOpenid])
      },
    })
  } catch(e) {
    console.error(e)
  }

  //老师待匹配列表更新
  try {
    res2 = await db.collection('person').where({
      openid: event.teaOpenid
    })
    .update({
      data: {
        matchWaitList: _.push([event.stuOpenid])
      },
    })
  } catch(e) {
    console.error(e)
  }

  var res = await db.collection('person').where({
    openid: event.teaOpenid
  }).field({
    schoolID:true
  }).get()
  console.log('获取的网校id：',res)

  await db.collection('networkSchool').where({
    schoolID: res.data[0].schoolID
  }).update({
    data:{
      waitMatchStuNum:_.inc(1)
    }
  }).then(console.log)
  .catch(console.error)

  var result ={}
  result.stuRes = res1
  result.teaRes = res2
  return result
}