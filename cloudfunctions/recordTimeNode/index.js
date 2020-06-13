// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

/*  参数表：
    "isNew": bool                   //新成员
    "flag": ""                      //用于标记刻录的时间是什么（注册：register、开始匹配：matchBegin、结束匹配：matchEnd、注销账号：loginOut）
    "otherName": ""                 //与之匹配的成员姓名 
    "otherOpenid": ""               //与之匹配的成员openid
    "openid": ""                    //openid
    
    //以下只提供一次
    "time": [],                       //记录的时间（可能是注册老师、删除老师、学生匹配成功、学生解除匹配）
    "job": "",                      //职业
    "name": "",                     //姓名

    //个人信息模块
    
     
*/


// 云函数入口函数
exports.main = async (event, context) => {
  if(event.isNew) {
    try {
      await db.collection('record').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          time: [[event.flag, event.otherName, event.otherOpenid, new Date()]],
          openid: event.openid,
          name: event.name,
          job: event.job
        }
      })
    } catch (e) {
      console.error(e)
    }
  } else {
    try {
      await db.collection('record').where({
        openid: event.openid
      }).update({
        data: {
          time: _.push([event.flag, event.otherName, event.otherOpenid, new Date()]),
        }
      })
    } catch (e) {
      console.error(e)
    }
  }
  
}