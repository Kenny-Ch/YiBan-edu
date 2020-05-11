// miniprogram/pages/decompress/heart/tree/tree.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
    //   {
    //   id: 0,
    //   userimg: '../../../../images/my/touxiang.jpg',
    //   username: '小明',
    //   time: '04-19',
    //   liuyan: '为了借助社交产品的流量，让用户主动分享APP中的内容到社交平台来达到拉新和促活的目的，市场上绝大多数APP都有第三方分享的功能，它是内容分发的最有效途径……',
    //   dianzan: 21,
    //   pinglun: 21,
    //   isShowDian: false,
    //   isShowPing: false,
    // }, {
    //   id: 1,
    //   userimg: '../../../../images/my/touxiang.jpg',
    //   username: '小明',
    //   time: '04-19',
    //   liuyan: '为了借助社交产品的流量，让用户主动分享APP中的内容到社交平台来达到拉新和促活的目的，市场上绝大多数APP都有第三方分享的功能，它是内容分发的最有效途径……',
    //   dianzan: 21,
    //   pinglun: 21,
    //   isShowDian: false,
    //   isShowPing: false,
    // }, 
    ],

  },
  showDianzan: function(e) {
    var list = this.data.list;
    list[e.currentTarget.dataset.id].isShowDian = !list[e.currentTarget.dataset.id].isShowDian;
    this.setData({
      list: list,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.cloud.callFunction({
      name: 'getComments',
      success: function(res) {
        console.log("【tree调用getComments】", res.result)
        that.setList(res.result[0])
      }
    })

  },

  async setList(result) {
    var that = this
    for (let item of result) {
      var temp = {}
      // temp.id = item.
      if (item.isAnonymous) {
        temp.userimg = '../../../../images/my/touxiang.jpg'
        temp.username = '匿名'
      } else {
        temp.userimg = ''
        temp.username = item.name
      }
      console.log(item)
      temp.time = item.time.substring(0, 10)
      temp.liuyan = item.comment
      temp.contextId = item._id
      await that.getInteraction(temp)
    }
  },

  async getInteraction(temp) {
    await wx.cloud.callFunction({
      name: 'getInteraction',
      data: {
        'comment': true,
        'like': true,
        'store': false,
        'type': 0,
        'id': temp.contextId
      }
    }).then(function(res) {
      console.log("【tree调用getInteraction】", res.result)
      temp.dianzan = res.result.likes.length;
      temp.pinglun = res.result.comments.length;
    })
    this.setData({
      list: this.data.list.concat(temp)
    })
  }

})