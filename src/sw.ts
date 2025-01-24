import { precacheAndRoute, cleanupOutdatedCaches, precache } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { isProduction } from '../build/env'

declare let self: ServiceWorkerGlobalScope
self.__WB_DISABLE_DEV_LOGS = true

// 与缓存构建时生成的资源
precacheAndRoute(self.__WB_MANIFEST)

// 缓存api请求
// 使用网络优先策略，有限尝试网络请求，如果失败则使用缓存
registerRoute(
  ({ url }) => url.pathname.startsWith('/h5'),
  new NetworkFirst({
    cacheName: 'api-cache', // 缓存名称
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100, // 最多缓存100个请求
        maxAgeSeconds: 24 * 60 * 60, // 缓存24小时
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200], // 只缓存成功的响应
      }),
      {
        // 这个回调函数决定了如何生成缓存键
        cacheKeyWillBeUsed: async ({ request }) => {
          const url = new URL(request.url)
          // 删除时间戳参数，避免缓存
          const timeParams = ['t', 'timestamp', '_t', 'time', '_timestamp', 'ts']
          timeParams.forEach((param) => url.searchParams.delete(param))
          return new Request(url.toString(), request)
        },
      },
    ],
  })
)

// 图片资源的缓存策略
// 使用 CacheFirst 策略：优先使用缓存，适用于静态资源
// isProduction() &&
//   registerRoute(
//     ({ request }) => request.destination === 'image',
//     new CacheFirst({
//       cacheName: 'image-cache',
//       plugins: [
//         new ExpirationPlugin({
//           maxEntries: 50, // 最多缓存50张图片
//           maxAgeSeconds: 3 * 24 * 60 * 60, // 缓存7天
//         }),
//       ],
//     })
//   )

// 字体文件的缓存策略
// 使用 StaleWhileRevalidate 策略：先返回缓存内容，同时在后台更新缓存
// isProduction() &&
//   registerRoute(
//     ({ request }) => request.destination === 'font',
//     new StaleWhileRevalidate({
//       cacheName: 'font-cache',
//       plugins: [
//         new ExpirationPlugin({
//           maxEntries: 10, // 最多缓存10个字体文件
//           maxAgeSeconds: 30 * 24 * 60 * 60, // 缓存30天
//         }),
//       ],
//     })
//   )

// 缓存静态资源
// isProduction() &&
//   registerRoute(
//     ({ request }) => request.destination === 'style' || request.destination === 'script',
//     new StaleWhileRevalidate({
//       cacheName: 'assets-cache',
//       plugins: [
//         new ExpirationPlugin({
//           maxEntries: 100, // 最多缓存100个请求
//           maxAgeSeconds: 24 * 60 * 60, // 缓存24小时
//         }),
//       ],
//     })
//   )

// 添加默认路由处理未匹配的请求
// registerRoute(
//   // 匹配所有之前未匹配的请求
//   () => true,
//   new NetworkOnly({
//     plugins: [
//       {
//         handlerDidError: async () => {
//           // 当网络请求失败时返回null，避免报错
//           return null
//         },
//       },
//     ],
//   })
// )

// 处理推送通知事件
self.addEventListener('push', (event) => {
  const data = event.data?.json()
  if (data) {
    // 显示通知
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/panda512x512.png',
    })
  }
})

// 处理通知点击事件
self.addEventListener('notificationclick', (event) => {
  // 关闭通知
  event.notification.close()
  // 点击通知时打开网站首页
  event.waitUntil(self.clients.openWindow('/'))
})

// 安装后立即激活 Service Worker
self.skipWaiting()
// Service Worker 激活后立即接管页面
self.clients.claim()

/**
 * 缓存管理：
  自动清理过期缓存
  预缓存重要资源
  为不同类型的资源设置不同的缓存策略
  三种缓存策略：
  API 请求：优先网络请求，网络失败时使用缓存
  图片：优先使用缓存，减少网络请求
  字体：先用缓存响应，同时在后台更新
  推送通知：
  接收服务器推送的消息并显示通知
  处理用户点击通知的行为
  生命周期管理：
  安装后立即激活
  激活后立即接管所有页面
  您可以根据实际需求调整：
  缓存时间
  缓存数量限制
  缓存策略
  通知的显示方式和点击行为
  添加更多的资源类型处理
 */
