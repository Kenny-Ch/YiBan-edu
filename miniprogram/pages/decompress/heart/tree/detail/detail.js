// miniprogram/pages/decompress/heart/tree/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {
      userImg: '../../../../../images/my/touxiang.jpg',
      username: '清风自来',
      time: '2020-04-19',
      context: '为了借助社交产品的流量，让用户主动分享APP中的内容到社交平台来达到拉新和促活的目的，市场上绝大多数APP都有第三方分享的功能，它是内容分发的最有效途径',
      dianzan: 21,
      pinglun: 5,
      isShowDian: true,
      comment: [
        // {
        //   img: '../../../../../images/my/touxiang.jpg',
        //   name: '桂明',
        //   time: '2020-04-19',
        //   context: '没问题，你快去吧。我在小区门口等你。实打实实打实打算大苏打',
        // },
        // {
        //   img: '../../../../../images/my/touxiang.jpg',
        //   name: '桂明',
        //   time: '2020-04-19',
        //   context: '没问题，你快去吧。我在小区门口等你。',
        // },
        // {
        //   img: '../../../../../images/my/touxiang.jpg',
        //   name: '桂明',
        //   time: '2020-04-19',
        //   context: '没问题，你快去吧。我在小区门口等你。',
        // },
        // {
        //   img: '../../../../../images/my/touxiang.jpg',
        //   name: '桂明',
        //   time: '2020-04-19',
        //   context: '没问题，你快去吧。我在小区门口等你。',
        // },
        // {
        //   img: '../../../../../images/my/touxiang.jpg',
        //   name: '桂明',
        //   time: '2020-04-19',
        //   context: '没问题，你快去吧。我在小区门口等你。实打实实打实打算大苏打',
        // },
        // {
        //   img: '../../../../../images/my/touxiang.jpg',
        //   name: '桂明',
        //   time: '2020-04-19',
        //   context: '没问题，你快去吧。我在小区门口等你。',
        // },
        // {
        //   img: '../../../../../images/my/touxiang.jpg',
        //   name: '桂明',
        //   time: '2020-04-19',
        //   context: '没问题，你快去吧。我在小区门口等你。',
        // },
        // {
          {
          imgUrl: '../../../../../images/my/touxiang.jpg',
          nickname: '桂明',
          time: '2020-04-19',
          comment: '没问题，你快去吧。我在小区门口等你。',
        },
      ]
    },

    focus: false,
    placeholder: "评论...",
  },
  commentInput: function(e) {
    this.setData({
      commentContent: e.detail.value
    })
  },
  onReplyBlur: function(e) {
    let that = this;
    const text = e.detail.value.trim();
    if (text === '') {
      that.setData({
        placeholder: "评论...",
      });
    }
  },
  showDianzan: function(e) {
    var detail = this.data.detail;
    detail.isShowDian = !detail.isShowDian;
    this.setData({
      detail: detail,
    })
  },
  formSubmit: function(e) {
    this.setData({
      commentContent: "",
      placeholder: "评论...",
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    const db = wx.cloud.database()
    db.collection('comments').doc(options.id)
      .get()
      .then(function(res) {
        console.log("【tree/detail调用数据库comments】", res)
        let context = "detail.context"
        let username = "detail.username"
        let time = "detail.time"
        that.setData({
          [context]: res.data.comment,
          [username]: res.data.username,
          [time]: res.data.time.getFullYear() + '年' + res.data.time.getMonth() + '月' + res.data.time.getDate() + '日',
        })
      })
      .catch(function(err) {
        console.log(err)
      })
    this.getInteraction(options)
  },


  getInteraction:async function(options) {
    let that = this
    await wx.cloud.callFunction({
      name: 'getInteraction',
      data: {
        'comment': true,
        'like': false,
        'store': false,
        'type': 1,
        'id': options.id
      }
    }).then(function(res) {
      console.log("【detail调用函数getInteraction】", res)
      let comment = "detail.comment"
      that.setData({
        [comment]: that.data.detail.comment.concat(res.result.comments)
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