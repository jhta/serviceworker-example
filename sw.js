var log = console.log.bind(console);//bind our console to a variable
var version = "0.0.1";
var cacheName = "sw-demo";
var cache = cacheName + "-" + version;

var filesToCache = [
  'index.html',
  '/',
  'images/1.jpg',
  'images/2.jpg',
  'images/3.jpg',
  'images/4.jpg',
  'images/5.jpg'
];

//Add event listener for install
self.addEventListener("install", function(event) {
    log('[ServiceWorker] Installing...');
    event.waitUntil(caches
    .open(cache)//open this cache from caches and it will return a Promise
    .then(function(cache) { //catch that promise
       log('[ServiceWorker] Caching files');
       cache.addAll(filesToCache);//add all required files to cache it also returns a Promise
     })
   );
});
//Add event listener for fetch
self.addEventListener("fetch", function(event) {
    log('[ServiceWorker] Requested url :-', event.request.url);
    event.respondWith(
    //it either expects a Response object as a parameter or a promise that resolves to a Response object
    caches.match(event.request)//If there is a match in the cache of this request object
      .then(function(response) {
        if(response) {
          log("Fulfilling "+event.request.url+" from cache.");
          //returning response object
          return response;
        } else {
          log(event.request.url+" not found in cache fetching from network.");
          //return promise that resolves to Response object
          return fetch(event.request);
        }
      })
    );
});

self.addEventListener('activate', function(event) {
  log('[ServiceWorker] Activate');
  event.waitUntil(
  caches.keys()//it will return all the keys in the cache as an array
  .then(function(keyList) {
    //run everything in parallel using Promise.all()
    Promise.all(keyList.map(function(key) {
      if (key !== cacheName) {
        log('[ServiceWorker] Removing old cache ', key);
        //if key doesn`t matches with present key
        return caches.delete(key);
      }
    }));
  }));
});
