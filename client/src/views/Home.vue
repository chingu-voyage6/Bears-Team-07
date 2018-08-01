<template>
  <div class="home text-center">
    <div class="container main-black-color">
      <!-- New puffs -->
          <form>
            <input type="text" v-model="puffTitle" placeholder="Title" required>
            <input type="text" v-model="puffContent" placeholder="New Puff" required>
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
            <div v-if="puffImage">
              <img :src="frameUrl(puffImage)" width="100px"/>
            </div>
            <button class="btn btn-custom"
              v-if="!editMode"
              @click.prevent="createNewPuff">
              Puff It!
            </button>
            <button class="btn btn-custom"
              v-if="editMode"
              @click.prevent="editPuff">
              Update Puff
            </button>
            <div v-if="show">
              <p class="error">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
              {{ error }}</p>
            </div>
            <div v-if="successMessage" class="alert alert-success">
              {{ successMessage }}
            </div>
          </form>
      <!-- Feed -->
      <feed class="feed-view" 
        :puffs="userPuffs" 
        @editPuff="showPuff($event)"
        @deletePuff="deletePuff($event)">
      </feed>
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
      puffId: "",
      puffTitle: "",
      puffContent: "",
      puffImage: "",
      favs:0,
      userPuffs: [],
      puffsPage: 0,
      error: null,
      show: false,
      selectedFile: null,
      fileName: null,
      editMode: false,
      successMessage: ""
    };
  },
  mounted: function() {
    this.loadInformationFromLocalStorage();
    this.readUserPuffs();
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.fileName = this.selectedFile.name;
    },
    frameUrl(imageUrl) {
      if (imageUrl) {
        const url = imageUrl.replace(/\\/g, "/");
        return process.env.VUE_APP_BACKEND_API_URL + url;
      }
    },
    success(message) {
      this.successMessage = message;
      setTimeout(() => {
        this.successMessage = "";
      }, 4000);
    },
    async createNewPuff() {
      let self = this;
      if (self.selectedFile != null) {
        try {
          const fd = new FormData();
          fd.append("title", self.puffTitle);
          fd.append("content", self.puffContent);
          fd.append("upload", self.selectedFile);
          fd.append("username", this.$store.state.user.username);
          await PuffService.createPuffWithImage(
            fd,
            this.$store.getters.getUserToken
          );
          this.success("Puff created successfully.");
        } catch (error) {
          (this.show = true), (this.error = error.response.data);
        }
      } else {
        try {
          await PuffService.createPuff(
            {
              title: self.puffTitle,
              content: self.puffContent,
              username: this.$store.state.user.username
            },
            this.$store.getters.getUserToken
          );
          this.success("Puff created successfully.");
        } catch (error) {
          (this.show = true), (this.error = error.response.data);
        }
      }
      // Reloads feed section
      this.readUserPuffs();
      //Wait for the response
      self.puffContent = "";
      self.puffTitle = "";
      self.fileName = null;
      self.selectedFile = null;
    },
    showPuff(puffObject) {
      this.editMode = true;
      this.puffId = puffObject._id;
      this.puffTitle = puffObject.title;
      this.puffContent = puffObject.content;
      this.puffImage = puffObject.image;
      if (puffObject.meta.favs) {
        this.favs = puffObject.meta.favs;
      } else {
        this.favs = 0;
      }
    },
    async editPuff() {
      let self = this;
		  let meta = {
        favs: self.favs
      };
      if (self.selectedFile != null) {
        try {
          const fd = new FormData();
          fd.append("title", self.puffTitle);
          fd.append("content", self.puffContent);
          fd.append("upload", self.selectedFile);
          if (self.favs > 0) {
            fd.append("meta", meta);
          }
          console.log(fd);
          await PuffService.updatePuffWithImage(
            self.puffId,
            fd,
            this.$store.getters.getUserToken
          );
          this.success("Puff updated successfully.");
        } catch (error) {
          (this.show = true), (this.error = error.response.data);
        }
      } else {
        let updateObj = {
          title: self.puffTitle,
          content: self.puffContent
        };
        if (self.favs > 0) {
          updateObj.meta = meta;
        }
        console.log(updateObj);
        try {
          await PuffService.updatePuff(
            self.puffId,
            updateObj,
            this.$store.getters.getUserToken
          );
          this.success("Puff updated successfully.");
        } catch (error) {
          (this.show = true), (this.error = error.response.data);
        }
      }
      // Reloads feed section
      this.readUserPuffs();
      //Wait for the response
      self.puffTitle = "";
      self.puffContent = "";
      self.fileName = null;
      self.selectedFile = null;
      self.editMode = false;
      self.puffImage = "";
    },
    async deletePuff(puffId) {
      try {
        let confirmDelete = confirm(
          "Are you sure you want to delete this puff?"
        );
        if (confirmDelete) {
          await PuffService.deletePuff(
            puffId,
            this.$store.getters.getUserToken
          );
          this.success("Puff deleted successfully.");
        }
      } catch (error) {
        (this.show = true), (this.error = error.response.data);
      }
      // Refreshes the feed content
      this.readUserPuffs();
    },
    async readUserPuffs() {
      try {
        const response = await PuffService.readUserPuffs(
          this.$store.getters.getUserId,
          this.$store.getters.getUserToken
        );
        this.userPuffs = response.data.user.puffs;
      } catch (error) {
        (this.show = true), (this.error = error.response.data);
      }
    },
    loadInformationFromLocalStorage: function() {
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
input {
  margin: 0 10px 0 0;
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
.alert {
  margin-top: 10px;
}
.feed-view {
  margin-top: 20px;
}
</style>
