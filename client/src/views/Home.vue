<template>
  <div class="home text-center">
    <MainHeader/>
    <body>
      <p>Welcome to home page</p>
    </body>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";

export default {
  name: "home",
  components: {
    MainHeader
  }
};
</script>

<style scoped>
.home {
  padding: 100px 20px 20px 20px;
}
</style>
