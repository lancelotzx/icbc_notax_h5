<!--
@author:wangjia
@date:20201219
@description: 将页面适配为新款UI
-->

<template>
	<view>
		
		<view style="width:100%;">
			<!--wangjia:使用absolute position可以充当背景-->
			<view style="margin:0;padding:0;">
				<image src="/static/images/his-01.png" mode="widthFix" style="width:100%; display: block;position: absolute;
				  z-index: -1;">
				</image>
			</view>
			<u-row :gutter="1" >
				<u-col  :offset="1">
					<view style="margin:0;padding:0;padding-top: 82rpx;" @click="goBack">
						<image src="/static/images/his-02.png" mode="widthFix" style="width:5%; display: block;position: absolute;
					"></image>
					</view>
				</u-col>
				
				<u-col  :offset="4">
					<view style="margin:0;padding:0; padding-left: 30rpx; padding-bottom: 120rpx; z-index: 2;" >
						<view>
							<text class="his-title">缴费记录</text>
						</view>
					</view>
				</u-col>
			</u-row>
			
			<!--
			<view style="margin-top:30rpx;padding-bottom:15rpx;">
				<u-row>
					<u-col :span="12">
						<u-section font-size="35" lineColor="#5b80f6" title="我的订单" :right="false"></u-section>
					</u-col>
				</u-row>
			</view>
			-->
			
		</view>
		<view class="his-main-bg">
			 <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
			                @scroll="scroll">
			                    <order-info v-for="(order,orderIndex) in 10" :key="orderIndex"></order-info>
			                </scroll-view>		
		</view>
		
		
		<u-modal v-model="showNoLoginModal" :show-cancel-button="true" :content="content" @cancel="cancelLogin()" @confirm="confirmLogin()"></u-modal>
		
		
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
				scrollTop: 0,
				old: {
						scrollTop: 0
				},
				            
				showNoLoginModal:false,
				content:"登录后才可访问更多信息哦"
				
			};
		},
		onShow(){
			let _this = this;
			console.log("I'm Loaded") 
			/*
			if(!this.$getUser())
			{
				this.showNoLoginModal = true;
			}
			*/
		},
		methods:{
			goBack(){
				this.$u.route('/pages/index/index')
			},
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			cancelLogin()
			{
				this.showNoLoginModal = false;
				uni.switchTab({
					url:"/pages/index/index"
				})
				
			},
			confirmLogin(){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			}
		}
	}
</script>

<style lang="scss">
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
		//width: 680px;
		//height: 1194px;
		padding-top: 100rpx;
		padding-left: 100rpx;
		background: #eef5fe;
		box-shadow: 0px -8rpx 24rpx rgba(0, 0, 0, 0.08);
		opacity: 1;
		border-radius: 180rpx 0rpx 0rpx 0rpx;
	}
	
</style>
