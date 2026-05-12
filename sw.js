// ナミノオト工程表 Service Worker
const CACHE_NAME = 'naminooto-schedule-v1.1.0';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './favicon.png'
];

// インストール時：必要なリソースをキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch((err) => {
        console.warn('[SW] キャッシュ追加で一部失敗:', err);
      });
    })
  );
  self.skipWaiting();
});

// アクティベート時：古いキャッシュを削除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

// フェッチ時：ネットワーク優先、失敗したらキャッシュ
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Google APIなど外部リクエストはそのまま流す
  if (!req.url.startsWith(self.location.origin)) {
    return;
  }

  // POSTなどは無視
  if (req.method !== 'GET') return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        // 成功したらキャッシュも更新
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(req, resClone).catch(() => {});
        });
        return res;
      })
      .catch(() => {
        // オフラインならキャッシュから返す
        return caches.match(req).then((cached) => {
          return cached || caches.match('./index.html');
        });
      })
  );
});
