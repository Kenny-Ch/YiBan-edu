const app = getApp();
let rewardedVideoAd = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: {
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
    isDisable: false,
    touchStartTime: 0,
    touchEndTime: 0,
    lastTapTime: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      _options: options
    })

    const _ts = this;

    await this.getArtical(options)

    app.getText(this.data.post.articalUrl, res => {
      let obj = app.towxml(res.data, 'markdown', {
        theme: 'light',
        events: {
          tap: (e) => {
            console.log('tap', e);
          }
        }
      });
      var list = _ts.data.post;
      list.artical = obj;
      _ts.setData({
        post: list,
      });
    });

    //获取文章所有评论
    this.getComment()
    this.getZanStatus()
    this.getCollectionStatus()
    this.getLikeNum(options)
    wx.hideLoading()
  },

  /**
   * 
   */
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
      console.log(err)
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
        contextId: that.data.post._id,
        flag: 'like'
      })
      .get()
      .then(function(res) {
        console.log("【detail获取数据库interaction数据】【flag: 'like'】", res)
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
          contextId: that.data.post._id,
          flag: 'store'
        })
        .get()
        .then(function(res) {
          console.log("【detail获取数据库interaction数据】【flag: 'store'】", res)
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
          'contextId': that.data.post._id,
          'contextName': that.data.post.title,
          'type': 'article',
          'database': that.data._options.collection
        }
      }).then(function(res) {
        console.log("【detail调用函数uploadInteraction】【收藏成功】", res)
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
    //此处按照逻辑需要判断是否曾经点过赞
    //若点过赞，则不能多次点赞，增加数据库负担
    //暂时不实现该功能
    if (!that.data.zan.status) {
      await wx.cloud.callFunction({
        name: 'uploadInteraction',
        data: {
          'flag': 'like',
          'userOpenid': app.globalData.openid,
          'contextId': that.data.post._id
        }
      }).then(function(res) {
        console.log("【detail调用函数uploadInteraction】【点赞成功】", res)
        let collection = "comment."
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
  // 防止重复点击


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

  formSubmit: function(e) {
    var that = this;
    try {
      let that = this;
      let commentPage = 1
      let content = that.data.commentContent;
      console.log(content)
      if (content == undefined || content.length == 0) {
        wx.showToast({
          title: '请输入内容',
          icon: 'none',
          duration: 1500
        })
        return
      }

      const app = getApp()
      wx.cloud.callFunction({
        name: 'uploadInteraction',
        data: {
          'flag': "comment",
          'userOpenid': app.globalData.openid,
          'imgUrl': app.globalData.userInfo.avatarUrl,
          'nickname': app.globalData.userInfo.name,
          'contextId': that.data.post._id,
          'comment': content
        },
        success: function(res) {
          console.log("【detail调用函数uploadInteraction】【flag: 'comment'】", res)
          wx.showToast({
            title: '发送成功',
            icon: 'none',
            duration: 1500,
            success: function() {
              let commentList = "post.commentList"
              let item = {
                comment: {}
              }
              item.comment.imgUrl = app.globalData.userInfo.avatarUrl
              item.comment.nickname = app.globalData.userInfo.name
              item.comment.comment = that.data.commentContent
              that.setData({
                [commentList]: that.data.post.commentList.concat(item)
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

  // 获取文章详情
  async getArtical(options) {
    let that = this
    let db = wx.cloud.database()
    console.log("detail页面【传入参数】", options)
    await db.collection(options.collection).doc(options.id)
      .get()
      .then(function(res) {
        console.log("【detail获取数据库" + options.collection + "数据】", res)
        let _id = "post._id"
        let title = "post.title"
        let defaultImageUrl = "post.defaultImageUrl"
        let articalUrl = "post.articalUrl"
        let createTime = "post.createTime"
        let collection = "post.collection"
        let viwerNum = "post.totalVisits"
        let month = res.data.time.getMonth() + 1;
        that.setData({
          [_id]: res.data._id,
          [title]: res.data.title,
          [defaultImageUrl]: res.data.coverImgUrl,
          [articalUrl]: res.data.contextUrl,
          [createTime]: res.data.time.getFullYear() + '年' + month + '月' + res.data.time.getDate() + '日',
          [collection]: res.data.collection,
          [viwerNum]: res.data.viwerNum
        })
        console.log('成功')
      }).catch(function(err) {
        console.log(err)
      })
  },

  getComment: async function() {
    var that = this;
    await wx.cloud.callFunction({
      name: 'getInteraction',
      data: {
        'comment': true,
        'like': false,
        'store': false,
        'type': 1,
        'id': that.data.post._id
      }
    }).then(function(res) {
      console.log("【detail调用函数getInteraction】", res)
      let comments = res.result.comments
      for (let item of comments) {
        let data = {}
        data.comment = item
        let commentList = "post.commentList"
        that.setData({
          [commentList]: that.data.post.commentList.concat(data)
        })
      }
      console.log(that.data.post.commentList)
    }).catch(function(err) {
      console.log(err)
    })
  },

  getLikeNum: function(options) {
    let that = this
    wx.cloud.callFunction({
      name: 'getInteractionNum',
      data: {
        'comment': false,
        'like': true,
        'selfLike': false,
        'id': options.id
      }
    }).then(function(res) {
      console.log("【detail调用函数getInteractionNum】", res)
      let like = "post.totalZans"
      that.setData({
        [like]: res.result.likesLen
      })
    })
  }

})