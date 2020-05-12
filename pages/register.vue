<template>
  <form method="post" @submit.prevent="register">
    <div>
      <label>Name</label>
      <div>
        <input type="text" name="name" v-model="name" required />
      </div>
    </div>
    <div>
      <label>Email</label>
      <div>
        <input type="email" name="email" v-model="email" required />
      </div>
    </div>
    <div>
      <label>Password</label>
      <div>
        <input type="password" name="password" v-model="password" required />
      </div>
    </div>
    <div>
      <label>Confirm Password</label>
      <div>
        <input type="password" name="cPassword" v-model="cPassword" required />
      </div>
    </div>
    <div>
      <button type="submit">
        Register
      </button>
    </div>
  </form>
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
