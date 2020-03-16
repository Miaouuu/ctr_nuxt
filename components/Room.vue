<template>
  <div>
    <input
      type="text"
      placeholder="TEAM A"
      v-model="team1Name"
      :disabled="!admin"
      @input="teamName()"
    />
    <input
      type="text"
      placeholder="TEAM B"
      v-model="team2Name"
      :disabled="!admin"
      @input="teamName()"
    />
    <select v-model="draftMode.draftModeSelected" @change="changeDraftMode()" :disabled="!admin">
      <option v-for="option in draftMode.optionsDraftMode" :value="option.value">{{ option.text }}</option>
    </select>
    <button @click="startDraft()">Start draft</button>
  </div>
</template>

<script>
export default {
  sockets: {
    RES_CHANGE_TEAM_NAME: function(ele) {
      this.team1Name = ele[0];
      this.team2Name = ele[1];
    },
    RES_CHANGE_DRAFT_MODE: function(ele) {
      this.draftMode.draftModeSelected = ele;
    }
  },
  props: {
    admin: Boolean
  },
  data() {
    return {
      team1Name: "",
      team2Name: "",
      draftMode: {
        draftModeSelected: "",
        optionsDraftMode: [
          { text: "Classic 6BANS 10PICKS", value: "Classic" },
          { text: "League 6BANS 8PICKS", value: "League" },
          { text: "Light 4BANS 6PICKS", value: "Light" },
          { text: "No bans 0BANS 10PICKS", value: "No" }
        ]
      }
    };
  },
  methods: {
    teamName() {
      this.$socket.emit("CHANGE_TEAM_NAME", {
        path: this.$route.params.pin,
        teamName: [this.team1Name, this.team2Name]
      });
    },
    changeDraftMode() {
      this.$socket.emit("CHANGE_DRAFT_MODE", {
        path: this.$route.params.pin,
        value: this.draftMode.draftModeSelected
      });
    },
    startDraft() {
      this.$socket.emit("START_DRAFT", this.$route.params.pin);
    }
  }
};
</script>

<style>
input {
  margin: 10%;
  justify-content: center;
  align-items: center;
  background-color: #a8d8f8;
  border: none;
  text-align: center;
  font-weight: bold;
  width: 20rem;
  height: 3rem;
  box-shadow: -8px 8px 0px #0d5288;
}
::placeholder {
  color: #0d5288;
}
select {
  display: block;
  margin: auto;
  width: 20rem;
  height: 3rem;
  font-weight: bold;
  background-color: #a8d8f8;
  box-shadow: -8px 8px 0px #0d5288;
}
button {
  margin-top: 10px;
  display: block;
  margin: auto;
  justify-content: center;
  align-items: center;
  background-color: #a8d8f8;
  width: 10rem;
  height: 3rem;
  font-weight: bold;
  border-radius: 40px;
  box-shadow: -8px 8px 0px #0d5288;
}
</style>
