<!--
@author:wangjia
@date:20201221
@description: 按新UI进行市县级非税缴费页面设计
-->

<template>
	<view>
		
		<view style="width:100%;" >
			<!--wangjia:使用absolute position可以充当背景-->
			<view  style="margin:0;padding:0;">
				<image src="/static/images/ma-01.png" mode="widthFix" style="width:100%; display: block;position: absolute;
				  z-index: -1;">
				</image>
			</view>
			<u-row :gutter="1" >
				<u-col  :offset="1">
					<view style="margin:0;padding:0;padding-top: 116rpx;" @click="goBack">
						<image src="/static/images/his-02.png" mode="widthFix" style="width:4%; display: block;position: absolute;
					"></image>
					</view>
				</u-col>
				
				<u-col  :offset="4.1">
					<view style="margin:0;padding:0;  padding-bottom: 136rpx; z-index: 2;" >
						<view>
							<text class="his-title">非税通知书缴费</text>
						</view>
					</view>
				</u-col>
			</u-row>
			
			
			
		</view>
		<view class="bg-subtitle">
			<view class="wrap">
				<u-form :model="form" ref="uForm">
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="120" label-position="top" label="执收单位编码" prop="charger_id">
						<u-input :border="border" placeholder="请输入执收单位编码" v-model="model.charger_id" type="text"></u-input>
					</u-form-item>
					
					
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="order" label-position="top" label="缴费通知书编号" prop="order_id">
						<u-input :password-icon="true" :border="border" type="text" v-model="model.order_id" placeholder="请输入缴费通知书编号"></u-input>
					</u-form-item>
				</u-form>
			</view>
			
		</view>
		<!--
		<view >
			 <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
			                @scroll="scroll">
			                    <order-info v-for="(order,orderIndex) in 10" :key="orderIndex"></order-info>
			                </scroll-view>		
		</view>
		-->
		

		
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
				model: {
					charger_id: '',
					order_id: '',
					sex: ''
				},
				showSel:false,
				selButtonValue: 2020,
				yearlist:[
					{
						value: '2020',
						label: '2020'
					},
					{
						value: '2021',
						label: '2021'
					},
					{
						value: '2022',
						label: '2022'
					},
					{
						value: '2023',
						label: '2023'
					},
					{
						value: '2024',
						label: '2024'
					},
					{
						value: '2025',
						label: '2025'
					},
				],
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
			// console.log("I'm Loaded")
			var date=new Date;
			var year=date.getFullYear() ;
			this.selButtonValue = year;
			/*
			if(!this.$getUser())
			{
				this.showNoLoginModal = true;
			}
			*/
		},
		methods:{
			confirmSel(e) {
				console.log(e[0].value)
				this.selButtonValue = e[0].value
			},
			
			goBack(){
				this.$u.route('/pages/index/index')
			},
			upper: function(e) {
				// console.log(e)
			},
			lower: function(e) {
				// console.log(e)
			},
			scroll: function(e) {
				// console.log(e)
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
