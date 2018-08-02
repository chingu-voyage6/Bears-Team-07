<template>
  <div>
    <div v-if="userPuffs.length === 0" class="row">
      <div class="col-12">
          <p>Create a new Puff to visualize!</p>
      </div>
    </div>
    <div v-else class="row border border-warning">
      <div class="col-12 text-center border">
        <div class="feed-puff" v-for="(puffObject) in userPuffs" :key="puffObject.key">
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
            @click="deletePuff(puffObject._id)">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>    
          <i class="fa fa-heart fa-lg" role="button"
            @click="showPuff(puffObject)" aria-hidden="true">
          </i>
          <hr/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      this.$emit("editPuff", puffObject);
    },
    deletePuff(puffId) {
      this.$emit("deletePuff", puffId);
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
.fa-heart {
  padding-top: 10px;
  color: red;
}
.fa-heart:hover {
  color: #d50000;
  cursor: pointer;
}
</style>
