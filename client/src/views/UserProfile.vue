<template>
  <div class="user-profile text-center">
    <div class="container main-black-color">
      <header/>
      <div class="row">
        <div class="centering col-sm-12">
          <img class="photo" 
            src="../../public/img/avatar1.png"/>
        </div>
      </div>
      <form class="userForm" @submit.prevent="updateUser">
        <div class="form-row">
          <div class="col-md-4 col-sm-6 mb-3">
            <label for="firstname">First Name</label>
            <input type="text" class="form-control" id="firstname" required="true"
              v-model="user.firstname" :readonly="(editMode==false) ? true : false">
          </div>
          <div class="col-md-4 col-sm-6 mb-3">
            <label for="lastname">Last Name</label>
            <input type="text" class="form-control" id="lastname" required="true"
              v-model="user.lastname" :readonly="(editMode==false) ? true : false">
          </div>
          <div class="col-md-4 mb-3">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" required="true"
              v-model="user.email" :readonly="(editMode==false) ? true : false">
          </div>
          <div class="col-auto pwdButtons">
            <button v-if="!editMode" class="form-control btn btn-custom"
              @click.prevent="editMode = !editMode">
              <i class="fa fa-pencil" aria-hidden="true"></i>
              Edit
            </button>
            <button v-if="editMode" type="submit" class="form-control btn btn-custom">
              Update
            </button>
            <button v-if="editMode" class="form-control btn btn-custom"
              @click.prevent="editMode = !editMode">
              Cancel
            </button>
          </div>
        </div>
        <div v-if="show">
          <p class="error">
          {{ errorMessage }}</p>
        </div>
        <div v-if="successFlag" class="alert alert-success">
          {{ successMessage }}
        </div>
      </form>
      <hr/>
      <form class="userForm" @submit.prevent="updatePassword">
        <div class="form-row">
          <div v-if="PwdEditMode" class="col-md-6 col-sm-6 mb-3">
            <label for="newPassword">New password</label>
            <input type="password" class="form-control" id="newPassword" 
              placeholder="New password" v-model="newPassword" required="true">
          </div>
          <div v-if="PwdEditMode" class="col-md-6 col-sm-6 mb-3">
            <label for="confirmPassword">Confirm password</label>
            <input type="password" class="form-control" id="confirmPassword" 
              placeholder="Confirm password" v-model="confirmPassword" 
              :disabled="newPassword.length === 0 ? true : false" required="true">
          </div>
          <div class="col-auto">
            <button v-if="!PwdEditMode" class="form-control btn btn-custom"
              @click.prevent="PwdEditMode = !PwdEditMode">
              <i class="fa fa-key" aria-hidden="true"></i>
              Change Password
            </button>
            <button v-if="PwdEditMode" type="submit" class="form-control btn btn-custom">
              Update Password
            </button>
            <button v-if="PwdEditMode" class="form-control btn btn-custom"
              @click.prevent="cancelPwdChange">
              Cancel
            </button>
          </div>
        </div>
        <div v-if="showPwdError">
          <p class="error">
          {{ errorMessage }}</p>
        </div>
        <div v-if="successPwdMessage" class="alert alert-success">
          {{ successMessage }}
        </div>
      </form>
      <hr/>
      <form class="userForm uneditable">
        <div class="form-row">
          <div class="col-md-4 col-sm-6 mb-3">
            <label for="username">Username</label>
            <input type="text" class="form-control-plaintext" id="username"
              :value="user.username" readonly>
          </div>
          <div class="col-md-4 col-sm-6 mb-3">
            <label for="user-status">Current status</label>
            <input type="text" class="form-control-plaintext" id="user-status"
              :value="(user.active==true) ? 'Active' : 'Inactive'" readonly>
          </div>
          <div class="col-md-4 mb-3">
            <label for="admin">Admin?</label>
            <input type="text" class="form-control-plaintext" id="admin"
              :value="(user.admin==true) ? 'Yes' : 'No'" readonly>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/UserService.js";

export default {
  name: "user-profile",
  components: {},
  data() {
    return {
      user: [],
      newPassword: "",
      confirmPassword: "",
      editMode: false,
      PwdEditMode: false,
      successMessage: "",
      pwdUpdated: false,
      successPwdMessage: false,
      successFlag: false,
      errorMessage: "",
      show: false,
      showPwdError: false
    };
  },
  mounted: function() {
    this.loadInformationFromLocalStorage();
    this.getUserInfo();
  },
  methods: {
    loadInformationFromLocalStorage() {
      // Get the token from the local storage
      if (localStorage.getItem("DearDiiaryToken")) {
        let ls_token = JSON.parse(localStorage.getItem("DearDiiaryToken"));
        this.$store.dispatch("setToken", ls_token);
      }
      //Get the user from the local storage
      if (localStorage.getItem("DearDiiaryUser")) {
        let ls_user = JSON.parse(localStorage.getItem("DearDiiaryUser"));
        this.$store.dispatch("setUser", ls_user);
      }
    },
    updateStore(editedUserObj) {
      this.$store.commit("updateUser", editedUserObj);
    },
    success(message) {
      this.successMessage = message;
      setTimeout(() => {
        this.successMessage = "";
        this.successFlag = false;
        this.successPwdMessage = false;
        this.pwdUpdated = false;
      }, 4000);
    },
    error(message) {
      this.errorMessage = message;
      setTimeout(() => {
        this.errorMessage = "";
        this.show = false;
        this.showPwdError = false;
      }, 5000);
    },
    async getUserInfo() {
      try {
        const response = await UserService.readUserData(
          this.$store.getters.getUserId,
          this.$store.getters.getUserToken
        );
        this.user = response.data.user;
      } catch (error) {
        (this.show = true), this.error(error.response.data.error);
      }
    },
    async updateUser() {
      let self = this;
      let editedUserObj = {
        firstname: self.user.firstname,
        lastname: self.user.lastname,
        username: self.user.username,
        email: self.user.email
      };
      if (this.newPassword) {
        editedUserObj.password = this.newPassword;
      } else {
        editedUserObj.password = self.user.password;
      }
      try {
        const response = await UserService.updateUser(
          this.$store.getters.getUserId,
          editedUserObj,
          this.$store.getters.getUserToken
        );
        self.user = response.data.user;
        self.editMode = false;
        self.PwdEditMode = false;
        if (this.pwdUpdated) {
          self.successPwdMessage = true;
          self.success("Password updated successfully.");
        } else {
          self.successFlag = true;
          self.success("User details updated successfully.");
        }
        self.updateStore(self.user);
        if (this.newPassword) {
          this.newPassword = "";
          this.confirmPassword = "";
        }
      } catch (error) {
        if (this.newPassword) {
          (this.showPwdError = true), this.error(error.response.data.error);
        } else {
          (this.show = true), this.error(error.response.data.error);
        }
      }
    },
    cancelPwdChange() {
      this.PwdEditMode = !this.PwdEditMode;
      this.newPassword = "";
      this.confirmPassword = "";
    },
    updatePassword() {
      let regex = new RegExp("^[a-zA-Z0-9]{8,32}$");
      if (regex.test(this.newPassword)) {
        if (this.newPassword === this.confirmPassword) {
          this.pwdUpdated = true;
          this.updateUser();
        } else {
          this.showPwdError = true;
          this.error("Passwords don't match!");
        }
      } else {
        this.showPwdError = true;
        this.error(
          "Password must contain only lower case, upper case" +
            " and numerics with a minimum of 8 and a maximum of 32 characters in length."
        );
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
  letter-spacing: 0.5px;
  width: 100%;
  min-height: 100vh;
}
.main-black-color {
  color: #000;
}
.btn.btn-custom {
  background-color: #b71c1c;
  color: #fff;
  width: auto;
  float: right !important;
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
@media (max-width: 768px) {
  .user-profile {
    padding: 120px 10px 10px 10px;
  }
  header {
    height: 150px;
  }
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
.pwdButtons {
  margin-bottom: -10px;
}
.userForm {
  padding: 20px 15px 15px 15px;
  font-family: Lato, serif;
  font-weight: 700;
  width: 100%;
}
input::placeholder {
  font-size: 16px;
}
input {
  letter-spacing: 0.5px;
  font-size: 18px;
  font-weight: 500;
}
.uneditable input {
  text-align: center;
  font-size: 16px;
}
.alert {
  margin-top: 15px;
}
.error {
  font-size: 14px;
  letter-spacing: 1px;
  padding-top: 10px;
  color: red;
}
</style>
