// miniprogram/pages/manager/viewAmbassador/viewAmbassador.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ambassador: [
      // {
      //   id: 1,
      //   name: '小马',
      //   grade: '大二',
      //   studentNum: 55,
      //   school:'林伟华中学'
      // },
      // {
      //   id: 2,
      //   name: '小马',
      //   grade: '大二',
      //   studentNum: 55,
      //   school:'林伟华中学'
      // },
      // {
      //   id: 3,
      //   name: '小马',
      //   grade: '大二',
      //   studentNum: 55,
      //   school:'林伟华中学'
      // }
    ],
    bottomtext: '------到底啦------',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    var that = this
    wx.cloud.callFunction({
      name: 'getAmbassador',
      data: {
      }
    }).then(res => {
      console.log("获取爱心大师的信息",res.result)
      that.setData({
        ambassador:res.result
      })  

    }).catch(err=>{
      console.log('获取爱心大使失败')
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

  delete: function(e) {
    console.log(e);
    var index = e.currentTarget.dataset.index
    var _id = e.currentTarget.dataset.id
    var that = this
    if(_id) {
      wx.showModal({
        title: '提示',
        content: '您确定要删除该爱心大使吗？',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.cloud.callFunction({
              name: 'deleteMember',
              data: {
                _id: _id
              }
            }).then(res => {
              //实时删除，并更新ui
              that.data.ambassador.splice(index, 1)
              that.setData({
                ambassador: that.data.ambassador
              })
              wx.showToast({
                title: '删除成功',
                icon: 'none',
                duration: 1500,
                mask: true,
                success: function () {
                }
              })
            }).catch(err=>{
              console.log('删除失败',err)
              wx.showToast({
                title: '删除失败，请稍候再试',
                icon: 'none',
                duration: 1500,
                mask: true,
                success: function () {
                }
              })
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      
    } else {
      console.log('_id不存在')
      wx.showToast({
        title: '该用户异常，请联系管理员删除',
        icon: 'none',
        duration: 1500,
        mask: true,
        success: function () {
        }
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