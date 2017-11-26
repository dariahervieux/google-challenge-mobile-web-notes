For now, using vargalaszlo1981 notes as is. 

`
//Register a serviceWorker

if (!navigator.serviceWorker) 
   return;

navigator
   .serviceWorker
   .register('/sw.js', {scope: '/'}) // scope is optional, you can provide in order to be active on a specific part of the page. Default is '/'
   .then(() => console.log('SW regisred'))
   .catch((e) => console.log(`Registration failed ${e}`))

   // Hijacking request

   self
   .addEventListener('fetch', function (event) {
      event.respondWith(new Response('Hello <b class="a-winner-is-me">world</b>', {
         headers: {
            'Content-type': 'text/html'
         } // setting content-type to HTML you can pass value with HTML markup
      }))
   });

self.addEventListener('install', function (event) { // install event: here can we collect every information from the web and store in a cache
   event.waitUntil()
});

self.addEventListener('fetch', function (event) {
   event.respondWith(fetch(event.request).then(function (response) {
      if (response.status === 404) {
         return fetch('/imgs/dr-evil.gif');
      }
      return response;
   }).catch(function () {
      return new Response('Failed');
   }))
});

//caches API

caches
   .open('name-of-the-cache') // return a promise, if there is no cache with that name then it creates one
   .then(function (cache) { // if the promise resolved successfully you can interact with the cache through the cache object from the argument
      //...
   });

cache.put(request, response); // cache a response for a request. request can be a Request object or an url, response is the Response object to cache

cache.addAll([ // it takes an array of request or URL, fetches them and puts the request-response pairs into the cache
   '/foo',
   '/bar'
]);

cache.match(request); // get response out of the cache passing in a request or URL

caches.match(request); // it tries to find a match in any cache, starting with the oldest

self.addEventListener('activate', function (event) { // activate fires when the new service worker becomes active, and the previous SW gone. Perfect time to delete old caches
   // ...
   caches.delete(cacheName); //delete caches, retunrs promise
});

navigator
   .serviceWorker
   .register('/sw.js')
   .then(function (reg) {
      // reg object properties:
      reg.unregister();
      reg.update();
      reg.installing; //an update on its way/in progress - thrown away if install fails
      reg.waiting; // there is an updated SW and waiting to take over
      reg.active;
      reg.addEventListener('updatefound', function () { // registration object emits a updatefound event when a new serviceworker is found
         // reg.installing has changed
      })
   });

var sw = reg.installing; // on the SW re object themselves you can check if there's a new serviceworker in queue
cosole.log(sw.state); // logs "installing" if the installer has fired but not completed
// "installed" - installation completed successfully but not activated yet
// "activating" - activate event has fired but not complete yet or activated
// "activated" - the SW is ready to receive fetch events 
// "redundant" - the SW has been thrown away

sw.addEventListener('statechange', function () { // SW fires a statechange event whenever it's .state property changes
   // sw.state has changed
});

navigator.serviceWorker.controller // refers to the SW that controls this page - if it's not exist that means the page did not load using a SW and content was loaded from network

if (reg.installing) {
   // there is an update in progress
      reg
            .installing
            .addEventListener('statechange', function () {
                  if (this.state == 'installed') {
                  // there is an update ready - need to tell the user
                  }
            });
}

reg
   .addEventListener('updatefound', function (worker) {
      //fires when we track the state of the installing worker
      worker
            .addEventListener('statechange', function () {
            if (this.state == 'installed') {
                  // there is an update ready - need to tell the user
            }
            });
   });

// triggering an update

self.skipWaiting(); // SW can call skipWaiting while it's waiting or installing - this signals that it should immeadeatly take over - call it when user hits refresh button
reg
   .installing
   .postMessage({action: 'skipWaiting'}) //page can send messages to any SW using postMessage

self.addEventListener('message', function (event) { //SW can listen for postMessages and can do specific things, here's a good ide to call .skipWaiting() when a 'skipWaiting' message arrives
   event.data; //{foo: 'bar'}
});

navigator
   .serviceWorker
   .addEventListener('controllerchange', function () { // serviceWorker fires an event when the controlling serviceWorker changes
      //navigator.serviceWorker.controller has changed - use this signal to reload the page
   })
`