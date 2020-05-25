import colors from "vuetify/es5/util/colors";

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
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
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/axios" //-- add plugins axios
  ],
  proxy: {
    "/api": "http://127.0.0.1:7000", //-- ตั้งค่า map proxy url api server
    ws: true
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "bootstrap-vue/nuxt",
    "@nuxtjs/proxy",
    "@nuxtjs/auth",
    "@nuxtjs/axios"
  ],
  auth: {
    redirect: {
      login: "/login"
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "http://localhost:7000/api/users/login",
            method: "post",
            propertyName: "token"
          },
          logout: { url: "/sessions", method: "delete" },
          user: {
            url: "http://localhost:7000/api/users/me",
            method: "get",
            propertyName: "userData"
          }
        }
        // tokenRequired: true,
        // tokenType: 'bearer',
        // globalToken: true,
        // autoFetchUser: true
      }
    }
  },
  bootstrapVue: {
    icons: true // Install the IconsPlugin (in addition to BootStrapVue plugin
  },

  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    vendor: [
      "vuetify",
      "vue-axios" //-- add vendor vue-axios
    ],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
