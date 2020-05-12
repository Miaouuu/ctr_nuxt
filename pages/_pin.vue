<template>
  <div>
    <Join v-if="state === 0" :team="team" />
    <Room v-if="state === 1" :admin="admin" />
    <Draft v-if="state === 2" />
    <Spectator v-if="state === 3" :endGame="endGame" />
  </div>
</template>

<script>
import Join from "~/components/Join.vue";
import Room from "~/components/Room.vue";
import Draft from "~/components/Draft.vue";
import Spectator from "~/components/Spectator.vue";
export default {
  sockets: {
    CHANGE_SOCKET_ID: function(ele) {
      localStorage.setItem("oldSocketId", localStorage.getItem("socketId"));
      localStorage.setItem("socketId", ele);
    },
    ADMIN_GAME: function(ele) {
      this.admin = true;
    },
    STATE_GAME: function(ele) {
      this.state = ele;
    },
    RES_CHECK_ROOM: function(ele) {
      if (ele.exist) {
        this.admin = ele.isAdmin;
        this.$socket.emit("JOIN_ROOM", [
          this.$route.params.pin,
          localStorage.getItem("socketId"),
          localStorage.getItem("oldSocketId")
        ]);
      } else {
        this.$router.push("/");
      }
    },
    RES_JOIN_ROOM: function(ele) {
      this.$store.commit("draft/changeDraftMode", ele[0]);
      this.$store.commit("draft/resetMap", ele[1]);
    },
    RES_CHANGE_TEAM: function(ele) {
      this.$store.commit("draft/changeTeam", ele);
    },
    RES_CHANGE: function(ele) {
      this.team = ele;
    },
    RES_NEXT_ROOM: function(ele) {
      this.state = ele;
    },
    RES_START_DRAFT: function(ele) {
      this.state = ele;
    },
    RES_END_GAME: function(ele) {
      this.state = ele;
      this.endGame = true;
    }
  },
  components: {
    Join,
    Room,
    Draft,
    Spectator
  },
  data() {
    return {
      admin: false,
      state: 0,
      endGame: false,
      team: []
    };
  },
  mounted() {
    this.$socket.emit("CHECK_ROOM", this.$route.params.pin);
    this.$axios.get("/v1/maps").then(data => {
      let newData = [];
      data.data.maps.map(ele => {
        ele.banned = false;
        ele.picked = false;
        newData.push(ele);
      });
      this.$store.commit("map/newMaps", newData);
    });
  },
  beforeDestroy() {
    this.$socket.emit("DISCONNECT_ROOM");
  }
};
</script>

<style></style>
