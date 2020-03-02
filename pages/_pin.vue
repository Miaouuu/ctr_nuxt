<template>
  <div>
    <input
      type="text"
      placeholder="TEAM A"
      v-model="team1Name"
      :disabled="!admin"
      @input="teamName()"
    />
    <input
      type="text"
      placeholder="TEAM B"
      v-model="team2Name"
      :disabled="!admin"
      @input="teamName()"
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
    },
    RES_CHANGE_TEAM_NAME: function(ele) {
      this.team1Name = ele[0];
      this.team2Name = ele[1];
    }
  },
  data() {
    return {
      admin: false,
      team1Name: "",
      team2Name: ""
    };
  },
  methods: {
    teamName() {
      console.log("oui");
      this.$socket.emit("CHANGE_TEAM_NAME", {
        path: this.$route.params.pin,
        teamName: [this.team1Name, this.team2Name]
      });
    }
  },
  mounted() {
    this.$socket.emit("CHECK_ROOM", this.$route.params.pin);
  },
  beforeDestroy() {
    this.$socket.emit("DISCONNECT_ROOM");
  }
};
</script>

<style></style>
