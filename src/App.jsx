
import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Rocket, Gamepad2, FolderKanban, Contact, Link as LinkIcon, ArrowLeft, Play, Zap, Sparkles } from "lucide-react";

const PROFILE = {
  owner: "李大�?,
  subtitle: "欢迎来到李大人的游戏世界",
  slogans: ["人生就像一场游�?, "站在巨人的肩膀�?],
  qq: "在此填写你的QQ�?,
  links: {
    csdn: "https://www.csdn.net/",
    bilibili: "https://www.bilibili.com/",
    zhihu: "https://www.zhihu.com/",
  },
};

const cartridges = [
  { id: "works", title: "作品�?, color: "from-fuchsia-500 to-rose-500", icon: FolderKanban, blurb: "精选交�?视觉/Shader 项目的可视化展区，支持标签筛选与卡带式导航�? },
  { id: "roles", title: "身份切换", color: "from-amber-400 to-orange-600", icon: Sparkles, blurb: "�?设计�?/ 工程�?/ 艺术�?三重身份间切换，看看我如何跨界协作�? },
  { id: "lab", title: "实验�?, color: "from-cyan-400 to-blue-600", icon: Rocket, blurb: "小型可交�?Demo：卡�?D、像素滤镜、打字机、粒子等趣玩�? },
  { id: "links", title: "外链", color: "from-emerald-400 to-teal-600", icon: LinkIcon, blurb: "�?CSDN / B�?/ 知乎 看更多内容�? },
  { id: "contact", title: "联系�?, color: "from-sky-400 to-indigo-600", icon: Contact, blurb: "QQ 一键复�?+ 留言表单（可接入后端/表单服务）�? },
];

const WORKS = [
  { id: 1, title: "水墨卡牌 UI", tags: ["UI", "Card", "Ink"], desc: "P5×水墨风格", thumb: svgThumb("#111827") },
  { id: 2, title: "Shader 边缘高光", tags: ["Shader", "Unity"], desc: "RimSpec 实验", thumb: svgThumb("#1f2937") },
  { id: 3, title: "像素滤镜", tags: ["WebGL", "Filter"], desc: "低分辨率模拟", thumb: svgThumb("#0f172a") },
  { id: 4, title: "卡带式导�?, tags: ["UX", "Motion"], desc: "Gamified 导航", thumb: svgThumb("#111827") },
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
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="搜索作品�? className="pl-3 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none" />
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
            <div className="text-sm text-white/60">{w.desc}</div>
            <div className="mt-2 flex gap-2 flex-wrap">{w.tags.map((t) => (<span key={t} className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10">{t}</span>))}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RolesPage() {
  const roles = [
    { k: "设计�?, desc: "信息架构 / 交互�?/ 视觉系统 / 动效叙事" },
    { k: "工程�?, desc: "前端架构 / WebGL & Shader / 自动化与代理" },
    { k: "艺术�?, desc: "风格探索 / 符号设计 / 叙事原型" },
  ];
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {roles.map((r) => (
        <div key={r.k} className={`${glass} rounded-2xl p-5`}>
          <div className="text-lg font-bold mb-1">{r.k}</div>
          <div className="text-white/70">{r.desc}</div>
          <div className="mt-4 text-xs text-white/50">让工具适配思考，而不是相反�?/div>
        </div>
      ))}
    </div>
  );
}

function LabPage() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Playground title="卡片3D倾斜">
        <TiltCard />
      </Playground>
      <Playground title="打字机效�?>
        <Typewriter text="Hello, Agent Mode! 你好，代理模式！" />
      </Playground>
    </div>
  );
}

function LinksPage() {
  const rows = [
    { k: "CSDN", v: PROFILE.links.csdn },
    { k: "B�?, v: PROFILE.links.bilibili },
    { k: "知乎", v: PROFILE.links.zhihu },
  ];
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {rows.map((r) => (
        <a key={r.k} href={r.v} target="_blank" rel="noreferrer" className={`${glass} rounded-2xl p-5 hover:bg-white/10`}>
          <div className="font-semibold">{r.k}</div>
          <div className="text-sm text-white/60 break-all">{r.v}</div>
        </a>
      ))}
    </div>
  );
}

function ContactPage() {
  const [copied, setCopied] = useState(false);
  const qqText = PROFILE.qq || "请在代码里填写你的QQ�?;
  return (
    <div className="space-y-4">
      <div className={`${glass} rounded-2xl p-5`}>
        <div className="text-sm text-white/60 mb-2">QQ</div>
        <div className="flex items-center gap-2">
          <div className="font-semibold tracking-wide">{qqText}</div>
          <button onClick={async () => { try { await navigator.clipboard.writeText(qqText); setCopied(true); setTimeout(()=>setCopied(false), 1500);} catch {} }} className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-sm">复制</button>
          {copied && <span className="text-emerald-400 text-sm">已复制！</span>}
        </div>
      </div>
      <div className={`${glass} rounded-2xl p-5`}>
        <div className="text-sm text-white/60 mb-2">留言</div>
        <div className="grid md:grid-cols-2 gap-3">
          <input placeholder="你的名字" className="px-3 py-2 rounded-xl bg-white/5 border border-white/10" />
          <input placeholder="联系方式（可留空�? className="px-3 py-2 rounded-xl bg-white/5 border border-white/10" />
          <textarea placeholder="想对我说�? className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 md:col-span-2 h-28" />
        </div>
        <button className="mt-3 px-4 py-2 rounded-xl bg-white/10 border border-white/10">发送（可接入表单服务）</button>
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
  const ref = React.useRef(null);
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
      <div className="text-white/80">把鼠标在这里晃一�?/div>
    </div>
  );
}

function Typewriter({ text }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => Math.min(text.length, x + 1)), 40);
    return () => clearInterval(t);
  }, [text]);
  return <div className="font-mono text-sm">{text.slice(0, i)}<span className="opacity-60">�?/span></div>;
}

export default function App() {
  const [stage, setStage] = useState(\"boot\");
  const [selected, setSelected] = useState(null);
  const [route, setRoute] = useState(null);
  const current = cartridges.find((c) => c.id === route);

  useKey((e) => {
    if (stage === \"boot\" && (e.key === \"Enter\" || e.key === \" \")) setStage(\"insert\");
    if (stage === \"insert\" && e.key === \"Escape\") setStage(\"boot\");
  });

  return (
    <div className=\"min-h-screen text-white bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(79,70,229,.25),transparent),radial-gradient(900px_500px_at_90%_10%,rgba(236,72,153,.2),transparent),#0b0f1a]\">
      <div className=\"max-w-6xl mx-auto px-4 py-8 md:py-12\">
        <div className=\"flex items-center justify-between mb-6\">
          <div>
            <div className=\"text-xl md:text-2xl font-bold tracking-wide\">{PROFILE.subtitle}</div>
            <SloganTicker slogans={PROFILE.slogans} />
          </div>
          <div className=\"hidden md:flex items-center gap-2 opacity-80\">
            <div className=\"text-xs\">QQ</div>
            <div className=\"text-sm font-semibold\">{PROFILE.qq}</div>
          </div>
        </div>

        <div className=\"grid lg:grid-cols-[1.1fr_.9fr] gap-6 items-stretch\">
          <CRT>
            <div className=\"p-4 md:p-8\">
              <div>
                {stage === \"boot\" && (
                  <div>
                    <Screen title=\"WELCOME\">
                      <div className=\"flex flex-col items-center justify-center text-center py-10\">
                        <Gamepad2 className=\"w-10 h-10 opacity-70 mb-3\" />
                        <div className=\"text-2xl font-bold mb-2\">{PROFILE.owner} 的主�?/div>
                        <div className=\"text-white/70 mb-6\">{PROFILE.subtitle}</div>
                        <button onClick={() => setStage(\"insert\")} className=\"px-5 py-2.5 rounded-xl bg-white/10 border border-white/10 flex items-center gap-2\">
                          <Play className=\"w-4 h-4\" /> 点击开始游戏\n                        </button>
                      </div>
                    </Screen>
                  </div>
                )}

                {stage === \"insert\" && (
                  <div>
                    <Screen title=\"请插入游戏卡带\" footer={<div className=\"mt-4 text-xs text-white/50\">提示：点击任意卡带以在主屏预览，然后“进入子页面”�?/div>}>
                      <div className=\"aspect-[16/7] rounded-2xl border-2 border-dashed border-white/15 mb-4 flex items-center justify-center\">
                        <div className=\"text-white/60\">卡带插槽 / Cartridge Slot</div>
                      </div>
                      <div className=\"flex gap-4 overflow-x-auto snap-x pb-1\">
                        {cartridges.map((c) => (
                          <Cassette key={c.id} item={c} onPick={(it) => { setSelected(it); setStage(\"hub\"); }} />
                        ))}
                      </div>
                    </Screen>
                  </div>
                )}

                {stage === \"hub\" && (
                  <div>
                    <Screen title={`已插入：${selected?.title || \"—\"}`}>
                      <div className=\"grid md:grid-cols-[1.2fr_.8fr] gap-6 items-center\">
                        <div>
                          <div className=\"text-2xl font-bold mb-2\">{selected?.title}</div>
                          <div className=\"text-white/70 mb-4\">{selected?.blurb}</div>
                          <div className=\"flex gap-3\">
                            <button className=\"px-4 py-2 rounded-xl bg-white/10 border border-white/10\" onClick={() => setRoute(selected?.id)}>进入子页�?/button>
                            <button className=\"px-4 py-2 rounded-xl bg-white/5 border border-white/10\" onClick={() => setStage(\"insert\")}>更换卡带</button>
                          </div>
                        </div>
                        <div className=\"h-40 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0\" />
                      </div>
                    </Screen>
                  </div>
                )}

                {route && (
                  <div>
                    <Screen title={`子页�?/ ${current?.title}`} footer={<div className=\"mt-4 flex items-center gap-2\"><button onClick={() => setRoute(null)} className=\"px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 flex items-center gap-1 text-sm\"><span>返回主机</span></button></div>}>
                      {!current && <div className=\"text-white/60\">未知页面</div>}
                      {current?.id === \"works\" && <WorksPage />}
                      {current?.id === \"roles\" && <RolesPage />}
                      {current?.id === \"lab\" && <LabPage />}
                      {current?.id === \"links\" && <LinksPage />}
                      {current?.id === \"contact\" && <ContactPage />}
                    </Screen>
                  </div>
                )}
              </div>
            </div>
          </CRT>

          <div className=\"space-y-4\">
            <div className={`${glass} rounded-3xl p-5`}>
              <div className=\"flex items-center gap-2 mb-2\"><span>�?/span><div className=\"font-semibold\">卡带书架</div></div>
              <div className=\"grid sm:grid-cols-2 gap-3\">
                {cartridges.map((c) => (
                  <button key={c.id} onClick={() => { setSelected(c); setStage(\"hub\"); }} className={`${glass} rounded-2xl p-3 text-left hover:bg-white/10`}>
                    <div className=\"flex items-center gap-3\">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${c.color} border border-white/10`} />
                      <div>
                        <div className=\"font-semibold\">{c.title}</div>
                        <div className=\"text-xs text-white/60 line-clamp-1\">{c.blurb}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className={`${glass} rounded-3xl p-5`}>
              <div className=\"text-sm text-white/60 mb-1\">SLOGAN</div>
              <div className=\"text-white/90 font-medium\">“{PROFILE.slogans[0]}�?/div>
              <div className=\"text-white/90 font-medium\">“{PROFILE.slogans[1]}�?/div>
            </div>

            <div className={`${glass} rounded-3xl p-5`}>
              <div className=\"text-sm text-white/60 mb-2\">其他链接</div>
              <div className=\"flex flex-wrap gap-2\">
                <a className=\"px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-sm\" href={PROFILE.links.csdn} target=\"_blank\" rel=\"noreferrer\">CSDN</a>
                <a className=\"px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-sm\" href={PROFILE.links.bilibili} target=\"_blank\" rel=\"noreferrer\">B�?/a>
                <a className=\"px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-sm\" href={PROFILE.links.zhihu} target=\"_blank\" rel=\"noreferrer\">知乎</a>
              </div>
            </div>
          </div>
        </div>

        <div className=\"mt-8 text-xs text-white/40 text-center\">© {new Date().getFullYear()} {PROFILE.owner}. 交互即叙�?· Gamified Portfolio.</div>
      </div>
    </div>
  );
}

