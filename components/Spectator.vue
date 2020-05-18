<template>
  <div class="container">
    <div class="specHeader">
      <div class="teamName">
        <p>{{ $store.state.draft.draft.teamName[0] }}</p>
      </div>
      <div class="teamName">
        <p>{{ $store.state.draft.draft.teamName[1] }}</p>
      </div>
    </div>
    <div class="timer">
      <svg>
        <polygon points="0 0 18 36.5 230 36.5 255 0 0 0" fill="#FAC600" />
      </svg>
      <h1 class="timerTxt">{{ timeLeft }}</h1>
    </div>
    <div class="specContainer">
      <div class="specCategoryName"><p>PICKED</p></div>
      <div class="topContainer">
        <client-only>
          <carousel
            class="pickContainer spec"
            :loop="false"
            :nav="false"
            :dots="false"
            :margin="0"
            :autoWidth="true"
          >
            <div
              class="borderPick"
              v-for="(item, index) in $store.state.draft.draft.draftMode.picks"
              :key="index"
              :class="{
                red:
                  index == 0 ||
                  index == 3 ||
                  index == 4 ||
                  index == 7 ||
                  index == 8,
                blue:
                  index == 1 ||
                  index == 2 ||
                  index == 5 ||
                  index == 6 ||
                  index == 9
              }"
            >
              <div class="corner">
                <div
                  class="cornerImage"
                  v-if="
                    index == 0 ||
                      index == 3 ||
                      index == 4 ||
                      index == 7 ||
                      index == 8
                  "
                >
                  <img src="../assets/img/corner-red.png" />
                </div>
                <div class="cornerImage" v-else>
                  <img src="../assets/img/corner-blue.png" />
                </div>
                <div class="cornerNumber spectator">{{ index + 1 }}</div>
              </div>
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
                <h4>
                  {{
                    $store.state.map.maps[
                      $store.state.draft.draft.maps.picked[index] - 1
                    ].title
                  }}
                </h4>
              </div>
            </div>
          </carousel>
        </client-only>
      </div>

      <div class="specCategoryName"><p>BANNED</p></div>
      <div class="bottomContainer">
        <client-only>
          <carousel
            class="banContainer"
            :loop="false"
            :nav="false"
            :dots="false"
            :margin="0"
            :autoWidth="true"
          >
            <div
              class="banOverlay borderBan"
              v-for="(item, index) in $store.state.draft.draft.draftMode.bans"
              :key="index"
              :class="{
                red: index == 0 || index == 2 || index == 4,
                blue: index == 1 || index == 3 || index == 5
              }"
            >
              <div class="corner">
                <div
                  class="cornerImage"
                  v-if="index == 0 || index == 2 || index == 4"
                >
                  <img src="../assets/img/corner-red.png" />
                </div>
                <div class="cornerImage" v-else>
                  <img src="../assets/img/corner-blue.png" />
                </div>
                <div class="cornerNumber">{{ index + 1 }}</div>
              </div>
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
          </carousel>
        </client-only>
      </div>
    </div>
    <div v-if="this.$auth.loggedIn && this.endGame">
      <p>Save</p>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    if(this.endGame)
      this.$playMusic('end')
  },
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
