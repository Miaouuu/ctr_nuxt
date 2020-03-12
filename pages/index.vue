<template>
  <div class="container">
    <button class="btnPin effect3D shadow">
      <nuxt-link  class="txtInput" :to="'/' + pin">JOIN</nuxt-link>
      <input class="invi" type="text" v-model="pin" />
    </button>
    <button
      class="btnPin effect3D shadow"
      type="button"
      value="Create"
      @click="createRoom"><h2 class="txtInput">CREATE</h2></button>
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
