<template>
  <div>
    <Room v-if="state === 0" :admin="admin" />
    <Draft v-if="state === 1" />
  </div>
</template>

<script>
import Room from "~/components/Room.vue";
import Draft from "~/components/Draft.vue";
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
    RES_START_DRAFT: function(ele) {
      this.state = ele;
    }
  },
  components: {
    Room,
    Draft
  },
  data() {
    return {
      admin: false,
      state: 0
    };
  },
  mounted() {
    this.$socket.emit("CHECK_ROOM", this.$route.params.pin);
  },
  beforeDestroy() {
    this.$socket.emit("DISCONNECT_ROOM");
  }
};
</script>

<style>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin: 0 auto;
}
.card {
  border: 2px solid #3366cc;
  width: 200px;
  height: 150px;
  margin: 20px 20px 0 0;
}
</style>
