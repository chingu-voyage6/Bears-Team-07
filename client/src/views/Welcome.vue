<template>
  <div>
    <section class="outer-div welcome">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12 text-center">
            <h1 class="sec-title">DEAR DIIARY</h1>
            <h3 class="sec-subtitle text-center">VISUALIZE YOUR LIFE'S EVENTS 
            AND MILESTONES</h3>
              <router-link to="/register" class="btn btn-lg btn-custom">
                Register
                <i class="fa fa-user-plus" aria-hidden="true"></i>
              </router-link>
          </div>
        </div> 
      </div> 
    </section>
    <section class="main-content">
    <div class="container-fluid text-center">
      <h2>PICTURIZE who you were and who you are,</h2>
      <h2>by collecting and cherishing personal & private moments.</h2>
       <div class="row feature-icons">
          <div class="col-sm-12 col-md-6 col-lg-3">
                <i class="fa fa-quote-left fa-5x"></i>              
              <h3>Finding it difficult to EXPRESS your emotions?</h3>
              <p class="lead mb-0"> Make a record of a famous quote that might 
              express exactly what you are feeling.
              </p>           
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3">          
                <i class="fa fa-file-text fa-5x"></i>              
              <h3>Can't imagine a life without WRITING?</h3>
              <p class="lead mb-0">Write your heart out as it is the best way to communicate with yourself.</p>           
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3">            
                <i class="fa fa-file-image-o fa-5x"></i>             
              <h3>An IMAGE is worth a thousand words!</h3>
              <p class="lead mb-0">Images have the superpower to transport you to a different time and place. 
              Capture and re-live!</p>            
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3">            
                <i class="fa fa-star fa-5x"></i>              
              <h3>MEMORIES are powerful.</h3>
              <p class="lead mb-0">Preserve them as "Milestones", so that you get in touch 
              with someone so near, yet so far - yourself.</p>            
          </div>
        </div>
    </div>
    </section>
  </div>  
</template>

<script>
// @ is an alias to /src
export default {};
</script>

<style scoped>
.welcome {
  font-family: "Macondo Swash Caps", cursive;
  padding: 100px 20px 20px 20px;
  background-color: #ebf5fb;
  position: relative;
  width: 100%;
  height: 700px;
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
}
.btn.btn-custom {
  background-color: Transparent;
  background-repeat: no-repeat;
  letter-spacing: 1px;
  color: #ffffff;
  border: 1px solid;
  border-radius: 10px;
  overflow: hidden;
}
.btn.btn-custom:hover {
  background-color: #420906;
}
.btn.btn-custom > i {
  padding-right: 2px;
}
.outer-div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sec-title {
  font-size: 100px;
  letter-spacing: 2px;
}
.sec-subtitle {
  text-transform: lowercase;
  letter-spacing: 2px;
  padding-bottom: 40px;
}
.main-content {
  background: linear-gradient(#420906, #b71c1c);
  padding: 60px 20px 60px 20px;
  letter-spacing: 1px;
}
.feature-icons {
  padding-top: 40px;
}
.feature-icons i {
  padding-top: 30px;
  padding-bottom: 30px;
  color: #fff;
}
.feature-icons p {
  padding-bottom: 20px;
}
/* Medium devices and below */
@media (max-width: 768px) {
  .welcome {
    height: 500px;
  }
  .sec-title {
    font-size: 70px;
    letter-spacing: 0.5px;
  }
  .sec-subtitle {
    letter-spacing: 1px;
    font-size: 20px;
    padding-bottom: 20px;
  }
  .btn.btn-lg.btn-custom {
    padding: 6px 12px;
    font-size: 18px;
    line-height: 2;
  }
  .main-content {
    padding: 40px 20px 40px 20px;
  }
  .feature-icons {
    padding-top: 20px;
  }
}
</style>
