<template>
  <div class="langSelector">
    <select v-model="lang" @change="changeLang()">
      <option value="fr">Français</option>
      <option value="en" selected>English</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: "en"
    };
  },
  methods: {
    changeLang() {
      this.$i18n.locale = this.lang;
    }
  }
};
</script>
