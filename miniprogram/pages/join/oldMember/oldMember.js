// miniprogram/pages/join/oldMember/oldMember.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shuoming: '请在微信点击 我———个人中心——二维码名片，将二维码名片保存起来上传，示例如下：',
    img: "../../../images/my/tupianimgyulan.png",
    lzimg:"cloud://yiban-edu.7969-yiban-edu-1301806073/lzimg.png",
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
          cloudPath: 'QR/teacher/' + app.globalData.openid + '.jpg',
          filePath: tempFilePaths[0],
          success(res) {
            wx.showToast({
              title: '图片上传成功！',
              icon: 'none'
            })
            //上传成功后会返回永久地址
            that.setData({
              fileID: res.fileID, //图片存储到云存储的fileID
              img:res.fileID
            })
            console.log(res.fileID)
          },
          fail(err) {
            wx.showToast({
              title: '图片上传失败！',
              icon: 'none'
            })
          }
        })
      }
    })
  },
  formSubmit: function(e) {
    const app = getApp()
    let that = this
    let input = e.detail.value
    wx.getSetting({
      success: function(res) {
        console.log(res)
        if (!res.authSetting['scope.userInfo']) {
          wx.showToast({
            title: '请先授权！',
            icon: 'none',
            duration: 1500,
            mask: true
          })
          return
        } else if (input.phone == "" || input.bindingCode == ""||that.data.fileID == undefined) {
          wx.showToast({
            title: '信息填写不完整~',
            icon: 'none',
            duration: 1500,
            mask: true
          })
          return
        } else {
          wx.cloud.callFunction({
            name: 'bindTeacher',
            data: {
              openid: app.globalData.openid,
              bindingCode: input.bindingCode,
              tel: input.tel
            }
          }).then(function(res) {
            if (res.result == '绑定成功！') {
              wx.showToast({
                title: res.result,
                icon: 'success',
                mask: true,
                duration: 1500,
                success: function() {
                  setTimeout(function() {
                    wx.reLaunch({
                      url: '/pages/index/index',
                    })
                  }, 1500)
                }
              })
            } else {
              wx.showToast({
                title: res.result,
                icon: 'none',
                mask: true,
                duration: 1500
              })
            }

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