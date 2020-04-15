<template>
  <div class="roomContainer">
    <h1>SELECT YOUR TEAM</h1>
    <!-- <p>{{ $store.state.draft.room.team }}</p>
    <p>Team pleines : {{ team }}</p> -->
    <div class="roomInputContainer">
      <input
        class="teamJoinSelect shadowPermanent"
        :class="{
          active: $store.state.draft.room.team === 'TEAM A',
          full: team[0] === true && $store.state.draft.room.team !== 'TEAM A'
        }"
        type="button"
        value="Team A"
        @click="changeTeamA()"
      />
      <label
        v-if="team[0] === true && $store.state.draft.room.team !== 'TEAM A'"
        >L'équipe A est pleine !
      </label>
      <input
        class="teamJoinSelect shadowPermanent"
        :class="{
          active: $store.state.draft.room.team === 'TEAM B',
          full: team[1] === true && $store.state.draft.room.team !== 'TEAM B'
        }"
        type="button"
        value="Team B"
        @click="changeTeamB()"
      />
      <label
        v-if="team[1] === true && $store.state.draft.room.team !== 'TEAM B'"
        >L'équipe B est pleine !
      </label>
      <input
        class="teamJoinSelect shadowPermanent"
        :class="{
          active: $store.state.draft.room.team === 'SPECTATOR'
        }"
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
  props: {
    team: Array
  },
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
