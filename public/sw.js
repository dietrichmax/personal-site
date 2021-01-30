<<<<<<< HEAD
if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise((async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]}))},s=(s,a)=>{Promise.all(s.map(e)).then((e=>a(1===e.length?e[0]:e)))},a={require:Promise.resolve(s)};self.define=(s,n,i)=>{a[s]||(a[s]=Promise.resolve().then((()=>{let a={};const c={uri:location.origin+s.slice(1)};return Promise.all(n.map((s=>{switch(s){case"exports":return a;case"module":return c;default:return e(s)}}))).then((e=>{const s=i(...e);return a.default||(a.default=s),a}))})))}}define("./sw.js",["./workbox-8778d57b"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/GAl08WfIim_av6nFD1D3o/_buildManifest.js",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/_next/static/GAl08WfIim_av6nFD1D3o/_ssgManifest.js",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/_next/static/chunks/1ad99113b62f156a94fbf28e27edb10b90c88a87.7c6ec085f0e7650e804c.js",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/_next/static/chunks/29107295.2d77a9f3ea56b8b24e64.js",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/_next/static/chunks/39374740d0e80d6f7e419ed025fe2df2ce866c46.e6190e353ec0063cad90.js",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/_next/static/chunks/5570e264ffe48ce1659acdc636bd8ae22872104b.74207a211e437b2c38ed.js",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/_next/static/chunks/59b219cd0f71863461df34ba805b8ebc621fae63.0eb2d4c185fb1971c698.js",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/_next/static/chunks/commons.c81b2d3600a37ff08dce.js",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/_next/static/chunks/da038609794fce2eccdce10d3a8f4377f3701a1f.95a1b13e1dcc82084b37.js",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/_next/static/chunks/ea88be26.26b57d1a193a9ade9a1d.js",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/_next/static/chunks/framework.29f9e2f3d4a33bafbaa5.js",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/_next/static/chunks/main-314c7f4c26e006a4cd70.js",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/_next/static/chunks/pages/%5Bslug%5D-0f70fbd55113b3ec3df3.js",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/_next/static/chunks/pages/_app-ed969a71c411fdce0145.js",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/_next/static/chunks/pages/_error-36d7958542212be1c228.js",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/_next/static/chunks/pages/articles-b8b12a6904d5f768a765.js",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/_next/static/chunks/pages/articles/%5Bslug%5D-23b99d4febb3c605e4c1.js",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/_next/static/chunks/pages/articles/topics/%5Bslug%5D-41631889cbec7f071619.js",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/_next/static/chunks/pages/index-f8fd7fb5ed2e2ce1eff5.js",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/_next/static/chunks/pages/site-stats-8b216f0709971b2e6b46.js",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/_next/static/chunks/pages/sitemap.xml-ec7c723b8ae65517789d.js",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/_next/static/chunks/polyfills-0144c1e1e9d6df7d425b.js",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/_next/static/chunks/webpack-50bee04d1dc61f8adf5b.js",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/_next/static/css/621ca0f16e1c39615174.css",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/_next/static/css/bd82a91cf6e9b0332bd4.css",revision:"GAl08WfIim_av6nFD1D3o"},{url:"/favicon.ico",revision:"091c09c38908f76168913c3ad99cab6e"},{url:"/logos/GIS-Netzwerk-Logo.png",revision:"46fd143caa23a688c9da35159e8b6a7f"},{url:"/logos/GIS-Netzwerk-Logo_1080.png",revision:"34d984c5fc8e638171431a32b53f5a38"},{url:"/logos/android-chrome-192x192.png",revision:"9e465bb59f36f0785b82222d8148fb88"},{url:"/logos/android-chrome-512x512.png",revision:"b50d82000faecce20906f51e83cca52a"},{url:"/logos/apple-touch-icon.png",revision:"ab4494884aa57756b0bcf7d0949fe08b"},{url:"/logos/browserconfig.xml",revision:"b8e5b96dfa8ac9788a70fc02576657b1"},{url:"/logos/favicon-16x16.png",revision:"ab4494884aa57756b0bcf7d0949fe08b"},{url:"/logos/favicon-32x32.png",revision:"ab4494884aa57756b0bcf7d0949fe08b"},{url:"/logos/gis-netzwerk_favicon.png",revision:"c70f8e29cfbc381db9eb1bd75c2aeac0"},{url:"/logos/logo_square.png",revision:"303f8c8d9b24624d30af8b7328910645"},{url:"/logos/logo_square_1024.png",revision:"f75a8124b6655c7802151946ef10d5d5"},{url:"/logos/logo_square_48.png",revision:"c70f8e29cfbc381db9eb1bd75c2aeac0"},{url:"/logos/logo_square_512.png",revision:"b50d82000faecce20906f51e83cca52a"},{url:"/logos/mstile-150x150.png",revision:"ab4494884aa57756b0bcf7d0949fe08b"},{url:"/logos/site.webmanifest",revision:"bea2a98a746270436326ab6263ccdb2d"},{url:"/manifest.json",revision:"b13b9c0c6af94773264ac80a32f5146a"},{url:"/robots.txt",revision:"b6b6cd30efb30525ab84e21781e1a3cc"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
=======
/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./sw.js",['./workbox-32092201'], function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  importScripts();
  self.skipWaiting();
  workbox.clientsClaim();
  workbox.registerRoute(/.*/i, new workbox.NetworkOnly({
    "cacheName": "dev",
    plugins: []
  }), 'GET');

});
//# sourceMappingURL=sw.js.map
>>>>>>> seo
