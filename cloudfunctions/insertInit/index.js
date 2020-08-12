// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("传入的参数为：", event)

  var res = await db.collection('person').where({
    registerDate: _.exists(false)
  }).update({
    data: {
      registerDate: new Date()
    }
  })


  var countResult = await db.collection('person').where({
    registerDate: _.gt(new Date(new Date().getTime() - 60 * 60 * 1000)),
    job: 1
  }).count()
  const total = countResult.total
  const batchTimes = Math.ceil(total / 100)
  var data = []
  for (let i = 0; i < batchTimes; i++) {
    var res = await db.collection('person').where({
      registerDate: _.gt(new Date(new Date().getTime() - 60 * 60 * 1000)),
      job: 1,
      schoolID: _.exists(true)
    }).field({
      _id: true,
      registerDate: true,
      schoolID: true
    }).get()

    data = data.concat(res.data)
  }
  console.log(data)

  var nummap = {}
  for (let i = 0; i < data.length; i++) {
    var d = data[i].registerDate.getTime()
    if (!idmap[d]) {
      nummap[d] = 1
    } else {
      nummap[d]++
    }
  }
  for (let key in nummap) {
    if (nummap[key] == 1) {
      delete(nummap[key])
    }
  }

  for (let key in nummap) {
    console.log("重复的时间戳：",key)
    var count = 1
    for (let i = 0; i < data.length; i++) {
      if (data[i].registerDate.getTime() == key) {
        await db.collection('person').where({
          _id: data[i]._id
        }).update({
          data: {
            yibanID: "YB" + data[i].schoolID + key + count
          }
        })
        count++
        console.log("YB" + data[i].schoolID + key + count)
      }
    }
  }

  var res = await db.collection('networkSchool').where({
    date: _.exists(false)
  }).update({
    data: {
      date: new Date()
    }
  })

  return res;
}