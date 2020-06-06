// miniprogram/pages/decompress/heart/tree/tree.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    isNew: true,
    bottomtext:'------到底啦------',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    const db = wx.cloud.database()
    const app = getApp()
    that.setData({
      isNew: false
    })
    console.log("options", options)
    if (options.status == 'person') {
      wx.cloud.callFunction({
        name: 'getComments',
        data: {
          openid: app.globalData.userInfo.openid
        },
        success: function(res) {
          console.log("【tree调用函数getComments】", res.result)
          that.setList(res.result[0])
          wx.hideLoading()
        }
      })
    } else {
      wx.cloud.callFunction({
        name: 'getComments',
        success: function(res) {
          console.log("【tree调用函数getComments】", res.result)
          that.setList(res.result[0])
          wx.hideLoading()
        }
      })
    }
  },

  async setList(result) {
    var that = this
    let i = 0;
    for (let item of result.reverse()) {
      var temp = {}
      temp._id = item._id
      if (item.isAnonymous) {
        temp.userimg = '../../../../images/my/touxiang.jpg'
        temp.username = '匿名'
      } else {
        temp.userimg = item.imgUrl
        temp.username = item.name
      }
      console.log(item)
      
      var util = require('../../../template/unit.js');  
      temp.time =util.formatTime(new Date(item.time));
      temp.liuyan = item.comment
      temp.contextId = item._id
      temp.index = i
      i++
      await that.getInteraction(temp)
    }

  },

  async getInteraction(temp) {
    await wx.cloud.callFunction({
      name: 'getInteractionNum',
      data: {
        'comment': true,
        'like': true,
        'selfLike': true,
        'id': temp.contextId,
        'openid': getApp().globalData.openid
      }
    }).then(function(res) {
      console.log("【tree调用getInteractionNum】", res.result)
      temp.dianzan = res.result.likesLen;
      temp.pinglun = res.result.commentsLen;
      temp.isLike = res.result.isLike
    })
    this.setData({
      list: this.data.list.concat(temp)
    })
  },

  changeLike: function(e) {
    let that = this
    const app = getApp()
    let data = e.currentTarget.dataset
    console.log(data)
    const db = wx.cloud.database()
    if (data.like) {
      //取消点赞
      db.collection('interaction').where({
          'flag': 'like',
          'contextId': data._id,
          'userOpenid': app.globalData.openid
        })
        .remove()
        .then(function(res) {
          console.log("【tree删除数据到数据库interaction】【flag: like】【取消点赞】", res)
          let listLike = "list[" + data.index + "].isLike"
          let listLikeNum = "list[" + data.index + "].dianzan"
          that.setData({
            [listLike]: false,
            [listLikeNum]: that.data.list[data.index].dianzan - 1
          })
        })
    } else {
      // 点赞
      //此处如果用云函数，由于权限问题则取消点赞也需要写云函数，会导致速度慢，因此直接上传到数据库
      db.collection('interaction').add({
        data: {
          'flag': 'like',
          'userOpenid': app.globalData.openid,
          'contextId': data._id
        }
      }).then(function(res) {
        console.log("【tree添加数据到数据库interaction】【flag: like】【点赞】", res)
        let listLike = "list[" + data.index + "].isLike"
        let listLikeNum = "list[" + data.index + "].dianzan"
        that.setData({
          [listLike]: true,
          [listLikeNum]: that.data.list[data.index].dianzan + 1
        })
      })
    }
  },

  //更新点赞和评论数
  onChangeData: function(data) {
    console.log("【从detail返回到tree】", data)
    let listLike = "list[" + data.index + "].isLike"
    let listLikeNum = "list[" + data.index + "].dianzan"
    let listCommentNum = "list[" + data.index + "].pinglun"
    this.setData({
      [listLikeNum]: data.likesLen,
      [listCommentNum]: data.commentsLen
    })
    //因为get方法传过来的是string值，要转换成boolean值才能在前端进行if判断
    if (data.isLike != String(this.data.list[data.index].isLike)) {
      this.setData({
        [listLike]: !(this.data.list[data.index].isLike)
      })
    }
  },

  //更新列表
  onChangeList: function(data) {
    console.log("【从establish返回到tree】", data)
    data.index = this.data.list.length
    if (data.isAnonymous) {
      data.userimg = '../../../../images/my/touxiang.jpg'
      data.username = '匿名'
    }
    let list=[];
    list.push(data);
    this.setData({
      list: list.concat(this.data.list)
    })
  }
})