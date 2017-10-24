<template>
	<div>
		<Topbar></Topbar>
		<Leftbar></Leftbar>
		<div class="main-right">
		</div>
	</div>
</template>
<script>
	import Leftbar from "../../components/leftbar.vue";
	import Topbar from "../../components/topbar.vue";
	export default {
		name: "backend",
		data() {
			return {}
		},
		components: {
			Leftbar,
			Topbar
		},
		created() {},
		methods: {},
		mounted() {}
	};
</script>
<style lang="less">
	body {
		background: #f1f1f1;
	}
</style>
