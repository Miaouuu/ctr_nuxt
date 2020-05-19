<template>
  <section>
    <p>{{ $auth.user.name }}</p>
    <h1>Drafts</h1>
    <p v-for="draft in drafts" :key="draft.id">{{ draft.gamemode_type }}</p>
  </section>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      drafts: []
    };
  },
  methods: {
    async getDrafts() {
      let temp = await this.$axios.get("/v1/drafts");
      this.drafts = temp.data.drafts;
    }
  },
  mounted() {
    this.getDrafts();
  }
};
</script>
