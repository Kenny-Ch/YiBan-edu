// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

/*  参数表：
        "weakSubject":{             //需要辅导的弱势科目
            "": "",                 //key：科目名字  value：分数
        },
        "willCheckIn": true,        //是否愿意每日打卡
        "willMeeting": true,        //是否接受不定期班会
        "willGetAlong": true,       //是否愿意与志愿者老师好好相处并学到知识
        "habitAndPlan": "",         //学习习惯与学习计划
        "expectation": "",          //对老师的期望
*/

// 云函数入口函数
exports.main = async (event, context) => {
    try {
      return await db.collection('person').where({
        openid: event.openid
      })
        .update({
          data: {
            matchInfo: {
              weakSubject: event.weakSubject,
              willCheckIn: event.willCheckIn,
              willMeeting: event.willMeeting,
              willGetAlong: event.willGetAlong,
              habitAndPlan: event.habitAndPlan,
              expectation: event.expectation
            },
            matchList:[],
            matchWaitList:[]
          },
        })
    } catch (e) {
      console.error(e)
    }
}