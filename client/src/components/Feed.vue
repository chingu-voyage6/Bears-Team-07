<template>
  <div>
    <div v-if="userPuffs.length === 0" class="row">
      <div class="col-12">
          <p>Create a new Puff to visualize!</p>
      </div>
    </div>
    <div v-else class="row border border-warning">
      <div class="col-12 text-center border">
        <div class="feed-puff" v-for="(puffObject, key, index) in userPuffs">
          <div class="font-weight-bold">{{puffObject.title}}</div>
          <div>{{puffObject.content}}</div>
          <div v-if="puffObject.image">
            <img :src="frameUrl(puffObject.image)" width="100px"/>
          </div>
          <hr/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "feed",
  props: ['puffs'],
  mounted: function() {
    console.log("The Feed component has been mounted");
  },
  data: function() {
    return {
      userPuffs: []
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
</style>
