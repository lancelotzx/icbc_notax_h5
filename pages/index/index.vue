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
		<!-- banner区域 -->
		<view style="margin:0;padding:0;">
			<image src="/static/images/index-01.png" mode="widthFix" style="width:100%; display: block; position: absolute; z-index: 1;"></image>
		</view>
		<view class="subtitle">
			<view>
				<text class="his-title"><!--中国工商银行茂名分行--></text>
			</view>
		</view>
		<view class="title">
			<view>
				<text>非税缴费首页</text>
			</view>
		</view>
		<view class="note">
			<u-notice-bar mode="vertical" is-circular="false"  bg-color="#ffffff"
			:duration="2500" type="error" :more-icon="true" :is-circular="false"
			 :list="notelist"></u-notice-bar>
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
				nonceStr: '',
				signature: '',
				appid: '',
				title: '非税缴费首页',
				imageURL: 'static/images/bg.png',
				openid: '',
				notelist: [
					
				]
			}
		},
		onLoad() {
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
					uni.showToast({
						title: 'wx.error：' + res,
						duration: 2000,
						icon: 'none'
					});
					// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
				});
			}).catch((error) => {
				console.log(error);
				uni.showToast({
					title: 'error:' + error,
					duration: 2000,
					icon: 'none'
				});
			})

			//wangjia: 开始获取用户微信openid,我们进入此页面的地址设定为如下固定值 重要，第一步：
			/*
			https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1730a5f2a5e3f0b6&redirect_uri=https%3A%2F%2Fwww.onetwo1.top%2Fh5&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect
			*/
			
			//第二步，请求https://api.weixin.qq.com/sns/oauth2/access_token?
			//appid=wx1730a5f2a5e3f0b6&secret=bebdde2196e78f8fa6e908bb9422c5b2&code=CODE&grant_type=authorization_code
			var url_wx_openidquery = 'https://www.onetwo1.top/sns/oauth2/access_token?appid=wx1730a5f2a5e3f0b6&secret=bebdde2196e78f8fa6e908bb9422c5b2&code=' + wxcode + '&grant_type=authorization_code' ;
			
			this.$u.get(url_wx_openidquery, {
				
			}).then((response) => {
				uni.showToast({
					title: 'responese:' + JSON.stringify(response),
					duration: 20000,
					icon: 'none'
				});
				
				this.openid = response.openid;
				console.log("openid：" + this.openid);
				this.notelist.push(this.openid);
			}).catch((error) => {
				console.log(error);
				uni.showToast({
					title: 'error:' + JSON.stringify(error),
					duration: 20000,
					icon: 'none'
				});
			})


		},
		methods: {
			showInTroToast() {
				uni.showToast({
					title: "说明"
				})
			},
			goScan() {
				var that = this;
				console.log('wxScanCode');
				wx.scanQRCode({
					needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					success: function(res) {
						//alert('success'+res);
						var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
						console.log(result);
						var scans = result.split('|');
						let value3 = '"input1":"' + scans[1] + '","input2":"' + scans[2] + '","input3":"' + that.inputTel + '"'
						console.log('goUpload:' + value3)
						uni.showToast({
							title: "扫描结果：" + value3
						})
					},
					error: function(res) {
						//alert('error'+res);
						console.log(res);
						uni.showToast({
							title: 'error:' + res.errMsg,
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
</style>
