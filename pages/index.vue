<template>
  <div class="container">
    <div>
      <nuxt-link v-if="!$auth.loggedIn" to="/login">Login</nuxt-link>
      <nuxt-link v-if="!$auth.loggedIn" to="/register">Register</nuxt-link>
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
    RES_CONN: function(ele) {
      if (process.browser) {
        localStorage.setItem("socketId", ele);
      }
    },
    RES_CREATE_ROOM: function(ele) {
      this.$router.push("/" + ele.pin);
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
