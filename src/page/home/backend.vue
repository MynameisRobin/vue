<template>
    <section>
        后台
        <Leftbar></Leftbar>
        <Topbar></Topbar>
        <router-view></router-view>
    </section>
</template>
<script>
    import Leftbar from '../../components/leftbar.vue'
    import Topbar from '../../components/topbar.vue'
    export default{
        components: {
            Leftbar,
            Topbar
        }
    }
</script>
<style lang="">
    
</style>
