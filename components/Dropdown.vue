<template>
  <section>
    <div class="containerDropdown">
      <div class="pickProfil">
        <div class="specCategoryName">
          <p>PICKED</p>
        </div>
        <client-only>
          <carousel
            class="carouselProfil"
            :loop="false"
            :nav="false"
            :dots="false"
            :margin="0"
            :autoWidth="true"
          >
            <div
              class="borderPick"
              v-for="(pick, index) in picks"
              :key="pick.id"
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
              <div class="pickee" v-if="pick.id">
                <img
                  v-if="pick.id != -1"
                  :src="require(`../assets/img/circuits/${pick.src}.jpg`)"
                />
              </div>
              <div class="mapName">
                <h4>
                  {{ pick.title }}
                </h4>
              </div>
            </div>
          </carousel>
        </client-only>
      </div>

      <!-- BAN -->

      <div class="pickProfil">
        <div class="specCategoryName" v-if="bans.length != 0">
          <p>Banned</p>
        </div>
        <client-only>
          <carousel
            v-if="bans.length != 0"
            class="carouselProfil"
            :loop="false"
            :nav="false"
            :dots="false"
            :margin="0"
            :autoWidth="true"
          >
            <div
              class="borderPick"
              v-for="(ban, index) in bans"
              :key="ban.id"
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
                <div class="cornerNumber spectator">{{ index + 1 }}</div>
              </div>
              <div class="pickee" v-if="ban.id">
                <img
                  v-if="ban.id != -1"
                  :src="require(`../assets/img/circuits/${ban.src}.jpg`)"
                />
              </div>
              <div class="mapName">
                <h4>
                  {{ ban.title }}
                </h4>
              </div>
            </div>
          </carousel>
        </client-only>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    picks: Array,
    bans: Array
  }
};
</script>
