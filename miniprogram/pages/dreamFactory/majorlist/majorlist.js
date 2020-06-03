// miniprogram/pages/dreamFactory/majorlist/majorlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    majorlist: [{
        classAlias: '经济学',
        majors: [{
            majorId: 101,
            name: '金融工程',
          }, {
            majorId: 102,
            name: '经济学',
          }, {
            majorId: 103,
            name: '金融学',
          }, {
            majorId: 104,
            name: '国际经济与贸易',
          },
          {
            majorId: 104,
            name: '国际经济与贸易',
          },
        ],
      },
      {
        classAlias: '经济学',
        majors: [{
            majorId: 101,
            name: '金融工程',
          }, {
            majorId: 102,
            name: '经济学',
          }, {
            majorId: 103,
            name: '金融学',
          }, {
            majorId: 104,
            name: '国际经济与贸易',
          },
          {
            majorId: 104,
            name: '国际经济与贸易',
          },
        ],
      },
    ]
  },
  jumpDetail: function(e) {
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const db = wx.cloud.database()
    const $ = db.command.aggregate
    let that = this
    db.collection('collegeInfo').aggregate()
      .match({
        flag: 'major'
      })
      .group({
        _id: '$type',
        majors: $.addToSet({
          majorId: '$_id',
          name: '$name'
        }),
      })
      .end()
      .then(function(res) {
        console.log("【majorlist查询数据库collegeInfo】", res)
        that.setData({
          majorlist: res.list
        })
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