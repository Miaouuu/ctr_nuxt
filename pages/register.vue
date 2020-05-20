<template>
  <!-- <div class="loginstyle">
    <form method="post" @submit.prevent="register">
      <div>
        <label>Name</label>
        <div class="control">
          <input type="text" name="name" v-model="name" required />
        </div>
      </div>
      <div>
        <label>Email</label>
        <div class="control">
          <input type="email" name="email" v-model="email" required />
        </div>
      </div>
      <div>
        <label>Password</label>
        <div class="control">
          <input type="password" name="password" v-model="password" required />
        </div>
      </div>
      <div>
        <label>Confirm Password</label>
        <div class="control">
          <input
            type="password"
            name="cPassword"
            v-model="cPassword"
            required
          />
        </div>
      </div>

      <div class="button">
        <button type="submit" class="button is-dark is-fullwidth">
          Register
        </button>
      </div>
    </form>
  </div> -->
  <div class="roomContainer">
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
