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
    <div class="roomInputContainer">
      <form method="post" @submit.prevent="register">
        <input
          type="text"
          class="teamInputSelect shadowPermanent"
          name="name"
          v-model="name"
          placeholder="Pseudo"
          required
        />
        <input
          type="email"
          class="teamInputSelect shadowPermanent"
          name="email"
          placeholder="Email"
          v-model="email"
          required
        />
        <input
          type="password"
          class="teamInputSelect shadowPermanent"
          name="password"
          placeholder="Password"
          v-model="password"
          required
        />
        <input
          type="password"
          class="teamInputSelect shadowPermanent"
          name="cPassword"
          placeholder="Confirm password"
          v-model="cPassword"
          required
        />
        <button type="submit" class="startLockBtn">
          Register
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
      cPassword: ""
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

        console.log(token);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style></style>
