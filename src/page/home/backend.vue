<template>
	<div>
		<Topbar></Topbar>
		<Leftbar></Leftbar>
		<div class="right-main fl">
			我是主体内容
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
	body {
		background: #f1f1f1;
	}
</style>
