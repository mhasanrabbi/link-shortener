import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/registration",
    name: "registration",
    component: Register,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("access_token");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  }
  else if (!to.meta.requiresAuth && isAuthenticated && (to.name === "login" || to.name === "registration")) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
