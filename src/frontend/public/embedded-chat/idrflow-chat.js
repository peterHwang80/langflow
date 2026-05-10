/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis,
  Z =
    j.ShadowRoot &&
    (j.ShadyCSS === void 0 || j.ShadyCSS.nativeShadow) &&
    "adoptedStyleSheets" in Document.prototype &&
    "replace" in CSSStyleSheet.prototype,
  G = Symbol(),
  Q = /* @__PURE__ */ new WeakMap();
let pt = class {
  constructor(t, e, i) {
    if (((this._$cssResult$ = !0), i !== G))
      throw Error(
        "CSSResult is not constructable. Use `unsafeCSS` or `css` instead.",
      );
    (this.cssText = t), (this.t = e);
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Z && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Q.get(e)),
        t === void 0 &&
          ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText),
          i && Q.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const _t = (s) => new pt(typeof s == "string" ? s : s + "", void 0, G),
  wt = (s, ...t) => {
    const e =
      s.length === 1
        ? s[0]
        : t.reduce(
            (i, r, n) =>
              i +
              ((o) => {
                if (o._$cssResult$ === !0) return o.cssText;
                if (typeof o == "number") return o;
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    o +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.",
                );
              })(r) +
              s[n + 1],
            s[0],
          );
    return new pt(e, s, G);
  },
  vt = (s, t) => {
    if (Z)
      s.adoptedStyleSheets = t.map((e) =>
        e instanceof CSSStyleSheet ? e : e.styleSheet,
      );
    else
      for (const e of t) {
        const i = document.createElement("style"),
          r = j.litNonce;
        r !== void 0 && i.setAttribute("nonce", r),
          (i.textContent = e.cssText),
          s.appendChild(i);
      }
  },
  tt = Z
    ? (s) => s
    : (s) =>
        s instanceof CSSStyleSheet
          ? ((t) => {
              let e = "";
              for (const i of t.cssRules) e += i.cssText;
              return _t(e);
            })(s)
          : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const {
    is: xt,
    defineProperty: St,
    getOwnPropertyDescriptor: At,
    getOwnPropertyNames: Et,
    getOwnPropertySymbols: It,
    getPrototypeOf: Ct,
  } = Object,
  y = globalThis,
  et = y.trustedTypes,
  Pt = et ? et.emptyScript : "",
  q = y.reactiveElementPolyfillSupport,
  P = (s, t) => s,
  L = {
    toAttribute(s, t) {
      switch (t) {
        case Boolean:
          s = s ? Pt : null;
          break;
        case Object:
        case Array:
          s = s == null ? s : JSON.stringify(s);
      }
      return s;
    },
    fromAttribute(s, t) {
      let e = s;
      switch (t) {
        case Boolean:
          e = s !== null;
          break;
        case Number:
          e = s === null ? null : Number(s);
          break;
        case Object:
        case Array:
          try {
            e = JSON.parse(s);
          } catch {
            e = null;
          }
      }
      return e;
    },
  },
  Y = (s, t) => !xt(s, t),
  st = {
    attribute: !0,
    type: String,
    converter: L,
    reflect: !1,
    useDefault: !1,
    hasChanged: Y,
  };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")),
  y.litPropertyMetadata ??
    (y.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let S = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = st) {
    if (
      (e.state && (e.attribute = !1),
      this._$Ei(),
      Object.hasOwn(this.prototype, t) && ((e = Object.create(e)).wrapped = !0),
      this.elementProperties.set(t, e),
      !e.noAccessor)
    ) {
      const i = Symbol(),
        r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && St(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: n } = At(this.prototype, t) ?? {
      get() {
        return this[e];
      },
      set(o) {
        this[e] = o;
      },
    };
    return {
      get: r,
      set(o) {
        const l = r == null ? void 0 : r.call(this);
        n == null || n.call(this, o), this.requestUpdate(t, l, i);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? st;
  }
  static _$Ei() {
    if (Object.hasOwn(this, P("elementProperties"))) return;
    const t = Ct(this);
    t.finalize(),
      t.l !== void 0 && (this.l = [...t.l]),
      (this.elementProperties = new Map(t.elementProperties));
  }
  static finalize() {
    if (Object.hasOwn(this, P("finalized"))) return;
    if (
      ((this.finalized = !0), this._$Ei(), Object.hasOwn(this, P("properties")))
    ) {
      const e = this.properties,
        i = [...Et(e), ...It(e)];
      for (const r of i) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0)
        for (const [i, r] of e) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const r = this._$Eu(e, i);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) e.unshift(tt(r));
    } else t !== void 0 && e.push(tt(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1
      ? void 0
      : typeof i == "string"
        ? i
        : typeof t == "string"
          ? t.toLowerCase()
          : void 0;
  }
  constructor() {
    super(),
      (this._$Ep = void 0),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$Em = null),
      this._$Ev();
  }
  _$Ev() {
    var t;
    (this._$ES = new Promise((e) => (this.enableUpdating = e))),
      (this._$AL = /* @__PURE__ */ new Map()),
      this._$E_(),
      this.requestUpdate(),
      (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t),
      this.renderRoot !== void 0 &&
        this.isConnected &&
        ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(),
      e = this.constructor.elementProperties;
    for (const i of e.keys())
      Object.hasOwn(this, i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t =
      this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return vt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      (t = this._$EO) == null ||
        t.forEach((e) => {
          var i;
          return (i = e.hostConnected) == null ? void 0 : i.call(e);
        });
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null ||
      t.forEach((e) => {
        var i;
        return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
      });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var n;
    const i = this.constructor.elementProperties.get(t),
      r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const o = (
        ((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0
          ? i.converter
          : L
      ).toAttribute(e, i.type);
      (this._$Em = t),
        o == null ? this.removeAttribute(r) : this.setAttribute(r, o),
        (this._$Em = null);
    }
  }
  _$AK(t, e) {
    var n, o;
    const i = this.constructor,
      r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const l = i.getPropertyOptions(r),
        a =
          typeof l.converter == "function"
            ? { fromAttribute: l.converter }
            : ((n = l.converter) == null ? void 0 : n.fromAttribute) !== void 0
              ? l.converter
              : L;
      this._$Em = r;
      const d = a.fromAttribute(e, l.type);
      (this[r] = d ?? ((o = this._$Ej) == null ? void 0 : o.get(r)) ?? d),
        (this._$Em = null);
    }
  }
  requestUpdate(t, e, i, r = !1, n) {
    var o;
    if (t !== void 0) {
      const l = this.constructor;
      if (
        (r === !1 && (n = this[t]),
        i ?? (i = l.getPropertyOptions(t)),
        !(
          (i.hasChanged ?? Y)(n, e) ||
          (i.useDefault &&
            i.reflect &&
            n === ((o = this._$Ej) == null ? void 0 : o.get(t)) &&
            !this.hasAttribute(l._$Eu(t, i)))
        ))
      )
        return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: r, wrapped: n }, o) {
    (i &&
      !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) &&
      (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0)) ||
      (this._$AL.has(t) ||
        (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)),
      r === !0 &&
        this._$Em !== t &&
        (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (
        (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()),
        this._$Ep)
      ) {
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0)
        for (const [n, o] of r) {
          const { wrapped: l } = o,
            a = this[n];
          l !== !0 ||
            this._$AL.has(n) ||
            a === void 0 ||
            this.C(n, void 0, o, a);
        }
    }
    let t = !1;
    const e = this._$AL;
    try {
      (t = this.shouldUpdate(e)),
        t
          ? (this.willUpdate(e),
            (i = this._$EO) == null ||
              i.forEach((r) => {
                var n;
                return (n = r.hostUpdate) == null ? void 0 : n.call(r);
              }),
            this.update(e))
          : this._$EM();
    } catch (r) {
      throw ((t = !1), this._$EM(), r);
    }
    t && this._$AE(e);
  }
  willUpdate(t) {}
  _$AE(t) {
    var e;
    (e = this._$EO) == null ||
      e.forEach((i) => {
        var r;
        return (r = i.hostUpdated) == null ? void 0 : r.call(i);
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t);
  }
  _$EM() {
    (this._$AL = /* @__PURE__ */ new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))),
      this._$EM();
  }
  updated(t) {}
  firstUpdated(t) {}
};
(S.elementStyles = []),
  (S.shadowRootOptions = { mode: "open" }),
  (S[P("elementProperties")] = /* @__PURE__ */ new Map()),
  (S[P("finalized")] = /* @__PURE__ */ new Map()),
  q == null || q({ ReactiveElement: S }),
  (y.reactiveElementVersions ?? (y.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = globalThis,
  it = (s) => s,
  B = k.trustedTypes,
  rt = B ? B.createPolicy("lit-html", { createHTML: (s) => s }) : void 0,
  ut = "$lit$",
  b = `lit$${Math.random().toFixed(9).slice(2)}$`,
  ft = "?" + b,
  kt = `<${ft}>`,
  x = document,
  T = () => x.createComment(""),
  O = (s) => s === null || (typeof s != "object" && typeof s != "function"),
  X = Array.isArray,
  Ut = (s) =>
    X(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function",
  W = `[
\f\r]`,
  C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  nt = /-->/g,
  ot = />/g,
  _ = RegExp(
    `>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^
\f\r"'\`<>=]|("|')|))|$)`,
    "g",
  ),
  at = /'/g,
  lt = /"/g,
  mt = /^(?:script|style|textarea|title)$/i,
  Tt =
    (s) =>
    (t, ...e) => ({ _$litType$: s, strings: t, values: e }),
  D = Tt(1),
  E = Symbol.for("lit-noChange"),
  p = Symbol.for("lit-nothing"),
  dt = /* @__PURE__ */ new WeakMap(),
  w = x.createTreeWalker(x, 129);
function gt(s, t) {
  if (!X(s) || !Object.hasOwn(s, "raw"))
    throw Error("invalid template strings array");
  return rt !== void 0 ? rt.createHTML(t) : t;
}
const Ot = (s, t) => {
  const e = s.length - 1,
    i = [];
  let r,
    n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "",
    o = C;
  for (let l = 0; l < e; l++) {
    const a = s[l];
    let d,
      h,
      c = -1,
      m = 0;
    for (; m < a.length && ((o.lastIndex = m), (h = o.exec(a)), h !== null); )
      (m = o.lastIndex),
        o === C
          ? h[1] === "!--"
            ? (o = nt)
            : h[1] !== void 0
              ? (o = ot)
              : h[2] !== void 0
                ? (mt.test(h[2]) && (r = RegExp("</" + h[2], "g")), (o = _))
                : h[3] !== void 0 && (o = _)
          : o === _
            ? h[0] === ">"
              ? ((o = r ?? C), (c = -1))
              : h[1] === void 0
                ? (c = -2)
                : ((c = o.lastIndex - h[2].length),
                  (d = h[1]),
                  (o = h[3] === void 0 ? _ : h[3] === '"' ? lt : at))
            : o === lt || o === at
              ? (o = _)
              : o === nt || o === ot
                ? (o = C)
                : ((o = _), (r = void 0));
    const g = o === _ && s[l + 1].startsWith("/>") ? " " : "";
    n +=
      o === C
        ? a + kt
        : c >= 0
          ? (i.push(d), a.slice(0, c) + ut + a.slice(c) + b + g)
          : a + b + (c === -2 ? l : g);
  }
  return [
    gt(
      s,
      n + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : ""),
    ),
    i,
  ];
};
class M {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let n = 0,
      o = 0;
    const l = t.length - 1,
      a = this.parts,
      [d, h] = Ot(t, e);
    if (
      ((this.el = M.createElement(d, i)),
      (w.currentNode = this.el.content),
      e === 2 || e === 3)
    ) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = w.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes())
          for (const c of r.getAttributeNames())
            if (c.endsWith(ut)) {
              const m = h[o++],
                g = r.getAttribute(c).split(b),
                H = /([.?@])?(.*)/.exec(m);
              a.push({
                type: 1,
                index: n,
                name: H[2],
                strings: g,
                ctor:
                  H[1] === "." ? Nt : H[1] === "?" ? Rt : H[1] === "@" ? zt : V,
              }),
                r.removeAttribute(c);
            } else
              c.startsWith(b) &&
                (a.push({ type: 6, index: n }), r.removeAttribute(c));
        if (mt.test(r.tagName)) {
          const c = r.textContent.split(b),
            m = c.length - 1;
          if (m > 0) {
            r.textContent = B ? B.emptyScript : "";
            for (let g = 0; g < m; g++)
              r.append(c[g], T()),
                w.nextNode(),
                a.push({ type: 2, index: ++n });
            r.append(c[m], T());
          }
        }
      } else if (r.nodeType === 8)
        if (r.data === ft) a.push({ type: 2, index: n });
        else {
          let c = -1;
          for (; (c = r.data.indexOf(b, c + 1)) !== -1; )
            a.push({ type: 7, index: n }), (c += b.length - 1);
        }
      n++;
    }
  }
  static createElement(t, e) {
    const i = x.createElement("template");
    return (i.innerHTML = t), i;
  }
}
function I(s, t, e = s, i) {
  var o, l;
  if (t === E) return t;
  let r = i !== void 0 ? ((o = e._$Co) == null ? void 0 : o[i]) : e._$Cl;
  const n = O(t) ? void 0 : t._$litDirective$;
  return (
    (r == null ? void 0 : r.constructor) !== n &&
      ((l = r == null ? void 0 : r._$AO) == null || l.call(r, !1),
      n === void 0 ? (r = void 0) : ((r = new n(s)), r._$AT(s, e, i)),
      i !== void 0 ? ((e._$Co ?? (e._$Co = []))[i] = r) : (e._$Cl = r)),
    r !== void 0 && (t = I(s, r._$AS(s, t.values), r, i)),
    t
  );
}
class Mt {
  constructor(t, e) {
    (this._$AV = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = e);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const {
        el: { content: e },
        parts: i,
      } = this._$AD,
      r = ((t == null ? void 0 : t.creationScope) ?? x).importNode(e, !0);
    w.currentNode = r;
    let n = w.nextNode(),
      o = 0,
      l = 0,
      a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let d;
        a.type === 2
          ? (d = new N(n, n.nextSibling, this, t))
          : a.type === 1
            ? (d = new a.ctor(n, a.name, a.strings, this, t))
            : a.type === 6 && (d = new Ht(n, this, t)),
          this._$AV.push(d),
          (a = i[++l]);
      }
      o !== (a == null ? void 0 : a.index) && ((n = w.nextNode()), o++);
    }
    return (w.currentNode = x), r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV)
      i !== void 0 &&
        (i.strings !== void 0
          ? (i._$AI(t, i, e), (e += i.strings.length - 2))
          : i._$AI(t[e])),
        e++;
  }
}
class N {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, r) {
    (this.type = 2),
      (this._$AH = p),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = e),
      (this._$AM = i),
      (this.options = r),
      (this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0);
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return (
      e !== void 0 &&
        (t == null ? void 0 : t.nodeType) === 11 &&
        (t = e.parentNode),
      t
    );
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    (t = I(this, t, e)),
      O(t)
        ? t === p || t == null || t === ""
          ? (this._$AH !== p && this._$AR(), (this._$AH = p))
          : t !== this._$AH && t !== E && this._(t)
        : t._$litType$ !== void 0
          ? this.$(t)
          : t.nodeType !== void 0
            ? this.T(t)
            : Ut(t)
              ? this.k(t)
              : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.O(t)));
  }
  _(t) {
    this._$AH !== p && O(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.T(x.createTextNode(t)),
      (this._$AH = t);
  }
  $(t) {
    var n;
    const { values: e, _$litType$: i } = t,
      r =
        typeof i == "number"
          ? this._$AC(t)
          : (i.el === void 0 &&
              (i.el = M.createElement(gt(i.h, i.h[0]), this.options)),
            i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === r) this._$AH.p(e);
    else {
      const o = new Mt(r, this),
        l = o.u(this.options);
      o.p(e), this.T(l), (this._$AH = o);
    }
  }
  _$AC(t) {
    let e = dt.get(t.strings);
    return e === void 0 && dt.set(t.strings, (e = new M(t))), e;
  }
  k(t) {
    X(this._$AH) || ((this._$AH = []), this._$AR());
    const e = this._$AH;
    let i,
      r = 0;
    for (const n of t)
      r === e.length
        ? e.push((i = new N(this.O(T()), this.O(T()), this, this.options)))
        : (i = e[r]),
        i._$AI(n),
        r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), (e.length = r));
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for (
      (i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e);
      t !== this._$AB;
    ) {
      const r = it(t).nextSibling;
      it(t).remove(), (t = r);
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 &&
      ((this._$Cv = t), (e = this._$AP) == null || e.call(this, t));
  }
}
class V {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, r, n) {
    (this.type = 1),
      (this._$AH = p),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = e),
      (this._$AM = r),
      (this.options = n),
      i.length > 2 || i[0] !== "" || i[1] !== ""
        ? ((this._$AH = Array(i.length - 1).fill(new String())),
          (this.strings = i))
        : (this._$AH = p);
  }
  _$AI(t, e = this, i, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0)
      (t = I(this, t, e, 0)),
        (o = !O(t) || (t !== this._$AH && t !== E)),
        o && (this._$AH = t);
    else {
      const l = t;
      let a, d;
      for (t = n[0], a = 0; a < n.length - 1; a++)
        (d = I(this, l[i + a], e, a)),
          d === E && (d = this._$AH[a]),
          o || (o = !O(d) || d !== this._$AH[a]),
          d === p ? (t = p) : t !== p && (t += (d ?? "") + n[a + 1]),
          (this._$AH[a] = d);
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === p
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, t ?? "");
  }
}
class Nt extends V {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Rt extends V {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class zt extends V {
  constructor(t, e, i, r, n) {
    super(t, e, i, r, n), (this.type = 5);
  }
  _$AI(t, e = this) {
    if ((t = I(this, t, e, 0) ?? p) === E) return;
    const i = this._$AH,
      r =
        (t === p && i !== p) ||
        t.capture !== i.capture ||
        t.once !== i.once ||
        t.passive !== i.passive,
      n = t !== p && (i === p || r);
    r && this.element.removeEventListener(this.name, this, i),
      n && this.element.addEventListener(this.name, this, t),
      (this._$AH = t);
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function"
      ? this._$AH.call(
          ((e = this.options) == null ? void 0 : e.host) ?? this.element,
          t,
        )
      : this._$AH.handleEvent(t);
  }
}
class Ht {
  constructor(t, e, i) {
    (this.element = t),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = e),
      (this.options = i);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    I(this, t);
  }
}
const J = k.litHtmlPolyfillSupport;
J == null || J(M, N),
  (k.litHtmlVersions ?? (k.litHtmlVersions = [])).push("3.3.2");
const Dt = (s, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = r = new N(t.insertBefore(T(), n), n, void 0, e ?? {});
  }
  return r._$AI(s), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const v = globalThis;
class U extends S {
  constructor() {
    super(...arguments),
      (this.renderOptions = { host: this }),
      (this._$Do = void 0);
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (
      (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild),
      t
    );
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      (this._$Do = Dt(e, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return E;
  }
}
var ht;
(U._$litElement$ = !0),
  (U.finalized = !0),
  (ht = v.litElementHydrateSupport) == null || ht.call(v, { LitElement: U });
const F = v.litElementPolyfillSupport;
F == null || F({ LitElement: U });
(v.litElementVersions ?? (v.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const jt = (s) => (t, e) => {
  e !== void 0
    ? e.addInitializer(() => {
        customElements.define(s, t);
      })
    : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Kt = {
    attribute: !0,
    type: String,
    converter: L,
    reflect: !1,
    hasChanged: Y,
  },
  Lt = (s = Kt, t, e) => {
    const { kind: i, metadata: r } = e;
    let n = globalThis.litPropertyMetadata.get(r);
    if (
      (n === void 0 &&
        globalThis.litPropertyMetadata.set(r, (n = /* @__PURE__ */ new Map())),
      i === "setter" && ((s = Object.create(s)).wrapped = !0),
      n.set(e.name, s),
      i === "accessor")
    ) {
      const { name: o } = e;
      return {
        set(l) {
          const a = t.get.call(this);
          t.set.call(this, l), this.requestUpdate(o, a, s, !0, l);
        },
        init(l) {
          return l !== void 0 && this.C(o, void 0, s, l), l;
        },
      };
    }
    if (i === "setter") {
      const { name: o } = e;
      return function (l) {
        const a = this[o];
        t.call(this, l), this.requestUpdate(o, a, s, !0, l);
      };
    }
    throw Error("Unsupported decorator location: " + i);
  };
function R(s) {
  return (t, e) =>
    typeof e == "object"
      ? Lt(s, t, e)
      : ((i, r, n) => {
          const o = Object.hasOwn(r, n);
          return (
            r.constructor.createProperty(n, i),
            o ? Object.getOwnPropertyDescriptor(r, n) : void 0
          );
        })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function $(s) {
  return R({ ...s, state: !0, attribute: !1 });
}
const ct = "client_id",
  Bt = "idrflow-embedded-chat";
function z(s) {
  return s.trim().replace(/\/+$/, "");
}
function Vt(s) {
  return s.trim() ? "authenticated" : "public";
}
function qt(s) {
  var r, n;
  const e = (((r = s.data) == null ? void 0 : r.nodes) ?? []).filter((o) => {
    var a, d;
    const l =
      ((a = o.data) == null ? void 0 : a.type) ??
      ((d = o.data) == null ? void 0 : d.id) ??
      o.id ??
      "";
    return typeof l == "string" && l.startsWith("ChatInput");
  });
  if (e.length !== 1)
    throw new Error(`Expected exactly one ChatInput node, found ${e.length}.`);
  const i = e[0].id ?? ((n = e[0].data) == null ? void 0 : n.id);
  if (!i) throw new Error("The ChatInput node is missing an id.");
  return i;
}
function Wt(s) {
  return [Bt, s.mode, z(s.hostUrl), s.flowId.trim()].join(":");
}
function Jt(s) {
  try {
    const t = window.localStorage.getItem(s);
    if (!t) return null;
    const e = JSON.parse(t);
    return typeof (e == null ? void 0 : e.sessionId) != "string" ||
      !Array.isArray(e == null ? void 0 : e.messages)
      ? null
      : e;
  } catch {
    return null;
  }
}
function Ft(s, t) {
  try {
    window.localStorage.setItem(s, JSON.stringify(t));
  } catch {}
}
function Zt(s) {
  try {
    window.localStorage.removeItem(s);
  } catch {}
}
function A() {
  var s;
  return typeof ((s = globalThis.crypto) == null ? void 0 : s.randomUUID) ==
    "function"
    ? globalThis.crypto.randomUUID()
    : `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
function Gt(s, t) {
  try {
    const e = new URL(s),
      i = new URL(z(t));
    return e.hostname === i.hostname;
  } catch {
    return !1;
  }
}
function Yt(s) {
  const t = document.cookie ? document.cookie.split("; ") : [];
  for (const e of t) {
    const [i, ...r] = e.split("=");
    if (i === s) return decodeURIComponent(r.join("="));
  }
  return null;
}
function Xt() {
  const s = Yt(ct);
  if (s) return s;
  const t = A(),
    e = window.location.protocol === "https:" ? "; Secure" : "";
  return (
    (document.cookie = `${ct}=${encodeURIComponent(t)}; Path=/; SameSite=Strict${e}`),
    t
  );
}
function $t(s) {
  return s
    .replace(/:\s*NaN\b/g, ": null")
    .replace(/\[\s*NaN\s*\]/g, "[null]")
    .replace(/,\s*NaN\s*,/g, ", null,")
    .replace(/,\s*NaN\s*\]/g, ", null]");
}
function Qt(s) {
  const e = `${s.remainder}${s.chunk}`.split(`

`),
    i = e.pop() ?? "";
  return {
    events: e
      .map((n) => n.trim())
      .filter(Boolean)
      .map((n) => JSON.parse($t(n))),
    remainder: i,
  };
}
function te(s) {
  const t = s.trim();
  return t ? [JSON.parse($t(t))] : [];
}
function K(s) {
  if (typeof s == "string" && s.trim()) return s;
  if (s && typeof s == "object") {
    const t = s.detail;
    if (typeof t == "string" && t.trim()) return t;
    const e = s.message;
    if (typeof e == "string" && e.trim()) return e;
  }
  return "The embedded chat widget could not complete the request.";
}
function bt(s) {
  const t = {
    "Content-Type": "application/json",
  };
  return (
    s.includeConnection && (t.Connection = "close"),
    s.apiKey.trim() && (t["x-api-key"] = s.apiKey.trim()),
    t
  );
}
async function yt(s) {
  try {
    const t = await s.json();
    return K(t);
  } catch {
    return `Request failed with status ${s.status}.`;
  }
}
async function ee(s) {
  const t = z(s.hostUrl),
    e =
      s.mode === "authenticated"
        ? `/api/v1/flows/${s.flowId}`
        : `/api/v1/flows/public_flow/${s.flowId}`,
    i = await fetch(`${t}${e}`, {
      credentials: s.mode === "public" ? "include" : "omit",
      headers: bt({
        apiKey: s.mode === "authenticated" ? s.apiKey : "",
        includeConnection: !1,
      }),
      method: "GET",
    });
  if (!i.ok) throw new Error(await yt(i));
  const r = await i.json();
  return {
    chatInputId: qt(r),
    flow: r,
  };
}
async function se(s) {
  const t = z(s.hostUrl),
    e =
      s.mode === "authenticated"
        ? `/api/v1/build/${s.flowId}/flow`
        : `/api/v1/build_public_tmp/${s.flowId}/flow`,
    i = new URLSearchParams({
      event_delivery: "direct",
      start_component_id: s.chatInputId,
    }),
    r = await fetch(`${t}${e}?${i.toString()}`, {
      body: JSON.stringify({
        inputs: {
          client_request_time: Date.now(),
          input_value: s.inputValue,
          session: s.sessionId,
        },
      }),
      credentials: s.mode === "public" ? "include" : "omit",
      headers: bt({
        apiKey: s.mode === "authenticated" ? s.apiKey : "",
        includeConnection: !0,
      }),
      method: "POST",
      signal: s.signal,
    });
  if (!r.ok) throw new Error(await yt(r));
  if (!r.body) return;
  const n = r.body.getReader(),
    o = new TextDecoder();
  let l = "";
  for (;;) {
    const { done: d, value: h } = await n.read();
    if (d) break;
    const c = o.decode(h, { stream: !0 }),
      m = Qt({ chunk: c, remainder: l });
    l = m.remainder;
    for (const g of m.events) s.onEvent(g);
  }
  const a = te(l);
  for (const d of a) s.onEvent(d);
}
var ie = Object.defineProperty,
  re = Object.getOwnPropertyDescriptor,
  f = (s, t, e, i) => {
    for (
      var r = i > 1 ? void 0 : i ? re(t, e) : t, n = s.length - 1, o;
      n >= 0;
      n--
    )
      (o = s[n]) && (r = (i ? o(t, e, r) : o(r)) || r);
    return i && r && ie(t, e, r), r;
  };
const ne = "assistant-partial";
function oe(s) {
  const t = String(s ?? "").toLowerCase();
  return t === "user" ? "user" : t === "system" ? "system" : "assistant";
}
function ae(s) {
  return {
    id: `error-${A()}`,
    role: "error",
    text: s,
    timestamp: /* @__PURE__ */ new Date().toISOString(),
  };
}
let u = class extends U {
  constructor() {
    super(...arguments),
      (this.windowTitle = "Chat"),
      (this.flowId = ""),
      (this.hostUrl = ""),
      (this.apiKey = ""),
      (this.chatInputId = ""),
      (this.configError = ""),
      (this.draft = ""),
      (this.initialized = !1),
      (this.initializing = !1),
      (this.isSending = !1),
      (this.messages = []),
      (this.mode = "public"),
      (this.sessionId = ""),
      (this.bootstrapVersion = 0),
      (this.storageKey = ""),
      (this.streamController = null);
  }
  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
    this.abortActiveStream(), super.disconnectedCallback();
  }
  updated(s) {
    const t = s;
    (s.has("flowId") || s.has("hostUrl") || s.has("apiKey")) &&
      queueMicrotask(() => {
        this.bootstrap();
      }),
      (t.has("messages") || t.has("isSending")) &&
        (this.persistState(), this.scrollMessagesToBottom());
  }
  abortActiveStream() {
    var s;
    (s = this.streamController) == null || s.abort(),
      (this.streamController = null);
  }
  persistState() {
    !this.storageKey ||
      !this.sessionId ||
      Ft(this.storageKey, {
        messages: this.messages,
        sessionId: this.sessionId,
      });
  }
  async bootstrap() {
    if (!this.isConnected) return;
    const s = this.flowId.trim(),
      t = z(this.hostUrl);
    this.bootstrapVersion += 1;
    const e = this.bootstrapVersion;
    if (
      (this.abortActiveStream(),
      (this.chatInputId = ""),
      (this.configError = ""),
      (this.initialized = !1),
      (this.initializing = !0),
      (this.isSending = !1),
      !s || !t)
    ) {
      (this.messages = []),
        (this.sessionId = ""),
        (this.storageKey = ""),
        (this.configError =
          "Provide both flow_id and host_url before using the embedded chat widget."),
        (this.initializing = !1);
      return;
    }
    if (
      ((this.mode = Vt(this.apiKey)),
      (this.storageKey = Wt({
        flowId: s,
        hostUrl: t,
        mode: this.mode,
      })),
      this.mode === "public" && !Gt(window.location.href, t))
    ) {
      (this.messages = []),
        (this.sessionId = ""),
        (this.configError =
          "Public flow embeds currently require the host page and host_url to use the same hostname."),
        (this.initializing = !1);
      return;
    }
    this.mode === "public" && Xt();
    try {
      const { chatInputId: i } = await ee({
        apiKey: this.apiKey,
        flowId: s,
        hostUrl: t,
        mode: this.mode,
      });
      if (e !== this.bootstrapVersion) return;
      this.chatInputId = i;
      const r = Jt(this.storageKey);
      (this.sessionId = (r == null ? void 0 : r.sessionId) ?? A()),
        (this.messages = (r == null ? void 0 : r.messages) ?? []),
        (this.initialized = !0),
        (this.configError = "");
    } catch (i) {
      if (e !== this.bootstrapVersion) return;
      (this.messages = []),
        (this.sessionId = ""),
        (this.configError = K(i instanceof Error ? i.message : i));
    } finally {
      e === this.bootstrapVersion && (this.initializing = !1);
    }
  }
  scrollMessagesToBottom() {
    var t;
    const s =
      (t = this.renderRoot) == null ? void 0 : t.querySelector(".messages");
    s instanceof HTMLElement && (s.scrollTop = s.scrollHeight);
  }
  appendStreamError(s) {
    this.messages = [...this.messages, ae(s)];
  }
  setDraft(s) {
    const t = s.currentTarget;
    this.draft = (t == null ? void 0 : t.value) ?? "";
  }
  onComposerKeydown(s) {
    s.key === "Enter" &&
      !s.shiftKey &&
      (s.preventDefault(), this.sendMessage());
  }
  clearChat() {
    this.storageKey && Zt(this.storageKey),
      (this.messages = []),
      (this.sessionId = A()),
      (this.configError = "");
  }
  reconcileIncomingMessage(s) {
    const t = [...this.messages];
    if (s.role === "user") {
      const i = t.findIndex(
        (r) => r.role === "user" && r.localOnly && r.text === s.text,
      );
      if (i >= 0) {
        (t[i] = {
          ...s,
          localOnly: !1,
        }),
          (this.messages = t);
        return;
      }
    }
    const e = t.findIndex((i) => i.id === s.id);
    e >= 0 ? (t[e] = s) : t.push(s), (this.messages = t);
  }
  handleTokenEvent(s) {
    const t = String(s.chunk ?? "");
    if (!t) return;
    const e = typeof s.id == "string" && s.id ? s.id : ne,
      i = [...this.messages],
      r = i.findIndex((n) => n.id === e);
    r >= 0
      ? (i[r] = {
          ...i[r],
          partial: !0,
          role: "assistant",
          text: `${i[r].text}${t}`,
        })
      : i.push({
          id: e,
          partial: !0,
          role: "assistant",
          text: t,
          timestamp: /* @__PURE__ */ new Date().toISOString(),
        }),
      (this.messages = i);
  }
  handleAddMessageEvent(s) {
    const t = String(s.text ?? "");
    if (!t) return;
    const e = typeof s.id == "string" && s.id ? s.id : A();
    this.reconcileIncomingMessage({
      id: e,
      localOnly: !1,
      partial: !1,
      role: oe(s.sender),
      text: t,
      timestamp:
        typeof s.timestamp == "string"
          ? s.timestamp
          : /* @__PURE__ */ new Date().toISOString(),
    });
  }
  handleErrorEvent(s) {
    const t = K(s);
    this.appendStreamError(t);
  }
  handleStreamEvent(s) {
    const t = String(s.event ?? ""),
      e = s.data ?? {};
    switch (t) {
      case "token":
        this.handleTokenEvent(e);
        break;
      case "add_message":
        this.handleAddMessageEvent(e);
        break;
      case "error":
        this.handleErrorEvent(e);
        break;
    }
  }
  async sendMessage() {
    const s = this.draft.trim();
    if (
      !(
        !s ||
        this.isSending ||
        !this.initialized ||
        !this.chatInputId ||
        !this.sessionId
      )
    ) {
      (this.configError = ""),
        (this.isSending = !0),
        (this.draft = ""),
        (this.messages = [
          ...this.messages,
          {
            id: `local-${A()}`,
            localOnly: !0,
            partial: !1,
            role: "user",
            text: s,
            timestamp: /* @__PURE__ */ new Date().toISOString(),
          },
        ]),
        this.abortActiveStream(),
        (this.streamController = new AbortController());
      try {
        await se({
          apiKey: this.apiKey,
          chatInputId: this.chatInputId,
          flowId: this.flowId.trim(),
          hostUrl: this.hostUrl,
          inputValue: s,
          mode: this.mode,
          onEvent: (t) => this.handleStreamEvent(t),
          sessionId: this.sessionId,
          signal: this.streamController.signal,
        });
      } catch (t) {
        if (t instanceof Error && t.name === "AbortError") return;
        this.appendStreamError(K(t instanceof Error ? t.message : t));
      } finally {
        (this.isSending = !1), (this.streamController = null);
      }
    }
  }
  renderMessage(s) {
    const t =
      s.role === "assistant"
        ? "Assistant"
        : s.role === "system"
          ? "System"
          : s.role === "error"
            ? "Error"
            : "You";
    return D`
      <div class="bubble ${s.role}">
        <span class="meta">${t}</span>
        <div class=${s.partial ? "partial" : ""}>${s.text}</div>
      </div>
    `;
  }
  render() {
    const s = this.initialized && !this.initializing && !this.configError,
      t =
        this.mode === "authenticated"
          ? "API key mode"
          : "Public flow mode (same hostname required)";
    return D`
      <div class="shell">
        <div class="header">
          <div class="title-wrap">
            <p class="title">${this.windowTitle}</p>
            <p class="subtitle">${t}</p>
          </div>
          <button
            class="clear"
            ?disabled=${this.messages.length === 0 || this.isSending}
            @click=${this.clearChat}
            type="button"
          >
            Clear chat
          </button>
        </div>

        ${this.configError ? D`<div class="error-banner">${this.configError}</div>` : null}

        <div class="messages">
          ${
            this.messages.length > 0
              ? this.messages.map((e) => this.renderMessage(e))
              : D`
                <div class="empty">
                  <strong>
                    ${this.initializing ? "Preparing your chat flow" : s ? "Ask your first question" : "Complete the widget configuration"}
                  </strong>
                  <span>
                    ${this.initializing ? "The widget is validating the flow and loading the correct execution path." : s ? "This embedded chat keeps a local session so refreshes resume the same conversation." : "Set flow_id, host_url, and the correct auth mode before sending messages."}
                  </span>
                </div>
              `
          }
        </div>

        <div class="composer">
          <textarea
            .value=${this.draft}
            ?disabled=${!s || this.isSending}
            @input=${this.setDraft}
            @keydown=${this.onComposerKeydown}
            placeholder=${s ? "Type a message and press Enter" : "Embedded chat is not ready yet"}
          ></textarea>
          <div class="composer-row">
            <span class="hint">
              ${this.isSending ? "Sending message..." : "Press Enter to send. Use Shift+Enter for a new line."}
            </span>
            <button
              class="send"
              ?disabled=${!s || this.isSending || !this.draft.trim()}
              @click=${this.sendMessage}
              type="button"
            >
              ${this.isSending ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    `;
  }
};
u.styles = wt`
    :host {
      color: #0f172a;
      display: block;
      font-family:
        "IBM Plex Sans", "Segoe UI", system-ui, sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    .shell {
      background:
        linear-gradient(180deg, rgba(248, 250, 252, 0.98), rgba(255, 255, 255, 0.98));
      border: 1px solid #d7dee7;
      border-radius: 20px;
      box-shadow:
        0 20px 40px rgba(15, 23, 42, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.85);
      display: flex;
      flex-direction: column;
      min-height: 560px;
      overflow: hidden;
    }

    .header {
      align-items: center;
      background:
        radial-gradient(circle at top left, rgba(14, 165, 233, 0.18), transparent 42%),
        linear-gradient(135deg, #ffffff, #f4f7fb);
      border-bottom: 1px solid #d7dee7;
      display: flex;
      gap: 12px;
      justify-content: space-between;
      padding: 18px 20px;
    }

    .title-wrap {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }

    .title {
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin: 0;
    }

    .subtitle {
      color: #475569;
      font-size: 0.8rem;
      margin: 0;
    }

    .clear {
      background: transparent;
      border: 1px solid #cbd5e1;
      border-radius: 999px;
      color: #0f172a;
      cursor: pointer;
      font: inherit;
      font-size: 0.82rem;
      font-weight: 600;
      padding: 8px 12px;
      transition:
        background-color 120ms ease,
        border-color 120ms ease;
    }

    .clear:hover:enabled {
      background: #f8fafc;
      border-color: #94a3b8;
    }

    .clear:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .error-banner {
      background: #fff1f2;
      border-bottom: 1px solid #fecdd3;
      color: #be123c;
      font-size: 0.86rem;
      padding: 12px 20px;
    }

    .messages {
      background:
        radial-gradient(circle at top, rgba(14, 165, 233, 0.06), transparent 26%),
        linear-gradient(180deg, #f8fafc, #ffffff 28%);
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: 14px;
      min-height: 0;
      overflow-y: auto;
      padding: 18px 20px 8px;
    }

    .empty {
      align-items: flex-start;
      background: rgba(255, 255, 255, 0.82);
      border: 1px dashed #cbd5e1;
      border-radius: 18px;
      color: #475569;
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin: auto 0;
      padding: 18px;
    }

    .empty strong {
      color: #0f172a;
      font-size: 0.92rem;
    }

    .bubble {
      align-self: flex-start;
      border-radius: 18px 18px 18px 6px;
      max-width: min(90%, 38rem);
      padding: 12px 14px;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .bubble.user {
      align-self: flex-end;
      background: linear-gradient(135deg, #0f172a, #1d4ed8);
      border-radius: 18px 18px 6px 18px;
      color: #ffffff;
    }

    .bubble.assistant {
      background: #ffffff;
      border: 1px solid #dbe4ee;
      color: #0f172a;
    }

    .bubble.system {
      background: #ecfeff;
      border: 1px solid #bae6fd;
      color: #155e75;
    }

    .bubble.error {
      background: #fff1f2;
      border: 1px solid #fecdd3;
      color: #9f1239;
    }

    .meta {
      color: inherit;
      display: block;
      font-size: 0.72rem;
      margin-bottom: 6px;
      opacity: 0.72;
      text-transform: uppercase;
    }

    .partial::after {
      animation: blink 1.1s steps(1, end) infinite;
      content: "▋";
      margin-left: 2px;
    }

    .composer {
      background: #ffffff;
      border-top: 1px solid #d7dee7;
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 16px 20px 20px;
    }

    textarea {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 16px;
      color: #0f172a;
      font: inherit;
      min-height: 96px;
      padding: 14px 16px;
      resize: vertical;
      width: 100%;
    }

    textarea:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
      outline: none;
    }

    textarea:disabled {
      background: #f1f5f9;
      cursor: not-allowed;
    }

    .composer-row {
      align-items: center;
      display: flex;
      gap: 12px;
      justify-content: space-between;
    }

    .hint {
      color: #64748b;
      font-size: 0.78rem;
    }

    .send {
      background: linear-gradient(135deg, #0f172a, #1d4ed8);
      border: none;
      border-radius: 999px;
      color: #ffffff;
      cursor: pointer;
      font: inherit;
      font-size: 0.9rem;
      font-weight: 700;
      min-width: 120px;
      padding: 11px 16px;
      transition:
        opacity 120ms ease,
        transform 120ms ease;
    }

    .send:hover:enabled {
      transform: translateY(-1px);
    }

    .send:disabled {
      cursor: not-allowed;
      opacity: 0.5;
      transform: none;
    }

    @keyframes blink {
      0%,
      49% {
        opacity: 1;
      }
      50%,
      100% {
        opacity: 0;
      }
    }
  `;
f(
  [R({ attribute: "window_title", type: String })],
  u.prototype,
  "windowTitle",
  2,
);
f([R({ attribute: "flow_id", type: String })], u.prototype, "flowId", 2);
f([R({ attribute: "host_url", type: String })], u.prototype, "hostUrl", 2);
f([R({ attribute: "api_key", type: String })], u.prototype, "apiKey", 2);
f([$()], u.prototype, "chatInputId", 2);
f([$()], u.prototype, "configError", 2);
f([$()], u.prototype, "draft", 2);
f([$()], u.prototype, "initialized", 2);
f([$()], u.prototype, "initializing", 2);
f([$()], u.prototype, "isSending", 2);
f([$()], u.prototype, "messages", 2);
f([$()], u.prototype, "mode", 2);
f([$()], u.prototype, "sessionId", 2);
u = f([jt("idrflow-chat")], u);
export { u as IdrflowChat };
