// miniprogram/pages/ambassador/viewTeacher/viewTeacher.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:"暂时无匹配的老师",
    teacher:{
      // name:'小马',
      // perInfo:{
      //   gender:"男",
      //   school:"华南师范大学",
      //   major:'软件工程',
      //   speciality:[
      //     "语文","数学","英语"
      //   ]
      // },

    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("爱心大使viewTeacher传入的参数",options)
    const stuId = options.stuId
    var that = this
    wx.cloud.callFunction({
      name: 'aggregatePerson',
      data: {
        _id: stuId
      }
    }).then(res => {
      console.log("获取老师的信息",res)
      that.setData({
        teacher:res.result.list[0].personList.length==0?null:res.result.list[0].personList[0]
      })
    }).catch(err=>{
      console.log('获取邀请的学生失败失败')
      wx.showToast({
        title: '加载失败，请稍候再试',
        icon: 'none',
        duration: 1500,
        mask: true,
        success: function () {
        }
      })
    })
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

  }
})