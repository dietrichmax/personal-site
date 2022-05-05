if (!self.define) {
  const e = (e) => {
      "require" !== e && (e += ".js")
      let i = Promise.resolve()
      return (
        o[e] ||
          (i = new Promise(async (i) => {
            if ("document" in self) {
              const o = document.createElement("script")
              ;(o.src = e), document.head.appendChild(o), (o.onload = i)
            } else importScripts(e), i()
          })),
        i.then(() => {
          if (!o[e]) throw new Error(`Module ${e} didn’t register its module`)
          return o[e]
        })
      )
    },
    i = (i, o) => {
      Promise.all(i.map(e)).then((e) => o(1 === e.length ? e[0] : e))
    },
    o = { require: Promise.resolve(i) }
  self.define = (i, r, s) => {
    o[i] ||
      (o[i] = Promise.resolve().then(() => {
        let o = {}
        const a = { uri: location.origin + i.slice(1) }
        return Promise.all(
          r.map((i) => {
            switch (i) {
              case "exports":
                return o
              case "module":
                return a
              default:
                return e(i)
            }
          })
        ).then((e) => {
          const i = s(...e)
          return o.default || (o.default = i), o
        })
      }))
  }
}
define("./sw.js", ["./workbox-ea903bce"], function (e) {
  "use strict"
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/XHXccRZ9PkjIU-r0PpBwU/_buildManifest.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/XHXccRZ9PkjIU-r0PpBwU/_ssgManifest.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/0c428ae2-ae452adf048ffe89f993.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/1046-c676b3f2ad3aad150485.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/1803-9d497b59fc3c97cf920e.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/1bfc9850-e11013b466e74dc28897.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/2132-8cb4643891235804b5d0.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/29107295-a36037e5ea1af0472eba.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/3306-f623e85116570714ea84.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/3787-2946af28a78209589073.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/5675-222aaca3641faa438d3b.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/5843-b3507314b503cfd2313b.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/5872-17afbb2f8fea3249941e.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/6168-032e13d3be92e83f88ec.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/6213-5137b7467c3f120285dd.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/7993-e3b325e9d151fd7ef150.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/7f0c75c1-6a0b2d32819f29b9619d.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/9291-1d9c20dc17b9f8bdf0a3.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/95b64a6e-581e1e11e134d8957672.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/9669-0a67f80f587b70b5de98.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/d0447323-cebc2c0502794924179b.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/d94c0b71-ea05b56a3f208ef0c66d.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/framework-20eca4750539b8042025.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/main-a726be3796e780a632a2.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/%5Bslug%5D-a2fec0db41f84c6cb069.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/404-ae77bc78e106d87b8a93.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/_app-8ffc99ac6be67c6e1598.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/_error-1c42644e3800a27b4044.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/about-a33e88c2c5107f645e1b.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/activities-1e0386d1835f0d71baa8.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/activities/%5Bslug%5D-efd87cd21e6439c2c188.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/articles-14a71c87002ff9721ad3.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/articles/%5Bslug%5D-b9e8f179bbd9f9451824.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/articles/feed.xml-da1afe9d7ad374ac6acc.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/blogroll-9b3d59d02543cdd8d06e.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/cv-1aee08bc0d5675980391.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/dashboard-1567c768158bc28753f7.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/feed.xml-abb5855640cc8646dcae.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/feeds-76a0f630e5842c8679da.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/index-64147f06408e369a97a1.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/links-aeca9dce35d13f83ba2a.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/links/%5Bslug%5D-d437562e076f8090977d.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/links/feed.xml-078d69874aaf454d7d1a.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/mailinglist-e01ab63cb5ceaa618958.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/manifest.json-a44edcd54f5e601b1510.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/map-4ed5de641cdc9d00afdf.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/notes-2ac968d7b9ba076647fe.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/notes/%5Bslug%5D-b66244232b2992d797e8.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/notes/feed.xml-72227800ee7518c3f50e.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/now-b8a134710f0981718bfd.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/photos-bd9af2e22c19acf62f75.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/photos/%5Bslug%5D-7c5a6e1441d29ef62090.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/photos/feed.xml-765b5e43cdec02e877b4.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/recipes-e21cde3e1fe70140a5b3.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/recipes/%5Bslug%5D-d69cd31489060dcb3cfe.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/recipes/feed.xml-f117db8b6ecf9fbb3dbd.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/sitemap.xml-4e31bd0adc023b861383.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/topics/%5Bslug%5D-1eebf07a3b106335d65d.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/pages/webmention-13905f3c146c94abbbc5.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/polyfills-b69b38e0e606287ba003.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/chunks/webpack-544748548ef99f27f51c.js",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/css/5e5905684fa727d7bcd6.css",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/css/6678292fb83f2e593f97.css",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/media/ClarityCity-Regular.61d25f87d971cb45245694a609b59b2d.woff",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        {
          url: "/_next/static/media/CormorantGaramond-SemiBold.b2e099961ec65e0ee33584d3511679ea.ttf",
          revision: "XHXccRZ9PkjIU-r0PpBwU",
        },
        { url: "/ads.txt", revision: "97356830c8109accf9b5fd18d5074054" },
        { url: "/favicon.ico", revision: "0b5f819b6f1c4458c7a1ef1a051f00ce" },
        {
          url: "/fonts/CM-Sans-Serif-2012/cm-sans-serif-2012.ttf",
          revision: "b2c533d45ade59514b04062247d96aaa",
        },
        {
          url: "/fonts/CM-Sans-Serif-2012/style.css",
          revision: "1a93f2dfed11c7ce5713abc96df23f73",
        },
        {
          url: "/fonts/Clarity-City/EOT/ClarityCity-Black.eot",
          revision: "a290132d92b9978632e123df14f05958",
        },
        {
          url: "/fonts/Clarity-City/EOT/ClarityCity-BlackItalic.eot",
          revision: "9264a3e65eb0109752b34262c3a73179",
        },
        {
          url: "/fonts/Clarity-City/EOT/ClarityCity-Bold.eot",
          revision: "4fac9d51b734c02f314533a744ee5872",
        },
        {
          url: "/fonts/Clarity-City/EOT/ClarityCity-BoldItalic.eot",
          revision: "dde2b8a6d1739f7307a77663d76c717e",
        },
        {
          url: "/fonts/Clarity-City/EOT/ClarityCity-ExtraBold.eot",
          revision: "744076cf7104d5ebaa8517a63e1ce156",
        },
        {
          url: "/fonts/Clarity-City/EOT/ClarityCity-ExtraBoldItalic.eot",
          revision: "43dd19676fca3c71b9b5ac1ea6eccd0f",
        },
        {
          url: "/fonts/Clarity-City/EOT/ClarityCity-ExtraLight.eot",
          revision: "6a7b1d19acde3f221140ba80764dbbf3",
        },
        {
          url: "/fonts/Clarity-City/EOT/ClarityCity-ExtraLightItalic.eot",
          revision: "0d1e3987b82ada073b54d564dc389175",
        },
        {
          url: "/fonts/Clarity-City/EOT/ClarityCity-Light.eot",
          revision: "305b41925cba5513d45dbd966eb9bcdc",
        },
        {
          url: "/fonts/Clarity-City/EOT/ClarityCity-LightItalic.eot",
          revision: "4d8807b9555f4721f3ee24120164c137",
        },
        {
          url: "/fonts/Clarity-City/EOT/ClarityCity-Medium.eot",
          revision: "5bee2c563443447814c09253b3629fa6",
        },
        {
          url: "/fonts/Clarity-City/EOT/ClarityCity-MediumItalic.eot",
          revision: "235a19730377a20ddeda3af18831578e",
        },
        {
          url: "/fonts/Clarity-City/EOT/ClarityCity-Regular.eot",
          revision: "08231052e319e4fc0de9eafd5e9d8d9e",
        },
        {
          url: "/fonts/Clarity-City/EOT/ClarityCity-RegularItalic.eot",
          revision: "08e2d49e6e209ef09faab9bcdfbe7020",
        },
        {
          url: "/fonts/Clarity-City/EOT/ClarityCity-SemiBold.eot",
          revision: "87ef22b40f1cc911525ff4133369667b",
        },
        {
          url: "/fonts/Clarity-City/EOT/ClarityCity-SemiBoldItalic.eot",
          revision: "d5f61d239b76251d37a1dfea2f402182",
        },
        {
          url: "/fonts/Clarity-City/EOT/ClarityCity-Thin.eot",
          revision: "f69fe4144e065bb85ce8d2303f3bf04b",
        },
        {
          url: "/fonts/Clarity-City/EOT/ClarityCity-ThinItalic.eot",
          revision: "db9fb788c2e217640edf04b17ad60eb9",
        },
        {
          url: "/fonts/Clarity-City/WOFF/ClarityCity-Black.woff",
          revision: "7db78649f3bde93aa239b61cf5975fa3",
        },
        {
          url: "/fonts/Clarity-City/WOFF/ClarityCity-BlackItalic.woff",
          revision: "1cf3ce6007a860693453aeb20050540c",
        },
        {
          url: "/fonts/Clarity-City/WOFF/ClarityCity-Bold.woff",
          revision: "c7ca4a8b94194e8ab11df33bcebe74e5",
        },
        {
          url: "/fonts/Clarity-City/WOFF/ClarityCity-BoldItalic.woff",
          revision: "781a9e0c46b40f9f0fd7ef84ddd3f0c5",
        },
        {
          url: "/fonts/Clarity-City/WOFF/ClarityCity-ExtraBold.woff",
          revision: "7f09a62879c9b462b3c380c5d68b1eee",
        },
        {
          url: "/fonts/Clarity-City/WOFF/ClarityCity-ExtraBoldItalic.woff",
          revision: "bf2075801fa18b2581b5cd59805bbe80",
        },
        {
          url: "/fonts/Clarity-City/WOFF/ClarityCity-ExtraLight.woff",
          revision: "6b7e53339abe9faf0135823028da0a6b",
        },
        {
          url: "/fonts/Clarity-City/WOFF/ClarityCity-ExtraLightItalic.woff",
          revision: "29ded42878ca214bb7c8cb54f580eb8e",
        },
        {
          url: "/fonts/Clarity-City/WOFF/ClarityCity-Light.woff",
          revision: "c5ec4c39a4e08c8e6d69f4a771ee21a5",
        },
        {
          url: "/fonts/Clarity-City/WOFF/ClarityCity-LightItalic.woff",
          revision: "7633ed29bc8757a4fa552c538375c53a",
        },
        {
          url: "/fonts/Clarity-City/WOFF/ClarityCity-Medium.woff",
          revision: "bee4670a1f7151c5b0aef754bc05ecf8",
        },
        {
          url: "/fonts/Clarity-City/WOFF/ClarityCity-MediumItalic.woff",
          revision: "1ce953329e739ef36c1a9e84cad38f67",
        },
        {
          url: "/fonts/Clarity-City/WOFF/ClarityCity-Regular.woff",
          revision: "46b9cbf1f5423020a05e80d39d9b43d8",
        },
        {
          url: "/fonts/Clarity-City/WOFF/ClarityCity-RegularItalic.woff",
          revision: "d2083c2613c8b7b00983e175b97f6595",
        },
        {
          url: "/fonts/Clarity-City/WOFF/ClarityCity-SemiBold.woff",
          revision: "d9dfc84d2bff1d2321874eca961c1831",
        },
        {
          url: "/fonts/Clarity-City/WOFF/ClarityCity-SemiBoldItalic.woff",
          revision: "0a9929f8e65fbbbed54c4d066f37d6df",
        },
        {
          url: "/fonts/Clarity-City/WOFF/ClarityCity-Thin.woff",
          revision: "b4d443a2451d71391ad8f188ae49d301",
        },
        {
          url: "/fonts/Clarity-City/WOFF/ClarityCity-ThinItalic.woff",
          revision: "c1f1b0365b5d0de0ed1a4f221e444e26",
        },
        {
          url: "/fonts/Clarity-City/WOFF2/ClarityCity-Black.woff2",
          revision: "86593070fa79e0909b2d4ef59b6f012a",
        },
        {
          url: "/fonts/Clarity-City/WOFF2/ClarityCity-BlackItalic.woff2",
          revision: "35c3019e02e7d4927ae8d6e5549d4f79",
        },
        {
          url: "/fonts/Clarity-City/WOFF2/ClarityCity-Bold.woff2",
          revision: "29a7d5dff645f4e0ed372f93cec25ebb",
        },
        {
          url: "/fonts/Clarity-City/WOFF2/ClarityCity-BoldItalic.woff2",
          revision: "29d259eea833a5808afb68a18c3b3734",
        },
        {
          url: "/fonts/Clarity-City/WOFF2/ClarityCity-ExtraBold.woff2",
          revision: "a3074c57fffef69864a94dd9deca246c",
        },
        {
          url: "/fonts/Clarity-City/WOFF2/ClarityCity-ExtraBoldItalic.woff2",
          revision: "5e99bba0269ab36fc6fff3331dfa7435",
        },
        {
          url: "/fonts/Clarity-City/WOFF2/ClarityCity-ExtraLight.woff2",
          revision: "fe368cb77406329c907228c6228b99c3",
        },
        {
          url: "/fonts/Clarity-City/WOFF2/ClarityCity-ExtraLightItalic.woff2",
          revision: "56d36159b4c39c4374d108e2b8141bba",
        },
        {
          url: "/fonts/Clarity-City/WOFF2/ClarityCity-Light.woff2",
          revision: "4fea06014559d539761392fd6c34cc02",
        },
        {
          url: "/fonts/Clarity-City/WOFF2/ClarityCity-LightItalic.woff2",
          revision: "b74b5dd4ebda888fc0937684c1fdc1f2",
        },
        {
          url: "/fonts/Clarity-City/WOFF2/ClarityCity-Medium.woff2",
          revision: "430ba5bae56a9f896c20ad360e67c5df",
        },
        {
          url: "/fonts/Clarity-City/WOFF2/ClarityCity-MediumItalic.woff2",
          revision: "4ddae7258515fc20ea9ad01b405802d0",
        },
        {
          url: "/fonts/Clarity-City/WOFF2/ClarityCity-Regular.woff2",
          revision: "b9f19aaee12d3b548b8493bbb0741f97",
        },
        {
          url: "/fonts/Clarity-City/WOFF2/ClarityCity-RegularItalic.woff2",
          revision: "f5aa5a25671e1054939d5a85a2f7bc7b",
        },
        {
          url: "/fonts/Clarity-City/WOFF2/ClarityCity-SemiBold.woff2",
          revision: "e8b53eeec5a76ed6ee27abe3bfc12dd2",
        },
        {
          url: "/fonts/Clarity-City/WOFF2/ClarityCity-SemiBoldItalic.woff2",
          revision: "11fbe794f821104c8ed4a20eda897377",
        },
        {
          url: "/fonts/Clarity-City/WOFF2/ClarityCity-Thin.woff2",
          revision: "f21b846cb3dc6a2788d6a66388f545da",
        },
        {
          url: "/fonts/Clarity-City/WOFF2/ClarityCity-ThinItalic.woff2",
          revision: "9472dc50023a5a3fdcc653e41ae5f5ca",
        },
        {
          url: "/fonts/Clarity-City/style.css",
          revision: "ed939c00f384ebe89b4f92964cc9bfd3",
        },
        {
          url: "/fonts/Cormorant_Garamond/CormorantGaramond-Bold.ttf",
          revision: "b697b5faeba63e4d32b4942719897ae7",
        },
        {
          url: "/fonts/Cormorant_Garamond/CormorantGaramond-BoldItalic.ttf",
          revision: "19c45cf4d4c7d6852d13f1fd5a2f9e25",
        },
        {
          url: "/fonts/Cormorant_Garamond/CormorantGaramond-Italic.ttf",
          revision: "ef405e2bf2adb8ad78d668c3c85f36b6",
        },
        {
          url: "/fonts/Cormorant_Garamond/CormorantGaramond-Light.ttf",
          revision: "8452ee01d123471041119748df2f3bf9",
        },
        {
          url: "/fonts/Cormorant_Garamond/CormorantGaramond-LightItalic.ttf",
          revision: "9c34dd5cffcedfad13bfd855e46f6975",
        },
        {
          url: "/fonts/Cormorant_Garamond/CormorantGaramond-Medium.ttf",
          revision: "dd2b5459d54d5578c2d39466cf182a1e",
        },
        {
          url: "/fonts/Cormorant_Garamond/CormorantGaramond-MediumItalic.ttf",
          revision: "f58ebdfd258baa3cef550d167bc067ec",
        },
        {
          url: "/fonts/Cormorant_Garamond/CormorantGaramond-Regular.ttf",
          revision: "ba13b9d9266e1946b9a11499de074a24",
        },
        {
          url: "/fonts/Cormorant_Garamond/CormorantGaramond-SemiBold.ttf",
          revision: "3ccaf14c005c43d53ad96aaf7409489b",
        },
        {
          url: "/fonts/Cormorant_Garamond/CormorantGaramond-SemiBoldItalic.ttf",
          revision: "96ddbb31a0a0c707db98e2eb125c924e",
        },
        {
          url: "/fonts/Cormorant_Garamond/OFL.txt",
          revision: "277fbe78bdbf1ab7a86a0ab62b6f05a9",
        },
        {
          url: "/fonts/Cormorant_Garamond/style.css",
          revision: "9839694805fc09263e60f82c2dbd0657",
        },
        {
          url: "/fonts/Happy-Times/happy-times-at-the-ikob.otf",
          revision: "1d690ef13762600e2cde5ee5dd7da22e",
        },
        {
          url: "/fonts/Happy-Times/happy-times-at-the-ikob_italic.otf",
          revision: "b53910530dd98baad827f2e344a18fb5",
        },
        {
          url: "/fonts/Happy-Times/style.css",
          revision: "12ef9da80e43649c6dfd53f51f12e188",
        },
        {
          url: "/fonts/Inter/Inter-Black.ttf",
          revision: "5f2ce7df2a2e8570f4c32a44414df347",
        },
        {
          url: "/fonts/Inter/Inter-Bold.ttf",
          revision: "91e5aee8f44952c0c14475c910c89bb8",
        },
        {
          url: "/fonts/Inter/Inter-ExtraBold.ttf",
          revision: "bd9525f1099e9f5845f6aef2956e9fb8",
        },
        {
          url: "/fonts/Inter/Inter-ExtraLight.ttf",
          revision: "909744bbb5a7ede41ce522a1507e952c",
        },
        {
          url: "/fonts/Inter/Inter-Light.ttf",
          revision: "6ffbefc66468b90d7af1cbe1e9f13430",
        },
        {
          url: "/fonts/Inter/Inter-Medium.ttf",
          revision: "5ff1f2a9a78730d7d0c309320ff3c9c7",
        },
        {
          url: "/fonts/Inter/Inter-Regular.ttf",
          revision: "515cae74eee4925d56e6ac70c25fc0f6",
        },
        {
          url: "/fonts/Inter/Inter-SemiBold.ttf",
          revision: "ec60b23f3405050f546f4765a9e90fec",
        },
        {
          url: "/fonts/Inter/Inter-Thin.ttf",
          revision: "35b7cf4cc47ac526b745c7c29d885f60",
        },
        {
          url: "/fonts/Inter/style.css",
          revision: "8f4fd856c9d8199be6b4d502312b6e0a",
        },
        {
          url: "/icons/location.svg",
          revision: "d41d8cd98f00b204e9800998ecf8427e",
        },
        {
          url: "/logos/android/android-launchericon-144-144.png",
          revision: "428de9cec8c3f962100b2026229f726c",
        },
        {
          url: "/logos/android/android-launchericon-192-192.png",
          revision: "c208bc10110bca91dcf48143fbbcfbf2",
        },
        {
          url: "/logos/android/android-launchericon-48-48.png",
          revision: "bd59c6996e997d8e8834dbc0e6085741",
        },
        {
          url: "/logos/android/android-launchericon-512-512.png",
          revision: "cb29e04f354f7b06e268fbbbba2896d4",
        },
        {
          url: "/logos/android/android-launchericon-72-72.png",
          revision: "316783e20b6b9a01b1846a5d9cf9b021",
        },
        {
          url: "/logos/android/android-launchericon-96-96.png",
          revision: "4c9cb7fe7bccd29191135a9e92055db8",
        },
        {
          url: "/logos/apple/apple-touch-icon.png",
          revision: "665db5428c459c1baaadbb764dcf9187",
        },
        {
          url: "/logos/browserconfig.xml",
          revision: "6bf4367e9a9ecfdabafb6b5dd9f4a209",
        },
        {
          url: "/logos/chrome/chrome-extensionmanagementpage-48-48.png",
          revision: "bd59c6996e997d8e8834dbc0e6085741",
        },
        {
          url: "/logos/chrome/chrome-favicon-16-16.png",
          revision: "75ba5bc2dcdf3886ab8fa48b4e75dfa9",
        },
        {
          url: "/logos/chrome/chrome-installprocess-128-128.png",
          revision: "84f96c866b8f4c598f87cf796c67030d",
        },
        {
          url: "/logos/favicon-16-16.ico",
          revision: "b704f16f70232f188968b77ac078120b",
        },
        {
          url: "/logos/firefox/firefox-general-128-128.png",
          revision: "84f96c866b8f4c598f87cf796c67030d",
        },
        {
          url: "/logos/firefox/firefox-general-16-16.png",
          revision: "75ba5bc2dcdf3886ab8fa48b4e75dfa9",
        },
        {
          url: "/logos/firefox/firefox-general-256-256.png",
          revision: "919f73dc6ffc42634104b7f025ffc0db",
        },
        {
          url: "/logos/firefox/firefox-general-32-32.png",
          revision: "5bfe274090dbd22e944bb7894cd97732",
        },
        {
          url: "/logos/firefox/firefox-general-48-48.png",
          revision: "bd59c6996e997d8e8834dbc0e6085741",
        },
        {
          url: "/logos/firefox/firefox-general-64-64.png",
          revision: "214d3c138866b8dd09f30f008277ee9d",
        },
        {
          url: "/logos/firefox/firefox-general-90-90.png",
          revision: "ab62aa36cd6fc7dc79ffd99604a0cd76",
        },
        {
          url: "/logos/firefox/firefox-marketplace-128-128.png",
          revision: "84f96c866b8f4c598f87cf796c67030d",
        },
        {
          url: "/logos/firefox/firefox-marketplace-512-512.jpg",
          revision: "dfd71c206069614dd1aa442e9a0ae986",
        },
        {
          url: "/logos/icons.json",
          revision: "78c817233ce0fb7971994b4b40ecba30",
        },
        {
          url: "/logos/msteams/msteams-192-192.png",
          revision: "c208bc10110bca91dcf48143fbbcfbf2",
        },
        {
          url: "/logos/msteams/msteams-silhouette-32-32.png",
          revision: "5bfe274090dbd22e944bb7894cd97732",
        },
        {
          url: "/logos/windows/windows-smallsquare-24-24.png",
          revision: "92c7e41c6a1f9b4bfb7443a3ba8168e2",
        },
        {
          url: "/logos/windows/windows-smallsquare-30-30.png",
          revision: "cfe27d992e50e3a0e32c25bb080df468",
        },
        {
          url: "/logos/windows/windows-smallsquare-42-42.png",
          revision: "1bb82a13c4762ddb4e8fd0564f9f96af",
        },
        {
          url: "/logos/windows/windows-smallsquare-54-54.png",
          revision: "dcdf17cdc7b311d481e5f8d5c8c6b5e0",
        },
        {
          url: "/logos/windows/windows-splashscreen-1116-540.png",
          revision: "c53dbe4818423cf8adcd7ce439c71b77",
        },
        {
          url: "/logos/windows/windows-splashscreen-620-300.png",
          revision: "2de8c522d3ad7ad01808d7d52703b414",
        },
        {
          url: "/logos/windows/windows-splashscreen-868-420.png",
          revision: "37d7ac4b3397d454e5516c1331a92134",
        },
        {
          url: "/logos/windows/windows-squarelogo-120-120.png",
          revision: "94b44e5f13c01dea0e79193c9790e4bd",
        },
        {
          url: "/logos/windows/windows-squarelogo-150-150.png",
          revision: "4af5df2646af1e78c6a840e337b3b0d3",
        },
        {
          url: "/logos/windows/windows-squarelogo-210-210.png",
          revision: "b111f4cb6487efff63327bcaa5401acf",
        },
        {
          url: "/logos/windows/windows-squarelogo-270-270.png",
          revision: "d0da66de26200da8ed83359849ad7401",
        },
        {
          url: "/logos/windows/windows-storelogo-50-50.png",
          revision: "980b9f0197ba53c2502cf18e17785591",
        },
        {
          url: "/logos/windows/windows-storelogo-70-70.png",
          revision: "ffb96105510ccc814efaebf0ef6fd8ac",
        },
        {
          url: "/logos/windows/windows-storelogo-90-90.png",
          revision: "ab62aa36cd6fc7dc79ffd99604a0cd76",
        },
        {
          url: "/logos/windows/windowsphone-appicon-106-106.png",
          revision: "d59f24dc1ae52efecb8a6b06b1b5eb11",
        },
        {
          url: "/logos/windows/windowsphone-appicon-44-44.png",
          revision: "4f5a4f4d32504aa2d414d01b27d5a098",
        },
        {
          url: "/logos/windows/windowsphone-appicon-62-62.png",
          revision: "7a61666010ca13ace0024e1c48b872e3",
        },
        {
          url: "/logos/windows/windowsphone-mediumtile-150-150.png",
          revision: "4af5df2646af1e78c6a840e337b3b0d3",
        },
        {
          url: "/logos/windows/windowsphone-mediumtile-210-210.png",
          revision: "b111f4cb6487efff63327bcaa5401acf",
        },
        {
          url: "/logos/windows/windowsphone-mediumtile-360-360.png",
          revision: "185b9179c3280f8e6c1f4ff4be6876b5",
        },
        {
          url: "/logos/windows/windowsphone-smalltile-170-170.png",
          revision: "7c978807d58c6b491196b616cc26a31b",
        },
        {
          url: "/logos/windows/windowsphone-smalltile-71-71.png",
          revision: "32fd5f2101cd733cccb03c1f36d7c0ae",
        },
        {
          url: "/logos/windows/windowsphone-smalltile-99-99.png",
          revision: "0ff05aa0ae86b9c65d3cd71c51effb0c",
        },
        {
          url: "/logos/windows/windowsphone-storelogo-120-120.png",
          revision: "94b44e5f13c01dea0e79193c9790e4bd",
        },
        {
          url: "/logos/windows/windowsphone-storelogo-50-50.png",
          revision: "980b9f0197ba53c2502cf18e17785591",
        },
        {
          url: "/logos/windows/windowsphone-storelogo-70-70.png",
          revision: "ffb96105510ccc814efaebf0ef6fd8ac",
        },
        {
          url: "/logos/windows10/SplashScreen.scale-100.png",
          revision: "2de8c522d3ad7ad01808d7d52703b414",
        },
        {
          url: "/logos/windows10/SplashScreen.scale-125.png",
          revision: "f706dd4dbd7774f09a1bb298ad0654ab",
        },
        {
          url: "/logos/windows10/SplashScreen.scale-150.png",
          revision: "c723e30cc031f3da2c4f488d48bf8a77",
        },
        {
          url: "/logos/windows10/SplashScreen.scale-200.png",
          revision: "3d27f8e274b9ca9f7c4d6624e7be85ca",
        },
        {
          url: "/logos/windows10/SplashScreen.scale-400.png",
          revision: "3a31f206f00150ce8431736c0318bdb1",
        },
        {
          url: "/logos/windows10/Square150x150Logo.scale-100.png",
          revision: "4af5df2646af1e78c6a840e337b3b0d3",
        },
        {
          url: "/logos/windows10/Square150x150Logo.scale-125.png",
          revision: "a09382f63538f05da381f8642aa36b56",
        },
        {
          url: "/logos/windows10/Square150x150Logo.scale-150.png",
          revision: "41b175adbc99ed8891e98584d71d6c78",
        },
        {
          url: "/logos/windows10/Square150x150Logo.scale-200.png",
          revision: "23a7e96360c7722a14c9028db1dd3547",
        },
        {
          url: "/logos/windows10/Square150x150Logo.scale-400.png",
          revision: "16b520ed821af58ee014fdeba8addd63",
        },
        {
          url: "/logos/windows10/Square310x310Logo.scale-100.png",
          revision: "82f3065dc8d20069af0bca775e0aba52",
        },
        {
          url: "/logos/windows10/Square310x310Logo.scale-125.png",
          revision: "3300fcbe716fff1d5300c65d91d9efa0",
        },
        {
          url: "/logos/windows10/Square310x310Logo.scale-150.png",
          revision: "c7bc30e6cf35fe74f346519e72a1b8b4",
        },
        {
          url: "/logos/windows10/Square310x310Logo.scale-200.png",
          revision: "b298630c057e5e56a1b57a5144d61649",
        },
        {
          url: "/logos/windows10/Square310x310Logo.scale-400.png",
          revision: "6b9049ba4e2305b323a7e546a3ae273c",
        },
        {
          url: "/logos/windows10/Square44x44Logo.scale-100.png",
          revision: "4f5a4f4d32504aa2d414d01b27d5a098",
        },
        {
          url: "/logos/windows10/Square44x44Logo.scale-125.png",
          revision: "3934ae86156798480d82fe8bb90bb331",
        },
        {
          url: "/logos/windows10/Square44x44Logo.scale-150.png",
          revision: "5ceb044875caad91777c30842d5dbeae",
        },
        {
          url: "/logos/windows10/Square44x44Logo.scale-200.png",
          revision: "696a4fd3064717e2e170f8da488ec044",
        },
        {
          url: "/logos/windows10/Square44x44Logo.scale-400.png",
          revision: "1fb13aa4740390b295655e00413ce9b8",
        },
        {
          url: "/logos/windows10/Square44x44Logo.targetsize-16.png",
          revision: "75ba5bc2dcdf3886ab8fa48b4e75dfa9",
        },
        {
          url: "/logos/windows10/Square44x44Logo.targetsize-16_altform-unplated.png",
          revision: "75ba5bc2dcdf3886ab8fa48b4e75dfa9",
        },
        {
          url: "/logos/windows10/Square44x44Logo.targetsize-24.png",
          revision: "92c7e41c6a1f9b4bfb7443a3ba8168e2",
        },
        {
          url: "/logos/windows10/Square44x44Logo.targetsize-24_altform-unplated.png",
          revision: "92c7e41c6a1f9b4bfb7443a3ba8168e2",
        },
        {
          url: "/logos/windows10/Square44x44Logo.targetsize-256.png",
          revision: "919f73dc6ffc42634104b7f025ffc0db",
        },
        {
          url: "/logos/windows10/Square44x44Logo.targetsize-256_altform-unplated.png",
          revision: "919f73dc6ffc42634104b7f025ffc0db",
        },
        {
          url: "/logos/windows10/Square44x44Logo.targetsize-32.png",
          revision: "5bfe274090dbd22e944bb7894cd97732",
        },
        {
          url: "/logos/windows10/Square44x44Logo.targetsize-32_altform-unplated.png",
          revision: "5bfe274090dbd22e944bb7894cd97732",
        },
        {
          url: "/logos/windows10/Square44x44Logo.targetsize-48.png",
          revision: "bd59c6996e997d8e8834dbc0e6085741",
        },
        {
          url: "/logos/windows10/Square44x44Logo.targetsize-48_altform-unplated.png",
          revision: "bd59c6996e997d8e8834dbc0e6085741",
        },
        {
          url: "/logos/windows10/Square71x71Logo.scale-100.png",
          revision: "32fd5f2101cd733cccb03c1f36d7c0ae",
        },
        {
          url: "/logos/windows10/Square71x71Logo.scale-125.png",
          revision: "dbe000a92c2a3d0b9f8ef5027c8e2140",
        },
        {
          url: "/logos/windows10/Square71x71Logo.scale-150.png",
          revision: "df94431176d8ca7f36b03242382a8dee",
        },
        {
          url: "/logos/windows10/Square71x71Logo.scale-200.png",
          revision: "bd76e3108cdb6482b4b0bdf4f48ad8cb",
        },
        {
          url: "/logos/windows10/Square71x71Logo.scale-400.png",
          revision: "3e2b281bb646ec817387deb6f48f4515",
        },
        {
          url: "/logos/windows10/StoreLogo.png",
          revision: "980b9f0197ba53c2502cf18e17785591",
        },
        {
          url: "/logos/windows10/StoreLogo.scale-100.png",
          revision: "980b9f0197ba53c2502cf18e17785591",
        },
        {
          url: "/logos/windows10/StoreLogo.scale-125.png",
          revision: "2d4476e6c1213d81940de00ff37b3b1c",
        },
        {
          url: "/logos/windows10/StoreLogo.scale-150.png",
          revision: "e79ff667398d343a3cc2b038427bbd4e",
        },
        {
          url: "/logos/windows10/StoreLogo.scale-200.png",
          revision: "1633ad52a32fd2cbacb0f8299277fcc9",
        },
        {
          url: "/logos/windows10/StoreLogo.scale-400.png",
          revision: "3ddef2084fd0bd2bcfa52b5407c468f4",
        },
        {
          url: "/logos/windows10/Wide310x150Logo.scale-100.png",
          revision: "bc0a05e45be8153a17e7d015ad4f1e35",
        },
        {
          url: "/logos/windows10/Wide310x150Logo.scale-125.png",
          revision: "4961f4667736af65f332d94f64eb4cd8",
        },
        {
          url: "/logos/windows10/Wide310x150Logo.scale-150.png",
          revision: "672fb6550c3a193e6feb807287af3763",
        },
        {
          url: "/logos/windows10/Wide310x150Logo.scale-200.png",
          revision: "2de8c522d3ad7ad01808d7d52703b414",
        },
        {
          url: "/logos/windows10/Wide310x150Logo.scale-400.png",
          revision: "3d27f8e274b9ca9f7c4d6624e7be85ca",
        },
        { url: "/noflash.js", revision: "848c632399f7792f56f476478fd63dc1" },
        { url: "/robots.txt", revision: "d6d7a539b2c07fc485d58226b97ebeff" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: i,
              event: o,
              state: r,
            }) =>
              i && "opaqueredirect" === i.type
                ? new Response(i.body, {
                    status: 200,
                    statusText: "OK",
                    headers: i.headers,
                  })
                : i,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 31536e3,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 604800,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 604800,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|mp4)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-media-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        const i = e.pathname
        return !i.startsWith("/api/auth/") && !!i.startsWith("/api/")
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        return !e.pathname.startsWith("/api/")
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 3600,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    )
})
