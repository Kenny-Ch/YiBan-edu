// miniprogram/pages/join/studentDetail/studentDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    student: {
      // name: '小明',
      // perInfo: {
      //   tel: '1342152651',
      //   gender: '男',
      //   area: ['广东省', '广州市', '番禺区'],
      //   school: '广州中学',
      //   grade: '高一',
      //   qq: '82718271',
      //   email: '9921212@qq.com',
      //   prove:'cloud://yiban-edu.7969-yiban-edu-1301806073/supporting_materials/opGQO5IzOz43A0kDcranTPwEjwbw.jpg'
      // },
      // subject: [{
      //     name: '语文',
      //     score: 99,
      //   },
      //   {
      //     name: '数学',
      //     score: 100,
      //   },
      //   {
      //     name: '英语',
      //     score: 88,
      //   },
      // ],
      // learning: '喜欢晚上学习',
      // expectationForTeacher: '希望老师能给我出多一些题目 希望老师能给我出多一些题目希望老师能给我出多一些题目',
      // isAdopt: false, //是否已通过
      fileID: "cloud://yiban-edu.7969-yiban-edu-1301806073/teacher_supporting_materials/undefined.jpg	"
    },
    A: '问题A：假如你向老师提问，而老师刚好有事，你会怎么做？',
    B: '问题B：假如你觉得老师给你提供的帮助不大，你会怎么做？',

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
  onLoad: function(options) {
    // console.log(options)
    let that = this
    const db = wx.cloud.database()
    db.collection('person').doc(options.id)
      .get()
      .then(function(res) {
        console.log("【studentDetail查询数据库person】", res)
        let subject = []
        for (let sub in res.data.matchInfo.weakSubject) {
          let name = that.changeLanguage(sub)
          let score = res.data.matchInfo.weakSubject[sub]
          let item = {
            name,
            score
          }
          subject.push(item)
        }
        res.data.subject = subject
        let fileID = "cloud://yiban-edu.7969-yiban-edu-1301806073/teacher_supporting_materials/" + res.data.openid + ".jpg"
        that.setData({
          student: res.data,
          fileID: fileID
        })
        if (options.status == 'false') {
          that.setData({
            ['student.isAdopt']: false
          })
        }
        that.setData({
          _options: options
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

  checkMatch: function(e) {
    const app = getApp()
    let that = this
    let status = e.currentTarget.dataset.status
    let teaOpenid = ''
    if (that.data._options.type == 'teacher') {
      teaOpenid = app.globalData.userInfo.openid
    } else {
      teaOpenid = that.data._options.openid
    }
    console.log(teaOpenid)
    wx.cloud.callFunction({
      name: 'chooseStuMatch',
      data: {
        teaOpenid: teaOpenid,
        stuOpenid: that.data.student.openid,
        res: status == 'true' ? 1 : 0
      }
    }).then(function(res) {
      console.log("【studentDetail调用函数chooseStuMatch】", res)
      wx.showToast({
        title: res.result,
        icon: 'none',
        duration: 1500,
        mask: true,
        success: function() {
          that.setData({
            ['student.isAdopt']: true
          })
        }
      })
    }).catch(function(err) {
      console.log(err)
    })
  },

  back: function() {
    let data = {
      id: this.data._options.beforeid,
      openid: this.data._options.openid
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