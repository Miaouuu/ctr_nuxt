<template>
  <div></div>
</template>

<script>
export default {
  sockets: {
    RES_CHECK_ROOM: function(ele) {
      if (ele) {
        this.$socket.emit("JOIN_ROOM", this.$route.params.pin);
      } else {
        this.$router.push("/");
      }
    }
  },
  mounted() {
    this.$socket.emit("CHECK_ROOM", this.$route.params.pin);
  }
};
</script>

<style></style>
