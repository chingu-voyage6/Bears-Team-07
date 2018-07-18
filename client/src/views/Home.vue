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
              <p>Holi2</p>
            </div>
          </div>
        </div>
      </div>
      <feed v-bind:puffs="userPuffs"></feed>
      <!-- Feed -->
      <div class="row">
        <div class="col">
          <p>Feed</p>
        </div>
      </div>
      <div class="row">

      </div>
    </div>
  </div>
</template>

<script>
import WelcomeHeader from "@/components/WelcomeHeader.vue";
import createPuffService from "@/services/createPuffService.js";
import readUserPuffs from "@/services/readPuffsService.js";
import Feed from "@/components/Feed.vue";

import axios from 'axios'
export default {
  name: "logout",
  components: {
    WelcomeHeader,
    Feed
  },
  data: function(){
      return {
          newPuffTitle: '',
          newPuffText: '',
          newPuffImage: '',
          userPuffs: [],
          puffsPage: 0,
          error: {}
      }
  },
  mounted: function(){
    this.readUserPuffs();
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

            } catch (error) {
                console.log(error);
                (this.show = true), (this.error = error.response.data.error);
            }

            //Wait for the response
            self.newPuffText  = '';
            self.newPuffTitle = '';
        },


        async readUserPuffs(){
          try {
            console.log('Reading the puffs of the user');
            console.log('-->');
            console.log('User: ', this.$store.getters.getUserId);
            const response = await readUserPuffs.readUserPuffs(this.$store.getters.getUserId);
            console.log(response.data);
            this.userPuffs = response.data.user.puffs;

          } catch (error) {
            console.log(error);
            (this.show = true), (this.error = error.response.data.error);
          }
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
