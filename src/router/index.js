import Vue from "vue";
import Router from "vue-router";
import Layout from "@/global/layout";
process.env.NODE_ENV === "development" ? Vue.use(Router) : null;

Vue.use(Router);

/**
 * 1、roles:后台返回的权限结构;
 *
 */
//手动跳转的页面白名单
const whiteList = ["/"];
/**
 * path:''与path:'*'的区别：
 * 1、path:'*', 会匹配所有路径
 * 2、path:''，也是会匹配到路由
 *
 */
//默认不需要权限的页面
export const constantRouterMap = [
  {
    path: "",
    component: Layout,
    redirect: "/table/tableStand",
    hidden: true
  },
  {
    path: "/login",
    name: "login",
    hidden: true,
    component: () => import("@/view/login/index")
  },
  {
    path: "/404",
    hidden: true,
    component: () => import("@/view/404/index")
  },
  {
    path: "/401",
    hidden: true,
    component: () => import("@/view/404/401")
  },
  {
    path: "/index",
    name: "index",
    component: Layout,
    meta: {
      title: "Dashboard",
      icon: "icondashboard"
    },
    noDropdown: true,
    children: [
      {
        path: "index",
        meta: {
          title: "首页",
          icon: "icondashboard",
          routerType: "leftmenu"
        },
        component: () => import("@/view/dashboard/index")
      }
    ]
  }
];
export default new Router({
  mode: "history", // 默认为'hash'模式
  base: "/", // 添加跟目录,对应服务器部署子目录
  routes: constantRouterMap
});

//异步路由（需要权限的页面）
export const asyncRouterMap = [
  {
    path: "/table",
    name: "table",
    component: Layout,
    meta: {
      title: "表格",
      icon: "icondashboard"
    },
    children: [
      {
        path: "tableStand",
        meta: {
          title: "标准表格",
          icon: "icondashboard",
          routerType: "leftmenu"
        },
        component: () => import("@/view/table/tableStand/index")
      },
      {
        path: "table2",
        meta: {
          title: "表格2",
          icon: "icondashboard",
          routerType: "leftmenu"
        },
        component: () => import("@/view/table/table2/index")
      }
    ]
  },
  {
    path: "/date",
    name: "date",
    component: Layout,
    meta: {
      title: "日期",
      icon: "icondashboard"
    },
    // noDropdown: true,
    children: [
      {
        path: "date",
        meta: {
          title: "日期范围",
          icon: "icondashboard",
          routerType: "leftmenu"
        },
        component: () => import("@/view/date/index")
      }
    ]
  },
  {
    path: "/earth",
    name: "earth",
    component: Layout,
    meta: {
      title: "地图",
      icon: "icondashboard"
    },
    // noDropdown: true,
    children: [
      {
        path: "earth1",
        meta: {
          title: "山西",
          icon: "icondashboard",
          routerType: "leftmenu"
        },
        component: () => import("@/view/earth/index")
      }
    ]
  },
  {
    path: "/lunbo",
    name: "lunbo",
    component: Layout,
    meta: {
      title: "轮播",
      icon: "icondashboard"
    },
    // noDropdown: true,
    children: [
      {
        path: "lunbo1",
        meta: {
          title: "轮播",
          icon: "icondashboard",
          routerType: "leftmenu"
        },
        component: () => import("@/view/lunbo/index")
      }
    ]
  },
  {
    path: "/upload",
    name: "upload",
    component: Layout,
    meta: {
      title: "上传",
      icon: "icondashboard"
    },
    // noDropdown: true,
    children: [
      {
        path: "upload",
        meta: {
          title: "上传",
          icon: "icondashboard",
          routerType: "leftmenu"
        },
        component: () => import("@/view/upload/index")
      }
    ]
  },
  {
    path: "/line",
    name: "line",
    component: Layout,
    meta: {
      title: "接线图",
      icon: "icondashboard"
    },
    // noDropdown: true,
    children: [
      {
        path: "line",
        meta: {
          title: "接线图",
          icon: "icondashboard",
          routerType: "leftmenu"
        },
        component: () => import("@/view/line/index")
      }
    ]
  }
];

/**
 *  路由设置要求：
 * 1、该路由有子菜单,可以设置多层嵌套路由children;如果没有子菜单,不需要设置children;通过item.children.length来判断路由的级数;
 * 2、登录成功后,定位到系统首页时,需要加载页面整体布局组件Layout并进行子路由定向加载;
 *
 * 按需加载路由组件的2种方法：
 * 1、component: () => import('@/page/login')
 * 2、component:resolve => require(['@/page/fundPosition'], resolve)
 *
 *
 *
 * 什么情况下，路由会定位到404页面?
 * 路由中redirect:'',不起作用？
 * 三级子菜单要在顶部展示？
 *
 *
 *
 */
