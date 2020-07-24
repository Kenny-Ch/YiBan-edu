// miniprogram/pages/manager/teacherDeatail/teacherDeatail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    A: '问题A：假如你发现自己的学生不理睬你或者不愿向你汇报学习情况，你会怎么做？',
    B: '问题B：假如你发现学生问的问题经常不是你的强项，你会怎么做？',
    fileID: '',
    QRfileID: '',
  },
  previewImage: function(e) {
    wx.previewImage({
      urls: e.target.dataset.url.split(',')
      // 需要预览的图片http链接  使用split把字符串转数组。不然会报错
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    this.setData({
      _options: options
    })
    const app = getApp()
    const db = wx.cloud.database()
    let that = this
    await db.collection('person').doc(options.id)
      .get()
      .then(function(res) {
        console.log("【teacherDetail查询数据库person】", res)
        let fileID = "cloud://yiban-edu.7969-yiban-edu-1301806073/teacher_supporting_materials/" + res.data.openid + ".jpg"
        let QRfileID = "cloud://yiban-edu.7969-yiban-edu-1301806073/QR/teacher/" + res.data.openid + ".jpg"
        that.setData({
          teacher: res.data,
          fileID: fileID,
          QRfileID: QRfileID
        })
      }).catch(function(err) {
        console.log(err)
      })
  },

  checkMatch: function(e) {
    let check = e.currentTarget.dataset.check
    let that = this
    const db = wx.cloud.database()
    const app = getApp()
    wx.cloud.callFunction({
      name: 'checkTeacher',
      data: {
        id: that.data.teacher._id,
        check: check
      }
    }).then(function(res) {
      console.log("【teacherDetail调用函数checkTeacher，check=" + check + "】", res)
      if (check == 'pass') {
        wx.showToast({
          title: '通过审核成功！',
          icon: 'none',
          mask: true,
          duration: 1500
        })
        that.setData({
          ['teacher.isCheck']: 1
        })
        wx.cloud.callFunction({
          name: 'recordTimeNode',
          data: {
            isNew: true,
            flag: 'register',
            otherName: "",
            otherOpenid: "",
            openid: that.data.teacher.openid,
            name: that.data.teacher.name,
            job: that.data.teacher.job
          }
        }).then(function(res) {
          console.log('时间节点已记录：', res)
        })
      } else if (check == 'reject') {
        wx.showToast({
          title: '退回申请成功！',
          icon: 'none',
          mask: true,
          duration: 1500
        })
        that.setData({
          ['teacher.isCheck']: 2
        })
      }

    }).catch(function(err) {
      console.log(err)
    })
  },

  back: function() {
    let data = {
      SchoolID: this.data._options.SchoolID,
      type: 'check'
    }
    let pages = getCurrentPages()
    let beforePage = pages[pages.length - 2]
    beforePage.onLoad(data)
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