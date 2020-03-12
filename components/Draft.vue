<template>
  <div>
    <div>
      <h1>MAPS DRAFT</h1>
      <h2 style="color:white">Timer :</h2>
      <p style="color:white">Temps avant la prochaine étape : {{ timeLeft }}</p>

      <div class="container draftContainer">
        <div class="draftContainerTop">
          <Search @update="maps = $event" />
        </div>
        <div class="wrapper">
          <div
            class="card"
            v-for="(map, index) in maps"
            :key="index"
            :style="styleButton(map)"
          >
            <img
              @click="selected = map.id"
              :src="require(`../assets/img/circuits/${map.src}`)"
              style="height:100px"
            />
            <p>{{ map.title }}</p>
            <p>{{ map.type }}</p>
          </div>
        </div>
      </div>
      
    </div>

    <button
      @click="lockOrPick()"
      style="height: 50px; width: 200px; margin-left:calc(50% - 150px)"
    >
      Select
    </button>
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
