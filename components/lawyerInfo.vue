<template>
	<view>
		<view class="lawyer-card">
			<u-row :gutter="5">
				<u-col :span="3">
					<u-avatar size="140" :src="lawyerData.lawyerAvatar" :show-level="true" :level-bg-color="lawyerData.lawyerLevel.lawyerLevelColor"></u-avatar>
				</u-col>
				<u-col :span="9">
					<view>
						<u-row :gutter="0">
							<u-col :span="9">
								<text class="lawyer-name">{{lawyerData.name}}律师</text>
							</u-col>
							<u-col :span="3">
								<u-button size="mini" :ripple="true" type="primary" shape="circle" @click="$emit('lawyerDetail',lawyerData.lawyerId)">咨询我</u-button>
							</u-col>
						</u-row>
					</view>
					<view style="margin-top:5rpx;margin-bottom:5rpx;">
						<text class="lawyer-description">{{lawyerData.legalCompany}} - 执业{{lawyerData.lawyerYears}}年</text>
					</view>
					<view>
						<view style="width:80%">
							<u-row :gutter="0" >
								<u-col :span="4" v-for="(caseType,index) in lawyerData.lawyerCaseTypeList" :key="index">
									<u-tag size="mini" :text="caseType.caseTypeName" type="info" />
								</u-col>
							</u-row>
						</view>
						
						
						<u-row :gutter="0" style="margin-top:5rpx;">
							<u-col :span="12" >
								<view class="lawyer-service-number">
									<text>服务：{{lawyerData.serviceCount}}人  <text style="margin:0 20rpx;">|</text>  好评：{{lawyerData.praiseCount}}人</text>
								</view>
							</u-col>
						</u-row>
					</view>
				</u-col>
				
			</u-row>
		</view>
	</view>
</template>

<script>
	export default {
		name:"lawyerInfo",
		data() {
			return {
				
			};
		},
		props:["lawyerData"]
	}
</script>

<style lang="scss">
.lawyer-card{
	background-color: white;
	border:1rpx solid transparent;
	border-radius:15rpx;
	padding:25rpx;
	margin-bottom:20rpx;
}
.lawyer-name{
	font-size:35rpx;
	font-weight:500;
}

.lawyer-description{
	font-size:25rpx;
}

.lawyer-service-number{
	margin-top:15rpx;
	font-size:25rpx;
	font-weight:600;
	color:#9f9f9f;
}
</style>
