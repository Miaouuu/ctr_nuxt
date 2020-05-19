<template>
  <div class="container">
    <Language></Language>
    <div class="specHeader">
      <div class="teamName">
        <p>{{ $store.state.draft.draft.teamName[0] }}</p>
      </div>
      <div class="teamName">
        <p>{{ $store.state.draft.draft.teamName[1] }}</p>
      </div>
    </div>
    <div class="timer">
      <svg height="40px">
        <polygon fill="#FAC600" points="257.5,36.5 42.5,36.5 22.5,0 277.5,0 " />
      </svg>
      <h1 class="timerTxt">{{ timeLeft }}</h1>
    </div>
    <div class="specContainer">
      <div class="specCategoryName">
        <p>{{ pickedT }}</p>
      </div>
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

      <div class="specCategoryName">
        <p>{{ bannedT }}</p>
      </div>
      <div class="bottomContainer spec">
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
    <div class="sound">
      <range-slider class="slider" min="0" max="100" step="1" v-model="volume">
      </range-slider>
      <p>Volume : {{ volume }}%</p>
    </div>
    <div v-if="this.$auth.loggedIn && this.endGame">
      <p @click="saveDraft()">{{ saveT }}</p>
    </div>
  </div>
</template>

<script>
import RangeSlider from "vue-range-slider";
import Language from "~/components/Language.vue";
import "vue-range-slider/dist/vue-range-slider.css";

export default {
  beforeDestroy() {
    this.$shutdownSoundSystem();
  },
  mounted() {
    if (this.endGame) this.$playMusic("end");
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
  components: {
    RangeSlider,
    Language
  },
  data() {
    return {
      timeLeft: 30,
      volume: 50
    };
  },
  props: {
    endGame: Boolean
  },
  watch: {
    volume: function(newVol, oldVol) {
      this.$updateVolume(newVol)
    }
  },
  methods: {
    saveDraft() {
      let typeDraft;
      switch (this.$store.state.draft.draft.draftMode.name) {
        case "Classic":
          typeDraft = "CLASSIC_6_BANS_10_PICKS";
          break;
        case "Light":
          typeDraft = "LIGHT_4_BANS_6_PICKS";
          break;
        case "League":
          typeDraft = "LEAGUE_6_BANS_8_PICKS";
          break;
        case "No":
          typeDraft = "NO_BANS_0_BANS_10_PICKS";
          break;
      }
      this.$axios.post("/v1/draft/save", {
        teama: this.$store.state.draft.draft.teamName[0],
        teamb: this.$store.state.draft.draft.teamName[1],
        gamemode_type: typeDraft,
        bans: this.$store.state.draft.draft.maps.banned,
        picks: this.$store.state.draft.draft.maps.picked,
        client_name: "ctr-api"
      });
    }
  },
  computed: {
    pickedT() {
      return this.$t("spectator").picked;
    },
    bannedT() {
      return this.$t("spectator").banned;
    },
    saveT() {
      return this.$t("spectator").save;
    }
  }
};
</script>

<style></style>
