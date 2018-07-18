<template>
  <div>
    <div v-if="userPuffs.length === 0" class="row">
      <div class="col-12">
          <p>Create a new Puff to visualize!</p>
      </div>
    </div>
    <div v-else class="row border border-warning">
      <div class="col-12 text-center border">
        <div v-for="(puffObject, key, index) in userPuffs">
          <div class="font-weight-bold">{{puffObject.title}}</div>
          <div>{{puffObject.content}}</div>
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
    console.log('The Feed component has been mounted')
  },
  data: function() {
    return {
      userPuffs: []
    }
  },
  methods: {
    loadPuffs: function(puffs) {
    console.log('There are new puffs');
    this.userPuffs = puffs;
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

</style>