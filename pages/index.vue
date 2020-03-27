<template>
  <div class="container">
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
    }
  }
};
</script>

<style></style>
