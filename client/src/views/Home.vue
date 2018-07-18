<template>
  <div class="home text-center">
<<<<<<< HEAD
    <body>
      <p>Welcome to home page</p>
      <input
        style="display:none"
        type="file"
        @change="onFileSelected"
        ref="fileInput">
      <button class="btn btn-custom" 
        @click="$refs.fileInput.click()">
        Select File
      </button>
      <button class="btn btn-custom"
        @click="onUpload">
        Upload
      </button>
      <p>{{ fileName }}</p>
    </body>
=======
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
>>>>>>> development
  </div>
</template>

<script>
<<<<<<< HEAD
import PuffService from "@/services/PuffService.js";
=======
import WelcomeHeader from "@/components/WelcomeHeader.vue";
import createPuffService from "@/services/createPuffService.js";
import readUserPuffs from "@/services/readPuffsService.js";
import Feed from "@/components/Feed.vue";
>>>>>>> development

import axios from 'axios'
export default {
<<<<<<< HEAD
  name: "home",
  data() {
    return {
      selectedFile: null,
      fileName: null
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.fileName = this.selectedFile.name;
    },
    onUpload() {
      const fd = new FormData();
      fd.append("upload", this.selectedFile);
      fd.append("username", this.$store.state.user.username);
      //hardcoding title and content as Samuel Urias is working on this part
      fd.append("title", "test title");
      fd.append("content", "test content");
      PuffService.createPuffWithImage(fd);
    }
=======
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

>>>>>>> development
  }
};
</script>
 
<style scoped>
.home {
  padding: 100px 20px 20px 20px;
}
<<<<<<< HEAD
.btn.btn-custom {
  background-color: #b71c1c;
  color: #fff;
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
=======
  .main-black-color{
    color: #000;
  }
>>>>>>> development
</style>
