// miniprogram/pages/manager/teacherDeatail/teacherDeatail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    A: '问题A：假如你发现自己的学生不理睬你或者不愿向你汇报学习情况，你会怎么做？',
    B: '问题B：假如你发现学生问的问题经常不是你的强项，你会怎么做？',
    fileID: 'cloud://yiban-edu.7969-yiban-edu-1301806073/teacher_supporting_materials/undefined.jpg'
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
    const app = getApp()
    const db = wx.cloud.database()
    let that = this
    await db.collection('person').doc(options.id)
      .get()
      .then(function(res) {
        console.log("【teacherDetail查询数据库person】", res)
        let fileID = "cloud://yiban-edu.7969-yiban-edu-1301806073/supporting_materials/" + res.data.openid + ".jpg"
        that.setData({
          teacher: res.data,
          fileID:fileID
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