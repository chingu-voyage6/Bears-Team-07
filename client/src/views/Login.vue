<template>
    <div class="container-fluid border border-dark background-container">
        <div class="row">
            <div class="col-12">
                <div class="background-container modal-dialog text-center">
                    <div class="main-section">

                        <div class="modal-content">
                                <div class="col-12 usr-img">
                                    <img v-bind:src="imgSource" alt="">
                                </div>
                                <div class="col-12 form-input">
                                    <form action="">
                                        <div class="form-group">
                                            <input type="email" class="form-control" v-model="loginEmail" placeholder="Enter Email">
                                        </div>

                                        <div class="form-group">
                                            <input type="password" class="form-control" v-model="loginPassword" placeholder="Enter Password">
                                        </div>

                                        <div class="form-group">
                                            <button type="submit" v-on:click="this.loginAttempt" class="form-control btn btn-success">Login</button>
                                        </div>
                                    </form>
                                </div>

                                <div class="col-12 forgot">
                                    <a href="#">Forgot Password?</a>
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
    import axios from 'axios'
    export default {
        name: "welcome-header",
        data: function() {
            return {
                loginUrl: 'http://localhost:3000/api/v1/login',
                imgSource: './img/face.png',
                backgroundUrl: './img/mountain.png',
                loginEmail: '',
                loginPassword: '',
                token: ''
            }
        },
        methods: {
          loginAttempt: function (event){
              event.preventDefault();
              console.log('Loggn Atempt');
              console.log('Email: ', this.loginEmail);
              console.log('Pass: ', this.loginPassword);
              var self = this;
              var data = {
                  email: self.loginEmail,
                  password: self.loginPassword
              };

              var headers = {
                  'Content-Type': 'application/json',
              };

              axios.post(self.loginUrl, data, headers )
              .then(function (response) {
                  console.log(response);
              })
              .catch(function (error) {
                  console.log(error);
              });
          }
        },
        components: {
            WelcomeHeader
        }
    };
</script>

<style scoped>

    .container-fluid {
        height: 100%;
    }

    .login {
        padding: 100px 20px 20px 20px;
    }

    .background-container {
        background-color: transparent;
        background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)),
        url("../assets/landing.jpg") no-repeat center top;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -ms-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }

    .main-section{
        margin: 0 auto;
        margin-top: 130px;
        padding: 0;
    }

    .modal-content{
        background-color: #434e5a;
        opacity: 0.8;
        padding: 0 18px;
        border-radius: 10px;
    }

    .usr-img img{
        height: 120px;
        width: 120px;
    }

    .usr-img{
        margin-top: -60px;
        margin-bottom: 45px;
    }

    .form-group{
        margin-bottom: 25px;
    }

    .form-group input{
        height: 42px;
        border-radius: 5px;
        border: 0;
        font-size: 18px;
        letter-spacing: 2px;
        /*padding-left: 54px;*/
    }

    .btn-success{
        background-color: #1c6288;
        font-size: 19px;
        border-radius: 5px;
        padding: 7px 14px;
        border: 1px solid #daf1ff;
    }

    .btn-success:hover{
        background-color: #13445e;
        border: 1px solid #daf1ff;
    }

    .forgot {
        padding: 5px 0 25px;
    }
    
    .forgot a{
        color: #daf1ff;
    }

</style>
<style>

    html,body {
        height: 100%;
    }
    
    #main {
        height: calc(100% - 40px);
    }


</style>