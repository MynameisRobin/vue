<template>
	<div class="left-menu fl">
		<!-- <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
									<el-menu-item index="1">
										<i class="el-icon-star-on"></i>
										<span slot="title">主页</span>
									</el-menu-item>
									<el-submenu index="1">
										<div slot="title">
											<i class="el-icon-star-on"></i>
											<span slot="title">主页</span>
										</div>
										<el-menu-item-group>
											<el-menu-item index="1-1"></el-menu-item>
											<el-menu-item index="1-2">选项2</el-menu-item>
										</el-menu-item-group>
										<el-submenu index="1-3">
											<span slot="title">选项3</span>
											<el-menu-item index="1-3-1">选项1</el-menu-item>
										</el-submenu>
									</el-submenu>
								</el-menu> -->
		<div class="sidebar">
			<ul class="sidebar-collapse">
				<li>
					<a type="index" class="sidebar-item active" href="index.html"><i class="iconfont icon-home"></i>主页</a>
				</li>
				<li>
					<a type="publish" class="sidebar-item" href="send_article.html"><i class="fa fa-edit"></i>发表</a>
				</li>
				<li>
					<a class="cur-d"><i class="fa fa-file-text-o"></i>文章管理</a>
					<ul class="sidebar-sub">
						<li>
							<a type="report" href="report.html" class="sidebar-item">手动更新</a>
						</li>
						<li>
							<a type="commentlist" href="commentlist.html " class="sidebar-item">评论管理</a>
						</li>
					</ul>
				</li>
				<li>
					<a class="cur-d"><i class="fa fa-bar-chart "></i>数据统计</a>
					<ul class="sidebar-sub ">
						<li>
							<a type="fans_analysis" href="fans_analysis.html " class="sidebar-item">粉丝分析</a>
						</li>
						<li>
							<a type="articleAnalysis" href="articleAnalysis.html " class="sidebar-item">文章分析</a>
						</li>
					</ul>
				</li>
				<li>
					<a class="cur-d"><i class="fa fa-gear "></i>设置</a>
					<ul class="sidebar-sub ">
						<li>
							<a type="accounts" href="accounts.html " class="sidebar-item">账号信息</a>
						</li>
					</ul>
				</li>
				<li>
					<a class="cur-d"><i class="fa fa-gear "></i>广告管理</a>
					<ul class="sidebar-sub ">
						<li>
							<a type="ad_server" href="ad_server.html " class="sidebar-item">投放广告</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Leftbar",
		data() {
			return {
				isCollapse: false
			}
		},
		methods: {
			handleOpen(key, keyPath) {},
			handleClose(key, keyPath) {}
		},
	};
</script>
<style lang="less">
	.left-menu {
		min-width: 200px;
		min-height: 100%;
		border-right: 1px solid #e1e1e1;
	}
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 800px;
	}
	.el-menu {
		background: rgb(238, 241, 256);
	}
</style>
