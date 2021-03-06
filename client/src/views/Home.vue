<template>
  <div class="home text-center">
    <div class="container main-black-color">
      <!-- New puffs -->
      <form>
        <div class="form-row">
          <div class="col-md-4 col-sm-6 mb-3">
            <input type="text" class="form-control" v-model="puffTitle" placeholder="Title" required>
          </div>
          <div class="col-md-4 col-sm-6 mb-3">
            <input type="text" class="form-control" v-model="puffContent" placeholder="New Puff" required>
          </div>
          <div class="col-md-4 mb-3">
            <button class="form-control btn btn-custom" 
              @click.prevent="$refs.fileInput.click()">
              Select File
            </button>
          </div>
        </div>
        <input
          style="display:none"
          type="file"
          @change="onFileSelected"
          ref="fileInput">
        <button class="btn btn-custom"
          v-if="editMode && puffImage"
          @click.prevent="removeAttachment">
          Delete Attachment
        </button>
        <p>{{ fileName }}</p>
        <i class="fa fa-heart fa-lg" role="button"
          @click.prevent="updateFavs" aria-hidden="true"
          v-if="editMode" :class="{unfav: !favs}">
        </i>
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
        <button class="btn btn-custom"
          v-if="editMode" @click.prevent="cancelEdit">
          Cancel
        </button>
        <div v-if="show">
          <p class="error">
          <!-- <i class="fa fa-exclamation-circle" aria-hidden="true"></i> -->
          {{ errorMessage }}</p>
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
      favs: 0,
      puffAuthor: "",
      userPuffs: [],
      puffsPage: 0,
      // required by backend to delete the attachment in edit mode
      remove: 0,
      errorMessage: "",
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
        return process.env.VUE_APP_BACKEND_API_URL + "/" + url;
      }
    },
    removeAttachment() {
      if (this.puffImage) {
        this.puffImage = "";
        this.selectedFile = null;
        this.remove = 1;
      }
    },
    updateFavs() {
      if (this.$store.getters.getUserId === this.puffAuthor) {
        if (this.favs === 1) {
          this.favs = 0;
        } else if (this.favs === 0) {
          this.favs = 1;
        }
      } else {
        this.favs += 1;
      }
    },
    success(message) {
      this.successMessage = message;
      setTimeout(() => {
        this.successMessage = "";
      }, 4000);
    },
    error(message) {
      this.errorMessage = message;
      setTimeout(() => {
        this.errorMessage = "";
      }, 5000);
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
          (this.show = true), this.error(error.response.data.error);
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
          (this.show = true), this.error(error.response.data.error);
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
      this.puffAuthor = puffObject.author;
      if (puffObject.favs > 0) {
        this.favs = puffObject.favs;
      } else {
        this.favs = 0;
      }
    },
    async editPuff() {
      let self = this;
      if (self.selectedFile != null) {
        try {
          const fd = new FormData();
          fd.append("title", self.puffTitle);
          fd.append("content", self.puffContent);
          fd.append("upload", self.selectedFile);
          if (self.favs) {
            fd.append("favs", self.favs);
          }
          await PuffService.updatePuffWithImage(
            self.puffId,
            fd,
            this.$store.getters.getUserToken
          );
          this.success("Puff updated successfully.");
        } catch (error) {
          (this.show = true), this.error(error.response.data.error);
        }
      } else {
        let updateObj = {
          title: self.puffTitle,
          content: self.puffContent
        };
        if (self.favs > 0) {
          updateObj.favs = self.favs;
        }
        if (self.remove) {
          updateObj.remove = self.remove;
        }
        try {
          await PuffService.updatePuff(
            self.puffId,
            updateObj,
            this.$store.getters.getUserToken
          );
          this.success("Puff updated successfully.");
        } catch (error) {
          (this.show = true), this.error(error.response.data.error);
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
    cancelEdit() {
      let self = this;
      self.editMode = false;
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
        (this.show = true), this.error(error.response.data.error);
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
        (this.show = true), this.error(error.response.data.error);
      }
    },
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
@media (max-width: 768px) {
  .home {
    padding: 130px 10px 10px 10px;
  }
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
  color: red;
}
.alert {
  margin-top: 10px;
}
.feed-view {
  margin-top: 20px;
  margin-bottom: 40px;
}
.fa-heart {
  padding: 0 10px 10px 0;
  color: #ff0000;
}
.unfav {
  color: #c3c3c3;
}
.fa-heart:hover {
  color: #d50000;
  cursor: pointer;
}
.fav-text {
  font-family: "Roboto";
  color: #000;
  font-size: 14px;
  padding: 0 10px 0 5px;
}
</style>
