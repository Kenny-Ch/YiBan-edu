// miniprogram/pages/matching/matching.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subject: [{
      id: 1,
      name: '语文',
      en: 'Chinese',
      checked: false,
      score: '',
    }, {
      id: 2,
      name: '数学',
      en: 'Mathematics',
      checked: false,
      score: '',
    }, {
      id: 3,
      name: '英语',
      en: 'English',
      checked: false,
      score: '',
    }, {
      id: 4,
      name: '物理',
      en: 'Physics',
      checked: false,
      score: '',
    }, {
      id: 5,
      name: '化学',
      en: 'Chemistry',
      checked: false,
      score: '',
    }, {
      id: 6,
      name: '生物',
      en: 'Biology',
      checked: false,
      score: '',
    }, {
      id: 7,
      name: '政治',
      en: 'Politics',
      checked: false,
      score: '',
    }, {
      id: 8,
      name: '历史',
      en: 'History',
      checked: false,
      score: '',
    }, {
      id: 9,
      name: '地理',
      en: 'Geography',
      checked: false,
      score: '',
    }],
    judge: [{
      name: '是',
      checked: true,
      value: true
    }, {
      name: '否',
      checked: false,
      value: false
    }],
    punch: true,
    class: true,
    getAlong: true,
    custom: '',
    willing: '',
  },
  class_Change: function(e) {
    console.log('是否接受不定期班会：', e.detail.value)
    this.setData({
      class: e.detail.value,
    })
  },
  punch_Change: function(e) {
    console.log('是否愿意参加每日打卡记录学习情况：', e.detail.value)
    this.setData({
      punch: e.detail.value,
    })
  },
  getAlong_Change: function(e) {
    console.log('是否愿意与志愿者老师好好相处并学到知识：', e.detail.value)
    this.setData({
      getAlong: e.detail.value,
    })
  },
  checkboxChange: function(e) {
    console.log(e)
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    console.log("长度:" + e.detail.value.length);
    let index = e.target.dataset.index - 1
    let checked = "subject[" + index + "].checked"
    let score = "subject[" + index + "].score"
    this.setData({
      [checked]: !(this.data.subject[index].checked),
    })
    if ((this.data.subject[index].checked) == false) {
      this.setData({
        [score]: ''
      })
    }
  },
  fraction: function(e) {
    let index = e.target.dataset.index - 1
    let score = "subject[" + index + "].score"
    this.setData({
      [score]: e.detail.value
    })
  },
  getCustom: function(e) {
    console.log("custom:", e.detail.value)
    this.data.custom = e.detail.value
  },
  getWilling: function(e) {
    console.log("willing:", e.detail.value)
    this.data.willing = e.detail.value
  },
  uploadMatchInfo: function(e) {
    console.log(this.data.sub_fra)
    var weakSubject = {};
    for (let sub of this.data.subject) {
      if(sub.checked == true)
        weakSubject[sub.en] = sub.score
    }
    console.log("wak",weakSubject)
    // 检验不合格
    if (this.data.custom == '' || this.data.willing == '') {
      wx.showToast({
        title: '请填写完整信息！',
        duration: 1000,
        icon: 'none'
      })
    }
    else if(weakSubject == undefined){
      wx.showToast({
        title: '输入的分数有误！',
        icon: 'none'
      })
    }
    //检验合格
    else {
      var weakSubject = {};
      for (sub in this.data.chooseSubject) {
        weakSubject[sub] = this.data.sub_fra[sub]
      }
      var that = this
      const app = getApp()
      wx.cloud.callFunction({
        name: 'uploadMatchInfo',
        data: {
          'openid': app.globalData.openid,
          'weakSubject': weakSubject,
          'willCheckIn': that.data.punch,
          'willMeeting': that.data.class,
          'willGetAlong': that.data.getAlong,
          'habitAndPlan': that.data.custom,
          'expectation': that.data.willing
        },
      }).then(function(res) {
        console.log("【matching调用函数uploadMatchInfo】")
        console.log('匹配信息添加成功！', res)
        wx.showToast({
          title: '登记成功！',
          icon: 'success'
        })
        wx.redirectTo({
          url: './result/result',
        })
      }).catch(function(err) {
        console.log('匹配信息添加失败!', err)
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载3
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})