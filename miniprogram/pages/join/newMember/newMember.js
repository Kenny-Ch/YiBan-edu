// miniprogram/pages/join/newMember/newMember.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: ['大一', '大二', '大三', '大四'],
    shuoming: '说明：请将学生证上包含照片、姓名、院系、专业等信息的照片上传。若拍摄时无法拍成一张，请用ps、画图等软件合并到一张图中。',
    img: "../../../images/my/tupianimgyulan.png",
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
          cloudPath: 'teacher_supporting_materials/' + app.globalData.openid + '.jpg',
          filePath: tempFilePaths[0],
          success(res) {
            //上传成功后会返回永久地址
            that.setData({
              fileID: res.fileID //图片存储到云存储的fileID
            })
            console.log(res.fileID)
          }
        })
      }
    })
  },
  PickerChange(e) {
    var grade = this.data.picker[e.detail.value];
    console.log('年级选择：', grade)
    this.setData({
      index: e.detail.value,
      grade: grade //年级
    })
  },

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
    const app = getApp()
    let that = this
    let input = e.detail.value
    let pick = that.data
    console.log(input)
    wx.getSetting({
      success: function(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.showToast({
            title: '请先授权！',
            icon: 'none',
            duration: 1500,
          })
          return
        } else if (input.name == "" || input.major == "" || input.school == "" || input.wechat == "" || input.tel == "" || input.email == "" || pick.grade == undefined || pick.fileID == undefined) {
          wx.showToast({
            title: '信息填写不完整~',
            icon: 'none',
            duration: 1500
          })
        } else {
          wx.cloud.callFunction({
            name: 'uploadBasicInfo',
            data: {
              flag: 1,
              openid: app.globalData.openid,
              job: 1,
              name: input.name,
              registerDate: new Date(),
              matchList: [],
              matchWaitList: [],
              matchReject: false,
              isMatchFull: false,
              perInfo: {
                gender: pick.gender,
                school: input.school,
                grade: pick.grade,
                major: input.major,
                wechat: input.wechat,
                tel: input.tel,
              },
              otherInfo: {},
              isCheck: 0,
              isWeChatReg: true
            }
          }).then(function(res) {
            console.log("【教师第一次注册信息】", res)
            app.globalData.userInfo = {
              openid: app.globalData.openid,
              job: 1,
              name: input.name,
              registerDate: new Date(),
              matchList: [],
              matchWaitList: [],
              matchReject: false,
              isMatchFull: false,
              perInfo: {
                gender: pick.gender,
                school: input.school,
                grade: pick.grade,
                major: input.major,
                wechat: input.wechat,
                tel: input.tel,
              },
              otherInfo: {},
              isCheck: 0,
              isWeChatReg: true
            }
            app.globalData.isNew = false
            console.log(app.globalData)
            wx.redirectTo({
              url: '../workingAbility/workingAbility',
            })
          }).catch(function(err) {
            console.log(err)
          })
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