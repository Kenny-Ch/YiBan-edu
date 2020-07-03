// miniprogram/pages/my/information/information.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    judge: [{
      name: '男',
      checked: false,
      value: '男',
    }, {
      name: '女',
      checked: false,
      value: '女',
    }],
    userInfo: {

    },
    region:[],
    changeValue: {
      'perInfo':{

      }
    },
    picker: ['高一', '高二', '高三'],
    sexs:['男','女'],
    fileID: '',
    teacher:false
  },
  previewImage: function(e) {
    wx.previewImage({
      urls: e.target.dataset.url.split(',')
      // 需要预览的图片http链接  使用split把字符串转数组。不然会报错
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } 
    let that = this
    if(app.globalData.isTeacher == 1&&app.globalData.userInfo.otherInfo != undefined){
      const db = wx.cloud.database()
      await db.collection('person').doc(app.globalData.openid)
        .get()
        .then(function(res) {
          console.log("【teacherDetail查询数据库person】", res)
          let fileID = "cloud://yiban-edu.7969-yiban-edu-1301806073/QR/teacher/" + res.data.openid + ".jpg"
          that.setData({
            teacher:true,
            fileID: fileID
          })
        }).catch(function(err) {
          console.log(err)
        })
    }
   
  },

  formSubmit: function(options) {
    console.log(options)
    const db = wx.cloud.database()
    const app = getApp()
    db.collection('person').where({
        openid: app.globalData.openid
      }).update({

      })
      .then(function(res) {
        console.log("information查找数据库person", res)
      })
  },

  getName: function(e) {
    console.log("【姓名】改变为 ",e.detail.value)
    this.data.changeValue.name = e.detail.value
  },

  getPhoneNumber: function(e){
    console.log("【联系方式】改变为 ", e.detail.value)
    this.data.changeValue.perInfo.tel = e.detail.value
  },

  getGender:function(e){
    console.log("【性别】改变为 ", e.detail.value)
    this.data.changeValue.perInfo.gender = e.detail.value

    var sex = e.detail.value == '0'?'男':'女'
    console.log("【性别】改变为 ", sex)
    this.data.changeValue.perInfo.gender = sex
    this.setData({
      index1: e.detail.value,
    })
  },

  getArea:function(e){
    console.log("【所在地区】改变为 ", e.detail.value)
    this.data.changeValue.perInfo.tel = e.detail.value
    this.setData({
      region: e.detail.value
    })
  },

  getSchool: function (e) {
    console.log("【在读学校】改变为 ", e.detail.value)
    this.data.changeValue.perInfo.school = e.detail.value
  },

  getGrade: function (e) {
    var grade = e.detail.value == '0'?'高一':(e.detail.value == '1'?'高二':'高三')
    console.log("【在读年级】改变为 ",grade)
    this.data.changeValue.perInfo.grade =grade
    this.setData({
      index: e.detail.value,
    })
  },

  getQQ: function (e) {
    console.log("【QQ】改变为 ", e.detail.value)
    this.data.changeValue.perInfo.tel = e.detail.value
  },

  getEmail: function (e) {
    console.log("【邮箱】改变为 ", e.detail.value)
    this.data.changeValue.perInfo.email = e.detail.value
  },
})