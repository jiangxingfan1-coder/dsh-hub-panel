window.__ModuleLoader__.load({ id: "dsh-hub-panel", factory: (require) => { var module = { exports: {} }; var exports = module.exports;
(() => {
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });

  // src/client/index.jsx
  var import_react = __require("react");
  var import_jsx_runtime = __require("react/jsx-runtime");
  var INDEX_URL = "https://jiangxingfan1-coder.github.io/dsh-hub-index/entries.json";
  var SITE_URL = "https://jiangxingfan1-coder.github.io/dsh-hub-index/";
  var TRUST_COLOR = {
    official: { bg: "#dbeafe", fg: "#1d4ed8" },
    verified: { bg: "#dcfce7", fg: "#15803d" },
    community: { bg: "#fef9c3", fg: "#a16207" },
    unreviewed: { bg: "#fee2e2", fg: "#b91c1c" }
  };
  function Chip({ text, tone, title, onClick, active }) {
    const c = TRUST_COLOR[tone] ?? { bg: "rgba(127,127,127,.14)", fg: "inherit" };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "span",
      {
        title,
        onClick,
        style: {
          fontSize: 12,
          padding: "1px 9px",
          borderRadius: 99,
          background: c.bg,
          color: c.fg,
          cursor: onClick ? "pointer" : "default",
          whiteSpace: "nowrap",
          outline: active ? "1.5px solid currentColor" : "none"
        },
        children: text
      }
    );
  }
  function installCmd(e) {
    if (!e.install) return null;
    if (e.kind === "plugin" && /^(github:|@|[a-z0-9-]+$)/.test(e.install)) return `dsh plugin --profile web add ${e.install}`;
    return e.install;
  }
  function Card({ e }) {
    const [copied, setCopied] = (0, import_react.useState)(false);
    const cmd = installCmd(e);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: {
      border: "1px solid rgba(127,127,127,.25)",
      borderRadius: 10,
      padding: "10px 14px",
      marginBottom: 10,
      borderLeft: e.kind === "compose" ? "3px solid #6366f1" : void 0
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 8, alignItems: "baseline", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { style: { fontSize: 15 }, children: e.name }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { text: e.kind }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { text: e.trust, tone: e.trust }),
        e.security?.jsExpressions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { text: "!!js", tone: "unreviewed", title: "patch/preset \u542B !!js \u8868\u8FBE\u5F0F\uFF08\u4EFB\u610F\u4EE3\u7801\uFF09" }),
        e.publisher?.github && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { text: `@${e.publisher.github}`, title: "\u53D1\u5E03\u8005" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { margin: "5px 0", lineHeight: 1.55 }, children: e.description }),
      e.securityNotes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontSize: 12.5, opacity: 0.75, margin: "2px 0 6px" }, children: [
        "\u{1F50E} ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: e.securityNotes })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", fontSize: 13 }, children: [
        cmd && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { style: { background: "rgba(127,127,127,.12)", padding: "2px 7px", borderRadius: 5 }, children: cmd }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "a",
            {
              style: { cursor: "pointer", textDecoration: "underline" },
              onClick: () => {
                navigator.clipboard?.writeText(cmd).then(() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                });
              },
              children: copied ? "\u5DF2\u590D\u5236 \u2713" : "\u590D\u5236"
            }
          )
        ] }),
        e.source?.repo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: e.source.repo, target: "_blank", rel: "noreferrer", children: "\u4ED3\u5E93" }),
        e.source?.npm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: e.source.npm, target: "_blank", rel: "noreferrer", children: "npm" }),
        e.source?.discussion && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: e.source.discussion, target: "_blank", rel: "noreferrer", children: "discussion" })
      ] })
    ] });
  }
  function HubPanel() {
    const [state, setState] = (0, import_react.useState)({ phase: "loading", entries: [] });
    const [q, setQ] = (0, import_react.useState)("");
    const [fKind, setFKind] = (0, import_react.useState)("all");
    const [fTrust, setFTrust] = (0, import_react.useState)("all");
    (0, import_react.useEffect)(() => {
      const ac = new AbortController();
      fetch(INDEX_URL, { signal: ac.signal }).then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      }).then((d) => setState({ phase: "ready", entries: d.entries })).catch((e) => {
        if (e.name !== "AbortError") setState({ phase: "error", entries: [], error: String(e.message ?? e) });
      });
      return () => ac.abort();
    }, []);
    const kinds = (0, import_react.useMemo)(() => ["all", ...new Set(state.entries.map((e) => e.kind))], [state.entries]);
    const trusts = (0, import_react.useMemo)(() => ["all", ...new Set(state.entries.map((e) => e.trust))], [state.entries]);
    const hits = (0, import_react.useMemo)(() => state.entries.filter(
      (e) => (fKind === "all" || e.kind === fKind) && (fTrust === "all" || e.trust === fTrust) && (!q || `${e.name} ${e.description} ${e.publisher?.github ?? ""}`.toLowerCase().includes(q.toLowerCase()))
    ), [state.entries, q, fKind, fTrust]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { maxWidth: 780, padding: "4px 2px", fontSize: 14 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { style: { margin: "2px 0 6px", fontSize: 18 }, children: "Hub \u2014 \u751F\u6001\u7D22\u5F15" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: SITE_URL, target: "_blank", rel: "noreferrer", style: { fontSize: 12.5 }, children: "\u5728\u6D4F\u89C8\u5668\u6253\u5F00 \u2197" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
        fontSize: 12.5,
        opacity: 0.8,
        border: "1px solid rgba(127,127,127,.25)",
        borderRadius: 8,
        padding: "7px 12px",
        marginBottom: 10,
        lineHeight: 1.5
      }, children: "\u26A0\uFE0F \u88C5\u4E00\u4E2A dsh \u63D2\u4EF6 = npm postinstall + Host realm \u96F6\u5BA1\u6279 = \u4EA4\u51FA\u6574\u53F0\u673A\u5668\u3002unreviewed \u6761\u76EE\u8BF7\u8BFB\u6E90\u7801\u540E\u518D\u88C5\uFF1B\u4E0B\u8F7D\u91CF\u4E0E\u6392\u540D\u4E0D\u53C2\u4E0E\u4FE1\u4EFB\u8BC4\u7EA7\u3002" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "input",
        {
          placeholder: "\u641C\u7D22\u540D\u79F0 / \u63CF\u8FF0 / \u53D1\u5E03\u8005\u2026",
          value: q,
          onChange: (e) => setQ(e.target.value),
          style: {
            width: "100%",
            boxSizing: "border-box",
            padding: "7px 12px",
            fontSize: 14,
            borderRadius: 8,
            border: "1px solid rgba(127,127,127,.35)",
            background: "transparent",
            color: "inherit",
            marginBottom: 8
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }, children: [
        kinds.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { text: k, onClick: () => setFKind(k), active: fKind === k }, k)),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: 8 } }),
        trusts.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { text: t, tone: t, onClick: () => setFTrust(t), active: fTrust === t }, t))
      ] }),
      state.phase === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { opacity: 0.7 }, children: "\u52A0\u8F7D\u7D22\u5F15\u2026" }),
      state.phase === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { style: { opacity: 0.7 }, children: [
        "\u7D22\u5F15\u4E0D\u53EF\u8FBE\uFF08",
        state.error,
        "\uFF09\u3002",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: SITE_URL, target: "_blank", rel: "noreferrer", children: "\u8BD5\u8BD5\u7F51\u9875\u7248" })
      ] }),
      state.phase === "ready" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { style: { fontSize: 12.5, opacity: 0.65, margin: "0 0 8px" }, children: [
          hits.length,
          " / ",
          state.entries.length,
          " \u6761\u76EE"
        ] }),
        hits.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { e }, e.name))
      ] })
    ] });
  }
  function apply(ctx) {
    ctx.slots.inject("settings.section", () => ctx.slots.register(
      {
        name: "settings.section",
        id: "hub-panel",
        order: 42,
        label: () => "Hub",
        inject: () => ({})
      },
      HubPanel
    ));
  }
  if (typeof module !== "undefined" && module !== null) {
    module.exports = { apply, inject: ["slots"] };
  }
})();
return module.exports; } });
//# sourceMappingURL=client.js.map
