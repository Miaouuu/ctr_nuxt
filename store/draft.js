export const state = () => ({
  room: {
    users: 0
  },
  draft: {
    teamName: ["", ""],
    draftMode: {
      name: "Classic",
      bans: 6,
      picks: 10
    },
    round: 1,
    turn: false
  }
});

export const mutations = {
  nextRound(state, ele) {
    state.draft.round = ele[0];
    state.draft.turn = ele[1];
  },
  changeTeamName(state, teamName) {
    state.draft.teamName = teamName;
  },
  changeDraftMode(state, draftMode) {
    state.draft.draftMode = draftMode;
  }
};