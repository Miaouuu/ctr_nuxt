export const state = () => ({
  maps: [
    {
      id: 0,
      banned: false,
      picked: false,
      title: "Crash Cove",
      src: "01-crique-crash.jpg",
      type: "CTR"
    },
    {
      id: 1,
      banned: false,
      picked: false,
      title: "Mystery Caves",
      src: "02-grotte-mystere.jpg",
      type: "CTR"
    },
    {
      id: 2,
      banned: false,
      picked: false,
      title: "Sewer Speedway",
      src: "03-circuit-egouts.jpg",
      type: "CTR"
    },
    {
      id: 3,
      banned: false,
      picked: false,
      title: "Inferno Island",
      src: "19-ile-infernale.jpg",
      type: "CNK"
    },
    {
      id: 4,
      banned: false,
      picked: false,
      title: "Jungle Boogie",
      src: "20-jungle-en-folie.jpg",
      type: "CNK"
    },
    {
      id: 5,
      banned: false,
      picked: false,
      title: "Clockwork Wumpa",
      src: "21-horloge-wumpa.jpg",
      type: "CNK"
    },
    {
      id: 6,
      banned: false,
      picked: false,
      title: "Android Alley",
      src: "22-androides.jpg",
      type: "CNK"
    },
    {
      id: 7,
      banned: false,
      picked: false,
      title: "Electron Avenue",
      src: "23-electrons.jpg",
      type: "CNK"
    },
    {
      id: 8,
      banned: false,
      picked: false,
      title: "Twilight Tour",
      src: "32-circuit-du-crepuscule.jpg",
      type: "BONUS"
    },
    {
      id: 9,
      banned: false,
      picked: false,
      title: "Prehistoric Playground",
      src: "33-parc-prehistorique.jpg",
      type: "BONUS"
    },
    {
      id: 10,
      banned: false,
      picked: false,
      title: "Spyro circuit",
      src: "34-circuit-de-spyro.jpg",
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
