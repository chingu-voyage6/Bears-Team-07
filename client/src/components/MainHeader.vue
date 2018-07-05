<template>
  <header>
    <nav class="navbar navbar-custom navbar-dark fixed-top">
      <router-link to="/" class="navbar-brand">
        <img src="../assets/brand/d-logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
        Dear Diiary
      </router-link>
      <div id="navbarLink">
        <ul class="nav navbar-right">
          <!-- <li class="nav-item">
            Welcome
          </li>  -->
          <li class="nav-item">
            <router-link to="/logout" class="nav-link">
              Logout
              <i class="fa fa-sign-out" aria-hidden="true"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>


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
</style>
