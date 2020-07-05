// miniprogram/pages/manager/reviewComments/reviewComments.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    three: [{
      //normal
      title: "树洞评论",
    }, {
      //study
      title: "文章评论",
    }, {
      //method
      title: "视频评论",
    }],
    i: 0,
    x: 0,
    bottomtext: '------到底啦------',
    toBeReviewed: [
      // {
      //   name: '李桂明',
      //   time: '2020-06-07 11:12:13',
      //   pinglun: '所以监听用户的截图操作，提示用户进行分享，既缩短了以前分享截图的操作路径，避免了在之前长路径中的行为流失（比如截图完成后忘记分享或觉得麻烦放弃分享等等），也让用户觉得更加贴心。用户分享内容到社交媒体或好友。',
      // }],
      // haveReviewed: [{
      //   name: '李桂明',
      //   time: '2020-06-07 11:12:13',
      //   pinglun: '所以监听用户的截图操作，提示用户进行分享，既缩短了以前分享截图的操作路径，避免了在之前长路径中的行为流失（比如截图完成后忘记分享或觉得麻烦放弃分享等等），也让用户觉得更加贴心。用户分享内容到社交媒体或好友。',
      //   adopt: true, //已通过
      // }, {
      //   name: '李桂明',
      //   time: '2020-06-07 11:12:13',
      //   pinglun: '所以监听用户的截图操作，提示用户进行分享，既缩短了以前分享截图的操作路径，避免了在之前长路径中的行为流失（比如截图完成后忘记分享或觉得麻烦放弃分享等等），也让用户觉得更加贴心。用户分享内容到社交媒体或好友。',
      //   adopt: false, //不通过
      // }
    ],
    tree: {
      page: 1,
      toBeReviewed: [],
      haveReviewed: []
    },
    artical: {
      page: 1,
      toBeReviewed: [],
      haveReviewed: []
    },
    video: {
      page: 1,
      toBeReviewed: [],
      haveReviewed: []
    }
  },
  changeSwipe: function(e) {
    var adress = this.data.three[e.detail.current].title;
    console.log("目前在", adress);
    var type = e.detail.current
    this.setData({
      i: type
    })
  },

  tabSelect: function(e) {
    console.log(e.target.dataset.i)
    /*获取可视窗口宽度*/
    　
    var w = wx.getSystemInfoSync().windowWidth;　
    var leng = this.data.three.length;　
    var i = e.target.dataset.i;　
    var disX = (i - 2) * w / leng;　
    if (i != this.data.i) {　　
      this.setData({　　
        i: e.target.dataset.i　　
      })　
    }　
    this.setData({　　
      x: disX　
    })
  },

  bindChange: function(e) {
    console.log("目前在", this.data.three[e.detail.current].title);
    var that = this;
    let i = e.detail.current
    let type = ''
    if (i == 0) {
      type = 'tree'
    } else if (i == 1) {
      type = 'artical'
    } else {
      type = 'video'
    }
    that.setData({
      i: i,
      page: 1,
      type: type
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        var Client = wx.getMenuButtonBoundingClientRect();
        var height = res.windowHeight - (res.statusBarHeight + Client.height + (Client.top - res.statusBarHeight) * 2)
        that.setData({
          clientHeight: res.windowHeight,
          height_sys: height - 64,
        });
      }
    });
    this.loadToBeReviewedComment('tree', 1)
    this.loadToBeReviewedComment('artical', 1)
    this.loadToBeReviewedComment('video', 1)

    this.loadHaveReviewedComment('tree', 1)
    this.loadHaveReviewedComment('artical', 1)
    this.loadHaveReviewedComment('video', 1)
  },

  loadHaveReviewedComment: function(type, index) {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'getInteraction',
      data: {
        comment: true,
        like: false,
        store: false,
        type: 2,
        inteType: type,
        check: '_.nin(0)',
        page: index,
        num: 5
      }
    }).then(function(res) {
      console.log("【getIntraction, isCheck=1, type=" + type + ", index=" + index + "】", res)
      let haveReviewed = type + ".haveReviewed"
      if (type == 'tree') {
        that.setData({
          [haveReviewed]: that.data.tree.haveReviewed.concat(res.result.comments)
        })
      } else if (type == 'artical') {
        that.setData({
          [haveReviewed]: that.data.artical.haveReviewed.concat(res.result.comments)
        })
      } else {
        that.setData({
          [haveReviewed]: that.data.artical.haveReviewed.concat(res.result.comments)
        })
      }
      wx.hideLoading()
      return res
    }).catch(function(err) {
      console.log(err)
    })
  },


  loadToBeReviewedComment: function(type, index) {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'getInteraction',
      data: {
        comment: true,
        like: false,
        store: false,
        type: 2,
        inteType: type,
        check: 0,
        page: index,
        num: 5
      }
    }).then(function(res) {
      console.log("【getIntraction, isCheck=0, type=" + type + ", index=" + index + "】", res)
      let toBeReviewed = type + ".toBeReviewed"
      if (type == 'tree') {
        that.setData({
          [toBeReviewed]: that.data.tree.toBeReviewed.concat(res.result.comments)
        })
      } else if (type == 'artical') {
        that.setData({
          [toBeReviewed]: that.data.artical.toBeReviewed.concat(res.result.comments)
        })
      } else {
        that.setData({
          [toBeReviewed]: that.data.artical.toBeReviewed.concat(res.result.comments)
        })
      }

      wx.hideLoading()
      return res
    }).catch(function(err) {
      console.log(err)
    })
  },

  passComment: function(e) {
    let that = this
    let dataset = e.currentTarget.dataset
    let index = dataset.index
    let type = dataset.type
    console.log(dataset)
    wx.showModal({
      title: '通过审核',
      content: '是否通过该评论的审核？',
      cancelText: '不通过',
      confirmText: '通过',
      success(res) {
        let toBeReviewed = type + '.toBeReviewed[' + index + '].isCheck'
        let afterReviewed = type + '.toBeReviewed'
        let haveReviewed = type + '.haveReviewed'
        console.log(haveReviewed)
        if (res.confirm) {
          console.log('通过评论')
          wx.cloud.callFunction({
            name: 'test',
            data: {
              commentid: dataset.commentid,
              isCheck: 1
            }
          }).then(function(res) {
            console.log('reviewComments调用函数passComment', res)
            that.setData({
              [toBeReviewed]: 1
            })
            if (type == 'tree') {
              let havedata = that.data.tree.toBeReviewed[index]
              let tobedata = that.data.tree.toBeReviewed.splice(index + 1, 1)
              that.setData({
                [haveReviewed]: that.data.tree.haveReviewed.concat(havedata),
                [afterReviewed]: tobedata
              })
            } else if (type == 'artical') {
              let havedata = that.data.artical.toBeReviewed[index]
              let tobedata = that.data.artical.toBeReviewed.splice(index + 1, 1)
              that.setData({
                [haveReviewed]: that.data.artical.haveReviewed.concat(that.data.artical.toBeReviewed[index]),
                [afterReviewed]: tobedata
              })
            } else {
              let havedata = that.data.video.toBeReviewed[index]
              let tobedata = that.data.video.toBeReviewed.splice(index + 1, 1)
              that.setData({
                [haveReviewed]: that.data.video.haveReviewed.concat(that.data.video.toBeReviewed[index]),
                [afterReviewed]: tobedata
              })
            }
          }).catch(function(err) {
            console.log(err)
          })
        } else if (res.cancel) {
          console.log('不通过评论')
          wx.cloud.callFunction({
            name: 'passComment',
            data: {
              commentid: dataset.commentid,
              isCheck: 2
            }
          }).then(function(res) {
            console.log('reviewComments调用函数passComment', res)
            that.setData({
              [toBeReviewed]: 2
            })
            if (type == 'tree') {
              let havedata = that.data.tree.toBeReviewed[index]
              let tobedata = that.data.tree.toBeReviewed.splice(index + 1, 1)
              that.setData({
                [haveReviewed]: that.data.tree.haveReviewed.concat(havedata),
                [afterReviewed]: tobedata
              })
            } else if (type == 'artical') {
              let havedata = that.data.artical.toBeReviewed[index]
              let tobedata = that.data.artical.toBeReviewed.splice(index + 1, 1)
              that.setData({
                [haveReviewed]: that.data.artical.haveReviewed.concat(that.data.artical.toBeReviewed[index]),
                [afterReviewed]: tobedata
              })
            } else {
              let havedata = that.data.video.toBeReviewed[index]
              let tobedata = that.data.video.toBeReviewed.splice(index + 1, 1)
              that.setData({
                [haveReviewed]: that.data.video.haveReviewed.concat(that.data.video.toBeReviewed[index]),
                [afterReviewed]: tobedata
              })
            }
          }).catch(function(err) {
            console.log(err)
          })
        }
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.loading) {
      console.log("下拉刷新")
      let type = ''
      switch (this.data.i) {
        case 0:
          type = 'tree'
          this.setData({
            'tree.page': this.data.tree.page + 1
          })
          this.loadHaveReviewedComment(type, this.data.tree.page)
          this.loadToBeReviewedComment(type, this.data.tree.page)
          break
        case 1:
          type = 'artical'
          this.setData({
            'artical.page': this.data.artical.page + 1
          })
          this.loadHaveReviewedComment(type, this.data.artical.page)
          this.loadToBeReviewedComment(type, this.data.artical.page)
          break
        case 2:
          type = 'video'
          this.setData({
            'video.page': this.data.video.page + 1
          })
          this.loadHaveReviewedComment(type, this.data.video.page)
          this.loadToBeReviewedComment(type, this.data.video.page)
          break
      }
      //防止还未加载却多次上拉的情况
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})