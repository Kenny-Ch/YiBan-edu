// miniprogram/pages/matching/matching.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subject:[{
      id:1,
      name:'语文',
      en:'Chinese',
      checked:false,
    },{
      id:2,
      name:'数学',
      en:'Mathematics',
      checked:false,
    },{
      id:3,
      name:'英语',
      en:'English',
      checked:false,
    },{
      id:4,
      name:'物理',
      en:'Physics',
      checked:false,
    },{
      id:5,
      name:'化学',
      en:'Chemistry',
      checked:false,
    },{
      id:6,
      name:'生物',
      en:'Biology',
      checked:false,
    },{
      id:7,
      name:'政治',
      en:'Politics',
      checked:false,
    },{
      id:8,
      name:'历史',
      en:'History',
      checked:false,
    },{
      id:9,
      name:'地理',
      en:'Geography',
      checked:false,
    }],
    sub_fra:{},
    judge:[{
      name:'是',
      checked:true,
      value:true
    },{
      name:'否',
      checked:false,
      value:false
    }],
    punch:true,
    class:true,
    getAlong:true,
  },
  class_Change:function(e){
    console.log('是否接受不定期班会：',e.detail.value)
    this.setData({
      class:e.detail.value,
    })
  },
  punch_Change:function(e){
    console.log('是否愿意参加每日打卡记录学习情况：',e.detail.value)
    this.setData({
      punch:e.detail.value,
    })
  },
  getAlong_Change:function(e){
    console.log('是否愿意与志愿者老师好好相处并学到知识：',e.detail.value)
    this.setData({
      getAlong:e.detail.value,
    })
  },
  checkboxChange:function(e){
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    console.log("长度:" + e.detail.value.length);
    this.setData({
      chooseSubject: e.detail.value,
      chooseSubject_length: e.detail.value.length
    })
    
  },
  fraction:function(e){
    console.log(e.target.dataset.name,": ",e.detail.value)
    this.data.sub_fra[e.target.dataset.name]=e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载3
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