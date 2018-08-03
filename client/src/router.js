import Vue from "vue";
import Router from "vue-router";
import Welcome from "./views/Welcome.vue";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";
import Home from "./views/Home.vue";
import Profile from "./views/UserProfile.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "welcome",
      component: Welcome
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    }
  ],
  //removes '#' from the URL
  mode: "history"
});
