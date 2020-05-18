<template>
  <div class="container">
    <div class="logs">
      <a href="/login">
        <button class="btnPin effect3D shadow">
          <p class="txtInput">LOGIN</p>
        </button>
      </a>
      <a href="/register">
        <button class="btnPin effect3D shadow">
          <p class="txtInput">REGISTER</p>
        </button>
      </a>
      <button
        v-if="$auth.loggedIn"
        class="btnPin effect3D shadow"
        type="button"
        @click="logout"
      >
        <h2 class="txtInput">Logout</h2>
      </button>
      <!-- <p v-if="$auth.loggedIn" @click="logout">Logout</p> -->
    </div>

    <nuxt-link :to="'/' + pin">
      <button class="btnPin effect3D shadow" @click="toggleInvi">
        <p class="txtInput">JOIN</p>
        <input
          :class="{ invi: isActive }"
          class="inviNone"
          type="text"
          v-model="pin"
        />
      </button>
    </nuxt-link>
    <button
      class="btnPin effect3D shadow"
      type="button"
      value="Create"
      @click="createRoom"
    >
      <h2 class="txtInput">CREATE</h2>
    </button>
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
