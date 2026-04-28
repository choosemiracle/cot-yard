


import React, { useState, useEffect } from 'react';
import { 
  Leaf, Wind, BookOpen, Compass, ShieldCheck, PenLine, 
  Info, ArrowLeft, Heart, MessageCircle, HelpCircle, 
  RefreshCw, Trees, Flame, Waves, Eye, VolumeX, 
  Trash2, Star, Lock, Mountain, Trophy, UserX, 
  HeartHandshake, ShieldAlert, Users
} from 'lucide-react';

// --- 信任圈核心数据 ---
const TOUCHSTONES = [
  { id: 1, cn: "给予欢迎，也接受欢迎。", en: "Extend and receive welcome.", intro: "在这里，我们以好客之心彼此相待。", reflect: "我是否允许自己也成为被欢迎的人？", detailCn: "人们在受欢迎的环境中学习效果最好。在这个圈子里，我们通过给予和接受善意来支持彼此。" },
  { id: 2, cn: "尽可能全然在场。", en: "Be present as fully as possible.", intro: "带着你的完整状态来到这里，包括疑虑、疲惫、喜悦与不确定。", reflect: "此刻，我是否允许完整的自己出现？", detailCn: "带着你的疑惑、恐惧和弱点，同时带着你的信念、快乐和成功，在此处，带着你的倾听去表达。" },
  { id: 3, cn: "所有分享，源于邀请，而非要求。", en: "What is offered is by invitation, not demand.", intro: "你的灵魂知道自己的节奏。", reflect: "我是否能尊重自己不说话的权利？", detailCn: "这绝对不是一个“必须分享”的活动。做任何你灵魂所呼唤的事情，并知道你在我们的支持下。" },
  { id: 4, cn: "说出自己的真实，尊重他人的真实。", en: "Speak your truth in ways that respect others.", intro: "真实不是用来压倒别人，而是放在圆心中被温柔见证。", reflect: "我能否只说‘我’的经验，而不是解释‘你’的问题？", detailCn: "我们对事实的看法可能不同，但说出自己的观点并不意味着要纠正别人。" },
  { id: 5, cn: "不修复，不拯救，不建议，也不纠正。", en: "No fixing, saving, advising, or correcting.", intro: "真正的陪伴，不急着把别人带离他的处境。", reflect: "我在听别人说话时，最容易急着做什么？", detailCn: "对于“助人者”来说这是最难的准则。但如果希望创造欢迎灵魂的空间，这是最重要的规则。" },
  { id: 6, cn: "学习用诚实、开放的问题回应。", en: "Learn to respond with honest, open questions.", intro: "好问题不是引导别人到我的答案，而是帮助他听见自己的答案。", reflect: "我能提出一个没有隐藏建议的问题吗？", detailCn: "通过这样的问题，我们可以帮助彼此进入更深的交流，而不是给出指导。" },
  { id: 7, cn: "当关系变得困难，转向好奇。", en: "When the going gets rough, turn to wonder.", intro: "困惑时，不急着判断，先问：这里发生了什么？", reflect: "我最近一次把判断转为好奇，是在什么时候？", detailCn: "如果你感到评判或防御，问问自己，“我想知道，是什么让她这么认为的?”" },
  { id: 8, cn: "聆听你内在的老师。", en: "Attend to your own inner teacher.", intro: "最深的指引，不总在外面，也在你里面。", reflect: "我内在的老师，最近在提醒我什么？", detailCn: "当我们探索诗歌、故事和静默时，我们就有了一个从内心学习的特殊机会。" },
  { id: 9, cn: "信任沉默，并向沉默学习。", en: "Trust and learn from the silence.", intro: "沉默不是空白，而是真实慢慢浮现的地方。", reflect: "我能否不急着填满沉默？", detailCn: "静默是嘈杂世界的礼物。把静默当作小组的一员。" },
  { id: 10, cn: "承诺并守护保密。", en: "Commit to and maintain confidentiality.", intro: "安全感来自彼此对边界的共同守护。", reflect: "我是否值得别人把真实托付给我？", detailCn: "信任来自于知道团队成员尊重隐私和谨慎的道德规范。" },
  { id: 11, cn: "带着你真正需要的东西离开。", en: "Leave the circle with what you need.", intro: "你未必得到答案，但可能带走更深的清明。", reflect: "如果今天只带走一样东西，我希望是什么？", detailCn: "相信种子会成长。在圈子结束时，你会拿到你真正需要的东西。" }
];

const QUESTION_LIBRARY = [
  { cat: "自我觉察", q: "你最近一次真正被听见，是在什么时候？" },
  { cat: "情绪", q: "哪种感觉一直敲门，而你却迟迟不敢开？" },
  { cat: "关系", q: "谁在你的生命里，最能让你感到“被真实地看见”？" },
  { cat: "生命方向", q: "如果你不再追求“成功”，你会追求什么？" }
];

// --- 视觉动画组件 ---
const ForestBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0a1a0a]">
    <div className="absolute inset-0 bg-gradient-to-b from-[#1a2e1a] via-[#0a1a0a] to-[#051005]"></div>
    <div className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-[#f3ede2] rounded-full blur-[120px] opacity-10 animate-pulse"></div>
    <div className="absolute inset-0 opacity-20">
      {[...Array(15)].map((_, i) => (
        <div key={i} className="absolute bg-[#d4af37] rounded-full blur-sm animate-pulse"
          style={{ width: Math.random() * 4 + 2 + 'px', height: Math.random() * 4 + 2 + 'px', left: Math.random() * 100 + '%', top: Math.random() * 100 + '%', animationDuration: Math.random() * 5 + 5 + 's' }}
        ></div>
      ))}
    </div>
  </div>
);

const FadeIn = ({ delay = 0, children, className = "" }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return (
    <div className={`transition-all duration-[1500ms] ease-out ${className}`} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}>
      {children}
    </div>
  );
};

const Button = ({ children, onClick, variant = 'primary', className = "" }) => {
  const base = "px-10 py-3.5 rounded-full transition-all duration-700 text-sm tracking-[0.2em] flex items-center justify-center border relative z-10";
  const variants = {
    primary: "bg-[#4d6a4d] border-[#5b805b] text-white shadow-xl hover:bg-[#3d5a3d]",
    secondary: "bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20",
  };
  return <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>{children}</button>;
};

// --- 主应用 ---
export default function App() {
  const [view, setView] = useState('landing');
  const [journal, setJournal] = useState(() => JSON.parse(localStorage.getItem('cot_yard_notes') || '[]'));
  const [expandedStoneId, setExpandedStoneId] = useState(null);
  const [dailyQ, setDailyQ] = useState(null);

  useEffect(() => {
    if (view === 'daily') setDailyQ(QUESTION_LIBRARY[Math.floor(Math.random() * QUESTION_LIBRARY.length)]);
  }, [view]);

  const saveNote = (text, source) => {
    if(!text.trim()) return;
    const next = [{ id: Date.now(), text, source, date: new Date().toLocaleDateString() }, ...journal];
    setJournal(next);
    localStorage.setItem('cot_yard_notes', JSON.stringify(next));
  };

  const HubCard = ({ icon: Icon, title, desc, onClick }) => (
    <div onClick={onClick} className="p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] hover:border-[#d4af37]/40 shadow-2xl transition-all cursor-pointer group text-left">
      <Icon className="text-[#d4af37] mb-8 group-hover:scale-110 transition-transform w-6 h-6" />
      <h3 className="text-lg text-white font-semibold mb-2 group-hover:text-[#d4af37]">{title}</h3>
      <p className="text-sm text-white/50 leading-relaxed font-light">{desc}</p>
    </div>
  );

  return (
    <div className="min-h-screen text-white font-sans selection:bg-[#d4af37]/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;600&display=swap');
        .font-serif { font-family: 'Noto Serif SC', serif; }
      `}</style>
      
      <ForestBackground />

      {/* 视图渲染 */}
      <div className="relative z-10">
        {view === 'landing' && (
          <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
            <FadeIn delay={500}><h1 className="text-3xl md:text-5xl font-semibold mb-10 tracking-[0.3em] font-serif leading-relaxed">你不需要表现，只需要在这里。</h1></FadeIn>
            <FadeIn delay={1500}><p className="text-md md:text-lg text-white/70 mb-16 max-w-lg leading-[2.5] font-light tracking-widest italic">一处数字化的林中空地</p></FadeIn>
            <FadeIn delay={2500}><Button onClick={() => setView('hub')}>进入小院</Button></FadeIn>
          </div>
        )}

        {view === 'hub' && (
          <div className="min-h-screen p-8 md:p-16 max-w-6xl mx-auto">
            <header className="mb-20 flex justify-between items-end border-b border-white/10 pb-8">
              <h2 className="text-2xl font-serif tracking-widest">信任圈小院 2.0</h2>
              <button onClick={() => setView('landing')} className="text-xs text-white/40 hover:text-[#d4af37]">返回扉页</button>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <HubCard icon={Wind} title="体验一次" desc="一段安静的内在降落之旅" onClick={() => setView('daily')} />
              <HubCard icon={Compass} title="十一基石" desc="支撑空间的边界与原则" onClick={() => setView('stones')} />
              <HubCard icon={PenLine} title="小院日志" desc="写给自己的真实片段" onClick={() => setView('journal')} />
              <HubCard icon={Trees} title="认识信任圈" desc="理解其精神与核心" onClick={() => setView('hub')} />
              <HubCard icon={ShieldCheck} title="安全边界" desc="脆弱如何成为可能" onClick={() => setView('hub')} />
              <HubCard icon={Info} title="关于小院" desc="愿景与起源" onClick={() => setView('hub')} />
            </div>
          </div>
        )}

        {view === 'stones' && (
          <div className="min-h-screen p-8 md:p-16 max-w-5xl mx-auto">
            <button onClick={() => setView('hub')} className="mb-12 flex items-center gap-2 text-white/50 hover:text-white"><ArrowLeft size={18}/> 返回小院</button>
            <h2 className="text-4xl font-serif mb-16 tracking-widest text-center">十一条基石</h2>
            <div className="grid gap-8">
              {TOUCHSTONES.map(s => (
                <div key={s.id} className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] transition-all hover:border-[#d4af37]/30">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[#d4af37] font-bold opacity-50">{String(s.id).padStart(2, '0')}</span>
                    <Star size={16} className="text-white/20" />
                  </div>
                  <h3 className="text-xl font-serif mb-4">「 {s.cn} 」</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-6 italic">{s.intro}</p>
                  <div className="bg-black/20 p-6 rounded-xl border-l-2 border-[#d4af37]">
                    <p className="text-[#d4af37] font-semibold">“{s.reflect}”</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'daily' && dailyQ && (
          <div className="min-h-screen flex items-center justify-center p-8 text-center">
            <div className="max-w-2xl">
              <span className="text-[#d4af37] text-xs tracking-[0.5em] uppercase mb-8 block">{dailyQ.cat}</span>
              <h3 className="text-3xl md:text-4xl font-serif mb-20 leading-relaxed italic">「 {dailyQ.q} 」</h3>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => setView('hub')} variant="secondary">离开</Button>
                <Button onClick={() => setDailyQ(QUESTION_LIBRARY[Math.floor(Math.random()*QUESTION_LIBRARY.length)])}>换一题</Button>
              </div>
            </div>
          </div>
        )}

        {view === 'journal' && (
          <div className="min-h-screen p-8 md:p-16 max-w-4xl mx-auto text-left">
            <button onClick={() => setView('hub')} className="mb-12 flex items-center gap-2 text-white/50 hover:text-white"><ArrowLeft size={18}/> 返回小院</button>
            <h2 className="text-3xl font-serif mb-16 tracking-widest">小院日志</h2>
            <div className="space-y-8">
              {journal.length === 0 ? <p className="text-white/20 italic">尚未留下痕迹...</p> : journal.map(e => (
                <div key={e.id} className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                  <span className="text-[10px] text-[#d4af37] uppercase tracking-widest block mb-4">{e.date}</span>
                  <p className="text-white/70 leading-relaxed">{e.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


