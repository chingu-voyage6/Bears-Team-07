<template>
  <div class="login text-center">
    <MainHeader/>
    <body>
      <p>Welcome to Login page</p>
    </body>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";

export default {
  name: "main-header",
  components: {
    MainHeader
  }
};
</script>

<style scoped>
.login {
  padding: 100px 20px 20px 20px;
}
</style>
