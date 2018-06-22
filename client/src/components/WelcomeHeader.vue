<template>
  <header>
    <nav class="navbar navbar-custom navbar-expand-md navbar-light fixed-top">
      <router-link to="/" class="navbar-brand">
        <img src="../assets/brand/dd-logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
        Dear Diiary
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarToggler">
        <ul class="nav">
          <li class="nav-item">        
            <router-link to="/register" class="nav-link">
                Register
                <i class="fa fa-user-plus" aria-hidden="true"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">
              Login
              <i class="fa fa-sign-in" aria-hidden="true"></i>
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
  background-color: #420906;
  border-bottom: 1px solid #0f0f0f;
}
.navbar-brand {
  font-size: 25px;
  color: #fff;
}
.navbar-brand:hover {
  color: #ffccbc;
}
#navbarToggler a {
  font-weight: bold;
  color: #fff;
}
#navbarToggler a.router-link-exact-active {
  color: #ffccbc;
}
</style>
