<template>
  <div class="draftContainerTop">
    <div class="draftContainerTopFilters computer">
      <ul class="filters">
        <li @click="researchByMapType('')" :class="{ active: mapType === '' }">
          TOUT VOIR
        </li>
        <li
          @click="researchByMapType('CTR')"
          :class="{ active: mapType === 'CTR' }"
        >
          CTR
        </li>
        <li
          @click="researchByMapType('CNK')"
          :class="{ active: mapType === 'CNK' }"
        >
          CNK
        </li>
        <li
          @click="researchByMapType('BONUS')"
          :class="{ active: mapType === 'BONUS' }"
        >
          BONUS
        </li>
      </ul>
    </div>
    <client-only>
      <!-- :responsive="{
              0: { items: 1 },
              600: { items: 3 },
              1000: {items: 6}
            }" -->
      <carousel
        class="draftContainerTopFilters mobile"
        :loop="false"
        :nav="false"
        :dots="false"
        :margin="0"
        :autoWidth="true"
      >
        <ul class="filters">
          <li
            @click="researchByMapType('')"
            :class="{ active: mapType === '' }"
          >
            TOUT VOIR
          </li>
          <li
            @click="researchByMapType('CTR')"
            :class="{ active: mapType === 'CTR' }"
          >
            CTR
          </li>
          <li
            @click="researchByMapType('CNK')"
            :class="{ active: mapType === 'CNK' }"
          >
            CNK
          </li>
          <li
            @click="researchByMapType('BONUS')"
            :class="{ active: mapType === 'BONUS' }"
          >
            BONUS
          </li>
        </ul>
      </carousel>
    </client-only>
    <div class="draftContainerTopSearch">
      <div class="searchBar">
        <div class="searchBarIcon">
          <svg fill="#000000" viewBox="0 0 24 24" width="24px" height="24px">
            <path
              d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"
            />
          </svg>
        </div>
        <input
          class="search"
          type="text"
          v-model="search"
          @input="mapsFilteredList()"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      mapType: ""
    };
  },
  methods: {
    researchByMapType(newType) {
      this.mapType = newType;
      this.mapsFilteredList();
    },
    mapsFilteredList() {
      this.$emit(
        "update",
        this.$store.state.map.maps.filter(map => {
          if (this.mapType === map.type || this.mapType === "") {
            return (
              map.title.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
            );
          }
        })
      );
    }
  }
};
</script>

<style></style>
