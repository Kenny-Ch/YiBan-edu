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
  console.log("输入参数：", event)
  switch(event.order) {
    case 5:
  //删除现有的信息(yibanID、ordernum)并产生新的yibanID
  // var r1 = await db.collection('person').where({
  //   orderNum: _.exists(true)
  // }).update({
  //   data:{
  //     orderNum: _.remove()
  //   }
    
  // })
  // console.log(r1)

  // var r2 = await db.collection('person').where({
  //   yibanID: _.exists(true)
  // }).update({
  //   data:{
  //     yibanID: _.remove()
  //   }
    
  // })
  // console.log(r2)

  // const countResult = await db.collection('person').where({
  //   registerDate: _.exists(true),
  //   schoolID: _.exists(true),
  //   job: 1,
  //   yibanID: _.exists(false)
  // }).count()
  // const total = countResult.total
  // const batchTimes = Math.ceil(total / 100)
  // var data = []
  // for (let i = 0; i < batchTimes; i++) {
  //     var res = await db.collection('person').where({
  //       registerDate: _.exists(true),
  //       schoolID: _.exists(true),
  //       job: 1,
  //       yibanID:_.exists(false)
  //     }).field({
  //       registerDate: true,
  //       schoolID: true,
  //       _id: true
  //     }).orderBy("registerDate", "asc").get()
  //     data = data.concat(res.data)
  //   }
  // console.log(data)
  // for(let i=0; i<data.length; i++){
  //   await db.collection('person').where({
  //   _id: data[i]._id
  // }).update({
  //   data:{
  //     yibanID: "YB"+data[i].schoolID+data[i].registerDate.getTime()
  //   }
  // })
  // console.log("序号："+i+": YB"+data[i].schoolID+data[i].registerDate.getTime())
  // }
  break;
  case 4:
  //给指定导入时间重复的编号后面加上序号
  // var res = await db.collection('person').where({
  //   registerDate: new Date(1596451758484),
  //   job:1,
  //   yibanID:_.exists(true)
  // }).field({
  //   yibanID:true,
  //   _id: true
  // }).get()
  // var data = res.data
  // for(let i=0; i<data.length; i++) {
  //   await db.collection('person').where({
  //     _id: data[i]._id
  //   }).update({
  //     data:{
  //       yibanID: data[i].yibanID + (i+1)
  //     }
  //   })
  //   console.log(data[i].yibanID + (i+1))
  // }
  break;
  case 3:
  //查看所有yibanID
  // var r1 = await db.collection('person').limit(100).where({
  //     yibanID:_.exists(true)
  //   }).field({
  //     yibanID: true
  //   }).get()
  // console.log(r1.data.length,r1)
  // var r2 = await db.collection('person').skip(90).limit(100).where({
  //   yibanID:_.exists(true)
  // }).field({
  //   yibanID: true
  // }).get()
  // console.log(r2.data.length,r2)
  // var r3 = await db.collection('person').skip(190).limit(100).where({
  //   yibanID:_.exists(true)
  // }).field({
  //   yibanID: true
  // }).get()
  // console.log(r3.data.length,r3)
  break;
  case 2:
  //查询所有重复的openid用户
  // const countResult = await db.collection('person').count()
  // const total = countResult.total
  // const batchTimes = Math.ceil(total / 100)

  // var data = []
  // var arr = []
  // for (let i = 0; i < batchTimes; i++) {
  //   var res = await db.collection('person').skip(i * MAX_LIMIT).limit(MAX_LIMIT).field({
  //     openid: true
  //   }).get()
  //   data = data.concat(res.data)
  // }
  // for (let i = 0; i < data.length; i++) {
  //     console.log(data.length,i)
  //   if (data[i].openid) {
  //     var r = await db.collection('person').where({
  //       openid: data[i].openid
  //     }).field({
  //       name: true
  //     }).get()
  //     .then(r => {
  //       var c = r.data.length
  //     if (c > 1){
  //       arr.push([r.data[0], r.data[1],"数量："+c])
  //     }
  //     })
      
  //   }
  // }
  // console.log(arr)
  break;
  case 1: 
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
  }
  

  //删除指定匹配列表中所有指定的openid
  // const countResult = await db.collection('person').where({
  //   matchWaitList: _.elemMatch(_.eq('opGQO5D3DkKxwqptfb1r7B6UfJns'))
  // }).count()
  // const total = countResult.total
  // const batchTimes = Math.ceil(total / 100)

  // var arr = []
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