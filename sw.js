"use strict";
(function () {
    var cacheVersion = "202003242004";
    var staticImageCacheName = "image" + cacheVersion;
    var staticAssetsCacheName = "assets" + cacheVersion;
    var contentCacheName = "content" + cacheVersion;
    var vendorCacheName = "vendor" + cacheVersion;
    var maxEntries = 100;
    self.importScripts("https://cdnjs.cloudflare.com/ajax/libs/sw-toolbox/3.6.1/sw-toolbox.js");
    self.toolbox.options.debug = false;
    self.toolbox.options.networkTimeoutSeconds = 5;
    self.toolbox.precache([
        '/offline-001.html',
        '/offline-r.svg',
        '/Lucca-Regular.otf'
    ]);
    self.toolbox.router.get("/myfiles/js/(.*)", self.toolbox.networkFirst, {
    });
    self.toolbox.router.get("/myfiles/img/(.*)", self.toolbox.cacheFirst, {
        cache: {
            name: staticAssetsCacheName,
            maxEntries: maxEntries,
            offlineFallbackimage: '/offline-r.svg'
        }
    });
    self.toolbox.router.get("/", self.toolbox.networkFirst, {});
    self.toolbox.router.get("/(.*)", self.toolbox.networkFirst, {
        origin: /home\.asec01\.net/,
        cache: {
            name: staticAssetsCacheName,
            maxEntries: maxEntries
        }
    });
    self.toolbox.router.get("/(.*)", self.toolbox.cacheFirst, {
        origin: /cdnjs\.cloudflare\.com/,
        cache: {
            name: staticAssetsCacheName,
            maxEntries: maxEntries,
            offlineFallbackimage: '/offline-r.svg'
        }
    });
    self.toolbox.router.get("/(.*)", self.toolbox.cacheFirst, {
        origin: /cdnjs\.jsdelivr\.net/,
        cache: {
            name: staticAssetsCacheName,
            maxEntries: maxEntries
        }
    });
    self.toolbox.router.get("/", self.toolbox.networkFirst, {
        cache: {
            name: contentCacheName,
            maxEntries: maxEntries,
            offlineFallbackimage: '/offline-r.svg'
        }
    });
    self.toolbox.router.get("/(.*)", self.toolbox.networkFirst, {
        cache: {
            name: contentCacheName,
            maxEntries: maxEntries,
            offlineFallbackimage: '/offline-r.svg'
        }
    });
    self.toolbox.router.get("/next/config.json", self.toolbox.networkOnly, {
        origin: /disqus\.com/
    });
    self.toolbox.router.get("/api/(.*)", self.toolbox.networkOnly, {
        origin: /disqus\.com/
    });
    self.toolbox.router.get("/(.*)", self.toolbox.networkOnly, {
        origin: /blog-asec01-net\.disquscdn\.com/,
        cache: {
            name: vendorCacheName,
            maxEntries: maxEntries
        }
    });
    self.toolbox.router.get("/(.*)", self.toolbox.cacheFirst, {
        origin: /a\.disquscdn\.com/,
        cache: {
            name: vendorCacheName,
            maxEntries: maxEntries
        }
    });
    self.toolbox.router.get("/(.*)", self.toolbox.cacheFirst, {
        origin: /c\.disquscdn\.com/,
        cache: {
            name: vendorCacheName,
            maxEntries: maxEntries
        }
    });
    self.toolbox.router.get("/(.*)", self.toolbox.cacheFirst, {
        origin: /uploads\.disquscdn\.com/,
        cache: {
            name: vendorCacheName,
            maxEntries: maxEntries
        }
    });
    self.toolbox.router.get("/(.*)", self.toolbox.cacheFirst, {
        origin: /media\.disquscdn\.com/,
        cache: {
            name: vendorCacheName,
            maxEntries: maxEntries
        }
    });
    self.toolbox.router.get("/(.*)", self.toolbox.cacheFirst, {
        origin: /referrer\.disqus\.com/,
        cache: {
            name: vendorCacheName,
            maxEntries: maxEntries
        }
    });
    self.toolbox.router.get("/(.*)", self.toolbox.networkOnly, {
        origin: /(www\.google-analytics\.com|ssl\.google-analytics\.com)/,
        cache: {
            name: vendorCacheName,
            maxEntries: maxEntries
        }
    });
    self.toolbox.router.get('/(.*)', function (req, vals, opts) {
        return toolbox.networkFirst(req, vals, opts)
            .catch(function (error) {
                if (req.method === 'GET' && req.headers.get('accept').includes('text/html')) {
                    return toolbox.cacheOnly(new Request('/offline-001.html'), vals, opts);
                }
                throw error;
            });
    });
    self.toolbox.router.get("/(.*).php(.*)", self.toolbox.networkOnly);
    self.toolbox.router.get("/sw.js", self.toolbox.networkFirst), self.toolbox.router.get("/(.*).php(.*)", self.toolbox.networkOnly), self.addEventListener("install", function (event) {
        return event.waitUntil(self.skipWaiting())
    });
    self.addEventListener("activate", function (event) {
        return event.waitUntil(self.clients.claim())
    })
})();