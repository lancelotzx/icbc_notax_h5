import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'

import httpInterceptor from '@/common/http.interceptor.js'
import navbarConfig from '@/common/navbar.config.js'
import wx from "weixin-jsapi";
// 全局方法注入
Vue.prototype.$getUser = ()=>{
	return uni.getStorageSync("USERDATA");
}
Vue.prototype.$setUser = (userData)=>{
	uni.setStorageSync("USERDATA",userData)
}
Vue.prototype.$setKey = (key,value)=>{
	uni.setStorageSync(key,value);
}
Vue.prototype.$getKey = (key)=>{
	return uni.getStorageSync(key);
}

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$navbarConfig = navbarConfig;
Vue.use(uView);
const app = new Vue({
    ...App
})

Vue.use(httpInterceptor,app);

app.$mount()
