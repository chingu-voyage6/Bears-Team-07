<template>
  <div class="logout text-center">
    <WelcomeHeader/>
    <body>
      <p>Welcome to Logout page</p>
    </body>
  </div>
</template>

<script>
import WelcomeHeader from "@/components/WelcomeHeader.vue";

export default {
  name: "welcome-header",
  components: {
    WelcomeHeader
  }
};
</script>

<style scoped>
.logout {
  padding: 100px 20px 20px 20px;
}
</style>
