// miniprogram/pages/join/workingAbility/workingAbility.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: ['语文', '数学', '英语', '物理', '化学', '生物', '政治', '历史', '地理'],
    picker1: [1, 2, 3, 4, 5],
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
    jumpMethod: 'redirect'
  },
  punch_Change: function(e) {
    console.log('新学期的课程安排是否紧凑:', e.detail.value)
    this.setData({
      punch: e.detail.value,
    })
  },
  PickerChange4(e) {
    var grade = this.data.picker1[e.detail.value];
    console.log('可同时辅导几个学生：', grade)
    this.setData({
      index4: e.detail.value,
      grade4: grade //学生人数
    })
  },
  PickerChange1(e) {
    var grade = this.data.picker[e.detail.value];
    console.log('年级选择：', grade)
    this.setData({
      index1: e.detail.value,
      grade1: grade //科目1
    })
  },
  PickerChange2(e) {
    var grade = this.data.picker[e.detail.value];
    console.log('年级选择：', grade)
    this.setData({
      index2: e.detail.value,
      grade2: grade //科目2
    })
  },
  PickerChange3(e) {
    var grade = this.data.picker[e.detail.value];
    console.log('年级选择：', grade)
    this.setData({
      index3: e.detail.value,
      grade3: grade //科目3
    })
  },

  //因为前面的转换都写好了，这里不得不将中文的科目转换成英文显示
  changeLanguage: function(word) {
    switch (word) {
      case '语文':
        return 'Chinese'
        break
      case '数学':
        return 'Mathematics'
        break
      case '英语':
        return 'English'
        break
      case '物理':
        return 'Physics'
        break
      case '化学':
        return 'Chemistry'
        break
      case '生物':
        return 'Biology'
        break
      case '政治':
        return ''
        break
      case '历史':
        return 'History'
        break
      case '地理':
        return 'Geography'
        break
    }
  },

  getInfo: function(e) {
    const app = getApp()
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("【授权后获取用户信息】", e.detail.userInfo)
          app.globalData.avatarUrl = e.detail.userInfo.avatarUrl
        }
      }
    })
  },

  formSubmit: function(e) {
    let input = e.detail.value
    const app = getApp()
    let that = this
    let pick = that.data
    wx.getSetting({
      success: function(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.showToast({
            title: '请先授权！',
            icon: 'none',
            duration: 1500
          })
          return
        } else {
          if (input.Chinese == '' || input.Math == '' || input.English == '' || input.introduction == '' || input.comprehend == '' || input.experience == '' || input.honor == '' || input.interest == '' || input.situation1 == '' || input.situation2 == '' || pick.grade1 == undefined || pick.grade2 == undefined || pick.grade3 == undefined || pick.grade4 == undefined) {
            wx.showToast({
              title: '信息填写不完整~',
              icon: 'none',
              duration: 1500
            })
          } else {
            let perInfo = app.globalData.userInfo.perInfo
            perInfo.introduction = input.introduction
            perInfo.speciality = [that.changeLanguage(pick.grade1), that.changeLanguage(pick.grade2), that.changeLanguage(pick.grade3)]
            perInfo.stuNum = that.data.grade4
            app.globalData.userInfo.perInfo = perInfo
            console.log(input)
            wx.cloud.callFunction({
              name: 'uploadCV',
              data: {
                openid: app.globalData.openid,
                perInfo: perInfo,
                otherInfo: {
                  collegeExamScore: {
                    Chinese: input.Chinese,
                    Math: input.Math,
                    English: input.English,
                    Integration: input.Integration
                  },
                  comprehend: input.comprehend, //对以伴服务的了解
                  experience: input.experience, //你的学生干部经历
                  honor: input.honor, //你的个人荣誉
                  interest: input.interest, //你的兴趣爱好
                  arrange: pick.putch, //新学期课程安排是否紧凑
                  questionA: input.situation1, //问题1
                  questionB: input.situation2, //问题2
                },
                isCheck: 0,
                isWeChatReg: true
              }
            }).then(function(res) {
              console.log("【workingAbility调用函数uploadCV】", res)
              app.globalData.userInfo.perInfo = perInfo
              wx.showToast({
                title: '提交成功！',
                icon: 'success',
                mask: true,
                duration: 1500,
                success: function() {
                  setTimeout(function() {
                    wx.redirectTo({
                      url: '/pages/index/index',
                    })
                  }, 1500)
                }
              })
            }).catch(function(err) {
              console.log(err)
            })
          }
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const app = getApp()
    //从第一次注册进入
    if (options.method != undefined) {
      this.setData({
        jumpMethod: 'continue'
      })
    }
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