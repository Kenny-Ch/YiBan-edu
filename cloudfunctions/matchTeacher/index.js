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
    "schoolID":""               //网校ID
*/

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('传入参数：', event)
  var schoolID = event.schoolID
  var keys = []
  for (var key in event.weakSubject) {
    keys.push(key)
  }
  var len = 0
  var markDate = new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000)
  var result = []
  var ids = [""]

  //超过十天未匹配、全匹配
  var res = await db.collection('person').limit(TOTAL_LEN - len).where({
    job: 1,
    isCheck: 1,
    matchList: _.size(0),
    registerDate: _.lt(markDate),
    openid: _.nin(ids),
    schoolID: schoolID,
    'perInfo.speciality': _.all(keys)
  }, ).get()
  len = res.data.length
  result = result.concat(res.data)
  console.log('第一类匹配情况(超过十天未匹配、全匹配)：', res.data, 'ids(未添加本次的id)', ids, '匹配总人数：', len)

  if (len < 3) {
    //超过十天未匹配，部分匹配
    for (var item of res.data) {
      ids.push(item.openid)
    }

    var res1 = await db.collection('person').limit(TOTAL_LEN - len).where({
      job: 1,
      isCheck: 1,
      matchList: _.size(0),
      registerDate: _.lt(markDate),
      openid: _.nin(ids),
      schoolID: schoolID,
      'perInfo.speciality': _.or([
        _.all([keys[0], keys[1]]),
        _.all([keys[0], keys[2]]),
        _.all([keys[1], keys[2]])
      ])
    }, ).get()
    len = len + res1.data.length
    result = result.concat(res1.data)
    console.log('第二类匹配情况(超过十天未匹配，两个符合匹配)：', res1.data, 'ids(未添加本次的id)', ids, '匹配总人数：', len)

    if (len < 3) {
      for (var item of res1.data) {
        ids.push(item.openid)
      }

      //超过十天未匹配，单个匹配
      var res2 = await db.collection('person').limit(TOTAL_LEN - len).where({
        job: 1,
        isCheck: 1,
        matchList: _.size(0),
        registerDate: _.lt(markDate),
        openid: _.nin(ids),
        schoolID: schoolID,
        'perInfo.speciality': _.or([
          _.all([keys[0]]),
          _.all([keys[1]]),
          _.all([keys[2]])
        ])
      }, ).get()
      len = len + res2.data.length
      result = result.concat(res2.data)
      console.log('第三类匹配情况(超过十天未匹配，单个匹配)：', res2.data, 'ids(未添加本次的id)', ids, '匹配总人数：', len)

      if (len < 3) {
        for (var item of res2.data) {
          ids.push(item.openid)
        }

        //未超过十天匹配成功，全匹配
        var res3 = await db.collection('person').limit(TOTAL_LEN).where({
          'perInfo.speciality': _.all(keys),
          job: 1,
          isCheck: 1,
          openid: _.nin(ids),
          schoolID: schoolID,
          isMatchFull: false
        }).get()
        len = len + res3.data.length
        result = result.concat(res3.data)
        console.log('第四类匹配情况（未超过十天匹配成功，全匹配）：', res3.data, 'ids(未添加本次的id)', ids, '匹配总人数：', len)

        if (len < 3) {
          for (var item of res3.data) {
            ids.push(item.openid)
          }
          //未超过十天匹配成功，部分匹配
          var res4 = await db.collection('person').limit(TOTAL_LEN - len).where({
            'perInfo.speciality': _.or([
              _.all([keys[0], keys[1]]),
              _.all([keys[0], keys[2]]),
              _.all([keys[1], keys[2]])
            ]),
            isCheck: 1,
            openid: _.nin(ids),
            job: 1,
            schoolID: schoolID,
            isMatchFull: false
          }).get()
          len = len + res4.data.length
          result = result.concat(res4.data)
          console.log('第五类匹配情况（未超过十天匹配成功，两个匹配）：', res4.data, 'ids(未添加本次的id)', ids, '匹配总人数：', len)

          if (len < 3) {
            for (var item of res4.data) {
              ids.push(item.openid)
            }
            //未超过十天匹配成功，仅匹配一项
            var res5 = await db.collection('person').limit(TOTAL_LEN - len).where({
              'perInfo.speciality': _.or([
                _.all([keys[0]]),
                _.all([keys[1]]),
                _.all([keys[2]])
              ]),
              openid: _.nin(ids),
              job: 1,
              isCheck: 1,
              schoolID: schoolID,
              isMatchFull: false
            }).get()
            result = result.concat(res5.data)
            console.log('第六类匹配情况（未超过十天匹配成功，仅匹配一项）：', res5.data, '不参与匹配的openids(未添加本次的id)', ids, '匹配总人数：', len + res5.data.length)
          }
        }
      }
    }
  }

  return result
}
/*
返回值：：

老师的所有个人信息（数组，数组不保证一定有三个老师）
*/