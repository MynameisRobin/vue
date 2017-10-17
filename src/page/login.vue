<template>
    <div class="wrapper">
        <div class="header">
            <div class="header-inner clearfix">
                <div class="logo f-left"><img src="../images/logo.png"></div>
            </div>
        </div>
        <div class="login-wrap">
            <div class="base-login">
                <div class="input-field">
                    <h2>登录</h2>
                </div>
                <div class="input-field">
                    <el-input v-model="usercode" placeholder="手机号"></el-input>
                </div>
                <div class="input-field">
                    <el-input type="password" v-model="password" placeholder="密码" @keyup.13="login"></el-input>
                </div>
                <div class="action">
                    <div class="clearfix">
                        <input id="remember" class="remember" type="checkbox" name="remember" checked="checked" v-model="checked" @click="isCheck()">
                        <label for="remember">一个月内免登录</label>
                        <label class="f-right">
                            <a class="linelight" href="forget.html">忘记密码</a>							
                        </label>
                    </div>
                </div>
                <a href="javascript:;" id="sendSubmit" class="btn btn-block btn-lg login-btn btn-submit" @click="login">登录</a>
                <div class="clearfix relex">
                    <span>还没有智享头条账号，您可以</span>
                    <a class="linelight" href="register.html">立即注册</a>
                </div>
            </div>
        </div> 
    </div>
</template>



<script>
    // import '../assets/bootstrap/css/bootstrap.min.css'
    import '../css/reset.css'
    import '../css/zx.css'
    import {is_mobile,isNull} from '../js/util.js'
    import Api from '../api/api.js'
    let api = new Api();
    export default {
        name: 'Login',
        data() {
            return {
                password: '',
                usercode: '',
                checked:'checked',
                status:true,
                dialogVisible: false
            }
        },
        methods:{
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            isCheck(){
                if(!is_mobile(this.$data.usercode) || isNull(this.$data.usercode)){
                    this.status = false;
                    this.$message.error('手机号格式不正确');
                    return false;
                }
                else if(isNull(this.$data.password)){
                    this.status = false;
                    this.$message.error('密码格式不正确');
                    return false;
                }
                this.status = true;
            },
            login() {
                var _this = this;
                this.isCheck();
                if(!this.status){
                    return false;
                }
                api.reqNewAjaxAsync(api.apiUrl.login,{
                    password:this.$data.password,
                    usercode:this.$data.usercode,
                })
                .then((res) =>{
                    alert(res.msg)
                    if(res.code == 1){
                        this.$router.to('backend')
                    }else{
                        // alert("登录成功");
                    }
                })
            }
            
        },
        mounted(){
            // this.isCheck();
            // var isLogin = true
            // if (isLogin) {
            //     this.$router.replace('backend')
            // }
        }
    }
</script>

<style lang="less" scope>
    .btn-block{
        display:block;
    }
    .btn-lg{
        padding: 10px 16px;
        font-size: 18px;
        line-height: 1.3333333;
        border-radius: 6px;
    }
    .wfull{
        width:100%;
        height:100%;
    }
    .wrapper {
        position: relative;
        background-image: url(../images/login_bg.jpg);
        background-repeat: no-repeat;
        background-position: top center;
    }

    .login-wrap,
    .register-wrap {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 456px;
        padding: 28px 50px 38px;
        background-color: rgba(255, 255, 255, .6);
        transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
    }
    input[type='text'],
    input[type='password'] {
        display: block;
        width: 100%;
        background: #fff;
        border: none;
        outline: none;
        padding: 11px 8px;
        border-radius: 4px;
    }

    input[type='text']:focus,
    input[type='password']:focus {
        box-shadow: 0 0 1px 1px #ff8b6f;
        -webkit-box-shadow: 0 0 1px 1px #ff8b6f;
        -moz-box-shadow: 0 0 1px 1px #ff8b6f;
    }

    h2 {
        font-size: 24px;
        color: #ff8b6f;
        text-align: center;
    }

    .input-field {
        position: relative;
        font-size: 16px;
        margin-bottom: 14px;
        color: #666;
    }

    .base-register .input-field {
        margin-bottom: 14px;
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