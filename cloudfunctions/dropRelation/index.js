// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

/*  参数表：
    selfOpenid:"",               //需要解除关系的本人openid
    dropOpenid:"",               //解除人的openid
*/

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('传入参数', event)
  var res = await db.collection('person').where({
    openid: event.selfOpenid
  }).field({
    matchList: true,
    matchWaitList: true,
    name: true,
    job: true,
    schoolID:true
  }).get()
  console.log('主用户：', res.data)

  var list = []
  var waitList = []
  
  for(var i=0; i<res.data[0].matchList.length; i++) {
    if(res.data[0].matchList[i] != event.dropOpenid){
      list.push(res.data[0].matchList[i])
    } else {
      await cloud.callFunction({
        name: "recordTimeNode",
        data: {
          flag: "matchEnd",
          isNew: false,
          otherOpenid: event.selfOpenid,
          otherName: res.data[0].name,
          openid: event.dropOpenid
        }
      })
      await cloud.callFunction({
        name: "recordTimeNode",
        data: {
          flag: "matchBegin",
          isNew: false,
          otherOpenid: event.dropOpenid,
          otherName: "",
          openid: event.selfOpenid
        }
      })
    }
      
  }
  for(var i=0; i<res.data[0].matchWaitList.length; i++) {
    if(res.data[0].matchWaitList[i] != event.dropOpenid)
      waitList.push(res.data[0].matchWaitList[i])
  }
  console.log('修改后的两列表：',list, waitList)

  
  if(res.data[0].job == 0){ //学生
    db.collection('person').where({
      openid: event.selfOpenid
    }).update({
      data:{
        matchList: list,
        matchWaitList: waitList,
        schoolID: null
      }
    }).then(console.log)
    .catch(console.error)
    db.collection('networkSchool').where({
      schoolID: res.data[0].schoolID
    }).update({
      data:{
        studentNum:_.inc(-1),
        teacherNum: _.inc(-res.data[0].matchList.length)
      }
    }).then(console.log)
    .catch(console.error)
  } else if(res.data[0].job != 0){
    db.collection('person').where({
      openid: event.selfOpenid
    }).update({
      data:{
        matchList: list,
        matchWaitList: waitList,
        isMatchFull: false
      }
    }).then(console.log)
    .catch(console.error)
    db.collection('networkSchool').where({
      schoolID: res.data[0].schoolID
    }).update({
      data:{
        studentNum:_.inc(-res.data[0].matchList.length)
      }
    }).then(console.log)
    .catch(console.error)
  }
}