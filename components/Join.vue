<template>
  <div>
    <p>{{ $store.state.draft.room.team }}</p>
    <input type="button" value="Team A" @click="changeTeamA()" />
    <input type="button" value="Team B" @click="changeTeamB()" />
    <input type="button" value="Spectator" @click="changeSpectator()" />
    <input type="button" value="Next" @click="nextRoom()" />
  </div>
</template>

<script>
export default {
  sockets: {},
  data() {
    return {};
  },
  methods: {
    changeTeamA() {
      this.$socket.emit("CHANGE_TEAM_A", this.$route.params.pin);
    },
    changeTeamB() {
      this.$socket.emit("CHANGE_TEAM_B", this.$route.params.pin);
    },
    changeSpectator() {
      this.$socket.emit("CHANGE_SPECTATOR", this.$route.params.pin);
    },
    nextRoom() {
      this.$socket.emit("NEXT_ROOM", this.$route.params.pin);
    }
  }
};
</script>

<style></style>
