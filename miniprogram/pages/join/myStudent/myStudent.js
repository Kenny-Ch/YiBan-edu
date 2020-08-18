// miniprogram/pages/manager/teacherMatch/teacherMatch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher: {
      // name: '李桂明',
      // student: [ //待审核的学生
      //   {
      //     id: 1,
      //     name: '李桂明',
      //     school: '广州中学',
      //     grade: '高二',
      //     subject: ['语文', '数学', '英语'],
      //   },
      // ],
      // studentAdopt: [ //已通过的学生
      //   {
      //     id: 2,
      //     name: '李桂明',
      //     school: '广州中学',
      //     grade: '高二',
      //     subject: ['语文', '数学', '英语'],
      //   },
      //   {
      //     id: 3,
      //     name: '李桂明',
      //     school: '广州中学',
      //     grade: '高二',
      //     subject: ['语文', '数学', '英语'],
      //   }
      // ],
    },
    text:"暂时无匹配的学生",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const app = getApp()
    const db = wx.cloud.database()
    let that = this
    wx.cloud.callFunction({
        name: 'aggregatePerson',
        data: {
          _id: options.id
        }
      }).then(function(res) {
        console.log("【join/myStudent调用aggregatePerson函数】", res)
        let matchList = res.result.list[0].personList
        for (let item in matchList) {
          let subject = []
          if(matchList[item].matchInfo && matchList[item].matchInfo.weakSubject){
            for (let sub in matchList[item].matchInfo.weakSubject) {
              subject.push(that.changeLanguage(sub))
            }
          }
          matchList[item].subject = subject
        }
        let matchWaitList = res.result.list[0].personWaitList
        for (let item in matchWaitList) {
          let subject = []
          for (let sub in matchWaitList[item].matchInfo.weakSubject) {
            subject.push(that.changeLanguage(sub))
          }
          matchWaitList[item].subject = subject
        }
        that.setData({
          teacher: {
            name: res.result.list[0].name,
            student: matchWaitList,
            studentAdopt: matchList,
            openid: res.result.list[0].openid
          }
        })
      })
      .catch(function(err) {
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
  deleteStu: function (e) {
    console.log(e.currentTarget)
    let index = e.currentTarget.dataset.index
    let openid = e.currentTarget.dataset.openid
    let that = this
    wx.showModal({
      title: '是否删除该学生？',
      content: '一经操作，不可更改。',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.cloud.callFunction({
            name: 'dropRelation',
            data: {
              selfOpenid: this.data.openid,
              dropOpenid: openid
            }
          }).then(function (res) {
            console.log("【teacherMatch调用函数deleteMember】", res)
            let list = that.data.teacher.studentAdopt.splice(index - 1, 1)
            that.setData({
              ['teacher.studentAdopt']: list
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