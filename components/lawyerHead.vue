<template>
	<view>
		<view class="lawyer-card">
			<u-row :gutter="5">
				<u-col :span="3">
					<u-avatar size="150" :src="lawyerData.lawyerAvatar" :show-level="true" :level-bg-color="lawyerData.lawyerLevel.lawyerLevelColor"></u-avatar>
				</u-col>
				<u-col :span="9">
					<view>
						<u-row :gutter="0">
							<u-col :span="9">
								<text class="lawyer-name">{{lawyerData.name}}律师</text>
							</u-col>
							<u-col :span="3" v-if="false">
								<u-button size="mini" :ripple="true" type="primary" shape="circle" @click="$emit('lawyerDetail',lawyerData.lawyerId)">咨询我</u-button>
							</u-col>
						</u-row>
					</view>
					<view style="margin-top:20rpx;" v-if="showCompany==true"> 
						<text class="lawyer-description">{{lawyerData.legalCompany}}</text>
					</view>
					<view style="margin-top:15rpx;">
						<view style="width:70%">
							<u-row :gutter="0">
								<u-col :span="4" v-for="(caseType,caseTypeIndex) in lawyerData.lawyerCaseTypeList" :key="caseTypeIndex">
									<u-tag size="mini" :text="caseType.caseTypeName" type="info" /> 
								</u-col>
							</u-row>
						</view>
					</view>
				</u-col>
		
			</u-row>
		</view>
		<view class="line" v-if="showLine"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:['lawyerData','showCompany','showLine']
	}
</script>

<style lang="scss" scoped>
.lawyer-card{
		background-color: white;
		border:1rpx solid transparent;
		border-radius:15rpx;
		padding:25rpx;
		margin-bottom:60rpx;
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
	.line{
		width:100%;
		height:20rpx;
		background-color: #eef5fe;
	}
	
</style>
