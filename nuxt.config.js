module.exports = {
  mode: "universal",
  head: {
    title: "Crash Team Racing Draft",
    meta: [
      {
        property: "og:title",
        content: "Crash Team Racing Draft"
      },
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "Crash Team Racing Draft is a website which allows you to easily create CTR Draft between two teams."
      },
      {
        hid: "description",
        name: "description",
        content:
          "Crash Team Racing Draft is a website which allows you to easily create CTR Draft between two teams."
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  loading: { color: "#fff" },
  css: ["@/assets/css/main.css", "@/assets/css/main.scss"],
  plugins: [
    { src: "~/plugins/socket.client.js" },
    { src: "~/plugins/owl.js", ssr: false },
    { src: "~/plugins/sounds.js", ssr: false }
  ],
  buildModules: [],
  modules: ["@nuxtjs/pwa", "@nuxtjs/axios", "@nuxtjs/auth"],
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      });
    }
  },
  axios: {
    baseURL: "https://ctr-api.herokuapp.com/api"
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/v1/login",
            method: "post",
            propertyName: false
          },
          user: { url: "/v1/user", method: "get", propertyName: false },
          logout: false
        },
        tokenRequired: true,
        tokenType: "bearer",
        globalToken: true,
        autoFetchUser: false
      }
    }
  }
};
