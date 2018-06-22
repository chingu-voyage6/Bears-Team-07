<template>
  <div id="app">
    <div id="main">
      <router-view/>
    </div>
    <DiiaryFooter/>
  </div>
</template>

<script>
// @ is an alias to /src
import DiiaryFooter from "@/components/DiiaryFooter.vue";

export default {
  name: "diiary-footer",
  components: {
    DiiaryFooter
  }
};
</script>

<style>
#app {
  font-family: "Lato", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
}
/* To include jquery  
@import "~jquery/dist/jquery.min.js";
/* To include popper.js 
@import "~popper.js/dist/umd/popper.min.js";  */
/* To include bootstrap */
@import "~bootstrap/dist/css/bootstrap.min.css";
/* To include font-awesome */
@import "~font-awesome/css/font-awesome.css";
</style>
