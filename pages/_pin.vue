<template>
  <div>
    <input
      type="text"
      placeholder="TEAM A"
      v-model="team1Name"
      :disabled="!admin"
    />
    <input
      type="text"
      placeholder="TEAM B"
      v-model="team2Name"
      :disabled="!admin"
    />
  </div>
</template>

<script>
export default {
  sockets: {
    RES_CHECK_ROOM: function(ele) {
      if (ele.exist) {
        this.admin = ele.isAdmin;
        this.$socket.emit("JOIN_ROOM", this.$route.params.pin);
      } else {
        this.$router.push("/");
      }
    }
  },
  data() {
    return {
      admin: false,
      team1Name: "",
      team2Name: ""
    };
  },
  mounted() {
    this.$socket.emit("CHECK_ROOM", this.$route.params.pin);
  }
};
</script>

<style></style>
