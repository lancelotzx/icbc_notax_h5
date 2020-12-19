<!--
@author:wangjia
@date:20201220
@description: 缴费历史记录的单元数据组件，从父组件传递的obj应该包含
   1. 缴款的收款方中文名称
   2. 市区、区县标志
   3. 缴款金额
   4. 缴款日期 时间

-->
<template>
	<view>
		<view class="order-info">
			<u-row :gutter="0">
				<u-col :span="9" align="left">
					<text class="order-receiver-name">茂名市教育局学生服务中心茂名市教育局学生服务中心</text>
				</u-col>
				<u-col :span="3" align="right">
					<view style="text-align: right;">
						<u-tag type="info" text="市级" shape="circle"></u-tag>
					</view>
				</u-col>
			</u-row>
			<view style="margin-top:15rpx">
				<u-row :gutter="0">
					
					<u-col :span="2">
						<view style="text-align: center;">
							<text class="order-price">￥199912.00</text>
						</view>
					</u-col>
					<u-col :span="3" :offset="6">
						<view style="text-align: right;">
							<image src="/static/images/his-03.png" mode="widthFix" style="width:40%; display: block; position: absolute;">
							</image>
						</view>
					</u-col>
				</u-row>
			</view>
			<view style="margin-top:16rpx;">
				<u-row :gutter="0">
					<u-col :span="6">
						<u-row :gutter="0">
							<u-col :span="10">
								<text class="order-datetime">2020/12/20 10:00:00</text>
							</u-col>
						</u-row>
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
		padding:22rpx;
		margin-bottom:20rpx;
	}
	.order-remark{
		font-size:30rpx;
	}
	.order-price{
		font-size: 43rpx;
		font-family: SourceHanSansSC-Regular;
		line-height: 50rpx;
		color: #FF3952;
		
		opacity: 1;
	}
	.order-datetime{
		font-size: 23rpx;
		font-family: SourceHanSansSC-Regular;
		line-height: 31rpx;
		color: #ACB0B7;
		letter-spacing: 0rpx;
		opacity: 1;
	}
	.order-receiver-name{
		font-size: 28rpx;
		font-family: SourceHanSansSC-Regular;
		line-height: 30rpx;
		color: #555555;
		//letter-spacing: 20rpx;
		opacity: 1;
	}
</style>
