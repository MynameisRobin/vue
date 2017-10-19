<template>
    <div class="wrapper">
        <div class="header">
            <div class="header-inner clearfix">
                <div class="logo fl">
                    <a href="/">
                        <img src="../../static/images/logo.png">
                    </a>
                </div>
            </div>
        </div>
        <div class="login-wrap clearfix">
            <div class="base-login">
                <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="demo-ruleForm">
                    <h2 class="text-center">登录</h2>
                    <div class="mt10">
                        <el-form-item label="" prop="usercode">
                            <el-input v-model="loginForm.usercode" placeholder="手机号" :maxlength="11"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="password">
                            <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码" @keyup.native.13="submitForm('loginForm')"></el-input>
                        </el-form-item>
                    </div>
                    <div class="mt10">
                        <div class="clearfix">
                            <input class="remember" type="checkbox" name="remember" checked="checked" v-model="checked">
                            <label for="remember">一个月内免登录</label>
                            <label class="fr">
                                <a class="linelight" href="forget.html">忘记密码</a>
                            </label>
                        </div>
                    </div>
                    <div class="mt10">
                        <a href="javascript:;" id="sendSubmit" class="btn dis-b btn-lg btn-submit wfull mt10" @click="submitForm('loginForm')">登录</a>
                    </div>
                    <div class="clearfix mt10">
                        <span>还没有智享头条账号，您可以</span>
                        <a class="linelight" href="register.html">立即注册</a>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { is_mobile, isNull } from '../js/util.js'
import Api from '../api/api.js'
import { getTheme } from '../theme/';
let api = new Api();
export default {
    name: 'Login',
    data() {
        // 手机验证方法
        let isMobile = (rule, value, callback) => {
            if (isNull(value)) {
                callback(new Error('请输入手机号'));
            } else if (!is_mobile(value)) {
                callback(new Error('手机号格式不正确'));
            } else {
                callback();
            }
        }
        return {
            theme: "blue",
            checked: true,
            loginForm: {
                usercode: '',//用户名
                password: '',//密码
            },
            rules: {
                usercode: [
                    { validator: isMobile, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur,change' }
                ]
            }
        }
    },
    methods: {
        // 提交form表单
        submitForm(formName) {
            var _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    api.reqNewAjaxAsync(api.apiUrl.login, {
                        password: _this.loginForm.password,
                        usercode: _this.loginForm.usercode,
                    })
                        .then((res) => {
                            let request = res.data;
                            if (res.code == 1) {
                                // _this.$notify.success({
                                //     message: res.msg
                                // });
                                localStorage.setItem("apikey", request.apikey);
                                localStorage.setItem("scSysUser", request.scSysUser);
                                this.$router.replace('backend');
                            } else {
                                _this.$notify.error({
                                    message: res.msg
                                });
                            }
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
    mounted() {
        getTheme("orange")
        // this.isCheck();
        // var isLogin = true
        // if (isLogin) {
        //     this.$router.replace('backend')
        // }
    }
}
</script>

<style lang="less" scope>
html,
body,
.wrapper {
    width: 100%;
    height: 100%;
}

.wrapper {
    background: url(../../static/images/login_bg.jpg) top center no-repeat;
}
</style>