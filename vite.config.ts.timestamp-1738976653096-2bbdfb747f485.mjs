// vite.config.ts
import { fileURLToPath, URL } from "node:url";

// build/env.ts
var isProduction = () => process.env.NODE_ENV === "production";

// build/plugins.ts
import { VarletImportResolver } from "file:///E:/WorkSpace/panda-tv/node_modules/@varlet/import-resolver/lib/index.js";
import vue from "file:///E:/WorkSpace/panda-tv/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import jsx from "file:///E:/WorkSpace/panda-tv/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import autoImport from "file:///E:/WorkSpace/panda-tv/node_modules/unplugin-auto-import/dist/vite.js";
import components from "file:///E:/WorkSpace/panda-tv/node_modules/unplugin-vue-components/dist/vite.js";
import vueRouter from "file:///E:/WorkSpace/panda-tv/node_modules/unplugin-vue-router/dist/vite.mjs";
import icon from "file:///E:/WorkSpace/panda-tv/node_modules/@varlet/unplugin-icon-builder/dist/vite.js";
import unoCSS from "file:///E:/WorkSpace/panda-tv/node_modules/unocss/dist/vite.mjs";
import { VitePWA } from "file:///E:/WorkSpace/panda-tv/node_modules/vite-plugin-pwa/dist/index.js";
import { visualizer } from "file:///E:/WorkSpace/panda-tv/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
function createVitePlugins() {
  return [
    vue({
      template: {
        transformAssetUrls: {
          img: ["src"],
          video: ["src"],
          audio: ["src"],
          "var-image": ["src"],
          "var-avatar": ["src"],
          "var-card": ["src"],
          "var-app-bar": ["image"]
        }
      }
    }),
    jsx(),
    unoCSS(),
    icon({ dir: "src/assets/icons", onDemand: true }),
    components({
      resolvers: [VarletImportResolver()]
    }),
    autoImport({
      imports: [
        "vue",
        "vue-router",
        "pinia",
        "vue-i18n",
        {
          "@/use": ["useAppRouter"]
        }
      ],
      resolvers: [VarletImportResolver({ autoImport: true })],
      eslintrc: { enabled: true }
    }),
    vueRouter({
      routesFolder: [
        {
          src: "src/pages"
        },
        {
          src: "src/stacks",
          path: "stacks/"
        }
      ],
      exclude: ["**/components/**", "**/use/**"],
      extendRoute(route) {
        const stacks = route.meta?.stacks ?? [];
        const processStacks = (route2, stacks2) => {
          stacks2.forEach((stack) => {
            const isStringifyStack = typeof stack === "string";
            const name = isStringifyStack ? stack : stack.name;
            const newRoute = route2.insert(name, `/src/stacks/${name}.vue`);
            if (!isStringifyStack && stack.children) {
              processStacks(newRoute, stack.children);
            }
          });
        };
        processStacks(route, stacks);
      }
    }),
    VitePWA({
      /**
       * @default prompt
       * @autoUpdate 会在sw.js有变动的情况下自动更新
       * @prompt 会触发相关钩子函数，让你手动选择更新
       */
      registerType: "prompt",
      // 开发环境中查看
      devOptions: {
        enabled: true,
        type: "module",
        // navigateFallback 是 Workbox 的一个配置项，用于指定当导航请求（通常是 HTML 页面请求）失败时，应该返回哪个页面作为回退。这通常用于离线支持，确保用户即使在
        navigateFallback: "index.html"
      },
      /**
       * @default generateSW
       * @generateSW 自动构建注册SW
       * @injectManifest 手动构建注册SW
       */
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      pwaAssets: {
        disabled: false,
        config: true
      },
      manifest: {
        name: "Panda TV",
        short_name: "Panda TV",
        description: "Panda TV - Find your favorite movies",
        categories: ["short-tv"],
        background_color: "#ffffff",
        theme_color: "#ffffff",
        start_url: "/panda-tv",
        display: "standalone",
        icons: [
          {
            src: "panda512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "panda192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "panda64x64.png",
            sizes: "64x64",
            type: "image/png"
          }
        ],
        shortcuts: [
          {
            name: "Home",
            short_name: "Home",
            description: "Home",
            url: "/",
            icons: [
              {
                src: "panda512x512.png",
                sizes: "512x512",
                type: "image/png"
              }
            ]
          }
        ],
        screenshots: [
          {
            src: "screenshot1.png",
            sizes: "540x960",
            type: "image/png"
          },
          {
            src: "screenshot2.png",
            sizes: "540x960",
            type: "image/png"
          }
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true,
        sourcemap: true
      }
    }),
    visualizer({
      emitFile: true,
      filename: "stats.html"
    })
  ];
}

// vite.config.ts
import { defineConfig } from "file:///E:/WorkSpace/panda-tv/node_modules/vite/dist/node/index.js";
var __vite_injected_original_import_meta_url = "file:///E:/WorkSpace/panda-tv/vite.config.ts";
var vite_config_default = defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    host: "0.0.0.0",
    port: 10086
    // proxy: {
    //   '/api': {
    //     target: import.meta.env.VITE_API_BASE,
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
    // https: {
    //   cert: fs.readFileSync(path.join(__dirname, './public/localhost+2.pem')),
    //   key: fs.readFileSync(path.join(__dirname, './public/localhost+2-key.pem')),
    // },
  },
  build: {
    // target: ['ios12'],
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", __vite_injected_original_import_meta_url)),
        desktop: fileURLToPath(new URL("./desktop.html", __vite_injected_original_import_meta_url))
      },
      output: {
        entryFileNames: "js/[name]-[hash:8].js",
        assetFileNames: "assets/[name]-[hash:8][extname]",
        chunkFileNames: "js/[name]-[hash:8].js"
      }
    }
  },
  esbuild: {
    drop: isProduction() ? ["console", "debugger"] : []
  },
  plugins: createVitePlugins()
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvZW52LnRzIiwgImJ1aWxkL3BsdWdpbnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxXb3JrU3BhY2VcXFxccGFuZGEtdHZcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFdvcmtTcGFjZVxcXFxwYW5kYS10dlxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovV29ya1NwYWNlL3BhbmRhLXR2L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5pbXBvcnQgeyBpc1Byb2R1Y3Rpb24gfSBmcm9tICcuL2J1aWxkL2VudidcbmltcG9ydCB7IGNyZWF0ZVZpdGVQbHVnaW5zIH0gZnJvbSAnLi9idWlsZC9wbHVnaW5zJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbi8vIGltcG9ydCBmcyBmcm9tICdub2RlOmZzJ1xuLy8gaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBiYXNlOiAnLi8nLFxuXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcblxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgcG9ydDogMTAwODYsXG4gICAgLy8gcHJveHk6IHtcbiAgICAvLyAgICcvYXBpJzoge1xuICAgIC8vICAgICB0YXJnZXQ6IGltcG9ydC5tZXRhLmVudi5WSVRFX0FQSV9CQVNFLFxuICAgIC8vICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgLy8gICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJyksXG4gICAgLy8gICB9LFxuICAgIC8vIH0sXG4gICAgLy8gaHR0cHM6IHtcbiAgICAvLyAgIGNlcnQ6IGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9wdWJsaWMvbG9jYWxob3N0KzIucGVtJykpLFxuICAgIC8vICAga2V5OiBmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4vcHVibGljL2xvY2FsaG9zdCsyLWtleS5wZW0nKSksXG4gICAgLy8gfSxcbiAgfSxcblxuICBidWlsZDoge1xuICAgIC8vIHRhcmdldDogWydpb3MxMiddLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIG1haW46IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9pbmRleC5odG1sJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICAgIGRlc2t0b3A6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9kZXNrdG9wLmh0bWwnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgIH0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdqcy9bbmFtZV0tW2hhc2g6OF0uanMnLFxuICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2g6OF1bZXh0bmFtZV0nLFxuICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2pzL1tuYW1lXS1baGFzaDo4XS5qcycsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG5cbiAgZXNidWlsZDoge1xuICAgIGRyb3A6IGlzUHJvZHVjdGlvbigpID8gWydjb25zb2xlJywgJ2RlYnVnZ2VyJ10gOiBbXSxcbiAgfSxcblxuICBwbHVnaW5zOiBjcmVhdGVWaXRlUGx1Z2lucygpLFxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcV29ya1NwYWNlXFxcXHBhbmRhLXR2XFxcXGJ1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxXb3JrU3BhY2VcXFxccGFuZGEtdHZcXFxcYnVpbGRcXFxcZW52LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9Xb3JrU3BhY2UvcGFuZGEtdHYvYnVpbGQvZW52LnRzXCI7ZXhwb3J0IGNvbnN0IGlzUHJvZHVjdGlvbiA9ICgpID0+IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbidcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcV29ya1NwYWNlXFxcXHBhbmRhLXR2XFxcXGJ1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxXb3JrU3BhY2VcXFxccGFuZGEtdHZcXFxcYnVpbGRcXFxccGx1Z2lucy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovV29ya1NwYWNlL3BhbmRhLXR2L2J1aWxkL3BsdWdpbnMudHNcIjtpbXBvcnQgeyBWYXJsZXRJbXBvcnRSZXNvbHZlciB9IGZyb20gJ0B2YXJsZXQvaW1wb3J0LXJlc29sdmVyJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQganN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXG5pbXBvcnQgYXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IGNvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB2dWVSb3V0ZXIgZnJvbSAndW5wbHVnaW4tdnVlLXJvdXRlci92aXRlJ1xuaW1wb3J0IGljb24gZnJvbSAnQHZhcmxldC91bnBsdWdpbi1pY29uLWJ1aWxkZXIvdml0ZSdcbmltcG9ydCB1bm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXG5pbXBvcnQgeyBFZGl0YWJsZVRyZWVOb2RlIH0gZnJvbSAndW5wbHVnaW4tdnVlLXJvdXRlci90eXBlcydcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnXG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YWNrUm91dGUge1xuICBuYW1lOiBzdHJpbmdcbiAgY2hpbGRyZW4/OiBTdGFja1JvdXRlW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZpdGVQbHVnaW5zKCkge1xuICByZXR1cm4gW1xuICAgIHZ1ZSh7XG4gICAgICB0ZW1wbGF0ZToge1xuICAgICAgICB0cmFuc2Zvcm1Bc3NldFVybHM6IHtcbiAgICAgICAgICBpbWc6IFsnc3JjJ10sXG4gICAgICAgICAgdmlkZW86IFsnc3JjJ10sXG4gICAgICAgICAgYXVkaW86IFsnc3JjJ10sXG4gICAgICAgICAgJ3Zhci1pbWFnZSc6IFsnc3JjJ10sXG4gICAgICAgICAgJ3Zhci1hdmF0YXInOiBbJ3NyYyddLFxuICAgICAgICAgICd2YXItY2FyZCc6IFsnc3JjJ10sXG4gICAgICAgICAgJ3Zhci1hcHAtYmFyJzogWydpbWFnZSddLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcblxuICAgIGpzeCgpLFxuXG4gICAgdW5vQ1NTKCksXG5cbiAgICBpY29uKHsgZGlyOiAnc3JjL2Fzc2V0cy9pY29ucycsIG9uRGVtYW5kOiB0cnVlIH0pLFxuXG4gICAgY29tcG9uZW50cyh7XG4gICAgICByZXNvbHZlcnM6IFtWYXJsZXRJbXBvcnRSZXNvbHZlcigpXSxcbiAgICB9KSxcblxuICAgIGF1dG9JbXBvcnQoe1xuICAgICAgaW1wb3J0czogW1xuICAgICAgICAndnVlJyxcbiAgICAgICAgJ3Z1ZS1yb3V0ZXInLFxuICAgICAgICAncGluaWEnLFxuICAgICAgICAndnVlLWkxOG4nLFxuICAgICAgICB7XG4gICAgICAgICAgJ0AvdXNlJzogWyd1c2VBcHBSb3V0ZXInXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICByZXNvbHZlcnM6IFtWYXJsZXRJbXBvcnRSZXNvbHZlcih7IGF1dG9JbXBvcnQ6IHRydWUgfSldLFxuICAgICAgZXNsaW50cmM6IHsgZW5hYmxlZDogdHJ1ZSB9LFxuICAgIH0pLFxuXG4gICAgdnVlUm91dGVyKHtcbiAgICAgIHJvdXRlc0ZvbGRlcjogW1xuICAgICAgICB7XG4gICAgICAgICAgc3JjOiAnc3JjL3BhZ2VzJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHNyYzogJ3NyYy9zdGFja3MnLFxuICAgICAgICAgIHBhdGg6ICdzdGFja3MvJyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBleGNsdWRlOiBbJyoqL2NvbXBvbmVudHMvKionLCAnKiovdXNlLyoqJ10sXG4gICAgICBleHRlbmRSb3V0ZShyb3V0ZSkge1xuICAgICAgICBjb25zdCBzdGFja3MgPSAocm91dGUubWV0YT8uc3RhY2tzID8/IFtdKSBhcyBTdGFja1JvdXRlW11cbiAgICAgICAgY29uc3QgcHJvY2Vzc1N0YWNrcyA9IChyb3V0ZTogRWRpdGFibGVUcmVlTm9kZSwgc3RhY2tzOiAoU3RhY2tSb3V0ZSB8IHN0cmluZylbXSkgPT4ge1xuICAgICAgICAgIHN0YWNrcy5mb3JFYWNoKChzdGFjaykgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNTdHJpbmdpZnlTdGFjayA9IHR5cGVvZiBzdGFjayA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBpc1N0cmluZ2lmeVN0YWNrID8gc3RhY2sgOiBzdGFjay5uYW1lXG4gICAgICAgICAgICBjb25zdCBuZXdSb3V0ZSA9IHJvdXRlLmluc2VydChuYW1lLCBgL3NyYy9zdGFja3MvJHtuYW1lfS52dWVgKVxuXG4gICAgICAgICAgICBpZiAoIWlzU3RyaW5naWZ5U3RhY2sgJiYgc3RhY2suY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgcHJvY2Vzc1N0YWNrcyhuZXdSb3V0ZSwgc3RhY2suY2hpbGRyZW4pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHByb2Nlc3NTdGFja3Mocm91dGUsIHN0YWNrcylcbiAgICAgIH0sXG4gICAgfSksXG5cbiAgICBWaXRlUFdBKHtcbiAgICAgIC8qKlxuICAgICAgICogQGRlZmF1bHQgcHJvbXB0XG4gICAgICAgKiBAYXV0b1VwZGF0ZSBcdTRGMUFcdTU3Mjhzdy5qc1x1NjcwOVx1NTNEOFx1NTJBOFx1NzY4NFx1NjBDNVx1NTFCNVx1NEUwQlx1ODFFQVx1NTJBOFx1NjZGNFx1NjVCMFxuICAgICAgICogQHByb21wdCBcdTRGMUFcdTg5RTZcdTUzRDFcdTc2RjhcdTUxNzNcdTk0QTlcdTVCNTBcdTUxRkRcdTY1NzBcdUZGMENcdThCQTlcdTRGNjBcdTYyNEJcdTUyQThcdTkwMDlcdTYyRTlcdTY2RjRcdTY1QjBcbiAgICAgICAqL1xuICAgICAgcmVnaXN0ZXJUeXBlOiAncHJvbXB0JyxcbiAgICAgIC8vIFx1NUYwMFx1NTNEMVx1NzNBRlx1NTg4M1x1NEUyRFx1NjdFNVx1NzcwQlxuICAgICAgZGV2T3B0aW9uczoge1xuICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICB0eXBlOiAnbW9kdWxlJyxcbiAgICAgICAgLy8gbmF2aWdhdGVGYWxsYmFjayBcdTY2MkYgV29ya2JveCBcdTc2ODRcdTRFMDBcdTRFMkFcdTkxNERcdTdGNkVcdTk4NzlcdUZGMENcdTc1MjhcdTRFOEVcdTYzMDdcdTVCOUFcdTVGNTNcdTVCRkNcdTgyMkFcdThCRjdcdTZDNDJcdUZGMDhcdTkwMUFcdTVFMzhcdTY2MkYgSFRNTCBcdTk4NzVcdTk3NjJcdThCRjdcdTZDNDJcdUZGMDlcdTU5MzFcdThEMjVcdTY1RjZcdUZGMENcdTVFOTRcdThCRTVcdThGRDRcdTU2REVcdTU0RUFcdTRFMkFcdTk4NzVcdTk3NjJcdTRGNUNcdTRFM0FcdTU2REVcdTkwMDBcdTMwMDJcdThGRDlcdTkwMUFcdTVFMzhcdTc1MjhcdTRFOEVcdTc5QkJcdTdFQkZcdTY1MkZcdTYzMDFcdUZGMENcdTc4NkVcdTRGRERcdTc1MjhcdTYyMzdcdTUzNzNcdTRGN0ZcdTU3MjhcbiAgICAgICAgbmF2aWdhdGVGYWxsYmFjazogJ2luZGV4Lmh0bWwnLFxuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICogQGRlZmF1bHQgZ2VuZXJhdGVTV1xuICAgICAgICogQGdlbmVyYXRlU1cgXHU4MUVBXHU1MkE4XHU2Nzg0XHU1RUZBXHU2Q0U4XHU1MThDU1dcbiAgICAgICAqIEBpbmplY3RNYW5pZmVzdCBcdTYyNEJcdTUyQThcdTY3ODRcdTVFRkFcdTZDRThcdTUxOENTV1xuICAgICAgICovXG4gICAgICBzdHJhdGVnaWVzOiAnaW5qZWN0TWFuaWZlc3QnLFxuICAgICAgc3JjRGlyOiAnc3JjJyxcbiAgICAgIGZpbGVuYW1lOiAnc3cudHMnLFxuICAgICAgcHdhQXNzZXRzOiB7XG4gICAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgY29uZmlnOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIG1hbmlmZXN0OiB7XG4gICAgICAgIG5hbWU6ICdQYW5kYSBUVicsXG4gICAgICAgIHNob3J0X25hbWU6ICdQYW5kYSBUVicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnUGFuZGEgVFYgLSBGaW5kIHlvdXIgZmF2b3JpdGUgbW92aWVzJyxcbiAgICAgICAgY2F0ZWdvcmllczogWydzaG9ydC10diddLFxuICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgIHRoZW1lX2NvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgIHN0YXJ0X3VybDogJy9wYW5kYS10dicsXG4gICAgICAgIGRpc3BsYXk6ICdzdGFuZGFsb25lJyxcbiAgICAgICAgaWNvbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdwYW5kYTUxMng1MTIucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ3BhbmRhMTkyeDE5Mi5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICcxOTJ4MTkyJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAncGFuZGE2NHg2NC5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICc2NHg2NCcsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBzaG9ydGN1dHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnSG9tZScsXG4gICAgICAgICAgICBzaG9ydF9uYW1lOiAnSG9tZScsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0hvbWUnLFxuICAgICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICBpY29uczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3JjOiAncGFuZGE1MTJ4NTEyLnBuZycsXG4gICAgICAgICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgc2NyZWVuc2hvdHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdzY3JlZW5zaG90MS5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICc1NDB4OTYwJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnc2NyZWVuc2hvdDIucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnNTQweDk2MCcsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHdvcmtib3g6IHtcbiAgICAgICAgY2xlYW51cE91dGRhdGVkQ2FjaGVzOiB0cnVlLFxuICAgICAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgICB9LFxuICAgIH0pLFxuXG4gICAgdmlzdWFsaXplcih7XG4gICAgICBlbWl0RmlsZTogdHJ1ZSxcbiAgICAgIGZpbGVuYW1lOiAnc3RhdHMuaHRtbCcsXG4gICAgfSksXG4gIF1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVAsU0FBUyxlQUFlLFdBQVc7OztBQ0F4QixJQUFNLGVBQWUsTUFBTSxRQUFRLElBQUksYUFBYTs7O0FDQW5ELFNBQVMsNEJBQTRCO0FBQ3hTLE9BQU8sU0FBUztBQUNoQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFlBQVk7QUFFbkIsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsa0JBQWtCO0FBT3BCLFNBQVMsb0JBQW9CO0FBQ2xDLFNBQU87QUFBQSxJQUNMLElBQUk7QUFBQSxNQUNGLFVBQVU7QUFBQSxRQUNSLG9CQUFvQjtBQUFBLFVBQ2xCLEtBQUssQ0FBQyxLQUFLO0FBQUEsVUFDWCxPQUFPLENBQUMsS0FBSztBQUFBLFVBQ2IsT0FBTyxDQUFDLEtBQUs7QUFBQSxVQUNiLGFBQWEsQ0FBQyxLQUFLO0FBQUEsVUFDbkIsY0FBYyxDQUFDLEtBQUs7QUFBQSxVQUNwQixZQUFZLENBQUMsS0FBSztBQUFBLFVBQ2xCLGVBQWUsQ0FBQyxPQUFPO0FBQUEsUUFDekI7QUFBQSxNQUNG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
