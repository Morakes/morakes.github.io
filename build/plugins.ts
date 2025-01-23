import { VarletImportResolver } from '@varlet/import-resolver'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import vueRouter from 'unplugin-vue-router/vite'
import icon from '@varlet/unplugin-icon-builder/vite'
import unoCSS from 'unocss/vite'
import { EditableTreeNode } from 'unplugin-vue-router/types'
import { VitePWA } from 'vite-plugin-pwa'

export interface StackRoute {
  name: string
  children?: StackRoute[]
}

export function createVitePlugins() {
  return [
    vue({
      template: {
        transformAssetUrls: {
          img: ['src'],
          video: ['src'],
          audio: ['src'],
          'var-image': ['src'],
          'var-avatar': ['src'],
          'var-card': ['src'],
          'var-app-bar': ['image'],
        },
      },
    }),

    jsx(),

    unoCSS(),

    icon({ dir: 'src/assets/icons', onDemand: true }),

    components({
      resolvers: [VarletImportResolver()],
    }),

    autoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        'vue-i18n',
        {
          '@/use': ['useAppRouter'],
        },
      ],
      resolvers: [VarletImportResolver({ autoImport: true })],
      eslintrc: { enabled: true },
    }),

    vueRouter({
      routesFolder: [
        {
          src: 'src/pages',
        },
        {
          src: 'src/stacks',
          path: 'stacks/',
        },
      ],
      exclude: ['**/components/**', '**/use/**'],
      extendRoute(route) {
        const stacks = (route.meta?.stacks ?? []) as StackRoute[]
        const processStacks = (route: EditableTreeNode, stacks: (StackRoute | string)[]) => {
          stacks.forEach((stack) => {
            const isStringifyStack = typeof stack === 'string'
            const name = isStringifyStack ? stack : stack.name
            const newRoute = route.insert(name, `/src/stacks/${name}.vue`)

            if (!isStringifyStack && stack.children) {
              processStacks(newRoute, stack.children)
            }
          })
        }

        processStacks(route, stacks)
      },
    }),

    VitePWA({
      /**
       * @default prompt
       * @autoUpdate 会在sw.js有变动的情况下自动更新
       * @prompt 会触发相关钩子函数，让你手动选择更新
       */
      registerType: 'prompt',
      // 开发环境中查看
      devOptions: {
        enabled: true,
        type: 'module',
        // navigateFallback 是 Workbox 的一个配置项，用于指定当导航请求（通常是 HTML 页面请求）失败时，应该返回哪个页面作为回退。这通常用于离线支持，确保用户即使在
        navigateFallback: 'index.html',
      },
      /**
       * @default generateSW
       * @generateSW 自动构建注册SW
       * @injectManifest 手动构建注册SW
       */
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      pwaAssets: {
        disabled: false,
        config: true,
      },
      manifest: {
        name: 'Panda TV',
        short_name: 'Panda TV',
        description: 'Panda TV - Find your favorite movies',
        categories: ['short-tv'],
        background_color: '#ffffff',
        theme_color: '#ffffff',
        start_url: '/',
        display: 'standalone',
        icons: [
          {
            src: '/panda512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/panda192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/panda64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
        ],
        shortcuts: [
          {
            name: 'Home',
            short_name: 'Home',
            description: 'Home',
            url: '/',
            icons: [
              {
                src: '/panda512x512.png',
                sizes: '512x512',
                type: 'image/png',
              },
            ],
          },
        ],
        screenshots: [
          {
            src: '/screenshot1.png',
            sizes: '540x960',
            type: 'image/png',
          },
          {
            src: '/screenshot2.png',
            sizes: '540x960',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        sourcemap: true,
      },
    }),
  ]
}
