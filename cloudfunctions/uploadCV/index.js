// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

/*  参数表：
    "openid": ""                    //openid
    //个人信息模块
    "perInfo": {
        "speciality": [],           //擅长科目
        "introduction": "",         //个人简介
        "stuNum": 0,                //最多可辅导的学生数量
    },
    //简历模块
    "otherInfo": {
      "collegeExamScore":{    //高考成绩
        "Chinese": number
        "Math": number
        "English": number
        "Integration" :number
      }
      comprehend: string      //对以伴服务的了解
      experience: string      //你的学生干部经历
      honor: string           //你的个人荣誉
      interest: string        //你的兴趣爱好
      arrange: boolean        //新学期课程安排是否紧凑
      questionA: string       //问题1
      questionB: string       //问题2
    },

    isCheck: number           //0代表未审核、1代表审核通过、2代表审核未通过

    //该字段只针对老师
    isWeChatReg: boolean       //true代表老师是微信端注册，false代表是绑定的老师
*/

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('传入参数：', event)
  var res = await db.collection('person').where({
    openid: event.openid
  }).field({
    schoolID:true
  }).get()
  db.collection('networkSchool').where({
    schoolID: res.data[0].schoolID
  }).update({
    data:{
      waitCheckTeacherNum:_.inc(1)
    }
  }).then(console.log)
  .catch(console.error)
  try {
    return await db.collection('person').where({
      openid: event.openid
    }).update({
      // data 字段表示需新增的 JSON 数据
      data: {
        'perInfo.speciality': event.perInfo.speciality,
        'perInfo.introduction': event.perInfo.introduction,
        'perInfo.stuNum': event.perInfo.stuNum,
        otherInfo: event.otherInfo,
        isCheck: event.isCheck,
        isWeChatReg: event.isWeChatReg,
        isMatchFull: false
      }
    })
  } catch (e) {
    console.error(e)
  }
}