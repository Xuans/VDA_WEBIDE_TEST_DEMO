// import 'babel-polyfill'   //如果需要兼容到IE9就打开
import Vue from 'vue'
import App from './App'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import ElementUI from 'element-ui'
import '../theme/index.css'
import './api/index.js';
import  router from './router'

import Lib from  '@v2-lib/vue.spa.plugin'
import store from './store'



Vue.use(Lib)
Vue.use(ElementUI)
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  NProgress.start();
  let wpath = window.location.hash.split('?')[0].replace('#/', '');
  let routes= router.options.routes
  if (localStorage.getItem('openWindow') && localStorage.getItem('openWindow') === wpath) {
    routes.push({
      path: '/' + wpath,
      component: Lib._import(wpath),
      hidden: true
    });
    router.addRoutes(routes);
  }
  
  let urlParam = window.location.hash.split('?')[1];

  if (wpath && urlParam && urlParam.indexOf('IDE') !== -1) {
    let hasIn=routes[0].children.some((item)=>item.path==='/'+wpath); //判断是否存在路由表里
    if (!routes.filter(r => r.type === 'preview').length) {
      if(!hasIn){
        routes[0].children.push({
          path: '/'+wpath,
          replace: true,
          component: Lib._import(wpath),
          meta: {
            title: '预览',
            type: 'preview'
          }
           });
        router.addRoutes(routes);
      }else{
        routes[0].children.map((item) => {
          if (item.path === '/'+wpath) {
              item.meta.type = 'preview';
              item.meta.title = '预览';
          }
        });
      }

     
      next();
    }
  }else{

    if (to.path == '/login') {
      sessionStorage.removeItem('user');
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
  
    
    if (!user && to.path != '/login') {
      next({
        path: '/login'
      })
    } else {
        next()
    }

  }
  
   
})

router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')