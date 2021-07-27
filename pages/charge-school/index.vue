<!--
@author:wangjia
@date:20201221
@description: 按新UI进行市县级非税缴费页面设计
 
              20201222 完成UI编制，进行JS编码设计
			  1.form提交内容定制
			    元素 1. 执收单位编码stu_xhid
				元素 2. 缴费通知书编号order_id
				元素 3. 手机号码（可选）phone
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
				
				<u-col  :offset="3.5">
					<view style="margin:0;padding:0;  padding-bottom: 76rpx; z-index: 2;" >
						<view>
							<text class="his-title">校园非税缴费</text>
						</view>
					</view>
				</u-col>
			</u-row>
			
			
			
		</view>
		<view class="bg-subtitle">
			<view class="wrap">
				<u-form :model="model" ref="uForm"  :rules="rules" :errorType="errorType">
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="120" label-position="top" label="学号" prop="stu_xhid">
						<u-input :border="border" placeholder="请输入学号" v-model="model.stu_xhid" type="text"></u-input>
					</u-form-item>	
					
					<!-- <u-form-item   label="是否接收电子票据短信" prop="remember" label-width="320">
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
					</template> -->
					<view class="bg-submit">
						<u-button shape="circle" type="error" :plain="true"
						 @click="submit"  >提交</u-button>
					</view>
					
						
					<!-- <u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
				 --></u-form>
			</view>
			
		</view>

		
	</view>
</template>

<script>
	import orderInfo from '@/components/orderInfo.vue';
	import md5Libs from "uview-ui/libs/function/md5";
	
	export default {
		components:{
			orderInfo
		},
		
		data() {
			return {
				model: {
					stu_xhid: '',
					order_id: '',
					phone:'',
					code:'',
					remember: false,
				},
				openid: '',
				hmac: '',
				codeTips: '',
				border: false,
				errorType: ['message'],
				rules: {
							stu_xhid: [
								{
									required: true,
									message: '请输入学号',
									trigger: 'blur' ,
								},
								{
									pattern: /^[0-9a-zA-Z]*$/g,
									// 正则检验前先将值转为字符串
									transform(value) {
										return String(value);
									},
									message: '学号只能包含字母或数字'
								},
								{
									min: 11,
									//max: 18,
									message: '学号至少为11位',
									trigger: ['change','blur'],
								},
							],
						},
			};
		},
		onShow(){
			let _this = this;
			
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			this.openid = uni.getStorageSync('openid');
			this.hmac = md5Libs.md5(this.openid + 'whz1-icbc-wxid');
			var phone = uni.getStorageSync('phone');
			if (phone) {
				this.model.phone = phone			
			}
			
		},
		methods:{
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						var computeid = '22' // 默认是android
						// 判断手机类型是 Android 还是 ios
						if (uni.getSystemInfoSync().platform === 'android') {
								console.log('运行Android上')					
						} else {
								console.log('运行iOS上')
								computeid = '21'
						}
						// if(!this.model.agreement) return this.$u.toast('请勾选协议');
						var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1730a5f2a5e3f0b6&' +
			            'redirect_uri=https%3A%2F%2Fwww.onetwo1.top%2Fadmin%2Fepay%2Fschoolbill%3Fsfzhm%3D' + 
			             this.model.stu_xhid + 
						 '%26wxid%3D' + this.openid +
						 '%26hmac%3D' + this.hmac +
						 '%26computeid%3D' + computeid +
						 '%26phone%3D' + this.model.phone + 
						 '&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect'						
						window.open(url)						
					} else {
						console.log('验证失败');
					}
				});
			},
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
	.bg-submit {
		//position: absolute;
		padding-top: 180rpx;
		//padding-left: 40rpx;

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
