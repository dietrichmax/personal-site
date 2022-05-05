/*!!
 * Matomo - free/libre analytics platform
 *
 * JavaScript tracking client
 *
 * @link https://piwik.org
 * @source https://github.com/matomo-org/matomo/blob/master/js/piwik.js
 * @license https://piwik.org/free-software/bsd/ BSD-3 Clause (also in js/LICENSE.txt)
 * @license magnet:?xt=urn:btih:c80d50af7d3db9be66a4d0a86db0286e4fd33292&dn=bsd-3-clause.txt BSD-3-Clause
 */
if (typeof _paq !== "object") {
  _paq = []
}
if (typeof window.Matomo !== "object") {
  window.Matomo = window.Piwik = (function () {
    var r,
      b = {},
      z = {},
      J = document,
      g = navigator,
      ab = screen,
      W = window,
      h =
        W.performance ||
        W.mozPerformance ||
        W.msPerformance ||
        W.webkitPerformance,
      t = W.encodeURIComponent,
      V = W.decodeURIComponent,
      k = unescape,
      L = [],
      H,
      u,
      al = [],
      y = 0,
      af = 0,
      X = 0,
      m = false
    function p(at) {
      try {
        return V(at)
      } catch (au) {
        return unescape(at)
      }
    }
    function M(au) {
      var at = typeof au
      return at !== "undefined"
    }
    function C(at) {
      return typeof at === "function"
    }
    function Z(at) {
      return typeof at === "object"
    }
    function x(at) {
      return typeof at === "string" || at instanceof String
    }
    function ak(at) {
      return typeof at === "number" || at instanceof Number
    }
    function ac(at) {
      return M(at) && (ak(at) || (x(at) && at.length))
    }
    function D(au) {
      if (!au) {
        return true
      }
      var at
      var av = true
      for (at in au) {
        if (Object.prototype.hasOwnProperty.call(au, at)) {
          av = false
        }
      }
      return av
    }
    function ao(at) {
      var au = typeof console
      if (au !== "undefined" && console && console.error) {
        console.error(at)
      }
    }
    function aj() {
      var ay, ax, aA, au, at
      for (ay = 0; ay < arguments.length; ay += 1) {
        at = null
        if (arguments[ay] && arguments[ay].slice) {
          at = arguments[ay].slice()
        }
        au = arguments[ay]
        aA = au.shift()
        var az, av
        var aw = x(aA) && aA.indexOf("::") > 0
        if (aw) {
          az = aA.split("::")
          av = az[0]
          aA = az[1]
          if ("object" === typeof u[av] && "function" === typeof u[av][aA]) {
            u[av][aA].apply(u[av], au)
          } else {
            if (at) {
              al.push(at)
            }
          }
        } else {
          for (ax = 0; ax < L.length; ax++) {
            if (x(aA)) {
              av = L[ax]
              var aB = aA.indexOf(".") > 0
              if (aB) {
                az = aA.split(".")
                if (av && "object" === typeof av[az[0]]) {
                  av = av[az[0]]
                  aA = az[1]
                } else {
                  if (at) {
                    al.push(at)
                    break
                  }
                }
              }
              if (av[aA]) {
                av[aA].apply(av, au)
              } else {
                var aC =
                  "The method '" +
                  aA +
                  '\' was not found in "_paq" variable.  Please have a look at the Matomo tracker documentation: https://developer.matomo.org/api-reference/tracking-javascript'
                ao(aC)
                if (!aB) {
                  throw new TypeError(aC)
                }
              }
              if (aA === "addTracker") {
                break
              }
              if (aA === "setTrackerUrl" || aA === "setSiteId") {
                break
              }
            } else {
              aA.apply(L[ax], au)
            }
          }
        }
      }
    }
    function ar(aw, av, au, at) {
      if (aw.addEventListener) {
        aw.addEventListener(av, au, at)
        return true
      }
      if (aw.attachEvent) {
        return aw.attachEvent("on" + av, au)
      }
      aw["on" + av] = au
    }
    function n(at) {
      if (J.readyState === "complete") {
        at()
      } else {
        if (W.addEventListener) {
          W.addEventListener("load", at, false)
        } else {
          if (W.attachEvent) {
            W.attachEvent("onload", at)
          }
        }
      }
    }
    function q(aw) {
      var at = false
      if (J.attachEvent) {
        at = J.readyState === "complete"
      } else {
        at = J.readyState !== "loading"
      }
      if (at) {
        aw()
        return
      }
      var av
      if (J.addEventListener) {
        ar(J, "DOMContentLoaded", function au() {
          J.removeEventListener("DOMContentLoaded", au, false)
          if (!at) {
            at = true
            aw()
          }
        })
      } else {
        if (J.attachEvent) {
          J.attachEvent("onreadystatechange", function au() {
            if (J.readyState === "complete") {
              J.detachEvent("onreadystatechange", au)
              if (!at) {
                at = true
                aw()
              }
            }
          })
          if (J.documentElement.doScroll && W === W.top) {
            ;(function au() {
              if (!at) {
                try {
                  J.documentElement.doScroll("left")
                } catch (ax) {
                  setTimeout(au, 0)
                  return
                }
                at = true
                aw()
              }
            })()
          }
        }
      }
      ar(
        W,
        "load",
        function () {
          if (!at) {
            at = true
            aw()
          }
        },
        false
      )
    }
    function ag(au, az, aA) {
      if (!au) {
        return ""
      }
      var at = "",
        aw,
        av,
        ax,
        ay
      for (aw in b) {
        if (Object.prototype.hasOwnProperty.call(b, aw)) {
          ay = b[aw] && "function" === typeof b[aw][au]
          if (ay) {
            av = b[aw][au]
            ax = av(az || {}, aA)
            if (ax) {
              at += ax
            }
          }
        }
      }
      return at
    }
    function am() {
      var at
      m = true
      ag("unload")
      at = new Date()
      var au = at.getTimeAlias()
      if (r - au > 3000) {
        r = au + 3000
      }
      if (r) {
        do {
          at = new Date()
        } while (at.getTimeAlias() < r)
      }
    }
    function o(av, au) {
      var at = J.createElement("script")
      at.type = "text/javascript"
      at.src = av
      if (at.readyState) {
        at.onreadystatechange = function () {
          var aw = this.readyState
          if (aw === "loaded" || aw === "complete") {
            at.onreadystatechange = null
            au()
          }
        }
      } else {
        at.onload = au
      }
      J.getElementsByTagName("head")[0].appendChild(at)
    }
    function N() {
      var at = ""
      try {
        at = W.top.document.referrer
      } catch (av) {
        if (W.parent) {
          try {
            at = W.parent.document.referrer
          } catch (au) {
            at = ""
          }
        }
      }
      if (at === "") {
        at = J.referrer
      }
      return at
    }
    function s(at) {
      var av = new RegExp("^([a-z]+):"),
        au = av.exec(at)
      return au ? au[1] : null
    }
    function d(at) {
      var av = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)"),
        au = av.exec(at)
      return au ? au[1] : at
    }
    function G(at) {
      return /^[0-9][0-9]*(\.[0-9]+)?$/.test(at)
    }
    function Q(av, aw) {
      var at = {},
        au
      for (au in av) {
        if (av.hasOwnProperty(au) && aw(av[au])) {
          at[au] = av[au]
        }
      }
      return at
    }
    function B(av) {
      var at = {},
        au
      for (au in av) {
        if (av.hasOwnProperty(au)) {
          if (G(av[au])) {
            at[au] = Math.round(av[au])
          } else {
            throw new Error(
              'Parameter "' +
                au +
                '" provided value "' +
                av[au] +
                '" is not valid. Please provide a numeric value.'
            )
          }
        }
      }
      return at
    }
    function l(au) {
      var av = "",
        at
      for (at in au) {
        if (au.hasOwnProperty(at)) {
          av += "&" + t(at) + "=" + t(au[at])
        }
      }
      return av
    }
    function an(au, at) {
      au = String(au)
      return au.lastIndexOf(at, 0) === 0
    }
    function U(au, at) {
      au = String(au)
      return au.indexOf(at, au.length - at.length) !== -1
    }
    function A(au, at) {
      au = String(au)
      return au.indexOf(at) !== -1
    }
    function f(au, at) {
      au = String(au)
      return au.substr(0, au.length - at)
    }
    function I(aw, av, ay) {
      aw = String(aw)
      if (!ay) {
        ay = ""
      }
      var at = aw.indexOf("#")
      var az = aw.length
      if (at === -1) {
        at = az
      }
      var ax = aw.substr(0, at)
      var au = aw.substr(at, az - at)
      if (ax.indexOf("?") === -1) {
        ax += "?"
      } else {
        if (!U(ax, "?")) {
          ax += "&"
        }
      }
      return ax + t(av) + "=" + t(ay) + au
    }
    function j(au, av) {
      au = String(au)
      if (
        au.indexOf("?" + av + "=") === -1 &&
        au.indexOf("&" + av + "=") === -1
      ) {
        return au
      }
      var aw = au.indexOf("?")
      if (aw === -1) {
        return au
      }
      var at = au.substr(aw + 1)
      var aA = au.substr(0, aw)
      if (at) {
        var aB = ""
        var aD = at.indexOf("#")
        if (aD !== -1) {
          aB = at.substr(aD + 1)
          at = at.substr(0, aD)
        }
        var ax
        var az = at.split("&")
        var ay = az.length - 1
        for (ay; ay >= 0; ay--) {
          ax = az[ay].split("=")[0]
          if (ax === av) {
            az.splice(ay, 1)
          }
        }
        var aC = az.join("&")
        if (aC) {
          aA = aA + "?" + aC
        }
        if (aB) {
          aA += "#" + aB
        }
      }
      return aA
    }
    function e(av, au) {
      var at = "[\\?&#]" + au + "=([^&#]*)"
      var ax = new RegExp(at)
      var aw = ax.exec(av)
      return aw ? p(aw[1]) : ""
    }
    function a(at) {
      if (at && String(at) === at) {
        return at.replace(/^\s+|\s+$/g, "")
      }
      return at
    }
    function F(at) {
      return unescape(t(at))
    }
    function aq(aI) {
      var av = function (aO, aN) {
          return (aO << aN) | (aO >>> (32 - aN))
        },
        aJ = function (aQ) {
          var aO = "",
            aP,
            aN
          for (aP = 7; aP >= 0; aP--) {
            aN = (aQ >>> (aP * 4)) & 15
            aO += aN.toString(16)
          }
          return aO
        },
        ay,
        aL,
        aK,
        au = [],
        aC = 1732584193,
        aA = 4023233417,
        az = 2562383102,
        ax = 271733878,
        aw = 3285377520,
        aH,
        aG,
        aF,
        aE,
        aD,
        aM,
        at,
        aB = []
      aI = F(aI)
      at = aI.length
      for (aL = 0; aL < at - 3; aL += 4) {
        aK =
          (aI.charCodeAt(aL) << 24) |
          (aI.charCodeAt(aL + 1) << 16) |
          (aI.charCodeAt(aL + 2) << 8) |
          aI.charCodeAt(aL + 3)
        aB.push(aK)
      }
      switch (at & 3) {
        case 0:
          aL = 2147483648
          break
        case 1:
          aL = (aI.charCodeAt(at - 1) << 24) | 8388608
          break
        case 2:
          aL =
            (aI.charCodeAt(at - 2) << 24) |
            (aI.charCodeAt(at - 1) << 16) |
            32768
          break
        case 3:
          aL =
            (aI.charCodeAt(at - 3) << 24) |
            (aI.charCodeAt(at - 2) << 16) |
            (aI.charCodeAt(at - 1) << 8) |
            128
          break
      }
      aB.push(aL)
      while ((aB.length & 15) !== 14) {
        aB.push(0)
      }
      aB.push(at >>> 29)
      aB.push((at << 3) & 4294967295)
      for (ay = 0; ay < aB.length; ay += 16) {
        for (aL = 0; aL < 16; aL++) {
          au[aL] = aB[ay + aL]
        }
        for (aL = 16; aL <= 79; aL++) {
          au[aL] = av(au[aL - 3] ^ au[aL - 8] ^ au[aL - 14] ^ au[aL - 16], 1)
        }
        aH = aC
        aG = aA
        aF = az
        aE = ax
        aD = aw
        for (aL = 0; aL <= 19; aL++) {
          aM =
            (av(aH, 5) + ((aG & aF) | (~aG & aE)) + aD + au[aL] + 1518500249) &
            4294967295
          aD = aE
          aE = aF
          aF = av(aG, 30)
          aG = aH
          aH = aM
        }
        for (aL = 20; aL <= 39; aL++) {
          aM =
            (av(aH, 5) + (aG ^ aF ^ aE) + aD + au[aL] + 1859775393) & 4294967295
          aD = aE
          aE = aF
          aF = av(aG, 30)
          aG = aH
          aH = aM
        }
        for (aL = 40; aL <= 59; aL++) {
          aM =
            (av(aH, 5) +
              ((aG & aF) | (aG & aE) | (aF & aE)) +
              aD +
              au[aL] +
              2400959708) &
            4294967295
          aD = aE
          aE = aF
          aF = av(aG, 30)
          aG = aH
          aH = aM
        }
        for (aL = 60; aL <= 79; aL++) {
          aM =
            (av(aH, 5) + (aG ^ aF ^ aE) + aD + au[aL] + 3395469782) & 4294967295
          aD = aE
          aE = aF
          aF = av(aG, 30)
          aG = aH
          aH = aM
        }
        aC = (aC + aH) & 4294967295
        aA = (aA + aG) & 4294967295
        az = (az + aF) & 4294967295
        ax = (ax + aE) & 4294967295
        aw = (aw + aD) & 4294967295
      }
      aM = aJ(aC) + aJ(aA) + aJ(az) + aJ(ax) + aJ(aw)
      return aM.toLowerCase()
    }
    function ae(av, at, au) {
      if (!av) {
        av = ""
      }
      if (!at) {
        at = ""
      }
      if (av === "translate.googleusercontent.com") {
        if (au === "") {
          au = at
        }
        at = e(at, "u")
        av = d(at)
      } else {
        if (
          av === "cc.bingj.com" ||
          av === "webcache.googleusercontent.com" ||
          av.slice(0, 5) === "74.6."
        ) {
          at = J.links[0].href
          av = d(at)
        }
      }
      return [av, at, au]
    }
    function O(au) {
      var at = au.length
      if (au.charAt(--at) === ".") {
        au = au.slice(0, at)
      }
      if (au.slice(0, 2) === "*.") {
        au = au.slice(1)
      }
      if (au.indexOf("/") !== -1) {
        au = au.substr(0, au.indexOf("/"))
      }
      return au
    }
    function ap(au) {
      au = au && au.text ? au.text : au
      if (!x(au)) {
        var at = J.getElementsByTagName("title")
        if (at && M(at[0])) {
          au = at[0].text
        }
      }
      return au
    }
    function S(at) {
      if (!at) {
        return []
      }
      if (!M(at.children) && M(at.childNodes)) {
        return at.children
      }
      if (M(at.children)) {
        return at.children
      }
      return []
    }
    function Y(au, at) {
      if (!au || !at) {
        return false
      }
      if (au.contains) {
        return au.contains(at)
      }
      if (au === at) {
        return true
      }
      if (au.compareDocumentPosition) {
        return !!(au.compareDocumentPosition(at) & 16)
      }
      return false
    }
    function P(av, aw) {
      if (av && av.indexOf) {
        return av.indexOf(aw)
      }
      if (!M(av) || av === null) {
        return -1
      }
      if (!av.length) {
        return -1
      }
      var at = av.length
      if (at === 0) {
        return -1
      }
      var au = 0
      while (au < at) {
        if (av[au] === aw) {
          return au
        }
        au++
      }
      return -1
    }
    function i(av) {
      if (!av) {
        return false
      }
      function at(ax, ay) {
        if (W.getComputedStyle) {
          return J.defaultView.getComputedStyle(ax, null)[ay]
        }
        if (ax.currentStyle) {
          return ax.currentStyle[ay]
        }
      }
      function aw(ax) {
        ax = ax.parentNode
        while (ax) {
          if (ax === J) {
            return true
          }
          ax = ax.parentNode
        }
        return false
      }
      function au(az, aF, ax, aC, aA, aD, aB) {
        var ay = az.parentNode,
          aE = 1
        if (!aw(az)) {
          return false
        }
        if (9 === ay.nodeType) {
          return true
        }
        if (
          "0" === at(az, "opacity") ||
          "none" === at(az, "display") ||
          "hidden" === at(az, "visibility")
        ) {
          return false
        }
        if (!M(aF) || !M(ax) || !M(aC) || !M(aA) || !M(aD) || !M(aB)) {
          aF = az.offsetTop
          aA = az.offsetLeft
          aC = aF + az.offsetHeight
          ax = aA + az.offsetWidth
          aD = az.offsetWidth
          aB = az.offsetHeight
        }
        if (
          av === az &&
          (0 === aB || 0 === aD) &&
          "hidden" === at(az, "overflow")
        ) {
          return false
        }
        if (ay) {
          if (
            "hidden" === at(ay, "overflow") ||
            "scroll" === at(ay, "overflow")
          ) {
            if (
              aA + aE > ay.offsetWidth + ay.scrollLeft ||
              aA + aD - aE < ay.scrollLeft ||
              aF + aE > ay.offsetHeight + ay.scrollTop ||
              aF + aB - aE < ay.scrollTop
            ) {
              return false
            }
          }
          if (az.offsetParent === ay) {
            aA += ay.offsetLeft
            aF += ay.offsetTop
          }
          return au(ay, aF, ax, aC, aA, aD, aB)
        }
        return true
      }
      return au(av)
    }
    var ai = {
      htmlCollectionToArray: function (av) {
        var at = [],
          au
        if (!av || !av.length) {
          return at
        }
        for (au = 0; au < av.length; au++) {
          at.push(av[au])
        }
        return at
      },
      find: function (at) {
        if (!document.querySelectorAll || !at) {
          return []
        }
        var au = document.querySelectorAll(at)
        return this.htmlCollectionToArray(au)
      },
      findMultiple: function (av) {
        if (!av || !av.length) {
          return []
        }
        var au, aw
        var at = []
        for (au = 0; au < av.length; au++) {
          aw = this.find(av[au])
          at = at.concat(aw)
        }
        at = this.makeNodesUnique(at)
        return at
      },
      findNodesByTagName: function (au, at) {
        if (!au || !at || !au.getElementsByTagName) {
          return []
        }
        var av = au.getElementsByTagName(at)
        return this.htmlCollectionToArray(av)
      },
      makeNodesUnique: function (at) {
        var ay = [].concat(at)
        at.sort(function (aA, az) {
          if (aA === az) {
            return 0
          }
          var aC = P(ay, aA)
          var aB = P(ay, az)
          if (aC === aB) {
            return 0
          }
          return aC > aB ? -1 : 1
        })
        if (at.length <= 1) {
          return at
        }
        var au = 0
        var aw = 0
        var ax = []
        var av
        av = at[au++]
        while (av) {
          if (av === at[au]) {
            aw = ax.push(au)
          }
          av = at[au++] || null
        }
        while (aw--) {
          at.splice(ax[aw], 1)
        }
        return at
      },
      getAttributeValueFromNode: function (ax, av) {
        if (!this.hasNodeAttribute(ax, av)) {
          return
        }
        if (ax && ax.getAttribute) {
          return ax.getAttribute(av)
        }
        if (!ax || !ax.attributes) {
          return
        }
        var aw = typeof ax.attributes[av]
        if ("undefined" === aw) {
          return
        }
        if (ax.attributes[av].value) {
          return ax.attributes[av].value
        }
        if (ax.attributes[av].nodeValue) {
          return ax.attributes[av].nodeValue
        }
        var au
        var at = ax.attributes
        if (!at) {
          return
        }
        for (au = 0; au < at.length; au++) {
          if (at[au].nodeName === av) {
            return at[au].nodeValue
          }
        }
        return null
      },
      hasNodeAttributeWithValue: function (au, at) {
        var av = this.getAttributeValueFromNode(au, at)
        return !!av
      },
      hasNodeAttribute: function (av, at) {
        if (av && av.hasAttribute) {
          return av.hasAttribute(at)
        }
        if (av && av.attributes) {
          var au = typeof av.attributes[at]
          return "undefined" !== au
        }
        return false
      },
      hasNodeCssClass: function (av, at) {
        if (av && at && av.className) {
          var au =
            typeof av.className === "string" ? av.className.split(" ") : []
          if (-1 !== P(au, at)) {
            return true
          }
        }
        return false
      },
      findNodesHavingAttribute: function (ax, av, at) {
        if (!at) {
          at = []
        }
        if (!ax || !av) {
          return at
        }
        var aw = S(ax)
        if (!aw || !aw.length) {
          return at
        }
        var au, ay
        for (au = 0; au < aw.length; au++) {
          ay = aw[au]
          if (this.hasNodeAttribute(ay, av)) {
            at.push(ay)
          }
          at = this.findNodesHavingAttribute(ay, av, at)
        }
        return at
      },
      findFirstNodeHavingAttribute: function (av, au) {
        if (!av || !au) {
          return
        }
        if (this.hasNodeAttribute(av, au)) {
          return av
        }
        var at = this.findNodesHavingAttribute(av, au)
        if (at && at.length) {
          return at[0]
        }
      },
      findFirstNodeHavingAttributeWithValue: function (aw, av) {
        if (!aw || !av) {
          return
        }
        if (this.hasNodeAttributeWithValue(aw, av)) {
          return aw
        }
        var at = this.findNodesHavingAttribute(aw, av)
        if (!at || !at.length) {
          return
        }
        var au
        for (au = 0; au < at.length; au++) {
          if (this.getAttributeValueFromNode(at[au], av)) {
            return at[au]
          }
        }
      },
      findNodesHavingCssClass: function (ax, aw, at) {
        if (!at) {
          at = []
        }
        if (!ax || !aw) {
          return at
        }
        if (ax.getElementsByClassName) {
          var ay = ax.getElementsByClassName(aw)
          return this.htmlCollectionToArray(ay)
        }
        var av = S(ax)
        if (!av || !av.length) {
          return []
        }
        var au, az
        for (au = 0; au < av.length; au++) {
          az = av[au]
          if (this.hasNodeCssClass(az, aw)) {
            at.push(az)
          }
          at = this.findNodesHavingCssClass(az, aw, at)
        }
        return at
      },
      findFirstNodeHavingClass: function (av, au) {
        if (!av || !au) {
          return
        }
        if (this.hasNodeCssClass(av, au)) {
          return av
        }
        var at = this.findNodesHavingCssClass(av, au)
        if (at && at.length) {
          return at[0]
        }
      },
      isLinkElement: function (au) {
        if (!au) {
          return false
        }
        var at = String(au.nodeName).toLowerCase()
        var aw = ["a", "area"]
        var av = P(aw, at)
        return av !== -1
      },
      setAnyAttribute: function (au, at, av) {
        if (!au || !at) {
          return
        }
        if (au.setAttribute) {
          au.setAttribute(at, av)
        } else {
          au[at] = av
        }
      },
    }
    var w = {
      CONTENT_ATTR: "data-track-content",
      CONTENT_CLASS: "matomoTrackContent",
      LEGACY_CONTENT_CLASS: "piwikTrackContent",
      CONTENT_NAME_ATTR: "data-content-name",
      CONTENT_PIECE_ATTR: "data-content-piece",
      CONTENT_PIECE_CLASS: "matomoContentPiece",
      LEGACY_CONTENT_PIECE_CLASS: "piwikContentPiece",
      CONTENT_TARGET_ATTR: "data-content-target",
      CONTENT_TARGET_CLASS: "matomoContentTarget",
      LEGACY_CONTENT_TARGET_CLASS: "piwikContentTarget",
      CONTENT_IGNOREINTERACTION_ATTR: "data-content-ignoreinteraction",
      CONTENT_IGNOREINTERACTION_CLASS: "matomoContentIgnoreInteraction",
      LEGACY_CONTENT_IGNOREINTERACTION_CLASS: "piwikContentIgnoreInteraction",
      location: undefined,
      findContentNodes: function () {
        var au = "." + this.CONTENT_CLASS
        var av = "." + this.LEGACY_CONTENT_CLASS
        var at = "[" + this.CONTENT_ATTR + "]"
        var aw = ai.findMultiple([au, av, at])
        return aw
      },
      findContentNodesWithinNode: function (aw) {
        if (!aw) {
          return []
        }
        var au = ai.findNodesHavingCssClass(aw, this.CONTENT_CLASS)
        au = ai.findNodesHavingCssClass(aw, this.LEGACY_CONTENT_CLASS, au)
        var at = ai.findNodesHavingAttribute(aw, this.CONTENT_ATTR)
        if (at && at.length) {
          var av
          for (av = 0; av < at.length; av++) {
            au.push(at[av])
          }
        }
        if (ai.hasNodeAttribute(aw, this.CONTENT_ATTR)) {
          au.push(aw)
        } else {
          if (ai.hasNodeCssClass(aw, this.CONTENT_CLASS)) {
            au.push(aw)
          } else {
            if (ai.hasNodeCssClass(aw, this.LEGACY_CONTENT_CLASS)) {
              au.push(aw)
            }
          }
        }
        au = ai.makeNodesUnique(au)
        return au
      },
      findParentContentNode: function (au) {
        if (!au) {
          return
        }
        var av = au
        var at = 0
        while (av && av !== J && av.parentNode) {
          if (ai.hasNodeAttribute(av, this.CONTENT_ATTR)) {
            return av
          }
          if (ai.hasNodeCssClass(av, this.CONTENT_CLASS)) {
            return av
          }
          if (ai.hasNodeCssClass(av, this.LEGACY_CONTENT_CLASS)) {
            return av
          }
          av = av.parentNode
          if (at > 1000) {
            break
          }
          at++
        }
      },
      findPieceNode: function (au) {
        var at
        at = ai.findFirstNodeHavingAttribute(au, this.CONTENT_PIECE_ATTR)
        if (!at) {
          at = ai.findFirstNodeHavingClass(au, this.CONTENT_PIECE_CLASS)
        }
        if (!at) {
          at = ai.findFirstNodeHavingClass(au, this.LEGACY_CONTENT_PIECE_CLASS)
        }
        if (at) {
          return at
        }
        return au
      },
      findTargetNodeNoDefault: function (at) {
        if (!at) {
          return
        }
        var au = ai.findFirstNodeHavingAttributeWithValue(
          at,
          this.CONTENT_TARGET_ATTR
        )
        if (au) {
          return au
        }
        au = ai.findFirstNodeHavingAttribute(at, this.CONTENT_TARGET_ATTR)
        if (au) {
          return au
        }
        au = ai.findFirstNodeHavingClass(at, this.CONTENT_TARGET_CLASS)
        if (au) {
          return au
        }
        au = ai.findFirstNodeHavingClass(at, this.LEGACY_CONTENT_TARGET_CLASS)
        if (au) {
          return au
        }
      },
      findTargetNode: function (at) {
        var au = this.findTargetNodeNoDefault(at)
        if (au) {
          return au
        }
        return at
      },
      findContentName: function (au) {
        if (!au) {
          return
        }
        var ax = ai.findFirstNodeHavingAttributeWithValue(
          au,
          this.CONTENT_NAME_ATTR
        )
        if (ax) {
          return ai.getAttributeValueFromNode(ax, this.CONTENT_NAME_ATTR)
        }
        var at = this.findContentPiece(au)
        if (at) {
          return this.removeDomainIfIsInLink(at)
        }
        if (ai.hasNodeAttributeWithValue(au, "title")) {
          return ai.getAttributeValueFromNode(au, "title")
        }
        var av = this.findPieceNode(au)
        if (ai.hasNodeAttributeWithValue(av, "title")) {
          return ai.getAttributeValueFromNode(av, "title")
        }
        var aw = this.findTargetNode(au)
        if (ai.hasNodeAttributeWithValue(aw, "title")) {
          return ai.getAttributeValueFromNode(aw, "title")
        }
      },
      findContentPiece: function (au) {
        if (!au) {
          return
        }
        var aw = ai.findFirstNodeHavingAttributeWithValue(
          au,
          this.CONTENT_PIECE_ATTR
        )
        if (aw) {
          return ai.getAttributeValueFromNode(aw, this.CONTENT_PIECE_ATTR)
        }
        var at = this.findPieceNode(au)
        var av = this.findMediaUrlInNode(at)
        if (av) {
          return this.toAbsoluteUrl(av)
        }
      },
      findContentTarget: function (av) {
        if (!av) {
          return
        }
        var aw = this.findTargetNode(av)
        if (ai.hasNodeAttributeWithValue(aw, this.CONTENT_TARGET_ATTR)) {
          return ai.getAttributeValueFromNode(aw, this.CONTENT_TARGET_ATTR)
        }
        var au
        if (ai.hasNodeAttributeWithValue(aw, "href")) {
          au = ai.getAttributeValueFromNode(aw, "href")
          return this.toAbsoluteUrl(au)
        }
        var at = this.findPieceNode(av)
        if (ai.hasNodeAttributeWithValue(at, "href")) {
          au = ai.getAttributeValueFromNode(at, "href")
          return this.toAbsoluteUrl(au)
        }
      },
      isSameDomain: function (at) {
        if (!at || !at.indexOf) {
          return false
        }
        if (0 === at.indexOf(this.getLocation().origin)) {
          return true
        }
        var au = at.indexOf(this.getLocation().host)
        if (8 >= au && 0 <= au) {
          return true
        }
        return false
      },
      removeDomainIfIsInLink: function (av) {
        var au = "^https?://[^/]+"
        var at = "^.*//[^/]+"
        if (
          av &&
          av.search &&
          -1 !== av.search(new RegExp(au)) &&
          this.isSameDomain(av)
        ) {
          av = av.replace(new RegExp(at), "")
          if (!av) {
            av = "/"
          }
        }
        return av
      },
      findMediaUrlInNode: function (ax) {
        if (!ax) {
          return
        }
        var av = ["img", "embed", "video", "audio"]
        var at = ax.nodeName.toLowerCase()
        if (
          -1 !== P(av, at) &&
          ai.findFirstNodeHavingAttributeWithValue(ax, "src")
        ) {
          var aw = ai.findFirstNodeHavingAttributeWithValue(ax, "src")
          return ai.getAttributeValueFromNode(aw, "src")
        }
        if (at === "object" && ai.hasNodeAttributeWithValue(ax, "data")) {
          return ai.getAttributeValueFromNode(ax, "data")
        }
        if (at === "object") {
          var ay = ai.findNodesByTagName(ax, "param")
          if (ay && ay.length) {
            var au
            for (au = 0; au < ay.length; au++) {
              if (
                "movie" === ai.getAttributeValueFromNode(ay[au], "name") &&
                ai.hasNodeAttributeWithValue(ay[au], "value")
              ) {
                return ai.getAttributeValueFromNode(ay[au], "value")
              }
            }
          }
          var az = ai.findNodesByTagName(ax, "embed")
          if (az && az.length) {
            return this.findMediaUrlInNode(az[0])
          }
        }
      },
      trim: function (at) {
        return a(at)
      },
      isOrWasNodeInViewport: function (ay) {
        if (!ay || !ay.getBoundingClientRect || ay.nodeType !== 1) {
          return true
        }
        var ax = ay.getBoundingClientRect()
        var aw = J.documentElement || {}
        var av = ax.top < 0
        if (av && ay.offsetTop) {
          av = ay.offsetTop + ax.height > 0
        }
        var au = aw.clientWidth
        if (W.innerWidth && au > W.innerWidth) {
          au = W.innerWidth
        }
        var at = aw.clientHeight
        if (W.innerHeight && at > W.innerHeight) {
          at = W.innerHeight
        }
        return (
          (ax.bottom > 0 || av) &&
          ax.right > 0 &&
          ax.left < au &&
          (ax.top < at || av)
        )
      },
      isNodeVisible: function (au) {
        var at = i(au)
        var av = this.isOrWasNodeInViewport(au)
        return at && av
      },
      buildInteractionRequestParams: function (at, au, av, aw) {
        var ax = ""
        if (at) {
          ax += "c_i=" + t(at)
        }
        if (au) {
          if (ax) {
            ax += "&"
          }
          ax += "c_n=" + t(au)
        }
        if (av) {
          if (ax) {
            ax += "&"
          }
          ax += "c_p=" + t(av)
        }
        if (aw) {
          if (ax) {
            ax += "&"
          }
          ax += "c_t=" + t(aw)
        }
        if (ax) {
          ax += "&ca=1"
        }
        return ax
      },
      buildImpressionRequestParams: function (at, au, av) {
        var aw = "c_n=" + t(at) + "&c_p=" + t(au)
        if (av) {
          aw += "&c_t=" + t(av)
        }
        if (aw) {
          aw += "&ca=1"
        }
        return aw
      },
      buildContentBlock: function (av) {
        if (!av) {
          return
        }
        var at = this.findContentName(av)
        var au = this.findContentPiece(av)
        var aw = this.findContentTarget(av)
        at = this.trim(at)
        au = this.trim(au)
        aw = this.trim(aw)
        return {
          name: at || "Unknown",
          piece: au || "Unknown",
          target: aw || "",
        }
      },
      collectContent: function (aw) {
        if (!aw || !aw.length) {
          return []
        }
        var av = []
        var at, au
        for (at = 0; at < aw.length; at++) {
          au = this.buildContentBlock(aw[at])
          if (M(au)) {
            av.push(au)
          }
        }
        return av
      },
      setLocation: function (at) {
        this.location = at
      },
      getLocation: function () {
        var at = this.location || W.location
        if (!at.origin) {
          at.origin =
            at.protocol + "//" + at.hostname + (at.port ? ":" + at.port : "")
        }
        return at
      },
      toAbsoluteUrl: function (au) {
        if ((!au || String(au) !== au) && au !== "") {
          return au
        }
        if ("" === au) {
          return this.getLocation().href
        }
        if (au.search(/^\/\//) !== -1) {
          return this.getLocation().protocol + au
        }
        if (au.search(/:\/\//) !== -1) {
          return au
        }
        if (0 === au.indexOf("#")) {
          return this.getLocation().origin + this.getLocation().pathname + au
        }
        if (0 === au.indexOf("?")) {
          return this.getLocation().origin + this.getLocation().pathname + au
        }
        if (0 === au.search("^[a-zA-Z]{2,11}:")) {
          return au
        }
        if (au.search(/^\//) !== -1) {
          return this.getLocation().origin + au
        }
        var at = "(.*/)"
        var av =
          this.getLocation().origin +
          this.getLocation().pathname.match(new RegExp(at))[0]
        return av + au
      },
      isUrlToCurrentDomain: function (au) {
        var av = this.toAbsoluteUrl(au)
        if (!av) {
          return false
        }
        var at = this.getLocation().origin
        if (at === av) {
          return true
        }
        if (0 === String(av).indexOf(at)) {
          if (":" === String(av).substr(at.length, 1)) {
            return false
          }
          return true
        }
        return false
      },
      setHrefAttribute: function (au, at) {
        if (!au || !at) {
          return
        }
        ai.setAnyAttribute(au, "href", at)
      },
      shouldIgnoreInteraction: function (at) {
        if (ai.hasNodeAttribute(at, this.CONTENT_IGNOREINTERACTION_ATTR)) {
          return true
        }
        if (ai.hasNodeCssClass(at, this.CONTENT_IGNOREINTERACTION_CLASS)) {
          return true
        }
        if (
          ai.hasNodeCssClass(at, this.LEGACY_CONTENT_IGNOREINTERACTION_CLASS)
        ) {
          return true
        }
        return false
      },
    }
    function aa(au, ax) {
      if (ax) {
        return ax
      }
      au = w.toAbsoluteUrl(au)
      if (A(au, "?")) {
        var aw = au.indexOf("?")
        au = au.slice(0, aw)
      }
      if (U(au, "matomo.php")) {
        au = f(au, "matomo.php".length)
      } else {
        if (U(au, "piwik.php")) {
          au = f(au, "piwik.php".length)
        } else {
          if (U(au, ".php")) {
            var at = au.lastIndexOf("/")
            var av = 1
            au = au.slice(0, at + av)
          }
        }
      }
      if (U(au, "/js/")) {
        au = f(au, "js/".length)
      }
      return au
    }
    function R(az) {
      var aB = "Matomo_Overlay"
      var au = new RegExp(
        "index\\.php\\?module=Overlay&action=startOverlaySession&idSite=([0-9]+)&period=([^&]+)&date=([^&]+)(&segment=[^&]*)?"
      )
      var av = au.exec(J.referrer)
      if (av) {
        var ax = av[1]
        if (ax !== String(az)) {
          return false
        }
        var ay = av[2],
          at = av[3],
          aw = av[4]
        if (!aw) {
          aw = ""
        } else {
          if (aw.indexOf("&segment=") === 0) {
            aw = aw.substr("&segment=".length)
          }
        }
        W.name = aB + "###" + ay + "###" + at + "###" + aw
      }
      var aA = W.name.split("###")
      return aA.length === 4 && aA[0] === aB
    }
    function ad(au, az, av) {
      var ay = W.name.split("###"),
        ax = ay[1],
        at = ay[2],
        aw = ay[3],
        aA = aa(au, az)
      o(aA + "plugins/Overlay/client/client.js?v=1", function () {
        Matomo_Overlay_Client.initialize(aA, av, ax, at, aw)
      })
    }
    function v() {
      var av
      try {
        av = W.frameElement
      } catch (au) {
        return true
      }
      if (M(av)) {
        return av && String(av.nodeName).toLowerCase() === "iframe"
          ? true
          : false
      }
      try {
        return W.self !== W.top
      } catch (at) {
        return true
      }
    }
    function T(cj, cf) {
      var bP = this,
        bj = "mtm_consent",
        cL = "mtm_cookie_consent",
        cU = "mtm_consent_removed",
        ca = ae(J.domain, W.location.href, N()),
        c2 = O(ca[0]),
        bT = p(ca[1]),
        bu = p(ca[2]),
        c0 = false,
        cn = "GET",
        di = cn,
        aM = "application/x-www-form-urlencoded; charset=UTF-8",
        cE = aM,
        aI = cj || "",
        bO = "",
        c8 = "",
        ct = "",
        cc = cf || "",
        bF = "",
        bU = "",
        ba,
        bp = "",
        df = [
          "7z",
          "aac",
          "apk",
          "arc",
          "arj",
          "asf",
          "asx",
          "avi",
          "azw3",
          "bin",
          "csv",
          "deb",
          "dmg",
          "doc",
          "docx",
          "epub",
          "exe",
          "flv",
          "gif",
          "gz",
          "gzip",
          "hqx",
          "ibooks",
          "jar",
          "jpg",
          "jpeg",
          "js",
          "mobi",
          "mp2",
          "mp3",
          "mp4",
          "mpg",
          "mpeg",
          "mov",
          "movie",
          "msi",
          "msp",
          "odb",
          "odf",
          "odg",
          "ods",
          "odt",
          "ogg",
          "ogv",
          "pdf",
          "phps",
          "png",
          "ppt",
          "pptx",
          "qt",
          "qtm",
          "ra",
          "ram",
          "rar",
          "rpm",
          "rtf",
          "sea",
          "sit",
          "tar",
          "tbz",
          "tbz2",
          "bz",
          "bz2",
          "tgz",
          "torrent",
          "txt",
          "wav",
          "wma",
          "wmv",
          "wpd",
          "xls",
          "xlsx",
          "xml",
          "z",
          "zip",
        ],
        aC = [c2],
        bG = [],
        co = [],
        bR = [],
        be = [],
        bQ = 500,
        c5 = true,
        cR,
        bb,
        bX,
        bV,
        at,
        cw = [
          "pk_campaign",
          "mtm_campaign",
          "piwik_campaign",
          "matomo_campaign",
          "utm_campaign",
          "utm_source",
          "utm_medium",
        ],
        bN = ["pk_kwd", "mtm_kwd", "piwik_kwd", "matomo_kwd", "utm_term"],
        bq = "_pk_",
        az = "pk_vid",
        a5 = 180,
        c6,
        bw,
        bY = false,
        aN = "Lax",
        bs = false,
        cY,
        bk,
        bC,
        cS = 33955200000,
        cu = 1800000,
        de = 15768000000,
        a8 = true,
        bL = false,
        bn = false,
        bW = false,
        aV = false,
        ch,
        b2 = {},
        cs = {},
        bt = {},
        bA = 200,
        cA = {},
        c9 = {},
        dg = {},
        cg = [],
        ck = false,
        cJ = false,
        au = false,
        dh = false,
        cV = false,
        aS = false,
        bi = v(),
        cF = null,
        c7 = null,
        aW,
        bI,
        cd = aq,
        bv,
        aQ,
        bH = false,
        cx = 0,
        bB = ["id", "ses", "cvar", "ref"],
        cI = false,
        bJ = null,
        cT = [],
        cz = [],
        aB = X++,
        aA = false
      try {
        bp = J.title
      } catch (cG) {
        bp = ""
      }
      function aH(du) {
        if (bs) {
          return 0
        }
        var ds = new RegExp("(^|;)[ ]*" + du + "=([^;]*)"),
          dt = ds.exec(J.cookie)
        return dt ? V(dt[2]) : 0
      }
      bJ = !aH(cU)
      function dm(dw, dx, dA, dz, du, dv, dy) {
        if (bs && dw !== cU) {
          return
        }
        var dt
        if (dA) {
          dt = new Date()
          dt.setTime(dt.getTime() + dA)
        }
        if (!dy) {
          dy = "Lax"
        }
        J.cookie =
          dw +
          "=" +
          t(dx) +
          (dA ? ";expires=" + dt.toGMTString() : "") +
          ";path=" +
          (dz || "/") +
          (du ? ";domain=" + du : "") +
          (dv ? ";secure" : "") +
          ";SameSite=" +
          dy
        if ((!dA || dA >= 0) && aH(dw) !== String(dx)) {
          var ds =
            "There was an error setting cookie `" +
            dw +
            "`. Please check domain and path."
          ao(ds)
        }
      }
      function b8(ds) {
        var du, dt
        ds = j(ds, az)
        for (dt = 0; dt < co.length; dt++) {
          ds = j(ds, co[dt])
        }
        if (bV) {
          du = new RegExp("#.*")
          return ds.replace(du, "")
        }
        return ds
      }
      function b1(du, ds) {
        var dv = s(ds),
          dt
        if (dv) {
          return ds
        }
        if (ds.slice(0, 1) === "/") {
          return s(du) + "://" + d(du) + ds
        }
        du = b8(du)
        dt = du.indexOf("?")
        if (dt >= 0) {
          du = du.slice(0, dt)
        }
        dt = du.lastIndexOf("/")
        if (dt !== du.length - 1) {
          du = du.slice(0, dt + 1)
        }
        return du + ds
      }
      function cP(du, ds) {
        var dt
        du = String(du).toLowerCase()
        ds = String(ds).toLowerCase()
        if (du === ds) {
          return true
        }
        if (ds.slice(0, 1) === ".") {
          if (du === ds.slice(1)) {
            return true
          }
          dt = du.length - ds.length
          if (dt > 0 && du.slice(dt) === ds) {
            return true
          }
        }
        return false
      }
      function cr(ds) {
        var dt = document.createElement("a")
        if (ds.indexOf("//") !== 0 && ds.indexOf("http") !== 0) {
          if (ds.indexOf("*") === 0) {
            ds = ds.substr(1)
          }
          if (ds.indexOf(".") === 0) {
            ds = ds.substr(1)
          }
          ds = "http://" + ds
        }
        dt.href = w.toAbsoluteUrl(ds)
        if (dt.pathname) {
          return dt.pathname
        }
        return ""
      }
      function a9(dt, ds) {
        if (!an(ds, "/")) {
          ds = "/" + ds
        }
        if (!an(dt, "/")) {
          dt = "/" + dt
        }
        var du = ds === "/" || ds === "/*"
        if (du) {
          return true
        }
        if (dt === ds) {
          return true
        }
        ds = String(ds).toLowerCase()
        dt = String(dt).toLowerCase()
        if (U(ds, "*")) {
          ds = ds.slice(0, -1)
          du = !ds || ds === "/"
          if (du) {
            return true
          }
          if (dt === ds) {
            return true
          }
          return dt.indexOf(ds) === 0
        }
        if (!U(dt, "/")) {
          dt += "/"
        }
        if (!U(ds, "/")) {
          ds += "/"
        }
        return dt.indexOf(ds) === 0
      }
      function aw(dw, dy) {
        var dt, ds, du, dv, dx
        for (dt = 0; dt < aC.length; dt++) {
          dv = O(aC[dt])
          dx = cr(aC[dt])
          if (cP(dw, dv) && a9(dy, dx)) {
            return true
          }
        }
        return false
      }
      function a1(dv) {
        var dt, ds, du
        for (dt = 0; dt < aC.length; dt++) {
          ds = O(aC[dt].toLowerCase())
          if (dv === ds) {
            return true
          }
          if (ds.slice(0, 1) === ".") {
            if (dv === ds.slice(1)) {
              return true
            }
            du = dv.length - ds.length
            if (du > 0 && dv.slice(du) === ds) {
              return true
            }
          }
        }
        return false
      }
      function cv(ds, du) {
        ds = ds.replace("send_image=0", "send_image=1")
        var dt = new Image(1, 1)
        dt.onload = function () {
          H = 0
          if (typeof du === "function") {
            du({ request: ds, trackerUrl: aI, success: true })
          }
        }
        dt.onerror = function () {
          if (typeof du === "function") {
            du({ request: ds, trackerUrl: aI, success: false })
          }
        }
        dt.src = aI + (aI.indexOf("?") < 0 ? "?" : "&") + ds
      }
      function cM(ds) {
        if (di === "POST") {
          return true
        }
        return ds && (ds.length > 2000 || ds.indexOf('{"requests"') === 0)
      }
      function aP() {
        return (
          "object" === typeof g &&
          "function" === typeof g.sendBeacon &&
          "function" === typeof Blob
        )
      }
      function bc(dw, dz, dy) {
        var du = aP()
        if (!du) {
          return false
        }
        var dv = { type: "application/x-www-form-urlencoded; charset=UTF-8" }
        var dA = false
        var dt = aI
        try {
          var ds = new Blob([dw], dv)
          if (dy && !cM(dw)) {
            ds = new Blob([], dv)
            dt = dt + (dt.indexOf("?") < 0 ? "?" : "&") + dw
          }
          dA = g.sendBeacon(dt, ds)
        } catch (dx) {
          return false
        }
        if (dA && typeof dz === "function") {
          dz({ request: dw, trackerUrl: aI, success: true, isSendBeacon: true })
        }
        return dA
      }
      function dd(dt, du, ds) {
        if (!M(ds) || null === ds) {
          ds = true
        }
        if (m && bc(dt, du, ds)) {
          return
        }
        setTimeout(function () {
          if (m && bc(dt, du, ds)) {
            return
          }
          var dx
          try {
            var dw = W.XMLHttpRequest
              ? new W.XMLHttpRequest()
              : W.ActiveXObject
              ? new ActiveXObject("Microsoft.XMLHTTP")
              : null
            dw.open("POST", aI, true)
            dw.onreadystatechange = function () {
              if (
                this.readyState === 4 &&
                !(this.status >= 200 && this.status < 300)
              ) {
                var dy = m && bc(dt, du, ds)
                if (!dy && ds) {
                  cv(dt, du)
                } else {
                  if (typeof du === "function") {
                    du({
                      request: dt,
                      trackerUrl: aI,
                      success: false,
                      xhr: this,
                    })
                  }
                }
              } else {
                if (this.readyState === 4 && typeof du === "function") {
                  du({ request: dt, trackerUrl: aI, success: true, xhr: this })
                }
              }
            }
            dw.setRequestHeader("Content-Type", cE)
            dw.withCredentials = true
            dw.send(dt)
          } catch (dv) {
            dx = m && bc(dt, du, ds)
            if (!dx && ds) {
              cv(dt, du)
            } else {
              if (typeof du === "function") {
                du({ request: dt, trackerUrl: aI, success: false })
              }
            }
          }
        }, 50)
      }
      function cl(dt) {
        var ds = new Date()
        var du = ds.getTime() + dt
        if (!r || du > r) {
          r = du
        }
      }
      function bg() {
        bi = true
        cF = new Date().getTime()
      }
      function dl() {
        var ds = new Date().getTime()
        return !cF || ds - cF > bb
      }
      function aD() {
        if (dl()) {
          bX()
        }
      }
      function a0() {
        if (J.visibilityState === "hidden" && dl()) {
          bX()
        } else {
          if (J.visibilityState === "visible") {
            cF = new Date().getTime()
          }
        }
      }
      function dp() {
        if (aS || !bb) {
          return
        }
        aS = true
        ar(W, "focus", bg)
        ar(W, "blur", aD)
        ar(W, "visibilitychange", a0)
        af++
        u.addPlugin("HeartBeat" + af, {
          unload: function () {
            if (aS && dl()) {
              bX()
            }
          },
        })
      }
      function cK(dw) {
        var dt = new Date()
        var ds = dt.getTime()
        c7 = ds
        if (cJ && ds < cJ) {
          var du = cJ - ds
          setTimeout(dw, du)
          cl(du + 50)
          cJ += 50
          return
        }
        if (cJ === false) {
          var dv = 800
          cJ = ds + dv
        }
        dw()
      }
      function aT() {
        if (aH(cU)) {
          bJ = false
        } else {
          if (aH(bj)) {
            bJ = true
          }
        }
      }
      function bM(dt, ds, du) {
        aT()
        if (!bJ) {
          cT.push(dt)
          return
        }
        aA = true
        if (!cY && dt) {
          if (cI && bJ) {
            dt += "&consent=1"
          }
          cK(function () {
            if (c5 && bc(dt, du, true)) {
              cl(100)
              return
            }
            if (cM(dt)) {
              dd(dt, du)
            } else {
              cv(dt, du)
            }
            cl(ds)
          })
        }
        if (!aS) {
          dp()
        }
      }
      function cq(ds) {
        if (cY) {
          return false
        }
        return ds && ds.length
      }
      function dc(ds, dw) {
        if (!dw || dw >= ds.length) {
          return [ds]
        }
        var dt = 0
        var du = ds.length
        var dv = []
        for (dt; dt < du; dt += dw) {
          dv.push(ds.slice(dt, dt + dw))
        }
        return dv
      }
      function dn(dt, ds) {
        if (!cq(dt)) {
          return
        }
        if (!bJ) {
          cT.push(dt)
          return
        }
        aA = true
        cK(function () {
          var dw = dc(dt, 50)
          var du = 0,
            dv
          for (du; du < dw.length; du++) {
            dv = '{"requests":["?' + dw[du].join('","?') + '"],"send_image":0}'
            if (c5 && bc(dv, null, false)) {
              cl(100)
            } else {
              dd(dv, null, false)
            }
          }
          cl(ds)
        })
      }
      function aY(ds) {
        return bq + ds + "." + cc + "." + bv
      }
      function b5(du, dt, ds) {
        dm(du, "", -86400, dt, ds)
      }
      function cb() {
        if (bs) {
          return "0"
        }
        if (!M(W.showModalDialog) && M(g.cookieEnabled)) {
          return g.cookieEnabled ? "1" : "0"
        }
        var ds = bq + "testcookie"
        dm(ds, "1", undefined, bw, c6, bY, aN)
        var dt = aH(ds) === "1" ? "1" : "0"
        b5(ds)
        return dt
      }
      function bo() {
        bv = cd((c6 || c2) + (bw || "/")).slice(0, 4)
      }
      function cQ() {
        if (M(dg.res)) {
          return dg
        }
        var dt,
          dv,
          dw = {
            pdf: "application/pdf",
            qt: "video/quicktime",
            realp: "audio/x-pn-realaudio-plugin",
            wma: "application/x-mplayer2",
            fla: "application/x-shockwave-flash",
            java: "application/x-java-vm",
            ag: "application/x-silverlight",
          }
        if (!new RegExp("MSIE").test(g.userAgent)) {
          if (g.mimeTypes && g.mimeTypes.length) {
            for (dt in dw) {
              if (Object.prototype.hasOwnProperty.call(dw, dt)) {
                dv = g.mimeTypes[dw[dt]]
                dg[dt] = dv && dv.enabledPlugin ? "1" : "0"
              }
            }
          }
          if (
            !new RegExp("Edge[ /](\\d+[\\.\\d]+)").test(g.userAgent) &&
            typeof navigator.javaEnabled !== "unknown" &&
            M(g.javaEnabled) &&
            g.javaEnabled()
          ) {
            dg.java = "1"
          }
          if (!M(W.showModalDialog) && M(g.cookieEnabled)) {
            dg.cookie = g.cookieEnabled ? "1" : "0"
          } else {
            dg.cookie = cb()
          }
        }
        var du = parseInt(ab.width, 10)
        var ds = parseInt(ab.height, 10)
        dg.res = parseInt(du, 10) + "x" + parseInt(ds, 10)
        return dg
      }
      function b3() {
        var dt = aY("cvar"),
          ds = aH(dt)
        if (ds && ds.length) {
          ds = W.JSON.parse(ds)
          if (Z(ds)) {
            return ds
          }
        }
        return {}
      }
      function cN() {
        if (aV === false) {
          aV = b3()
        }
      }
      function cZ() {
        var ds = cQ()
        return cd(
          (g.userAgent || "") +
            (g.platform || "") +
            W.JSON.stringify(ds) +
            new Date().getTime() +
            Math.random()
        ).slice(0, 16)
      }
      function aF() {
        var ds = cQ()
        return cd(
          (g.userAgent || "") + (g.platform || "") + W.JSON.stringify(ds)
        ).slice(0, 6)
      }
      function bl() {
        return Math.floor(new Date().getTime() / 1000)
      }
      function aO() {
        var dt = bl()
        var du = aF()
        var ds = String(dt) + du
        return ds
      }
      function db(du) {
        du = String(du)
        var dx = aF()
        var dv = dx.length
        var dw = du.substr(-1 * dv, dv)
        var dt = parseInt(du.substr(0, du.length - dv), 10)
        if (dt && dw && dw === dx) {
          var ds = bl()
          if (a5 <= 0) {
            return true
          }
          if (ds >= dt && ds <= dt + a5) {
            return true
          }
        }
        return false
      }
      function dq(ds) {
        if (!cV) {
          return ""
        }
        var dw = e(ds, az)
        if (!dw) {
          return ""
        }
        dw = String(dw)
        var du = new RegExp("^[a-zA-Z0-9]+$")
        if (dw.length === 32 && du.test(dw)) {
          var dt = dw.substr(16, 32)
          if (db(dt)) {
            var dv = dw.substr(0, 16)
            return dv
          }
        }
        return ""
      }
      function cW() {
        if (!bU) {
          bU = dq(bT)
        }
        var du = new Date(),
          ds = Math.round(du.getTime() / 1000),
          dt = aY("id"),
          dx = aH(dt),
          dw,
          dv
        if (dx) {
          dw = dx.split(".")
          dw.unshift("0")
          if (bU.length) {
            dw[1] = bU
          }
          return dw
        }
        if (bU.length) {
          dv = bU
        } else {
          if ("0" === cb()) {
            dv = ""
          } else {
            dv = cZ()
          }
        }
        dw = ["1", dv, ds]
        return dw
      }
      function a4() {
        var dv = cW(),
          dt = dv[0],
          du = dv[1],
          ds = dv[2]
        return { newVisitor: dt, uuid: du, createTs: ds }
      }
      function aL() {
        var dv = new Date(),
          dt = dv.getTime(),
          dw = a4().createTs
        var ds = parseInt(dw, 10)
        var du = ds * 1000 + cS - dt
        return du
      }
      function aR(ds) {
        if (!cc) {
          return
        }
        var du = new Date(),
          dt = Math.round(du.getTime() / 1000)
        if (!M(ds)) {
          ds = a4()
        }
        var dv = ds.uuid + "." + ds.createTs + "."
        dm(aY("id"), dv, aL(), bw, c6, bY, aN)
      }
      function bS() {
        var ds = aH(aY("ref"))
        if (ds.length) {
          try {
            ds = W.JSON.parse(ds)
            if (Z(ds)) {
              return ds
            }
          } catch (dt) {}
        }
        return ["", "", 0, ""]
      }
      function bD(du) {
        var dt = bq + "testcookie_domain"
        var ds = "testvalue"
        dm(dt, ds, 10000, null, du, bY, aN)
        if (aH(dt) === ds) {
          b5(dt, null, du)
          return true
        }
        return false
      }
      function aJ() {
        var dt = bs
        bs = false
        var ds, du
        for (ds = 0; ds < bB.length; ds++) {
          du = aY(bB[ds])
          if (du !== cU && du !== bj && 0 !== aH(du)) {
            b5(du, bw, c6)
          }
        }
        bs = dt
      }
      function b9(ds) {
        cc = ds
      }
      function dr(dw) {
        if (!dw || !Z(dw)) {
          return
        }
        var dv = []
        var du
        for (du in dw) {
          if (Object.prototype.hasOwnProperty.call(dw, du)) {
            dv.push(du)
          }
        }
        var dx = {}
        dv.sort()
        var ds = dv.length
        var dt
        for (dt = 0; dt < ds; dt++) {
          dx[dv[dt]] = dw[dv[dt]]
        }
        return dx
      }
      function ci() {
        dm(aY("ses"), "1", cu, bw, c6, bY, aN)
      }
      function bm() {
        var dv = ""
        var dt =
          "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        var du = dt.length
        var ds
        for (ds = 0; ds < 6; ds++) {
          dv += dt.charAt(Math.floor(Math.random() * du))
        }
        return dv
      }
      function aE(dt) {
        if (ct !== "") {
          dt += ct
          bn = true
          return dt
        }
        if (!h) {
          return dt
        }
        var du = typeof h.timing === "object" && h.timing ? h.timing : undefined
        if (!du) {
          du =
            typeof h.getEntriesByType === "function" &&
            h.getEntriesByType("navigation")
              ? h.getEntriesByType("navigation")[0]
              : undefined
        }
        if (!du) {
          return dt
        }
        var ds = ""
        if (du.connectEnd && du.fetchStart) {
          if (du.connectEnd < du.fetchStart) {
            return
          }
          ds += "&pf_net=" + Math.round(du.connectEnd - du.fetchStart)
        }
        if (du.responseStart && du.requestStart) {
          if (du.responseStart < du.requestStart) {
            return
          }
          ds += "&pf_srv=" + Math.round(du.responseStart - du.requestStart)
        }
        if (du.responseStart && du.responseEnd) {
          if (du.responseEnd < du.responseStart) {
            return
          }
          ds += "&pf_tfr=" + Math.round(du.responseEnd - du.responseStart)
        }
        if (M(du.domLoading)) {
          if (du.domInteractive && du.domLoading) {
            if (du.domInteractive < du.domLoading) {
              return
            }
            ds += "&pf_dm1=" + Math.round(du.domInteractive - du.domLoading)
          }
        } else {
          if (du.domInteractive && du.responseEnd) {
            if (du.domInteractive < du.responseEnd) {
              return
            }
            ds += "&pf_dm1=" + Math.round(du.domInteractive - du.responseEnd)
          }
        }
        if (du.domComplete && du.domInteractive) {
          if (du.domComplete < du.domInteractive) {
            return
          }
          ds += "&pf_dm2=" + Math.round(du.domComplete - du.domInteractive)
        }
        if (du.loadEventEnd && du.loadEventStart) {
          if (du.loadEventEnd < du.loadEventStart) {
            return
          }
          ds += "&pf_onl=" + Math.round(du.loadEventEnd - du.loadEventStart)
        }
        return dt + ds
      }
      function cy(du, dO, dP) {
        var dN,
          dt = new Date(),
          dB = Math.round(dt.getTime() / 1000),
          dy,
          dL,
          dv = 1024,
          dU,
          dC,
          dK = aV,
          dw = aY("ses"),
          dI = aY("ref"),
          dF = aY("cvar"),
          dG = aH(dw),
          dM = bS(),
          dQ = ba || bT,
          dz,
          ds
        if (bs) {
          aJ()
        }
        if (cY) {
          return ""
        }
        var dH = a4()
        var dE = J.characterSet || J.charset
        if (!dE || dE.toLowerCase() === "utf-8") {
          dE = null
        }
        dz = dM[0]
        ds = dM[1]
        dy = dM[2]
        dL = dM[3]
        if (!dG) {
          if (!bC || !dz.length) {
            for (dN in cw) {
              if (Object.prototype.hasOwnProperty.call(cw, dN)) {
                dz = e(dQ, cw[dN])
                if (dz.length) {
                  break
                }
              }
            }
            for (dN in bN) {
              if (Object.prototype.hasOwnProperty.call(bN, dN)) {
                ds = e(dQ, bN[dN])
                if (ds.length) {
                  break
                }
              }
            }
          }
          dU = d(bu)
          dC = dL.length ? d(dL) : ""
          if (dU.length && !a1(dU) && (!bC || !dC.length || a1(dC))) {
            dL = bu
          }
          if (dL.length || dz.length) {
            dy = dB
            dM = [dz, ds, dy, b8(dL.slice(0, dv))]
            dm(dI, W.JSON.stringify(dM), de, bw, c6, bY, aN)
          }
        }
        du +=
          "&idsite=" +
          cc +
          "&rec=1&r=" +
          String(Math.random()).slice(2, 8) +
          "&h=" +
          dt.getHours() +
          "&m=" +
          dt.getMinutes() +
          "&s=" +
          dt.getSeconds() +
          "&url=" +
          t(b8(dQ)) +
          (bu.length ? "&urlref=" + t(b8(bu)) : "") +
          (ac(bF) ? "&uid=" + t(bF) : "") +
          "&_id=" +
          dH.uuid +
          "&_idn=" +
          dH.newVisitor +
          (dz.length ? "&_rcn=" + t(dz) : "") +
          (ds.length ? "&_rck=" + t(ds) : "") +
          "&_refts=" +
          dy +
          (String(dL).length ? "&_ref=" + t(b8(dL.slice(0, dv))) : "") +
          (dE ? "&cs=" + t(dE) : "") +
          "&send_image=0"
        var dT = cQ()
        for (dN in dT) {
          if (Object.prototype.hasOwnProperty.call(dT, dN)) {
            du += "&" + dN + "=" + dT[dN]
          }
        }
        var dS = []
        if (dO) {
          for (dN in dO) {
            if (
              Object.prototype.hasOwnProperty.call(dO, dN) &&
              /^dimension\d+$/.test(dN)
            ) {
              var dx = dN.replace("dimension", "")
              dS.push(parseInt(dx, 10))
              dS.push(String(dx))
              du += "&" + dN + "=" + t(dO[dN])
              delete dO[dN]
            }
          }
        }
        if (dO && D(dO)) {
          dO = null
        }
        for (dN in cA) {
          if (Object.prototype.hasOwnProperty.call(cA, dN)) {
            du += "&" + dN + "=" + t(cA[dN])
          }
        }
        for (dN in bt) {
          if (Object.prototype.hasOwnProperty.call(bt, dN)) {
            var dD = -1 === P(dS, dN)
            if (dD) {
              du += "&dimension" + dN + "=" + t(bt[dN])
            }
          }
        }
        if (dO) {
          du += "&data=" + t(W.JSON.stringify(dO))
        } else {
          if (at) {
            du += "&data=" + t(W.JSON.stringify(at))
          }
        }
        function dA(dV, dW) {
          var dX = W.JSON.stringify(dV)
          if (dX.length > 2) {
            return "&" + dW + "=" + t(dX)
          }
          return ""
        }
        var dR = dr(b2)
        var dJ = dr(cs)
        du += dA(dR, "cvar")
        du += dA(dJ, "e_cvar")
        if (aV) {
          du += dA(aV, "_cvar")
          for (dN in dK) {
            if (Object.prototype.hasOwnProperty.call(dK, dN)) {
              if (aV[dN][0] === "" || aV[dN][1] === "") {
                delete aV[dN]
              }
            }
          }
          if (bW) {
            dm(dF, W.JSON.stringify(aV), cu, bw, c6, bY, aN)
          }
        }
        if (a8 && bL && !bn) {
          du = aE(du)
          bn = true
        }
        if (aQ) {
          du += "&pv_id=" + aQ
        }
        aR(dH)
        ci()
        du += ag(dP, { tracker: bP, request: du })
        if (c8.length) {
          du += "&" + c8
        }
        if (C(ch)) {
          du = ch(du)
        }
        return du
      }
      bX = function bd() {
        var ds = new Date()
        ds = ds.getTime()
        if (!c7) {
          return false
        }
        if (c7 + bb <= ds) {
          bP.ping()
          return true
        }
        return false
      }
      function bx(dv, du, dz, dw, ds, dC) {
        var dy = "idgoal=0",
          dt = new Date(),
          dA = [],
          dB,
          dx = String(dv).length
        if (dx) {
          dy += "&ec_id=" + t(dv)
        }
        dy += "&revenue=" + du
        if (String(dz).length) {
          dy += "&ec_st=" + dz
        }
        if (String(dw).length) {
          dy += "&ec_tx=" + dw
        }
        if (String(ds).length) {
          dy += "&ec_sh=" + ds
        }
        if (String(dC).length) {
          dy += "&ec_dt=" + dC
        }
        if (c9) {
          for (dB in c9) {
            if (Object.prototype.hasOwnProperty.call(c9, dB)) {
              if (!M(c9[dB][1])) {
                c9[dB][1] = ""
              }
              if (!M(c9[dB][2])) {
                c9[dB][2] = ""
              }
              if (!M(c9[dB][3]) || String(c9[dB][3]).length === 0) {
                c9[dB][3] = 0
              }
              if (!M(c9[dB][4]) || String(c9[dB][4]).length === 0) {
                c9[dB][4] = 1
              }
              dA.push(c9[dB])
            }
          }
          dy += "&ec_items=" + t(W.JSON.stringify(dA))
        }
        dy = cy(dy, at, "ecommerce")
        bM(dy, bQ)
        if (dx) {
          c9 = {}
        }
      }
      function b4(ds, dw, dv, du, dt, dx) {
        if (String(ds).length && M(dw)) {
          bx(ds, dw, dv, du, dt, dx)
        }
      }
      function bz(ds) {
        if (M(ds)) {
          bx("", ds, "", "", "", "")
        }
      }
      function b6(dt, dv, du) {
        if (!bH) {
          aQ = bm()
        }
        var ds = cy("action_name=" + t(ap(dt || bp)), dv, "log")
        if (a8 && !bn) {
          ds = aE(ds)
        }
        bM(ds, bQ, du)
      }
      function a6(du, dt) {
        var dv,
          ds = "(^| )(piwik[_-]" + dt + "|matomo[_-]" + dt
        if (du) {
          for (dv = 0; dv < du.length; dv++) {
            ds += "|" + du[dv]
          }
        }
        ds += ")( |$)"
        return new RegExp(ds)
      }
      function aZ(ds) {
        return aI && ds && 0 === String(ds).indexOf(aI)
      }
      function cC(dw, ds, dx, dt) {
        if (aZ(ds)) {
          return 0
        }
        var dv = a6(bR, "download"),
          du = a6(be, "link"),
          dy = new RegExp("\\.(" + df.join("|") + ")([?&#]|$)", "i")
        if (du.test(dw)) {
          return "link"
        }
        if (dt || dv.test(dw) || dy.test(ds)) {
          return "download"
        }
        if (dx) {
          return 0
        }
        return "link"
      }
      function ay(dt) {
        var ds
        ds = dt.parentNode
        while (ds !== null && M(ds)) {
          if (ai.isLinkElement(dt)) {
            break
          }
          dt = ds
          ds = dt.parentNode
        }
        return dt
      }
      function dk(dx) {
        dx = ay(dx)
        if (!ai.hasNodeAttribute(dx, "href")) {
          return
        }
        if (!M(dx.href)) {
          return
        }
        var dw = ai.getAttributeValueFromNode(dx, "href")
        var dt = dx.pathname || cr(dx.href)
        var dy = dx.hostname || d(dx.href)
        var dz = dy.toLowerCase()
        var du = dx.href.replace(dy, dz)
        var dv = new RegExp(
          "^(javascript|vbscript|jscript|mocha|livescript|ecmascript|mailto|tel):",
          "i"
        )
        if (!dv.test(du)) {
          var ds = cC(
            dx.className,
            du,
            aw(dz, dt),
            ai.hasNodeAttribute(dx, "download")
          )
          if (ds) {
            return { type: ds, href: du }
          }
        }
      }
      function aU(ds, dt, du, dv) {
        var dw = w.buildInteractionRequestParams(ds, dt, du, dv)
        if (!dw) {
          return
        }
        return cy(dw, null, "contentInteraction")
      }
      function bh(ds, dt) {
        if (!ds || !dt) {
          return false
        }
        var du = w.findTargetNode(ds)
        if (w.shouldIgnoreInteraction(du)) {
          return false
        }
        du = w.findTargetNodeNoDefault(ds)
        if (du && !Y(du, dt)) {
          return false
        }
        return true
      }
      function cB(du, dt, dw) {
        if (!du) {
          return
        }
        var ds = w.findParentContentNode(du)
        if (!ds) {
          return
        }
        if (!bh(ds, du)) {
          return
        }
        var dv = w.buildContentBlock(ds)
        if (!dv) {
          return
        }
        if (!dv.target && dw) {
          dv.target = dw
        }
        return w.buildInteractionRequestParams(dt, dv.name, dv.piece, dv.target)
      }
      function a2(dt) {
        if (!cg || !cg.length) {
          return false
        }
        var ds, du
        for (ds = 0; ds < cg.length; ds++) {
          du = cg[ds]
          if (
            du &&
            du.name === dt.name &&
            du.piece === dt.piece &&
            du.target === dt.target
          ) {
            return true
          }
        }
        return false
      }
      function a3(ds) {
        return function (dw) {
          if (!ds) {
            return
          }
          var du = w.findParentContentNode(ds)
          var dt
          if (dw) {
            dt = dw.target || dw.srcElement
          }
          if (!dt) {
            dt = ds
          }
          if (!bh(du, dt)) {
            return
          }
          if (!du) {
            return false
          }
          var dx = w.findTargetNode(du)
          if (!dx || w.shouldIgnoreInteraction(dx)) {
            return false
          }
          var dv = dk(dx)
          if (dh && dv && dv.type) {
            return dv.type
          }
          return bP.trackContentInteractionNode(dt, "click")
        }
      }
      function b7(du) {
        if (!du || !du.length) {
          return
        }
        var ds, dt
        for (ds = 0; ds < du.length; ds++) {
          dt = w.findTargetNode(du[ds])
          if (dt && !dt.contentInteractionTrackingSetupDone) {
            dt.contentInteractionTrackingSetupDone = true
            ar(dt, "click", a3(dt))
          }
        }
      }
      function bE(du, dv) {
        if (!du || !du.length) {
          return []
        }
        var ds, dt
        for (ds = 0; ds < du.length; ds++) {
          if (a2(du[ds])) {
            du.splice(ds, 1)
            ds--
          } else {
            cg.push(du[ds])
          }
        }
        if (!du || !du.length) {
          return []
        }
        b7(dv)
        var dw = []
        for (ds = 0; ds < du.length; ds++) {
          dt = cy(
            w.buildImpressionRequestParams(
              du[ds].name,
              du[ds].piece,
              du[ds].target
            ),
            undefined,
            "contentImpressions"
          )
          if (dt) {
            dw.push(dt)
          }
        }
        return dw
      }
      function cH(dt) {
        var ds = w.collectContent(dt)
        return bE(ds, dt)
      }
      function bf(dt) {
        if (!dt || !dt.length) {
          return []
        }
        var ds
        for (ds = 0; ds < dt.length; ds++) {
          if (!w.isNodeVisible(dt[ds])) {
            dt.splice(ds, 1)
            ds--
          }
        }
        if (!dt || !dt.length) {
          return []
        }
        return cH(dt)
      }
      function aK(du, ds, dt) {
        var dv = w.buildImpressionRequestParams(du, ds, dt)
        return cy(dv, null, "contentImpression")
      }
      function dj(dv, dt) {
        if (!dv) {
          return
        }
        var ds = w.findParentContentNode(dv)
        var du = w.buildContentBlock(ds)
        if (!du) {
          return
        }
        if (!dt) {
          dt = "Unknown"
        }
        return aU(dt, du.name, du.piece, du.target)
      }
      function cX(dt, dv, ds, du) {
        return (
          "e_c=" +
          t(dt) +
          "&e_a=" +
          t(dv) +
          (M(ds) ? "&e_n=" + t(ds) : "") +
          (M(du) ? "&e_v=" + t(du) : "") +
          "&ca=1"
        )
      }
      function ax(du, dw, ds, dv, dy, dx) {
        if (!ac(du) || !ac(dw)) {
          ao(
            "Error while logging event: Parameters `category` and `action` must not be empty or filled with whitespaces"
          )
          return false
        }
        var dt = cy(cX(du, dw, ds, dv), dy, "event")
        bM(dt, bQ, dx)
      }
      function ce(ds, dv, dt, dw) {
        var du = cy(
          "search=" +
            t(ds) +
            (dv ? "&search_cat=" + t(dv) : "") +
            (M(dt) ? "&search_count=" + dt : ""),
          dw,
          "sitesearch"
        )
        bM(du, bQ)
      }
      function c1(ds, dw, dv, du) {
        var dt = cy("idgoal=" + ds + (dw ? "&revenue=" + dw : ""), dv, "goal")
        bM(dt, bQ, du)
      }
      function da(dv, ds, dz, dy, du) {
        var dx = ds + "=" + t(b8(dv))
        var dt = cB(du, "click", dv)
        if (dt) {
          dx += "&" + dt
        }
        var dw = cy(dx, dz, "link")
        bM(dw, bQ, dy)
      }
      function b0(dt, ds) {
        if (dt !== "") {
          return dt + ds.charAt(0).toUpperCase() + ds.slice(1)
        }
        return ds
      }
      function cm(dx) {
        var dw,
          ds,
          dv = ["", "webkit", "ms", "moz"],
          du
        if (!bk) {
          for (ds = 0; ds < dv.length; ds++) {
            du = dv[ds]
            if (Object.prototype.hasOwnProperty.call(J, b0(du, "hidden"))) {
              if (J[b0(du, "visibilityState")] === "prerender") {
                dw = true
              }
              break
            }
          }
        }
        if (dw) {
          ar(J, du + "visibilitychange", function dt() {
            J.removeEventListener(du + "visibilitychange", dt, false)
            dx()
          })
          return
        }
        dx()
      }
      function by() {
        var dt = bP.getVisitorId()
        var ds = aO()
        return dt + ds
      }
      function cp(ds) {
        if (!ds) {
          return
        }
        if (!ai.hasNodeAttribute(ds, "href")) {
          return
        }
        var dt = ai.getAttributeValueFromNode(ds, "href")
        if (!dt || aZ(dt)) {
          return
        }
        if (!bP.getVisitorId()) {
          return
        }
        dt = j(dt, az)
        var du = by()
        dt = I(dt, az, du)
        ai.setAnyAttribute(ds, "href", dt)
      }
      function br(dv) {
        var dw = ai.getAttributeValueFromNode(dv, "href")
        if (!dw) {
          return false
        }
        dw = String(dw)
        var dt =
          dw.indexOf("//") === 0 ||
          dw.indexOf("http://") === 0 ||
          dw.indexOf("https://") === 0
        if (!dt) {
          return false
        }
        var ds = dv.pathname || cr(dv.href)
        var du = (dv.hostname || d(dv.href)).toLowerCase()
        if (aw(du, ds)) {
          if (!cP(c2, O(du))) {
            return true
          }
          return false
        }
        return false
      }
      function cO(ds) {
        var dt = dk(ds)
        if (dt && dt.type) {
          dt.href = p(dt.href)
          da(dt.href, dt.type, undefined, null, ds)
          return
        }
        if (cV) {
          ds = ay(ds)
          if (br(ds)) {
            cp(ds)
          }
        }
      }
      function cD() {
        return J.all && !J.addEventListener
      }
      function c3(ds) {
        var du = ds.which
        var dt = typeof ds.button
        if (!du && dt !== "undefined") {
          if (cD()) {
            if (ds.button & 1) {
              du = 1
            } else {
              if (ds.button & 2) {
                du = 3
              } else {
                if (ds.button & 4) {
                  du = 2
                }
              }
            }
          } else {
            if (ds.button === 0 || ds.button === "0") {
              du = 1
            } else {
              if (ds.button & 1) {
                du = 2
              } else {
                if (ds.button & 2) {
                  du = 3
                }
              }
            }
          }
        }
        return du
      }
      function bZ(ds) {
        switch (c3(ds)) {
          case 1:
            return "left"
          case 2:
            return "middle"
          case 3:
            return "right"
        }
      }
      function a7(ds) {
        return ds.target || ds.srcElement
      }
      function c4(ds) {
        return ds === "A" || ds === "AREA"
      }
      function aG(ds) {
        function dt(dv) {
          var dw = a7(dv)
          var dx = dw.nodeName
          var du = a6(bG, "ignore")
          while (!c4(dx) && dw && dw.parentNode) {
            dw = dw.parentNode
            dx = dw.nodeName
          }
          if (dw && c4(dx) && !du.test(dw.className)) {
            return dw
          }
        }
        return function (dw) {
          dw = dw || W.event
          var dx = dt(dw)
          if (!dx) {
            return
          }
          var dv = bZ(dw)
          if (dw.type === "click") {
            var du = false
            if (ds && dv === "middle") {
              du = true
            }
            if (dx && !du) {
              cO(dx)
            }
          } else {
            if (dw.type === "mousedown") {
              if (dv === "middle" && dx) {
                aW = dv
                bI = dx
              } else {
                aW = bI = null
              }
            } else {
              if (dw.type === "mouseup") {
                if (dv === aW && dx === bI) {
                  cO(dx)
                }
                aW = bI = null
              } else {
                if (dw.type === "contextmenu") {
                  cO(dx)
                }
              }
            }
          }
        }
      }
      function av(dv, du, ds) {
        var dt = typeof du
        if (dt === "undefined") {
          du = true
        }
        ar(dv, "click", aG(du), ds)
        if (du) {
          ar(dv, "mouseup", aG(du), ds)
          ar(dv, "mousedown", aG(du), ds)
          ar(dv, "contextmenu", aG(du), ds)
        }
      }
      function aX(dt, dw, dx) {
        if (ck) {
          return true
        }
        ck = true
        var dy = false
        var dv, du
        function ds() {
          dy = true
        }
        n(function () {
          function dz(dB) {
            setTimeout(function () {
              if (!ck) {
                return
              }
              dy = false
              dx.trackVisibleContentImpressions()
              dz(dB)
            }, dB)
          }
          function dA(dB) {
            setTimeout(function () {
              if (!ck) {
                return
              }
              if (dy) {
                dy = false
                dx.trackVisibleContentImpressions()
              }
              dA(dB)
            }, dB)
          }
          if (dt) {
            dv = ["scroll", "resize"]
            for (du = 0; du < dv.length; du++) {
              if (J.addEventListener) {
                J.addEventListener(dv[du], ds, false)
              } else {
                W.attachEvent("on" + dv[du], ds)
              }
            }
            dA(100)
          }
          if (dw && dw > 0) {
            dw = parseInt(dw, 10)
            dz(dw)
          }
        })
      }
      var bK = {
        enabled: true,
        requests: [],
        timeout: null,
        interval: 2500,
        sendRequests: function () {
          var ds = this.requests
          this.requests = []
          if (ds.length === 1) {
            bM(ds[0], bQ)
          } else {
            dn(ds, bQ)
          }
        },
        canQueue: function () {
          return !m && this.enabled
        },
        pushMultiple: function (dt) {
          if (!this.canQueue()) {
            dn(dt, bQ)
            return
          }
          var ds
          for (ds = 0; ds < dt.length; ds++) {
            this.push(dt[ds])
          }
        },
        push: function (ds) {
          if (!ds) {
            return
          }
          if (!this.canQueue()) {
            bM(ds, bQ)
            return
          }
          bK.requests.push(ds)
          if (this.timeout) {
            clearTimeout(this.timeout)
            this.timeout = null
          }
          this.timeout = setTimeout(function () {
            bK.timeout = null
            bK.sendRequests()
          }, bK.interval)
          var dt = "RequestQueue" + aB
          if (!Object.prototype.hasOwnProperty.call(b, dt)) {
            b[dt] = {
              unload: function () {
                if (bK.timeout) {
                  clearTimeout(bK.timeout)
                }
                bK.sendRequests()
              },
            }
          }
        },
      }
      bo()
      aR()
      this.hasConsent = function () {
        return bJ
      }
      this.getVisitorId = function () {
        return a4().uuid
      }
      this.getVisitorInfo = function () {
        return cW()
      }
      this.getAttributionInfo = function () {
        return bS()
      }
      this.getAttributionCampaignName = function () {
        return bS()[0]
      }
      this.getAttributionCampaignKeyword = function () {
        return bS()[1]
      }
      this.getAttributionReferrerTimestamp = function () {
        return bS()[2]
      }
      this.getAttributionReferrerUrl = function () {
        return bS()[3]
      }
      this.setTrackerUrl = function (ds) {
        aI = ds
      }
      this.getTrackerUrl = function () {
        return aI
      }
      this.getMatomoUrl = function () {
        return aa(this.getTrackerUrl(), bO)
      }
      this.getPiwikUrl = function () {
        return this.getMatomoUrl()
      }
      this.addTracker = function (du, dt) {
        if (!M(du) || null === du) {
          du = this.getTrackerUrl()
        }
        var ds = new T(du, dt)
        L.push(ds)
        u.trigger("TrackerAdded", [this])
        return ds
      }
      this.getSiteId = function () {
        return cc
      }
      this.setSiteId = function (ds) {
        b9(ds)
      }
      this.resetUserId = function () {
        bF = ""
      }
      this.setUserId = function (ds) {
        if (ac(ds)) {
          bF = ds
        }
      }
      this.setVisitorId = function (dt) {
        var ds = /[0-9A-Fa-f]{16}/g
        if (x(dt) && ds.test(dt)) {
          bU = dt
        } else {
          ao("Invalid visitorId set" + dt)
        }
      }
      this.getUserId = function () {
        return bF
      }
      this.setCustomData = function (ds, dt) {
        if (Z(ds)) {
          at = ds
        } else {
          if (!at) {
            at = {}
          }
          at[ds] = dt
        }
      }
      this.getCustomData = function () {
        return at
      }
      this.setCustomRequestProcessing = function (ds) {
        ch = ds
      }
      this.appendToTrackingUrl = function (ds) {
        c8 = ds
      }
      this.getRequest = function (ds) {
        return cy(ds)
      }
      this.addPlugin = function (ds, dt) {
        b[ds] = dt
      }
      this.setCustomDimension = function (ds, dt) {
        ds = parseInt(ds, 10)
        if (ds > 0) {
          if (!M(dt)) {
            dt = ""
          }
          if (!x(dt)) {
            dt = String(dt)
          }
          bt[ds] = dt
        }
      }
      this.getCustomDimension = function (ds) {
        ds = parseInt(ds, 10)
        if (ds > 0 && Object.prototype.hasOwnProperty.call(bt, ds)) {
          return bt[ds]
        }
      }
      this.deleteCustomDimension = function (ds) {
        ds = parseInt(ds, 10)
        if (ds > 0) {
          delete bt[ds]
        }
      }
      this.setCustomVariable = function (dt, ds, dw, du) {
        var dv
        if (!M(du)) {
          du = "visit"
        }
        if (!M(ds)) {
          return
        }
        if (!M(dw)) {
          dw = ""
        }
        if (dt > 0) {
          ds = !x(ds) ? String(ds) : ds
          dw = !x(dw) ? String(dw) : dw
          dv = [ds.slice(0, bA), dw.slice(0, bA)]
          if (du === "visit" || du === 2) {
            cN()
            aV[dt] = dv
          } else {
            if (du === "page" || du === 3) {
              b2[dt] = dv
            } else {
              if (du === "event") {
                cs[dt] = dv
              }
            }
          }
        }
      }
      this.getCustomVariable = function (dt, du) {
        var ds
        if (!M(du)) {
          du = "visit"
        }
        if (du === "page" || du === 3) {
          ds = b2[dt]
        } else {
          if (du === "event") {
            ds = cs[dt]
          } else {
            if (du === "visit" || du === 2) {
              cN()
              ds = aV[dt]
            }
          }
        }
        if (!M(ds) || (ds && ds[0] === "")) {
          return false
        }
        return ds
      }
      this.deleteCustomVariable = function (ds, dt) {
        if (this.getCustomVariable(ds, dt)) {
          this.setCustomVariable(ds, "", "", dt)
        }
      }
      this.deleteCustomVariables = function (ds) {
        if (ds === "page" || ds === 3) {
          b2 = {}
        } else {
          if (ds === "event") {
            cs = {}
          } else {
            if (ds === "visit" || ds === 2) {
              aV = {}
            }
          }
        }
      }
      this.storeCustomVariablesInCookie = function () {
        bW = true
      }
      this.setLinkTrackingTimer = function (ds) {
        bQ = ds
      }
      this.getLinkTrackingTimer = function () {
        return bQ
      }
      this.setDownloadExtensions = function (ds) {
        if (x(ds)) {
          ds = ds.split("|")
        }
        df = ds
      }
      this.addDownloadExtensions = function (dt) {
        var ds
        if (x(dt)) {
          dt = dt.split("|")
        }
        for (ds = 0; ds < dt.length; ds++) {
          df.push(dt[ds])
        }
      }
      this.removeDownloadExtensions = function (du) {
        var dt,
          ds = []
        if (x(du)) {
          du = du.split("|")
        }
        for (dt = 0; dt < df.length; dt++) {
          if (P(du, df[dt]) === -1) {
            ds.push(df[dt])
          }
        }
        df = ds
      }
      this.setDomains = function (ds) {
        aC = x(ds) ? [ds] : ds
        var dw = false,
          du = 0,
          dt
        for (du; du < aC.length; du++) {
          dt = String(aC[du])
          if (cP(c2, O(dt))) {
            dw = true
            break
          }
          var dv = cr(dt)
          if (dv && dv !== "/" && dv !== "/*") {
            dw = true
            break
          }
        }
        if (!dw) {
          aC.push(c2)
        }
      }
      this.enableCrossDomainLinking = function () {
        cV = true
      }
      this.disableCrossDomainLinking = function () {
        cV = false
      }
      this.isCrossDomainLinkingEnabled = function () {
        return cV
      }
      this.setCrossDomainLinkingTimeout = function (ds) {
        a5 = ds
      }
      this.getCrossDomainLinkingUrlParameter = function () {
        return t(az) + "=" + t(by())
      }
      this.setIgnoreClasses = function (ds) {
        bG = x(ds) ? [ds] : ds
      }
      this.setRequestMethod = function (ds) {
        if (ds) {
          di = String(ds).toUpperCase()
        } else {
          di = cn
        }
        if (di === "GET") {
          this.disableAlwaysUseSendBeacon()
        }
      }
      this.setRequestContentType = function (ds) {
        cE = ds || aM
      }
      this.setGenerationTimeMs = function (ds) {
        ao(
          "setGenerationTimeMs is no longer supported since Matomo 4. The call will be ignored. The replacement is setPagePerformanceTiming."
        )
      }
      this.setPagePerformanceTiming = function (dw, dy, dx, dt, dz, du) {
        var dv = {
          pf_net: dw,
          pf_srv: dy,
          pf_tfr: dx,
          pf_dm1: dt,
          pf_dm2: dz,
          pf_onl: du,
        }
        try {
          dv = Q(dv, M)
          dv = B(dv)
          ct = l(dv)
          if (ct === "") {
            ao(
              "setPagePerformanceTiming() called without parameters. This function needs to be called with at least one performance parameter."
            )
            return
          }
          bn = false
          bL = true
        } catch (ds) {
          ao("setPagePerformanceTiming: " + ds.toString())
        }
      }
      this.setReferrerUrl = function (ds) {
        bu = ds
      }
      this.setCustomUrl = function (ds) {
        ba = b1(bT, ds)
      }
      this.getCurrentUrl = function () {
        return ba || bT
      }
      this.setDocumentTitle = function (ds) {
        bp = ds
      }
      this.setPageViewId = function (ds) {
        aQ = ds
        bH = true
      }
      this.setAPIUrl = function (ds) {
        bO = ds
      }
      this.setDownloadClasses = function (ds) {
        bR = x(ds) ? [ds] : ds
      }
      this.setLinkClasses = function (ds) {
        be = x(ds) ? [ds] : ds
      }
      this.setCampaignNameKey = function (ds) {
        cw = x(ds) ? [ds] : ds
      }
      this.setCampaignKeywordKey = function (ds) {
        bN = x(ds) ? [ds] : ds
      }
      this.discardHashTag = function (ds) {
        bV = ds
      }
      this.setCookieNamePrefix = function (ds) {
        bq = ds
        if (aV) {
          aV = b3()
        }
      }
      this.setCookieDomain = function (ds) {
        var dt = O(ds)
        if (!bs && !bD(dt)) {
          ao("Can't write cookie on domain " + ds)
        } else {
          c6 = dt
          bo()
        }
      }
      this.setExcludedQueryParams = function (ds) {
        co = x(ds) ? [ds] : ds
      }
      this.getCookieDomain = function () {
        return c6
      }
      this.hasCookies = function () {
        return "1" === cb()
      }
      this.setSessionCookie = function (du, dt, ds) {
        if (!du) {
          throw new Error("Missing cookie name")
        }
        if (!M(ds)) {
          ds = cu
        }
        bB.push(du)
        dm(aY(du), dt, ds, bw, c6, bY, aN)
      }
      this.getCookie = function (dt) {
        var ds = aH(aY(dt))
        if (ds === 0) {
          return null
        }
        return ds
      }
      this.setCookiePath = function (ds) {
        bw = ds
        bo()
      }
      this.getCookiePath = function (ds) {
        return bw
      }
      this.setVisitorCookieTimeout = function (ds) {
        cS = ds * 1000
      }
      this.setSessionCookieTimeout = function (ds) {
        cu = ds * 1000
      }
      this.getSessionCookieTimeout = function () {
        return cu
      }
      this.setReferralCookieTimeout = function (ds) {
        de = ds * 1000
      }
      this.setConversionAttributionFirstReferrer = function (ds) {
        bC = ds
      }
      this.setSecureCookie = function (ds) {
        if (ds && location.protocol !== "https:") {
          ao("Error in setSecureCookie: You cannot use `Secure` on http.")
          return
        }
        bY = ds
      }
      this.setCookieSameSite = function (ds) {
        ds = String(ds)
        ds = ds.charAt(0).toUpperCase() + ds.toLowerCase().slice(1)
        if (ds !== "None" && ds !== "Lax" && ds !== "Strict") {
          ao(
            "Ignored value for sameSite. Please use either Lax, None, or Strict."
          )
          return
        }
        if (ds === "None") {
          if (location.protocol === "https:") {
            this.setSecureCookie(true)
          } else {
            ao(
              "sameSite=None cannot be used on http, reverted to sameSite=Lax."
            )
            ds = "Lax"
          }
        }
        aN = ds
      }
      this.disableCookies = function () {
        bs = true
        if (cc) {
          aJ()
        }
      }
      this.areCookiesEnabled = function () {
        return !bs
      }
      this.setCookieConsentGiven = function () {
        if (bs && !cY) {
          bs = false
          if (cc && aA) {
            aR()
            var ds = cy("ping=1", null, "ping")
            bM(ds, bQ)
          }
        }
      }
      this.requireCookieConsent = function () {
        if (this.getRememberedCookieConsent()) {
          return false
        }
        this.disableCookies()
        return true
      }
      this.getRememberedCookieConsent = function () {
        return aH(cL)
      }
      this.forgetCookieConsentGiven = function () {
        b5(cL, bw, c6)
        this.disableCookies()
      }
      this.rememberCookieConsentGiven = function (dt) {
        if (dt) {
          dt = dt * 60 * 60 * 1000
        } else {
          dt = 30 * 365 * 24 * 60 * 60 * 1000
        }
        this.setCookieConsentGiven()
        var ds = new Date().getTime()
        dm(cL, ds, dt, bw, c6, bY, aN)
      }
      this.deleteCookies = function () {
        aJ()
      }
      this.setDoNotTrack = function (dt) {
        var ds = g.doNotTrack || g.msDoNotTrack
        cY = dt && (ds === "yes" || ds === "1")
        if (cY) {
          this.disableCookies()
        }
      }
      this.alwaysUseSendBeacon = function () {
        c5 = true
      }
      this.disableAlwaysUseSendBeacon = function () {
        c5 = false
      }
      this.addListener = function (dt, ds) {
        av(dt, ds, false)
      }
      this.enableLinkTracking = function (dt) {
        if (dh) {
          return
        }
        dh = true
        var ds = this
        q(function () {
          au = true
          var du = J.body
          av(du, dt, true)
        })
      }
      this.enableJSErrorTracking = function () {
        if (c0) {
          return
        }
        c0 = true
        var ds = W.onerror
        W.onerror = function (dx, dv, du, dw, dt) {
          cm(function () {
            var dy = "JavaScript Errors"
            var dz = dv + ":" + du
            if (dw) {
              dz += ":" + dw
            }
            if (P(cz, dy + dz + dx) === -1) {
              cz.push(dy + dz + dx)
              ax(dy, dz, dx)
            }
          })
          if (ds) {
            return ds(dx, dv, du, dw, dt)
          }
          return false
        }
      }
      this.disablePerformanceTracking = function () {
        a8 = false
      }
      this.enableHeartBeatTimer = function (ds) {
        ds = Math.max(ds || 15, 5)
        bb = ds * 1000
        if (c7 !== null) {
          dp()
        }
      }
      this.disableHeartBeatTimer = function () {
        if (bb || aS) {
          if (W.removeEventListener) {
            W.removeEventListener("focus", bg)
            W.removeEventListener("blur", aD)
            W.removeEventListener("visibilitychange", a0)
          } else {
            if (W.detachEvent) {
              W.detachEvent("onfocus", bg)
              W.detachEvent("onblur", aD)
              W.detachEvent("visibilitychange", a0)
            }
          }
        }
        bb = null
        aS = false
      }
      this.killFrame = function () {
        if (W.location !== W.top.location) {
          W.top.location = W.location
        }
      }
      this.redirectFile = function (ds) {
        if (W.location.protocol === "file:") {
          W.location = ds
        }
      }
      this.setCountPreRendered = function (ds) {
        bk = ds
      }
      this.trackGoal = function (ds, dv, du, dt) {
        cm(function () {
          c1(ds, dv, du, dt)
        })
      }
      this.trackLink = function (dt, ds, dv, du) {
        cm(function () {
          da(dt, ds, dv, du)
        })
      }
      this.getNumTrackedPageViews = function () {
        return cx
      }
      this.trackPageView = function (ds, du, dt) {
        cg = []
        cT = []
        cz = []
        if (R(cc)) {
          cm(function () {
            ad(aI, bO, cc)
          })
        } else {
          cm(function () {
            cx++
            b6(ds, du, dt)
          })
        }
      }
      this.trackAllContentImpressions = function () {
        if (R(cc)) {
          return
        }
        cm(function () {
          q(function () {
            var ds = w.findContentNodes()
            var dt = cH(ds)
            bK.pushMultiple(dt)
          })
        })
      }
      this.trackVisibleContentImpressions = function (ds, dt) {
        if (R(cc)) {
          return
        }
        if (!M(ds)) {
          ds = true
        }
        if (!M(dt)) {
          dt = 750
        }
        aX(ds, dt, this)
        cm(function () {
          n(function () {
            var du = w.findContentNodes()
            var dv = bf(du)
            bK.pushMultiple(dv)
          })
        })
      }
      this.trackContentImpression = function (du, ds, dt) {
        if (R(cc)) {
          return
        }
        du = a(du)
        ds = a(ds)
        dt = a(dt)
        if (!du) {
          return
        }
        ds = ds || "Unknown"
        cm(function () {
          var dv = aK(du, ds, dt)
          bK.push(dv)
        })
      }
      this.trackContentImpressionsWithinNode = function (ds) {
        if (R(cc) || !ds) {
          return
        }
        cm(function () {
          if (ck) {
            n(function () {
              var dt = w.findContentNodesWithinNode(ds)
              var du = bf(dt)
              bK.pushMultiple(du)
            })
          } else {
            q(function () {
              var dt = w.findContentNodesWithinNode(ds)
              var du = cH(dt)
              bK.pushMultiple(du)
            })
          }
        })
      }
      this.trackContentInteraction = function (du, dv, ds, dt) {
        if (R(cc)) {
          return
        }
        du = a(du)
        dv = a(dv)
        ds = a(ds)
        dt = a(dt)
        if (!du || !dv) {
          return
        }
        ds = ds || "Unknown"
        cm(function () {
          var dw = aU(du, dv, ds, dt)
          if (dw) {
            bK.push(dw)
          }
        })
      }
      this.trackContentInteractionNode = function (du, dt) {
        if (R(cc) || !du) {
          return
        }
        var ds = null
        cm(function () {
          ds = dj(du, dt)
          if (ds) {
            bK.push(ds)
          }
        })
        return ds
      }
      this.logAllContentBlocksOnPage = function () {
        var du = w.findContentNodes()
        var ds = w.collectContent(du)
        var dt = typeof console
        if (dt !== "undefined" && console && console.log) {
          console.log(ds)
        }
      }
      this.trackEvent = function (dt, dv, ds, du, dx, dw) {
        cm(function () {
          ax(dt, dv, ds, du, dx, dw)
        })
      }
      this.trackSiteSearch = function (ds, du, dt, dv) {
        cg = []
        cm(function () {
          ce(ds, du, dt, dv)
        })
      }
      this.setEcommerceView = function (dw, ds, du, dt) {
        cA = {}
        if (ac(du)) {
          du = String(du)
        }
        if (!M(du) || du === null || du === false || !du.length) {
          du = ""
        } else {
          if (du instanceof Array) {
            du = W.JSON.stringify(du)
          }
        }
        var dv = "_pkc"
        cA[dv] = du
        if (M(dt) && dt !== null && dt !== false && String(dt).length) {
          dv = "_pkp"
          cA[dv] = dt
        }
        if (!ac(dw) && !ac(ds)) {
          return
        }
        if (ac(dw)) {
          dv = "_pks"
          cA[dv] = dw
        }
        if (!ac(ds)) {
          ds = ""
        }
        dv = "_pkn"
        cA[dv] = ds
      }
      this.getEcommerceItems = function () {
        return JSON.parse(JSON.stringify(c9))
      }
      this.addEcommerceItem = function (dw, ds, du, dt, dv) {
        if (ac(dw)) {
          c9[dw] = [String(dw), ds, du, dt, dv]
        }
      }
      this.removeEcommerceItem = function (ds) {
        if (ac(ds)) {
          ds = String(ds)
          delete c9[ds]
        }
      }
      this.clearEcommerceCart = function () {
        c9 = {}
      }
      this.trackEcommerceOrder = function (ds, dw, dv, du, dt, dx) {
        b4(ds, dw, dv, du, dt, dx)
      }
      this.trackEcommerceCartUpdate = function (ds) {
        bz(ds)
      }
      this.trackRequest = function (dt, dv, du, ds) {
        cm(function () {
          var dw = cy(dt, dv, ds)
          bM(dw, bQ, du)
        })
      }
      this.ping = function () {
        this.trackRequest("ping=1", null, null, "ping")
      }
      this.disableQueueRequest = function () {
        bK.enabled = false
      }
      this.setRequestQueueInterval = function (ds) {
        if (ds < 1000) {
          throw new Error("Request queue interval needs to be at least 1000ms")
        }
        bK.interval = ds
      }
      this.queueRequest = function (ds) {
        cm(function () {
          var dt = cy(ds)
          bK.push(dt)
        })
      }
      this.isConsentRequired = function () {
        return cI
      }
      this.getRememberedConsent = function () {
        var ds = aH(bj)
        if (aH(cU)) {
          if (ds) {
            b5(bj, bw, c6)
          }
          return null
        }
        if (!ds || ds === 0) {
          return null
        }
        return ds
      }
      this.hasRememberedConsent = function () {
        return !!this.getRememberedConsent()
      }
      this.requireConsent = function () {
        cI = true
        bJ = this.hasRememberedConsent()
        if (!bJ) {
          bs = true
        }
        y++
        b["CoreConsent" + y] = {
          unload: function () {
            if (!bJ) {
              aJ()
            }
          },
        }
      }
      this.setConsentGiven = function (dt) {
        bJ = true
        b5(cU, bw, c6)
        var du, ds
        for (du = 0; du < cT.length; du++) {
          ds = typeof cT[du]
          if (ds === "string") {
            bM(cT[du], bQ)
          } else {
            if (ds === "object") {
              dn(cT[du], bQ)
            }
          }
        }
        cT = []
        if (!M(dt) || dt) {
          this.setCookieConsentGiven()
        }
      }
      this.rememberConsentGiven = function (du) {
        if (du) {
          du = du * 60 * 60 * 1000
        } else {
          du = 30 * 365 * 24 * 60 * 60 * 1000
        }
        var ds = true
        this.setConsentGiven(ds)
        var dt = new Date().getTime()
        dm(bj, dt, du, bw, c6, bY, aN)
      }
      this.forgetConsentGiven = function () {
        var ds = 30 * 365 * 24 * 60 * 60 * 1000
        b5(bj, bw, c6)
        dm(cU, new Date().getTime(), ds, bw, c6, bY, aN)
        this.forgetCookieConsentGiven()
        this.requireConsent()
      }
      this.isUserOptedOut = function () {
        return !bJ
      }
      this.optUserOut = this.forgetConsentGiven
      this.forgetUserOptOut = function () {
        this.setConsentGiven(false)
      }
      n(function () {
        setTimeout(function () {
          bL = true
        }, 0)
      })
      u.trigger("TrackerSetup", [this])
    }
    function K() {
      return { push: aj }
    }
    function c(ay, ax) {
      var az = {}
      var av, aw
      for (av = 0; av < ax.length; av++) {
        var at = ax[av]
        az[at] = 1
        for (aw = 0; aw < ay.length; aw++) {
          if (ay[aw] && ay[aw][0]) {
            var au = ay[aw][0]
            if (at === au) {
              aj(ay[aw])
              delete ay[aw]
              if (
                az[au] > 1 &&
                au !== "addTracker" &&
                au !== "enableLinkTracking"
              ) {
                ao(
                  "The method " +
                    au +
                    ' is registered more than once in "_paq" variable. Only the last call has an effect. Please have a look at the multiple Matomo trackers documentation: https://developer.matomo.org/guides/tracking-javascript-guide#multiple-piwik-trackers'
                )
              }
              az[au]++
            }
          }
        }
      }
      return ay
    }
    var E = [
      "addTracker",
      "forgetCookieConsentGiven",
      "requireCookieConsent",
      "disableCookies",
      "setTrackerUrl",
      "setAPIUrl",
      "enableCrossDomainLinking",
      "setCrossDomainLinkingTimeout",
      "setSessionCookieTimeout",
      "setVisitorCookieTimeout",
      "setCookieNamePrefix",
      "setCookieSameSite",
      "setSecureCookie",
      "setCookiePath",
      "setCookieDomain",
      "setDomains",
      "setUserId",
      "setVisitorId",
      "setSiteId",
      "alwaysUseSendBeacon",
      "enableLinkTracking",
      "setCookieConsentGiven",
      "requireConsent",
      "setConsentGiven",
      "disablePerformanceTracking",
      "setPagePerformanceTiming",
      "setExcludedQueryParams",
    ]
    function ah(av, au) {
      var at = new T(av, au)
      L.push(at)
      _paq = c(_paq, E)
      for (H = 0; H < _paq.length; H++) {
        if (_paq[H]) {
          aj(_paq[H])
        }
      }
      _paq = new K()
      u.trigger("TrackerAdded", [at])
      return at
    }
    ar(W, "beforeunload", am, false)
    ar(
      W,
      "online",
      function () {
        if (M(g.serviceWorker)) {
          g.serviceWorker.ready.then(
            function (at) {
              if (at && at.sync) {
                return at.sync.register("matomoSync")
              }
            },
            function () {}
          )
        }
      },
      false
    )
    ar(
      W,
      "message",
      function (ay) {
        if (!ay || !ay.origin) {
          return
        }
        var aA, aw, au
        var aB = d(ay.origin)
        var ax = u.getAsyncTrackers()
        for (aw = 0; aw < ax.length; aw++) {
          au = d(ax[aw].getMatomoUrl())
          if (au === aB) {
            aA = ax[aw]
            break
          }
        }
        if (!aA) {
          return
        }
        var av = null
        try {
          av = JSON.parse(ay.data)
        } catch (az) {
          return
        }
        if (!av) {
          return
        }
        function at(aE) {
          var aG = J.getElementsByTagName("iframe")
          for (aw = 0; aw < aG.length; aw++) {
            var aF = aG[aw]
            var aC = d(aF.src)
            if (
              aF.contentWindow &&
              M(aF.contentWindow.postMessage) &&
              aC === aB
            ) {
              var aD = JSON.stringify(aE)
              aF.contentWindow.postMessage(aD, "*")
            }
          }
        }
        if (M(av.maq_initial_value)) {
          at({
            maq_opted_in: av.maq_initial_value && aA.hasConsent(),
            maq_url: aA.getMatomoUrl(),
            maq_optout_by_default: aA.isConsentRequired(),
          })
        } else {
          if (M(av.maq_opted_in)) {
            ax = u.getAsyncTrackers()
            for (aw = 0; aw < ax.length; aw++) {
              aA = ax[aw]
              if (av.maq_opted_in) {
                aA.rememberConsentGiven()
              } else {
                aA.forgetConsentGiven()
              }
            }
            at({
              maq_confirm_opted_in: aA.hasConsent(),
              maq_url: aA.getMatomoUrl(),
              maq_optout_by_default: aA.isConsentRequired(),
            })
          }
        }
      },
      false
    )
    Date.prototype.getTimeAlias = Date.prototype.getTime
    u = {
      initialized: false,
      JSON: W.JSON,
      DOM: {
        addEventListener: function (aw, av, au, at) {
          var ax = typeof at
          if (ax === "undefined") {
            at = false
          }
          ar(aw, av, au, at)
        },
        onLoad: n,
        onReady: q,
        isNodeVisible: i,
        isOrWasNodeVisible: w.isNodeVisible,
      },
      on: function (au, at) {
        if (!z[au]) {
          z[au] = []
        }
        z[au].push(at)
      },
      off: function (av, au) {
        if (!z[av]) {
          return
        }
        var at = 0
        for (at; at < z[av].length; at++) {
          if (z[av][at] === au) {
            z[av].splice(at, 1)
          }
        }
      },
      trigger: function (av, aw, au) {
        if (!z[av]) {
          return
        }
        var at = 0
        for (at; at < z[av].length; at++) {
          z[av][at].apply(au || W, aw)
        }
      },
      addPlugin: function (at, au) {
        b[at] = au
      },
      getTracker: function (au, at) {
        if (!M(at)) {
          at = this.getAsyncTracker().getSiteId()
        }
        if (!M(au)) {
          au = this.getAsyncTracker().getTrackerUrl()
        }
        return new T(au, at)
      },
      getAsyncTrackers: function () {
        return L
      },
      addTracker: function (av, au) {
        var at
        if (!L.length) {
          at = ah(av, au)
        } else {
          at = L[0].addTracker(av, au)
        }
        return at
      },
      getAsyncTracker: function (ax, aw) {
        var av
        if (L && L.length && L[0]) {
          av = L[0]
        } else {
          return ah(ax, aw)
        }
        if (!aw && !ax) {
          return av
        }
        if ((!M(aw) || null === aw) && av) {
          aw = av.getSiteId()
        }
        if ((!M(ax) || null === ax) && av) {
          ax = av.getTrackerUrl()
        }
        var au,
          at = 0
        for (at; at < L.length; at++) {
          au = L[at]
          if (
            au &&
            String(au.getSiteId()) === String(aw) &&
            au.getTrackerUrl() === ax
          ) {
            return au
          }
        }
      },
      retryMissedPluginCalls: function () {
        var au = al
        al = []
        var at = 0
        for (at; at < au.length; at++) {
          aj(au[at])
        }
      },
    }
    if (typeof define === "function" && define.amd) {
      define("piwik", [], function () {
        return u
      })
      define("matomo", [], function () {
        return u
      })
    }
    return u
  })()
}
/*!!! pluginTrackerHook */

/* GENERATED: tracker.min.js */
;(function () {
  function a() {
    if ("object" === typeof window && !window.Matomo) {
      return
    }
    window.Matomo.on("TrackerSetup", function (b) {
      b.setCookieConsentGiven = function () {}
      b.rememberCookieConsentGiven = function () {}
      b.disableCookies()
    })
  }
  if ("object" === typeof window.Matomo) {
    a()
  } else {
    if ("object" !== typeof window.matomoPluginAsyncInit) {
      window.matomoPluginAsyncInit = []
    }
    window.matomoPluginAsyncInit.push(a)
  }
})()
/* END GENERATED: tracker.min.js */
;(function () {
  function b() {
    if ("object" !== typeof _paq) {
      return false
    }
    var c = typeof _paq.length
    if ("undefined" === c) {
      return false
    }
    return !!_paq.length
  }
  if (
    window &&
    "object" === typeof window.matomoPluginAsyncInit &&
    window.matomoPluginAsyncInit.length
  ) {
    var a = 0
    for (a; a < window.matomoPluginAsyncInit.length; a++) {
      if (typeof window.matomoPluginAsyncInit[a] === "function") {
        window.matomoPluginAsyncInit[a]()
      }
    }
  }
  if (window && window.piwikAsyncInit) {
    window.piwikAsyncInit()
  }
  if (window && window.matomoAsyncInit) {
    window.matomoAsyncInit()
  }
  if (!window.Matomo.getAsyncTrackers().length) {
    if (b()) {
      window.Matomo.addTracker()
    } else {
      _paq = {
        push: function (c) {
          var d = typeof console
          if (d !== "undefined" && console && console.error) {
            console.error(
              "_paq.push() was used but Matomo tracker was not initialized before the matomo.js file was loaded. Make sure to configure the tracker via _paq.push before loading matomo.js. Alternatively, you can create a tracker via Matomo.addTracker() manually and then use _paq.push but it may not fully work as tracker methods may not be executed in the correct order.",
              c
            )
          }
        },
      }
    }
  }
  window.Matomo.trigger("MatomoInitialized", [])
  window.Matomo.initialized = true
})()
;(function () {
  var a = typeof window.AnalyticsTracker
  if (a === "undefined") {
    window.AnalyticsTracker = window.Matomo
  }
})()
if (typeof window.piwik_log !== "function") {
  window.piwik_log = function (c, e, g, f) {
    function b(h) {
      try {
        if (window["piwik_" + h]) {
          return window["piwik_" + h]
        }
      } catch (i) {}
      return
    }
    var d,
      a = window.Matomo.getTracker(g, e)
    a.setDocumentTitle(c)
    a.setCustomData(f)
    d = b("tracker_pause")
    if (d) {
      a.setLinkTrackingTimer(d)
    }
    d = b("download_extensions")
    if (d) {
      a.setDownloadExtensions(d)
    }
    d = b("hosts_alias")
    if (d) {
      a.setDomains(d)
    }
    d = b("ignore_classes")
    if (d) {
      a.setIgnoreClasses(d)
    }
    a.trackPageView()
    if (b("install_tracker")) {
      piwik_track = function (i, j, k, h) {
        a.setSiteId(j)
        a.setTrackerUrl(k)
        a.trackLink(i, h)
      }
      a.enableLinkTracking()
    }
  }
}
/*!! @license-end */
