<template>
  <div>
    <div>
      <input type="text" v-model="puff.title">&nbsp;
      <input type="text" v-model="puff.content">&nbsp;
      <button class="btn btn-custom" 
            @click="editPuff">
            Edit Puff
      </button>
    </div>
    <div v-if="userPuffs.length === 0" class="row">
      <div class="col-12">
          <p>Create a new Puff to visualize!</p>
      </div>
    </div>
    <div v-else class="row border border-warning">
      <div class="col-12 text-center border">
        <div class="feed-puff" v-for="(puffObject, key) in userPuffs" :key="puffObject.key">
          <div class="font-weight-bold">{{puffObject.title}}</div>
          <div>{{puffObject.content}}</div>
          <div v-if="puffObject.image">
            <img :src="frameUrl(puffObject.image)" width="100px"/>
          </div>
          <button class="btn btn-custom" 
            @click="showPuff(puffObject)">
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <button class="btn btn-custom" 
            @click="deletePuff">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
          <hr/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PuffService from "@/services/PuffService.js";

export default {
  name: "feed",
  props: ["puffs"],
  mounted: function() {
    console.log("The Feed component has been mounted");
  },
  data: function() {
    return {
      userPuffs: [],
      puff: {
        id: "",
        title: "",
        content: ""
      }
    };
  },
  methods: {
    loadPuffs: function(puffs) {
      this.userPuffs = puffs;
    },
    frameUrl(imageUrl) {
      if (imageUrl) {
        const url = imageUrl.replace(/\\/g, "/");
        return process.env.VUE_APP_BACKEND_API_URL + url;
      }
    },
    showPuff(puffObject) {
      let self = this;
      self.puff.id = puffObject._id;
      self.puff.title = puffObject.title;
      self.puff.content = puffObject.content;
    },
    async editPuff() {
      let self = this;
      try {
        await PuffService.editPuff(
          self.puff.id,
          {
            title: self.puff.title,
            content: self.puff.content
          },
          this.$store.getters.getUserToken
        );
      } catch (error) {
        (this.show = true), (this.error = error.response.data.error);
      }
    }
  },
  watch: {
    puffs(value) {
      this.loadPuffs(value);
    }
  }
};
</script>

<style scoped>
.feed-puff {
  padding: 5px;
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
