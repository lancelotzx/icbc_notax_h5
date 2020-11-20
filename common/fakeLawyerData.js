let lawyerList = [
	{
		lawyerId:1,
		userId:1,
		lawyerLevelId:1,
		lawyerYears:10,
		name:"张三",
		lawyerAvatar:"https://ae01.alicdn.com/kf/HTB1xmpSbBGw3KVjSZFD760WEpXaM.png",
		legalCompany:"某某律师事务所",
		praiseCount:10,		//好评数量,
		serviceCount:50,	//服务数量
		lawyerLevel:{
			lawyerLevalId:1,
			lawyerLevelName:"优选律师",
			lawyerLevelColor:"gold"
		},
		lawyerCaseTypeList:[
			{
				caseTypeId:1,
				caseTypeName:"婚姻家庭"
			},
			{
				caseTypeId:2,
				caseTypeName:"房产纠纷"
			},
			{
				caseTypeId:3,
				caseTypeName:"刑事辩护"
			}
		]
	},
	{
		lawyerId:2,
		userId:2,
		lawyerLevelId:1,
		lawyerYears:10,
		name:"李四",
		lawyerAvatar:"https://ae01.alicdn.com/kf/HTB1xmpSbBGw3KVjSZFD760WEpXaM.png",
		legalCompany:"某某律师事务所",
		praiseCount:20,		//好评数量,
		serviceCount:70,	//服务数量
		lawyerLevel:{
			lawyerLevalId:1,
			lawyerLevelName:"优选律师",
			lawyerLevelColor:"gold"
		},
		lawyerCaseTypeList:[
			{
				caseTypeId:4,
				caseTypeName:"债券债务"
			},
			{
				caseTypeId:5,
				caseTypeName:"劳动纠纷"
			},
			{
				caseTypeId:6,
				caseTypeName:"合同纠纷"
			}
		]
	}
]
export default lawyerList;