// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate

// 云函数入口函数
exports.main = async(event, context) => {
  //check = pass 通过
  //check = reject 不通过
  //id 对应教师的记录id

  if (event.check == 'pass') {
    var schIDres = await db.collection('person').doc(event.id).field({schoolID:true}).get()
    var schID = schIDres.data.schoolID
    var maxres = await db.collection('person')
      .aggregate()
      .group({
        _id: '$schoolID',
        max: $.max('$score')
    }).end()
    var max
    for(let i=0; i<maxres.list.length; i++){
      if(maxres.list[i]._id == schID){
        max = maxres.list[i].max
        break
      }
    }
    var maxstr
    if(max>=0 && max<=9){
      maxstr = '000'+max
    } else if(max>=10 && max<=99){
      maxstr = '00'+max
    } else if(max>=100 && max<=999){
      maxstr = '0'+max
    } else {
      maxstr = max+""
    }

    await db.collection('person').doc(event.id).update({
      data: {
        isCheck: 1,
        orderNum: schID + maxstr
      }
    }).then(function(res) {
      return '通过审核'
    }).catch(function(err) {
      return err
    })
  } else if (event.check == 'reject') {
    await db.collection('person').doc(event.id).update({
      data: {
        isCheck: 2
      }
    }).then(function(res) {
      return '退回申请'
    }).catch(function(err) {
      return err
    })
  } else {
    return 'error'
  }
}