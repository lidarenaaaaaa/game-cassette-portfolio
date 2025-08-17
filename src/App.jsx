
import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Rocket, Gamepad2, FolderKanban, Contact, Link as LinkIcon, ArrowLeft, Play, Zap, Sparkles } from "lucide-react";

const PROFILE = {
  owner: "李大人",
  subtitle: "欢迎来到李大人的游戏世界",
  slogans: ["人生就像一场游戏", "站在巨人的肩膀上"],
  qq: "在此填写你的QQ号",
  links: {
    csdn: "https://www.csdn.net/",
    bilibili: "https://www.bilibili.com/",
    zhihu: "https://www.zhihu.com/",
  },
};

const cartridges = [
  { id: "works", title: "作品展", color: "from-fuchsia-500 to-rose-500", icon: FolderKanban, blurb: "精选交互/视觉/Shader 项目的可视化展区，支持标签筛选与卡带式导航。" },
  { id: "roles", title: "身份切换", color: "from-amber-400 to-orange-600", icon: Sparkles, blurb: "在 设计师 / 工程师 / 艺术家 三重身份间切换，看看我如何跨界协作。" },
  { id: "lab", title: "实验室", color: "from-cyan-400 to-blue-600", icon: Rocket, blurb: "小型可交互 Demo：卡片3D、像素滤镜、打字机、粒子等趣玩。" },
  { id: "links", title: "外链", color: "from-emerald-400 to-teal-600", icon: LinkIcon, blurb: "去 CSDN / B站 / 知乎 看更多内容。" },
  { id: "contact", title: "联系我", color: "from-sky-400 to-indigo-600", icon: Contact, blurb: "QQ 一键复制 + 留言表单（可接入后端/表单服务）。" },
];

const WORKS = [
  { id: 1, title: "水墨卡牌 UI", tags: ["UI", "Card", "Ink"], desc: "P5×水墨风格", thumb: svgThumb("#111827") },
  { id: 2, title: "Shader 边缘高光", tags: ["Shader", "Unity"], desc: "RimSpec 实验", thumb: svgThumb("#1f2937") },
  { id: 3, title: "像素滤镜", tags: ["WebGL", "Filter"], desc: "低分辨率模拟", thumb: svgThumb("#0f172a") },
  { id: 4, title: "卡带式导航", tags: ["UX", "Motion"], desc: "Gamified 导航", thumb: svgThumb("#111827") },
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
    <button onClick={() => onPick?.(item)} className={`snap-start relative shrink-0 w-48 h-28 rounded-2xl p-3 text-left overflow-hidden ${glass}`}>
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
  const list = WORKS.filter((w) => (tag === "All" || w.tags.includes(tag)) && w.title.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <div className="flex flex-wrap gap-3 items-center mb-4">
        <div className="relative">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="搜索作品…" className="pl-3 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none" />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {tags.map((t) => (
            <button key={t} onClick={() => setTag(t)} className={`px-3 py-1.5 rounded-xl border ${tag === t ? "bg-white/10 border-white/30" : "bg-white/5 border-white/10"}`}>{t}</button>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((w) => (
          <div key={w.id} className={`${glass} rounded-2xl p-4`}>
            {w.thumb}
            <div className="mt-3 font-semibold">{w.title}</div>
            <div className="text-sm text-white/60">{w.desc}</div>\n            <div className="mt-2 flex gap-2 flex-wrap">{w.tags.map((t) => (<span key={t} className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10">{t}</span>))}</div>\n          </div>\n        ))}\n      </div>\n    </div>\n  );\n}\n\nfunction RolesPage() {\n  const roles = [\n    { k: "设计师", desc: "信息架构 / 交互流 / 视觉系统 / 动效叙事" },\n    { k: "工程师", desc: "前端架构 / WebGL & Shader / 自动化与代理" },\n    { k: "艺术家", desc: "风格探索 / 符号设计 / 叙事原型" },\n  ];\n  return (\n    <div className="grid md:grid-cols-3 gap-4">\n      {roles.map((r) => (\n        <div key={r.k} className={`${glass} rounded-2xl p-5`}>\n          <div className="text-lg font-bold mb-1">{r.k}</div>\n          <div className="text-white/70">{r.desc}</div>\n          <div className="mt-4 text-xs text-white/50">让工具适配思考，而不是相反。</div>\n        </div>\n      ))}\n    </div>\n  );\n}\n\nfunction LabPage() {\n  return (\n    <div className="grid md:grid-cols-2 gap-4">\n      <Playground title="卡片3D倾斜">\n        <TiltCard />\n      </Playground>\n      <Playground title="打字机效果">\n        <Typewriter text="Hello, Agent Mode! 你好，代理模式！" />\n      </Playground>\n    </div>\n  );\n}\n\nfunction LinksPage() {\n  const rows = [\n    { k: "CSDN", v: PROFILE.links.csdn },\n    { k: "B站", v: PROFILE.links.bilibili },\n    { k: "知乎", v: PROFILE.links.zhihu },\n  ];\n  return (\n    <div className="grid sm:grid-cols-3 gap-4">\n      {rows.map((r) => (\n        <a key={r.k} href={r.v} target="_blank" rel="noreferrer" className={`${glass} rounded-2xl p-5 hover:bg-white/10`}>\n          <div className="font-semibold">{r.k}</div>\n          <div className="text-sm text-white/60 break-all">{r.v}</div>\n        </a>\n      ))}\n    </div>\n  );\n}\n\nfunction ContactPage() {\n  const [copied, setCopied] = useState(false);\n  const qqText = PROFILE.qq || "请在代码里填写你的QQ号";\n  return (\n    <div className="space-y-4">\n      <div className={`${glass} rounded-2xl p-5`}>\n        <div className="text-sm text-white/60 mb-2">QQ</div>\n        <div className="flex items-center gap-2">\n          <div className="font-semibold tracking-wide">{qqText}</div>\n          <button onClick={async () => { try { await navigator.clipboard.writeText(qqText); setCopied(true); setTimeout(()=>setCopied(false), 1500);} catch {} }} className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-sm">复制</button>\n          {copied && <span className="text-emerald-400 text-sm">已复制！</span>}\n        </div>\n      </div>\n      <div className={`${glass} rounded-2xl p-5`}>\n        <div className="text-sm text-white/60 mb-2">留言</div>\n        <div className="grid md:grid-cols-2 gap-3">\n          <input placeholder="你的名字" className="px-3 py-2 rounded-xl bg-white/5 border border-white/10" />\n          <input placeholder="联系方式（可留空）" className="px-3 py-2 rounded-xl bg-white/5 border border-white/10" />\n          <textarea placeholder="想对我说…" className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 md:col-span-2 h-28" />\n        </div>\n        <button className="mt-3 px-4 py-2 rounded-xl bg-white/10 border border-white/10">发送（可接入表单服务）</button>\n      </div>\n    </div>\n  );\n}\n\nfunction Playground({ title, children }) {\n  return (\n    <div className={`${glass} rounded-2xl p-5`}>\n      <div className="font-semibold mb-3">{title}</div>\n      {children}\n    </div>\n  );\n}\n\nfunction TiltCard() {\n  const ref = React.useRef(null);\n  const [st, setSt] = useState({ x: 0, y: 0 });\n  return (\n    <div\n      ref={ref}\n      onMouseMove={(e) => {\n        const r = ref.current?.getBoundingClientRect();\n        if (!r) return;\n        const x = ((e.clientX - r.left) / r.width - 0.5) * 20;\n        const y = ((e.clientY - r.top) / r.height - 0.5) * 20;\n        setSt({ x, y });\n      }}\n      onMouseLeave={() => setSt({ x: 0, y: 0 })}\n      className="h-40 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 flex items-center justify-center"\n      style={{ transform: `perspective(600px) rotateX(${-st.y}deg) rotateY(${st.x}deg)` }}\n    >\n      <div className="text-white/80">把鼠标在这里晃一晃</div>\n    </div>\n  );\n}\n\nfunction Typewriter({ text }) {\n  const [i, setI] = useState(0);\n  useEffect(() => {\n    const t = setInterval(() => setI((x) => Math.min(text.length, x + 1)), 40);\n    return () => clearInterval(t);\n  }, [text]);\n  return <div className="font-mono text-sm">{text.slice(0, i)}<span className="opacity-60">▍</span></div>;\n}\n\nexport default function App() {\n  const [stage, setStage] = useState(\"boot\");\n  const [selected, setSelected] = useState(null);\n  const [route, setRoute] = useState(null);\n  const current = cartridges.find((c) => c.id === route);\n\n  useKey((e) => {\n    if (stage === \"boot\" && (e.key === \"Enter\" || e.key === \" \")) setStage(\"insert\");\n    if (stage === \"insert\" && e.key === \"Escape\") setStage(\"boot\");\n  });\n\n  return (\n    <div className=\"min-h-screen text-white bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(79,70,229,.25),transparent),radial-gradient(900px_500px_at_90%_10%,rgba(236,72,153,.2),transparent),#0b0f1a]\">\n      <div className=\"max-w-6xl mx-auto px-4 py-8 md:py-12\">\n        <div className=\"flex items-center justify-between mb-6\">\n          <div>\n            <div className=\"text-xl md:text-2xl font-bold tracking-wide\">{PROFILE.subtitle}</div>\n            <SloganTicker slogans={PROFILE.slogans} />\n          </div>\n          <div className=\"hidden md:flex items-center gap-2 opacity-80\">\n            <div className=\"text-xs\">QQ</div>\n            <div className=\"text-sm font-semibold\">{PROFILE.qq}</div>\n          </div>\n        </div>\n\n        <div className=\"grid lg:grid-cols-[1.1fr_.9fr] gap-6 items-stretch\">\n          <CRT>\n            <div className=\"p-4 md:p-8\">\n              <div>\n                {stage === \"boot\" && (\n                  <div>\n                    <Screen title=\"WELCOME\">\n                      <div className=\"flex flex-col items-center justify-center text-center py-10\">\n                        <Gamepad2 className=\"w-10 h-10 opacity-70 mb-3\" />\n                        <div className=\"text-2xl font-bold mb-2\">{PROFILE.owner} 的主机</div>\n                        <div className=\"text-white/70 mb-6\">{PROFILE.subtitle}</div>\n                        <button onClick={() => setStage(\"insert\")} className=\"px-5 py-2.5 rounded-xl bg-white/10 border border-white/10 flex items-center gap-2\">\n                          <Play className=\"w-4 h-4\" /> 点击开始游戏\n                        </button>\n                      </div>\n                    </Screen>\n                  </div>\n                )}\n\n                {stage === \"insert\" && (\n                  <div>\n                    <Screen title=\"请插入游戏卡带\" footer={<div className=\"mt-4 text-xs text-white/50\">提示：点击任意卡带以在主屏预览，然后“进入子页面”。</div>}>\n                      <div className=\"aspect-[16/7] rounded-2xl border-2 border-dashed border-white/15 mb-4 flex items-center justify-center\">\n                        <div className=\"text-white/60\">卡带插槽 / Cartridge Slot</div>\n                      </div>\n                      <div className=\"flex gap-4 overflow-x-auto snap-x pb-1\">\n                        {cartridges.map((c) => (\n                          <Cassette key={c.id} item={c} onPick={(it) => { setSelected(it); setStage(\"hub\"); }} />\n                        ))}\n                      </div>\n                    </Screen>\n                  </div>\n                )}\n\n                {stage === \"hub\" && (\n                  <div>\n                    <Screen title={`已插入：${selected?.title || \"—\"}`}>\n                      <div className=\"grid md:grid-cols-[1.2fr_.8fr] gap-6 items-center\">\n                        <div>\n                          <div className=\"text-2xl font-bold mb-2\">{selected?.title}</div>\n                          <div className=\"text-white/70 mb-4\">{selected?.blurb}</div>\n                          <div className=\"flex gap-3\">\n                            <button className=\"px-4 py-2 rounded-xl bg-white/10 border border-white/10\" onClick={() => setRoute(selected?.id)}>进入子页面</button>\n                            <button className=\"px-4 py-2 rounded-xl bg-white/5 border border-white/10\" onClick={() => setStage(\"insert\")}>更换卡带</button>\n                          </div>\n                        </div>\n                        <div className=\"h-40 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0\" />\n                      </div>\n                    </Screen>\n                  </div>\n                )}\n\n                {route && (\n                  <div>\n                    <Screen title={`子页面 / ${current?.title}`} footer={<div className=\"mt-4 flex items-center gap-2\"><button onClick={() => setRoute(null)} className=\"px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 flex items-center gap-1 text-sm\"><span>返回主机</span></button></div>}>\n                      {!current && <div className=\"text-white/60\">未知页面</div>}\n                      {current?.id === \"works\" && <WorksPage />}\n                      {current?.id === \"roles\" && <RolesPage />}\n                      {current?.id === \"lab\" && <LabPage />}\n                      {current?.id === \"links\" && <LinksPage />}\n                      {current?.id === \"contact\" && <ContactPage />}\n                    </Screen>\n                  </div>\n                )}\n              </div>\n            </div>\n          </CRT>\n\n          <div className=\"space-y-4\">\n            <div className={`${glass} rounded-3xl p-5`}>\n              <div className=\"flex items-center gap-2 mb-2\"><span>⚡</span><div className=\"font-semibold\">卡带书架</div></div>\n              <div className=\"grid sm:grid-cols-2 gap-3\">\n                {cartridges.map((c) => (\n                  <button key={c.id} onClick={() => { setSelected(c); setStage(\"hub\"); }} className={`${glass} rounded-2xl p-3 text-left hover:bg-white/10`}>\n                    <div className=\"flex items-center gap-3\">\n                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${c.color} border border-white/10`} />\n                      <div>\n                        <div className=\"font-semibold\">{c.title}</div>\n                        <div className=\"text-xs text-white/60 line-clamp-1\">{c.blurb}</div>\n                      </div>\n                    </div>\n                  </button>\n                ))}\n              </div>\n            </div>\n\n            <div className={`${glass} rounded-3xl p-5`}>\n              <div className=\"text-sm text-white/60 mb-1\">SLOGAN</div>\n              <div className=\"text-white/90 font-medium\">“{PROFILE.slogans[0]}”</div>\n              <div className=\"text-white/90 font-medium\">“{PROFILE.slogans[1]}”</div>\n            </div>\n\n            <div className={`${glass} rounded-3xl p-5`}>\n              <div className=\"text-sm text-white/60 mb-2\">其他链接</div>\n              <div className=\"flex flex-wrap gap-2\">\n                <a className=\"px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-sm\" href={PROFILE.links.csdn} target=\"_blank\" rel=\"noreferrer\">CSDN</a>\n                <a className=\"px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-sm\" href={PROFILE.links.bilibili} target=\"_blank\" rel=\"noreferrer\">B站</a>\n                <a className=\"px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-sm\" href={PROFILE.links.zhihu} target=\"_blank\" rel=\"noreferrer\">知乎</a>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div className=\"mt-8 text-xs text-white/40 text-center\">© {new Date().getFullYear()} {PROFILE.owner}. 交互即叙事 · Gamified Portfolio.</div>\n      </div>\n    </div>\n  );\n}\n