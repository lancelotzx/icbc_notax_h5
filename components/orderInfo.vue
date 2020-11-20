<template>
	<view>
		<view class="order-info">
			<u-row :gutter="0">
				<u-col :span="6" align="left">
					<u-tag type="info" text="图文专问" shape="circle" mode="dark"></u-tag>
				</u-col>
				<u-col :span="6" align="right">
					<view style="text-align: right;">
						<u-tag :type="statusFormat[0].type" :text="statusFormat[0].title" shape="circle"></u-tag>
					</view>
				</u-col>
			</u-row>
			<view style="margin-top:15rpx">
				<u-row :gutter="0">
					<u-col :span="10">
						<text class="order-remark">我想请问一下没有户口本可以登记结婚吗？</text>
					</u-col>
					<u-col :span="2">
						<view style="text-align: center;">
							<text class="order-price">￥199</text>
						</view>
					</u-col>
				</u-row>
			</view>
			<view style="margin-top:40rpx;">
				<u-row :gutter="0">
					<u-col :span="6">
						<u-row :gutter="0">
							<u-col :span="2">
								<u-avatar src="http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg" size="50"></u-avatar>
							</u-col>
							<u-col :span="10">
								<text class="order-lawyer-name">张三律师 婚姻家庭</text>
							</u-col>
						</u-row>
					</u-col>
					<u-col :span="6">
						<view style="text-align: right;">
							<view>
								<u-button size="mini" shape="circle" :ripple="true">立即支付</u-button>
							</view>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
	</view>
</template>

<script>
	let statusFormat = [
		{
			status:0,
			title:"未支付",
			type:"error"
		},
		{
			status:1,
			title:"已支付",
			type:"success"
		},
		{
			status:2,
			title:"正在服务",
			type:"primary"
		},
		{
			status:3,
			title:"已结束",
			type:"warning"
		}
	]
	export default {
		data() {
			return {
				statusFormat
			};
		}
	}
</script>

<style lang="scss">
.order-info{
		background-color: white;
		border:1rpx solid white;
		border-radius:20rpx;
		padding:25rpx;
		margin-bottom:20rpx;
	}
	.order-remark{
		font-size:30rpx;
	}
	.order-price{
		color:red;
		font-size:30rpx;
	}
	.order-lawyer-name{
		font-size:25rpx;
	}
</style>
