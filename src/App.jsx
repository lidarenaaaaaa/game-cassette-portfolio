import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Rocket,
  Gamepad2,
  FolderKanban,
  Contact,
  Link as LinkIcon,
  ArrowLeft,
  Play,
  Zap,
  Sparkles,
} from "lucide-react";

const PROFILE = {
  owner: "\u674E\u5927\u4EBA",
  subtitle: "\u6B22\u8FCE\u6765\u5230\u674E\u5927\u4EBA\u7684\u6E38\u620F\u4E16\u754C",
  slogans: ["\u4EBA\u751F\u5C31\u50CF\u4E00\u573A\u6E38\u620F", "\u7AD9\u5728\u5DE8\u4EBA\u7684\u80A9\u8180\u4E0A"],
  qq: "\u5728\u6B64\u586B\u5199\u4F60\u7684QQ\u53F7",
  links: {
    csdn: "https://www.csdn.net/",
    bilibili: "https://www.bilibili.com/",
    zhihu: "https://www.zhihu.com/",
  },
};

const cartridges = [
  {
    id: "works",
    title: "\u4F5C\u54C1\u5C55",
    color: "from-fuchsia-500 to-rose-500",
    icon: FolderKanban,
    blurb:
      "\u7CBE\u9009\u4EA4\u4E92/\u89C6\u89C9/Shader \u9879\u76EE\u7684\u53EF\u89C6\u5316\u5C55\u533A\uFF0C\u652F\u6301\u6807\u7B7E\u7B5B\u9009\u4E0E\u5361\u5E26\u5F0F\u5BFC\u822A\u3002",
  },
  {
    id: "roles",
    title: "\u8EAB\u4EFD\u5207\u6362",
    color: "from-amber-400 to-orange-600",
    icon: Sparkles,
    blurb:
      "\u5728 \u8BBE\u8BA1\u5E08 / \u5DE5\u7A0B\u5E08 / \u827A\u672F\u5BB6 \u4E09\u91CD\u8EAB\u4EFD\u95F4\u5207\u6362\uFF0C\u770B\u770B\u6211\u5982\u4F55\u8DE8\u754C\u534F\u4F5C\u3002",
  },
  {
    id: "lab",
    title: "\u5B9E\u9A8C\u5BA4",
    color: "from-cyan-400 to-blue-600",
    icon: Rocket,
    blurb:
      "\u5C0F\u578B\u53EF\u4EA4\u4E92 Demo\uFF1A\u5361\u72473D\u3001\u50CF\u7D20\u6EE4\u955C\u3001\u6253\u5B57\u673A\u3001\u7C92\u5B50\u7B49\u8DA3\u73A9\u3002",
  },
  {
    id: "links",
    title: "\u5916\u94FE",
    color: "from-emerald-400 to-teal-600",
    icon: LinkIcon,
    blurb: "\u53BB CSDN / B\u7AD9 / \u77E5\u4E4E \u770B\u66F4\u591A\u5185\u5BB9\u3002",
  },
  {
    id: "contact",
    title: "\u8054\u7CFB\u6211",
    color: "from-sky-400 to-indigo-600",
    icon: Contact,
    blurb:
      "QQ \u4E00\u952E\u590D\u5236 + \u7559\u8A00\u8868\u5355\uFF08\u53EF\u63A5\u5165\u540E\u7AEF/\u8868\u5355\u670D\u52A1\uFF09\u3002",
  },
];

const WORKS = [
  { id: 1, title: "\u6C34\u58A8\u5361\u7247 UI", tags: ["UI", "Card", "Ink"], desc: "P5\u00D7\u6C34\u58A8\u98CE\u683C", thumb: svgThumb("#111827") },
  { id: 2, title: "Shader \u8FB9\u7F18\u9AD8\u5149", tags: ["Shader", "Unity"], desc: "RimSpec \u5B9E\u9A8C", thumb: svgThumb("#1f2937") },
  { id: 3, title: "\u50CF\u7D20\u6EE4\u955C", tags: ["WebGL", "Filter"], desc: "\u4F4E\u5206\u8FA8\u7387\u6A21\u62DF", thumb: svgThumb("#0f172a") },
  { id: 4, title: "\u5361\u5E26\u5F0F\u5BFC\u822A", tags: ["UX", "Motion"], desc: "Gamified \u5BFC\u822A", thumb: svgThumb("#111827") },
];

function svgThumb(bg = "#111") {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-28 rounded-xl" style={{ background: bg }}>
      <rect x="16" y="14" width="168" height="92" rx="12" fill="rgba(255,255,255,0.06)" />
      <rect x="28" y="28" width="80" height="64" rx="8" fill="rgba(255,255,255,0.08)" />
      <rect x="116" y="28" width="56" height="10" rx="5" fill="rgba(255,255,255,0.2)" />
      <rect x="116" y="44" width="56" height="10" rx="5" fill="rgba(255,255,255,0.12)" />
      <rect x="116" y="60" width="56" height="10" rx="5" fill="rgba(255,255,255,0.12)" />
      <circle cx="156" cy="90" r="8" fill="rgba(255,255,255,0.2)" />
      <circle cx="136" cy="90" r="8" fill="rgba(255,255,255,0.1)" />
    </svg>
  );
}

const glass = "backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl shadow-black/20";

function useKey(handle) {
  useEffect(() => {
    const on = (e) => handle?.(e);
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [handle]);
}

function Cassette({ item, onPick }) {
  const Icon = item.icon;
  return (
    <button
      onClick={() => onPick?.(item)}
      className={`snap-start relative shrink-0 w-48 h-28 rounded-2xl p-3 text-left overflow-hidden ${glass}`}
    >
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-30`} />
      <div className="absolute inset-x-3 top-3 h-9 rounded-lg bg-black/40 border border-white/10" />
      <div className="relative flex items-center gap-3">
        <div className="p-2 rounded-xl bg-black/50 border border-white/10">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <div className="font-bold text-white/90 tracking-wide">{item.title}</div>
          <div className="text-xs text-white/60 pr-4 line-clamp-2">{item.blurb}</div>
        </div>
      </div>
      <div className="absolute bottom-2 left-3 text-[10px] text-white/50">INSERT TO PLAY</div>
      <div className="absolute bottom-2 right-3 text-[10px] text-white/50">{item.id}</div>
    </button>
  );
}

function Screen({ title, children, footer }) {
  return (
    <div className={`relative ${glass} rounded-3xl p-5 md:p-7 w-full`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <div className="text-sm text-white/60 ml-3">{title}</div>
        </div>
      </div>
      <div className="min-h-[220px]">{children}</div>
      {footer}
    </div>
  );
}

function CRT({ children }) {
  return (
    <div className="relative rounded-[20px] p-4 md:p-6 border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.08] bg-[radial-gradient(circle_at_center,transparent_50%,white_50%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,.12)_3px,transparent_4px)]" />
      {children}
    </div>
  );
}

function SloganTicker({ slogans }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slogans.length), 2600);
    return () => clearInterval(t);
  }, [slogans.length]);
  return (
    <div className="h-6 overflow-hidden">
      <div className="text-sm text-white/70">{slogans[idx]}</div>
    </div>
  );
}

function WorksPage() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("All");
  const tags = ["All", ...new Set(WORKS.flatMap((w) => w.tags))];
  const list = WORKS.filter(
    (w) => (tag === "All" || w.tags.includes(tag)) && w.title.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div>
      <div className="flex flex-wrap gap-3 items-center mb-4">
        <div className="relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={"\\u641C\\u7D22\\u4F5C\\u54C1\\u2026".replace(/\\\\u/g, "\\u")}
            className="pl-3 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`px-3 py-1.5 rounded-xl border ${
                tag === t ? "bg-white/10 border-white/30" : "bg-white/5 border-white/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((w) => (
          <motion.div key={w.id} whileHover={{ y: -4 }} className={`${glass} rounded-2xl p-4`}>
            {w.thumb}
            <div className="mt-3 font-semibold">{w.title}</div>
            <div className="text-sm text-white/60">{w.desc}</div>
            <div className="mt-2 flex gap-2 flex-wrap">
              {w.tags.map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function RolesPage() {
  const roles = [
    { k: "\u8BBE\u8BA1\u5E08", desc: "\u4FE1\u606F\u67B6\u6784 / \u4EA4\u4E92\u6D41 / \u89C6\u89C9\u7CFB\u7EDF / \u52A8\u6548\u53F2\u4E8B" },
    { k: "\u5DE5\u7A0B\u5E08", desc: "\u524D\u7AEF\u67B6\u6784 / WebGL & Shader / \u81EA\u52A8\u5316\u4E0E\u4EE3\u7406" },
    { k: "\u827A\u672F\u5BB6", desc: "\u98CE\u683C\u63A2\u7D22 / \u7B26\u53F7\u8BBE\u8BA1 / \u53F2\u4E8B\u539F\u578B" },
  ];
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {roles.map((r) => (
        <div key={r.k} className={`${glass} rounded-2xl p-5`}>
          <div className="text-lg font-bold mb-1">{r.k}</div>
          <div className="text-white/70">{r.desc}</div>
          <div className="mt-4 text-xs text-white/50">
            {"\u8BA9\u5DE5\u5177\u9002\u914D\u601D\u8003\uFF0C\u800C\u4E0D\u662F\u76F8\u53CD\u3002"}
          </div>
        </div>
      ))}
    </div>
  );
}

function LabPage() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Playground title={"\\u5361\\u72473D\\u503E\\u659C".replace(/\\\\u/g, "\\u")}>
        <TiltCard />
      </Playground>
      <Playground title={"\\u6253\\u5B57\\u673A\\u6548\\u679C".replace(/\\\\u/g, "\\u")}>
        <Typewriter text={"Hello, Agent Mode! \\u4F60\\u597D\\uFF0C\\u4EE3\\u7406\\u6A21\\u5F0F\\uFF01".replace(/\\\\u/g, "\\u")} />
      </Playground>
    </div>
  );
}

function LinksPage() {
  const rows = [
    { k: "CSDN", v: PROFILE.links.csdn },
    { k: "B\\u7AD9".replace(/\\\\u/g, "\\u"), v: PROFILE.links.bilibili },
    { k: "\\u77E5\\u4E4E".replace(/\\\\u/g, "\\u"), v: PROFILE.links.zhihu },
  ];
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {rows.map((r) => (
        <a
          key={r.k}
          href={r.v}
          target="_blank"
          rel="noreferrer"
          className={`${glass} rounded-2xl p-5 hover:bg-white/10`}
        >
          <div className="font-semibold">{r.k}</div>
          <div className="text-sm text-white/60 break-all">{r.v}</div>
        </a>
      ))}
    </div>
  );
}

function ContactPage() {
  const [copied, setCopied] = useState(false);
  const qqText = PROFILE.qq || "\\u8BF7\\u5728\\u4EE3\\u7801\\u91CC\\u586B\\u5199\\u4F60\\u7684QQ\\u53F7".replace(/\\\\u/g, "\\u");
  return (
    <div className="space-y-4">
      <div className={`${glass} rounded-2xl p-5`}>
        <div className="text-sm text-white/60 mb-2">QQ</div>
        <div className="flex items-center gap-2">
          <div className="font-semibold tracking-wide">{qqText}</div>
          <button
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(qqText);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              } catch {}
            }}
            className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-sm"
          >
            {"\u590D\u5236".replace(/\\\\u/g, "\\u")}
          </button>
          {copied && <span className="text-emerald-400 text-sm">{"\u5DF2\u590D\u5236\uFF01".replace(/\\\\u/g, "\\u")}</span>}
        </div>
      </div>
      <div className={`${glass} rounded-2xl p-5`}>
        <div className="text-sm text-white/60 mb-2">{"\u7559\u8A00".replace(/\\\\u/g, "\\u")}</div>
        <div className="grid md:grid-cols-2 gap-3">
          <input
            placeholder={"\\u4F60\\u7684\\u540D\\u5B57".replace(/\\\\u/g, "\\u")}
            className="px-3 py-2 rounded-xl bg-white/5 border border-white/10"
          />
          <input
            placeholder={"\\u8054\\u7CFB\\u65B9\\u5F0F\\uFF08\\u53EF\\u7559\\u7A7A\\uFF09".replace(/\\\\u/g, "\\u")}
            className="px-3 py-2 rounded-xl bg-white/5 border border-white/10"
          />
          <textarea
            placeholder={"\\u60F3\\u5BF9\\u6211\\u8BF4\\u2026".replace(/\\\\u/g, "\\u")}
            className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 md:col-span-2 h-28"
          />
        </div>
        <button className="mt-3 px-4 py-2 rounded-xl bg-white/10 border border-white/10">
          {"\u53D1\u9001\uFF08\u53EF\u63A5\u5165\u8868\u5355\u670D\u52A1\uFF09".replace(/\\\\u/g, "\\u")}
        </button>
      </div>
    </div>
  );
}

function Playground({ title, children }) {
  return (
    <div className={`${glass} rounded-2xl p-5`}>
      <div className="font-semibold mb-3">{title}</div>
      {children}
    </div>
  );
}

function TiltCard() {
  const ref = useRef(null);
  const [st, setSt] = useState({ x: 0, y: 0 });
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const x = ((e.clientX - r.left) / r.width - 0.5) * 20;
        const y = ((e.clientY - r.top) / r.height - 0.5) * 20;
        setSt({ x, y });
      }}
      onMouseLeave={() => setSt({ x: 0, y: 0 })}
      className="h-40 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 flex items-center justify-center"
      style={{ transform: `perspective(600px) rotateX(${-st.y}deg) rotateY(${st.x}deg)` }}
    >
      <div className="text-white/80">{"\u628A\u9F20\u6807\u5728\u8FD9\u91CC\u6643\u4E00\u6643".replace(/\\\\u/g, "\\u")}</div>
    </div>
  );
}

function Typewriter({ text }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => Math.min(text.length, x + 1)), 40);
    return () => clearInterval(t);
  }, [text]);
  return (
    <div className="font-mono text-sm">
      {text.slice(0, i)}
      <span className="opacity-60">{"\u258D".replace(/\\\\u/g, "\\u")}</span>
    </div>
  );
}

export default function App() {
  const [stage, setStage] = useState("boot"); // boot -> insert -> hub -> page
  const [selected, setSelected] = useState(null);
  const [route, setRoute] = useState(null);
  const current = cartridges.find((c) => c.id === route);

  useKey((e) => {
    if (stage === "boot" && (e.key === "Enter" || e.key === " ")) setStage("insert");
    if (stage === "insert" && e.key === "Escape") setStage("boot");
  });

  return (
    <div className="min-h-screen text-white bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(79,70,229,.25),transparent),radial-gradient(900px_500px_at_90%_10%,rgba(236,72,153,.2),transparent),#0b0f1a]">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xl md:text-2xl font-bold tracking-wide">{PROFILE.subtitle}</div>
            <SloganTicker slogans={PROFILE.slogans} />
          </div>
          <div className="hidden md:flex items-center gap-2 opacity-80">
            <div className="text-xs">QQ</div>
            <div className="text-sm font-semibold">{PROFILE.qq}</div>
          </div>
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-6 items-stretch">
          {/* Left: Console / Screen */}
          <CRT>
            <div className="p-4 md:p-8">
              <AnimatePresence mode="wait">
                {/* BOOT */}
                {stage === "boot" && (
                  <motion.div key="boot" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <Screen title="WELCOME">
                      <div className="flex flex-col items-center justify-center text-center py-10">
                        <Gamepad2 className="w-10 h-10 opacity-70 mb-3" />
                        <div className="text-2xl font-bold mb-2">{PROFILE.owner} {"\u7684\u4E3B\u673A".replace(/\\\\u/g, "\\u")}</div>
                        <div className="text-white/70 mb-6">{PROFILE.subtitle}</div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setStage("insert")}
                          className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/10 flex items-center gap-2"
                        >
                          <Play className="w-4 h-4" /> {"\u70B9\u51FB\u5F00\u59CB\u6E38\u620F".replace(/\\\\u/g, "\\u")}
                        </motion.button>
                      </div>
                    </Screen>
                  </motion.div>
                )}

                {/* INSERT */}
                {stage === "insert" && (
                  <motion.div key="insert" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Screen
                      title={"\\u8BF7\\u63D2\\u5165\\u6E38\\u620F\\u5361\\u5E26".replace(/\\\\u/g, "\\u")}
                      footer={
                        <div className="mt-4 text-xs text-white/50">
                          {"\\u63D0\\u793A\\uFF1A\\u70B9\\u51FB\\u4EFB\\u610F\\u5361\\u5E26\\u4EE5\\u5728\\u4E3B\\u5C4F\\u9884\\u89C8\\uFF0C\\u7136\\u540E\\u201C\\u8FDB\\u5165\\u5B50\\u9875\\u9762\\u201D\\u3002".replace(/\\\\u/g, "\\u")}
                        </div>
                      }
                    >
                      <div className="aspect-[16/7] rounded-2xl border-2 border-dashed border-white/15 mb-4 flex items-center justify-center">
                        <div className="text-white/60">Cartridge Slot</div>
                      </div>
                      <div className="flex gap-4 overflow-x-auto snap-x pb-1">
                        {cartridges.map((c) => (
                          <Cassette
                            key={c.id}
                            item={c}
                            onPick={(it) => {
                              setSelected(it);
                              setStage("hub");
                            }}
                          />
                        ))}
                      </div>
                    </Screen>
                  </motion.div>
                )}

                {/* HUB */}
                {stage === "hub" && (
                  <motion.div key="hub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Screen title={`\u5DF2\u63D2\u5165\uFF1A${selected?.title || "\u2014"}`}>
                      <div className="grid md:grid-cols-[1.2fr_.8fr] gap-6 items-center">
                        <div>
                          <div className="text-2xl font-bold mb-2">{selected?.title}</div>
                          <div className="text-white/70 mb-4">{selected?.blurb}</div>
                          <div className="flex gap-3">
                            <button
                              className="px-4 py-2 rounded-xl bg-white/10 border border-white/10"
                              onClick={() => setRoute(selected?.id)}
                            >
                              {"\u8FDB\u5165\u5B50\u9875\u9762".replace(/\\\\u/g, "\\u")}
                            </button>
                            <button
                              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10"
                              onClick={() => setStage("insert")}
                            >
                              {"\u66F4\u6362\u5361\u5E26".replace(/\\\\u/g, "\\u")}
                            </button>
                          </div>
                        </div>
                        <motion.div
                          className="h-40 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0"
                          initial={{ scale: 0.96, opacity: 0.7 }}
                          animate={{ scale: 1, opacity: 1 }}
                        />
                      </div>
                    </Screen>
                  </motion.div>
                )}

                {/* ROUTED PAGE */}
                {route && (
                  <motion.div key={route} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    <Screen
                      title={`\u5B50\u9875\u9762 / ${current?.title}`}
                      footer={
                        <div className="mt-4 flex items-center gap-2">
                          <button
                            onClick={() => setRoute(null)}
                            className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 flex items-center gap-1 text-sm"
                          >
                            <ArrowLeft className="w-4 h-4" /> {"\u8FD4\u56DE\u4E3B\u673A".replace(/\\\\u/g, "\\u")}
                          </button>
                        </div>
                      }
                    >
                      {!current && <div className="text-white/60">{"\u672A\u77E5\u9875\u9762".replace(/\\\\u/g, "\\u")}</div>}
                      {current?.id === "works" && <WorksPage />}
                      {current?.id === "roles" && <RolesPage />}
                      {current?.id === "lab" && <LabPage />}
                      {current?.id === "links" && <LinksPage />}
                      {current?.id === "contact" && <ContactPage />}
                    </Screen>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CRT>

          {/* Right: Shelf */}
          <div className="space-y-4">
            <div className={`${glass} rounded-3xl p-5`}>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4" />
                <div className="font-semibold">{"\u5361\u5E26\u4E66\u67B6".replace(/\\\\u/g, "\\u")}</div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {cartridges.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelected(c);
                      setStage("hub");
                    }}
                    className={`${glass} rounded-2xl p-3 text-left hover:bg-white/10`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${c.color} border border-white/10`} />
                      <div>
                        <div className="font-semibold">{c.title}</div>
                        <div className="text-xs text-white/60 line-clamp-1">{c.blurb}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className={`${glass} rounded-3xl p-5`}>
              <div className="text-sm text-white/60 mb-1">SLOGAN</div>
              <div className="text-white/90 font-medium">{"\u201C" + PROFILE.slogans[0] + "\u201D"}</div>
              <div className="text-white/90 font-medium">{"\u201C" + PROFILE.slogans[1] + "\u201D"}</div>
            </div>

            <div className={`${glass} rounded-3xl p-5`}>
              <div className="text-sm text-white/60 mb-2">{"\u5176\u4ED6\u94FE\u63A5".replace(/\\\\u/g, "\\u")}</div>
              <div className="flex flex-wrap gap-2">
                <a
                  className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-sm"
                  href={PROFILE.links.csdn}
                  target="_blank"
                  rel="noreferrer"
                >
                  CSDN
                </a>
                <a
                  className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-sm"
                  href={PROFILE.links.bilibili}
                  target="_blank"
                  rel="noreferrer"
                >
                  {"B\u7AD9".replace(/\\\\u/g, "\\u")}
                </a>
                <a
                  className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-sm"
                  href={PROFILE.links.zhihu}
                  target="_blank"
                  rel="noreferrer"
                >
                  {"\u77E5\u4E4E".replace(/\\\\u/g, "\\u")}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-xs text-white/40 text-center">
          \u00A9 {new Date().getFullYear()} {PROFILE.owner}. {"\u4EA4\u4E92\u5373\u53F2\u4E8B \u00B7 Gamified Portfolio".replace(/\\\\u/g, "\\u")}
        </div>
      </div>
    </div>
  );
}
