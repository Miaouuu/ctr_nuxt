<template>
  <section>
    <div>
      <div>
        <div class="loginstyle">
          <form method="post" @submit.prevent="login">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  type="email"
                  class="input"
                  name="email"
                  v-model="email"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="password"
                  v-model="password"
                />
              </div>
            </div>
            <div class="button">
              <button type="submit" class="button is-dark is-fullwidth">
                Log In
              </button>
            </div>
          </form>
        </div>
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
        console.log(e);
      }
    }
  }
};
</script>
