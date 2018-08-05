<template>
  <div class="user-profile text-center">
    <div class="container main-black-color">
      <header/>
      <main>
        <div class="row">
          <div class="centering col-sm-12">
            <div>
              <img class="photo" 
              src="../../public/img/avatar1.png"/>
            </div>
            <div class="name">
              <h4>{{ user.firstname + " " + user.lastname }}</h4>
            </div>
            <!-- <div class="info">
            <p>UI/UX Designer</p>
            </div> -->
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/UserService.js";

export default {
  name: "user-profile",
  components: {
  },
  data() {
    return {
      user: []
    };
  },
  mounted: function() {
    this.loadInformationFromLocalStorage();
  },
  methods: {
    loadInformationFromLocalStorage: function() {
      // Get the token from the local storage
      if (localStorage.getItem("DearDiiaryToken")) {
        let ls_token = JSON.parse(localStorage.getItem("DearDiiaryToken"));
        this.$store.dispatch("setToken", ls_token);
      }
      //Get the user from the local storage
      if (localStorage.getItem("DearDiiaryUser")) {
        let ls_user = JSON.parse(localStorage.getItem("DearDiiaryUser"));
        this.$store.dispatch("setUser", ls_user);
        this.user = ls_user;
      }
    }
  }
};
</script>
 
<style scoped>
.user-profile {
  padding: 100px 20px 20px 20px;
  position: relative;
  background: #efefef;
  letter-spacing: 1px;
  width: 100%;
  min-height: 100vh;
}
.main-black-color {
  color: #000;
}
.btn.btn-custom {
  background-color: #b71c1c;
  color: #fff;
  margin-right: 10px;
  font-size: 16px;
  border: 1px solid #fbe9e7;
  border-radius: 5px;
  overflow: hidden;
}
.btn.btn-custom:hover {
  background-color: #420906;
}
.btn.btn-custom > i {
  padding-right: 2px;
}
/* user profile card */
.container {
  max-width: 1250px;
  margin: 30px auto 30px;
  padding: 0 !important;
  width: 90%;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
}
header {
  background: #eee;
  background-color: transparent;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)),
    url("../assets/landing.jpg") no-repeat center top;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: red;
  height: 250px;
}
@media (max-width: 800px) {
  header {
    height: 150px;
  }
}
main {
  padding: 20px 20px 0px 20px;
}
.centering {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.photo {
  width: 200px;
  height: 200px;
  margin-top: -120px;
  border-radius: 100px;
  border: 4px solid #fff;
}
.name {
  margin-top: 20px;
  font-weight: 700;
  font-size: 18pt;
  width: 90%;
  border-bottom: 1px solid #757575;
}
.info {
  margin-top: 10px;
  font-family: "Lato", serif;
  margin-bottom: 5px;
  font-size: 11pt;
}
</style>
