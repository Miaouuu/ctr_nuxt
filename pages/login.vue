<template>
  <section>
    <div class="roomContainer">
      <p>{{ error }}</p>
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
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null
    };
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
        if (this.$i18n.locale == "fr") {
          this.error = "Mauvais mot de passe ou email";
        } else if (this.$i18n.locale == "en") {
          this.error = "Wrong password or mail";
        }
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
