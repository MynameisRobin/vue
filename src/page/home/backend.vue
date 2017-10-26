<template>
	<div class="full">
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
								<a href="send_article.html"><img class="ico" src="/static/images/ico/publish.png">发表</a>
								<p>
									<a></a>
								</p>
							</div>
						</div>
						<div class="bg-blue fr">
							<div class="statistics">
								<el-row type="flex" justify="center">
									<el-col :span="7" class="ms cur-p">
										<span class="num">4</span><br>
										<span class="txt">粉丝</span>
									</el-col>
									<el-col :span="7" class="ms line cur-p">
										<span class="num">4</span><br>
										<span class="txt">粉丝</span>
									</el-col>
									<el-col :span="10" class="ms">
										<span class="num">413</span><br>
										<span class="txt">累计阅读量</span>
									</el-col>
								</el-row>
							</div>
						</div>
					</div>
					<div class="list-dt">
						<div class="list-title">公告</div>
						<ul class="list-dl" id="listUl">
							<li class="list-dd cur-p" sccmsnoticeid="2" data-toggle="modal" data-target="#noticeModal">需在在心底政府vasddadsf阿斯顿飞阿斯顿飞阿斯顿飞阿斯</li>
							<li class="list-dd cur-p" sccmsnoticeid="1" data-toggle="modal" data-target="#noticeModal">99公告测试</li>
						</ul>
					</div>
					<div id="page" class="text-center"></div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
	import Leftbar from "../../components/leftbar.vue";
	import Topbar from "../../components/topbar.vue";
	export default {
		name: "backend",
		components: {
			Leftbar,
			Topbar
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
</style>
