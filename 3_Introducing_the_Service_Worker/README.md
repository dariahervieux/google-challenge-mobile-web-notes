### Resourcese

Here are some resources I found useful.

[Graphics](https://github.com/delapuente/service-workers-101) summurizing SW major concepts.

Http cache related articles:
https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching

PWA related articles:
https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/offline-for-pwa


### Service Worker manipulations

Credits to vargalaszlo1981 for provided code snippets.

```javascript
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
```


### 22 Adding UX to the update Process

Reminder: New SW will **stay in waiting state** untill all pages using it will go away.

When registering a SW on call back (resolved Promise) we have a [ServiceWorkerRegistration](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration) object:
```javascript
navigator
   .serviceWorker
   .register('/sw.js')
   .then(function (reg) {
      // reg object properties:
      reg.unregister(); // unregister SW
      reg.update();     // update SW
      reg.installing;   //an update on its way/in progress - thrown away if install fails
      reg.waiting;      // there is a newer SW ready and waiting to take over
      reg.active;
      reg.addEventListener('updatefound', function () { // registration object emits a updatefound event when a new serviceworker is found
         // reg.installing has changed
      })
   });
```

Regestration methods/properties are mapped directly to DevTools features.

SW States:
* installed - installation completed successfully but not activated yet
* activating - activate event has fired but not complete yet or activated
* activated - the SW is ready to receive fetch events 
* redundant - the SW has been thrown away, for example when superdeaded by a newer SW or failed to install

installing -> installed -> activating -> activated, or redundant

The SW fires an event when its state changes:
```javascript
sw.addEventListener('statechange', function () { 
	//do something
});
```

Registration object emits an event when a new SW update is found (installing becomes waiting):
```javascript
reg.addEventListener('updatefound', function (worker) {
	//fires when we track the state of the installing worker
	worker.addEventListener('statechange', function () {
		if (this.state == 'installed') {
			  // there is an update ready - need to tell the user
		}
	});
});
```

We can notify the user about SW changes:
```javascript
if (reg.waiting) { /*there's an update ready*/ }
if (reg.installing) {
    // there is an update in progress
	// adding listener to track update progress
    reg.installing.addEventListener('statechange', function () {
		if (this.state == 'installed') {
			// there is an update ready - need to tell the user
		}
    });
}
```

We can inspect the state of SW themselves:

* `reg.installing.state` is 'installing'
* `reg.waiting.state` is 'installed'
* `reg.active.state` is 'activated'


Attention: `navigator.serviceWorker.controller`  refers to the SW that **controls this page**. If it doesnt exist that means the page did not load using a SW and content was loaded from the network.