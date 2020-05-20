<template>
  <section>
    <!-- <p>{{ $auth.user.name }}</p>
    <p>{{ $auth.user.email }}</p> -->
    <h1>Drafts</h1>
    <div class="card" v-for="draft in drafts" :key="draft.id">
      <div class="cardTitle">
        <span>{{ draft.created_at }}</span>
        <span>{{ draft.gamemode_type }}</span>
        <span @click="toggle(draft.id)">
          <svg viewBox="0 0 512 512" style="width:20px;height:20px;">
            <g>
              <g>
                <path
                  d="M256,0C114.833,0,0,114.833,0,256s114.833,256,256,256s256-114.853,256-256S397.167,0,256,0z M256,472.341
			c-119.275,0-216.341-97.046-216.341-216.341S136.725,39.659,256,39.659S472.341,136.705,472.341,256S375.295,472.341,256,472.341z
			"
                />
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M355.148,234.386H275.83v-79.318c0-10.946-8.864-19.83-19.83-19.83s-19.83,8.884-19.83,19.83v79.318h-79.318
			c-10.966,0-19.83,8.884-19.83,19.83s8.864,19.83,19.83,19.83h79.318v79.318c0,10.946,8.864,19.83,19.83,19.83
			s19.83-8.884,19.83-19.83v-79.318h79.318c10.966,0,19.83-8.884,19.83-19.83S366.114,234.386,355.148,234.386z"
                />
              </g>
            </g>
          </svg>
        </span>
      </div>
      <div class="cardContent">
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
h1 {
  text-align: center;
  margin: 1.5rem;
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
