<!-- 图文专问 -->
<template>
	<view>
		<view>
			<lawyer-head :lawyerData="lawyerData" :showCompany="false" :showLine="false"></lawyer-head>
		</view>
		<view v-if="orderType == 0 || orderType == 1">
			<u-field :border-top="true" v-model="saveData.orderRemark" type="textarea" :label-width="0" placeholder="请在此处填写您需要咨询的问题"></u-field>
		</view>
		<view v-else>
			<u-field :border-top="true" v-model="saveData.phone" :label-width="0" placeholder="请输入您的手机号码"></u-field>
		</view>
		<view>
			<u-cell-group>
				<u-cell-item @click="showActionSheet=true" :title="choosedCaseType.text?choosedCaseType.text:'请选择案件类型'"></u-cell-item>
			</u-cell-group>
		</view>
		<view style="padding:15rpx 20rpx;margin-top:10rpx;">
			<u-checkbox-group>  
				<u-checkbox v-model="hasAgree" :label-disabled="true" :disabled="false" :label-size="24" size="24" >我同意<text class="text-blue">《懂问个人信息保护政策》</text>及<text class="text-blue">《懂问用户服务协议》</text></u-checkbox>
			</u-checkbox-group>
		</view> 
		<view style="padding:15rpx 20rpx;color:#bbb;font-size:24rpx">
			{{serviceDesc}}
		</view>
		<view style="padding:15rpx 20rpx;margin-top:20rpx;">
			<u-button shape="circle" type="primary" :ripple="true">支付{{price}}元发起咨询</u-button>
		</view>
		
		<u-action-sheet :list="caseTypeList" @click="caseTypeChangeHandler" v-model="showActionSheet"></u-action-sheet>
	</view>
</template>

<script>
	import lawyerHead from '@/components/lawyerHead.vue'
	import fakeLawyerData from '@/common/fakeLawyerData.js'
	export default {
		data() { 
			return {
				showActionSheet:false,
				lawyerData: fakeLawyerData[0],
				saveData:{
					orderRemark:undefined,
					phone:undefined
				},
				caseTypeList:[],
				lawyerId:undefined,
				choosedCaseType:{},
				hasAgree:true,
				price:undefined,
				orderType:undefined,
				serviceDesc:undefined
			};
		},
		onLoad(option)
		{
			let _this = this;
			this.lawyerId=option.lawyerId;
			this.price=option.price;
			this.orderType=option.orderType;
			this.serviceDesc = option.serviceDesc;
			this.lawyerData.lawyerCaseTypeList.forEach((item,index)=>{
				_this.caseTypeList.push({'text':item.caseTypeName,'caseTypeId':item.caseTypeId});
			}) 
		},
		components: {
			lawyerHead
		},
		methods:{
			caseTypeChangeHandler(index)
			{
				this.choosedCaseType = this.caseTypeList[index];
			}
		}
	}
</script>

<style lang="scss">
	.text-blue{
		color:#4a74ff
	}
</style>
