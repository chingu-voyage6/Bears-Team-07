<template>
  <div class="home text-center">
    <div class="container main-black-color">
      <!-- New puffs -->
      <div class="row">
        <div class="col">
          <div>
            <input type="text" v-model="newPuffTitle" placeholder="Title">
            <input type="text" v-model="newPuffText" placeholder="New Puff">
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
              @click="createNewPuffWithImage">
              Upload
            </button>
            <p>{{ fileName }}</p>
            <button class="btn btn-custom" 
              @click="createNewPuff">
              Puff It!
            </button>
            <div v-if="show">
              <p class="error">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
              {{ error }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Feed -->
      <feed v-bind:puffs="userPuffs"></feed>
    </div>
  </div>
</template>

<script>
import PuffService from "@/services/PuffService.js";
import Feed from "@/components/Feed.vue";

import axios from 'axios'
export default {
  name: "home",
  components: {
    Feed
  },
  data() {
    return {
      newPuffTitle: '',
      newPuffText: '',
      userPuffs: [],
      puffsPage: 0,
      error: null,
      show: false,
      selectedFile: null,
      fileName: null
    };
  },
  mounted: function(){
    this.readUserPuffs();
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.fileName = this.selectedFile.name;
    },
    async createNewPuffWithImage() {
      var self = this;
      try {
        const fd = new FormData();
        fd.append("title", self.newPuffTitle);
        fd.append("content", self.newPuffText);
        fd.append("upload", this.selectedFile);
        fd.append("username", this.$store.state.user.username);
        await PuffService.createPuffWithImage(fd);
      } catch (error) {
        (this.show = true), (this.error = error.response.data.error);
      }
    },
    async createNewPuff() {
      var self = this;
      try {
        await PuffService.createPuff({
          title: self.newPuffTitle,
          content: self.newPuffText,
          username: this.$store.state.user.username
        });
      } catch (error) {
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
        const response = await PuffService.readUserPuffs(this.$store.getters.getUserId);
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
.error {
  font-size: 14px;
  letter-spacing: 1px;
  padding-bottom: 5px;
}
</style>
