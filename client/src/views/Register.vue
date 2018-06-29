<template>
  <div class="text-center">
    <WelcomeHeader/>
    <div class="container-fluid background-container">
        <div class="row">
          <div class="col-12">
            <div class="modal-dialog">
              <div class="col-sm-9 main-section text-center">
                <div class="modal-content">
                  <h3>CREATE YOUR ACCOUNT</h3>
                  <div class="col-12 form-input">
                    <form @submit.prevent="register">
                      <div class="form-row">
                        <div class="form-group col-md-6 col-sm-12">
                          <input type="text" class="form-control" v-model="firstName" placeholder="First Name" required="true">
                        </div>
                        <div class="form-group col-md-6 col-sm-12">
                          <input type="text" class="form-control" v-model="lastName" placeholder="Last Name" required="true">
                        </div>
                      </div>
                      <div class="form-group input-group">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <i class="fa fa-user" aria-hidden="true"></i>
                          </div>
                        </div>
                        <input type="text" class="form-control" v-model="username" placeholder="Username" required="true">
                      </div>
                      <div class="form-group input-group">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <i class="fa fa-envelope" aria-hidden="true"></i>
                          </div>
                        </div>
                        <input type="email" class="form-control" v-model="email" placeholder="Email" required="true">
                      </div>
                      <div class="form-group input-group">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <i class="fa fa-key" aria-hidden="true"></i>
                          </div>
                        </div>
                        <input type="password" class="form-control" v-model="password" placeholder="Password" required="true">
                      </div>
                      <div class="form-group input-group">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <i class="fa fa-lock" aria-hidden="true"></i>
                          </div>
                        </div>
                        <input type="password" class="form-control" v-model="confirmPassword" placeholder="Confirm Password" required="true">
                      </div>
                      <div class="form-group">
                        <button type="submit" class="form-control btn btn-custom">
                          Register
                          <i class="fa fa-user-plus" aria-hidden="true"></i>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import WelcomeHeader from "@/components/WelcomeHeader.vue";
import RegistrationService from "@/services/RegistrationService.js";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  components: {
    WelcomeHeader
  },
  methods: {
    async register() {
      if (this.password == this.confirmPassword) {
        const response = await RegistrationService.register({
          firstname: this.firstName,
          lastname: this.lastName,
          username: this.username,
          email: this.email,
          password: this.password,
          admin: "false"
        });
        console.log(response.data);
      } else {
        alert("Passwords don't match");
      }
    }
  }
};
</script>

<style scoped>
.background-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: transparent;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)),
    url("../assets/landing.jpg") no-repeat center top;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -ms-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-attachment: fixed;
  overflow: hidden;
  padding-bottom: 40px;
}
.register {
  padding-bottom: 100px;
}
.main-section {
  margin: 0 auto;
  margin-top: 130px;
  padding: 0;
}
.modal-content {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));
  padding: 0 18px;
  border-radius: 10px;
  border: 1px solid #420906;
}
h3 {
  padding-top: 25px;
}
form {
  padding-top: 25px;
}
.form-group {
  margin-bottom: 25px;
  font-size: 18px;
}
.form-group .fa {
  color: #fbe9e7;
}
.form-control:focus {
  border-color: #fff;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(255, 0, 0, 0.6);
}
.input-group-text {
  background-color: transparent;
}
.form-group input {
  color: #fff;
  background-color: transparent;
  height: 42px;
  border-radius: 5px;
  border: 1px solid #fbe9e7;
  letter-spacing: 2px;
}
/* Chrome/Opera/Safari */
::-webkit-input-placeholder {
  color: #fbe9e7;
}
/* Firefox 19+ */
::-moz-placeholder {
  color: #fbe9e7;
}
/* IE 10+ */
:-ms-input-placeholder {
  color: #fbe9e7;
}
/* Firefox 18- */
:-moz-placeholder {
  color: #fbe9e7;
}
/* Most modern browsers support this now. */
::placeholder {
  color: #fbe9e7;
}
.btn.btn-custom {
  background-color: #420906;
  letter-spacing: 1px;
  color: #fff;
  font-size: 20px;
  border: 1px solid #fbe9e7;
  border-radius: 5px;
  overflow: hidden;
}
.btn.btn-custom:hover {
  background-color: transparent;
}
.btn.btn-custom > i {
  padding-right: 2px;
}
</style>
