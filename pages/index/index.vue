<!--
mod by :wangjia  
date: 20201120
description: 工行扫码缴费项目首页，由公众号引入。
TODO：进入本页面时，需要注意获取到用户的openid，需要工行通过get方式提供到参数页，或者提供微信
公众号服务端api供我们使用获取到用户openid。

1. 修正title为 非税缴费首页
20210623 进行用户手机的短信输入提示

20210708 去掉用户手机的短信输入提示，每个表单分别独立设定是否需要手机短信的提示
20210708 还是保留手机的首页录入提示，三大录入组件都无需再次录入手机。
功能设计：1，第一次进入系统时，应该通过前端请求后端 openid获取此openid是否
存在已维护的手机号；
 2.若存在已维护的手机号，则不弹出提示；否则弹出提示要求用户录入手机号。
 3.若存在已维护的手机号，显示在title位置。
 4.若存在已维护的手机号，在三种录入组件中都默认会发送短信给用户。
 
 现在的功能：首先检测localstorage，其实没必要检测。


-->
<template>
	<view class="content">
		<!-- banner区域 -->
		<view style="margin:0;padding:0;">
			<image src="/static/images/index-01.png" mode="widthFix" style="width:100%; display: block; position: absolute; z-index: 1;"></image>
		</view>
		 <view class="subtitle">
			<view>
				<text class="his-title">欢迎{{confirmedPhoneNum}}</text>
			</view>
		</view> 
		<view class="title">
			<view>
				<text>茂名工行非税缴费</text>
			</view>
		</view>
		<view class="note">
			<u-notice-bar mode="vertical" is-circular="false"  bg-color="#ffffff"
			:duration="2500" type="error" :more-icon="true" :is-circular="false"
			 :list="notelist"></u-notice-bar>
		</view>
		<!--手机是否录入的第一个弹出框提示-->
		 <view>
			<u-modal v-model="open" :content="content" 
			@confirm="modalok" 
			@cancel="modalcancel"
			:show-cancel-button='true'
			>	
			</u-modal>
		</view> 		
		<view >
			
				<u-form  :model="phoneform"  ref="uForm"   :rules="rules"   :errorType="errorType">	
				  <u-popup ref= "pop" v-model="popupshow" mode="bottom" height="220px" border-radius="18">
					<view class="u-demo-wrap" style="background-color: #FFFFFF;">
						<view class="u-demo-area">	
						<u-form-item :rightIconStyle="{color: '#888', fontSize: '32rpx'}"  label-position="top" label="手机号码" prop="phone" label-width="150">
							<u-input :border="border" placeholder="请输入手机号" v-model="phoneform.phone" type="number"></u-input>
						</u-form-item>	
						</view>
					</view>								
					<u-button class="cus_button_1" @click="submitphoneform">提交</u-button>					
					<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
				  </u-popup>
				</u-form>
			
			
		</view>
		<view>
			<image src="/static/images/index-02.png" mode="widthFix" style="width:100%; position: absolute; z-index: 1; padding-top: 220rpx; "></image>
		</view>
		<view class="my_row">
			<u-row :gutter="0">
				<u-col :span="6">
					<u-card :show-head="false" :border="false" padding="0" margin="0rpx 10rpx 10rpx 30rpx">
						<view slot="body">
							<image src="/static/images/scan_pay.png" mode="widthFix" style="width:100%;display: block; position:relative; z-index: 9; "
							 @click="goScan()"></image>
						</view>

					</u-card>
				</u-col>
				<u-col :span="6">
					<u-card :show-head="false" :border="false" padding="0" margin="0rpx 30rpx 10rpx 10rpx">
						<view slot="body">
							<image src="/static/images/region_pay2.png" mode="widthFix" style="width:100%;display: block; position:relative; z-index: 9;"
							 @click="goFeisui()"></image>
						</view>

					</u-card>
				</u-col>
			</u-row>

			<u-row :gutter="0">
				<u-col :span="12">
					<u-card :show-head="false" :border="false" padding="0">
						<view slot="body" @click="goSchool">
							<view class="pay_view" :style="{backgroundImage: 'url('+imageURL+')',backgroundSize: '100% 100%'}">

								<text class="pay_text">校园非税缴费入口</text>
								<view class="pay_image">
									<text class="pay_introd">缴费说明</text>
									<image src="/static/images/about.png" mode="widthFix" style="width:30rpx;"></image>
								</view>

							</view>
						</view>
					</u-card>
				</u-col>
			</u-row>
			
			<u-row :gutter="0">
				<u-col :span="12">
					<u-card :show-head="false" :border="false" padding="0" margin="-20rpx 10rpx 10rpx 10rpx">
						<view slot="body">
							<image src="/static/images/index-03.png" mode="widthFix" style="width:100%;display: block; position:relative; z-index: 9;"
							 @click="goHistory()"></image>
						</view>
				
					</u-card>
				</u-col>
			</u-row>
			
		</view>

	</view>
</template>

<script>
	import wx from "weixin-jsapi";
	import md5Libs from "uview-ui/libs/function/md5";
	
	function getUrlParam (name) {
	  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
	  let url = window.location.href.split('#')[0]
	  let search = url.split('?')[1]
	  if (search) {
	    var r = search.substr(0).match(reg)
	    if (r !== null) return unescape(r[2])
	    return null
	  } else {
	    return null
	  }
	}
	
	export default {
		data() {
			return {
				timestamp: '',
				content: '若您需要通过手机短信接收电子发票，请选择“确认”后输入手机号码，系统会自动保存此号码，若需要修改请在下方的“信息维护”中修改。',
				open: true,
				popupshow: false,
				phonenum: '',
				confirmedPhoneNum: '',
				errorMessage: '请输入正确的手机号',
				nonceStr: '',
				signature: '',
				appid: '',
				title: '非税缴费首页',
				imageURL: 'static/images/bg.png',
				openid: '',
				notelist: [
					"消息通知栏"
				],
				hmac: '',
				phoneform: {
					phone:''
				},
				codeTips: '',
				border: false,
				errorType: ['message'],
				rules: {	
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
							// code: [
							// 	{
							// 		required: true,
							// 		message: '请输入验证码',
							// 		trigger: ['change','blur'],
							// 	},
							// 	{
							// 		validator: (rule, value, callback) => {
							// 			// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							// 			return this.$u.test.code(value, 4);
							// 		},
							// 		message: '验证码不正确',
							// 		// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							// 		trigger: ['change','blur'],
							// 	}
							// ],
						},
			}
		},
		onLoad() {
			//首先从storage中读取一下phone参数是否存在
			var phone = uni.getStorageSync('phone');
			if (phone) {
				console.log("f", phone)
				this.confirmedPhoneNum = phone
				this.open = false				
			}
			//TODO: 这里option获取不到参数，需要采用其他方式 by wangjia
			var wxcode = getUrlParam('code');
			console.log('wxcode = ', wxcode);
			var url = "https://www.onetwo1.top/getSign";
			this.$u.get(url, {
				tokenUrl: location.href.split('#')[0]
			}).then((response) => {
				console.log("请求到的数据：" + response);
				this.appid = response.appId
				this.timestamp = response.timestamp
				this.nonceStr = response.nonceStr
				this.signature = response.signature
				console.log("请求到的数据：" + this.timestamp + "," + this.nonceStr + "," + this.signature + "," + location.href.split(
					'#')[0]);
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: this.appid, // 必填，公众号的唯一标识
					timestamp: this.timestamp, // 必填，生成签名的时间戳
					nonceStr: this.nonceStr, // 必填，生成签名的随机串
					signature: this.signature, // 必填，签名
					jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
				});

				wx.error(function(res) {
					console.log("wx.error：" + res)

					// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
				});
			}).then(
			
			
			)
			.catch((error) => {
				console.log(error);
				uni.showToast({
					title: 'errorxx:' + error,
					duration: 2000,
					icon: 'none'
				});
			})

			//wangjia: 开始获取用户微信openid,我们进入此页面的地址设定为如下固定值 重要，第一步：
			/*
			https://open.weixin.qq.com/connect/oauth2/authorize?appid=
			wx1730a5f2a5e3f0b6&redirect_uri=https%3A%2F%2Fwww.onetwo1.top%2Fh5&
			response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect
			*/
			
			//第二步，请求https://api.weixin.qq.com/sns/oauth2/access_token?
			//appid=wx1730a5f2a5e3f0b6&secret=bebdde2196e78f8fa6e908bb9422c5b2&code=CODE&grant_type=authorization_code
			//这里使用的uri为我的域名是因为我通过nginx进行转发到qq了
			var url_wx_openidquery = 'https://www.onetwo1.top/sns/oauth2/access_token?appid='
			+ 'wx1730a5f2a5e3f0b6&secret=bebdde2196e78f8fa6e908bb9422c5b2&code='
			                         + wxcode + '&grant_type=authorization_code' ;
			
			this.$u.get(url_wx_openidquery, {	
			}).then((response) => {
				/* uni.showToast({
					title: 'responese:' + JSON.stringify(response),
					duration: 20000,
					icon: 'none'
				}); */
				
				this.openid = response.openid;
				console.log("openid：" + this.openid);
				
				this.hmac = md5Libs.md5(this.openid + 'whz1-icbc-wxid');
				//this.notelist.push(this.openid);
				//将openid放入存储区域用于header处理
				uni.setStorageSync('openid', this.openid);
				//this.setKey('openid', this.openid);
				
			}).catch((error) => {
				console.log(error);
				uni.showToast({
					title: 'errorxxx:' + JSON.stringify(error),
					duration: 20000,
					icon: 'none'
				});
			})
		},
		
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onShow(){
			let _this = this;
			
		},
		methods: {
			showInTroToast() {
				uni.showToast({
					title: "说明"
				})
			},
			// 进入扫码流程，决定书扫码的格式如下
			// e.g: 440900|440900156041|MM02100010422|1.00|43654|01947|
			goScan() {
				var that = this;
				console.log('wxScanCode');
				this.popupshow = true
				wx.scanQRCode({
					needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					success: function(res) {
						//alert('success'+res);
						var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
						console.log(result);
						//通过标记｜的分割得到一个字符串数组scans，scans[1]为收款机关，scans[2]为
						//决定书编号
						var scans = result.split('|');
						//开始进行手动录入的同样流程
						var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1730a5f2a5e3f0b6&' +
						'redirect_uri=https%3A%2F%2Fwww.onetwo1.top%2Fadmin%2Fepay%2Fui%2Fget%3Fjdsbh%3D' + 
						 scans[2] + '%26skjg%3D' + scans[1] +
						 '%26wxid%3D' + that.openid +
						 '%26hmac%3D' + that.hmac +
						 '&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect'						
						window.open(url)
						
					},
					error: function(res) {
						//alert('error'+res);
						console.log(res);
						uni.showToast({
							title: 'erroraaa:' + res.errMsg,
							duration: 1500
						});
					}
				});
			},
			goFeisui() {
				this.$u.route('/pages/charge-manual/index')
			},
			goSchool() {
				this.$u.route('/pages/charge-school/index')
			},
			goHistory() {	
				this.$u.route('pages/charge-history/index')	
			},
			modalok() {
				console.log('modal ok')
				this.popupshow = true
			},
			modalcancel() {
				console.log('modal cancel')
			},
			
			// 获取验证码
			getCode() {
				if(this.$refs.uCode.canGetCode) {
					if( ! this.$u.test.mobile(this.phoneform.phone) ){
						this.$u.toast('手机号不合法');
						return
					}
					// 向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码',
						mask: true
					})
					//https://www.onetwo1.top/admin/icbcnotax/getSms
					setTimeout(() => {
						uni.hideLoading();
						this.$u.post('https://www.onetwo1.top/admin/icbcnotax/getSms', 
						this.$u.queryParams({
							phone: '86' + this.phoneform.phone,
							wxid: this.openid,//应该为this.openid
							hmac: md5Libs.md5(this.openid +'whz1-icbc-wxid')
						}, false)
						, 
						{'Content-Type': 'application/x-www-form-urlencoded'}
						).then(res => {
							console.log(res);
						});
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
			changePhone(i) {
				console.log('tag click')
				this.open = true
			},
			submitphoneform() {
				
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
						
				/* this.$u.post('https://www.onetwo1.top/admin/icbcnotax/compareCode',
				 this.$u.queryParams({
				 	phone: '86' + this.phoneform.phone,
					content: this.phoneform.code,
				 	wxid: this.openid,//应该为this.openid
				 	hmac: md5Libs.md5(this.openid + 'whz1-icbc-wxid')
				 }, false),
				 {'Content-Type': 'application/x-www-form-urlencoded'}
				).then(res => {
					console.log(res);
					this.$u.toast('手机号绑定成功');
					this.popupshow = false;
					this.confirmedPhoneNum = this.phoneform.phone
					uni.setStorageSync('phone', this.phoneform.phone);
					
					
				}); */
				
			},
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

	.subtitle {
		padding-top: 62rpx;
		padding-left: 36rpx;
		z-index: 2;
		position: absolute;
		height: 60rpx;
		font-size: 36rpx;
		font-family: SourceHanSansSC-Regular;
		line-height: 37rpx;
		color: #FFFFFF;
		opacity: 0.8;
	}

	.title {
		//width: 256rpx;
		padding-top: 102rpx;
		padding-left: 36rpx;
		height: 80rpx;
		z-index: 2;
		position: absolute;
		font-size: 60rpx;
		font-family: SourceHanSansSC-Bold;
		line-height: 80rpx;
		color: #FFFFFF;
		text-shadow: 0rpx 2rpx 24rpx #FF1F26;
		opacity: 1;
	}

	.note {

		padding-top: 262rpx;
		padding-left: 9%;
		z-index: 2;
		width: 92%;
		position: absolute;
		height: 34rpx;
		font-size: 32rpx;
		font-family: SourceHanSansSC-Regular;
		line-height: 35rpx;
		//color: #444444;

		opacity: 1;
	}

	.my_row {
		padding-top: 420rpx;
		//margin-top: 210px;
	}
	
	.my_row2 {
		padding-top: 920rpx;
		//margin-top: 210px;
	}

	.pay_text {
		padding-top: 20px;
		padding-left: 5px;
		font-size: 20px;
		font-family: SourceHanSansSC-Regular;
		line-height: 48px;
		color: #FFFFFF;
		opacity: 1;
	}

	.pay_introd {
		padding-left: 5px;
		font-size: 12px;
		font-family: SourceHanSansSC-Regular;
		color: #FFFFFF;
		opacity: 1;
	}

	.pay_image {
		display: flex;
		align-items: center
	}

	.pay_view {
		height: 140px;
		display: flex;
		flex-direction: column;

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

	.u-demo {
		padding: 25px 20px;
	}

	.u-demo-wrap {
		
	}

	.u-demo-area {
		text-align: center;
		border-width: 1px;
		border-color: #ddd;
		border-style: dashed;
		background-color: rgb(250, 250, 250);
		padding: 20px 10px;
		border-radius: 3px;
	}
	
	.cus_button_1 {
			color: #d2536f;
			width: 450rpx;
		}
</style>
