//获取应用实例
const app = getApp();
Page({
	data: {
		isLoading: true,
		article: {}
	},
	onLoad: function () {
		const _ts = this;

		app.getText('https://7969-yiban-edu-1301806073.tcb.qcloud.la/1/Typora%E5%9F%BA%E7%A1%80%E6%95%99%E7%A8%8B.md',res => {
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