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
    region: [],
    changeValue: {
      'perInfo': {

      }
    },
    picker: ['高一', '高二', '高三'],

    sexs: ['男', '女'],
    fileID: '',
    teacher: false,
  },
  myCancel: function (e) {
    let that = this
    const app = getApp()
    wx.showModal({
      title: '注销账号',
      content: '账号一旦注销将无法恢复，请确定是否注销！',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.cloud.callFunction({
            name: 'deleteMember',
            data: {
              openid: app.globalData.openid
            }
          }).then(function (res) {
            console.log("【my/information调用deleteMember】", res)
            wx.showToast({
              title: res.result,
              icon: 'none',
              duration: 1500,
              success() {
                setTimeout(() => {
                  wx.redirectTo({
                    url: '../../index/index',
                  })
                }, 1500)
              }
            })
          }).catch(function (err) {
            console.log(err)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  upload_picture: function(name) {
    var app = getApp();
    var that = this
    //让用户选择或拍摄一张照片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        //选择完成会先返回一个临时地址保存备用
        const tempFilePaths = res.tempFilePaths
        const name='QR/teacher/' + app.globalData.openid
        //将照片上传至云端需要刚才存储的临时地址
        wx.navigateTo({
          url: '../../template/uploadImageCropper/uploadImageCropper?image='+tempFilePaths+'&name='+name,
        })
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
    if(app.globalData.userInfo.isAmbassador){
      this.setData({
        picker:['小学一至三年级','小学四至六年级','初一','初二','初三','高一', '高二', '高三','大一', '大二', '大三', '大四']
      })
    }else if(app.globalData.userInfo.job==0){
      this.setData({
        picker:['小学一至三年级','小学四至六年级','初一','初二','初三','高一', '高二', '高三']
      })
    }
    else{
      this.setData({
        picker:['大一', '大二', '大三', '大四']
      })
    }
    let that = this
    if (app.globalData.isTeacher == 1 || app.globalData.isTeacher == 2 && app.globalData.userInfo.otherInfo != undefined) {
      const db = wx.cloud.database()
      await db.collection('person').where({openid:app.globalData.openid})
        .get()
        .then(function (res) {
          console.log("【teacherDetail查询数据库person】", res)
          let fileID = "cloud://yiban-edu.7969-yiban-edu-1301806073/QR/teacher/" + app.globalData.openid + ".jpg"
          that.setData({
            teacher: true,
            fileID: fileID
          })
        }).catch(function (err) {
          console.log(err)
        })
    }

  },

  formSubmit: function (options) {
    console.log(options)
    const db = wx.cloud.database()
    const app = getApp()
    let that = this
    wx.cloud.callFunction({
      name: 'updateInfo',
      data: {
        _id: that.data.userInfo._id,
        name: that.data.changeValue.name,
        perInfo: that.data.changeValue.perInfo
      }
    }).then(function (res) {
      console.log("【my/information调用函数updateInfo】", res)
      wx.showToast({
        title: res.result,
        icon: 'none'
      })
    }).catch(function (err) {
      console.log(err)
    })
  },

  getName: function (e) {
    wx.showToast({
      title: "姓名不可更改",
      icon: 'none'
    })
  },

  getPhoneNumber: function (e) {
    console.log("【联系方式】改变为 ", e.detail.value)
    this.data.changeValue.perInfo.tel = e.detail.value
    app.globalData.userInfo.perInfo.tel = e.detail.value
  },

  getGender: function (e) {
    // console.log("【性别】改变为 ", e.detail.value)
    // this.data.changeValue.perInfo.gender = e.detail.value

    // var sex = e.detail.value == '0' ? '男' : '女'
    // console.log("【性别】改变为 ", sex)
    // this.data.changeValue.perInfo.gender = sex
    // app.globalData.userInfo.perInfo.gender = sex
    // this.setData({
    //   index1: e.detail.value,
    // })
    wx.showToast({
      title: "性别不可更改",
      icon: 'none'
    })
  },

  getArea: function (e) {
    console.log("【所在地区】改变为 ", e.detail.value)
    this.data.changeValue.perInfo.area = e.detail.value
    app.globalData.userInfo.perInfo.area = e.detail.value
    this.setData({
      region: e.detail.value
    })
  },

  getSchool: function (e) {
    console.log("【在读学校】改变为 ", e.detail.value)
    this.data.changeValue.perInfo.school = e.detail.value
    app.globalData.userInfo.perInfo.school = e.detail.value
  },

  getGrade: function (e) {
    var grade = e.detail.value == '0' ? '高一' : (e.detail.value == '1' ? '高二' : '高三')
    console.log("【在读年级】改变为 ", grade)
    this.data.changeValue.perInfo.grade = grade
    app.globalData.userInfo.perInfo.grade = grade
    this.setData({
      index: e.detail.value,
    })
  },

  getQQ: function (e) {
    console.log("【QQ】改变为 ", e.detail.value)
    this.data.changeValue.perInfo.qq = e.detail.value
    app.globalData.userInfo.perInfo.qq = e.detail.value
  },

  getEmail: function (e) {
    console.log("【邮箱】改变为 ", e.detail.value)
    this.data.changeValue.perInfo.email = e.detail.value
    app.globalData.userInfo.perInfo.email = e.detail.value
  },
})