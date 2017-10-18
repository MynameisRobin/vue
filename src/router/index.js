import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Modal from '@/components/modal'
import Login from '../page/login';
import Backend from '../page/home/backend';
import Test from '../page/test';
import Main from '../page/main';
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', name: 'Login', component: Login },
    { path: '/backend', name: 'backend', component: Backend, children: [
        { path: '', component: Main },
        { path: 'test', component: Test }
      ]
    },
    { path: '/hello', name: 'Hello', component: HelloWorld },
    { path: '/modal', name: 'Modal', component: Modal }
  ]
})

// 跳转页面前检测是否登录！
router.beforeEach((to, from, next) => {
  var isLogin = true
  // !isLogin ? router.replace('/') : next()
  next()
})



export default router