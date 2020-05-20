//获取应用实例
const app = getApp();
Page({
  data: {
    appId: "wx8abaf00ee8c3202e",
    extraData : {
      // 把1221数字换成你的产品ID，否则会跳到别的产品
      id: "144926",
      // 自定义参数，具体参考文档
      customData: {
        customInfo: `iPhone OS 10.3.1 / 3.2.0.43 / 0`,
      }
		},
		isTiptrue: true,
	},
	closeGuide: function (e) {    
    wx.setStorage({      
      key: 'loadOpen',      
      data: 'OpenTwo'    
    })    
    this.setData({ isTiptrue: false }) 
  },



	onLoad: function () {
		// onLoad中添加以下代码
		let firstOpen = wx.getStorageSync("loadOpen")    
		if (firstOpen == undefined || firstOpen == '') { // 根据缓存周期决定是否显示新手引导      
			this.setData({ isTiptrue: true })    
		} 
		else {      
			this.setData({ isTiptrue: false }) 
		}
		var myurl='https://mgt-1301264585.cos.ap-guangzhou.myqcloud.com/%E6%B5%8B%E8%AF%95.md';
		const _ts = this;

		app.getText(myurl,res => {
			let obj = app.towxml(res.data,'markdown',{
				theme:'light',
				events:{
					tap:(e)=>{
						console.log('tap',e);
					}
				}
			});

			_ts.setData({
				article:obj,
				isLoading: false
			});
		});
		
	}
})