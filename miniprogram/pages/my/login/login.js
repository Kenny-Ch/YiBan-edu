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
    job: 0, //1是老师，0是学生
    img:"../../../images/my/tupianimgyulan.png"
  },
  upload_picture: function(name) {
    var that = this
    //让用户选择或拍摄一张照片
    wx.chooseImage({
      count: 1,	
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
      //选择完成会先返回一个临时地址保存备用
        const tempFilePaths = res.tempFilePaths
        //将照片上传至云端需要刚才存储的临时地址
        wx.cloud.uploadFile({
          cloudPath: 'supporting_materials/'+app.globalData.openid+'.jpg',
          filePath: tempFilePaths[0],
          success(res) {
          //上传成功后会返回永久地址
            that.setData({
              img:res.fileID         //图片存储到云存储的fileID
            })
            console.log(res.fileID) 
          }
        })
      }
    })
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
    let that = this
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
          wx.getUserInfo({
            success: function(res) {
              console.log(res)
              console.log("【授权后获取用户信息】", res.userInfo)
              app.globalData.avatarUrl = res.userInfo.avatarUrl
            }
          })
          console.log('【注册界面提交表单信息】', e.detail.value, that.data.region, that.data.gender, that.data.grade)
          var input = e.detail.value
          var pick = that.data
          if (input.uname == "" || input.school == "" || input.qq == "" || input.email == "" || input.tel == "" || pick.region.length == 0 || pick.gender == undefined || pick.grade == undefined) {
            wx.showToast({
              title: '信息填写不完整~',
              icon: 'none',
              duration: 1500
            })
          } else {
            if (that.data.job == 1) {
              wx.cloud.callFunction({
                // 要调用的云函数名称
                name: 'uploadBasicInfo',
                // 传递给云函数的event参数
                data: {
                  flag: that.data.job,
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
                    email: input.email,
                    matchList: [],
                    matchWaitList: []
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
                    email: input.email,
                    matchList: [],
                    matchWaitList: []
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

            } else if (that.data.job == 0) {
              wx.cloud.callFunction({
                // 要调用的云函数名称
                name: 'uploadBasicInfo',
                // 传递给云函数的event参数
                data: {
                  flag: that.data.job,
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
                    stuNum: input.stuNum,
                    matchList: [],
                    matchWaitList: []
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
                    stuNum: input.stuNum,
                    matchList: [],
                    matchWaitList: []
                  }
                }
                app.globalData.isNew = false
                wx.redirectTo({
                  url: '/pages/index/index',
                  // success: function(){
                  //   var pages = getCurrentPages
                  //   var beforePage = pages[pages.length - 2]
                  // }
                })
              }).catch(err => {
                console.log('uploadBasicInfo上传基本信息错误', err)
              })
            } else {
              console.log('云函数上传基本信息错误，职业有误')
            }
          }
        }
      }
    })
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