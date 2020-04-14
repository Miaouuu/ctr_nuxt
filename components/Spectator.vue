<template>
  <div>
    <p>Mode Spectateur</p>
    <p>{{ timeLeft }}</p>
    <p>{{ endGame }}</p>
    <div class="topContainer">
      <div class="pickContainer">
        <div
          class="borderPick"
          v-for="(item, index) in $store.state.draft.draft.draftMode.picks"
          :key="index"
        >
          <div
            class="pickee"
            v-if="$store.state.draft.draft.maps.picked[index]"
          >
            <img
              v-if="$store.state.draft.draft.maps.picked[index] != -1"
              :src="
                require(`../assets/img/circuits/${
                  $store.state.map.maps[
                    $store.state.draft.draft.maps.picked[index] - 1
                  ].src
                }.jpg`)
              "
            />
          </div>
          <div
            class="mapName"
            v-if="
              $store.state.map.maps[
                $store.state.draft.draft.maps.picked[index] - 1
              ]
            "
          >
            <h5>
              {{
                $store.state.map.maps[
                  $store.state.draft.draft.maps.picked[index] - 1
                ].title
              }}
            </h5>
          </div>
        </div>
      </div>
    </div>

    <div class="bottomContainer">
      <div class="banContainer">
        <div
          class="banOverlay borderBan"
          v-for="(item, index) in $store.state.draft.draft.draftMode.bans"
          :key="index"
        >
          <div
            v-if="$store.state.draft.draft.maps.banned[index]"
            class="sizeDiv"
          >
            <img
              v-if="$store.state.draft.draft.maps.banned[index] != -1"
              :src="
                require(`../assets/img/circuits/${
                  $store.state.map.maps[
                    $store.state.draft.draft.maps.banned[index] - 1
                  ].src
                }.jpg`)
              "
            />
            <div class="banOverlayImg">
              <img class="banIcon" src="../assets/img/banned-icon.png" />
            </div>
          </div>
          <div
            class="mapName"
            v-if="
              $store.state.map.maps[
                $store.state.draft.draft.maps.banned[index] - 1
              ]
            "
          >
            <h5>
              {{
                $store.state.map.maps[
                  $store.state.draft.draft.maps.banned[index] - 1
                ].title
              }}
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  sockets: {
    RES_START_TIMER: function(ele) {
      this.timeLeft = ele;
    },
    RES_NEXT_ROUND: function(ele) {
      if (ele.idMap !== -1) {
        this.$store.commit("map/selectMap", [ele.banOrPick, ele.idMap]);
      }
      this.$store.commit("draft/nextRound", [ele.round, ele.turn, ele.maps]);
    }
  },
  data() {
    return {
      timeLeft: 30
    };
  },
  props: {
    endGame: Boolean
  },
  methods: {}
};
</script>

<style></style>
