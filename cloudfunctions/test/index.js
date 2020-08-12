// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate
const MAX_LIMIT = 100
// 云函数入口函数
exports.main = async (event, context) => {
  //后台绑定已经匹配好的学生老师
  console.log(event)
  var data = event.arr
  for(let i=0; i<data.length; i++) {
    console.log(data[i])
    await cloud.callFunction({
      name: 'chooseStuMatch',
      data: {
        stuOpenid: data[i].student_openid,
        teaOpenid: data[i].teacher_openid,
        res: 1
      }
    })
  }

  //删除指定匹配列表中所有指定的openid
  // const countResult = await db.collection('person').where({
  //   matchWaitList: _.elemMatch(_.eq('opGQO5D3DkKxwqptfb1r7B6UfJns'))
  // }).count()
  // const total = countResult.total
  // const batchTimes = Math.ceil(total / 100)

  // const arr = []
  // for (let i = 0; i < batchTimes; i++) {
  //   var res = await db.collection('person').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
  //     matchWaitList: _.elemMatch(_.eq('opGQO5D3DkKxwqptfb1r7B6UfJns'))
  //   }).field({
  //     matchWaitList: true,
  //     openid: true,
  //     name: true
  //   }).get()
  //   arr.push(res.data)
  // }
  // console.log(arr.length,arr)
  // for(let i = 0; i < arr.length; i++){
  //   var list = []
  //   for(let j=0; j<arr[i].matchWaitList.length; j++) {
  //     if(arr[i].matchWaitList[j] != 'opGQO5D3DkKxwqptfb1r7B6UfJns') {
  //       list.push(arr[i].matchWaitList[j])
  //     }
  //   }
  //   db.collection('person').where({
  //     openid:arr[i].openid
  //   }).update({
  //     matchWaitList: list
  //   })
  // }

  // 去除空openid
  // var res = await db.collection('person').where({
  //   // openid: _.or("",null,undefined)
  //   openid: ''
  // }).update({
  //   data: {
  //     openid: _.remove()
  //   }
  // })
  // console.log(res)
}