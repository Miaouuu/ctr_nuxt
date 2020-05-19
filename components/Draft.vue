<template>
  <div class="container">
    <Language></Language>
    <div class="topContainer">
      <client-only>
        <!-- :responsive="{
              0: { items: 1 },
              600: { items: 3 },
              1000: {items: 6}
            }" -->
        <carousel
          class="pickContainer"
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
              blue:
                index == 0 ||
                index == 3 ||
                index == 4 ||
                index == 7 ||
                index == 8,
              red:
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
                <img src="../assets/img/corner-blue.png" />
              </div>
              <div class="cornerImage" v-else>
                <img src="../assets/img/corner-red.png" />
              </div>
              <div class="cornerNumber">{{ index + 1 }}</div>
            </div>
            <div
              class="ifPick"
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
        </carousel>
      </client-only>
    </div>

    <div class="timer">
      <svg v-if="$store.state.draft.room.team === 'TEAM A'" height="40px">
        <polygon fill="#3867d8" points="257.5,36.5 42.5,36.5 22.5,0 277.5,0 " />
      </svg>
      <svg v-else height="40px">
        <polygon fill="#d63031" points="257.5,36.5 42.5,36.5 22.5,0 277.5,0 " />
      </svg>
      <h1 class="timerTxt">
        {{ timeLeft }}
      </h1>
    </div>

    <div class="draftContainer">
      <Search @update="$emit('update', $event)" />

      <div class="wrapper">
        <div
          class="cardMapContainer"
          @click="
            randomMapSelect();
            $playSFX('select_map');
          "
        >
          <img :src="require(`../assets/img/circuits/Random.png`)" />
        </div>

        <div
          class="cardMapContainer"
          v-for="(map, index) in maps"
          :key="index"
          @click="
            selected = map.id;
            $playSFX('select_map');
          "
        >
          <img :src="require(`../assets/img/circuits/${map.src}.jpg`)" />
          <div class="banOverlayImg" v-if="map.banned">
            <img class="banIcon" src="../assets/img/banned-icon.png" />
          </div>
          <div
            class="mapName"
            :class="{
              picked: map.picked,
              active:
                map.id === selected &&
                map.picked !== true &&
                map.banned !== true,
              banned: map.banned
            }"
          >
            <h4>{{ map.title }}</h4>
          </div>
        </div>
      </div>
    </div>

    <div class="bottomContainer">
      <!-- <div class="soundContainer"></div> -->
      <client-only>
        <!-- :responsive="{
              0: { items: 1 },
              600: { items: 3 },
              1000: {items: 6}
            }" -->
        <carousel
          class="banContainer"
          :loop="false"
          :nav="false"
          :dots="false"
          :autoWidth="true"
        >
          <div
            class="banOverlay borderBan"
            v-for="(item, index) in $store.state.draft.draft.draftMode.bans"
            :key="index"
            :class="{
              blue: index == 0 || index == 2 || index == 4,
              red: index == 1 || index == 3 || index == 5
            }"
          >
            <div class="corner">
              <div
                class="cornerImage"
                v-if="index == 0 || index == 2 || index == 4"
              >
                <img src="../assets/img/corner-blue.png" />
              </div>
              <div class="cornerImage" v-else>
                <img src="../assets/img/corner-red.png" />
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
      <div class="sound">
        <range-slider
          class="slider"
          min="0"
          max="100"
          step="1"
          v-model="volume"
        >
        </range-slider>
        <div>Volume : {{ volume }}%</div>
      </div>
      <button
        class="startLockBtn"
        @click="
          banOrPick();
          $playSFX('click');
        "
      >
        {{ buttonBanOrPick() }}
      </button>
    </div>
  </div>
</template>

<script>
import Search from "~/components/Search.vue";
import Language from "~/components/Language.vue";
import RangeSlider from "vue-range-slider";
import "vue-range-slider/dist/vue-range-slider.css";

export default {
  beforeDestroy() {
    this.$shutdownSoundSystem();
  },
  mounted() {
    this.$playMusic("ban");
  },
  sockets: {
    RES_START_TIMER: function(ele) {
      this.timeLeft = ele;
      if (this.timeLeft <= 10) this.$playSFX("gofast");
    },
    RES_NEXT_ROUND: function(ele) {
      if (ele.idMap !== -1) {
        this.$store.commit("map/selectMap", [ele.banOrPick, ele.idMap]);
      }
      this.$store.commit("draft/nextRound", [ele.round, ele.turn, ele.maps]);

      if (
        !(
          this.$store.state.draft.draft.draftMode.bans >=
          this.$store.state.draft.draft.round
        )
      ) {
        if (!this.lock) {
          this.$playMusic("pick");
          if (ele.turn == 0) {
            this.$playSFX("first");
          } else if (ele.turn == 1) {
            this.$playSFX("first");
          }
        }
        this.lock = true;
      }

      if (ele.banOrPick == 0) {
        this.$playSFX("banned");
      } else if (ele.banOrPick == 1) {
        this.$playSFX("picked");
      }

      if (ele.banOrPick == 1) {
        if (ele.turn == 0 && this.$store.state.draft.room.team == "TEAM A") {
          this.$playSFX("turn");
        } else if (
          ele.turn == 1 &&
          this.$store.state.draft.room.team == "TEAM B"
        ) {
          this.$playSFX("turn");
        }
      }
    }
  },
  components: {
    Search,
    RangeSlider,
    Language
  },
  props: {
    maps: Array
  },
  watch: {
    volume: function(newVol, oldVol) {
      this.$updateVolume(newVol)
    }
  },
  data() {
    return {
      timeLeft: 30,
      selected: -1,
      lock: false,
      volume: 50
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
    },
    randomMapSelect() {
      let randomMap = Math.floor(Math.random() * this.maps.length);
      if (
        this.$store.state.draft.draft.maps.picked.includes(randomMap) ||
        this.$store.state.draft.draft.maps.banned.includes(randomMap)
      ) {
        this.randomMapSelect();
      } else {
        return (this.selected = this.maps[randomMap].id);
      }
    }
  }
};
</script>

<style></style>
