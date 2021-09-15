<!--
@author:wangjia
@date:20201221
@description: 按新UI进行市县级非税缴费页面设计
 
              20201222 完成UI编制，进行JS编码设计
			  1.form提交内容定制
			    元素 1. 执收单位编码charger_id
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
				<u-form :model="model" ref="uForm"  :rules="rules" :errorType="errorType">
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="120" label-position="top" label="执收单位编码" prop="charger_id">
						<u-input :border="border" placeholder="请输入执收单位编码" v-model="model.charger_id" type="text"></u-input>
					</u-form-item>	
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="order" label-position="top" label="缴费通知书编号" prop="order_id">
						<u-input :password-icon="true" :border="border" type="text" v-model="model.order_id" placeholder="请输入缴费通知书编号"></u-input>
					</u-form-item>
					<u-button @click="submit2">提交</u-button>	
				  </u-form>
			</view>
			<view >
			<!--下方弹出手机输入对话框，表单完全一致,采用phoneform复用，手机号可修改, 用于业务逻辑执行前的确认-->
			<u-form  :model="phoneform"  ref="uForm2"   :rules="rules2"   :errorType="errorType">	
			  <u-popup ref= "pop" v-model="popupshow2" mode="bottom" height="220px" border-radius="18">
				<view class="u-demo-wrap" style="background-color: #FFFFFF;">
					<view class="u-demo-area">	
					<u-form-item left-icon="phone" label-position="top" 
					:label-style="labelStyle"  label="请确认您的手机号码" prop="phone" label-width="150">
						<u-input :border="border" placeholder="请输入手机号" v-model="phoneform.phone" type="number"  
						 height="90" :custom-style="labelStyle"></u-input>
					</u-form-item>	
					</view>
				</view>								
				<u-button class="cus_button_1" @click="submit">提交</u-button>					
			  </u-popup>
			</u-form>			
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
					charger_id: '',
					order_id: '',
					phone:'',
					code:'',
					remember: false,
				},
				action_str: '',
				biz_content_value: '' ,
				chargedata:'',
				codeTips: '',
				openid: '',
				hmac: '',
				phoneform: {
					phone:''
				},
				popupshow2:false,
				border: false,
				errorType: ['message'],
				labelStyle: {fontSize: '40rpx'},
				rules: {
							charger_id: [
								{
									required: true,
									message: '请输入执收单位编码',
									trigger: 'blur' ,
								},
								{
									min: 12,
									max: 12,
									message: '执收单位编码为12位',
									trigger: ['change','blur'],
								},
							],
							
							order_id: [
								{
									required: true,
									message: '请输入缴款通知书编号',
									trigger: 'blur' ,
								},
								{
									min: 13,
									max: 20,
									message: '缴款通知书长度不正确',
									trigger: ['change','blur'],
								},
							],
							
							phone: [
								{
									required: true,
									message: '请输入手机号',
									trigger: ['change','blur'],
								},
								{
									validator: (rule, value, callback) => {
										// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
										return this.$u.test.mobile(value);
									},
									message: '手机号码不正确',
									// 触发器可以同时用blur和change，二者之间用英文逗号隔开
									trigger: ['change','blur'],
								}
							],
							code: [
								{
									required: true,
									message: '请输入验证码',
									trigger: ['change','blur'],
								},
								{
									validator: (rule, value, callback) => {
										// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
										return this.$u.test.code(value, 4);
									},
									message: '验证码不正确',
									// 触发器可以同时用blur和change，二者之间用英文逗号隔开
									trigger: ['change','blur'],
								}
							],
						},
					rules2: {	
							phone: [
								{
									required: true,
									message: '请输入手机号',
									trigger: ['change','blur'],
								},
								{
									validator: (rule, value, callback) => {
										// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
										return this.$u.test.mobile(value);
									},
									message: '手机号码不正确',
									// 触发器可以同时用blur和change，二者之间用英文逗号隔开
									trigger: ['change','blur'],
								}
							],
						},
			};
		},
		onShow(){
			let _this = this;
			
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			this.$refs.uForm2.setRules(this.rules2);
			this.openid = uni.getStorageSync('openid');
			this.hmac = md5Libs.md5(this.openid + 'whz1-icbc-wxid');
			var phone = uni.getStorageSync('phone');
			if (phone) {
				this.phoneform.phone = phone			
			}
		},
		methods:{

			submit2() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.popupshow2 = true
					} else {
						console.log('验证失败');
					}
				});
			},
			
			submit() {	
							
				this.$refs.uForm2.validate(valid => {
					/*
					 * 表单验证判断和提交，之前是提交到charge-commit，现在修改为直接提交
					 * 跳过去了就不能跳回来了
					*/
					if (valid) {
						this.popupshow2 = false
						var computeid = '22' // 默认是android
						// 判断手机类型是 Android 还是 ios
						if (uni.getSystemInfoSync().platform === 'android') {
								console.log('运行Android上')					
						} else {
								console.log('运行iOS上')
								computeid = '21'
						}
						// 保存参数，开始页面跳转。
						// TODO: 参数应包括手机号码供后续处理
						// uni.setStorageSync('orderid',this.model.order_id)
						// uni.setStorageSync('chargerid',this.model.charger_id)
						var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1730a5f2a5e3f0b6&' +
			            'redirect_uri=https%3A%2F%2Fwww.onetwo1.top%2Fadmin%2Fepay%2Fui%2Fget%3Fjdsbh%3D' + 
			             this.model.order_id + '%26skjg%3D' + this.model.charger_id + 
						 '%26wxid%3D' + this.openid +
						 '%26hmac%3D' + this.hmac +
						 '%26computeid%3D' + computeid +
						 '%26phone%3D' + this.phoneform.phone + 
						 '&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect'						
						window.open(url)
						//this.$u.route('pages/charge-commit/index')
						
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
