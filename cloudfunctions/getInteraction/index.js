// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
const MAX_LIMIT = 100
/*  参数表：
    {
      comment: bool         //是否要获取所有评论
      like: bool            //是否获取所有点赞
      store: bool           //是否获取所有收藏

      id: string            //如果是文章视频，则填写该字段
      openid: string        //如果是用户，则填写该字段

      type: 0/1/2             //0代表是用户要获得该数据，1代表是文章/视频获得该数据，
                              //2代表是获得所有交互（要评论、点赞、收藏请按上面的bool传参，同时要多附加四个参数：inteType：交互类型（tree、article、video） check:0/1/2 (0未审核1审核通过2审核不通过) 获得页码位数：page，每一页的总条数num, 类型。例子：第二页（page=2），每一页10条(num=10)，则会返回第11-20条数据）
    }
*/

// 云函数入口函数
exports.main = async(event, context) => {
  console.log('传入参数：', event)

  var data = {}

  if (event.type == 0) { //用户获得，所以用openid
    if (event.comment) {
      // 先取出集合记录总数
      var countResult = await db.collection('interaction').where({
        flag: 'comment',
        userOpenid: event.openid
      }).count()
      var total = countResult.total
      // 计算需分几次取
      var batchTimes = Math.ceil(total / 100)
      // 承载所有读操作的 promise 的数组
      var comments = []

      for (let i = 0; i < batchTimes; i++) {
        var res = await db.collection('interaction').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
          flag: 'comment',
          userOpenid: event.openid
        }).get()
        comments = comments.concat(res.data)
      }

      data.comments = comments
    }

    if (event.like) {
      // 先取出集合记录总数
      var countResult = await db.collection('interaction').where({
        flag: 'like',
        userOpenid: event.openid
      }).count()
      var total = countResult.total
      // 计算需分几次取
      var batchTimes = Math.ceil(total / 100)
      // 承载所有读操作的 promise 的数组
      var likes = []

      for (let i = 0; i < batchTimes; i++) {
        var res = await db.collection('interaction').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
          flag: 'like',
          userOpenid: event.openid
        }).get()
        likes = likes.concat(res.data)
      }

      data.likes = likes
    }

    if (event.store) {
      // 先取出集合记录总数
      var countResult = await db.collection('interaction').where({
        flag: 'store',
        userOpenid: event.openid
      }).count()
      var total = countResult.total
      // 计算需分几次取
      var batchTimes = Math.ceil(total / 100)
      // 承载所有读操作的 promise 的数组
      var stores = []

      for (let i = 0; i < batchTimes; i++) {
        var res = await db.collection('interaction').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
          flag: 'store',
          userOpenid: event.openid
        }).get()
        stores = stores.concat(res.data)
      }

      data.stores = stores
    }
  } else if (event.type == 1) { //文章获得，所以用id
    if (event.comment) {
      // 先取出集合记录总数
      var countResult = await db.collection('interaction').where({
        flag: 'comment',
        contextId: event.id
      }).count()
      var total = countResult.total
      // 计算需分几次取
      var batchTimes = Math.ceil(total / 100)
      // 承载所有读操作的 promise 的数组
      var comments = []

      for (let i = 0; i < batchTimes; i++) {
        var res = await db.collection('interaction').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
          flag: 'comment',
          contextId: event.id
        }).get()
        comments = comments.concat(res.data)
      }

      data.comments = comments
    }

    if (event.like) {
      // 先取出集合记录总数
      var countResult = await db.collection('interaction').where({
        flag: 'like',
        contextId: event.id
      }).count()
      var total = countResult.total
      // 计算需分几次取
      var batchTimes = Math.ceil(total / 100)
      // 承载所有读操作的 promise 的数组
      var likes = []

      for (let i = 0; i < batchTimes; i++) {
        var res = await db.collection('interaction').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
          flag: 'like',
          contextId: event.id
        }).get()
        likes = likes.concat(res.data)
      }

      data.likes = likes
    }

    if (event.store) {
      // 先取出集合记录总数
      var countResult = await db.collection('interaction').where({
        flag: 'store',
        contextId: event.id
      }).count()
      var total = countResult.total
      // 计算需分几次取
      var batchTimes = Math.ceil(total / 100)
      // 承载所有读操作的 promise 的数组
      var stores = []

      for (let i = 0; i < batchTimes; i++) {
        var res = await db.collection('interaction').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
          flag: 'store',
          contextId: event.id
        }).get()
        stores = stores.concat(res.data)
      }

      data.stores = stores
    }
  } else if (event.type == 2) {
    if (event.check == '_.nin(0)') {
      if (event.comment) {
        var res = await db.collection('interaction').skip((event.page - 1) * event.num).limit(event.num).where({
          flag: 'comment',
          type: event.inteType,
          isCheck: _.nin(['0'])
        }).get()

        data.comments = res.data
      }

      if (event.like) {
        var res = await db.collection('interaction').skip((event.page - 1) * event.num).limit(event.num).where({
          flag: 'like',
          type: event.inteType,
          isCheck: _.nin(['0'])
        }).get()

        data.likes = res.data
      }

      if (event.store) {
        var res = await db.collection('interaction').skip((event.page - 1) * event.num).limit(event.num).where({
          flag: 'store',
          type: event.inteType,
          isCheck: _.nin(['0'])
        }).get()

        data.stores = res.data
      }
    }else{
      if (event.comment) {
        var res = await db.collection('interaction').skip((event.page - 1) * event.num).limit(event.num).where({
          flag: 'comment',
          type: event.inteType,
          isCheck: event.check
        }).get()

        data.comments = res.data
      }

      if (event.like) {
        var res = await db.collection('interaction').skip((event.page - 1) * event.num).limit(event.num).where({
          flag: 'like',
          type: event.inteType,
          isCheck: event.check
        }).get()

        data.likes = res.data
      }

      if (event.store) {
        var res = await db.collection('interaction').skip((event.page - 1) * event.num).limit(event.num).where({
          flag: 'store',
          type: event.inteType,
          isCheck: event.check
        }).get()

        data.stores = res.data
      }
    }
    
  }


  return data

}
//返回值：

//以下三种不一定全都有，取决于参数的传入情况
// comments: [],
// likes: [],
// stores: [],