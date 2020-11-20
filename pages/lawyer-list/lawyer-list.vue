<template>
	<view>
		<view class="main">
			<view style="padding:0 25rpx;">
				<u-search placeholder="请输入律师名称" :bg-color="bgColor" :show-action="false" v-model="listQuery.name"></u-search>
			</view>
			<view>
				<u-dropdown>
					<u-dropdown-item v-model="listQuery.caseTypeId" :title="caseTypeList[listQuery.caseTypeId]?caseTypeList[listQuery.caseTypeId].label:'请选择案件类型'"
					 :options="caseTypeList"></u-dropdown-item>
					<u-dropdown-item v-model="listQuery.rankType" :title="ranking[listQuery.rankType]?ranking[listQuery.rankType].label:'请选择排序方式'"
					 :options="ranking"></u-dropdown-item>
				</u-dropdown>
			</view>
		</view>
		
		

		<view class="lawyer-list-bg">
			<lawyerInfo @lawyerDetail="goDetail" v-for="(lawyer,index) in lawyerList" :lawyerData="lawyer" :key="index"></lawyerInfo>
			<u-loadmore :status="status" />
		</view>

	</view>
</template>

<script>
	import lawyerInfo from '@/components/lawyerInfo.vue'
	import lawyerList from '@/common/fakeLawyerData.js'; //导入虚假律师数据
	let ranking = [{
			value: 0,
			label: "综合排序"
		},
		{
			value: 1,
			label: "执业年限"
		},
		{
			value: 2,
			label: "服务人数"
		},
		{
			value: 3,
			label: "评价人数"
		}
	]
	export default {
		components: {
			lawyerInfo
		},
		data() {
			return {
				ranking,
				lawyerList,
				listQuery: {
					name: undefined,
					pageNo: 1,
					pageSize: 10,
					caseTypeId: undefined,
					rankType: undefined
				},
				status: "nomore",
				bgColor: "#eef5fe",
				caseTypeList: [

				]
			};
		},
		methods:{
			goDetail(event)
			{
				console.log("当前点击的律师编号为"+event);
				uni.navigateTo({
					url:"/pages/lawyer-info/lawyer-info?lawyerId="+event
				})
			}
		}
	}
</script>

<style lang="scss">
	.main {
		padding-left: 15rpx;
		padding-right: 15rpx;
	}

	.lawyer-list-bg {
		background-color: #eef5fe;
		padding-top: 20rpx;
		padding-left: 15rpx;
		padding-right: 15rpx;
		padding-bottom: 10rpx;
	}
</style>
