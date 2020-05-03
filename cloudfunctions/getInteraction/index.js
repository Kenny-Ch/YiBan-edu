// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const MAX_LIMIT = 100
/*  参数表：
    {
      comment: bool         //是否要获取所有评论
      like: bool            //是否获取所有点赞
      store: bool           //是否获取所有收藏

      type: 0/1             //0代表是用户要获得该数据，1代表是文章/视频获得该数据
    }
*/

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('传入参数：', event)

  var data = {}

  if (event.type == 0) { //用户获得，所以用openid
    if (event.comment) {
      // 先取出集合记录总数
      var countResult = await db.collection('interaction').where({
        flag: 'comment',
        openid: event.openid
      }).count()
      var total = countResult.total
      // 计算需分几次取
      var batchTimes = Math.ceil(total / 100)
      // 承载所有读操作的 promise 的数组
      var comments = []

      for (let i = 0; i < batchTimes; i++) {
        var res = await db.collection('interaction').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
          flag: 'comment',
          openid: event.openid
        }).get()
        comments.push(res.data)
      }

      data.comments = comments
    }

    if (event.like) {
      // 先取出集合记录总数
      var countResult = await db.collection('interaction').where({
        flag: 'like',
        openid: event.openid
      }).count()
      var total = countResult.total
      // 计算需分几次取
      var batchTimes = Math.ceil(total / 100)
      // 承载所有读操作的 promise 的数组
      var likes = []

      for (let i = 0; i < batchTimes; i++) {
        var res = await db.collection('interaction').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
          flag: 'like',
          openid: event.openid
        }).get()
        likes.push(res.data)
      }

      data.likes = likes
    }

    if (event.store) {
      // 先取出集合记录总数
      var countResult = await db.collection('interaction').where({
        flag: 'store',
        openid: event.openid
      }).count()
      var total = countResult.total
      // 计算需分几次取
      var batchTimes = Math.ceil(total / 100)
      // 承载所有读操作的 promise 的数组
      var stores = []

      for (let i = 0; i < batchTimes; i++) {
        var res = await db.collection('interaction').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
          flag: 'store',
          openid: event.openid
        }).get()
        stores.push(res.data)
      }

      data.stores = stores
    }
  } else if (event.type == 1) { //文章获得，所以用id
    if (event.comment) {
      // 先取出集合记录总数
      var countResult = await db.collection('interaction').where({
        flag: 'comment',
        id: event.id
      }).count()
      var total = countResult.total
      // 计算需分几次取
      var batchTimes = Math.ceil(total / 100)
      // 承载所有读操作的 promise 的数组
      var comments = []

      for (let i = 0; i < batchTimes; i++) {
        var res = await db.collection('interaction').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
          flag: 'comment',
          id: event.id
        }).get()
        comments.push(res.data)
      }

      data.comments = comments
    }

    if (event.like) {
      // 先取出集合记录总数
      var countResult = await db.collection('interaction').where({
        flag: 'like',
        id: event.id
      }).count()
      var total = countResult.total
      // 计算需分几次取
      var batchTimes = Math.ceil(total / 100)
      // 承载所有读操作的 promise 的数组
      var likes = []

      for (let i = 0; i < batchTimes; i++) {
        var res = await db.collection('interaction').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
          flag: 'like',
          id: event.id
        }).get()
        likes.push(res.data)
      }

      data.likes = likes
    }

    if (event.store) {
      // 先取出集合记录总数
      var countResult = await db.collection('interaction').where({
        flag: 'store',
        id: event.id
      }).count()
      var total = countResult.total
      // 计算需分几次取
      var batchTimes = Math.ceil(total / 100)
      // 承载所有读操作的 promise 的数组
      var stores = []

      for (let i = 0; i < batchTimes; i++) {
        var res = await db.collection('interaction').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
          flag: 'store',
          id: event.id
        }).get()
        stores.push(res.data)
      }

      data.stores = stores
    }
  }
  return deta

}
//返回值：
{
  //以下三种不一定全都有，取决于参数的传入情况
  // comments: [],
  // likes: [],
  // stores: [],
}