// miniprogram/pages/decompress/heart/community/community.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    community: [
      // {
      //   id: 0,
      //   open: false,
      //   icon: '../../../../images/decompress/qq.png',
      //   title: '学习疏导区',
      //   introduce: '有学习问题的同学可以在这里得到答案。',
      //   QR_code: 'https://7969-yiban-edu-1301806073.tcb.qcloud.la/community/learning.png?sign=df0447421726b9c127a4af8fcb82ca6a&t=1587123225',
      // },
      // {
      //   id: 1,
      //   open: false,
      //   icon: '../../../../images/decompress/qq.png',
      //   title: '成长解惑区',
      //   introduce: '成长疑惑是在所难免的，可在这里解惑。',
      //   QR_code: 'https://7969-yiban-edu-1301806073.tcb.qcloud.la/community/growUp.png?sign=e6129b7bb82619c6017fc674072e217c&t=1587123248',
      // },
      // {
      //   id: 2,
      //   open: false,
      //   icon: '../../../../images/decompress/qq.png',
      //   title: '情感解答区',
      //   introduce: '有任何情感都可以在这里倾述。',
      //   QR_code: 'https://7969-yiban-edu-1301806073.tcb.qcloud.la/community/emotion.png?sign=b90e9f6b0d60e7127d442fc2b511824c&t=1587123261',
      // },
    ],
  },
  kindToggle: function(e) {
    var id = e.currentTarget.id;
    console.log(id);
    var list = this.data.community;

    // 使用id获取打开的子列表
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      community: list
    });
  },

  getCommunities: function() {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wx.cloud.callFunction({
      name: 'getCommunities',
      data: {},
      success: function(res) {
        console.log("【community界面调用函数getCommunities】", res.result)
        let com = []
        for (let i = 0; i < res.result.length; i++) {
          var temp = {}
          temp.id = i
          temp.open = false
          temp.icon = '../../../../images/decompress/qq.png'
          temp.title = res.result[i].name
          temp.introduce = res.result[i].introduction
          temp.QR_code = res.result[i].qq
          com.push(temp)
        }
        that.setData({
          community: com
        })
        wx.hideLoading()
      },
      fail: console.error
    })
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
    this.getCommunities();
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