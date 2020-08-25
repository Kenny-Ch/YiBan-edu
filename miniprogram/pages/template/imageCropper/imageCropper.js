// miniprogram/pages/template/imageCropper/imageCropper.js
Page({
  data: {
    src: '',
    width:250,//宽度
    height: 250,//高度
  },
  onLoad: function (options) {
    //获取到image-cropper对象
    this.cropper = this.selectComponent("#image-cropper");
    //设置需要裁剪的图片路径，开始裁剪
    this.setData({
      src: options.image,
    });
    wx.showLoading({
      title: '加载中'
    })
  },
  cropperload(e) {
    console.log("cropper初始化完成");
  },
  loadimage(e) {
    console.log("图片加载完成", e.detail);
    wx.hideLoading();
    //重置图片角度、缩放、位置
    this.cropper.imgReset();
  },
  clickcut(e) {
    console.log(e.detail);
    //点击裁剪框阅览图片
    wx.previewImage({
      current: e.detail.url, // 当前显示图片的http链接
      urls: [e.detail.url] // 需要预览的图片http链接列表
    })
  },
  /**
   * 确认裁剪图片
   */
  getImg() {
    var that=this
    //调用函数说明中的getImg得到wx图片临时路径res.url
    wx.showLoading({
      title: '裁剪中...',
      mask: true
    })
    this.cropper.getImg(res => {
      console.log(res)
      var pages = getCurrentPages();
      var backPage = pages[pages.length - 2]; //上一个页面
      //将上传返回的图片地址记录下来，设置到上一个界面的this.data.promotionIcon中
      backPage.setData({
        myfilePath: res.url,
        img:res.url,
      });
      wx.hideLoading()
      //成功了返回到上一个界面
      wx.navigateBack()
    })
  }
})