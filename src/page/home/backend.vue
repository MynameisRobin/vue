<template>
	<div class="">
		<Topbar></Topbar>
		<div class="container">
			<el-row type="flex" justify="center">
				<el-col :span="4">
					<Leftbar></Leftbar>
				</el-col>
				<el-col :span="20" class="animated bounceInRight right-main">
					<div class="in-bd clearfix">
						<div class="bg-green fl cur-p">
							<div class="publish">
								<router-link :to="{name:'article'}"><img class="ico" src="/static/images/ico/publish.png">{{text.publish}}</router-link>
								<p>
									<a></a>
								</p>
							</div>
						</div>
						<div class="bg-blue fr">
							<div class="statistics">
								<el-row type="flex" justify="center">
									<el-col :span="7" class="ms cur-p">
										<span class="num" id="fansNumber"></span><br>
										<span class="txt">{{text.fansNumberTxt}}</span>
									</el-col>
									<el-col :span="7" class="ms line cur-p">
										<span class="num" id="articleNumber"></span><br>
										<span class="txt">{{text.articleNumberTxt}}</span>
									</el-col>
									<el-col :span="10" class="ms">
										<span class="num" id="visitNumber"></span><br>
										<span class="txt">{{text.visitNumberTxt}}</span>
									</el-col>
								</el-row>
							</div>
						</div>
					</div>
					<div class="list-dt">
						<div class="list-title">公告</div>
						<ul class="list-dl" v-for="(item,index) in noticeList" :key="'k'+index">
							<li class="list-dd cur-p" :scCmsNoticeId="item.scCmsNoticeId" @click="getNoticeDetail(item.scCmsNoticeId)">{{item.scCmsNoticeTitle}}</li>
						</ul>
					</div>
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</el-col>
			</el-row>
		</div>
		<el-dialog :title="noticleDetailList.scCmsNoticeTitle" :visible.sync="centerDialogVisible" width="60%" center>
			<div class="dialog-content" v-html="noticleDetailList.scCmsNoticeContent"></div>
		</el-dialog>
	</div>
</template>
<script>
	import Leftbar from "../../components/leftbar.vue";
	import Topbar from "../../components/topbar.vue";
	import {
		countUp,
		isNull
	} from "../../js/util.js";
	import Api from "../../api/api.js";
	let api = new Api();
	export default {
		name: "backend",
		data() {
			return {
				// 模态框
				centerDialogVisible: false,
				// 页面文本内容(中文)
				text: {
					publish: "发表",
					fansNumberTxt: "粉丝",
					articleNumberTxt: "文章数量",
					visitNumberTxt: "累计阅读量"
				},
				// 总条数
				total: 0,
				// 一页几条
				pageSize: 5,
				// 当前页
				currentPage: 1,
				// 公告列表
				noticeList: {},
				// 公告详情
				noticleDetailList: {},
				// 加载动画
				loading: '',
				errTip: "系统繁忙，请稍后再试!~",
			}
		},
		components: {
			Leftbar,
			Topbar
		},
		methods: {
			// 转换为dom节点
			compile(template) {
				const cell = document.createElement('div');
				cell.innerHTML = template;
				$parent.$compile(cell); // todo 这里无法触发 ready 钩子
				this.$el.innerHTML = '';
				this.$el.appendChild(cell);
			},
			// 分页
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.loading = this.$loading({
					target: "div.list-dt",
					background: "rgba(0, 0, 0, 0)",
					customClass: "loading",
				});
				this.getTableData(`${val}`);
			},
			// 获取头部数据
			getHeadData() {
				let _this = this;
				var scSycUser = localStorage.getItem("scSysUser") || "";
				let userId = !isNull(scSycUser) ? JSON.parse(scSycUser).id : "";
				api
					.reqNewAjaxAsync(api.apiUrl.AllSubScriptionByUserId, {
						"userId": userId
					})
					.then(
						res => {
							this.loading.close();
							if (res.code == 1) {
								// 数字上升动画
								setTimeout(() => {
									countUp('articleNumber', res.data.articleNumber || 0);
									countUp('fansNumber', res.data.fansNumber || 0);
									countUp('visitNumber', res.data.visitNumber || 0);
								}, 800);
							} else {
								_this.$notify.error({
									message: res.msg
								});
							}
						},
						(res) => {
							this.loading.close()
							_this.$notify.error({
								message: _this.errTip
							});
						})
			},
			// 获取表格数据
			getTableData(page) {
				let _this = this;
				api
					.reqNewAjaxAsync(api.apiUrl.selectNoticeList, {
						"userId": 0,
						"pagination": {
							"rows": _this.pageSize,
							"page": page
						}
					})
					.then(
						res => {
							this.loading.close();
							if (res.code == 1) {
								if (res.data) {
									_this.noticeList = res.data;
									_this.total = res.total;
								}
							}
						},
						(res) => {
							this.loading.close()
							_this.$notify.error({
								message: _this.errTip
							});
						})
			},
			getNoticeDetail(id) {
				let _this = this;
				api
					.reqNewAjaxAsync(api.apiUrl.selectNoticeA, {
						'scCmsNoticeId': id
					})
					.then(
						res => {
							this.loading.close();
							if (res.code == 1) {
								if (res.data) {
									// 打开模态框放入数据
									_this.noticleDetailList = res.data;
									_this.centerDialogVisible = true;
								}
							}
						},
						(res) => {
							this.loading.close()
							_this.$notify.error({
								message: _this.errTip
							});
						})
			}
		},
		created() {},
		mounted() {
			this.loading = this.$loading({
				background: "rgba(0, 0, 0, 0.7)",
				customClass: "loading"
			});
			this.getHeadData();
			this.getTableData(1);
		}
	}
</script>
<style lang="less">
	.bg-green {
		background-color: #60d295;
	}
	.bg-blue {
		background-color: #7cbae5;
	}
	.in-bd {
		overflow: hidden;
		.bg-green {
			width: 250px;
			height: 124px;
			position: relative;
		}
		.bg-blue {
			width: calc(~'100%' - 260px);
			height: 124px;
		}
	}
	.publish {
		position: absolute;
		text-align: center;
		left: 50%;
		top: 50%;
		font-size: 18px;
		transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		.ico {
			display: block;
			margin: 0 auto;
			margin-bottom: 8px;
		}
		a {
			color: #fff;
		}
	}
	.statistics {
		margin: 20px 0;
		.ms {
			width: 100%;
			height: 84px;
			text-align: center;
			color: #fff;
			padding-top: 10px;
		}
		.ms.line {
			border-right: 1px solid #96c8ea;
		}
		.num {
			font-size: 30px;
		}
		.txt {
			font-size: 18px;
		}
	} // 公告列表
	.list-dt {
		border: 1px solid #dcdcdc;
		margin: 15px 0;
		min-height: 600px;
		.list-title {
			font-size: 16px;
			border-bottom: 1px solid #dcdcdc;
			background-color: #F5F5F5;
			padding: 0 15px;
			line-height: 40px;
		}
		.list-dd {
			border-bottom: 1px solid #dcdcdc;
			padding: 0 15px;
			line-height: 50px;
		}
	}
	/*modal*/
	.zx-modal-dialog {
		width: 1200px;
		/*height: 608px;*/
	}
	.zx-modal-header {
		padding: 20px 100px 0;
		text-align: center;
	}
	.zx-modal-body {
		position: relative;
		padding: 20px 100px;
		height: 700px;
		overflow: auto;
	}
	.zx-modal-footer {
		padding: 15px;
		text-align: center;
	}
	.notice_title {
		text-align: left;
		font-size: 40px;
		width: 800px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.notice_head {
		margin-bottom: 20px;
		color: darkgray;
	}
	#noticeContent img {
		max-width: 800px;
		display: block;
	}
	.dialog-content {
		min-height: 500px;
		overflow: hidden;
		img {
			max-width: 100%;
			max-height: 100%;
		}
	}
</style>
