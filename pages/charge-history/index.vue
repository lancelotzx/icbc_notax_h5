<!--
@author:wangjia
@date:20201219
@description: 将页面适配为新款UI

@update:20210819
@description:对于新型单据，440900开头的，在getItem时需要先提示用户，然后进行扫码调用，让用户扫码查看发票。

TODO
-->

<template>
	<view>	
		<view style="width:100%;" >
			<!--wangjia:使用absolute position可以充当背景-->
			<view  style="margin:0;padding:0;">
				<image src="/static/images/his-01.png" mode="widthFix" style="width:100%; display: block;position: absolute;
				  z-index: -1;">
				</image>
			</view>
			<u-row :gutter="1" >
				<u-col  :offset="1">
					<view style="margin:0;padding:0;padding-top: 82rpx;" @click="goBack">
						<image src="/static/images/his-02.png" mode="widthFix" style="width:4%; display: block;position: absolute;
					"></image>
					</view>
				</u-col>
				
				<u-col  :offset="4.3">
					<view style="margin:0;padding:0; padding-left: 30rpx; padding-bottom: 40rpx; z-index: 2;" >
						<view>
							<text class="his-title">缴费记录</text>
						</view>
					</view>
				</u-col>
			</u-row>		
		</view>
		<view class="his-main-bg">
			 <uni-list :border="true" >
			                   <!-- <order-info v-for="(order,orderIndex) in 10" :key="orderIndex"></order-info> -->
			  <!-- 垂直排列，无略缩图，主标题+副标题显示 -->
			      <uni-list-item direction="column" class="uni-item" v-for="item in datalist" :key="item.id"
				   @click="getItem(item.jdsbh, item.skjg)" link>
			          <template v-slot:header>
			              <u-row :gutter="0">
			              	<u-col :span="8" align="left">
			              		<text class="order-receiver-name">{{item.receiver}}</text>
			              	</u-col>
			              	<u-col :span="4" align="right">
			              		<view style="text-align: right;">
			              			<u-tag type="info" :text="item.payType" shape="circle" size="mini"></u-tag>
			              		</view>
			              	</u-col>
			              </u-row>
			          </template>
			          <template v-slot:body>
			              <view class="uni-list-box">
			                  <view class="uni-content">
			                      <view style="margin-top:15rpx">
			                      	<u-row :gutter="0">			                      		
			                      		<u-col >
			                      			<view style="text-align: center;">
			                      				<text class="order-price">已缴费:{{item.payAmount}}元</text>
			                      			</view>
			                      		</u-col>
			                      	</u-row>
			                      </view>
			                  </view>
			              </view>
			          </template>
			          <template v-slot:footer>
			              <view class="uni-footer">
			                  <text class="uni-footer-text">{{item.payTimeStr}}</text>
			              </view>
			          </template>
			      </uni-list-item>
			</uni-list>		
		</view>
		<!--对新票据进行特殊提示-->
		 <view>
			<u-modal v-model="open" :content="content" 
			@confirm="modalok" 
			@cancel="modalcancel"
			:show-cancel-button='true'
			>	
			</u-modal>
		</view> 
	</view>
</template>

<script>
	import wx from "weixin-jsapi";
	import orderInfo from '@/components/orderInfo.vue';
	import md5Libs from "uview-ui/libs/function/md5";
	
	export default {
		components:{
			orderInfo
		},
		
		data() {
			return {
				content: '将通过扫描缴费通知书的二维码进入发票页面，是否继续扫码？',
				open: false,
				showSel:false,
				datalist: [],
				scrollTop: 0,
				old: {
						scrollTop: 0
				},
				openid: '',
				hmac: '',
				showNoLoginModal:false,
				havedata: true
			};
		},
		onShow(){
			//wangjia: 为了调用扫码首先需要进行wxconfig预处理
			var wxappid = uni.getStorageSync('wxappid')
			var wxtimestamp = uni.getStorageSync('wxtimestamp')
			var wxnonceStr = uni.getStorageSync('wxnonceStr')
			var wxsignature = uni.getStorageSync('wxsignature')

			wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: wxappid, // 必填，公众号的唯一标识
					timestamp: wxtimestamp, // 必填，生成签名的时间戳
					nonceStr: wxnonceStr, // 必填，生成签名的随机串
					signature: wxsignature, // 必填，签名
					jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
				});

				wx.error(function(res) {
					console.log("wx.error：" + res)

					// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
				});


		    this.openid = uni.getStorageSync('openid');
		    this.hmac = md5Libs.md5(this.openid + 'whz1-icbc-wxid');
			var url = "https://www.onetwo1.top/admin/epay/history";
			this.$u.get(url, {
				wxid: this.openid,//应该为this.openid
				hmac: md5Libs.md5(this.openid +'whz1-icbc-wxid'),	
				pageSize: 50,
				pageNum: 1
			}).then((response) => {
				console.log("请求到的数据：" + response);
				this.datalist = response.data.list
				console.log(this.datalist)
				if(this.datalist.length == 0) {
					this.havedata = false
					this.datalist.push({
						id: 0,
						jdsbh: '-',
						receiver: '-未查询到缴费记录-',
						skjg: '-',
						payAmount: '-',
						payType: '-',
						payTimeStr: ''				
					})
				}
				
			}).catch(error => {
				console.log('error!')
				if(this.datalist.length == 0) {
					this.havedata = false
					this.datalist.push({
						id: 0,
						jdsbh: '-',
						receiver: '未查询到缴费记录',
						skjg: '-',
						payAmount: '-',
						payType: '-',
						payTimeStr: ''				
					})
				}
			})
			
		},
		methods:{
			confirmSel(e) {
				console.log(e[0].value)
				this.selButtonValue = e[0].value
			},
			modalok() {
				this.open = false
				// 调用扫码
				wx.scanQRCode({
					needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					success: function(res) {
						
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
			modalcancel() {
				//console.log('modal cancel')
				this.open = false;
			},
			
			// 点击单条缴费记录查看明细，对新票据进行区分。若jdsbh是440900开头则进行提示和扫码开启。
			getItem(jdsbh, skjg){
				if(this.havedata == false) {
					this.$u.toast('未查询到您的缴费记录，请返回')
					return
				}
				var computeid = '22' // 默认是android
				//this.popupshow = false
				// 判断手机类型是 Android 还是 ios
				if (uni.getSystemInfoSync().platform === 'android') {
						console.log('运行Android上')					
				} else {
						console.log('运行iOS上')
						computeid = '21'
				}
				var newflag = jdsbh.indexOf("440900");
				if(newflag == 0){
				  //表示是以440900开头；新市级单据
				  this.open = true
				  
				}else if(newflag == -1){
				  // 表示不是440900开头；
				  var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1730a5f2a5e3f0b6&' +
				  'redirect_uri=https%3A%2F%2Fwww.onetwo1.top%2Fadmin%2Fepay%2Fui%2Fget%3Fjdsbh%3D' + 
				   jdsbh + '%26skjg%3D' + skjg + 
				   '%26wxid%3D' + this.openid +
				   '%26hmac%3D' + this.hmac +
				   '%26computeid%3D' + computeid +
				   '&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect'						
				  window.open(url)
				}		
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
		display: flex;
		padding-top: 50rpx;
		padding-left: 10rpx;
		background: #eef5fe;
		box-shadow: 0px -8rpx 24rpx rgba(0, 0, 0, 0.08);
		opacity: 1;
		//border-radius: 180rpx 0rpx 0rpx 0rpx;
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
	.uni-item {
		background-color: #ffffff;
		display: flex;
		margin-bottom: $uni-spacing-col-base;
		width: 750rpx;
	}
	.order-receiver-name {
		padding-left: 30rpx;
		padding-right: 90rpx ;
	}
	
	.uni-title {
		display: flex;
		margin-bottom: $uni-spacing-col-base;
		font-size: $uni-font-size-lg;
		font-weight: bold;
		color: #3b4144;
	}
	
	/* 列表内容 */
	.uni-list-box {
		@extend .uni-flex-row;
		flex: 1;
		margin-top: 10px;
	}
	
	.uni-flex {
		display: flex;
	}
	
	.uni-flex-row {
		@extend .uni-flex;
		flex-direction: row;
		box-sizing: border-box;
	}
	
	/* 内容 */
	.uni-content {
		@extend .uni-flex-column;
		justify-content: space-between;
	}
	
	/* 列表footer */
	.uni-footer {
		@extend .uni-flex-row;
		justify-content: space-between;
		margin-top: $uni-spacing-col-lg;
	}
	.uni-footer-text {
		font-size: $uni-font-size-base;
		color: $uni-text-color;
		margin-left: 320rpx;
	
	}
	.uni-flex-column {
		@extend .uni-flex;
		flex-direction: column;
	}
	.order-price{
		font-size: 43rpx;
		font-family: SourceHanSansSC-Regular;
		line-height: 50rpx;
		color: #FF3952;
		
		opacity: 1;
	}
	
	
</style>
