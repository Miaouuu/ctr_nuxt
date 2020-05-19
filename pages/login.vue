<template>
  <section>
    <Language></Language>
    <div class="roomContainer">
      <div class="roomInputContainer">
        <form method="post" @submit.prevent="login">
          <input
            type="email"
            class="teamInputSelect shadowPermanent"
            name="email"
            :placeholder="emailT"
            v-model="email"
          />
          <input
            type="password"
            class="teamInputSelect shadowPermanent"
            name="password"
            :placeholder="passwordT"
            v-model="password"
          />
          <button type="submit" class="startLockBtn">
            {{ loginT }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import Language from "~/components/Language.vue";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null
    };
  },
  components: {
    Language
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    async login() {
      try {
        let resp = await this.$auth.loginWith("local", {
          data: {
            admin: false,
            email: this.email,
            password: this.password,
            client_name: "ctr-api"
          }
        });
        this.$auth.setToken("local", "Bearer " + resp.data.success.token);
        this.$axios.setHeader(
          "Authorization",
          "Bearer " + resp.data.success.token
        );
        this.$auth.ctx.app.$axios.setHeader(
          "Authorization",
          "Bearer " + resp.data.success.token
        );
        let user = await this.$axios.get("/v1/user");
        this.$auth.setUser(user.data);
      } catch (e) {
        console.log(e);
      }
    }
  },
  computed: {
    emailT() {
      return this.$t("login").email;
    },
    passwordT() {
      return this.$t("login").password;
    },
    loginT() {
      return this.$t("login").login;
    }
  }
};
</script>
