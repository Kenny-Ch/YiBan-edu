// miniprogram/pages/display/artical/artical.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '学科学习法',
    articals: [
    //   {
    //   title: '语文快速提分方法',
    //   introduction: '语文成绩一直是考生又爱又恨的一门科目，即使花很多时间在短时间内也不会有大幅度提高，想……',
    //   coverImgUrl: 'https://7969-yiban-edu-1301806073.tcb.qcloud.la/xxxx/0001/img.png?sign=73b287c9fecaad7746f1fedffd8cbc4d&t=1587107921',
    //   time: '2019年4月16日',
    //   praisePoints: 30,
    //   browseVolume: 30,
    //   comment: 5,
    // }, {
    //   title: '2分钟梳理三年数学知识',
    //   introduction: '数学复习要紧紧抓住课本，反复吃透课本是搞好数学复习的第一条生命线，要把课本中的基本概……',
    //   coverImgUrl: 'https://7969-yiban-edu-1301806073.tcb.qcloud.la/xxxx/0002/img.png?sign=44baffa7fc9c267220bebbbb526731d9&t=1587106425',
    //   time: '2019年4月14日',
    //   praisePoints: 30,
    //   browseVolume: 30,
    //   comment: 10,
    // }, {
    //   title: '物理压轴大题解题思路',
    //   introduction: '一份试卷的压轴题，难度大，分值也大，是用来鉴别考生掌握知识与综合应用能力高下的分档题……',
    //   coverImgUrl: 'https://7969-yiban-edu-1301806073.tcb.qcloud.la/xxxx/0003/img.png?sign=4c76d44994ab58bcbc7a66b92545a7d2&t=1587107934',
    //   time: '2019年4月12日',
    //   praisePoints: 30,
    //   browseVolume: 30,
    //   comment: 20,
    // }, {
    //   title: '错题集怎么做',
    //   introdution: '“人人都说错题集，可它到底怎么做”',
    //   coverImgUrl: 'https://7969-yiban-edu-1301806073.tcb.qcloud.la/xxxx/0004/img.jpg?sign=4cf7e64356f764b29cc583afdf0bb67b&t=1587109077',
    //   time: '2019年4月10日',
    //   praisePoints: 40,
    //   browseVolume: 30,
    //   comment: 20,
    // }, {
    //   title: '学点好方法',
    //   introduction: '学习学的好不好，关键还要看方法！',
    //   coverImgUrl: 'https://7969-yiban-edu-1301806073.tcb.qcloud.la/xxxx/0005/img.png?sign=b400738e96d3f5120b34243ab1966924&t=1587109221',
    //   time: '2019年4月8日',
    //   praisePoints: 30,
    //   browseVolume: 30,
    //   comment: 30,
    // }
    ],
    Anartical:"../detail/detail",
    Anvideo:"../video/video",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('【article页面】传入参数：', options)
    this.setData({
      title: options.name,
    })
    wx.showLoading({
      title: '加载中',
    })
    this.getArtical(options).then(function(res) {
      console.log("artical加载成功")
      wx.hideLoading()
    });
    
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

  },

  async getArtical(options) {
    
    var that = this
    let dataList;
    console.log(options.name)
    await wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getContext',
      data: {
        flag: options.name
      }
    }).then(res => {
      console.log("【artical调用函数getContext】", res)
      dataList = res.result;

    }).catch(err => {
      console.error(options.name, '获取失败', err)
    })
    this.getData(dataList);
  },

  async getData(dataList){
    for(let item of dataList){
      item.time = item.time.substring(0, 10);
      if(item.introdution.length>42){
        item.introdution=item.introdution.substring(0, 42)+"……"
      }
      if(item.isArticle==false){
        item.nav=this.data.Anvideo
      }
      else{
        item.nav=this.data.Anartical
      }
      //获取留言数
      await this.getInteraction(item);
    }
  },

  async getInteraction(item) {
    await wx.cloud.callFunction({
      name: 'getInteractionNum',
      data: {
        'comment': true,
        'like': true,
        'selfLike': false,
        'id': item._id
      }
    }).then(function(res) {
      console.log("【artical调用函数getInteractionNum】", res);
      item.praisePoints = res.result.likesLen;
      item.comment = res.result.commentsLen;
    })
    this.setData({
      articals: this.data.articals.concat(item)
    })
   console.log(this.data.articals)
  }
})