<template>
  <div class="login text-center">
    <WelcomeHeader/>
    <body>
      <p>Welcome to Login page</p>
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
.login {
  padding: 100px 20px 20px 20px;
}
</style>
