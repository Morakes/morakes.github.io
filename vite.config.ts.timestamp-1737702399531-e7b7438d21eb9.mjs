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
    })
    // visualizer({
    //   emitFile: true,
    //   filename: 'stats.html',
    // }),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvZW52LnRzIiwgImJ1aWxkL3BsdWdpbnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxXb3JrU3BhY2VcXFxccGFuZGEtdHZcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFdvcmtTcGFjZVxcXFxwYW5kYS10dlxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovV29ya1NwYWNlL3BhbmRhLXR2L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5pbXBvcnQgeyBpc1Byb2R1Y3Rpb24gfSBmcm9tICcuL2J1aWxkL2VudidcbmltcG9ydCB7IGNyZWF0ZVZpdGVQbHVnaW5zIH0gZnJvbSAnLi9idWlsZC9wbHVnaW5zJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbi8vIGltcG9ydCBmcyBmcm9tICdub2RlOmZzJ1xuLy8gaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBiYXNlOiAnLi8nLFxuXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcblxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgcG9ydDogMTAwODYsXG4gICAgLy8gcHJveHk6IHtcbiAgICAvLyAgICcvYXBpJzoge1xuICAgIC8vICAgICB0YXJnZXQ6IGltcG9ydC5tZXRhLmVudi5WSVRFX0FQSV9CQVNFLFxuICAgIC8vICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgLy8gICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJyksXG4gICAgLy8gICB9LFxuICAgIC8vIH0sXG4gICAgLy8gaHR0cHM6IHtcbiAgICAvLyAgIGNlcnQ6IGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9wdWJsaWMvbG9jYWxob3N0KzIucGVtJykpLFxuICAgIC8vICAga2V5OiBmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4vcHVibGljL2xvY2FsaG9zdCsyLWtleS5wZW0nKSksXG4gICAgLy8gfSxcbiAgfSxcblxuICBidWlsZDoge1xuICAgIC8vIHRhcmdldDogWydpb3MxMiddLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIG1haW46IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9pbmRleC5odG1sJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICAgIGRlc2t0b3A6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9kZXNrdG9wLmh0bWwnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBlc2J1aWxkOiB7XG4gICAgZHJvcDogaXNQcm9kdWN0aW9uKCkgPyBbJ2NvbnNvbGUnLCAnZGVidWdnZXInXSA6IFtdLFxuICB9LFxuXG4gIHBsdWdpbnM6IGNyZWF0ZVZpdGVQbHVnaW5zKCksXG59KVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxXb3JrU3BhY2VcXFxccGFuZGEtdHZcXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFdvcmtTcGFjZVxcXFxwYW5kYS10dlxcXFxidWlsZFxcXFxlbnYudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1dvcmtTcGFjZS9wYW5kYS10di9idWlsZC9lbnYudHNcIjtleHBvcnQgY29uc3QgaXNQcm9kdWN0aW9uID0gKCkgPT4gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJ1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxXb3JrU3BhY2VcXFxccGFuZGEtdHZcXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFdvcmtTcGFjZVxcXFxwYW5kYS10dlxcXFxidWlsZFxcXFxwbHVnaW5zLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9Xb3JrU3BhY2UvcGFuZGEtdHYvYnVpbGQvcGx1Z2lucy50c1wiO2ltcG9ydCB7IFZhcmxldEltcG9ydFJlc29sdmVyIH0gZnJvbSAnQHZhcmxldC9pbXBvcnQtcmVzb2x2ZXInXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBqc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcbmltcG9ydCBhdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgY29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHZ1ZVJvdXRlciBmcm9tICd1bnBsdWdpbi12dWUtcm91dGVyL3ZpdGUnXG5pbXBvcnQgaWNvbiBmcm9tICdAdmFybGV0L3VucGx1Z2luLWljb24tYnVpbGRlci92aXRlJ1xuaW1wb3J0IHVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSdcbmltcG9ydCB7IEVkaXRhYmxlVHJlZU5vZGUgfSBmcm9tICd1bnBsdWdpbi12dWUtcm91dGVyL3R5cGVzJ1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSdcbi8vIGltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInXG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhY2tSb3V0ZSB7XG4gIG5hbWU6IHN0cmluZ1xuICBjaGlsZHJlbj86IFN0YWNrUm91dGVbXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVml0ZVBsdWdpbnMoKSB7XG4gIHJldHVybiBbXG4gICAgdnVlKHtcbiAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgIHRyYW5zZm9ybUFzc2V0VXJsczoge1xuICAgICAgICAgIGltZzogWydzcmMnXSxcbiAgICAgICAgICB2aWRlbzogWydzcmMnXSxcbiAgICAgICAgICBhdWRpbzogWydzcmMnXSxcbiAgICAgICAgICAndmFyLWltYWdlJzogWydzcmMnXSxcbiAgICAgICAgICAndmFyLWF2YXRhcic6IFsnc3JjJ10sXG4gICAgICAgICAgJ3Zhci1jYXJkJzogWydzcmMnXSxcbiAgICAgICAgICAndmFyLWFwcC1iYXInOiBbJ2ltYWdlJ10sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuXG4gICAganN4KCksXG5cbiAgICB1bm9DU1MoKSxcblxuICAgIGljb24oeyBkaXI6ICdzcmMvYXNzZXRzL2ljb25zJywgb25EZW1hbmQ6IHRydWUgfSksXG5cbiAgICBjb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW1ZhcmxldEltcG9ydFJlc29sdmVyKCldLFxuICAgIH0pLFxuXG4gICAgYXV0b0ltcG9ydCh7XG4gICAgICBpbXBvcnRzOiBbXG4gICAgICAgICd2dWUnLFxuICAgICAgICAndnVlLXJvdXRlcicsXG4gICAgICAgICdwaW5pYScsXG4gICAgICAgICd2dWUtaTE4bicsXG4gICAgICAgIHtcbiAgICAgICAgICAnQC91c2UnOiBbJ3VzZUFwcFJvdXRlciddLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIHJlc29sdmVyczogW1ZhcmxldEltcG9ydFJlc29sdmVyKHsgYXV0b0ltcG9ydDogdHJ1ZSB9KV0sXG4gICAgICBlc2xpbnRyYzogeyBlbmFibGVkOiB0cnVlIH0sXG4gICAgfSksXG5cbiAgICB2dWVSb3V0ZXIoe1xuICAgICAgcm91dGVzRm9sZGVyOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6ICdzcmMvcGFnZXMnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3JjOiAnc3JjL3N0YWNrcycsXG4gICAgICAgICAgcGF0aDogJ3N0YWNrcy8nLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIGV4Y2x1ZGU6IFsnKiovY29tcG9uZW50cy8qKicsICcqKi91c2UvKionXSxcbiAgICAgIGV4dGVuZFJvdXRlKHJvdXRlKSB7XG4gICAgICAgIGNvbnN0IHN0YWNrcyA9IChyb3V0ZS5tZXRhPy5zdGFja3MgPz8gW10pIGFzIFN0YWNrUm91dGVbXVxuICAgICAgICBjb25zdCBwcm9jZXNzU3RhY2tzID0gKHJvdXRlOiBFZGl0YWJsZVRyZWVOb2RlLCBzdGFja3M6IChTdGFja1JvdXRlIHwgc3RyaW5nKVtdKSA9PiB7XG4gICAgICAgICAgc3RhY2tzLmZvckVhY2goKHN0YWNrKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc1N0cmluZ2lmeVN0YWNrID0gdHlwZW9mIHN0YWNrID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGlzU3RyaW5naWZ5U3RhY2sgPyBzdGFjayA6IHN0YWNrLm5hbWVcbiAgICAgICAgICAgIGNvbnN0IG5ld1JvdXRlID0gcm91dGUuaW5zZXJ0KG5hbWUsIGAvc3JjL3N0YWNrcy8ke25hbWV9LnZ1ZWApXG5cbiAgICAgICAgICAgIGlmICghaXNTdHJpbmdpZnlTdGFjayAmJiBzdGFjay5jaGlsZHJlbikge1xuICAgICAgICAgICAgICBwcm9jZXNzU3RhY2tzKG5ld1JvdXRlLCBzdGFjay5jaGlsZHJlbilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcHJvY2Vzc1N0YWNrcyhyb3V0ZSwgc3RhY2tzKVxuICAgICAgfSxcbiAgICB9KSxcblxuICAgIFZpdGVQV0Eoe1xuICAgICAgLyoqXG4gICAgICAgKiBAZGVmYXVsdCBwcm9tcHRcbiAgICAgICAqIEBhdXRvVXBkYXRlIFx1NEYxQVx1NTcyOHN3LmpzXHU2NzA5XHU1M0Q4XHU1MkE4XHU3Njg0XHU2MEM1XHU1MUI1XHU0RTBCXHU4MUVBXHU1MkE4XHU2NkY0XHU2NUIwXG4gICAgICAgKiBAcHJvbXB0IFx1NEYxQVx1ODlFNlx1NTNEMVx1NzZGOFx1NTE3M1x1OTRBOVx1NUI1MFx1NTFGRFx1NjU3MFx1RkYwQ1x1OEJBOVx1NEY2MFx1NjI0Qlx1NTJBOFx1OTAwOVx1NjJFOVx1NjZGNFx1NjVCMFxuICAgICAgICovXG4gICAgICByZWdpc3RlclR5cGU6ICdwcm9tcHQnLFxuICAgICAgLy8gXHU1RjAwXHU1M0QxXHU3M0FGXHU1ODgzXHU0RTJEXHU2N0U1XHU3NzBCXG4gICAgICBkZXZPcHRpb25zOiB7XG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgIHR5cGU6ICdtb2R1bGUnLFxuICAgICAgICAvLyBuYXZpZ2F0ZUZhbGxiYWNrIFx1NjYyRiBXb3JrYm94IFx1NzY4NFx1NEUwMFx1NEUyQVx1OTE0RFx1N0Y2RVx1OTg3OVx1RkYwQ1x1NzUyOFx1NEU4RVx1NjMwN1x1NUI5QVx1NUY1M1x1NUJGQ1x1ODIyQVx1OEJGN1x1NkM0Mlx1RkYwOFx1OTAxQVx1NUUzOFx1NjYyRiBIVE1MIFx1OTg3NVx1OTc2Mlx1OEJGN1x1NkM0Mlx1RkYwOVx1NTkzMVx1OEQyNVx1NjVGNlx1RkYwQ1x1NUU5NFx1OEJFNVx1OEZENFx1NTZERVx1NTRFQVx1NEUyQVx1OTg3NVx1OTc2Mlx1NEY1Q1x1NEUzQVx1NTZERVx1OTAwMFx1MzAwMlx1OEZEOVx1OTAxQVx1NUUzOFx1NzUyOFx1NEU4RVx1NzlCQlx1N0VCRlx1NjUyRlx1NjMwMVx1RkYwQ1x1Nzg2RVx1NEZERFx1NzUyOFx1NjIzN1x1NTM3M1x1NEY3Rlx1NTcyOFxuICAgICAgICBuYXZpZ2F0ZUZhbGxiYWNrOiAnaW5kZXguaHRtbCcsXG4gICAgICB9LFxuICAgICAgLyoqXG4gICAgICAgKiBAZGVmYXVsdCBnZW5lcmF0ZVNXXG4gICAgICAgKiBAZ2VuZXJhdGVTVyBcdTgxRUFcdTUyQThcdTY3ODRcdTVFRkFcdTZDRThcdTUxOENTV1xuICAgICAgICogQGluamVjdE1hbmlmZXN0IFx1NjI0Qlx1NTJBOFx1Njc4NFx1NUVGQVx1NkNFOFx1NTE4Q1NXXG4gICAgICAgKi9cbiAgICAgIHN0cmF0ZWdpZXM6ICdpbmplY3RNYW5pZmVzdCcsXG4gICAgICBzcmNEaXI6ICdzcmMnLFxuICAgICAgZmlsZW5hbWU6ICdzdy50cycsXG4gICAgICBwd2FBc3NldHM6IHtcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICBjb25maWc6IHRydWUsXG4gICAgICB9LFxuICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgbmFtZTogJ1BhbmRhIFRWJyxcbiAgICAgICAgc2hvcnRfbmFtZTogJ1BhbmRhIFRWJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdQYW5kYSBUViAtIEZpbmQgeW91ciBmYXZvcml0ZSBtb3ZpZXMnLFxuICAgICAgICBjYXRlZ29yaWVzOiBbJ3Nob3J0LXR2J10sXG4gICAgICAgIGJhY2tncm91bmRfY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgdGhlbWVfY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgc3RhcnRfdXJsOiAnL3BhbmRhLXR2JyxcbiAgICAgICAgZGlzcGxheTogJ3N0YW5kYWxvbmUnLFxuICAgICAgICBpY29uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ3BhbmRhNTEyeDUxMi5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAncGFuZGExOTJ4MTkyLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzE5MngxOTInLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdwYW5kYTY0eDY0LnBuZycsXG4gICAgICAgICAgICBzaXplczogJzY0eDY0JyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHNob3J0Y3V0czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdIb21lJyxcbiAgICAgICAgICAgIHNob3J0X25hbWU6ICdIb21lJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnSG9tZScsXG4gICAgICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgICAgIGljb25zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzcmM6ICdwYW5kYTUxMng1MTIucG5nJyxcbiAgICAgICAgICAgICAgICBzaXplczogJzUxMng1MTInLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBzY3JlZW5zaG90czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ3NjcmVlbnNob3QxLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzU0MHg5NjAnLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdzY3JlZW5zaG90Mi5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICc1NDB4OTYwJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgd29ya2JveDoge1xuICAgICAgICBjbGVhbnVwT3V0ZGF0ZWRDYWNoZXM6IHRydWUsXG4gICAgICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSksXG5cbiAgICAvLyB2aXN1YWxpemVyKHtcbiAgICAvLyAgIGVtaXRGaWxlOiB0cnVlLFxuICAgIC8vICAgZmlsZW5hbWU6ICdzdGF0cy5odG1sJyxcbiAgICAvLyB9KSxcbiAgXVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1UCxTQUFTLGVBQWUsV0FBVzs7O0FDQXhCLElBQU0sZUFBZSxNQUFNLFFBQVEsSUFBSSxhQUFhOzs7QUNBbkQsU0FBUyw0QkFBNEI7QUFDeFMsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGVBQWU7QUFDdEIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sWUFBWTtBQUVuQixTQUFTLGVBQWU7QUFRakIsU0FBUyxvQkFBb0I7QUFDbEMsU0FBTztBQUFBLElBQ0wsSUFBSTtBQUFBLE1BQ0YsVUFBVTtBQUFBLFFBQ1Isb0JBQW9CO0FBQUEsVUFDbEIsS0FBSyxDQUFDLEtBQUs7QUFBQSxVQUNYLE9BQU8sQ0FBQyxLQUFLO0FBQUEsVUFDYixPQUFPLENBQUMsS0FBSztBQUFBLFVBQ2IsYUFBYSxDQUFDLEtBQUs7QUFBQSxVQUNuQixjQUFjLENBQUMsS0FBSztBQUFBLFVBQ3BCLFlBQVksQ0FBQyxLQUFLO0FBQUEsVUFDbEIsZUFBZSxDQUFDLE9BQU87QUFBQSxRQUN6QjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUVELElBQUk7QUFBQSxJQUVKLE9BQU87QUFBQSxJQUVQLEtBQUssRUFBRSxLQUFLLG9CQUFvQixVQUFVLEtBQUssQ0FBQztBQUFBLElBRWhELFdBQVc7QUFBQSxNQUNULFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQztBQUFBLElBQ3BDLENBQUM7QUFBQSxJQUVELFdBQVc7QUFBQSxNQUNULFNBQVM7QUFB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
