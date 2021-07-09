<!--
@author:wangjia
@date:20201219
@description: 将页面适配为新款UI

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
			      <uni-list-item direction="column" class="uni-item">
			          <template v-slot:header>
			              <u-row :gutter="0">
			              	<u-col :span="9" align="left">
			              		<text class="order-receiver-name">茂名市教育局学生服务中心</text>
			              	</u-col>
			              	<u-col :span="3" align="right">
			              		<view style="text-align: right;">
			              			<u-tag type="info" text="市级" shape="circle"></u-tag>
			              		</view>
			              	</u-col>
			              </u-row>
			          </template>
			          <template v-slot:body>
			              <view class="uni-list-box">
			                  <view class="uni-content">
			                      <view style="margin-top:15rpx">
			                      	<u-row :gutter="0">			                      		
			                      		<u-col :span="2">
			                      			<view style="text-align: center;">
			                      				<text class="order-price">￥199912.00</text>
			                      			</view>
			                      		</u-col>
			                      	</u-row>
			                      </view>
			                  </view>
			              </view>
			          </template>
			          <template v-slot:footer>
			              <view class="uni-footer">
			                  <text class="uni-footer-text">2020/12/20 10:00:00</text>
			              </view>
			          </template>
			      </uni-list-item>
			</uni-list>		
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
				showSel:false,		
				scrollTop: 0,
				old: {
						scrollTop: 0
				},
				openid: '',
				hmac: '',
				showNoLoginModal:false,
			};
		},
		onShow(){
		    this.openid = 'jfifoejfieof3fi';//uni.getStorageSync('openid');
		    this.hmac = md5Libs.md5(this.openid + 'whz1-icbc-wxid');
			var url = "https://www.onetwo1.top/admin/epay/history";
			this.$u.get(url, {
				wxid: this.openid,//应该为this.openid
				hmac: md5Libs.md5(this.openid +'whz1-icbc-wxid'),	
				pageSize: 2,
				pageNum: 1
			}).then((response) => {
				console.log("请求到的数据：" + response);
				
			})
			
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
		position: absolute;
		padding-top: 100rpx;
		padding-left: 100rpx;
		background: #eef5fe;
		box-shadow: 0px -8rpx 24rpx rgba(0, 0, 0, 0.08);
		opacity: 1;
		border-radius: 180rpx 0rpx 0rpx 0rpx;
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
