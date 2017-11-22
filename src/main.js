// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// import '../theme/index.css'
import './theme/blue.less';
// import {
//     getTheme
// } from "./theme/";
Vue.use(ElementUI);
Vue.config.productionTip = false
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    data() {
        return {
            // theme: "blue"
        }
    },
    created() {
        // 用橙色主题
        // getTheme(this.theme);
    },
    render: h => h(App)
})