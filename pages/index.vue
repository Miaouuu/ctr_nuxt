<template>
  <div class="container">
    <Language></Language>
    <div class="logs">
      <nuxt-link to="/login" v-if="!$auth.loggedIn">
        <button class="btnPin effect3D shadow">
          <p class="txtInput">{{ loginT }}</p>
        </button>
      </nuxt-link>
      <nuxt-link to="/register" v-if="!$auth.loggedIn">
        <button class="btnPin effect3D shadow">
          <p class="txtInput">{{ registerT }}</p>
        </button>
      </nuxt-link>
      <nuxt-link to="/profile" v-if="$auth.loggedIn">
        <button class="btnPin effect3D shadow">
          <p class="txtInput">{{ profileT }}</p>
        </button>
      </nuxt-link>
      <button
        v-if="$auth.loggedIn"
        class="btnPin effect3D shadow"
        type="button"
        @click="logOut"
      >
        <h2 class="txtInput">{{ logoutT }}</h2>
      </button>
      <!-- <p v-if="$auth.loggedIn" @click="logout">Logout</p> -->
    </div>

    <nuxt-link :to="'/' + pin">
      <button class="btnPin effect3D shadow" @click="toggleInvi">
        <p class="txtInput">{{ joinT }}</p>
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
      <h2 class="txtInput">{{ createT }}</h2>
    </button>
  </div>
</template>

<script>
import Language from "~/components/Language.vue";
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
  components: {
    Language
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
    logOut: async function() {
      await this.$axios.get("/v1/token/revoke");
      await this.$auth.logout();
    }
  },
  computed: {
    loginT() {
      return this.$t("index").login;
    },
    registerT() {
      return this.$t("index").register;
    },
    profileT() {
      return this.$t("index").profile;
    },
    logoutT() {
      return this.$t("index").logout;
    },
    joinT() {
      return this.$t("index").join;
    },
    createT() {
      return this.$t("index").create;
    }
  }
};
</script>

<style></style>
