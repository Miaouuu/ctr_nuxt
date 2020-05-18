<template>
  <div class="container">
    <div>
      <button class="btnPinLogs effect3D shadow">
        <nuxt-link v-if="!$auth.loggedIn" class="txtInput" to="/login">LOGIN</nuxt-link>
      </button>
      <button class="btnPinLogs effect3D shadow">
      <nuxt-link v-if="!$auth.loggedIn" class="txtInput" to="/register">REGISTER</nuxt-link>
      </button>
      <p v-if="$auth.loggedIn" @click="logout">Logout</p>
    </div>
    <button class="btnPin effect3D shadow" @click="toggleInvi">
      <nuxt-link class="txtInput" :to="'/' + pin">JOIN</nuxt-link>
      <input
        :class="{ invi: isActive }"
        class="inviNone"
        type="text"
        v-model="pin"
      />
    </button>
    <button
      class="btnPin effect3D shadow"
      type="button"
      value="Create"
      @click="createRoom"
    >
      <h2 class="txtInput">CREATE</h2>
    </button>
    <!-- <input type="button" value="Create" @click="createRoom" />
    <input class="inputPin effect3D shadow" type="text" v-model="pin" />
    <nuxt-link :to="'/' + pin">Join</nuxt-link> -->
  </div>
</template>

<script>
export default {
  sockets: {
    RES_CREATE_ROOM: function(ele) {
      this.$router.push("/" + ele.pin);
    },
    CHANGE_SOCKET_ID: function(ele) {
      localStorage.setItem("oldSocketId", localStorage.getItem("socketId"));
      localStorage.setItem("socketId", ele);
    }
  },
  data() {
    return {
      pin: "",
      isActive: false
    };
  },
  methods: {
    createRoom: function() {
      this.$socket.emit("CREATE_ROOM", "oui");
    },
    toggleInvi: function() {
      this.isActive = true;
    },
    logout: async function() {
      await this.$axios.get("/v1/token/revoke");
      await this.$auth.logout();
    }
  }
};
</script>

<style></style>
