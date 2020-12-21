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
					<view style="margin:0;padding:0;padding-top: 76rpx;" @click="goBack">
						<image src="/static/images/his-02.png" mode="widthFix" style="width:4%; display: block;position: absolute;
					"></image>
					</view>
				</u-col>
				
				<u-col  :offset="4.1">
					<view style="margin:0;padding:0;  padding-bottom: 76rpx; z-index: 2;" >
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
					<u-form-item   label="是否接收电子票据短信" prop="remember" label-width="320">
						<u-switch v-model="model.remember" slot="right"></u-switch>
					</u-form-item>
					<template v-if="model.remember">
						<view>
							<u-form-item :rightIconStyle="{color: '#888', fontSize: '32rpx'}" right-icon="kefu-ermai" label-position="top" label="手机号码" prop="phone" label-width="150">
								<u-input :border="border" placeholder="请输入手机号" v-model="model.phone" type="number"></u-input>
							</u-form-item>
							<u-form-item label-position="top" label="验证码" prop="code" label-width="150rpx">
								<u-input :border="border" placeholder="请输入验证码" v-model="model.code" type="text"></u-input>
								<u-button slot="right" type="warning " size="mini" @click="getCode">{{codeTips}}</u-button>
							</u-form-item>
						</view>
					</template>
					<template v-else>
						<view></view>
					</template>
					<u-button @click="submit">提交</u-button>
						
					<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
				</u-form>
			</view>
			
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
				model: {
					charger_id: '',
					order_id: '',
					phone:'',
					code:'',
					remember: false,
				},
				codeTips: '',
				border: false,
				
			};
		},
		onShow(){
			let _this = this;
			
		},
		methods:{
			// 获取验证码
			getCode() {
				if(this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码',
						mask: true
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			
			codeChange(text) {
				this.codeTips = text;
			},
			goBack(){
				this.$u.route('/pages/index/index')
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
