<template>
    <div class="wrapper">
        <div class="login-header">
            <div class="header-inner clearfix">
                <div class="logo fl">
                    <router-link :to="{ name: 'login'}"><img src="/static/images/logo1.png"></router-link>
                </div>
            </div>
        </div>
        <div class="login-wrap clearfix">
            <div class="base-login">
                <el-form :model="forgetForm" :rules="rules" ref="forgetForm" class="demo-dynamic" label-width="80px" :label-position="labelPosition">
                    <h2 class="login-title text-center">忘记密码</h2>
                    <div class="mt20">
                        <el-form-item label="手机号" prop="usercode">
                            <el-input v-model="forgetForm.usercode" placeholder="手机号" :maxlength="11"></el-input>
                        </el-form-item>
                        <el-form-item label="验证码" prop="code">
                            <el-input v-model="forgetForm.code" placeholder="验证码" :maxlength="6" class="code"></el-input>
                            <el-button @click="getCode('forgetForm')" class="fr" :loading="loading">{{code}}</el-button>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="forgetForm.password" auto-complete="off" placeholder="密码" @keyup.native.13="submitForm('forgetForm')"></el-input>
                        </el-form-item>
                    </div>
                    <div class="mt10">
                        <a href="javascript:;" class="btn dis-b btn-lg btn-submit wfull mt10" @click="submitForm('forgetForm')">重置密码</a>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    /**登录 */
    import {
        is_mobile,
        isNull
    } from "../js/util.js";
    import Topbar from "../components/topbar";
    import Api from "../api/api.js";
    let api = new Api();
    export default {
        name: "Forget",
        data() {
            // 手机验证方法
            let isMobile = (rule, value, callback) => {
                if (isNull(value)) {
                    callback(new Error("请输入手机号"));
                } else if (!is_mobile(value)) {
                    callback(new Error("手机号格式不正确"));
                } else {
                    callback();
                }
            };
            return {
                // 验证码获取
                code: "点击验证",
                num: "60",
                loading: false,
                // 表单文字对齐方式
                labelPosition: "left",
                // 出错信息提示
                errTip: "系统繁忙，请稍后再试!~",
                checked: true,
                forgetForm: {
                    usercode: "", //用户名
                    password: "" //密码
                },
                rules: {
                    usercode: [{
                        validator: isMobile,
                        trigger: "blur"
                    }],
                    password: [{
                        message: "请输入密码",
                        trigger: "blur,change"
                    }],
                    code: [{
                        message: "请输入验证码",
                        trigger: "blur"
                    }],
                }
            };
        },
        methods: {
            getCode(formName) {
                var _this = this;
                _this.$refs[formName].validateField("usercode", (valid) => {
                    console.log(valid)
                    if (valid) {
                        // loading
                        const loading = this.$loading({
                            lock: true,
                            background: "rgba(0, 0, 0, 0.7)",
                            customClass: "loading"
                        });
                        // ajax login
                        api
                            .reqNewAjaxAsync(api.apiUrl.login, {
                                code: _this.forgetForm.code,
                            })
                            .then(
                                res => {
                                    // close loading
                                    loading.close();
                                    let request = res.data;
                                    if (res.code == 1) {
                                        _this.code = _this.num + " S";
                                        _this.loading = true;
                                        let timer = setInterval(() => {
                                            _this.num--;
                                            _this.code = _this.num + " S";
                                            if (_this.num == 0) {
                                                clearInterval(timer);
                                                _this.loading = false;
                                                _this.code = "重新发送"
                                                _this.num = 60;
                                            }
                                        }, 1000);
                                    } else {
                                        _this.$notify.error({
                                            message: res.msg
                                        });
                                    }
                                },
                                function(res) {
                                    loading.close();
                                    _this.$notify.error({
                                        message: _this.errTip
                                    });
                                }
                            );
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            submitForm(formName) {
                var _this = this;
                _this.$refs[formName].validate(valid => {
                    if (valid) {
                        // loading
                        const loading = this.$loading({
                            lock: true,
                            background: "rgba(0, 0, 0, 0.7)",
                            customClass: "loading"
                        });
                        // ajax login
                        api
                            .reqNewAjaxAsync(api.apiUrl.login, {
                                code: _this.forgetForm.code,
                                password: _this.forgetForm.password,
                                usercode: _this.forgetForm.usercode
                            })
                            .then(
                                res => {
                                    // close loading
                                    loading.close();
                                    let request = res.data;
                                    if (res.code == 1) {
                                        localStorage.setItem("apikey", request.apikey);
                                        localStorage.setItem(
                                            "scSysUser",
                                            JSON.stringify(request.scSysUser)
                                        );
                                        _this.$router.push("backend");
                                    } else {
                                        _this.$notify.error({
                                            message: res.msg
                                        });
                                    }
                                },
                                function(res) {
                                    loading.close();
                                    _this.$notify.error({
                                        message: _this.errTip
                                    });
                                }
                            );
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            }
        }
    };
</script>
<style lang="less" scope>
    html,
    body,
    .wrapper {
        width: 100%;
        height: 100%;
    }
    .wrapper {
        background: url(/static/images/login_bg.jpg) top center no-repeat;
    }
    .btn-lg {
        padding: 10px 0;
        font-size: 18px;
        line-height: 1.3333333;
        border-radius: 6px;
    }
    .login-header {
        background: #fff;
        img {
            margin-top: 15px;
        }
    }
    .code {
        width: 60%;
    }
</style>