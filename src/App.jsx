import React, { useState, useEffect } from "react";
import { Gamepad2, FolderKanban, Contact, Link as LinkIcon, Play, Rocket, Sparkles } from "lucide-react";

const PROFILE = {
  owner: "李大人",
  subtitle: "欢迎来到李大人的游戏世界",
  slogans: ["人生就像一场游戏", "站在巨人的肩膀上"],
  qq: "123456789",
  links: {
    csdn: "https://www.csdn.net/",
    bilibili: "https://www.bilibili.com/",
    zhihu: "https://www.zhihu.com/"
  }
};

const cartridges = [
  { id: "works", title: "作品集", color: "from-fuchsia-500 to-rose-500", icon: FolderKanban, blurb: "精选的视觉 / Shader 项目展示" },
  { id: "roles", title: "身份切换", color: "from-amber-400 to-orange-600", icon: Sparkles, blurb: "设计师 / 工程师 / 艺术家 三重身份切换" },
  { id: "lab", title: "实验室", color: "from-cyan-400 to-blue-600", icon: Rocket, blurb: "小型交互 Demo：3D 卡片 / 粒子 / 打字机等" },
  { id: "links", title: "外链", color: "from-emerald-400 to-teal-600", icon: LinkIcon, blurb: "更多内容：CSDN / B站 / 知乎" },
  { id: "contact", title: "联系我", color: "from-sky-400 to-indigo-600", icon: Contact, blurb: "QQ 一键复制 + 留言表单" },
];

function Cassette({ item, onPick }) {
  const Icon = item.icon;
  return (
    <button onClick={() => onPick(item)} className="w-48 h-28 rounded-2xl p-3 bg-white/5 border border-white/10 text-left">
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-30`} />
      <div className="flex items-center gap-3 relative">
        <div className="p-2 bg-black/50 rounded-xl">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <div className="font-bold">{item.title}</div>
          <div className="text-xs text-white/60">{item.blurb}</div>
        </div>
      </div>
    </button>
  );
}

export default function App() {
  const [stage, setStage] = useState("boot");
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen text-white bg-slate-900">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {stage === "boot" && (
          <div className="text-center">
            <Gamepad2 className="w-10 h-10 mx-auto mb-4" />
            <h1 className="text-2xl font-bold">{PROFILE.owner}的主机</h1>
            <p className="text-white/70 mb-6">{PROFILE.subtitle}</p>
            <button onClick={() => setStage("insert")} className="px-5 py-2 rounded-xl bg-white/10 border border-white/10">
              <Play className="inline w-4 h-4 mr-2" /> 点击开始游戏
            </button>
          </div>
        )}

        {stage === "insert" && (
          <div>
            <h2 className="text-xl mb-4">请选择卡带</h2>
            <div className="flex gap-4 overflow-x-auto">
              {cartridges.map(c => (
                <Cassette key={c.id} item={c} onPick={(it) => { setSelected(it); setStage("hub"); }} />
              ))}
            </div>
          </div>
        )}

        {stage === "hub" && selected && (
          <div>
            <h2 className="text-xl font-bold mb-2">已插入：{selected.title}</h2>
            <p className="text-white/70 mb-4">{selected.blurb}</p>
            <button onClick={() => setStage("insert")} className="px-4 py-2 rounded bg-white/10 border border-white/10">返回选择</button>
          </div>
        )}

        <footer className="mt-10 text-center text-xs text-white/50">
          © {new Date().getFullYear()} {PROFILE.owner} · Gamified Portfolio
        </footer>
      </div>
    </div>
  );
}
