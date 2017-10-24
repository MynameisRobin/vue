<template>
    <div class="header">
        <el-row :gutter="20" class="header-inner clearfix">
            <el-col :span="6">
                <h1 class="logo">
                    <router-link :to="{name:'backend'}" class="white">
                        智享头条
                    </router-link>
                </h1>
            </el-col>
            <el-col :span="18">
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: "Topbar",
        data() {},
        methods: {},
        created() {},
    }
</script>
<style lang="less" scope>
    h1 {
        a {
            font-size: 28px;
            line-height: 74px;
        }
    }
</style>
