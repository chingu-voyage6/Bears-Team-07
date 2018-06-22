<template>
  <div class="register text-center">
    <WelcomeHeader/>
    <body>
      <p>Welcome to Register page</p>
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
body {
  padding: 100px 20px 20px 20px;
}
</style>
