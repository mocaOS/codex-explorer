// https://nuxt.com/docs/api/configuration/nuxt-config
import config from "./lib/config";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",

  devtools: {
    enabled: true,
  },

  runtimeConfig: {
    public: {
      config: { ...config },
    },
  },


  css: [
    "~/assets/css/main.scss",
  ],

  modules: [ "@nuxtjs/tailwindcss", "shadcn-nuxt", "@nuxtjs/color-mode", "@nuxt/image", "nuxt-swiper", "@davestewart/nuxt-scrollbar", "@nuxtjs/seo", "@nuxtjs/google-fonts", "@nuxt/icon", "@vueuse/nuxt" ],

  image: {
    domains: [ "ipfs.qwellcode.de" ],
    densities: [ 1 ],
    provider: "ipx",
  },

  site: {
    indexable: process.env.NODE_ENV === "production",
    url: config.website.baseUrl,
    name: "The Codex | Art DeCC0s",
    description: "MOCA presents the Codex which allows you to explore all 10k Art DeCC0s and their unique personalities. Filter and search across the entire NFT collection and discover your favorite companions.",
    trailingslash: true,
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },

  swiper: {},

  googleFonts: {
    families: {
      Inter: true,
    },
  },

  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/fav/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          href: "/fav/favicon-16x16.png",
        },
        {
          rel: "manifest",
          href: "/fav/site.webmanifest",
        },
        {
          rel: "mask-icon",
          href: "/fav/safari-pinned-tab.svg",
          color: "#ffffff",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/fav/apple-touch-icon.png",
        },
        {
          rel: "shortcut icon",
          href: "/fav/favicon.ico",
        },
      ],
      meta: [
        {
          charset: "utf-8",
        },
        {
          name: "msapplication-TileColor",
          content: "#000000",
        },
        {
          name: "msapplication-config",
          content: "/fav/browserconfig.xml",
        },
        {
          name: "theme-color",
          content: "#ffffff",
        },
        {
          name: "fortmatic-site-verification",
          content: "jb7k3cv4cILNznzp",
        },
      ],
    },
  },
});
