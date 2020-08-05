// miniprogram/pages/matching/matching.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subject: [{
      id: 1,
      name: '语文',
      en: 'Chinese',
      checked: false,
      score: '',
    }, {
      id: 2,
      name: '数学',
      en: 'Mathematics',
      checked: false,
      score: '',
    }, {
      id: 3,
      name: '英语',
      en: 'English',
      checked: false,
      score: '',
    }, {
      id: 4,
      name: '物理',
      en: 'Physics',
      checked: false,
      score: '',
    }, {
      id: 5,
      name: '化学',
      en: 'Chemistry',
      checked: false,
      score: '',
    }, {
      id: 6,
      name: '生物',
      en: 'Biology',
      checked: false,
      score: '',
    }, {
      id: 7,
      name: '政治',
      en: 'Politics',
      checked: false,
      score: '',
    }, {
      id: 8,
      name: '历史',
      en: 'History',
      checked: false,
      score: '',
    }, {
      id: 9,
      name: '地理',
      en: 'Geography',
      checked: false,
      score: '',
    }],
    judge: [{
      name: '是',
      checked: true,
      value: true
    }, {
      name: '否',
      checked: false,
      value: false
    }],
    question: [{
      name: '第一题',
      checked: true,
      value: '第一题'
    }, {
      name: '第二题',
      checked: false,
      value: '第二题'
    }],
    punch: true,
    class: true,
    one: true,
    getAlong: true,
    custom: '',
    willing: '',
    answer: '',
    sub: false,
    userAgree: false,
    networkNo: '', //网校编号
    isDisabled:false,
    inputInfo:'请填写你的网校编号'
  },
  tapInput() {
    this.setData({
        //在真机上将焦点给input
        inputFocus:true,
        //初始占位清空
        inputInfo: ''
    });
  },
  blurInput(e) {
    this.setData({
        inputInfo: e.detail.value || '请填写你的网校编号'
    });
  },
  goToUserLicence: function () {
    wx.navigateTo({
      url: './licence/licence',
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },
  choose_Change: function (e) {
    console.log('情景题选择：', e.detail.value)
    this.setData({
      one: e.detail.value,
    })
  },
  getAnswer: function (e) {
    console.log("answer:", e.detail.value)
    this.data.answer = e.detail.value
  },
  class_Change: function (e) {
    console.log('是否接受不定期班会：', e.detail.value)
    this.setData({
      class: e.detail.value,
    })
  },
  punch_Change: function (e) {
    console.log('是否愿意参加每日打卡记录学习情况：', e.detail.value)
    this.setData({
      punch: e.detail.value,
    })
  },
  getAlong_Change: function (e) {
    console.log('是否愿意与志愿者老师好好相处并学到知识：', e.detail.value)
    this.setData({
      getAlong: e.detail.value,
    })
  },
  checkboxChange: function (e) {
    console.log(e)
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    console.log("长度:" + e.detail.value.length);
    let ll = 0;
    var index = e.target.dataset.index - 1
    var checked = "subject[" + index + "].checked"
    for (let sub of this.data.subject) {
      if (sub.checked == true)
        ll = ll + 1;
    }
    if (ll >= 3 && this.data.subject[index].checked == false) {
      this.setData({
        [checked]: false,
      })
      wx.showToast({
        title: '最多只能选择3个科目',
        duration: 1000,
        icon: 'none'
      })
    } else {
      let score = "subject[" + index + "].score"
      this.setData({
        [checked]: !(this.data.subject[index].checked),
      })
      if ((this.data.subject[index].checked) == false) {
        this.setData({
          [score]: ''
        })
      }
    }

  },
  fraction: function (e) {
    let index = e.target.dataset.index - 1
    let score = "subject[" + index + "].score"
    this.setData({
      [score]: e.detail.value
    })
  },
  getCustom: function (e) {
    console.log("custom:", e.detail.value)
    this.data.custom = e.detail.value
  },
  getWilling: function (e) {
    console.log("willing:", e.detail.value)
    this.data.willing = e.detail.value
  },
  myCancel: function (e) {
    this.setData({
      sub: false,
    })
  },
  formSubmit: function (e) {
    this.setData({
      sub: true,
    })
  },
  uploadMatchInfo: function (e) {
    var weakSubject = {};
    this.setData({
      isDisabled: true
    })
    for (let sub of this.data.subject) {
      if (sub.checked == true)
        weakSubject[sub.en + ''] = sub.score
    }
    console.log("wak", weakSubject)
    // 检验不合格
    if (this.data.custom == '' || this.data.willing == '' || this.data.answer == '') {
      wx.showToast({
        title: '请填写完整信息！',
        duration: 1000,
        icon: 'none'
      })
      this.setData({
        isDisabled: false
      })
    } else if (weakSubject == undefined) {
      wx.showToast({
        title: '输入的分数有误！',
        icon: 'none'
      })
      this.setData({
        isDisabled: false
      })
    }
    //检验合格
    else {
      var that = this
      const app = getApp()

      //判断学校是否有至少一个科目匹配的老师
      var keys = []
      for (let key in weakSubject) {
        keys.push(key)
      }
      const db = wx.cloud.database()
      const _ = db.command
      db.collection('person').where({
          schoolID: that.data.networkNo,
          job: 1,
          isCheck: 1,
          isMatchFull: false,
          openid: db.command.neq(""),
          'perInfo.speciality': _.or([
            _.all([keys[0]]),
            _.all([keys[1]]),
            _.all([keys[2]])
          ])
        })
        .limit(1)
        .get()
        .then(function (ress) {
          if (ress.data.length == 1) {
            
            let data = {
              'openid': app.globalData.openid,
              'weakSubject': weakSubject,
              'willCheckIn': that.data.punch,
              'willMeeting': that.data.class,
              'willGetAlong': that.data.getAlong,
              'habitAndPlan': that.data.custom,
              'expectation': that.data.willing,
              'oneQuestion': that.data.one,
              'answer': that.data.answer,
              'schoolID': that.data.networkNo
            }
            wx.cloud.callFunction({
              name: 'uploadMatchInfo',
              data: data,
            }).then(function (res) {
              console.log("【matching调用函数uploadMatchInfo】")
              console.log('匹配信息添加成功！', res)
              wx.showToast({
                title: '登记成功！',
                icon: 'success',
                mask: true,
                success: function () {
                  app.globalData.matchInfo = data
                  app.globalData.matchList = []
                  app.globalData.matchWaitList = []
                  app.globalData.userInfo.matchReject = false
                  setTimeout(function () {
                    wx.redirectTo({
                      url: './result/result',
                    })
                  }, 1500)
                }
              })

            }).catch(function (err) {
              console.log('匹配信息添加失败!', err)
            })
          } else {
            that.setData({
              networkNo: '',
              sub: false,
              isDisabled: false
            })
            wx.showToast({
              title: '该网校未有和您匹配的老师，请另选其他网校！',
              icon: 'none',
              duration: 2000
            })
          }
        })

    }

  },
  /**
   * 生命周期函数--监听页面加载3
   */
  onLoad: function (options) {
    const app = getApp()
    if (app.globalData.matchInfo != undefined) {
      let info = app.globalData.matchInfo
      this.setData({
        subject: [{
          id: 1,
          name: '语文',
          en: 'Chinese',
          checked: info.weakSubject['Chinese'] != undefined ? true : false,
          score: info.weakSubject['Chinese'],
        }, {
          id: 2,
          name: '数学',
          en: 'Mathematics',
          checked: info.weakSubject['Mathematics'] != undefined ? true : false,
          score: info.weakSubject['Mathematics'],
        }, {
          id: 3,
          name: '英语',
          en: 'English',
          checked: info.weakSubject['English'] != undefined ? true : false,
          score: info.weakSubject['English'],
        }, {
          id: 4,
          name: '物理',
          en: 'Physics',
          checked: info.weakSubject['Physics'] != undefined ? true : false,
          score: info.weakSubject['Physics'],
        }, {
          id: 5,
          name: '化学',
          en: 'Chemistry',
          checked: info.weakSubject['Chemistry'] != undefined ? true : false,
          score: info.weakSubject['Chemistry'],
        }, {
          id: 6,
          name: '生物',
          en: 'Biology',
          checked: info.weakSubject['Biology'] != undefined ? true : false,
          score: info.weakSubject['Biology'],
        }, {
          id: 7,
          name: '政治',
          en: 'Politics',
          checked: info.weakSubject['Politics'] != undefined ? true : false,
          score: info.weakSubject['Politics'],
        }, {
          id: 8,
          name: '历史',
          en: 'History',
          checked: info.weakSubject['History'] != undefined ? true : false,
          score: info.weakSubject['History'],
        }, {
          id: 9,
          name: '地理',
          en: 'Geography',
          checked: info.weakSubject['Geography'] != undefined ? true : false,
          score: info.weakSubject['Geography'],
        }],
        judge: [{
          name: '是',
          checked: true,
          value: true
        }, {
          name: '否',
          checked: false,
          value: false
        }],
        punch: info.willCheckIn,
        class: info.willMeeting,
        getAlong: info.willGetAlong,
        custom: info.habitAndPlan,
        willing: info.expectation,
        one: info.oneQuestion == "第一题" ? true : false,
        answer: info.answer,
      })
    }
  },

  networkSchool: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    const db = wx.cloud.database()
    let that = this
    db.collection('networkSchool').where({
        schoolID: options.detail.value.networkNo
      }).get()
      .then(function (res) {
        console.log("【matching查询数据库networkSchool】", res)
        if (res.data.length == 0) {
          //不存在该网校
          that.setData({
            networkNo: ''
          })
          wx.showToast({
            title: '不存在该网校！',
            icon: 'none'
          })
        } else {
          db.collection('person').where({
              schoolID: options.detail.value.networkNo,
              job: 1,
              isCheck: 1,
              isMatchFull: false,
              openid: db.command.neq("")
            })
            .limit(1)
            .get()
            .then(function (ress) {
              if (ress.data.length == 1) {
                that.setData({
                  networkNo: options.detail.value.networkNo
                })
              } else {
                that.setData({
                  networkNo: ''
                })
                wx.showToast({
                  title: '该网校未有空闲的老师,请另选其他网校！',
                  icon: 'none'
                })
              }
            })


        }
        wx.hideLoading()
      }).catch(function (err) {
        console.log(err)
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
