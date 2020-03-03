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
    <h1>Draft maps</h1>
    <input type="text" v-model="search" />

    <p>{{ search }}</p>

    <div class="wrapper">
      <div class="card" v-for="(map, index) in mapsFilteredList" :key="index">
        <!-- <img :src="map.img" /> -->
        {{ map.title }}
      </div>
    </div>
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
      team2Name: "",
      search: "",
      maps: [
        {
          title: "Crash Cove",
          type: "CTR"
        },
        {
          title: "Mystery Caves",
          type: "CTR"
        },
        {
          title: "Sewer Speedway",
          type: "CTR"
        },
        {
          title: "Turbo Track/Retro Stadium",
          type: "CNK"
        },
        {
          title: "Coco Park",
          type: "CNK"
        },
        {
          title: "Tiger Temple",
          type: "CNK"
        },
        {
          title: "Polar Pass",
          type: "BONUS"
        },
        {
          title: "Tiny Arena",
          type: "BONUS"
        },
        {
          title: "Dragon Mines",
          type: "BONUS"
        }
      ]
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
  },
  computed: {
    mapsFilteredList() {
      return this.maps.filter(map => {
        return map.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    }
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
