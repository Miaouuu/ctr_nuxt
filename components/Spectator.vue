<template>
  <div>
    <p>Mode Spectateur</p>
    <p>{{ timeLeft }}</p>
  </div>
</template>

<script>
export default {
  sockets: {
    RES_START_TIMER: function(ele) {
      this.timeLeft = ele;
    },
    RES_NEXT_ROUND: function(ele) {
      if (ele.idMap !== -1) {
        this.$store.commit("map/selectMap", [ele.banOrPick, ele.idMap]);
      }
      this.$store.commit("draft/nextRound", [ele.round, ele.turn, ele.maps]);
    }
  },
  data() {
    return {
      timeLeft: 30
    };
  },
  methods: {}
};
</script>

<style></style>
