<template>
  <div class="home text-center">
    <WelcomeHeader/>
    <div class="container main-black-color">
      <!-- New puffs -->
      <div class="row">
        <div class="col">
          <div>
            <input type="text" v-model="newPuffTitle" placeholder="Title">
            <input type="text" v-model="newPuffText" placeholder="New Puff">
            <button type="button" v-on:click="createNewPuff">Puff It!</button>
            <div>
              <p>Holi</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Feed -->
      <div class="row">
        <div class="col">
          <p>Feed</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WelcomeHeader from "@/components/WelcomeHeader.vue";
import createPuffService from "@/services/createPuffService.js";

import axios from 'axios'
export default {
  name: "logout",
  components: {
    WelcomeHeader
  },
  data: function(){
      return {
          newPuffTitle: '',
          newPuffText: '',
          newPuffImage: '',
          error: {}
      }
  },
  methods: {

        async createNewPuff(route) {
            var self = this;

            try {

                const response = await createPuffService.createPuff({
                    title: self.newPuffTitle,
                    content: self.newPuffText,
                    username: this.$store.state.user.username
                });

                // this.$store.dispatch("setToken", response.data.token);
                // this.$store.dispatch("setUser", response.data.user);
                // this.$router.push(route);


            } catch (error) {
                console.log(error);
                (this.show = true), (this.error = error.response.data.error);
            }

            //Wait for the response
            self.newPuffText  = '';
            self.newPuffTitle = '';
        }


  }
};
</script>

<style scoped>
.home {
  padding: 100px 20px 20px 20px;
}
  .main-black-color{
    color: #000;
  }
</style>
