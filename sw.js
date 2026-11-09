const CACHE='jo-fishing-v1.0.0';
const FILES=['./','index.html','style.css','app.js','engine.js','data.js','manifest.webmanifest','version.json','assets/waters.png','assets/fish.png','assets/hero.png','assets/icon.svg','assets/fonts/LINESeedKR-Rg.woff2','assets/fonts/LINESeedKR-Bd.woff2'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('jo-fishing-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',event=>{const u=new URL(event.request.url);if(event.request.method!=='GET'||u.origin!==location.origin)return;if(u.pathname.endsWith('version.json')){event.respondWith(fetch(event.request));return;}event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));});
