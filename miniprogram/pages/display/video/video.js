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
  onLoad: async function(options) {
    wx.showLoading({
      title: '加载中',
    })
    console.log("video传入参数", options)
    this.setData({
      _options: options
    })
    await this.getVideo(options)
    this.getRecommend(options)
    this.getZanStatus()
    this.getCollectionStatus()
    this.uploadViewNum()
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
      that.setData({
        collection: {
          status: true,
          text: "已收藏",
          icon: "favorfill"
        }
      })
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
        var pages = getCurrentPages();
        var beforePage = pages[pages.length - 2];
        beforePage.uploadStoreNum(that.data._options)
      }).catch(function(err) {
        console.log(err)
        wx.showToast({
          title: '收藏失败',
        })
        that.setData({
          collection: {
            status: true,
            text: "收藏",
            icon: "favor"
          }
        })
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
      that.setData({
        zan: {
          status: true,
          text: "已赞",
          icon: "appreciatefill"
        }
      })
      await wx.cloud.callFunction({
        name: 'uploadInteraction',
        data: {
          'flag': 'like',
          'userOpenid': app.globalData.openid,
          'contextId': that.data.video._id
        }
      }).then(function(res) {
        console.log("【video调用函数uploadInteraction】【点赞成功】", res)
        var pages = getCurrentPages();
        var beforePage = pages[pages.length - 2];
        beforePage.uploadLikeNum(that.data._options)
      }).catch(function(err) {
        console.log(err)
        wx.showToast({
          title: '点赞失败',
        })
        that.setData({
          zan: {
            status: true,
            text: "点赞",
            icon: "appreciate"
          }
        })
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
  bindGetUserInfo: function(res) {
    console.log("【用户授权信息】", res)
    const app = getApp()
    let that = this
    let _res = res
    wx.getSetting({
      success: function(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.showToast({
            title: '请先授权！',
            icon: 'none',
            duration: 1500,
          })
          return
        } else {
          app.globalData.wxname = _res.detail.userInfo.nickName
          app.globalData.avatarUrl = _res.detail.userInfo.avatarUrl
          let bindtap = _res.currentTarget.dataset.bindtap
          switch (bindtap) {
            case 'timeOutSubmit':
              that.timeOutSubmit()
              break
            case 'postZan':
              that.postZan()
              break
            case 'postCollection':
              that.postCollection()
              break
          }
        }
      }
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
      if (app.globalData.isNew) {
        wx.showToast({
          title: '请先注册！',
          icon: 'none',
          duration: 1500,
          mask: true,
          success: function() {
            setTimeout(function() {
              wx.redirectTo({
                url: '../../my/login/login',
              })
              return
            }, 1500)
          }
        })
      } else {
        wx.cloud.callFunction({
          name: 'msgSecCheck',
          data: {
            content: content
          }
        }).then(function(res) {
          console.log("【敏感信息检测】", res.result)
          if (res.result.errCode == 0) {
            wx.cloud.callFunction({
              name: 'uploadInteraction',
              data: {
                'flag': "comment",
                'userOpenid': app.globalData.openid,
                'imgUrl': app.globalData.userInfo.avatarUrl,
                'nickname': app.globalData.wxname,
                'contextId': that.data._options.id,
                'comment': content,
                'type': 'video'
              },
              success: function(res) {
                console.log("【detail调用函数uploadInteraction】【flag: 'comment'（上传评论）】", res)
                wx.showToast({
                  title: '发送成功！显示还需要等后台管理员通过~',
                  icon: 'none',
                  duration: 3000,
                  success: function() {
                    // let comment = "video.commentList"
                    // let item = {}
                    // let date = new Date()
                    // item.imgUrl = app.globalData.userInfo.avatarUrl
                    // item.nickname = app.globalData.wxname
                    // item.comment = content
                    // that.setData({
                    //   [comment]: that.data.video.commentList.concat(item)
                    // })
                    var pages = getCurrentPages();
                    var beforePage = pages[pages.length - 2];
                    beforePage.uploadCommentNum(that.data._options)
                  }
                })
              },
              fail: function(err) {
                console.log(err)
              }
            })
          } else {
            wx.showToast({
              title: '发送失败！涉及敏感信息',
              icon: 'none',
              duration: 1500,
              mask: true
            })
          }
        })
      }
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
    await db.collection(options.collection).doc(options.id)
      .get()
      .then(function(res) {
        console.log("【video获取数据库inClass数据】", res)
        that.setData({
          video: {
            _id: res.data._id,
            title: res.data.title,
            time: res.data.time.substring(0, 10),
            vid: res.data.contextUrl,
            introduction: res.data.introdution,
            teacher_name: res.data.author,
          }
        })
        that.getComment()
      }).catch(function(err) {
        console.log(err)
      })
  },

  async getComment() {
    let that = this
    const db = wx.cloud.database()
    db.collection('interaction').where({
        contextId: that.data._options.id,
        flag: 'comment'
      }).get()
      .then(function(res) {
        console.log("【video查询数据库Interaction】", res)
        let commentList = "video.commentList"
        that.setData({
          [commentList]: res.data
        })
      })
  },

  /*
  获取推荐
  */
  getRecommend: function(options) {
    let that = this
    const db = wx.cloud.database()
    const _ = db.command
    db.collection(options.collection)
      .aggregate()
      .match({
        flag: _.or('pickData', 'course', 'speech'),
        _id: _.not(_.eq(that.data._options.id))
      })
      .sample({
        size: 4
      })
      .project({
        _id: true,
        img: '$coverImgUrl',
        title: '$title'
      })
      .end()
      .then(function(res) {
        console.log("【随机获取推荐信息】", res)
        let recommend = 'video.recommend'
        that.setData({
          [recommend]: res.list
        })
      }).catch(function(err) {
        console.log(err)
      })
  },

  uploadViewNum: function() {
    let that = this
    wx.cloud.callFunction({
      name: 'uploadViewNum',
      data: {
        collection: that.data._options.collection,
        _id: that.data._options.id
      }
    }).then(function(res) {
      console.log("【detail调用函数uploadViewNum】", res)
    }).catch(function(err) {
      console.log(err)
    })
  },

  back: function() {
    var pages = getCurrentPages();
    var beforePage = pages[pages.length - 2];
    var currentPage = pages[pages.length - 1];
    beforePage.uploadViewNum(this.data._options)
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