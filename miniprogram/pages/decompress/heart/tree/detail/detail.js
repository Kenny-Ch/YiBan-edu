// miniprogram/pages/decompress/heart/tree/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {
      // userImg: '../../../../../images/my/touxiang.jpg',
      // username: '清风自来',
      // time: '2020-04-19',
      // context: '为了借助社交产品的流量，让用户主动分享APP中的内容到社交平台来达到拉新和促活的目的，市场上绝大多数APP都有第三方分享的功能，它是内容分发的最有效途径',
      // dianzan: 21,
      // pinglun: 5,
      // isShowDian: false,
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
    isShowDian: false,
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
  // showDianzan: function(e) {
  //   var detail = this.data.detail;
  //   detail.isShowDian = !detail.isShowDian;
  //   this.setData({
  //     detail: detail,
  //   })
  // },

  formSubmit: async function(e) {
    var that = this
    try {
      let that = this;
      let commentPage = 1
      let content = that.data.commentContent;
      console.info(content)
      if (content == undefined || content.length == 0) {
        wx.showToast({
          title: '请输入内容',
          icon: 'none',
          duration: 1500
        })
        return
      }
      const app = getApp()
      console.log(this.data.detail)
      await wx.cloud.callFunction({
        name: 'uploadInteraction',
        data: {
          'flag': "comment",
          'userOpenid': app.globalData.openid,
          'imgUrl': "",
          'nickname': "",
          'contextId': that.data._options.id,
          'comment': content
        },
        success: function(res) {
          console.log("【detail调用函数uploadInteraction】【flag: 'comment'（上传评论）】", res)
          wx.showToast({
            title: '发送成功',
            icon: 'none',
            duration: 1500,
            success: function() {
              let comment = "detail.comment"
              let commentsLen = "detail.pinglun"
              let item = {}
              let date = new Date()
              item.imgUrl = ''
              item.nickname = ''
              item.time = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
              item.comment = content
              that.setData({
                [comment]: that.data.detail.comment.concat(item),
                [commentsLen]: that.data.detail.pinglun + 1
              })
            }
          })

        },
        fail: function(err) {
          console.log(err)
        }
      })
    } catch (err) {
      wx.showToast({
        title: '程序有一点点小异常，操作失败啦',
        icon: 'none',
        duration: 1500
      })
      console.info(err)
      wx.hideLoading()
    }
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
        let _id = "detail._id"
        let context = "detail.context"
        let username = "detail.username"
        let time = "detail.time"
        let likesLen = "detail.dianzan"
        let isLike = "detail.isShowDian"
        //此方法返回的month从0开始计算月份，因此+1
        let month = res.data.time.getMonth() + 1
        that.setData({
          '_options': options,
          [isLike]: options.isLike,
          [likesLen]: parseInt(options.likesLen),
          [_id]: res.data._id,
          [context]: res.data.comment,
          [username]: res.data.username,
          [time]: res.data.time.getFullYear() + '年' + month + '月' + res.data.time.getDate() + '日',
        })
      })
      .catch(function(err) {
        console.log(err)
      })

    console.log(this.data.detail.isShowDian)

    this.getInteraction(options)
  },


  getInteraction: async function(options) {
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
      console.log("【tree/detail调用函数getInteraction】", res)
      let comment = "detail.comment"
      let commentLen = "detail.pinglun"
      for (let i in res.result.comments) {
        res.result.comments[i].time = res.result.comments[i].time.substring(0, 10)
      }
      that.setData({
        [comment]: that.data.detail.comment.concat(res.result.comments),
        [commentLen]: res.result.comments.length
      })
    }).catch(function(err) {
      console.log(err)
    })

  },


  changeLike: function(e) {
    let that = this
    const app = getApp()
    let data = e.currentTarget.dataset
    const db = wx.cloud.database()
    if (this.data.detail.isShowDian == 'true') {
      //取消点赞
      db.collection('interaction').where({
          'flag': 'like',
          'contextId': that.data._options.id,
          'userOpenid': app.globalData.openid
        })
        .remove()
        .then(function(res) {
          console.log("【tree/detail删除数据到数据库interaction】【flag: like】【取消点赞】", res)
          let listLike = "detail.isShowDian"
          let listLikeNum = "detail.dianzan"
          that.setData({
            [listLike]: 'false',
            [listLikeNum]: that.data.detail.dianzan - 1
          })
        })
    } else {
      // 点赞
      //此处如果用云函数，由于权限问题则取消点赞也需要写云函数，会导致速度慢，因此直接上传到数据库
      db.collection('interaction').add({
        data: {
          'flag': 'like',
          'userOpenid': app.globalData.openid,
          'contextId': that.data._options.id
        }
      }).then(function(res) {
        console.log("【tree/detail添加数据到数据库interaction】【flag: like】【点赞】", res)
        let listLike = "detail.isShowDian"
        let listLikeNum = "detail.dianzan"
        that.setData({
          [listLike]: 'true',
          [listLikeNum]: that.data.detail.dianzan + 1
        })
      })
    }
  },

  backToTree: function() {
    var pages = getCurrentPages(); //当前页面栈

    if (pages.length > 1) {

      var beforePage = pages[pages.length - 2]; //获取上一个页面实例对象

      let data = {}
      data.index = this.data._options.index
      data.commentsLen = this.data.detail.pinglun
      data.isLike = this.data.detail.isShowDian
      data.likesLen = this.data.detail.dianzan
      beforePage.onChangeData(data); //触发父页面中的方法

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