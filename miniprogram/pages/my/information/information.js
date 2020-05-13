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
    changeValue: {
      'perInfo':{

      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else {

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
  },

  getArea:function(e){
    console.log("【所在地区】改变为 ", e.detail.value)
    this.data.changeValue.perInfo.tel = e.detail.value
  },

  getSchool: function (e) {
    console.log("【在读学校】改变为 ", e.detail.value)
    this.data.changeValue.perInfo.school = e.detail.value
  },

  getGrade: function (e) {
    console.log("【在读年级】改变为 ", e.detail.value)
    this.data.changeValue.perInfo.grade = e.detail.value
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