<template>
  <div class="draftContainerTop" >
    <div class="draftContainerTopFilters">
      <ul class="filters">
        <li @click="researchByMapType('CTR')">CTR</li>
        <li @click="researchByMapType('CNK')">CNK</li>
        <li @click="researchByMapType('BONUS')">BONUS</li>
        <li @click="researchByMapType('')">RESET</li>
      </ul>
      <!-- <p>Current map type : {{ mapType }}</p> -->
    </div>
    <div class="draftContainerTopSearch">
      <input class="search" type="text" v-model="search" @input="mapsFilteredList()" />
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

<style>

</style>
