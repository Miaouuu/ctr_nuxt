<template>
  <div class="container">
    <h1>
      Tour : Team
      {{
        $store.state.draft.draft.turn
          ? $store.state.draft.draft.teamName[1]
          : $store.state.draft.draft.teamName[0]
      }}
    </h1>
    <div class="timer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="274px"
        height="178px"
      >
        <image
          x="0px"
          y="0px"
          width="274px"
          height="178px"
          xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAckAAAEpCAMAAADPpSnBAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAADAFBMVEX6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD6xgD///+3+0DdAAAA/nRSTlMAyf79/Pv6+ff49vX08/Lu7O3p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"
        />
      </svg>
      <h1 class="timerTxt">{{ timeLeft }}</h1>
    </div>

    <div class="draftContainer">
      <div class="draftContainerTop">
        <Search @update="maps = $event" />
      </div>
      <div class="wrapper">
        <div
          class="cardMapContainer"
          v-for="(map, index) in maps"
          :key="index"
          :style="styleButton(map)"
          @click="selected = map.id"
        >
          <img :src="require(`../assets/img/circuits/${map.src}.jpg`)" />
          <div class="banOverlayImg" v-if="map.banned">
            <img class="banIcon" src="../assets/img/banned-icon.png" />
          </div>
          <div
            class="mapName"
            :class="{
              picked: map.picked,
              active: map.id === selected,
              banned: map.banned
            }"
          >
            <h3>{{ map.title }}</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="bottomContainer">
      <div class="soundContainer"></div>
      <div class="banContainer">
        <div
          class="banOverlay"
          v-for="(item, index) in $store.state.draft.draft.draftMode.bans"
          :key="index"
        >
          <p>{{ index }}</p>
          <div class="banOverlayImg"></div>
        </div>
      </div>
      <!-- <div v-for="map in $store.state.map.maps" :key="map.id">
          <div v-if="map.banned" class="cardMapBan">
            <img
              @click="selected = map.id"
              :src="require(`../assets/img/circuits/${map.src}`)"
            />
          </div>
        </div> -->

      <button class="startLockBtn" @click="banOrPick()">
        {{ buttonBanOrPick() }}
      </button>
    </div>
  </div>
</template>

<script>
import Search from "~/components/Search.vue";
export default {
  sockets: {
    RES_START_TIMER: function(ele) {
      this.timeLeft = ele;
    },
    RES_NEXT_ROUND: function(ele) {
      if (ele.idMap !== -1) {
        this.$store.commit("map/selectMap", [ele.banOrPick, ele.idMap]);
      }
      this.$store.commit("draft/nextRound", [ele.round, ele.turn]);
    }
  },
  components: {
    Search
  },
  data() {
    return {
      timeLeft: 30,
      selected: -1,
      maps: []
    };
  },
  methods: {
    buttonBanOrPick() {
      if (
        this.$store.state.draft.draft.draftMode.bans >=
        this.$store.state.draft.draft.round
      ) {
        return "Ban";
      } else {
        return "Pick";
      }
    },
    banOrPick() {
      if (this.selected !== -1) {
        this.$socket.emit("SELECT_MAP", {
          path: this.$route.params.pin,
          id: this.selected
        });

        this.selected = -1;
      }
    },
    styleButton(map) {
      if (map.banned === true) {
        return "background-color:red";
      } else if (map.picked === true) {
        return "background-color:green";
      }
    }
  },
  mounted() {
    this.maps = this.$store.state.map.maps;
  }
};
</script>

<style></style>
