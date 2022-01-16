import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Layout.vue'
import stuLayout from "@/layout/stuLayout";

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect:"/login",
    children:[
      {
        path: '/StudentHome',
        name: 'StudentHome',
        component: ()=>import("@/views/StudentHome")
      },
    ]
  },
    //登录路由
  {
    path: '/Login',
    name: 'Login',
    component: ()=>import("@/views/Login")
  },
    //学生路由
  {
    path:'/stuLayout',
    name:'stuLayout',
    component: stuLayout,
    redirect: '/stuHome',
    children: [
      {
        path: '/stuHome',
        name: 'stuHome',
        component: ()=>import("@/views/stuHome")
      },
      {
        path: 'stuPersonal',
        name: 'stuPersonal',
        component: ()=>import("@/views/stuPersonal"),
      },
      {
        path: 'stuScore',
        name: 'stuScore',
        component: ()=>import("@/views/stuScore"),
      },
      {
        path: 'stuAward',
        name: 'stuAward',
        component: ()=>import("@/views/stuAward"),
      },
      {
        path: 'stuTask',
        name: 'stuTask',
        component: ()=>import("@/views/stuTask"),
      },
      {
        path: 'stuAM',
        name: 'stuAM',
        component: ()=>import("@/views/stuAM"),
      },
      {
        path: 'stuSchedule',
        name: 'stuSchedule',
        component: ()=>import("@/views/stuSchedule"),
      },
      {
        path: 'stuChat',
        name: 'stuChat',
        component: ()=>import("@/views/stuChat"),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
