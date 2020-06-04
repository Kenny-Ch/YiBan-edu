// miniprogram/pages/display/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: {
      vid: 'h0955s6ib3y',
      title: '历史课堂1：高中历史选择题技巧',
      img: 'cloud://yiban-edu.7969-yiban-edu-1301806073/teacher.png',
      teacher_name: '以伴团队',
      time: '2020-04-19',
      introduction: '历史学霸带你玩转高中历史！',
      commentList: [{
        cAvatarUrl: '../../../images/display/plimg.jpg',
        cNickName: '清风自来',
        comment: '很棒！',
        // childComment: [{
        //   cNickName: '清风自来',
        //   comment: '很棒！',
        // }]
      }],
      recommend: [{
          img: '../../../images/display/recommend.png',
          title: '【数学】求参数的取值范围 第一节',
          url: '',
        },
        {
          img: '../../../images/display/recommend.png',
          title: '【数学】求参数的取值范围 第一节',
          url: '',
        },
        {
          img: '../../../images/display/recommend.png',
          title: '【数学】求参数的取值范围 第一节',
          url: '',
        },
        {
          img: '../../../images/display/recommend.png',
          title: '【数学】求参数的取值范围 第一节',
          url: '',
        },
      ],

    },
    collection: {
      status: false,
      text: "收藏",
      icon: "favor"
    },
    zan: {
      status: false,
      text: "点赞",
      icon: "appreciate"
    },

    userInfo: {},
    commentId: "",
    placeholder: "评论...",
    focus: false,
    toName: "",
    toOpenId: "",
    nodata_str: "暂无评论，赶紧抢沙发吧",
    isShow: false,
    isDisable: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    console.log("video传入参数", options)
    this.data._options = options
    this.getVideo(options)
    this.getZanStatus()
    this.getCollectionStatus()
    wx.hideLoading()
  },

  onUnload: function() {
    if (rewardedVideoAd && rewardedVideoAd.destroy) {
      rewardedVideoAd.destroy()
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function() {
    wx.showLoading({
      title: '加载中...',
    })
    try {
      let that = this;
      if (that.data.nomore === true)
        return;

      let page = that.data.commentPage;
      let commentList = await api.getPostComments(page, that.data.post._id)
      if (commentList.data.length === 0) {
        that.setData({
          nomore: true
        })
        if (page === 1) {
          that.setData({
            nodata: true
          })
        }
      } else {
        that.setData({
          commentPage: page + 1,
          commentList: that.data.commentList.concat(commentList.data),
        })
      }
    } catch (err) {
      console.info(err)
    } finally {
      wx.hideLoading()
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 返回
   */
  navigateBack: function(e) {

  },

  /**
   * 获取用户头像
   * @param {} e 
   */
  getUserInfo: function(e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        showLogin: !this.data.showLogin,
        userInfo: e.detail.userInfo
      });
    } else {
      wx.switchTab({
        url: '../index/index'
      })
    }
  },

  /**
   * 获取点赞状态
   */
  getZanStatus() {
    const db = wx.cloud.database()
    const app = getApp()
    let that = this
    db.collection('interaction').where({
        userOpenid: app.globalData.openid,
        contextId: that.data.video._id,
        flag: 'like'
      })
      .get()
      .then(function(res) {
        console.log("【video获取数据库interaction数据】【flag: 'like'（点赞信息）", res)
        if (res.data.length != 0) {
          that.setData({
            zan: {
              status: true,
              text: "已赞",
              icon: "appreciatefill"
            }
          })
        }
      }).catch(function(err) {
        console.log(err)
      })
  },

  /**
   * 获取收藏状态
   */
  getCollectionStatus() {
    const db = wx.cloud.database()
    const app = getApp()
    let that = this
    if (!that.data.collection.status) {
      db.collection('interaction').where({
          userOpenid: app.globalData.openid,
          contextId: that.data.video._id,
          flag: 'store'
        })
        .get()
        .then(function(res) {
          console.log("【video获取数据库interaction数据】【flag: 'store'（收藏信息）】", res)
          if (res.data.length != 0) {
            that.setData({
              collection: {
                status: true,
                text: "已收藏",
                icon: "favorfill"
              }
            })
          }
        }).catch(function(err) {
          console.log(err)
        })
    }
  },

  /**
   * 收藏功能
   */
  postCollection: async function() {
    let that = this
    let app = getApp();
    if (!that.data.collection.status) {
      await wx.cloud.callFunction({
        name: 'uploadInteraction',
        data: {
          'flag': 'store',
          'userOpenid': app.globalData.openid,
          'contextId': that.data.video._id,
          'contextName': that.data.video.title,
          'type': "video",
          'database': 'inClass'
        }
      }).then(function(res) {
        console.log("【video调用函数uploadInteraction】【收藏成功】", res)
        that.setData({
          collection: {
            status: true,
            text: "已收藏",
            icon: "favorfill"
          }
        })
      }).catch(function(err) {
        console.log(err)
      })
    }
  },
  /**
   * 点赞功能
   */
  postZan: async function() {
    let that = this
    let app = getApp();
    if (!that.data.zan.status) {
      await wx.cloud.callFunction({
        name: 'uploadInteraction',
        data: {
          'flag': 'like',
          'userOpenid': app.globalData.openid,
          'contextId': that.data.video._id
        }
      }).then(function(res) {
        console.log("【video调用函数uploadInteraction】【点赞成功】", res)
        that.setData({
          zan: {
            status: true,
            text: "已赞",
            icon: "appreciatefill"
          }
        })
      }).catch(function(err) {
        console.log(err)
      })
    }
  },
  /**
   * 获取收藏和喜欢的状态
   */
  getPostRelated: async function(blogId) {
    let where = {
      postId: blogId,
      openId: app.globalData.openid
    }
    let postRelated = await api.getPostRelated(where, 1);
    let that = this;
    for (var item of postRelated.data) {
      if (config.postRelatedType.COLLECTION === item.type) {
        that.setData({
          collection: {
            status: true,
            text: "已收藏",
            icon: "favorfill"
          }
        })
        continue;
      }
      if (config.postRelatedType.ZAN === item.type) {
        that.setData({
          zan: {
            status: true,
            text: "已赞",
            icon: "appreciatefill"
          }
        })
        continue;
      }
    }
  },

  commentInput: function(e) {
    this.setData({
      commentContent: e.detail.value
    })
  },

  /**
   * 提交评论
   * @param {} e 
   */

  timeOutSubmit: async function(e) {
    let that = this
    await this.setData({
      isDisable: true
    })
    this.formSubmit(e)
    setTimeout(function() {
      that.setData({
        isDisable: false
      })
    }, 3000);
  },

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
      await wx.cloud.callFunction({
        name: 'uploadInteraction',
        data: {
          'flag': "comment",
          'userOpenid': app.globalData.openid,
          'imgUrl': app.globalData.userInfo.avatarUrl,
          'nickname': app.globalData.userInfo.name,
          'contextId': that.data._options.id,
          'comment': content
        },
        success: function(res) {
          console.log("【detail调用函数uploadInteraction】【flag: 'comment'（上传评论）】", res)
          wx.showToast({
            title: '发送成功',
            icon: 'none',
            duration: 1500
          })
          let comment = "video.commentList"
          let item = {
            comment: {}
          }
          let date = new Date()
          item.comment.imgUrl = app.globalData.userInfo.avatarUrl
          item.comment.nickname = app.globalData.userInfo.name
          item.comment.comment = content
          that.setData({
            [comment]: that.data.video.commentList.concat(item)
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
   * 点击评论内容回复
   */
  focusComment: function(e) {
    let that = this;
    let name = e.currentTarget.dataset.name;
    let commentId = e.currentTarget.dataset.id;
    let openId = e.currentTarget.dataset.openid;

    that.setData({
      commentId: commentId,
      placeholder: "回复" + name + ":",
      focus: true,
      toName: name,
      toOpenId: openId
    });
  },
  /**
   * 显示隐藏功能
   */
  showMenuBox: function() {
    this.setData({
      isShow: !this.data.isShow
    })
  },
  /**
   * 失去焦点时
   * @param {*} e 
   */
  onReplyBlur: function(e) {
    let that = this;
    const text = e.detail.value.trim();
    if (text === '') {
      that.setData({
        commentId: "",
        placeholder: "评论...",
        toName: ""
      });
    }
  },

  async getVideo(options) {
    let that = this
    const db = wx.cloud.database()
    await db.collection('inClass').doc(options.id)
      .get()
      .then(function(res) {
        console.log("【video获取数据库inClass数据】", res)
        let title = "video.title"
        let time = "video.time"
        let introduction = "video.introduction"
        let img = "video.img"
        let _id = "video._id"
        //此方法返回的month从0开始计算月份，因此+1
        let month = res.data.time.getMonth()
        that.setData({
          [title]: res.data.title,
          [teacher_name]:res.data.author,
          [time]: res.data.time.getFullYear() + '年' + month + '月' + res.data.time.getDate() + '日',
          [introduction]: res.data.introduction,
          [img]: res.data.coverImgUrl,
          [_id]: res.data.contextUrl
        })
        that.getComment(res.data.contextUrl)
      }).catch(function(err) {
        console.log(err)
      })
  },

  async getComment() {
    let that = this
    await wx.cloud.callFunction({
      name: 'getInteraction',
      data: {
        'comment': true,
        'like': false,
        'store': false,
        'type': 1,
        'id': that.data._options.id
      }
    }).then(function(res) {
      console.log("【video调用函数getInteraction】【flag：comment（获取评论）】", res)
      let comments = res.result.comments
      for (let item of comments) {
        let data = {}
        data.comment = item
        let commentList = "video.commentList"
        that.setData({
          [commentList]: that.data.video.commentList.concat(data)
        })
      }
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