<template>
  <div>
    <Search @update="maps = $event" />
    <div class="wrapper">
      <div
        class="card"
        v-for="(map, index) in maps"
        :key="index"
        @click="selected = map.id"
      >
        <!-- <img :src="map.img" /> -->
        <p>{{ map.title }}</p>
        <p>{{ map.type }}</p>
      </div>
    </div>
    <h1>Timer</h1>
    <p>Temps avant la prochaine étape : {{ timeLeft }}</p>
    <h2 @click="lockOrPick()">Select</h2>
  </div>
</template>

<script>
import Search from "~/components/Search.vue";
export default {
  sockets: {
    RES_START_TIMER: function(ele) {
      this.timeLeft = ele;
    }
  },
  components: {
    Search
  },
  data() {
    return {
      timeLeft: 0,
      selected: -1,
      maps: []
    };
  },
  methods: {
    lockOrPick() {
      if (this.selected !== -1) {
        this.$socket.emit("SELECT_MAP", {
          path: this.$route.params.pin,
          id: this.selected
        });
        this.selected = -1;
      }
    }
  },
  mounted() {
    this.maps = this.$store.state.map.maps;
  }
};
</script>

<style></style>
