<template>
	<view class="main">
		<view style="margin-top:200rpx;margin-left:15rpx;">
			<text class="title">欢迎回来</text>
		</view>
		<view style="margin-top:90rpx;"> 
			<u-button :ripple="true" type="success" shape="circle" open-type="getUserInfo" @getuserinfo="mpWechatLogin"> <u-icon name="weixin-fill" size="40" style="margin-right:10rpx;"></u-icon> 微信授权登录</u-button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			mpWechatLogin(e)
			{
				let userInfo = e.detail.userInfo;
				uni.login({
					provider:"weixin",
					success(res){
						console.log(res);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.main{
		padding:20rpx 20rpx;
	}
	.title{
		font-size:48rpx;
		padding-bottom:15rpx;
		border-bottom: 5rpx solid #bbb;
	}
</style>
