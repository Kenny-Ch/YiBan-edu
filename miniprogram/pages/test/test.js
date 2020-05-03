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
    }
  },
	onLoad: function () {
		const _ts = this;

		app.getText('https://mgt-1301264585.cos.ap-guangzhou.myqcloud.com/Typora%E5%9F%BA%E7%A1%80%E6%95%99%E7%A8%8B.md',res => {
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