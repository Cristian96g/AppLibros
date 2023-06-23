// le pongo un nombre a la version en la que estoy, para ir actualizando si necesitara
const CACHE_NAME = "version1";

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js"
);

// esto es para que el sw no se quede "esperando"
self.addEventListener("messsage", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// esto lo que hace es cachear los recursos a medida que se van cargando
workbox.routing.registerRoute(
  new RegExp("/*"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE_NAME,
  })
);
