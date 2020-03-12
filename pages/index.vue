<template>
  <div class="container">
    <button class="inputPin effect3D shadow">
      <nuxt-link :to="'/' + pin">JOIN</nuxt-link>
      <input type="text" v-model="pin" />
    </button>
    <button
      class="inputPin effect3D shadow"
      type="button"
      value="Create"
      @click="createRoom"
    />
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
      pin: ""
    };
  },
  methods: {
    createRoom: function() {
      this.$socket.emit("CREATE_ROOM", "oui");
    }
  }
};
</script>

<style></style>
