<!--
@author:wangjia
@date:20210101
@description: 进行缴费提交页面，本页面显示为icbc sdk返回的html代码进行的直接显示
              机制：通过web-view显示html raw code内容，html代码为icbc sdk ui类接口返回的动态代码，
-->

<template>
	<view>
		<view>	
			<web-view :src ='src'></web-view>
		</view>
	</view>
</template>

<script>
	import orderInfo from '@/components/orderInfo.vue';
	
	export default {
		components:{
			orderInfo
		},
		
		data() {
			return {
				order_id:'',
				charger_id:'',
				src:'',
				test: 0, // 正式项目编号test=0，测试项目编号test非0
			};
		},
		onShow(){
			let _this = this;
			this.order_id = uni.getStorageSync('orderid')
			this.charger_id = uni.getStorageSync('chargerid')
			console.log('order_id',  this.order_id)
			console.log('charger_id',  this.charger_id)
			this.src = 'http://111.231.32.214:9001/epay/ui/get?jdsbh=' + this.order_id + 
				'&skjg=' + this.charger_id + '&test=' + this.test
			this.$nextTick(() => {
			    //    document.form.submit();
			      })
		},
		
		methods:{
		}
	}
</script>

<style lang="scss">
	.wrap {
		padding: 30rpx;
	}
	.bg-subtitle {
		width: 750rpx;
		height: 900rpx;
		position: absolute;
		padding-top: 10rpx;
		padding-left: 40rpx;
		
		background: #FFFFFF;
		box-shadow: 0px 2px 24px rgba(0, 0, 0, 0.08);
		opacity: 1;
		border-radius: 50rpx;
	}
	.scroll-Y {
			height: 1000rpx;
		}
	.order-list-bg{
		background-color: #eef5fe;
		padding-top:20rpx;
		padding-left:15rpx;
		padding-right:15rpx;
		padding-bottom:10rpx;
		margin-top:10rpx;
	}
	
    .his-title{
		
		font-size: 23px;
		font-family: SourceHanSansSC-Regular;
		//line-height: 53px;
		color: #FFFFFF;
		opacity: 1;
	}	
	
	.his-main-bg{
		
	}
	
	.his-year-selector{
		position: relative;
		padding-top:  10rpx;
		padding-left: 100rpx;
		font-size: 30rpx;
		font-family: SourceHanSansSC-Regular;
		line-height: 48px;
		color: #353535;
		opacity: 1;
		z-index: 2;

	}
	
</style>
