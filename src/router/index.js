

import Vue from 'vue';
import vueRouter from 'vue-router';
import Layout from '@/views/Layout'
import Login from "@/views/Login"
import noFound from "@/views/404"
import Main from "@/views/main/main"

let mainRouter = [{
  path: "/",
  component:Layout,
  redirect: 'main',
  children:[
    {
      path: "/main",
      name: 'main',
      component:Main,
      meta: {
        title: "首页",
        icon: "el-icon-goods"
      },
    },
    {
      path: '/404',
      component:noFound,
      hidden: true,
      meta: {
        title: "404"
      }
    }
  ]
}, {
  path: "/login",
  component: Login,
},
{
  path: '*',
  redirect: '/404',
  component:noFound,
  hidden: true
}
];
Vue.use(vueRouter);
let router =new vueRouter({
    routes: mainRouter
  })
window.router=router;

export default router;
