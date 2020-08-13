// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const MAX_LIMIT = 100


// 云函数入口函数
exports.main = async (event, context) => {
  console.log('传入的参数是：', event)

  const countResult = await db.collection('networkSchool').count()
  const total = countResult.total

  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)

  // 承载所有读操作的 promise 的数组
  var schools = []

  for (let i = 0; i < batchTimes; i++) {
    var res = await db.collection('networkSchool').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    schools = schools.concat(res.data)
  }
  return [schools]

}