// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const MAX_LIMIT = 100

/*  参数表：
    "openid": "", 个人的openid
*/

// 云函数入口函数
exports.main = async (event, context) => {  
  console.log('传入的参数是：',event)
  if(event.hasOwnProperty('selection')) {
    const countResult = await db.collection('person').where(event.selection).count()
   const total = countResult.total
 
   // 计算需分几次取
   const batchTimes = Math.ceil(total / 100)
 
   // 承载所有读操作的 promise 的数组
   const persons = []
 
   for (let i = 0; i < batchTimes; i++) {
     var res = await db.collection('person').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where(event.selection).get()
       persons.push(res.data)
   }
   return persons
  } else {
    var res = await db.collection('person').where({
      openid: event.openid
    }).get()
    return res.data
  }
  
}
/* 返回值:
  {
    "openid": "",                   //openid
    "job": "",                      //职业
    "name": "",                     //姓名
    "registerDate": "",             //注册日期

    //个人信息模块
    "perInfo": {
        //老师
        "gender": "",               //性别
        "school": "",               //所在学校
        "grade": "",                //年级
        "major": "",                //专业
        "speciality": [],           //擅长科目
        "introduction": "",         //个人简介
        "wechat": "",               //微信号
        "tel": "",                  //电话号码
        "stuNum": 0,                //最多可辅导的学生数量
        
        //或者
        //学生
        "gender": "",               //性别
        "school": "",               //所在学校
        "grade": "",                //年级
        "area": [],                 //地区
        "qq": "",                   //QQ
        "tel": "",                  //电话号码
        "email": "",                //邮箱（选填）

    },

    //学生提供匹配所需要的信息
    "matchInfo": {
        "weakSubject":{             //需要辅导的弱势科目
            "": "",                 //key：科目名字  value：分数
        },
        "willCheckIn": true,        //是否愿意每日打卡
        "willMeeting": true,        //是否接受不定期班会
        "willGetAlong": true,       //是否愿意与志愿者老师好好相处并学到知识
        "habitAndPlan": "",         //学习习惯与学习计划
        "expectation": "",          //对老师的期望
    }
}
 */