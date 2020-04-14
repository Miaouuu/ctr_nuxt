<template>
  <div class="roomContainer">
    <h1>SELECT YOUR TEAM</h1>
    <p>{{ $store.state.draft.room.team }}</p>
    <div class="roomInputContainer">
      <input
        class="teamJoinSelect shadowPermanent"
        type="button"
        value="Team A"
        @click="changeTeamA()"
      />
      <input
        class="teamJoinSelect shadowPermanent"
        type="button"
        value="Team B"
        @click="changeTeamB()"
      />
      <input
        class="teamJoinSelect shadowPermanent"
        type="button"
        value="Spectator"
        @click="changeSpectator()"
      />
      <input class="teamNext" type="button" value="Next" @click="nextRoom()" />
    </div>
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
