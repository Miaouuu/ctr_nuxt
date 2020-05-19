<template>
  <div class="roomContainer">
    <Language></Language>
    <div class="pin">PIN : {{ this.$route.params.pin }}</div>
    <h1>{{ selectT }}</h1>
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
        >{{ afullT }}
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
        >{{ bfullT }}
      </label>
      <input
        class="teamJoinSelect shadowPermanent"
        :class="{
          active: $store.state.draft.room.team === 'SPECTATOR'
        }"
        type="button"
        :value="spectatorT"
        @click="changeSpectator()"
      />
      <input
        class="teamNext"
        type="button"
        :value="nextT"
        @click="nextRoom()"
      />
    </div>
  </div>
</template>

<script>
import Language from "~/components/Language.vue";
export default {
  sockets: {},
  props: {
    team: Array
  },
  data() {
    return {};
  },
  components: {
    Language
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
  },
  computed: {
    selectT() {
      return this.$t("join").select;
    },
    afullT() {
      return this.$t("join").afull;
    },
    bfullT() {
      return this.$t("join").bfull;
    },
    spectatorT() {
      return this.$t("join").spectator;
    },
    nextT() {
      return this.$t("join").next;
    }
  }
};
</script>

<style></style>
