// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
const MAX_LIMIT = 100

/*  参数表：
    flag: ""        //分三类 submitQue：个人中心-意见反馈  usingQue：个人中心-常见问题   pressQue:心灵解压馆-压力疏导-常见问题解答
*/

// 云函数入口函数
exports.main = async (event, context) => {
  //flag看是需要的问题区的哪种问题类型
  //submitQue：个人中心-意见反馈  usingQue：个人中心-常见问题   pressQue:心灵解压馆-压力疏导-常见问题解答
  var flag = event.flag

  if(flag == 'submitQue') {
    //submitQue：个人中心-意见反馈
    // 先取出集合记录总数
    const countResult = await db.collection('question').where({
      flag: event.flag
    }).count()
    const total = countResult.total

    // 计算需分几次取
    const batchTimes = Math.ceil(total / 100)

    // 承载所有读操作的 promise 的数组
    const questions = []

    for (let i = 0; i < batchTimes; i++) {
      var res = await db.collection('question').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
        flag: event.flag
      })
      .get()
      questions.push(res.data)
    }

    return questions

  } else if (flag == 'usingQue') {
    //usingQue：个人中心-常见问题
    // 先取出集合记录总数
    const countResult = await db.collection('question').where({
      flag: event.flag
    }).count()
    const total = countResult.total

    // 计算需分几次取
    const batchTimes = Math.ceil(total / 100)

    // 承载所有读操作的 promise 的数组
    var questions = []

    for (let i = 0; i < batchTimes; i++) {
      var res = await db.collection('question').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
        flag: event.flag
      }).get()
      questions = questions.concat(res.data)
    }

    return questions

  } else if (flag == 'pressQue') {
    //pressQue:心灵解压馆-压力疏导-常见问题解答
    // 先取出集合记录总数
    const countResult = await db.collection('question').where({
      flag: event.flag
    }).count()
    const total = countResult.total

    // 计算需分几次取
    const batchTimes = Math.ceil(total / 100)

    // 承载所有读操作的 promise 的数组
    var questions = []

    for (let i = 0; i < batchTimes; i++) {
      var res = await db.collection('question').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
        flag: event.flag
      }).get()
      questions = questions.concat(res.data)
    }

    return questions
    
  }
}
/*
  //(个人中心-意见反馈)
    "flag": "submitQue",
    "question": "",                 //意见
    "tel": "",                      //联系方式
    "hasRead": false,               //是否已读


    //或者
    //(个人中心-常见问题)
    "flag": "usingQue",
    "question": [],                 //问题
    "answer": [],                   //答案


    //或者
    //（心灵解压馆-压力疏导-常见问题解答）
    "flag": "pressQue",
    "tag": ""                       //分类标签
    "question": "",                 //问题
    "answer": [],                   //答案
    "advisor": [],                  //回答者
 */