<template>
  <div>
    <WelcomeHeader/>
    <div class="welcome container-fluid text-center">
      <h1 class="catchyPhrase">Visualize your life's events and milestones with Dear Diiary!</h1>
      <h4>Remember who you were and who you are, by collecting and cherishing personal & private moments.</h4>
       <div class="row feature-icons">
          <div class="col-sm-12 col-md-6 col-lg-3">
                <i class="fa fa-quote-left fa-5x"></i>              
              <h3>Finding it difficult to express your emotions?</h3>
              <p class="lead mb-0"> Make a record of a famous quote that might 
              express exactly what you are feeling.
              </p>           
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3">          
                <i class="fa fa-file-text fa-5x"></i>              
              <h3>Can't imagine a life without writing?</h3>
              <p class="lead mb-0">Write your heart out as it is the best way to communicate with yourself.</p>           
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3">            
                <i class="fa fa-file-image-o fa-5x"></i>             
              <h3>An image is worth a thousand words!</h3>
              <p class="lead mb-0">Images have the superpower to transport you to a different time and place. 
              Capture and re-live!</p>            
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3">            
                <i class="fa fa-star fa-5x"></i>              
              <h3>Memories are powerful.</h3>
              <p class="lead mb-0">Preserve them as "Milestones", so that you get in touch 
              with someone so near, yet so far - yourself.</p>            
          </div>
        </div>
    </div>
  </div>  
</template>

<script>
// @ is an alias to /src
import WelcomeHeader from "@/components/WelcomeHeader.vue";

export default {
  components: {
    WelcomeHeader
  }
};
</script>

<style scoped>
.welcome {
  padding: 100px 20px 20px 20px;
  background-color: #ebf5fb;
  position: relative;
  width: 100%;
  min-height: 700px;
  height: auto;
  background-color: transparent;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)),
    url("../assets/landing.jpg") no-repeat center top;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -ms-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-attachment: fixed;
  overflow: hidden;
}
.catchyPhrase {
  padding-top: 20px;
  padding-bottom: 30px;
}
.feature-icons {
  padding-top: 25px;
}
.feature-icons i {
  padding-bottom: 15px;
  color: #fff;
}
</style>
