// miniprogram/pages/display/classroom/classrooom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
    ],
    three: [{
      title: "语文",  //Chinese
    }, {
      title: "数学",  //Math
    }, {
      title: "英语",  //English
    }, {
      title: "物理",  //Physics
    }, {
      title: "生物",  //Biology
    }, {
      title: "化学",  //Chemistry
    }, {
      title: "政治",  //Politics
    }, {
      title: "历史",  //History
    }, {
      title: "地理",  //Geography
    }],
    i: 0,
    x: 0,
  },
  changeSwipe: function(e) {
    var adress =this.data.three[e.detail.current].title;
    console.log("目前在", adress);
    var type = e.detail.current;
    this.setData({
      i: type
    });
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
    var adress =this.data.three[e.detail.current].title;
    console.log("目前在", adress);
    var that = this;
    that.setData({
      i: e.detail.current
    });
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        var Client = wx.getMenuButtonBoundingClientRect();
        var height = res.windowHeight - (res.statusBarHeight + Client.height + (Client.top - res.statusBarHeight) * 2)
        that.setData({
          clientHeight: res.windowHeight,
          height_sys: height - 80,
        });
      }
    });
    console.log('【classroom页面】传入参数：', options)
    this.setData({
      title: options.name,
    })
    this.getVideo(options).then(function(res) {
      console.log("【classroom页面】video list加载成功")
      wx.hideLoading()
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  async getVideo(options) {
    var that = this
    let dataList;
    await wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getContext',
      data: {
        flag: options.name
      }
    }).then(res => {
      console.log("【classroom调用函数getContext】", res.result)
      dataList = res.result;
    }).catch(err => {
      console.error(options.name, '获取失败', err)
    })
    this.getData(dataList);
  },

  async getData(dataList){
    for(let item of dataList){
      var data = {}
      data.time = item.videoTime;
      data.name = item.author
      data.img = item.authorImg
      data.title = item.title
      data._id = item._id
      data.type=item.subtitle;
      this.setData({
        list: this.data.list.concat(data)
      })
    }
  },

  //仅用于video界面不报错
  uploadViewNum: function () {

  },
  uploadLikeNum: function () {

  },
  uploadCommentNum: function () {

  },
  uploadStoreNum: function () {

  },
})