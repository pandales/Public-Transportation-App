var currentCacheName = 'public-transportation-v1';

self.addEventListener('install', function (event) {
  event.waitUntil(

    caches.open(currentCacheName).then(function (cache) {
      return cache.addAll([
        '/',
        'bower_components/angular-material/angular-material.css',
        'styles/main.css',
        'views/schedule.html',
        'views/schedule.html',
        'views/directives/platform-card.html ',
        'views/view-route.html',

        // TODO: Replace this to the minify js for dist
        /*'scripts/app.js',*/
        'bower_components/angular/angular.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/angular-xml/angular-xml.js',
        'bower_components/angular-material/angular-material.js',
        'bower_components/angular-messages/angular-messages.js',
        'bower_components/angular-aria/angular-aria.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/x2js/xml2json.min.js',
        'bower_components/lodash/lodash.js',
/*        'scripts/directives/platform-card.js',
        'scripts/directives/platform-card.js',
        'scripts/controllers/view-route.js',
        'scripts/controllers/schedule.js',
        'scripts/controllers/main.js',
        'scripts/services/local-storage.js',
        'scripts/services/station.js',
        'images/trainstation1.jpg'*/
      ]);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('public-transportation') &&
            cacheName != currentCacheName;
        })
          .map(function (oldCacheName) {
            return caches.delete(oldCacheName);
          })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
