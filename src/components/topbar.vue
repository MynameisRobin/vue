<template>
    <div class="header">
        <div class="header-inner clearfix">
            <el-row type="flex" justify="space-between">
                <el-col :span="6">
                    <h1 class="logo">
                        <router-link :to="{name:'backend'}" class="white">
                            <img src="/static/images/logo.png" alt=""> 智享头条
                        </router-link>
                    </h1>
                </el-col>
                <el-col :span="6">
                    <div class="user">
                        <div class="user-group clearfix">
                            <div class="face fl">
                                <img src="http://zxcity-app.oss-cn-hangzhou.aliyuncs.com/user-dir/zxfW5hFphyEd3mMXP3x2Xmxap7.png">
                                <ul class="dropdown">
                                    <li><i class="fa fa-leaf"></i>商家
                                        <div class="name"><a href="index.html">测试服的锐哥</a></div>
                                    </li>
                                    <li class="line">
                                        <a @click="exitFn()"><i class="fa fa-sign-out"></i>退出</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="fl">
                                <div class="user-type">企业号</div>
                                <div class="user-name">测试服的锐哥</div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Topbar",
        methods:{
            exitFn(){
                localStorage.clear();
                this.$router.push("login")
            }
        }
    }
</script>
<style lang="less" scope>
    .logo {
        margin-left: 20px;
        a {
            font-size: 28px;
            line-height: 74px;
            &:hover {
                color: #fff;
            }
            img {
                width: 50px;
                height: 50px;
                vertical-align: -15px;
            }
        }
    }
    .user-group {
        position: relative;
        float: right;
        margin-top: 11px;
    }
    .user-group .face {
        width: 51px;
        height: 51px;
        margin-right: 8px;
        border-radius: 50%;
        overflow: hidden;
    }
    .user-group .face img {
        width: 100%;
        height: 100%;
    }
    .user-group .user-type {
        width: 50px;
        color: #fff;
        text-align: center;
        background: #ff8b6f;
        border-radius: 2px;
        margin-top: 6px;
    }
    .user-group .user-name {
        font-size: 16px;
        margin-top: 4px;
    }
    .user-group .sample {
        margin-top: 14px;
    }
    .dropdown {
        position: absolute;
        left: 0;
        top: 63px;
        z-index: 9999;
        background: #fff;
        padding: 5px 0 0;
        border: 1px solid #dcdcdc;
        border-top: none;
        display: none;
        opacity: 0;
        transition: opacity .1s ease;
        -webkit-transition: opacity .1s ease;
        -moz-transition: opacity .1s ease;
    }
    .dropdown:before {
        content: '';
        position: absolute;
        z-index: 10000;
        top: -10px;
        left: -1px;
        width: calc(100% + 2px);
        height: 14px;
        background: url(/static/images/arrow-up.png) no-repeat;
    }
    .dropdown li {
        width: 128px;
        padding-left: 14px;
        line-height: 34px;
    }
    .dropdown li .fa {
        margin-right: 4px;
    }
    .dropdown li.line {
        border-top: 1px solid #e5e5e5;
    }
    .dropdown .name {
        margin-left: 18px;
        border-top: 1px solid #f5f5f5;
    }
    .user:hover .dropdown {
        display: block;
        opacity: 1;
    }
</style>
