// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

/*  参数表：
    "flag": 0/1                     //判断老师还是学生，0是学生，1是老师
    "openid": ""                    //openid
    "registerDate": Date()          //注册日期
    "job": "",                      //职业
    "name": "",                     //姓名

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
*/

// 云函数入口函数
exports.main = async(event, context) => {
  console.log('传入参数：', event)
  //flag看是学生还是老师
  var flag = event.flag

  switch (flag) {
    //老师
    case 1:
      try {
        return await db.collection('person').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            openid: event.openid,
            registerDate: new Date(),
            job: event.job,
            name: event.name,
            avatarUrl: event.avatarUrl,
            perInfo: event.perInfo,
            matchList: [],
            matchWaitList: []
          }
        })
      } catch (e) {
        console.error(e)
      }
      break;

      //学生
    case 0:
      try {
        return await db.collection('person').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            openid: event.openid,
            registerDate: new Date(),
            job: event.job,
            name: event.name,
            avatarUrl: event.avatarUrl,
            perInfo: event.perInfo,
            matchReject: false,
            matchList: [],
            matchWaitList: []
          }
        })
      } catch (e) {
        console.error(e)
      }
      break;
  }
}