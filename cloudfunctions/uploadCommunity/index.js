// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

/*  参数表：
   {
    "name": "",                     //社区名
    "introduction": "",             //社区介绍
    "qq": ""                        //qq群二维码
    }
*/

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('communiry').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        name: event.name,
        introduction: event.introduction,
        qq: event.qq
      }
    })
  } catch (e) {
    console.error(e)
  }
}