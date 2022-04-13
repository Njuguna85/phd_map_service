import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "notFound" */ "@/views/TheHome.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "notFound" */ "@/views/AboutUs.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () =>
      import(/* webpackChunkName: "notFound" */ "@/views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes,
});

export default router;
