import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";

import layout from "@/layout/index.vue";
/*
alwaysShow: true  // 不显示本级目录只显示子级目录
hidden : true // 不显示在目录列表
keepAlive：true // 路由缓存
*/

export const routes = [
  {
    path: "/404",
    name: "404",
    meta: { title: "页面找不到了" },
    hidden: true,
    component: () => import("@/view/user/404.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { title: "登录" },
    component: () => import("@/view/user/login.vue"),
    hidden: true,
  },
  {
    path: "/",
    name: "marketManage",
    meta: { title: "市场管理", icon: "HomeFilled" },
    component: layout,
    redirect: "/marketList",
    children: [
      {
        path: "marketList",
        name: "marketList",
        meta: { title: "市场列表", icon: "List" },
        component: () => import("@/view/marketManage/marketList/index.vue"),
      },
      {
        path: "indexFrom/:id?",
        name: "indexFrom",
        hidden: true,
        meta: { title: "新增编辑市场" },
        component: () => import("@/view/marketManage/marketList/indexFrom.vue"),
      },
      {
        path: "marketPartition",
        name: "marketPartition",
        meta: { title: "市场分区管理", icon: "PieChart" },
        component: () => import("@/view/marketManage/marketPartition/index.vue"),
      },
      {
        path: "marketMan",
        name: "marketMan",
        meta: { title: "市场人员管理", icon: "User" },
        component: () => import("@/view/marketManage/marketMan/index.vue"),
      },
      {
        path: "marketEquipment",
        name: "marketEquipment",
        meta: { title: "市场设备人员信息", icon: "Cpu" },
        component: () => import("@/view/marketManage/marketEquipment/index.vue"),
      },
      {
        path: "marketSort",
        name: "marketSort",
        meta: { title: "市场排名", icon: "Sort" },
        component: () => import("@/view/marketManage/marketSort/index.vue"),
      },
    ],
  },
  {
    path: "/boothManage",
    name: "boothManage",
    meta: { title: "摊位管理", icon: "MessageBox" },
    component: layout,
    redirect: "/boothManage/index",
    children: [
      {
        path: "index",
        name: "index",
        meta: { title: "市场摊位管理", icon: "List" },
        component: () => import("@/view/boothManage/index.vue"),
      },
    ],
  },
  {
    path: "/BusinessUsers",
    name: "BusinessUsers",
    meta: { title: "经营户管理", icon: "User" },
    component: layout,
    redirect: "/BusinessUsers/index",
    children: [
      {
        path: "index",
        name: "index",
        meta: { title: "经营户基本信息管理", icon: "List" },
        component: () => import("@/view/BusinessUsers/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  strict: true,
});

export default router;
