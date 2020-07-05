  // miniprogram/pages/manager/viewTeacher/viewTeacher.js
  Page({

    /**
     * 页面的初始数据
     */
    data: {
      // teacher: [{
      //     id: 1,
      //     name: '李桂明',
      //     school: '华南师范大学',
      //     major: '软件工程',
      //     subject: ['语文', '数学', '英语'],
      //   },
      //   {
      //     id: 2,
      //     name: '李桂明',
      //     school: '华南师范大学',
      //     major: '软件工程',
      //     subject: ['语文', '数学', '英语'],
      //   },
      //   {
      //     id: 3,
      //     name: '李桂明',
      //     school: '华南师范大学',
      //     major: '软件工程',
      //     subject: ['语文', '数学', '英语'],
      //   }
      // ],
      bottomtext:'------到底啦------',
    },
    delete: function(e) {
      let openid = e.currentTarget.dataset.openid
      let index = e.currentTarget.dataset.index
      let that = this
      wx.showModal({
        title: '提示',
        content: '确认要删除该志愿者教师?',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.cloud.callFunction({
              name: 'deleteMember',
              data: {
                openid: openid,
              }
            }).then(function(res) {
              console.log("【viewTeacher调用函数deleteMember】", res)
              let list = that.data.teacher.splice(index, index)
              console.log(list)
              that.setData({
                teacher: list
              })
            }).catch(function(err) {
              console.log(err)
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      const app = getApp()
      const db = wx.cloud.database()
      let that = this
      that.setData({
        type: options.type
      })
      if (options.type == 'match') {
        that.setData({
          isCheck: 1
        })
      } else {
        that.setData({
          isCheck: 0
        })
      }
      db.collection('person').where({
          job: 1,
          isCheck: that.data.isCheck
        }).get()
        .then(function(res) {
          console.log("【manager/viewTeacher查询数据库person】", res)
          for (let i in res.data)
            for (let j in res.data[i].perInfo.speciality)
              res.data[i].perInfo.speciality[j] = that.changeLanguage(res.data[i].perInfo.speciality[j])
          that.setData({
            teacher: res.data
          })
        }).catch(function(err) {
          console.log(err)
        })
    },

    changeLanguage: function(word) {
      switch (word) {
        case 'Chinese':
          word = '语文'
          break
        case 'Mathematics':
          word = '数学'
          break
        case 'English':
          word = '英语'
          break
        case 'Physics':
          word = '物理'
          break
        case 'Chemistry':
          word = '化学'
          break
        case 'Biology':
          word = '生物'
          break
        case 'Politics':
          word = '政治'
          break
        case 'History':
          word = '历史'
          break
        case 'Geography':
          word = '地理'
          break
      }
      return word
    },

    jump: function(e) {
      let index = e.currentTarget.dataset.index
      if (this.data.type == 'match') {
        wx.navigateTo({
          url: '../teacherMatch/teacherMatch?id=' + this.data.teacher[index]._id + '&openid=' + this.data.teacher[index].openid,
        })
      } else {
        wx.navigateTo({
          url: '../teacherDetail/teacherDetail?id=' + this.data.teacher[index]._id + '&openid=' + this.data.teacher[index].openid,
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