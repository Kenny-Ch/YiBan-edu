// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate
const MAX_LIMIT = 100
const TOTAL_LEN = 3

/*  参数表：
    weakSubject:{
      "科目": 分数,
      "科目": 分数,
      "科目": 分数
    }     
*/

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('传入参数：',event)
  var keys = []
  for(var key in event.weakSubject){
    keys.push(key)
  }
  var len = 0

  var res = await db.collection('person').limit(TOTAL_LEN).where({
    'perInfo.speciality': _.all([keys[0], keys[1], keys[2]]),
    job: 0,
    isMatchFull: false
  }).get()
  len = res.data.length

  if(len < 3){
    var ids =[]
    for(var item of res.data){
      ids.push(item.openid)
    }
    var res1 = await db.collection('person').limit(TOTAL_LEN-len).where({
      'perInfo.speciality': _.or([
        _.all([keys[0], keys[1]]),
        _.all([keys[0], keys[2]]),
        _.all([keys[1], keys[2]])
      ]),
      openid: _.nin(ids),
      job: 0,
      isMatchFull: false
    }).get()
    len = len + res1.data.length

    if(len < 3){
      for(var item of res1.data){
        ids.push(item.openid)
      }
      var res2 = await db.collection('person').limit(TOTAL_LEN-len).where({
        'perInfo.speciality': _.or([
          _.all([keys[0]]),
          _.all([keys[1]]),
          _.all([keys[2]])
        ]),
        openid: _.nin(ids),
        job: 0,
        isMatchFull: false
      }).get()

      var result = res.data.concat(res1.data)
      result = result.concat(res2.data)
      return result

    } else {
      var result = res.data.concat(res1.data)
      return result
    }
  } else {
    return res.data
  }
  
}
/*
返回值：：

老师的所有个人信息（数组，数组不保证一定有三个老师）
*/