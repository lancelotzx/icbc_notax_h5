<template>
	<view>
		<u-navbar title="我的" back-icon-name="setting-fill" back-icon-color="#000" title-color="#000" :border-bottom="false"></u-navbar>
		<view style="width:100%;padding-top:20rpx;">
			<u-row :gutter="0" >
				<u-col :span="4" :offset="4">
					<view style="text-align: center;">
						<u-avatar size="150" src="http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg"></u-avatar>
						<view>
							<text>用户微信昵称</text>
							<text>18153886404</text>
						</view>
						<view>
							<u-button type="primary" size="mini" shape="circle" :ripple="true">
								<u-icon size="25" name="man-add" style="margin-right:5rpx;"></u-icon> 律师认证
							</u-button>
						</view>
					</view>
				</u-col>
			</u-row>
			<view style="margin-top:30rpx;padding-bottom:15rpx;">
				<u-row>
					<u-col :span="12">
						<u-section font-size="35" lineColor="#5b80f6" title="我的订单" :right="false"></u-section>
					</u-col>
				</u-row>
			</view>
			
		</view>
		<view class="order-list-bg">
			<order-info v-for="(order,orderIndex) in 10" :key="orderIndex"></order-info>
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
				showNoLoginModal:false,
				content:"登录后才可访问更多信息哦"
				
			};
		},
		onShow(){
			let _this = this;
			console.log("I'm Loaded") 
			
			if(!this.$getUser())
			{
				this.showNoLoginModal = true;
			}
		},
		methods:{
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
	.order-list-bg{
		background-color: #eef5fe;
		padding-top:20rpx;
		padding-left:15rpx;
		padding-right:15rpx;
		padding-bottom:10rpx;
		margin-top:10rpx;
	}
	
	
	
</style>
