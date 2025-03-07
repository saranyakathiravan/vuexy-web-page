!(function (e, t) {
  if ("object" == typeof exports && "object" == typeof module)
    module.exports = t();
  else if ("function" == typeof define && define.amd) define([], t);
  else {
    var n = t();
    for (var i in n) ("object" == typeof exports ? exports : e)[i] = n[i];
  }
})(self, function () {
  return (function () {
    "use strict";
    var e = {
        d: function (t, n) {
          for (var i in n)
            e.o(n, i) &&
              !e.o(t, i) &&
              Object.defineProperty(t, i, { enumerable: !0, get: n[i] });
        },
        o: function (e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        },
        r: function (e) {
          "undefined" != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(e, "__esModule", { value: !0 });
        },
      },
      t = {};
    function n(e) {
      return (
        a(e) ||
        (function (e) {
          if (
            ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
            null != e["@@iterator"]
          )
            return Array.from(e);
        })(e) ||
        r(e) ||
        o()
      );
    }
    function i(e, t) {
      return (
        a(e) ||
        (function (e, t) {
          var n =
            null == e
              ? null
              : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                e["@@iterator"];
          if (null != n) {
            var i,
              o,
              r,
              s,
              a = [],
              l = !0,
              u = !1;
            try {
              if (((r = (n = n.call(e)).next), 0 === t)) {
                if (Object(n) !== n) return;
                l = !1;
              } else
                for (
                  ;
                  !(l = (i = r.call(n)).done) &&
                  (a.push(i.value), a.length !== t);
                  l = !0
                );
            } catch (e) {
              (u = !0), (o = e);
            } finally {
              try {
                if (
                  !l &&
                  null != n.return &&
                  ((s = n.return()), Object(s) !== s)
                )
                  return;
              } finally {
                if (u) throw o;
              }
            }
            return a;
          }
        })(e, t) ||
        r(e, t) ||
        o()
      );
    }
    function o() {
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      );
    }
    function r(e, t) {
      if (e) {
        if ("string" == typeof e) return s(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        return (
          "Object" === n && e.constructor && (n = e.constructor.name),
          "Map" === n || "Set" === n
            ? Array.from(e)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? s(e, t)
            : void 0
        );
      }
    }
    function s(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
      return i;
    }
    function a(e) {
      if (Array.isArray(e)) return e;
    }
    e.r(t),
      e.d(t, {
        Helpers: function () {
          return d;
        },
      });
    var l = ["transitionend", "webkitTransitionEnd", "oTransitionEnd"],
      u = [
        "transition",
        "MozTransition",
        "webkitTransition",
        "WebkitTransition",
        "OTransition",
      ];
    function c(e) {
      throw new Error(
        "Parameter required".concat(e ? ": `".concat(e, "`") : "")
      );
    }
    var d = {
      ROOT_EL: "undefined" != typeof window ? document.documentElement : null,
      LAYOUT_BREAKPOINT: 1200,
      RESIZE_DELAY: 200,
      menuPsScroll: null,
      mainMenu: null,
      _curStyle: null,
      _styleEl: null,
      _resizeTimeout: null,
      _resizeCallback: null,
      _transitionCallback: null,
      _transitionCallbackTimeout: null,
      _listeners: [],
      _initialized: !1,
      _autoUpdate: !1,
      _lastWindowHeight: 0,
      _scrollToActive: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : 500,
          n = this.getLayoutMenu();
        if (n) {
          var i = n.querySelector("li.menu-item.active:not(.open)");
          if (i) {
            var o = this.getLayoutMenu().querySelector(".menu-inner");
            if (
              ("string" == typeof i && (i = document.querySelector(i)),
              "number" != typeof i &&
                (i = i.getBoundingClientRect().top + o.scrollTop),
              i < parseInt((2 * o.clientHeight) / 3, 10))
            )
              return;
            var r = o.scrollTop,
              s = i - r - parseInt(o.clientHeight / 2, 10),
              a = +new Date();
            !0 === e
              ? (function e() {
                  var n,
                    i,
                    l,
                    u = +new Date() - a,
                    c =
                      ((n = u),
                      (i = r),
                      (l = s),
                      (n /= t / 2) < 1
                        ? (l / 2) * n * n + i
                        : (-l / 2) * ((n -= 1) * (n - 2) - 1) + i);
                  (o.scrollTop = c),
                    u < t ? requestAnimationFrame(e) : (o.scrollTop = s);
                })()
              : (o.scrollTop = s);
          }
        }
      },
      _swipeIn: function (e, t) {
        var n = window.Hammer;
        if (void 0 !== n && "string" == typeof e) {
          var i = document.querySelector(e);
          i && new n(i).on("panright", t);
        }
      },
      _swipeOut: function (e, t) {
        var n = window.Hammer;
        void 0 !== n &&
          "string" == typeof e &&
          setTimeout(function () {
            var i = document.querySelector(e);
            if (i) {
              var o = new n(i);
              o.get("pan").set({ direction: n.DIRECTION_ALL, threshold: 250 }),
                o.on("panleft", t);
            }
          }, 500);
      },
      _overlayTap: function (e, t) {
        var n = window.Hammer;
        if (void 0 !== n && "string" == typeof e) {
          var i = document.querySelector(e);
          i && new n(i).on("tap", t);
        }
      },
      _addClass: function (e) {
        var t =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : this.ROOT_EL;
        t && void 0 !== t.length
          ? t.forEach(function (t) {
              t &&
                e.split(" ").forEach(function (e) {
                  return t.classList.add(e);
                });
            })
          : t &&
            e.split(" ").forEach(function (e) {
              return t.classList.add(e);
            });
      },
      _removeClass: function (e) {
        var t =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : this.ROOT_EL;
        t && void 0 !== t.length
          ? t.forEach(function (t) {
              t &&
                e.split(" ").forEach(function (e) {
                  return t.classList.remove(e);
                });
            })
          : t &&
            e.split(" ").forEach(function (e) {
              return t.classList.remove(e);
            });
      },
      _toggleClass: function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : this.ROOT_EL,
          t = arguments.length > 1 ? arguments[1] : void 0,
          n = arguments.length > 2 ? arguments[2] : void 0;
        e.classList.contains(t)
          ? e.classList.replace(t, n)
          : e.classList.replace(n, t);
      },
      _hasClass: function (e) {
        var t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : this.ROOT_EL,
          n = !1;
        return (
          e.split(" ").forEach(function (e) {
            t.classList.contains(e) && (n = !0);
          }),
          n
        );
      },
      _findParent: function (e, t) {
        if (
          (e && "BODY" === e.tagName.toUpperCase()) ||
          "HTML" === e.tagName.toUpperCase()
        )
          return null;
        for (
          e = e.parentNode;
          e && "BODY" !== e.tagName.toUpperCase() && !e.classList.contains(t);

        )
          e = e.parentNode;
        return e && "BODY" !== e.tagName.toUpperCase() ? e : null;
      },
      _triggerWindowEvent: function (e) {
        var t;
        "undefined" != typeof window &&
          (document.createEvent
            ? ("function" == typeof Event
                ? (t = new Event(e))
                : (t = document.createEvent("Event")).initEvent(e, !1, !0),
              window.dispatchEvent(t))
            : window.fireEvent("on".concat(e), document.createEventObject()));
      },
      _triggerEvent: function (e) {
        this._triggerWindowEvent("layout".concat(e)),
          this._listeners
            .filter(function (t) {
              return t.event === e;
            })
            .forEach(function (e) {
              return e.callback.call(null);
            });
      },
      _updateInlineStyle: function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
          t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        this._styleEl ||
          ((this._styleEl = document.createElement("style")),
          (this._styleEl.type = "text/css"),
          document.head.appendChild(this._styleEl));
        var n =
          "\n.layout-menu-fixed .layout-navbar-full .layout-menu,\n.layout-menu-fixed-offcanvas .layout-navbar-full .layout-menu {\n  top: {navbarHeight}px !important;\n}\n.layout-page {\n  padding-top: {navbarHeight}px !important;\n}\n.content-wrapper {\n  padding-bottom: {footerHeight}px !important;\n}"
            .replace(/\{navbarHeight\}/gi, e)
            .replace(/\{footerHeight\}/gi, t);
        this._curStyle !== n &&
          ((this._curStyle = n), (this._styleEl.textContent = n));
      },
      _removeInlineStyle: function () {
        this._styleEl && document.head.removeChild(this._styleEl),
          (this._styleEl = null),
          (this._curStyle = null);
      },
      _redrawLayoutMenu: function () {
        var e = this.getLayoutMenu();
        if (e && e.querySelector(".menu")) {
          var t = e.querySelector(".menu-inner"),
            n = t.scrollTop,
            i = document.documentElement.scrollTop;
          return (
            (e.style.display = "none"),
            (e.style.display = ""),
            (t.scrollTop = n),
            (document.documentElement.scrollTop = i),
            !0
          );
        }
        return !1;
      },
      _supportsTransitionEnd: function () {
        if (window.QUnit) return !1;
        var e = document.body || document.documentElement;
        if (!e) return !1;
        var t = !1;
        return (
          u.forEach(function (n) {
            void 0 !== e.style[n] && (t = !0);
          }),
          t
        );
      },
      _getNavbarHeight: function () {
        var e = this,
          t = this.getLayoutNavbar();
        if (!t) return 0;
        if (!this.isSmallScreen()) return t.getBoundingClientRect().height;
        var n = t.cloneNode(!0);
        (n.id = null),
          (n.style.visibility = "hidden"),
          (n.style.position = "absolute"),
          Array.prototype.slice
            .call(n.querySelectorAll(".collapse.show"))
            .forEach(function (t) {
              return e._removeClass("show", t);
            }),
          t.parentNode.insertBefore(n, t);
        var i = n.getBoundingClientRect().height;
        return n.parentNode.removeChild(n), i;
      },
      _getFooterHeight: function () {
        var e = this.getLayoutFooter();
        return e ? e.getBoundingClientRect().height : 0;
      },
      _getAnimationDuration: function (e) {
        var t = window.getComputedStyle(e).transitionDuration;
        return parseFloat(t) * (-1 !== t.indexOf("ms") ? 1 : 1e3);
      },
      _setMenuHoverState: function (e) {
        this[e ? "_addClass" : "_removeClass"]("layout-menu-hover");
      },
      _setCollapsed: function (e) {
        var t = this;
        this.isSmallScreen()
          ? e
            ? this._removeClass("layout-menu-expanded")
            : setTimeout(
                function () {
                  t._addClass("layout-menu-expanded");
                },
                this._redrawLayoutMenu() ? 5 : 0
              )
          : this[e ? "_addClass" : "_removeClass"]("layout-menu-collapsed");
      },
      _bindLayoutAnimationEndEvent: function (e, t) {
        var n = this,
          i = this.getMenu(),
          o = i ? this._getAnimationDuration(i) + 50 : 0;
        if (!o) return e.call(this), void t.call(this);
        (this._transitionCallback = function (e) {
          e.target === i && (n._unbindLayoutAnimationEndEvent(), t.call(n));
        }),
          l.forEach(function (e) {
            i.addEventListener(e, n._transitionCallback, !1);
          }),
          e.call(this),
          (this._transitionCallbackTimeout = setTimeout(function () {
            n._transitionCallback.call(n, { target: i });
          }, o));
      },
      _unbindLayoutAnimationEndEvent: function () {
        var e = this,
          t = this.getMenu();
        this._transitionCallbackTimeout &&
          (clearTimeout(this._transitionCallbackTimeout),
          (this._transitionCallbackTimeout = null)),
          t &&
            this._transitionCallback &&
            l.forEach(function (n) {
              t.removeEventListener(n, e._transitionCallback, !1);
            }),
          this._transitionCallback && (this._transitionCallback = null);
      },
      _bindWindowResizeEvent: function () {
        var e = this;
        this._unbindWindowResizeEvent();
        var t = function () {
          e._resizeTimeout &&
            (clearTimeout(e._resizeTimeout), (e._resizeTimeout = null)),
            e._triggerEvent("resize");
        };
        (this._resizeCallback = function () {
          e._resizeTimeout && clearTimeout(e._resizeTimeout),
            (e._resizeTimeout = setTimeout(t, e.RESIZE_DELAY));
        }),
          window.addEventListener("resize", this._resizeCallback, !1);
      },
      _unbindWindowResizeEvent: function () {
        this._resizeTimeout &&
          (clearTimeout(this._resizeTimeout), (this._resizeTimeout = null)),
          this._resizeCallback &&
            (window.removeEventListener("resize", this._resizeCallback, !1),
            (this._resizeCallback = null));
      },
      _bindMenuMouseEvents: function () {
        var e = this;
        if (
          !(
            this._menuMouseEnter &&
            this._menuMouseLeave &&
            this._windowTouchStart
          )
        ) {
          var t = this.getLayoutMenu();
          if (!t) return this._unbindMenuMouseEvents();
          this._menuMouseEnter ||
            ((this._menuMouseEnter = function () {
              return e.isSmallScreen() ||
                !e._hasClass("layout-menu-collapsed") ||
                e.isOffcanvas() ||
                e._hasClass("layout-transitioning")
                ? e._setMenuHoverState(!1)
                : e._setMenuHoverState(!0);
            }),
            t.addEventListener("mouseenter", this._menuMouseEnter, !1),
            t.addEventListener("touchstart", this._menuMouseEnter, !1)),
            this._menuMouseLeave ||
              ((this._menuMouseLeave = function () {
                e._setMenuHoverState(!1);
              }),
              t.addEventListener("mouseleave", this._menuMouseLeave, !1)),
            this._windowTouchStart ||
              ((this._windowTouchStart = function (t) {
                (t && t.target && e._findParent(t.target, ".layout-menu")) ||
                  e._setMenuHoverState(!1);
              }),
              window.addEventListener(
                "touchstart",
                this._windowTouchStart,
                !0
              ));
        }
      },
      _unbindMenuMouseEvents: function () {
        if (
          this._menuMouseEnter ||
          this._menuMouseLeave ||
          this._windowTouchStart
        ) {
          var e = this.getLayoutMenu();
          this._menuMouseEnter &&
            (e &&
              (e.removeEventListener("mouseenter", this._menuMouseEnter, !1),
              e.removeEventListener("touchstart", this._menuMouseEnter, !1)),
            (this._menuMouseEnter = null)),
            this._menuMouseLeave &&
              (e &&
                e.removeEventListener("mouseleave", this._menuMouseLeave, !1),
              (this._menuMouseLeave = null)),
            this._windowTouchStart &&
              (e &&
                window.addEventListener(
                  "touchstart",
                  this._windowTouchStart,
                  !0
                ),
              (this._windowTouchStart = null)),
            this._setMenuHoverState(!1);
        }
      },
      scrollToActive: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        this._scrollToActive(e);
      },
      swipeIn: function (e, t) {
        this._swipeIn(e, t);
      },
      swipeOut: function (e, t) {
        this._swipeOut(e, t);
      },
      overlayTap: function (e, t) {
        this._overlayTap(e, t);
      },
      scrollPageTo: function (e) {
        var t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : 500,
          n = document.scrollingElement;
        "string" == typeof e && (e = document.querySelector(e)),
          "number" != typeof e &&
            (e = e.getBoundingClientRect().top + n.scrollTop);
        var i = n.scrollTop,
          o = e - i,
          r = +new Date();
        !(function s() {
          var a,
            l,
            u,
            c = +new Date() - r,
            d =
              ((a = c),
              (l = i),
              (u = o),
              (a /= t / 2) < 1
                ? (u / 2) * a * a + l
                : (-u / 2) * ((a -= 1) * (a - 2) - 1) + l);
          (n.scrollTop = d),
            c < t ? requestAnimationFrame(s) : (n.scrollTop = e);
        })();
      },
      setCollapsed: function () {
        var e = this,
          t =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : c("collapsed"),
          n =
            !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        this.getLayoutMenu() &&
          (this._unbindLayoutAnimationEndEvent(),
          n && this._supportsTransitionEnd()
            ? (this._addClass("layout-transitioning"),
              t && this._setMenuHoverState(!1),
              this._bindLayoutAnimationEndEvent(
                function () {
                  e._setCollapsed(t);
                },
                function () {
                  e._removeClass("layout-transitioning"),
                    e._triggerWindowEvent("resize"),
                    e._triggerEvent("toggle"),
                    e._setMenuHoverState(!1);
                }
              ))
            : (this._addClass("layout-no-transition"),
              t && this._setMenuHoverState(!1),
              this._setCollapsed(t),
              setTimeout(function () {
                e._removeClass("layout-no-transition"),
                  e._triggerWindowEvent("resize"),
                  e._triggerEvent("toggle"),
                  e._setMenuHoverState(!1);
              }, 1)));
      },
      toggleCollapsed: function () {
        var e =
          !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        this.setCollapsed(!this.isCollapsed(), e);
      },
      setPosition: function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : c("fixed"),
          t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : c("offcanvas");
        this._removeClass(
          "layout-menu-offcanvas layout-menu-fixed layout-menu-fixed-offcanvas"
        ),
          !e && t
            ? this._addClass("layout-menu-offcanvas")
            : e && !t
            ? (this._addClass("layout-menu-fixed"), this._redrawLayoutMenu())
            : e &&
              t &&
              (this._addClass("layout-menu-fixed-offcanvas"),
              this._redrawLayoutMenu()),
          this.update();
      },
      getLayoutMenu: function () {
        return document.querySelector(".layout-menu");
      },
      getMenu: function () {
        var e = this.getLayoutMenu();
        return e
          ? this._hasClass("menu", e)
            ? e
            : e.querySelector(".menu")
          : null;
      },
      getLayoutNavbar: function () {
        return document.querySelector(".layout-navbar");
      },
      getLayoutFooter: function () {
        return document.querySelector(".content-footer");
      },
      getLayoutContainer: function () {
        return document.querySelector(".layout-page");
      },
      setNavbarFixed: function () {
        this[
          (
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : c("fixed")
          )
            ? "_addClass"
            : "_removeClass"
        ]("layout-navbar-fixed"),
          this.update();
      },
      setNavbar: function (e) {
        "sticky" === e
          ? (this._addClass("layout-navbar-fixed"),
            this._removeClass("layout-navbar-hidden"))
          : "hidden" === e
          ? (this._addClass("layout-navbar-hidden"),
            this._removeClass("layout-navbar-fixed"))
          : (this._removeClass("layout-navbar-hidden"),
            this._removeClass("layout-navbar-fixed")),
          this.update();
      },
      setFooterFixed: function () {
        this[
          (
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : c("fixed")
          )
            ? "_addClass"
            : "_removeClass"
        ]("layout-footer-fixed"),
          this.update();
      },
      setContentLayout: function () {
        var e = this,
          t =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : c("contentLayout");
        setTimeout(function () {
          var n,
            i = document.querySelector(".content-wrapper > div"),
            o = document.querySelector(".layout-navbar"),
            r = document.querySelector(".layout-navbar > div"),
            s = document.querySelector(".layout-navbar .search-input-wrapper"),
            a = document.querySelector(
              ".layout-navbar .search-input-wrapper .search-input"
            ),
            l = document.querySelector(".content-footer > div"),
            u = [].slice.call(document.querySelectorAll(".container-fluid")),
            c = [].slice.call(document.querySelectorAll(".container-xxl")),
            d = document.querySelector(".menu-vertical"),
            f = !1;
          document.querySelector(".content-wrapper > .menu-horizontal > div") &&
            ((f = !0),
            (n = document.querySelector(
              ".content-wrapper > .menu-horizontal > div"
            ))),
            "compact" === t
              ? (u.some(function (e) {
                  return [i, l].includes(e);
                }) &&
                  (e._removeClass("container-fluid", [i, l]),
                  e._addClass("container-xxl", [i, l])),
                a &&
                  (e._removeClass("container-fluid", [a]),
                  e._addClass("container-xxl", [a])),
                d &&
                  u.some(function (e) {
                    return [o].includes(e);
                  }) &&
                  (e._removeClass("container-fluid", [o]),
                  e._addClass("container-xxl", [o])),
                f &&
                  (e._removeClass("container-fluid", n),
                  e._addClass("container-xxl", n),
                  r &&
                    (e._removeClass("container-fluid", r),
                    e._addClass("container-xxl", r)),
                  s &&
                    (e._removeClass("container-fluid", s),
                    e._addClass("container-xxl", s))))
              : (c.some(function (e) {
                  return [i, l].includes(e);
                }) &&
                  (e._removeClass("container-xxl", [i, l]),
                  e._addClass("container-fluid", [i, l])),
                a &&
                  (e._removeClass("container-xxl", [a]),
                  e._addClass("container-fluid", [a])),
                d &&
                  c.some(function (e) {
                    return [o].includes(e);
                  }) &&
                  (e._removeClass("container-xxl", [o]),
                  e._addClass("container-fluid", [o])),
                f &&
                  (e._removeClass("container-xxl", n),
                  e._addClass("container-fluid", n),
                  r &&
                    (e._removeClass("container-xxl", r),
                    e._addClass("container-fluid", r)),
                  s &&
                    (e._removeClass("container-xxl", s),
                    e._addClass("container-fluid", s))));
        }, 100);
      },
      update: function () {
        ((this.getLayoutNavbar() &&
          ((!this.isSmallScreen() &&
            this.isLayoutNavbarFull() &&
            this.isFixed()) ||
            this.isNavbarFixed())) ||
          (this.getLayoutFooter() && this.isFooterFixed())) &&
          this._updateInlineStyle(
            this._getNavbarHeight(),
            this._getFooterHeight()
          ),
          this._bindMenuMouseEvents();
      },
      setAutoUpdate: function () {
        var e = this,
          t =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : c("enable");
        t && !this._autoUpdate
          ? (this.on("resize.Helpers:autoUpdate", function () {
              return e.update();
            }),
            (this._autoUpdate = !0))
          : !t &&
            this._autoUpdate &&
            (this.off("resize.Helpers:autoUpdate"), (this._autoUpdate = !1));
      },
      updateCustomOptionCheck: function (e) {
        e.checked
          ? ("radio" === e.type &&
              [].slice
                .call(e.closest(".row").querySelectorAll(".custom-option"))
                .map(function (e) {
                  e.closest(".custom-option").classList.remove("checked");
                }),
            e.closest(".custom-option").classList.add("checked"))
          : e.closest(".custom-option").classList.remove("checked");
      },
      isRtl: function () {
        return (
          "rtl" === document.querySelector("body").getAttribute("dir") ||
          "rtl" === document.querySelector("html").getAttribute("dir")
        );
      },
      isMobileDevice: function () {
        return (
          void 0 !== window.orientation ||
          -1 !== navigator.userAgent.indexOf("IEMobile")
        );
      },
      isSmallScreen: function () {
        return (
          (window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth) < this.LAYOUT_BREAKPOINT
        );
      },
      isLayoutNavbarFull: function () {
        return !!document.querySelector(".layout-wrapper.layout-navbar-full");
      },
      isCollapsed: function () {
        return this.isSmallScreen()
          ? !this._hasClass("layout-menu-expanded")
          : this._hasClass("layout-menu-collapsed");
      },
      isFixed: function () {
        return this._hasClass("layout-menu-fixed layout-menu-fixed-offcanvas");
      },
      isOffcanvas: function () {
        return this._hasClass(
          "layout-menu-offcanvas layout-menu-fixed-offcanvas"
        );
      },
      isNavbarFixed: function () {
        return (
          this._hasClass("layout-navbar-fixed") ||
          (!this.isSmallScreen() && this.isFixed() && this.isLayoutNavbarFull())
        );
      },
      isFooterFixed: function () {
        return this._hasClass("layout-footer-fixed");
      },
      isLightStyle: function () {
        return document.documentElement.classList.contains("light-style");
      },
      isDarkStyle: function () {
        return document.documentElement.classList.contains("dark-style");
      },
      on: function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : c("event"),
          t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : c("callback"),
          o = i(e.split("."), 1)[0],
          r = n(e.split(".")).slice(1);
        (r = r.join(".") || null),
          this._listeners.push({ event: o, namespace: r, callback: t });
      },
      off: function () {
        var e = this,
          t =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : c("event"),
          o = i(t.split("."), 1)[0],
          r = n(t.split(".")).slice(1);
        (r = r.join(".") || null),
          this._listeners
            .filter(function (e) {
              return e.event === o && e.namespace === r;
            })
            .forEach(function (t) {
              return e._listeners.splice(e._listeners.indexOf(t), 1);
            });
      },
      init: function () {
        var e = this;
        this._initialized ||
          ((this._initialized = !0),
          this._updateInlineStyle(0),
          this._bindWindowResizeEvent(),
          this.off("init._Helpers"),
          this.on("init._Helpers", function () {
            e.off("resize._Helpers:redrawMenu"),
              e.on("resize._Helpers:redrawMenu", function () {
                e.isSmallScreen() && !e.isCollapsed() && e._redrawLayoutMenu();
              }),
              "number" == typeof document.documentMode &&
                document.documentMode < 11 &&
                (e.off("resize._Helpers:ie10RepaintBody"),
                e.on("resize._Helpers:ie10RepaintBody", function () {
                  if (!e.isFixed()) {
                    var t = document.documentElement.scrollTop;
                    (document.body.style.display = "none"),
                      (document.body.style.display = "block"),
                      (document.documentElement.scrollTop = t);
                  }
                }));
          }),
          this._triggerEvent("init"));
      },
      destroy: function () {
        var e = this;
        this._initialized &&
          ((this._initialized = !1),
          this._removeClass("layout-transitioning"),
          this._removeInlineStyle(),
          this._unbindLayoutAnimationEndEvent(),
          this._unbindWindowResizeEvent(),
          this._unbindMenuMouseEvents(),
          this.setAutoUpdate(!1),
          this.off("init._Helpers"),
          this._listeners
            .filter(function (e) {
              return "init" !== e.event;
            })
            .forEach(function (t) {
              return e._listeners.splice(e._listeners.indexOf(t), 1);
            }));
      },
      initPasswordToggle: function () {
        var e = document.querySelectorAll(".form-password-toggle i");
        null != e &&
          e.forEach(function (e) {
            e.addEventListener("click", function (t) {
              t.preventDefault();
              var n = e.closest(".form-password-toggle"),
                i = n.querySelector("i"),
                o = n.querySelector("input");
              "text" === o.getAttribute("type")
                ? (o.setAttribute("type", "password"),
                  i.classList.replace("ti-eye", "ti-eye-off"))
                : "password" === o.getAttribute("type") &&
                  (o.setAttribute("type", "text"),
                  i.classList.replace("ti-eye-off", "ti-eye"));
            });
          });
      },
      initCustomOptionCheck: function () {
        var e = this;
        [].slice
          .call(document.querySelectorAll(".custom-option .form-check-input"))
          .map(function (t) {
            e.updateCustomOptionCheck(t),
              t.addEventListener("click", function (n) {
                e.updateCustomOptionCheck(t);
              });
          });
      },
      initSpeechToText: function () {
        var e = window.SpeechRecognition || window.webkitSpeechRecognition,
          t = document.querySelectorAll(".speech-to-text");
        if (null != e && null != t) {
          var n = new e();
          document.querySelectorAll(".speech-to-text i").forEach(function (e) {
            var t = !1;
            e.addEventListener("click", function () {
              e.closest(".input-group").querySelector(".form-control").focus(),
                (n.onspeechstart = function () {
                  t = !0;
                }),
                !1 === t && n.start(),
                (n.onerror = function () {
                  t = !1;
                }),
                (n.onresult = function (t) {
                  e
                    .closest(".input-group")
                    .querySelector(".form-control").value =
                    t.results[0][0].transcript;
                }),
                (n.onspeechend = function () {
                  (t = !1), n.stop();
                });
            });
          });
        }
      },
      initNavbarDropdownScrollbar: function () {
        var e = document.querySelectorAll(
            ".navbar-dropdown .scrollable-container"
          ),
          t = window.PerfectScrollbar;
        void 0 !== t &&
          null != e &&
          e.forEach(function (e) {
            new t(e, { wheelPropagation: !1, suppressScrollX: !0 });
          });
      },
      ajaxCall: function (e) {
        return new Promise(function (t, n) {
          var i = new XMLHttpRequest();
          i.open("GET", e),
            (i.onload = function () {
              return 200 === i.status ? t(i.response) : n(Error(i.statusText));
            }),
            (i.onerror = function (e) {
              return n(Error("Network Error: ".concat(e)));
            }),
            i.send();
        });
      },
      initSidebarToggle: function () {
        document
          .querySelectorAll('[data-bs-toggle="sidebar"]')
          .forEach(function (e) {
            e.addEventListener("click", function () {
              var t = e.getAttribute("data-target"),
                n = e.getAttribute("data-overlay"),
                i = document.querySelectorAll(".app-overlay");
              document.querySelectorAll(t).forEach(function (e) {
                e.classList.toggle("show"),
                  null != n &&
                    !1 !== n &&
                    void 0 !== i &&
                    (e.classList.contains("show")
                      ? i[0].classList.add("show")
                      : i[0].classList.remove("show"),
                    i[0].addEventListener("click", function (t) {
                      t.currentTarget.classList.remove("show"),
                        e.classList.remove("show");
                    }));
              });
            });
          });
      },
    };
    return (
      "undefined" != typeof window &&
        (d.init(),
        d.isMobileDevice() &&
          window.chrome &&
          document.documentElement.classList.add("layout-menu-100vh"),
        "complete" === document.readyState
          ? d.update()
          : document.addEventListener("DOMContentLoaded", function e() {
              d.update(), document.removeEventListener("DOMContentLoaded", e);
            })),
      (window.Helpers = d),
      t
    );
  })();
});
