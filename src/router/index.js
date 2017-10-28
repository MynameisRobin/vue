import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Modal from '@/components/modal'
import Login from '../page/login';
import Register from '../page/register';
import Forget from '../page/forget';
import Backend from '../page/home/backend';
import Test from '../page/test';
import Article from "../page/publish/article";
Vue.use(Router)

const page404 = {
    template: '<div>page404</div>'
}
const router = new Router({
    routes: [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/forget',
        name: 'forget',
        component: Forget
    },
    {
        path: '/backend',
        name: 'backend',
        component: Backend
    },
    {
        path: '/article',
        name: 'article',
        component: Article,
        children: [
        {
            path: '',
            component: Article
        },
        {
            path: 'test',
            component: Test
        },
        {
            path: 'hello',
            name: 'Hello',
            component: HelloWorld
        }],
    },
    {
        path: '/modal',
        name: 'Modal',
        component: Modal
    },
    { // 根目录重定向  
        path: '*',
        component: page404
    },
    { // 根目录重定向  
        path: '/',
        redirect: '/login'
    }]
})

// 跳转页面前检测是否登录！
router.beforeEach((to, from, next) => {
    var _this = this;
    var flag = false;
    var token = localStorage.getItem('scSysUser')
    if (token || to.path == '' || to.path == '/login' || to.path == '/register' || to.path == '/forget') {
        console.log('允许跳转下一页')
        next()
        return false
    }
    else {
        console.log('缓存中未检测到token，跳转到登录页面')
        router.push('login')
        return false;
    }

})

export default router