<template>
  <div class="home text-center">
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
  </div>
</template>

<script>
import PuffService from "@/services/PuffService.js";

export default {
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
      var response = PuffService.createPuffWithImage(fd);
    }
  }
};
</script>
 
<style scoped>
.home {
  padding: 100px 20px 20px 20px;
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
</style>
