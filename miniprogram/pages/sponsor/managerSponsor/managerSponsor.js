// miniprogram/pages/sponsor/managerSponsor/managerSponsor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school: {
    },
    openSchoolQR:false,
    shuoming: '请将群二维码裁剪为以下格式后再提交保存：',
    img: "../../../images/my/tupianimgyulan.png",
    lzimg:"../../../images/sponsor/growUp.png",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const db = wx.cloud.database()
    let that = this
    //如果对应网校数据库存在fileID，则将本页面的fileID和img都赋值为数据库的fileID，否则跳过

    db.collection('networkSchool').where({
        schoolID: options.schoolID
      }).get()
      .then(function(res) {
        console.log("【sponsor/managerSponsor查询数据库networkSchool】", res)
        that.setData({
          school: res.data[0],
        })
        let month = res.data[0].date.getMonth() + 1
        let date = res.data[0].date.getFullYear() + '-' + month + '-' + res.data[0].date.getDate()
        that.setData({
          ['school.date']: date
        })
        that.updateNetworkSchoolInfo(options)
      }).catch(function(err) {
        console.log(err)
      })
      wx.stopPullDownRefresh()
  },
  upLoadSchoolQR: function (e) {
    var schoolID=e.target.dataset.id
    this.setData({
      openSchoolQR:true,
      schoolID:schoolID,
    })
  },
  uploadQR:function(e) {
    var that=this
    if(that.data.myfilePath){
      wx.cloud.uploadFile({
        cloudPath: 'networkSchoolQR/'+that.data.schoolID + '.jpg',
        filePath: that.data.myfilePath,
        
        success(res) {
          wx.showToast({
            title: '图片上传成功！',
            icon: 'none'
          })
          //将fileID保存到对应网校数据库
          that.setData({
            img:res.fileID,
          })
        },
        fail(err) {
          wx.showToast({
            title: '图片上传失败！',
            icon: 'none'
          })
        }
      })
    }else{
      wx.showToast({
        title: '请选择图片！',
        icon: 'none'
      })
    }
    
  },
  upload_picture: function(name) {
    //让用户选择或拍摄一张照片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        //选择完成会先返回一个临时地址保存备用
        const tempFilePaths = res.tempFilePaths
        //将照片上传至云端需要刚才存储的临时地址
        wx.navigateTo({
          url: '../../template/imageCropper/imageCropper?image='+tempFilePaths,
        })

      }
    })
  },
  jump: function(res) {
    let url = res.currentTarget.dataset.url
    let that = this
    wx.navigateTo({
      url: url + "&schoolID=" + that.data.school.schoolID
    })
  },
  
  myCancel:function (e) {
    this.setData({
      openSchoolQR:false,
    })
  },
  onPullDownRefresh: function() {
    var that = this
    this.onLoad({
      schoolID:that.school.schoolID
    }); //重新加载onLoad()
  },
  updateNetworkSchoolInfo: function (options) {
    var that = this
    wx.cloud.callFunction({
      name: 'countMembersNum',
      data: {
        schoolID: options.schoolID
      }
    }).then(function(res) {
      console.log("【sponsor/managerSponsor查询人数信息】",res)
      if(res.result!=null)
      that.setData({
        'school.studentNum': res.result.studentNum,
        'school.volunteerNum': res.result.volunteerNum,
        'school.waitCheckTeacherNum': res.result.waitCheckTeacherNum,
        'school.waitMatchStuNum': res.result.waitMatchStuNum
      })

    }).catch(function(err) {
      console.log(err)
    })
    
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