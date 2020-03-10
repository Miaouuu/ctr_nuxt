<template>
  <div>
    <Search @update="maps = $event" />
    <div class="wrapper">
      <div
        class="card"
        v-for="(map, index) in maps"
        :key="index"
        :style="styleButton(map)"
      >
        <img @click="selected = map.id" src="https://via.placeholder.com/150" />
        <p>{{ map.title }}</p>
        <p>{{ map.type }}</p>
      </div>
    </div>
    <h1>Timer</h1>
    <p>Temps avant la prochaine étape : {{ timeLeft }}</p>
    <button @click="lockOrPick()">Select</button>
  </div>
</template>

<script>
import Search from "~/components/Search.vue";
export default {
  sockets: {
    RES_START_TIMER: function(ele) {
      this.timeLeft = ele;
    },
    RES_NEXT_ROUND: function(ele) {
      if (ele[1] !== -1) {
        this.$store.commit("map/selectMap", ele);
      }
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
    },
    styleButton(map) {
      if (map.banned === true) {
        return "background-color:red";
      } else if (map.picked === true) {
        return "background-color:green";
      }
    }
  },
  mounted() {
    this.maps = this.$store.state.map.maps;
  }
};
</script>

<style></style>
