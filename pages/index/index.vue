<!--
mod by :wangjia  
date: 20201120
description: 工行扫码缴费项目首页，由公众号引入。
TODO：进入本页面时，需要注意获取到用户的openid，需要工行通过get方式提供到参数页，或者提供微信
公众号服务端api供我们使用获取到用户openid。

1. 修正title为 非税缴费首页

-->
<template>
	<view class="content">
		<!-- 图片区域 -->
		<view style="margin:0;padding:0;padding-top:-10rpx">
			<image src="/static/images/banner.png" mode="widthFix" style="width:100%;display: block;"></image>
		</view>
		<!-- 咨询区域 -->
		<u-row :gutter="0">
			<u-col :span="6">
				<u-card :show-head="false" :border-radius="18" box-shadow="7rpx 8rpx 20rpx #ddd">
					<view slot="body">
						<view>
							<text class="consult">扫码缴费</text>
						</view>
						<view>
							<u-row :gutter="0">
								<u-col :span="9" style="margin:0;padding:0;margin-bottom:20rpx;">
									<text class="consult-sub">扫描票据二维码</text>
								</u-col>
								<u-col :span="2" style="margin:0;padding:0">
									<view style="position:absolute;right:5rpx;bottom:5rpx">
										<image src="/static/images/chat_consult.png" mode="widthFix" style="width:110rpx;"></image>
									</view>
								</u-col>
							</u-row>

						</view>
					</view>

				</u-card>
			</u-col>
			<u-col :span="6">
				<u-card :show-head="false" :border-radius="18" box-shadow="7rpx 8rpx 20rpx #ddd">
					<view slot="body">
						<view>
							<text class="consult">非税缴费</text>
						</view>
						<view>
							<u-row :gutter="0">
								<u-col :span="9" style="margin:0;padding:0;margin-bottom:20rpx">
									<text class="consult-sub">填写缴费单</text>
								</u-col>
								<u-col :span="2" style="margin:0;padding:0;">
									<view style="position:absolute;right:5rpx;bottom:5rpx">
										<image src="/static/images/phone_consult.png" mode="widthFix" style="width:110rpx;"></image>
									</view>
								</u-col>
							</u-row>

						</view>
					</view>

				</u-card>
			</u-col>
		</u-row>
		
		<u-row :gutter="0">
			<u-col :span="6">
				<u-card :show-head="false" :border-radius="18" box-shadow="7rpx 8rpx 20rpx #ddd">
					<view slot="body">
						<view>
							<text class="consult">学杂费</text>
						</view>
						<view>
							<u-row :gutter="0">
								<u-col :span="9" style="margin:0;padding:0;margin-bottom:20rpx;">
									<text class="consult-sub">通过身份证缴费</text>
								</u-col>
								<u-col :span="2" style="margin:0;padding:0">
									<view style="position:absolute;right:5rpx;bottom:5rpx">
										<image src="/static/images/chat_consult.png" mode="widthFix" style="width:110rpx;"></image>
									</view>
								</u-col>
							</u-row>
		
						</view>
					</view>
		
				</u-card>
			</u-col>
			<u-col :span="6">
				<u-card :show-head="false" :border-radius="18" box-shadow="7rpx 8rpx 20rpx #ddd">
					<view slot="body">
						<view>
							<text class="consult">缴费记录</text>
						</view>
						<view>
							<u-row :gutter="0">
								<u-col :span="9" style="margin:0;padding:0;margin-bottom:20rpx">
									<text class="consult-sub">缴费历史查询</text>
								</u-col>
								<u-col :span="2" style="margin:0;padding:0;">
									<view style="position:absolute;right:5rpx;bottom:5rpx">
										<image src="/static/images/phone_consult.png" mode="widthFix" style="width:110rpx;"></image>
									</view>
								</u-col>
							</u-row>
		
						</view>
					</view>
		
				</u-card>
			</u-col>
		</u-row>
		  
		<!-- 按类型咨询版块 -->
		<u-row style="margin-top:15rpx">
			<u-col :span="12">
				<u-section font-size="35" lineColor="#5b80f6" title="其他内容" :right="false"></u-section>
			</u-col>
		</u-row>
		<view style="margin-left:2%;margin-right:2%;">
			<u-row gutter="0" style="margin-top:5rpx;">
				<u-col :span="3" v-for="(caseType,index) in caseTypeList" :key="index">
					<view class="case-type">
						<view style="margin-bottom:10rpx;">
							<image :src="caseType.caseTypeIcon" mode="widthFix" style="width:55rpx"></image>
						</view>
						<view>
							<text>{{caseType.caseTypeName}}</text>
						</view>
					</view>
				</u-col>
			</u-row>
		</view>


		
		
		<!-- 法律知识 -->
		<view style="margin-top:30rpx;">
			<u-row>
				<u-col :span="12">
					<u-section font-size="35" lineColor="#5b80f6" title="法律知识" sub-title="查看更多"></u-section>
				</u-col>
			</u-row>
		</view>
		<view style="margin-left:2%;margin-right:2%;margin-top:20rpx;">
			<u-cell-group>
				<u-cell-item title="法律知识"></u-cell-item>
				<u-cell-item title="法律知识"></u-cell-item>
			</u-cell-group>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'XX法律咨询',
				caseTypeList: [{
						id: 1,
						caseTypeName: "婚姻家庭",
						caseTypeIcon: "/static/images/casetype/married&family.png"
					},
					{
						id: 2,
						caseTypeName: "刑事案件",
						caseTypeIcon: "/static/images/casetype/married&family.png"
					},
					{
						id: 3,
						caseTypeName: "劳动工伤",
						caseTypeIcon: "/static/images/casetype/married&family.png"
					},
					{
						id: 4,
						caseTypeName: "债权债务",
						caseTypeIcon: "/static/images/casetype/married&family.png"
					}
				]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	$consultTitleRpx:40rpx;
	$consultTitleWeight:700;

	$consultSubTitleRpx:25rpx;
	$consultSubTitleColor:#888;

	.consult {
		font-size: $consultTitleRpx;
		font-weight: $consultTitleWeight;
	}

	.consult-sub {
		font-size: $consultSubTitleRpx;
		color: $consultSubTitleColor;
		margin-left: 0;
	}

	.card {
		margin-left: 5%;
		margin-right: 5%;
		width: 90%;
		box-shadow: 7rpx 8rpx 20rpx #eee;
	}



	.case-type {
		text-align: center;
		border: 1rpx solid transparent;
		background-color: #f8f8fa;
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		border-radius: 10rpx;
		color: #555;
		width: 90%;
		margin-top: 20rpx;
		font-size: 25rpx;
	}
</style>
