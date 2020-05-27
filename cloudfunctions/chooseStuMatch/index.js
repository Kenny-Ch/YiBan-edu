// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

/*  参数表：
    teaOpenid:"",               //老师自己的openid
    stuaOpenid:"",              //选择匹配的学生的openid  
    res : 1/0                   //1是接受，0是拒绝
*/

// 云函数入口函数
exports.main = async (event, context) => {
  //学生待匹配列表更新
  var stuAftWaitList = []
  var stuPreWaitList = await db.collection('person').where({
    openid: stuOpenid
  }).field({
    matchWaitList: true
  }).get()
  for (let item in stuPreWaitList.data.matchWaitList) {
    if (item == teaOpenid)
      continue
    else
      stuAftWaitList.push(item)
  }

  //老师带匹配列表更新
  var teaIsFull = false
  var teaAftWaitList = []
  var teaPreInfo = await db.collection('person').where({
    openid: teaOpenid
  }).field({
    matchWaitList: true,
    matchList: true,
    isMatchFull: true
  }).get()
  if(teaPreInfo.data[0].isMatchFull){
    teaAftWaitList = []
  }else{
    for (let item in teaPreInfo.data.matchWaitList) {
      if (item == stuOpenid)
        continue
      else
        teaAftWaitList.push(item)
    }
    if(teaPreInfo.data[0].matchList.length == 2){
      teaIsFull = true
    }
  }
  

  if (event.res == 1) {//满意

    //学生列表更新
    try {
      res1 = await db.collection('person').where({
          openid: event.stuOpenid
        })
        .update({
          data: {
            matchList: _.push([event.teaOpenid]),
            matchWaitList: stuAftWaitList,
            isMatchFull: true
          },
        })
    } catch (e) {
      console.error(e)
    }

    //老师待匹配列表更新
    try {

      res2 = await db.collection('person').where({
          openid: event.teaOpenid
        })
        .update({
          data: {
            matchList: _.push([event.stuOpenid]),
            matchWaitList: teaAftWaitList,
            isMatchFull: teaIsFull
          },
        })
    } catch (e) {
      console.error(e)
    }
  }else{//不满意

    //学生列表更新
    try {
      res1 = await db.collection('person').where({
          openid: event.stuOpenid
        })
        .update({
          data: {
            matchWaitList: stuAftWaitList
          },
        })
    } catch (e) {
      console.error(e)
    }

    //老师待匹配列表更新
    try {

      res2 = await db.collection('person').where({
          openid: event.teaOpenid
        })
        .update({
          data: {
            matchWaitList: teaAftWaitList,
          },
        })
    } catch (e) {
      console.error(e)
    }
  }

}