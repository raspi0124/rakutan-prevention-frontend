import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ["vuetify"],
  },
  devtools: { enabled: true },
  ssr: false,
  modules: [
    "@nuxt-alt/auth",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  auth: {
    globalMiddleware: true,
    //以下の事項については実はまあ公開情報なので.envには収納しないでこのままいきます よろしくお願いします
    strategies: {
      auth0: {
        domain: "raspi0124-public.jp.auth0.com",
        clientId: "jCqc4NlJHtqgxpK03fpUonSQ4ILnTyIO",
        audience: "https://rp-api.raspi0124.dev/",
      },
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
