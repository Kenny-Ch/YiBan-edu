// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

/*  参数表：
    //(个人中心-意见反馈)
    "flag": "submitQue",
    "question": "",                 //意见
    "tel": "",                      //联系方式
    "hasRead": false,               //是否已读


    //或者
    //(个人中心-常见问题)
    "flag": "usingQue",
    "officialAnswer": ""            //官方答案
    "question": [],                 //问题
    "answer": [],                   //答案


    //或者
    //（心灵解压馆-压力疏导-常见问题解答）
    "flag": "pressQue",
    "question": "",                 //问题
    "answer": "",                   //答案
    "advisor": "",                  //回答者
*/

// 云函数入口函数
exports.main = async (event, context) => {
  //flag看是提交的问题区的哪种问题类型
  //submitQue：个人中心-意见反馈  usingQue：个人中心-常见问题   pressQue:心灵解压馆-压力疏导-常见问题解答
  var flag = event.flag

  if(flag.equals('submitQue')) {
    //个人中心-意见反馈
      try {
        return await db.collection('question').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            flag: event.flag,
            question: event.question,
            tel: event.tel,
            hasRead: false
          }
        })
      } catch (e) {
        console.error(e)
      } 
  } else if (flag.equals('usingQue')) {
    //个人中心-常见问题
    try {
      return await db.collection('question').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          flag: event.flag,
          officialAnswer: event.officialAnswer,
          question: event.question,
          answer: event.answer
        }
      })
    } catch (e) {
      console.error(e)
    } 
  } else if (flag.equals('pressQue')) {
    //心灵解压馆-压力疏导-常见问题解答
    try {
      return await db.collection('question').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          flag: event.flag,
          question: event.question,
          answer: event.answer,
          advisor: event.advisor
        }
      })
    } catch (e) {
      console.error(e)
    } 
  }
}