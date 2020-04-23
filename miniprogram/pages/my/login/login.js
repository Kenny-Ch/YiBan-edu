// miniprogram/pages/my/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    judge:[{
      name:'男',
      checked:false,
      value:'男',
    },{
      name:'女',
      checked:false,
      value:'女',
    }],
    picker: ['高一', '高二', '高三'],
    region:[],
  },
  RegionChange: function(e) {
    console.log('地区选择：',e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  PickerChange(e) {
    var grade = e.detail.value == '0'?'高一':(e.detail.value == '1'?'高二':'高三')
    console.log('年级选择：', grade)
    this.setData({
      index: e.detail.value,
      grade: grade
    })
  },
  sex_Change:function(e){
    console.log('性别：',e.detail.value)
    this.setData({
      gender: e.detail.value,
    })
  },

  /**
   * 提交表单
   */
  formSubmit: function(e){
    console.log('【注册界面提交表单信息】',e.detail.value, this.data.region, this.data.gender, this.data.garde)
    var input = e.detail.value
    var pick = this.data 
    if(input.uname == "" || input.school == "" || input.qq == "" || input.email == "" || input.tel == "" || pick.region.length == 0 || pick.gender == undefined || pick.grade == undefined){
      wx.showToast({
        title: '信息填写不完整~',
        icon: 'none',
        duration: 1500
      })
    } else {
    /*  wx.cloud.callFunction({
        // 要调用的云函数名称
        name: 'uploadBasicInfo',
        // 传递给云函数的event参数
        data: {
          openid: app.globalData.openid,
          registerDate: new Date(),
          job: input.job,
          name: input.uname,
          perInfo:{
            
          }
        }}).then(res => {
          // output: res.result === 3
          }).catch(err => {
          // handle error
          })        
      */
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})