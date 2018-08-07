<template>
  <div id="app">
    <div id="main">
      <WelcomeHeader/>
      <router-view/>
    </div>
    <DiiaryFooter v-bind:class="{'fixed-bottom': $route.path === '/home'}" />
  </div>
</template>

<script>
// @ is an alias to /src
import WelcomeHeader from "@/components/WelcomeHeader.vue";
import DiiaryFooter from "@/components/DiiaryFooter.vue";

export default {
  name: "app",
  components: {
    WelcomeHeader,
    DiiaryFooter
  }
};
</script>

<style>
#app {
  height: 100%;
  font-family: "Alegreya", Lato, Arial, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
}

.fixed-bottom {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1030;
}

.margin-bottom-60{
  margin-bottom: 60px;
}
/* Google font import */
@import url("https://fonts.googleapis.com/css?family=Alegreya|Lato|Roboto|Macondo+Swash+Caps");
/* To include jquery  
@import "~jquery/dist/jquery.min.js";
/* To include popper.js 
@import "~popper.js/dist/umd/popper.min.js"; */
/* To include bootstrap */
@import "~bootstrap/dist/css/bootstrap.min.css";
/* To include font-awesome */
@import "~font-awesome/css/font-awesome.css";
</style>
