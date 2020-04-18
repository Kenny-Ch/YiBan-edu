//获取应用实例
const app = getApp();
Page({
	data: {
		isLoading: true,
		article: {}
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