// miniprogram/pages/my/information/information.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userInfo){
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else {

    }
    
  },

  formSubmit: function(options){
    console.log(options)
  }
})