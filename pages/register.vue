<template>
  <div class="roomContainer">
    <Language></Language>
    <p>{{ error }}</p>
    <div class="roomInputContainer">
      <form method="post" @submit.prevent="register">
        <input
          type="text"
          class="teamInputSelect shadowPermanent"
          name="name"
          v-model="name"
          :placeholder="nameT"
          required
        />
        <input
          type="email"
          class="teamInputSelect shadowPermanent"
          name="email"
          :placeholder="emailT"
          v-model="email"
          required
        />
        <input
          type="password"
          class="teamInputSelect shadowPermanent"
          name="password"
          :placeholder="passwordT"
          v-model="password"
          required
        />
        <input
          type="password"
          class="teamInputSelect shadowPermanent"
          name="cPassword"
          :placeholder="confirmT"
          v-model="cPassword"
          required
        />
        <button type="submit" class="startLockBtn">
          {{ registerT }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Language from "~/components/Language.vue";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      cPassword: "",
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
    async register() {
      try {
        let token = await this.$axios.post("/v1/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          c_password: this.cPassword,
          client_name: "ctr-api"
        });
        this.$auth.setToken("local", "Bearer " + token.data.success.token);
        this.$axios.setHeader(
          "Authorization",
          "Bearer " + token.data.success.token
        );
        this.$auth.ctx.app.$axios.setHeader(
          "Authorization",
          "Bearer " + token.data.success.token
        );
        let user = await this.$axios.get("/v1/user");
        this.$auth.setUser(user.data);
      } catch (e) {
        if (this.$i18n.locale == "fr") {
          this.error = "Erreur";
        } else if (this.$i18n.locale == "en") {
          this.error = "Error";
        }
      }
    }
  },
  computed: {
    nameT() {
      return this.$t("register").name;
    },
    emailT() {
      return this.$t("register").email;
    },
    passwordT() {
      return this.$t("register").password;
    },
    confirmT() {
      return this.$t("register").confirm;
    },
    registerT() {
      return this.$t("register").register;
    }
  }
};
</script>

<style></style>
