// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const MAX_LIMIT = 100
/*  参数表：
    flag: ""        //类别名称（只有8种：知识储备站、学习资料分享、高考心得分享、选课资讯、高校资讯、专业了解、精品课堂、学霸讲座）
*/
// 云函数入口函数
exports.main = async (event, context) => {
  console.log('传入参数：', event)

  var collection
  var flag
  switch (event.flag) {
    case "学科学习法":
      collection = 'knowledge'
      flag = 'trick'
      break;
    case "学习资料分享": 
      collection = 'knowledge'
      flag = 'data'
      break;
    case "高考心得分享": 
      collection = 'knowledge'
      flag = 'thoughts'
      break;
    case "选课资讯": 
      collection = 'collegeInfo'
      flag = 'pickData'
      break;
    case "高校资讯": 
      collection = 'collegeInfo'
      flag = 'schoolData'
      break;
    case "专业了解": 
      collection = 'collegeInfo'
      flag = 'major'
      break;
    case "精品课堂":
      collection = 'inClass'
      flag = 'course'
      break;
    case "学霸讲座":
      collection = 'inClass'
      flag = 'speech'
      break;
    default:
      console.log('不能匹配任何字符串',event.flag)
  }

  // 先取出集合记录总数
  const countResult = await db.collection(collection).where({
    flag: flag
  }).count()
  const total = countResult.total

  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)

  // 承载所有读操作的 promise 的数组
  const result = []

  for (let i = 0; i < batchTimes; i++) {
    var res = await db.collection(collection).where({
      flag: flag
    }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    for (item of res.data) {
      item.flag = flag
      item.collection = collection
      result.push(item)
    }
  }

  return result
}