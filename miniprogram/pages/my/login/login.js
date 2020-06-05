// miniprogram/pages/my/login/login.js
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
    picker: ['高一', '高二', '高三'],
    region: [],
    job: 1 //0是老师，1是学生
  },
  RegionChange: function(e) {
    console.log('地区选择：', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  PickerChange(e) {
    var grade = e.detail.value == '0' ? '高一' : (e.detail.value == '1' ? '高二' : '高三')
    console.log('年级选择：', grade)
    this.setData({
      index: e.detail.value,
      grade: grade
    })
  },
  sex_Change: function(e) {
    console.log('性别：', e.detail.value)
    this.setData({
      gender: e.detail.value,
    })
  },

  /**
   * 提交表单
   */

  getInfo: function(e) {
    console.log("【授权后获取用户信息】", e.detail.userInfo)
    app.globalData.avatarUrl = e.detail.userInfo.avatarUrl
  },

  formSubmit: function(e) {
    console.log('【注册界面提交表单信息】', e.detail.value, this.data.region, this.data.gender, this.data.grade)
    var input = e.detail.value
    var pick = this.data
    if (input.uname == "" || input.school == "" || input.qq == "" || input.email == "" || input.tel == "" || pick.region.length == 0 || pick.gender == undefined || pick.grade == undefined) {
      wx.showToast({
        title: '信息填写不完整~',
        icon: 'none',
        duration: 1500
      })
    } else {
      console.log("global", app.globalData)
      if (this.data.job == 1) {
        wx.cloud.callFunction({
          // 要调用的云函数名称
          name: 'uploadBasicInfo',
          // 传递给云函数的event参数
          data: {
            flag: this.data.job,
            openid: app.globalData.openid,
            registerDate: new Date(),
            avatarUrl: app.globalData.avatarUrl,
            job: 1,
            name: input.uname,
            isMatchFull: false,
            matchList: [],
            perInfo: {
              gender: pick.gender,
              school: input.school,
              grade: pick.grade,
              area: pick.region,
              qq: input.qq,
              tel: input.tel,
              email: input.email
            }
          }
        }).then(res => {
          app.globalData.userInfo = {
            openid: app.globalData.openid,
            registerDate: new Date(),
            job: input.job,
            avatarUrl: app.globalData.avatarUrl,
            name: input.uname,
            perInfo: {
              gender: pick.gender,
              school: input.school,
              grade: pick.grade,
              area: pick.region,
              qq: input.qq,
              tel: input.tel,
              email: input.email
            }
          }
          app.globalData.isNew = false
          wx.redirectTo({
            url: '/pages/my/my',
            complete: (res) => {},
            fail: (res) => {},
            success: (res) => {},
          })
        }).catch(err => {
          console.log('uploadBasicInfo上传基本信息错误', err)
        })

      } else if (this.data.job == 0) {
        wx.cloud.callFunction({
          // 要调用的云函数名称
          name: 'uploadBasicInfo',
          // 传递给云函数的event参数
          data: {
            flag: this.data.job,
            openid: app.globalData.openid,
            registerDate: new Date(),
            job: 0,
            name: input.uname,
            isMatchFull: false,
            matchList: [],
            perInfo: {
              gender: pick.gender,
              school: input.school,
              grade: pick.grade,
              major: input.major,
              speciality: pick.speciality,
              introduction: input.introduction,
              wechat: input.wechat,
              tel: input.tel,
              stuNum: input.stuNum
            }
          }
        }).then(res => {
          app.globalData.userInfo = {
            openid: app.globalData.openid,
            registerDate: new Date(),
            job: input.job,
            name: input.uname,
            perInfo: {
              gender: pick.gender,
              school: input.school,
              grade: pick.grade,
              major: input.major,
              speciality: pick.speciality,
              introduction: input.introduction,
              wechat: input.wechat,
              tel: input.tel,
              stuNum: input.stuNum
            }
          }
          app.globalData.isNew = false
          wx.redirectTo({
            url: '/pages/my/my',
            complete: (res) => {},
            fail: (res) => {},
            success: (res) => {},
          })
        }).catch(err => {
          console.log('uploadBasicInfo上传基本信息错误', err)
        })
      } else {
        console.log('云函数上传基本信息错误，职业有误')
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
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