<template>
    <div class="wrapper">
        <div class="header">
            <div class="header-inner clearfix">
                <div class="logo f-left"><img src="../images/logo.png"></div>
            </div>
        </div>
        <div class="login-wrap">
            <div class="base-login">
                <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
                    <div class="input-field">
                        <h2>登录</h2>
                    </div>
                    <el-form-item label="" prop="usercode">
                        <el-input v-model="loginForm.usercode" placeholder="手机号" :maxlength="11"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="password">
                        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码" @keyup.13="login"></el-input>
                    </el-form-item>
                    <div class="action">
                        <div class="clearfix">
                            <input id="remember" class="remember" type="checkbox" name="remember" checked="checked" v-model="checked" @click="submitForm('loginForm')">
                            <label for="remember">一个月内免登录</label> 
                            <label class="f-right">
                                <a class="linelight" href="forget.html">忘记密码</a>
                            </label>
                        </div>
                    </div>
                    <a href="javascript:;" id="sendSubmit" class="btn btn-block btn-lg login-btn btn-submit" @click="submitForm('loginForm')">登录</a>
                    <div class="clearfix relex">
                        <span>还没有智享头条账号，您可以</span>
                        <a class="linelight" href="register.html">立即注册</a>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import '../css/reset.css'
import '../css/zx.css'
import { is_mobile, isNull } from '../js/util.js'
import Api from '../api/api.js'
let api = new Api();
export default {
    name: 'Login',
    data() {
        // 手机验证方法
        let isMobile = (rule, value, callback) => {
            if (isNull(value)) {
                callback(new Error('请输入手机号'));
            }
            else if (!is_mobile(value)) {
                callback(new Error('手机号格式不正确'));
            } else {
                callback();
            }
        }
        return {
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
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 提交form表单
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    api.reqNewAjaxAsync(api.apiUrl.login, {
                        password: this.loginForm.password,
                        usercode: this.loginForm.usercode,
                    })
                        .then((res) => {
                            if (res.code == 1) {
                                // this.$router.to('backend')
                            } else {
                                this.$notify.error({
                                    title: '错误',
                                    message: '这是一条错误的提示消息'
                                });
                            }
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // resetForm(formName) {
        //     this.$refs[formName].resetFields();
        // },
        // isCheck(){
        //     if(!is_mobile(this.$data.usercode) || isNull(this.$data.usercode)){
        //         this.status = false;
        //         this.$message.error('手机号格式不正确');
        //         this.tip = '手机号格式不正确';
        //         return false;
        //     }
        //     else if(isNull(this.$data.password)){
        //         this.status = false;
        //         this.$message.error('密码格式不正确');
        //         this.tip = '密码格式不正确';
        //         return false;
        //     }
        //     this.status = true;
        // },
        // login() {
        //     var _this = this;
        //     this.isCheck();
        //     if(!this.status){
        //         return false;
        //     }
        // }

    },
    mounted() {
        // this.isCheck();
        // var isLogin = true
        // if (isLogin) {
        //     this.$router.replace('backend')
        // }
    }
}
</script>

<style lang="less" scope>
.btn-block {
    display: block;
}

.btn-lg {
    padding: 10px 16px;
    font-size: 18px;
    line-height: 1.3333333;
    border-radius: 6px;
}

.wfull {
    width: 100%;
    height: 100%;
}

.wrapper {
    position: relative;
    background-image: url(../images/login_bg.jpg);
    background-repeat: no-repeat;
    background-position: top center;
}

h2 {
    font-size: 24px;
    color: #ff8b6f;
    text-align: center;
}

.action {
    margin-bottom: 14px;
}

.action .remember {
    vertical-align: baseline;
    margin-right: 4px;
}

.action label {
    color: #999999;
    font-weight: 400;
    font-size: 16px;
}

.linelight {
    font-size: 16px;
    color: #ff8b6f;
}

.linelight:hover {
    text-decoration: underline;
}

.relex {
    margin-top: 15px;
    line-height: 1em;
    color: #666;
}

.phone-code .code-btn {
    position: absolute;
    top: 0;
    right: 0;
    color: #ed793d;
    font-size: 16px;
    width: 120px;
    height: 44px;
    line-height: 44px;
    padding: 0 16px;
    text-align: center;
    cursor: pointer;
}

.phone-code .code-btn:before {
    content: '';
    position: absolute;
    left: 0;
    top: 4px;
    height: 36px;
    width: 1px;
    background-color: #ddd;
}
</style>