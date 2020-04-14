<template>
  <div>
    <Join v-if="state === 0" />
    <Room v-if="state === 1" :admin="admin" />
    <Draft v-if="state === 2" />
    <Spectator v-if="state === 3" />
  </div>
</template>

<script>
import Join from "~/components/Join.vue";
import Room from "~/components/Room.vue";
import Draft from "~/components/Draft.vue";
import Spectator from "~/components/Spectator.vue";
export default {
  sockets: {
    RES_CHECK_ROOM: function(ele) {
      if (ele.exist) {
        this.admin = ele.isAdmin;
        this.$socket.emit("JOIN_ROOM", this.$route.params.pin);
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
    RES_NEXT_ROOM: function(ele) {
      this.state = ele;
    },
    RES_START_DRAFT: function(ele) {
      this.state = ele;
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
      state: 0
    };
  },
  mounted() {
    this.$socket.emit("CHECK_ROOM", this.$route.params.pin);
    fetch("https://ctr-api.herokuapp.com/api/v1/maps", {
      method: "get"
    })
      .then(data => data.json())
      .then(data => {
        let newData = [];
        data.maps.map(ele => {
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
