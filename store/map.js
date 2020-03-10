export const state = () => ({
  maps: [
    {
      id: 0,
      banned: false,
      picked: false,
      title: "Crash Cove",
      type: "CTR"
    },
    {
      id: 1,
      banned: false,
      picked: false,
      title: "Mystery Caves",
      type: "CTR"
    },
    {
      id: 2,
      banned: false,
      picked: false,
      title: "Sewer Speedway",
      type: "CTR"
    },
    {
      id: 3,
      banned: false,
      picked: false,
      title: "Turbo Track/Retro Stadium",
      type: "CNK"
    },
    {
      id: 4,
      banned: false,
      picked: false,
      title: "Coco Park",
      type: "CNK"
    },
    {
      id: 5,
      banned: false,
      picked: false,
      title: "Tiger Temple",
      type: "CNK"
    },
    {
      id: 6,
      banned: false,
      picked: false,
      title: "Polar Pass",
      type: "BONUS"
    },
    {
      id: 7,
      banned: false,
      picked: false,
      title: "Tiny Arena",
      type: "BONUS"
    },
    {
      id: 8,
      banned: false,
      picked: false,
      title: "Dragon Mines",
      type: "BONUS"
    }
  ]
});

export const mutations = {
  selectMap(state, ele) {
    if (ele[0] === 0) {
      state.maps[ele[1]].banned = true;
    } else if (ele[0] === 1) {
      state.maps[ele[1]].picked = true;
    }
  }
};
