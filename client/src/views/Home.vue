<template>
  <div class="home text-center">
    <WelcomeHeader/>
    <body>
      <p>Welcome to home page</p>
    </body>
  </div>
</template>

<script>
import WelcomeHeader from "@/components/WelcomeHeader.vue";

export default {
  name: "logout",
  components: {
    WelcomeHeader
  }
};
</script>

<style scoped>
.home {
  padding: 100px 20px 20px 20px;
}
</style>
