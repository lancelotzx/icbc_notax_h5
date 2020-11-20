<template>
	<view>
		<view>
			<lawyer-head :lawyerData="lawyerData" :showCompany="true" :showLine="true"></lawyer-head>
		</view>
		<view>
			<view>
				<view class="u-tabs-box">
					<u-tabs-swiper activeColor="#2979ff" inactive-color="#bbb" ref="tabs" :list="list" :current="current" @change="change"
					 :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
				</view>
				<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
					<swiper-item class="swiper-item">
						<scroll-view scroll-y style="width: 100%;" @scrolltolower="reachBottom">
							<view class="page-box">
								<view v-if="false">
									<view>
										<text class="text-sm text-gray margin-right-sm">服务订单:</text><text class="text-sm">1259单</text>
									</view>
									<view style="margin-top:20rpx;">
										<text class="text-sm text-gray margin-right-sm">律师评分:</text>
										<!-- 评分框 -->
										<u-rate :current="5" active-color="#6fd06e"></u-rate> <text style="color:#6fd06e;margin-left:15rpx;">5.0分</text>
									</view>

									<view class="margin-top-lg margin-bottom-lg">
										<u-line color="#bbb"></u-line>
									</view>
								</view>

								<view class="margin-bottom-lg">
									<text class="sub-title">服务类型</text>
								</view>

								<view>

									<u-row :gutter="10">
										<u-col :span="3">
											<view class="service-card" @click="goOrderSubmit(0,9.9,'订单配对成功1小时内允许对律师发送3次消息')">
												<view>
													<text class="service-title">快速咨询</text>
												</view>

												<view class="service-line-blue"></view>

												<view style="margin-bottom:40rpx;">
													<text class="service-price">9.9元</text>
													<text class="text-xs text-gray text-bold">/次</text>
												</view>
											</view>
										</u-col>
										<u-col :span="3">
											<view class="service-card" @click="goOrderSubmit(1,29.9,'订单配对成功12小时内允许对律师发送20次消息')">
												<view>
													<text class="service-title">图文专问</text>
												</view>

												<view class="service-line-blue"></view>

												<view style="margin-bottom:40rpx;">
													<text class="service-price">29.9元</text>
													<text class="text-xs text-gray text-bold">/次</text>
												</view>
											</view>
										</u-col>
										<u-col :span="3">
											<view class="service-card" @click="goOrderSubmit(2,79,'订单配对成功后律师将与您电话沟通30分钟')">
												<view>
													<text class="service-title">普通咨询</text>
												</view>

												<view class="service-line-red"></view>

												<view style="margin-bottom:40rpx;">

													<text class="service-price">79元</text>
													<text class="text-xs text-gray text-bold">/次</text>
												</view>
											</view>
										</u-col>
										<u-col :span="3">
											<view class="service-card" @click="goOrderSubmit(3,98,'订单配对成功后律师将与您电话沟通60分钟')">
												<view>
													<text class="service-title">优质咨询</text>
												</view>

												<view class="service-line-green"></view>

												<view style="margin-bottom:40rpx;">
													<text class="service-price">98元</text>
													<text class="text-xs text-gray text-bold">/次</text>
												</view>
											</view>
										</u-col>
									</u-row>

								</view>

								<view class="margin-top-lg margin-bottom-lg">
									<text class="sub-title">服务说明</text>
								</view>
								<view>
									<u-collapse :accordion="true">
										<u-collapse-item :title="item.head" v-for="(item, index) in directionList" :key="index">
											{{item.body}}
										</u-collapse-item>
									</u-collapse>

								</view>


							</view>
						</scroll-view>
					</swiper-item>
					<swiper-item class="swiper-item">
						<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
							<view class="page-box">
								<view>
									<text class="text-sm text-gray margin-right-sm">执业年限:</text> <text class="text-sm">8年</text>
								</view>
								<view style="margin-top: 20rpx;margin-bottom: 20rpx;">
									<text class="text-sm text-gray margin-right-sm">执业证号:</text> <text class="text-sm">1111222233335555</text>
								</view>
								<view class="margin-top-lg margin-bottom-lg">
									<u-line color="#bbb"></u-line>
								</view>
								<view>
									<view>
										<text class="sub-title">个人简介</text>
									</view>
									<view class="margin-top-lg">
										<text class="lawyer-description">律师个人简介信息...</text>

									</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
					<swiper-item class="swiper-item" v-if="false">
						<scroll-view scroll-y style="height: 100%;width: 100%;">
							<view class="page-box">

								<view class="margin-bottom-xs">
									<text class="sub-title">该律师收到的评价(388条)</text>
								</view>

								<view>
									<view class="evaluate-card">


										<text class="evaluate-num">
											5.0
										</text>

										<view style="float: right;padding-top:20rpx;">
											<u-rate :current="5" :size="40" active-color="#6fd06e"></u-rate>
										</view>





									</view>
								</view>




							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>

		</view>

	</view>
</template>

<script>
	import lawyerHead from '@/components/lawyerHead.vue'
	import fakeLawyerData from '@/common/fakeLawyerData.js'
	export default {
		components: {
			lawyerHead
		},
		data() {
			return {
				lawyerData: fakeLawyerData[0],
				lawyerId: undefined, //律师编号
				list: [{
						name: '服务介绍'
					},
					{
						name: '律师信息'
					}
				],
				directionList: [{
						head: "服务价格",
						body: "当前展示的价格均为单次的价格"
					},
					{
						head: "快速咨询",
						body: "订单支付成功且律师接单1小时内允许在对律师在消息框发出3次追问,3次追问结束后将不可发送信息给律师,超时将自动结束订单。"
					},
					{
						head: "图文咨询",
						body: "订单支付成功且律师接单12小时内允许在对律师在消息框发出20次追问,20次追问结束后将不可发送信息给律师,超时将自动结束订单。"
					},
					{
						head: "普通咨询",
						body: "订单支付成功后律师将以电话形式与您沟通30分钟总结案情,专业答疑。"
					},
					{
						head: "优质咨询",
						body: "订单支付成功后律师将以电话形式与您沟通60分钟剖析案情,深度解疑。"
					}
				],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
			}
		},
		onLoad(option) {
			this.lawyerId = option.lawyerId;
		},
		methods: {
			goOrderSubmit(orderType, price, serviceDesc) {
				let _this = this;
				uni.navigateTo({
					url:`/pages/order-submit/order-submit?lawyerId=${_this.lawyerId}&orderType=${orderType}&price=${price}&serviceDesc=${serviceDesc}`
				})

			},
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			reachBottom() {
				// 此tab为空数据
				if (this.current != 2) {
					this.loadStatus.splice(this.current, 1, "loading")
					setTimeout(() => {
						//this.getOrderList(this.current);
					}, 1200);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.lawyer-description {
		color: #555
	}

	.service-title {
		color: black;
		font-size: 27rpx;
		font-weight: 600
	}

	.evaluate-card {
		background-color: white;
		border: 1rpx solid transparent;
		padding: 50rpx 50rpx;
		box-shadow: 0rpx 8rpx 25rpx #ddd;
	}

	.evaluate-num {
		color: #6fd06e;
		font-size: 60rpx;
	}

	.service-card {
		background-color: white;
		border: 1rpx solid transparent;
		padding: 25rpx;
		border-radius: 15rpx;
		box-shadow: 0rpx 8rpx 25rpx #ddd;
	}

	.service-line-blue {
		margin-top: 20rpx;
		margin-bottom: 40rpx;
		width: 30rpx;
		height: 15rpx;
		background-color: #4a74ff;
	}

	.service-line-red {
		margin-top: 20rpx;
		margin-bottom: 40rpx;
		width: 30rpx;
		height: 15rpx;
		background-color: #fc5f5e;
	}

	.service-line-green {
		margin-top: 20rpx;
		margin-bottom: 40rpx;
		width: 30rpx;
		height: 15rpx;
		background-color: #6fd06e;
	}

	.service-price {
		color: #999;
		font-size: 22rpx;
		font-weight: 600;
	}

	.wrap {
		// display: flex;
		// flex-direction: column;
		// height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.page-box {
		padding: 40rpx;
	}

	.swiper-box {
		// flex: 1;
		height: calc(100vh - var(--window-top));
		overflow: scroll;

	}

	.swiper-item {
		height: 100%;
	}

	.text-gray {
		color: #bbb;
	}

	.text-sm {
		font-size: 28rpx;
	}

	.text-xs {
		font-size: 15rpx;
	}

	.text-bold {
		font-weight: 600;
	}

	.margin-right-sm {
		margin-right: 15rpx;
	}

	.margin-top-lg {
		margin-top: 50rpx;
	}

	.margin-bottom-lg {
		margin-bottom: 50rpx;
	}

	.margin-bottom-xs {
		margin-bottom: 20rpx;
	}

	.sub-title {
		font-size: 26rpx;
		fong-weight: bold;
		color: black;
	}
</style>
