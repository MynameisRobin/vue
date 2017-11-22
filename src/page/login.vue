<template>
	<div class="wrapper">
		<div class="login-header">
			<div class="header-inner clearfix">
				<div class="logo fl">
					<img src="/static/images/logo1.png">
				</div>
			</div>
		</div>
		<div class="login-wrap clearfix">
			<div class="base-login">
				<el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
					<h2 class="login-title text-center">登录</h2>
					<div class="mt10">
						<el-form-item label="" prop="usercode">
							<el-input v-model="loginForm.usercode" placeholder="手机号" :maxlength="11"></el-input>
						</el-form-item>
						<el-form-item label="" prop="password">
							<el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码" @keyup.native.13="submitForm('loginForm')"></el-input>
						</el-form-item>
					</div>
					<div class="mt10 clearfix">
						<el-checkbox v-model="checked" class="remember">一个月内免登录</el-checkbox>
						<label class="fr">
		                    <router-link :to="{ name: 'forget'}" class="linelight orange">忘记密码</router-link>
		                </label>
					</div>
					<div class="mt10">
						<a href="javascript:;" class="btn dis-b btn-lg btn-submit wfull mt10" @click="submitForm('loginForm')">登录</a>
					</div>
					<div class="clearfix mt10">
						<span>还没有智享头条账号，您可以</span>
						<router-link :to="{ name: 'register'}" class="linelight orange">立即注册</router-link>
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
		name: "Login",
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
				errTip: "系统繁忙，请稍后再试!~",
				checked: true,
				loginForm: {
					usercode: "", //用户名
					password: "" //密码
				},
				rules: {
					usercode: [{
						validator: isMobile,
						trigger: "blur"
					}],
					password: [{
						required: true,
						message: "请输入密码",
						trigger: "blur,change"
					}]
				}
			};
		},
		methods: {
			// submit form
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
								password: _this.loginForm.password,
								usercode: _this.loginForm.usercode
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
		},
		created() {},
		mounted() {}
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
</style>