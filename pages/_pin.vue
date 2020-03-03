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
    <hr style="margin-top: 100px;" />
    <Search @update="maps = $event" />
    <div class="wrapper">
      <div class="card" v-for="(map, index) in maps" :key="index">
        <!-- <img :src="map.img" /> -->
        <p>{{ map.title }}</p>
        <p>{{ map.type }}</p>
      </div>
    </div>
    <hr style="margin-top: 50px;" />
    <h1>Timer</h1>
    <button @click="startDraft()">Start draft</button>
    <p>Temps avant la prochaine étape : {{ timeLeft }}</p>
  </div>
</template>

<script>
import Search from "~/components/Search.vue";
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
    },
    RES_START_DRAFT: function(ele) {
      this.timeLeft = ele;
    }
  },
  components: {
    Search
  },
  data() {
    return {
      admin: false,
      team1Name: "",
      team2Name: "",
      timeLeft: 0,
      maps: []
    };
  },
  methods: {
    teamName() {
      console.log("oui");
      this.$socket.emit("CHANGE_TEAM_NAME", {
        path: this.$route.params.pin,
        teamName: [this.team1Name, this.team2Name]
      });
    },
    startDraft() {
      this.$socket.emit("START_DRAFT", this.$route.params.pin);
    }
  },
  mounted() {
    this.$socket.emit("CHECK_ROOM", this.$route.params.pin);
    this.maps = this.$store.state.map.maps;
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
