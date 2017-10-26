import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Modal from '@/components/modal'
import Login from '../page/login';
import Register from '../page/register';
import Forget from '../page/forget';
import Backend from '../page/home/backend';
import Test from '../page/test';
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
        component: Backend,
        children: [
        {
            path: '',
            component: Test
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
// router.beforeEach((to, from, next) => {
//     var _this = this;
//     var token = localStorage.getItem('scSysUser');
//     if (token) {
//         console.log('已登录，跳转到' + to.path)
//         // next()
//     }
//     else {
//         console.log('缓存中未检测到token，跳转到登录页面')
//         // router.go('login')
//     }
// })

export default router