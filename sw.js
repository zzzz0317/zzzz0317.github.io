"use strict";
(function() {
    var cacheVersion = "201710050104";
    var staticImageCacheName = "image" + cacheVersion;
    var staticAssetsCacheName = "assets" + cacheVersion;
    var contentCacheName = "content" + cacheVersion;
    var vendorCacheName = "vendor" + cacheVersion;
    var maxEntries = 100;
    self.importScripts("https://cdnjs.cat.net/ajax/libs/sw-toolbox/3.6.1/sw-toolbox.js");
    self.toolbox.options.debug = false;
    self.toolbox.options.networkTimeoutSeconds = 5;
    self.toolbox.precache([
        '/offline-001.html',
        '/offline.svg',
		'/offline-r.svg',
        '/Lucca-Regular.otf'
    ]);

	
    self.toolbox.router.get("/img/random/(.*)", self.toolbox.cacheFirst, {
        origin: /zz-res\.b0\.upaiyun\.com/,
        maxEntries: maxEntries,
        offlineFallbackimage: '/offline.svg'
    });
	self.toolbox.router.get("/img/sidebar_header.png", self.toolbox.cacheFirst, {
        origin: /zz-res\.b0\.upaiyun\.com/,
        maxEntries: maxEntries,
        offlineFallbackimage: '/offline.svg'
    });
	self.toolbox.router.get("/blog/(.*)", self.toolbox.cacheFirst, {
        origin: /zz-res\.b0\.upaiyun\.com/,
        maxEntries: maxEntries,
        offlineFallbackimage: '/offline.svg'
    });
	
	
	
	
	self.toolbox.router.get("/(.*)", self.toolbox.networkFirst, {
        origin: /avatars0\.githubusercontent\.com/
    });
	self.toolbox.router.get("/(.*)", self.toolbox.networkFirst, {
        origin: /fonts-gstatic\.proxy\.ustclug\.org/
    });
	self.toolbox.router.get("/(.*)", self.toolbox.networkFirst, {
        origin: /fonts\.proxy\.ustclug\.org/
    });
	self.toolbox.router.get("/(.*)", self.toolbox.networkFirst, {
        origin: /imsun\.github\.io/
    });
	self.toolbox.router.get("/(.*)", self.toolbox.cacheFirst, {
        origin: /cdnjs\.cat\.net/,
        cache: {
            name: staticAssetsCacheName,
            maxEntries: maxEntries,
            offlineFallbackimage: '/offline.svg'
        }
    });
    self.toolbox.router.get("/(.*)", self.toolbox.networkOnly, {
        origin: /(www\.google-analytics\.com|ssl\.google-analytics\.com)/,
        cache: {
            name: vendorCacheName,
            maxEntries: maxEntries
        }
    });
    self.toolbox.router.get("/(.*)", self.toolbox.networkFirst, {
        origin: /blog\.asec01\.net/
    });
    self.toolbox.router.get('/(.*)', function(req, vals, opts) {
      return toolbox.networkFirst(req, vals, opts)
        .catch(function(error) {
          if (req.method === 'GET' && req.headers.get('accept').includes('text/html')) {
            return toolbox.cacheOnly(new Request('/offline-001.html'), vals, opts);
			log("No Internet connection....");
			log("Service Worker Enabled");
			
          }
          throw error;
        });
    });
    self.toolbox.router.get("/sw.js", self.toolbox.networkFirst), self.toolbox.router.get("/(.*).php(.*)", self.toolbox.networkOnly), self.addEventListener("install", function(event) {
        return event.waitUntil(self.skipWaiting())
    });
    self.addEventListener("activate", function(event) {
        return event.waitUntil(self.clients.claim())
    })
})();