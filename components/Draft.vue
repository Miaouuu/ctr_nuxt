<template>
  <div class="container">
    <!-- <h3 class="teamName">
      Tour : Team
      {{
        $store.state.draft.draft.turn
          ? $store.state.draft.draft.teamName[1]
          : $store.state.draft.draft.teamName[0]
      }}
    </h3>-->

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
      <svg>
        <!-- Polygon en dehors de l'ecran, à replacer -->
        <polygon points="0 0 18 36.5 230 36.5 255 0 0 0" fill="#FAC600" />
      </svg>
      <h1 class="timerTxt">{{ timeLeft }}</h1>
    </div>

    <div class="draftContainer">
      <Search @update="$emit('update', $event)" />

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
      this.$store.commit("draft/nextRound", [ele.round, ele.turn, ele.maps]);
    }
  },
  components: {
    Search
  },
  props: {
    maps: Array
  },
  data() {
    return {
      timeLeft: 30,
      selected: -1
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
  }
};
</script>

<style></style>
