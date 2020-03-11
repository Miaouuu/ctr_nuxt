module.exports = {
  mode: "universal",
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  loading: { color: "#fff" },
  css: ["@/assets/css/main.css", "@/assets/css/main.scss"],
  plugins: [{ src: "~/plugins/socket.client.js" }],
  buildModules: [],
  modules: ["@nuxtjs/pwa"],
  build: {
    extend(config, ctx) {}
  }
};
