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
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
        that.setData({
          student: res.data
        })
        if (options.type == 'manager' && options.status == 'false') {
          that.setData({
            ['student.isAdopt']: false
          })
        }
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