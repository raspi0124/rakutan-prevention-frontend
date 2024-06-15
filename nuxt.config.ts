// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ["@nuxt-alt/auth"],
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
});
