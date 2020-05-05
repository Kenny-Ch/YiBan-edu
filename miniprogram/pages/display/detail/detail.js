const app = getApp();
let rewardedVideoAd = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: {
      title: '以伴干货篇 | 学点好方法',
      defaultImageUrl: 'https://7969-yiban-edu-1301806073.tcb.qcloud.la/xxxx/0005/0005.jpg?sign=8ab25e435f2084606c7f270feea8e401&t=1587129429',
      createTime: '2020-02-05',
      totalVisits: 292,
      totalZans: 54,
      commentList: [{
        cAvatarUrl: '../../../images/display/plimg.jpg',
        cNickName: '清风自来',
        comment: '很棒！',
        childComment: [{
          cNickName: '清风自来',
          comment: '很棒！',
        }]
      }],
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    let that = this;
    let blogId = options.id;
    if (options.scene) {
      blogId = decodeURIComponent(options.scene);
    }
    const _ts = this;

    app.getText('https://mgt-1301264585.cos.ap-guangzhou.myqcloud.com/0005/0005.md', res => {
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
    this.getAllComment();
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
   * 收藏功能
   */
  postCollection: async function() {
    wx.cloud.callFunction({
      name: 'uploadInteraction',
      data: {
        'flag': 'store',
        'userOpenid': app.globalData.openid,
        'contextId': ''
      },
      success: function(res) {
        console.log("【detail调用函数uploadInteraction，flag=store】", res)
      },
      fail: console.err
    })

  },
  /**
   * 点赞功能
   */
  postZan: async function() {
    wx.cloud.callFunction({
      name: 'uploadInteraction',
      data: {
        'flag': 'like',
        'userOpenid': app.globalData.openid,
        'contextId': ''
      },
      success: function(res) {
        console.log("【detail调用函数uploadInteraction，flag=like】", res)
      },
      fail: console.err
    })
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
  formSubmit: function(e) {
    var that = this;
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

      wx.cloud.callFunction({
        name: 'uploadInteraction',
        data: {
          'flag': "comment",
          'userOpenid': app.globalData.openid,
          'imgUrl': that.data.userInfo.avatarUrl,
          'nickname': that.data.userInfo.nickName,
          'contextId': '111',
          'comment': content
        },
        success: function(res) {
          console.log("【detail调用函数uploadInteraction，flag=comment】", res)
        },
        fail: function(err) {
          console.log(err)
        }
      })

      wx.requestSubscribeMessage({
        tmplIds: [config.subcributeTemplateId],
        success(res) {
          wx.showLoading({
            title: '加载中...',
          })
          console.info(res)
          console.info(res[config.subcributeTemplateId])
          that.submitContent(content, commentPage, res[config.subcributeTemplateId]).then((res) => {
            console.info(res)
            wx.hideLoading()
          })
        },
        fail(res) {
          console.info(res)
          wx.showToast({
            title: '程序有一点点小异常，操作失败啦',
            icon: 'none',
            duration: 1500
          })
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

  getAllComment: function() {
    wx.cloud.callFunction({
      name: 'getInteraction',
      data: {
        'comment': true,
        'like': false,
        'store': false,
        'type': 0
      },
      success: function(res) {
        console.log("【detail调用函数getInteraction】", res)
      },
      fail: function(err) {
        console.log(err)
      }
    })
  }

})