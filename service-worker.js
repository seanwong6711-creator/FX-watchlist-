const CACHE_NAME = "fx-watchlist-v1";


const FILES_TO_CACHE = [

"./",

"./index.html",

"./style.css",

"./app.js",

"./currencies.json",

"./manifest.json"

];



// Install cache

self.addEventListener(
"install",
event => {

event.waitUntil(

caches.open(CACHE_NAME)
.then(cache => {

return cache.addAll(FILES_TO_CACHE);

})

);

});




// Load from cache when offline

self.addEventListener(
"fetch",
event => {

event.respondWith(

caches.match(event.request)
.then(response => {

return response || fetch(event.request);

})

);

});
