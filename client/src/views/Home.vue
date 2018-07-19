<template>
  <div class="home text-center">
    <div class="container main-black-color">
      <!-- New puffs -->
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
      <!-- Feed -->
      <feed v-bind:puffs="userPuffs"></feed>
    </div>
  </div>
</template>

<script>
import PuffService from "@/services/PuffService.js";
import Feed from "@/components/Feed.vue";

export default {
  name: "home",
  components: {
    Feed
  },
  data() {
    return {
      newPuffTitle: "",
      newPuffText: "",
      userPuffs: [],
      puffsPage: 0,
      error: null,
      show: false,
      selectedFile: null,
      fileName: null
    };
  },
  mounted: function() {
    this.readUserPuffs();
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.fileName = this.selectedFile.name;
    },
    async createNewPuff() {
      var self = this;
      if (self.selectedFile != null) {
        try {
          const fd = new FormData();
          fd.append("title", self.newPuffTitle);
          fd.append("content", self.newPuffText);
          fd.append("upload", self.selectedFile);
          fd.append("username", this.$store.state.user.username);
          await PuffService.createPuffWithImage(fd);
        } catch (error) {
          (this.show = true), (this.error = error.response.data.error);
        }
      } else {
        try {
          await PuffService.createPuff({
            title: self.newPuffTitle,
            content: self.newPuffText,
            username: this.$store.state.user.username
          });
        } catch (error) {
          (this.show = true), (this.error = error.response.data.error);
        }
      }
      //Wait for the response
      self.newPuffText = "";
      self.newPuffTitle = "";
      self.fileName = null;
      self.selectedFile = null;
    },
    async readUserPuffs() {
      try {
        const response = await PuffService.readUserPuffs(this.$store.getters.getUserId);
        this.userPuffs = response.data.user.puffs;
      } catch (error) {
        (this.show = true), (this.error = error.response.data.error);
      }
    }
  }
};
</script>
 
<style scoped>
.home {
  padding: 100px 20px 20px 20px;
  position: relative;
  width: 100%;
  min-height: 100vh;
}
.main-black-color {
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
