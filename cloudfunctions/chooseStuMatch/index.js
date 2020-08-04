// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

/*  参数表：
    teaOpenid:"",               //老师自己的openid
    stuOpenid:"",              //选择匹配的学生的openid  
    res : 1/0                   //1是接受，0是拒绝
*/

// 云函数入口函数
exports.main = async(event, context) => {
  //学生待匹配列表更新
  var stuAftWaitList = []
  var stuPreWaitList = await db.collection('person').where({
    openid: event.stuOpenid
  }).field({
    matchWaitList: true
  }).get()
  for (let item of stuPreWaitList.data[0].matchWaitList) {
    if (item == event.teaOpenid)
      continue
    else
      stuAftWaitList.push(item)
  }

  //老师待匹配列表更新
  var schoolID = ""
  var teaIsFull = false
  var teaAftWaitList = []
  var teaPreInfo = await db.collection('person').where({
    openid: event.teaOpenid
  }).field({
    matchWaitList: true,
    matchList: true,
    isMatchFull: true,
    schoolID: true,
    'perInfo.stuNum': true
  }).get()
  if (teaPreInfo.data[0].isMatchFull) {
    teaAftWaitList = []
  } else {
    for (let item of teaPreInfo.data[0].matchWaitList) {
      if (item == event.stuOpenid)
        continue
      else
        teaAftWaitList.push(item)
    }
    
  }
  schoolID = teaPreInfo.data[0].schoolID


  if (event.res == 1) { //满意
    if (teaPreInfo.data[0].matchList.length + 1 == teaPreInfo.data[0].perInfo.stuNum) {
      teaIsFull = true
      teaAftWaitList = []
    }
    //学生列表更新
    try {
      res1 = await db.collection('person').where({
          openid: event.stuOpenid
        })
        .update({
          data: {
            matchList: _.push([event.teaOpenid]),
            matchWaitList: stuAftWaitList,
            isMatchFull: true,
            matchReject: false,
            schoolID: schoolID
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

    db.collection('networkSchool').where({
      schoolID: schoolID
    }).update({
      data:{
        studentNum:_.inc(1),
        waitMatchStuNum:_.inc(-1)
      }
    }).then(console.log)
    .catch(console.error)

    await cloud.callFunction({
      name: "recordTimeNode",
      data: {
        flag: "matchBegin",
        isNew: false,
        otherOpenid: event.stuOpenid,
        otherName: "",
        openid: event.teaOpenid
      }
    })
    await cloud.callFunction({
      name: "recordTimeNode",
      data: {
        flag: "matchBegin",
        isNew: false,
        otherOpenid: event.teaOpenid,
        otherName: "",
        openid: event.stuOpenid
      }
    })
    return '通过审核'
  } else { //不满意
    //学生列表更新
    try {
      res1 = await db.collection('person').where({
          openid: event.stuOpenid
        })
        .update({
          data: {
            matchWaitList: stuAftWaitList,
            matchReject: true
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

    db.collection('networkSchool').where({
      schoolID: schoolID
    }).update({
      data:{
        waitMatchStuNum:_.inc(-1)
      }
    }).then(console.log)
    .catch(console.error)
    
    return '退回申请'
  }

}