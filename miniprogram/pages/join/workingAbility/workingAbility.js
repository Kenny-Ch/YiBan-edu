// miniprogram/pages/join/workingAbility/workingAbility.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: ['语文', '数学', '英语','物理','化学','生物','政治','历史','地理'],
    picker1:[1,2,3,4,5],
    judge: [{
      name: '是',
      checked: true,
      value: true
    }, {
      name: '否',
      checked: false,
      value: false
    }],
    punch:true,
  },
  punch_Change: function(e) {
    console.log('新学期的课程安排是否紧凑:', e.detail.value)
    this.setData({
      punch: e.detail.value,
    })
  },
  PickerChange4(e) {
    var grade = this.data.picker1[e.detail.value];
    console.log('可同时辅导几个学生：', grade)
    this.setData({
      index4: e.detail.value,
      grade4: grade       //学生人数
    })
  },
  PickerChange1(e) {
    var grade = this.data.picker[e.detail.value];
    console.log('年级选择：', grade)
    this.setData({
      index1: e.detail.value,
      grade1: grade       //科目1
    })
  },
  PickerChange2(e) {
    var grade = this.data.picker[e.detail.value];
    console.log('年级选择：', grade)
    this.setData({
      index2: e.detail.value,
      grade2: grade       //科目2
    })
  },
  PickerChange3(e) {
    var grade = this.data.picker[e.detail.value];
    console.log('年级选择：', grade)
    this.setData({
      index3: e.detail.value,
      grade3: grade       //科目3
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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