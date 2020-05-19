<template>
  <section>
    <!-- <p>{{ $auth.user.name }}</p>
    <p>{{ $auth.user.email }}</p> -->
    <h1>Drafts</h1>
    <div v-for="draft in drafts" :key="draft.id">
      <div @click="toggle(draft.id)">
        <svg viewBox="0 0 512 512" style="width:50px;height:50px;">
          <g>
            <g>
              <path
                d="M256,0C114.853,0,0,114.833,0,256s114.853,256,256,256c141.167,0,256-114.833,256-256S397.147,0,256,0z M256,472.341
			c-119.295,0-216.341-97.046-216.341-216.341S136.705,39.659,256,39.659S472.341,136.705,472.341,256S375.295,472.341,256,472.341z
			"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M355.148,234.386H156.852c-10.946,0-19.83,8.884-19.83,19.83s8.884,19.83,19.83,19.83h198.296
			c10.946,0,19.83-8.884,19.83-19.83S366.094,234.386,355.148,234.386z"
              />
            </g>
          </g>
        </svg>
      </div>
      <div class="test">
        <Dropdown
          v-if="visible == draft.id"
          :bans="draft.maps_banned"
          :picks="draft.maps_picked"
        />
      </div>
    </div>

    <!-- <div class="e" v-for="draft in drafts" :key="draft.id">
      <h1 @click="visible = draft.id">oui</h1>  <Dropdown
        class="test"
        v-if="visible == draft.id"
        :bans="draft.maps_banned"
        :picks="draft.maps_picked"
      />
    </div>-->
  </section>
</template>
<style scoped>
.test {
  width: 85vw;
  margin: auto;
}
.pickContainer.spec {
  width: 90%;
}
</style>
<script>
import Dropdown from "../../components/Dropdown.vue";
export default {
  middleware: "auth",
  components: { Dropdown },
  data() {
    return {
      drafts: [],
      visible: -1
    };
  },
  methods: {
    async getDrafts() {
      let temp = await this.$axios.get("/v1/drafts");
      this.drafts = temp.data.drafts;
      console.log(this.drafts);
    },
    toggle(id) {
      if (this.visible == id) {
        this.visible = -1;
      } else {
        this.visible = id;
      }
    }
  },
  mounted() {
    this.getDrafts();
  }
};
</script>
