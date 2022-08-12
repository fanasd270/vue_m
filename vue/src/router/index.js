import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Layout.vue'
import stuLayout from "@/layout/stuLayout";
import teaLayout from "@/layout/teaLayout"
import courseTeaLayout from "@/layout/courseTeaLayout";

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect:"/login",
    children:[
      //登录路由
      {
        path: '/Login',
        name: 'Login',
        component: ()=>import("@/views/Login")
      },
    ]
  },
    //家长路由
  {
    path: '/familyHome',
    name: 'familyHome',
    component: ()=>import("@/views/familyHome")
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
        path:'stuGrowthProfile',
        name:'stuGrowthProfile',
        component:()=>import("@/views/stuGrowthProfile")
      },
      // {
      //   path: 'stuAward',
      //   name: 'stuAward',
      //   component: ()=>import("@/views/stuAward"),
      // },
      {
        path: 'stuVol',
        name: 'stuVol',
        component: ()=>import("@/views/stuVol"),
      },
      {
        path: 'stuTask',
        name: 'stuTask',
        component: ()=>import("@/views/stuTask"),
      },
      {
        path: 'stuDownloadCenter',
        name: 'stuDownloadCenter',
        component: ()=>import("@/views/stuDownloadCenter"),
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
      {
        path: 'stuCA',
        name: 'stuCA',
        component: ()=>import("@/views/stuCA"),
      },
      {
        path: 'stuApplication',
        name: 'stuApplication',
        component: ()=>import("@/views/stuApplication"),
      },
      {
        path: 'stuQuestions',
        name: 'stuQuestions',
        component: ()=>import("@/views/stuQuestions"),
      },
      {
        path: 'stuTakeOff',
        name: 'stuTakeOff',
        component: ()=>import("@/views/stuTakeOff"),
      },
      {
        path: 'stuTest',
        name: 'stuTest',
        component: ()=>import("@/views/stuTest"),
      },
      {
        path: 'stuExam',
        name: 'stuExam',
        component: ()=>import("@/views/stuExam"),
      },
      {
        path: 'stuAboutUs',
        name: 'stuAboutUs',
        component: ()=>import("@/views/stuAboutUs"),
      },
    ]
  },
  //任课老师路由
  {
   path: '/courseTeaLayout',
   name: 'courseTeaLayout' ,
   component: courseTeaLayout,
   redirect: '/teaHome',
    children: [
      {
        path: '/teaHome',
        name: 'teaHome',
        component: ()=>import("@/views/teaHome"),
      },
      {
        path: 'courseTeaAboutUs',
        name: 'courseTeaAboutUs',
        component: ()=>import("@/views/courseTeaAboutUs"),
      },
      {
        path: 'ctCourseManage',
        name: 'ctCourseManage',
        component: ()=>import("@/views/ctCourseManage"),
      },
    ],
  },
//教师路由
  {
    path: '/teaLayout',
    name: 'teaLayout',
    component: teaLayout,
    redirect: '/gCHome',
    children: [
      {
        path: '/gCHome',
        name: 'gCHome',
        component: ()=>import("@/views/gCHome"),
      },
      {
        path: 'gCStuInfo',
        name: 'gCStuInfo',
        component: ()=>import("@/views/gCStuInfo"),
      },
      {
        path: 'gCTask',
        name: 'gCTask',
        component: ()=>import("@/views/gCTask"),
      },
      {
        path: 'gCTable',
        name: 'gCTable',
        component: ()=>import("@/views/gCTable"),
      },
      {
        path: 'gCAlmanac',
        name: 'gCAlmanac',
        component: ()=>import("@/views/gCAlmanac"),
      },
      {
        path: 'gCStuScore',
        name: 'gCStuScore',
        component: ()=>import("@/views/gCStuScore"),
      },
      {
        path: 'gCDownloadCenter',
        name: 'gCDownloadCenter',
        component: ()=>import("@/views/gCDownloadCenter"),
      },
      {
        path: 'gCAudit',
        name: 'gCAudit',
        component: ()=>import("@/views/gCAudit"),
      },
      {
        path: 'gCTakeOff',
        name: 'gCTakeOff',
        component: ()=>import("@/views/gCTakeOff"),
      },
      {
        path: 'gCDorm',
        name: 'gCDorm',
        component: ()=>import("@/views/gCDorm"),
      },
      {
        path: 'gCChat',
        name: 'gCChat',
        component: ()=>import("@/views/gCChat"),
      },
      {
        path: 'gCAM',
        name: 'gCAM',
        component: ()=>import("@/views/gCAM"),
      },
      {
        path: 'teaAboutUs',
        name: 'teaAboutUs',
        component: ()=>import("@/views/teaAboutUs"),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
