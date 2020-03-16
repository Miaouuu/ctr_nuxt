export const state = () => ({
  maps: []
});

export const mutations = {
  newMaps(state, ele) {
    state.maps = ele;
  },
  selectMap(state, ele) {
    let index = state.maps.findIndex(data => data.id === ele[1]);
    if (ele[0] === 0) {
      state.maps[index].banned = true;
    } else if (ele[0] === 1) {
      state.maps[index].picked = true;
    }
  }
};
