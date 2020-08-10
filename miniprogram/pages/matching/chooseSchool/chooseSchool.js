// miniprogram/pages/matching/chooseSchool/chooseSchool.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top_introduce:'每一间网校都有其特点，但是他们都有一个共同点——都为以伴教育公益团队专业的网校团队，您可任意选择一个网校进行匹配哦',
    school:[],
    selectedSchoolID:'',
    selectedSchoolName:'',
    animation: '',
    introduce:'',
    selectedIndex:0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    const db = wx.cloud.database()
    db.collection('networkSchool')
      .get()
      .then(function(res) {
        console.log("【school查询数据库 networkSchool 】", res)
        for (let item of res.data){
          item.selectedFlag=false
        }
        that.setData({
          school: res.data
        })
        wx.hideLoading()
      })
  },
  changeToggle:function(e){
    var index = e.currentTarget.dataset.index;
    var ss=this.data.school[index]
    var that = this;
    console.log("你点到：",ss.schoolID)
    // that.setData({
    //   animation: 'slide-down'
    // })
    that.setData({
      selectedIndex:index,
      selectedSchoolID:ss.schoolID,
      selectedSchoolName:ss.name,
      introduce:ss.introduce,
      modalName: e.currentTarget.dataset.target
     })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  networkSchool: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    const db = wx.cloud.database()
    let that = this
    if( that.data.school[that.data.selectedIndex].selectedFlag==true){
      wx.showToast({
        title: '该网校未有空闲的老师,请另选其他网校！',
        icon: 'none',
        duration: 1500
      })
    }
    else{
      db.collection('networkSchool').where({
        schoolID: that.data.selectedSchoolID
      }).get()
      .then(function (res) {
        console.log("【matching查询数据库networkSchool】", res)
        wx.hideLoading()
        if (res.data.length == 0) {
          //不存在该网校
          wx.showToast({
            title: '不存在该网校！',
            icon: 'none',
            duration: 1500
          })
        } else {
          db.collection('person').where({
              schoolID: that.data.selectedSchoolID,
              job: 1,
              isCheck: 1,
              isMatchFull: false,
              openid: db.command.neq("")
            })
            .limit(1)
            .get()
            .then(function (ress) {
              if (ress.data.length == 1) {//选择成功
                
              } else {
                that.data.school[that.data.selectedIndex].selectedFlag=true
                wx.showToast({
                  title: '该网校未有空闲的老师,请另选其他网校！',
                  icon: 'none',
                  duration: 1500
                })
              }
            })
        }
        
      }).catch(function (err) {
        console.log(err)
      })
    }
    
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