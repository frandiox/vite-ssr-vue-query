// Note: Use vite-plugin-pages for filesystem routes

export default [
  {
    name: "home",
    path: "/",
    component: () => import("./Content.vue")
  }
];
