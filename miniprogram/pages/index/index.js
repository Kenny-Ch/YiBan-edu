// miniprogram/pages/index/index.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    day: 1,
    swiperList: [],
    three: [{
      title: "知识储备站",
    }, {
      title: "升学梦工厂",
    }, {
      title: "以伴课堂",
    }],
    i: 0,
    x: 0,
    clientHeight: 0,
    knowledgeReserve: [{
      url: "../display/artical/artical",
      image: "cloud://yiban-edu.7969-yiban-edu-1301806073/index/学科学习法.png",
      left: "学科学习法",
    }, {
      url: "../display/artical/artical",
      image: "cloud://yiban-edu.7969-yiban-edu-1301806073/index/学习资料分享.png",
      left: "学习资料分享",
    }, {
      url: "../display/artical/artical",
      image: "cloud://yiban-edu.7969-yiban-edu-1301806073/index/高考心得分享.png",
      left: "高考心得分享",
    }],
    dreamFactory: [{
      url: "../display/artical/artical",
      image: "cloud://yiban-edu.7969-yiban-edu-1301806073/index/选科资讯.png",
      left: "选科资讯",
    }, {
      url: "../dreamFactory/schoollist/schoollist",
      image: "cloud://yiban-edu.7969-yiban-edu-1301806073/index/高校资讯.png",
      left: "高校资讯",
    }, {
      url: "../dreamFactory/majorlist/majorlist",
      image: "cloud://yiban-edu.7969-yiban-edu-1301806073/index/专业了解.png",
      left: "专业了解",
    }],
    companionClass: [{
      url: "../display/classroom/classroom",
      image: "cloud://yiban-edu.7969-yiban-edu-1301806073/index/精品课堂.png",
      left: "精品课堂",
    }, {
      url: "../display/classroom/classroom",
      image: "cloud://yiban-edu.7969-yiban-edu-1301806073/index/学霸讲座.png",
      left: "学霸讲座",
    }],

    havematch: false,
    haveteacher: false,
  },
  changeSwipe: function (e) {
    var adress = (e.detail.current == 0) ? "知识储备站" : ((e.detail.current == 1) ? "升学梦工厂" : "以伴课堂");
    console.log("目前在", adress);
    var type = e.detail.current;
    this.setData({
      i: type
    });
  },
  tabSelect: function (e) {
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
  cardSwiper: function (e) {
    this.setData({
      cardCur: e.detail.current,
    })
  },


  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });

    wx.getUserInfo({
      success: function (res) {
        console.log("【index获取UserInfo】", res)
        app.globalData.wxname = res.userInfo.nickName
        app.globalData.avatarUrl = res.userInfo.avatarUrl
      }
    })
    /**
     * 获取openid并存入全局变量中，同时查询个人信息是否存在
     * 存在则放入全局变量中，并设置isNew为false
     * 不存在则只设置isNew为true
     * isNew也存入全局变量中
     */
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getOpenid',
    }).then(res => {
      console.log('【index调用云函数getOpenid返回值】', res.result)
      app.globalData.openid = res.result.openid

      //获取openid成功后获取个人信息
      wx.cloud.callFunction({
        name: 'getUserInfo',
        data: {
          openid: res.result.openid
        }
      }).then(res => {
        console.log('【index调用云函数getUserInfo返回值】', res.result)
        if (res.result.length == 0) {
          app.globalData.isNew = true
          app.globalData.isMatch = false
          app.globalData.userInfo = ""
        } else {
          this.getDays(res.result[0].registerDate)
          app.globalData.userInfo = res.result[0]
          app.globalData.isNew = false
          if (res.result[0].matchInfo != null) {
            app.globalData.isMatch = true
            app.globalData.matchInfo = res.result[0].matchInfo
          } else {
            app.globalData.isMatch = false
          }
          app.globalData.name = res.result[0].name
          app.globalData.isTeacher = res.result[0].job
        }
        /**
         * 通过判断isMatch和isTeacher(是否已是志愿者老师)来决定顶部选项卡的显示
         */
        var list = [];


        if (app.globalData.isTeacher == 0) {
          //已经匹配
          if (app.globalData.isMatch == true) {
            let item = {};
            item.id = 0;
            item.big_title = "已提交匹配登记";
            item.title = "高考陪伴公益行";
            item.small_title = "对教育资源较为落后的四五线城市高中生进行“一对一高考陪伴”，助力高中生考上理想的大学院校！";
            item.button = "查看登记";
            //是学生的情况
            if (app.globalData.userInfo.matchReject) {
              //匹配失败
              item.url = "../matching/matching"
            } else if (app.globalData.userInfo.matchWaitList.length != 0) {
              //这里跳转待审核界面
              item.url = "../matching/teacher/teacher?status=false&id=" + app.globalData.userInfo.matchWaitList[0];
            } else if (app.globalData.userInfo.matchList.length != 0) {
              //这里跳转已审核界面
              item.url = "../matching/teacher/teacher?status=true&id=" + app.globalData.userInfo.matchList[0];
            } else {
              //这里跳转匹配界面
              item.url = "../matching/result/result";
            }
            list.push(item)
          } else {
            let item = {};
            item.id = 0;
            item.big_title = "寻找你的以伴老师";
            item.title = "高考陪伴公益行";
            item.small_title = "对教育资源较为落后的四五线城市高中生进行“一对一高考陪伴”，助力高中生考上理想的大学院校！";
            item.button = "开始匹配";
            item.url = "../matching/matching";
            if ((app.globalData.userInfo.hasOwnProperty("job") && app.globalData.userInfo.job == 2) || (app.globalData.userInfo.hasOwnProperty("isSponsor") && app.globalData.userInfo.isSponsor == false)) {
              //break
            } else {
              list.push(item)
            }
          }
        } else if (app.globalData.isTeacher == 1) {
          //是老师的情况
          let item = {};
          item.id = 0;
          item.big_title = "感谢您的志愿付出";
          item.title = "一起迈向公益之路";
          item.small_title = "只要你有足够的热情，想为公益事业做出一份自己的贡献，都可以申请成为以伴志愿者！";
          item.button = "加入我们";
          if (app.globalData.userInfo.otherInfo == undefined) {
            //第二次注册未完成
            item.url = '../join/workingAbility/workingAbility'
          } else if (app.globalData.userInfo.isCheck == 0) {
            //第二次注册已完成但是未审核
            item.url = '../join/result/result'
          } else if (app.globalData.userInfo.isCheck == 1) {
            //后台审核通过
            item.url = "../join/myStudent/myStudent?id=" + app.globalData.userInfo._id;
            item.button = "查看我的学生"
          } else {
            //后台审核未通过
            item.url = 'error'
          }
          if (app.globalData.userInfo.otherInfo != undefined) {
            if ((app.globalData.userInfo.hasOwnProperty("isSponsor") && app.globalData.isSponsor) || app.globalData.userInfo.hasOwnProperty("job") && app.globalData.userInfo.job != 2)
              list.push(item)
          }
        } else {
          let item = {};
          item.id = 0;
          item.big_title = "寻找你的以伴老师";
          item.title = "高考陪伴公益行";
          item.small_title = "对教育资源较为落后的四五线城市高中生进行“一对一高考陪伴”，助力高中生考上理想的大学院校！";
          item.button = "开始匹配";
          item.url = "../matching/matching";
          if ((app.globalData.userInfo.hasOwnProperty("job") && app.globalData.userInfo.job == 2) || (app.globalData.userInfo.hasOwnProperty("isSponsor") && app.globalData.userInfo.isSponsor == false)) {
            //break
          } else {
            list.push(item)
          }


        }

        var item1 = {};
        item1.id = 1;
        item1.big_title = "伴学服务介绍";
        item1.title = "服务介绍细则";
        item1.small_title = "一对一高考陪伴”服务有着明确的服务对象，如您对伴学服务感兴趣，可查看具体介绍";
        item1.button = "具体介绍";
        item1.url = "../matching/introduce/introduce";
        list.push(item1)

        //老师注册成功，则不显示第三个swiper
        if (app.globalData.isNew == false && (app.globalData.userInfo.isCheck == 1 || app.globalData.isTeacher == 0) && app.globalData.userInfo.job == 0) {

        } else {
          var item2 = {};
          item2.id = 2;
          item2.big_title = "成为伴学志愿者";
          item2.title = "一起迈向公益之路";
          item2.small_title = "只要你有足够的热情，想为公益事业做出一份自己的贡献，都可以申请成为以伴志愿者！";
          item2.button = "加入我们";
          if (app.globalData.isNew == true) {
            item2.url = "../join/join";
          } else if (app.globalData.userInfo.otherInfo == undefined) {
            //第二次注册未完成
            item2.url = '../join/workingAbility/workingAbility'
          } else if (app.globalData.userInfo.isCheck == 0) {
            //第二次注册已完成但是未审核
            item2.url = '../join/result/result'
          } else {
            item2.url = "../join/join";
          }
          if (app.globalData.isNew == true || (app.globalData.userInfo.hasOwnProperty("isSponsor") && app.globalData.isSponsor) || (app.globalData.userInfo.hasOwnProperty("job") && app.globalData.userInfo.job != 2))
            list.push(item2)


        }

        //发起人
        var item3 = {};
        item3.id = 3;
        item3.big_title = "建立您的网校";
        item3.title = "以伴网校平台";
        item3.small_title = "以伴有着成百上千的网校，您可以借助以伴公益教育平台，实现您的公益梦想！";
        if (app.globalData.isNew == false && app.globalData.userInfo.hasOwnProperty("isSponsor") && app.globalData.userInfo.isSponsor == true) {
          item3.button = "我的网校";
          item3.url = "../sponsor/managerSponsor/managerSponsor?schoolID=" + app.globalData.userInfo.schoolID;
        } else {
          item3.button = "成为发起人";
          item3.url = "../sponsor/binding/binding";
        }
        list.push(item3)

        // //发起人
        // var item3 = {};
        // item3.id = 3;
        // item3.big_title = "建立您的网校";
        // item3.title = "以伴网校平台";
        // item3.small_title = "以伴有着成百上千的网校，您可以借助以伴公益教育平台，实现您的公益梦想！";
        // item3.button = "查看我的网校";
        // item3.url = "../sponsor/binding/binding";
        // list.push(item3)

        //形象大使
        if (!(app.globalData.isNew == false && app.globalData.userInfo.hasOwnProperty("isAmbassador") && app.globalData.userInfo.isAmbassador == true)) {
          var item4 = {};
          item4.id = 4;
          item4.big_title = "成为以伴爱心大使";
          item4.title = "一起让更多学生受益";
          item4.small_title = "以伴爱心大使，让更多学生加入以伴，享受以伴优质教育服务，为推进教育的发展贡献一份力量";
          item4.button = "一起加油";
          item4.url = "../ambassador/ambassador";
          list.push(item4)
        }



        that.setData({
          swiperList: list,
        })

        console.log("【app.globalData】", app.globalData)
        wx.hideLoading()
      })
    }).catch(err => {
      console.log('appjs获取openid失败')
    })
  },

  //计算相隔天数
  getDays: function (date) {
    date = new Date(date)
    var d1 = Date.parse(date)
    var d2 = Date.parse(new Date())
    var d = d2 - d1
    var days = Math.ceil(d / (24 * 3600 * 1000))
    this.setData({
      day: days
    })
  },

  bindChange: function (e) {
    var adress = (e.detail.current == 0) ? "知识储备站" : ((e.detail.current == 1) ? "升学梦工厂" : "以伴课堂");
    var that = this;
    that.setData({
      i: e.detail.current
    });
  },

  //跳转个人信息页面
  jumpToMyPage: function () {
    if (app.globalData.isNew) {
      console.log('【index】用户未注册，跳转注册页面')
      wx.navigateTo({
        url: '/pages/my/login/login',
        fail: (res) => {
          console.log('【index页面跳转注册界面失败】,res')
        },
        success: (result) => { },
      })
    } else {
      console.log('【index】用户已注册，跳转我的页面')
      wx.navigateTo({
        url: '/pages/my/my',
        fail: (res) => {
          console.log('【index页面跳转我的个人信息界面失败】,res')
        },
        success: (result) => { },
      })
    }
  },

  jumpToVideo: function (e) {
    console.log(e)
    let url = e.currentTarget.dataset.url
    const app = getApp()
    if (app.globalData.isNew) {
      wx.showToast({
        title: '请先注册！',
        icon: 'none',
        duration: 1500,
        mask: true,
        success: function () {
          setTimeout(function () {
            wx.navigateTo({
              url: '../my/login/login',
            })
            return
          }, 1500)
        }
      })
    } else if (app.globalData.isTeacher == 1) {
      wx.navigateTo({
        url: url
      })
    }
    else if (!app.globalData.isMatch) {
      console.log("err")
      wx.showToast({
        title: '还未匹配成功，暂时无法进入',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }
    else {
      wx.navigateTo({
        url: url
      })
    }
  },

  jumpSwiper: function (e) {
    let url = e.currentTarget.dataset.url
    if (url == '../matching/matching') {
      if (app.globalData.isNew) {
        wx.showToast({
          title: '请先注册！',
          icon: 'none',
          duration: 1500,
          mask: true,
          success: function () {
            setTimeout(function () {
              wx.navigateTo({
                url: '../my/login/login',
              })
            }, 1500)
          }
        })
      } else if (app.globalData.userInfo.matchReject) {
        wx.showModal({
          title: '匹配失败！',
          content: '可能是信息填写错误导致，请重新填写信息~',
          showCancel: true,
          confirmText: '重新填写',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateTo({
                url: '../matching/matching',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else {
        wx.navigateTo({
          url: '../matching/matching'
        })
      }
    }
    // else if (app.globalData.isTeacher == 0 && !app.globalData.isNew && app.globalData.userInfo.matchWaitList.length != 0) {
    //   wx.navigateTo({
    //     url: '../matching/teacher/teacher?status=false&id=' + app.globalData.userInfo.matchWaitList[0],
    //   })
    // } else if (app.globalData.isTeacher == 0 && !app.globalData.isNew && app.globalData.userInfo.matchList.length != 0) {
    //   wx.navigateTo({
    //     url: '../matching/teacher/teacher?status=true&id=' + app.globalData.userInfo.matchList[0],
    //   })
    // } 
    else if (url == 'error') {
      //老师注册后台审核未通过
      wx.showModal({
        title: '审核未通过！',
        content: '可能是信息填写错误导致，请重新填写信息~',
        showCancel: true,
        confirmText: '重新填写',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '../join/join',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.navigateTo({
        url: url
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