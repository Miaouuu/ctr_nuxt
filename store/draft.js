export const state = () => ({
  room: {
    team: ""
  },
  draft: {
    teamName: ["", ""],
    draftMode: {
      name: "Classic",
      bans: 6,
      picks: 10
    },
    maps: {
      banned: [],
      picked: []
    },
    round: 1,
    turn: false
  }
});

export const mutations = {
  changeTeam(state, team) {
    state.room.team = team;
  },
  nextRound(state, ele) {
    state.draft.round = ele[0];
    state.draft.turn = ele[1];
    state.draft.maps = ele[2];
  },
  changeTeamName(state, teamName) {
    state.draft.teamName = teamName;
  },
  changeDraftMode(state, draftMode) {
    state.draft.draftMode = draftMode;
  },
  changeDraftName(state, name) {
    state.draft.draftMode.name = name;
  },
  resetMap(state, maps) {
    state.draft.maps = maps;
  }
};
