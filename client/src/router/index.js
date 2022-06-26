import { createRouter, createWebHistory } from "vue-router";
import Homepage from "../views/Homepage.vue";
import store from "../store/index";

const routes = [
  {
    path: "/",
    name: "Homepage",
    component: Homepage,
  },
  {
    path: "/lobby",
    name: "Lobby",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Lobby.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/getqcard",
    name: "Getqcard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Getqcard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/viewqcard",
    name: "Viewqcard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Viewqcard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/qrcode",
    name: "Qrcode",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Qrcode.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/clientscanqr",
    name: "ClientScanQr",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ClientScanQr.vue"),
  },
  {
    path: "/queueclose",
    name: "QueueClose",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/QueueClose.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.token) {
      next({
        name: "Homepage",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

// router.beforeEach((to, from, next) => {
//   if (store.state.isQueueClose === true) {
//     if (to.name !== "QueueClose") next({ name: "QueueClose" });
//   } else  next();
// });
export default router;
