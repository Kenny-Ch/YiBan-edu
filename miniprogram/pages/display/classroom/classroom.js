// miniprogram/pages/display/classroom/classrooom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
      title:'历史课堂1：高中历史选择题技巧',
      img:'../../../images/display/teacher.png',
      name:'以伴团队',
      time:'13:41',
      have:'未观看',
    },
    {
      title:'语文课堂1：高考病句破题技巧',
      img:'../../../images/display/teacher.png',
      name:'以伴团队',
      time:'17:30',
      have:'未观看',
    },
    {
      title:'数学课堂1：求参数的取值范围',
      img:'../../../images/display/teacher.png',
      name:'以伴团队',
      time:'18:51',
      have:'未观看',
    }
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('【classroom页面】传入参数：', options)
    this.setData({
      title: options.name,
    })
    this.getVideo(options).then(function(res) {
      console.log("【classroom页面】video list加载成功")
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
      data.img = item.coverImgUrl
      data.title = item.title
      data._id = item._id
      this.setData({
        list: this.data.list.concat(data)
      })
    }
  }
})