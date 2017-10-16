<template>
    <section>
        后台
        <Leftbar></Leftbar>
        <Topbar></Topbar>
        <router-view></router-view>
    </section>
</template>
<script>
    import Leftbar from './leftbar.vue'
    import Topbar from './topbar.vue'
    export default{
        components: {
            Leftbar,
            Topbar
        }
    }
</script>
<style lang="">
    
</style>
