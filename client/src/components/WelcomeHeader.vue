<template>
  <header>
    <nav class="navbar navbar-custom navbar-dark fixed-top">
      <div class="navbar-brand" @click="brandRedirect">
        <img src="../assets/brand/d-logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
        Dear Diiary
      </div>
      <div id="navbarLink" v-if="!$store.state.isUserLoggedIn">
        <ul class="nav navbar-right">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">
              Login
              <i class="fa fa-sign-in" aria-hidden="true"></i>
            </router-link>
          </li>
        </ul>
      </div>
      <div id="navbarLink" v-if="$store.state.isUserLoggedIn">
        <ul class="nav navbar-right">
          <li class="nav-item user-custom">
            <router-link to="/profile" class="nav-link">
              Hi {{ capitalizeUsername($store.state.user.username) }}!
            </router-link>
          </li>
          <li class="nav-item" @click="logout">
            <div class="nav-link logout">
              Logout
              <i class="fa fa-sign-out" aria-hidden="true"></i>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    capitalizeUsername(username) {
      return username.charAt(0).toUpperCase() + username.slice(1);
    },
    brandRedirect() {
      if (!this.$store.state.isUserLoggedIn) {
        this.$router.push({
          name: "welcome"
        });
      } else if (this.$store.state.isUserLoggedIn) {
        this.$router.push({
          name: "home"
        });
      }
    },
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "welcome"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  padding-right: 5px;
}
.navbar-custom {
  font-family: "Macondo Swash Caps", cursive;
  background-color: #420906;
  border-bottom: 1px solid #fff;
  letter-spacing: 0.5px;
}
.navbar-brand {
  cursor: pointer;
  font-size: 25px;
  color: #fff;
}
.navbar-brand:hover {
  color: #ffccbc;
}
#navbarLink a {
  color: #fff;
}
#navbarLink a.router-link-exact-active {
  color: #ffccbc;
}
.user-custom {
  padding-top: 8px;
}
.logout {
  cursor: pointer;
  padding-top: 15px;
}
</style>
