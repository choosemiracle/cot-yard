import React, { useState, useEffect, useMemo } from 'react';
import { 
  Wind, Map, BookOpen, Heart, ShieldCheck, Compass, MessageCircle, 
  PenTool, Home, ChevronRight, ArrowLeft, Loader2, Leaf, Coffee, 
  Sparkles, Waves, Armchair, CheckCircle2, Bookmark, ChevronDown, 
  ChevronUp, Shield, AlertCircle, EyeOff, Users, Quote, MicOff, 
  SearchX, Stethoscope, RefreshCw, Mountain, Flag, Circle, Flame, 
  UserCheck, Target, Zap, Download, Trash2, Timer, Play, Pause, RotateCcw, Bell
} from 'lucide-react';

// --- 1. 核心配置文件 (内容持久化与全量数据) ---

const CONFIG = {
  // 十一条基石
  touchstones: [
    { id: 1, cn: "给予欢迎，也接受欢迎。", summary: "在这里，我们以好客之心彼此相待。", reflection: "我是否允许自己也成为被欢迎的人？", detailCn: "表达和接受欢迎。人们在受欢迎的环境中学习效果最好。在这个圈子里，我们通过给予和接受善意来支持彼此的学习。", detailEn: "Extend and receive welcome. People learn best in hospitable spaces." },
    { id: 2, cn: "尽可能全然在场。", summary: "带着你的完整状态来到这里，包括疑虑、疲惫、喜悦与不确定。", reflection: "此刻，我是否允许完整的自己出现？", detailCn: "以最大可能的整全的状态于当下。在此处，带着你的疑惑、恐惧和弱点，同时带着你的信念、快乐和成功，在此处，带着你的倾听去表达。", detailEn: "Be present as fully as possible. Be here with your doubts, fears, and failings." },
    { id: 3, cn: "所有分享，源于邀请，而非要求。", summary: "你的灵魂知道自己的节奏。", reflection: "我是否能尊重自己不说话的权利？", detailCn: "邀请，而不是要求。这不是一个“必须分享，否则后悔”的活动！在这次活动期间，做任何你灵魂所呼唤的事情。你的灵魂比我们更了解你的需求。", detailEn: "What is offered in the circle is by invitation, not demand." },
    { id: 4, cn: "说出自己的真实，也尊重他人的真实。", summary: "真实不是用来压倒别人，而是放在圆心中被温柔见证。", reflection: "我能否说‘我’的经验，而不是解释‘你’的问题？", detailCn: "表达自己的时候，需要尊重别人表达的事实。一个人的观点并不意味着解释、纠正或者辩论别人表达的东西。使用“我”的陈述。", detailEn: "Speak your truth in ways that respect other people's truth." },
    { id: 5, cn: "不修复，不拯救，不建议，不纠正。", summary: "真正的陪伴，不急着把别人带离他的处境。", reflection: "我在听别人说话时，最容易急着做什么？", detailCn: "不修复，不拯救，不建议，也不纠正对方。对于我们这些从事“帮助人”的人来说，这是最难的准则之一。但如果我们希望创造一个欢迎灵魂的空间，这是最重要的规则。", detailEn: "No fixing, no saving, no advising, or correcting." },
    { id: 6, cn: "学习用诚实、开放的问题回应。", summary: "好问题不是引导别人到我的答案，而是帮助他听见自己的答案。", reflection: "我能提出一个没有隐藏建议的问题吗？", detailCn: "用诚实、开放的问题来回应别人，而不是建议或纠正。通过这样的问题，我们可以帮助“倾听彼此，进入更深的交流。”", detailEn: "Learn to respond with honest, open questions." },
    { id: 7, cn: "当关系变得困难，转向好奇。", summary: "困惑时，不急着判断，先问：这里发生了什么？", reflection: "我最近一次把判断转为好奇，是在什么时候？", detailCn: "当进行不顺利时，转念为好奇。如果你感到评判或防御，问问自己，“我想知道，是什么让她这么认为的?”。抛开评判，更深入地倾听别人和自己。", detailEn: "When the going gets rough, turn to wonder." },
    { id: 8, cn: "聆听你内在的老师。", summary: "最深的指引，不总在外面，也在你里面。", reflection: "我内在的老师，最近在提醒我什么？", detailCn: "关注你内心的老师。我们当然会向别人学习。但当我们在一个信任圆圈里探索时，我们就有了一个从内心学习的特殊机会。", detailEn: "Attend to your own inner teacher." },
    { id: 9, cn: "信任沉默，并向沉默学习。", summary: "沉默不是空白，而是真实慢慢浮现的地方。", reflection: "我能否不急着填满沉默？", detailCn: "相信并从静默中学习。静默是我们这个嘈杂世界的礼物。把静默当作小组的一员。在某人说完话之后，花点时间反思。", detailEn: "Trust and learn from the silence." },
    { id: 10, cn: "承诺并守护保密。", summary: "安全感来自彼此对边界的共同守护。", reflection: "我是否值得别人把真实托付给我？", detailCn: "严格保密。信任来自于知道团队成员尊重信任，认真对待隐私和谨慎的道德规范。", detailEn: "Commit to and maintain confidentiality." },
    { id: 11, cn: "相信种子会成长。", summary: "你未必得到答案，但可能带走更深的清明。", reflection: "如果今天只带走一样东西，我希望是什么？", detailCn: "相信种子会成长。从一开始就知道，你可能会在这个圈子结束的时候，拿到了你需要的东西。还要知道，在这里种下的种子可以在未来的日子里继续生长。", detailEn: "Believe seeds will grow." }
  ],
  // 引导者进阶
  facilitatorLevels: [
    { id: 1, title: "理解精神", icon: BookOpen, desc: "理解精神内核、边界原则与帕尔默的思想。", learnItems: ["理解分裂的人生", "发现隐秘的完整", "学会聆听内在导师", "理解第三事物的隐喻力量", "践行不修复、不建议原则"], assessment: ["我能解释为什么不建议更难吗？", "我理解了为什么灵魂像害羞的野兽吗？"], practice: "本周尝试在对话中彻底忍住建议冲动。", pitfall: "试图把信任圈变成一种技巧而非生命状态。" },
    { id: 2, title: "基本能力", icon: Flame, desc: "从调整倾听习惯开始，培养守护者的心理容量。", learnItems: ["全然在场：放下评判", "深度聆听：听见余音", "静默承载：不急于填满", "诚实提问：不带预设答案", "去中心化：不把自己当关键"], assessment: ["沉默发生时，我会急着想说点什么吗？", "我的问题是好奇，还是披着提问外衣的建议？"], practice: "在对话停顿后，多留出五秒钟的静默。", pitfall: "过度关注提问技巧是否高级，从而失去连接。" },
    { id: 3, title: "守护空间", icon: ShieldCheck, desc: "学习如何维护一个让参与者感到安全且有尊严的容器。", learnItems: ["设计开场与欢迎仪式", "确认共同契约：朗读基石", "处理沉默：让静默成为力量", "面对眼泪：见证而不打断", "重申规则：温和纠正越界"], assessment: ["有人哭泣时，我能克制住安慰的冲动吗？", "我能有底气地打断一个正在给建议的人吗？"], practice: "模拟五分钟开场，尝试建立最大的安全感。", pitfall: "为了维持表面和谐而纵容越界行为。" },
    { id: 4, title: "真实带领", icon: Target, desc: "从小型练习开始，逐步进入复杂的社群场域进行实践。", learnItems: ["设计 90 分钟沙龙流程", "设计半日深度工作坊", "双引导协作：背靠背的信任", "自我照看：防止替代性创伤", "伦理边界：建立转介专业咨询的意识"], assessment: ["我是否建立了个人支持系统？", "我能接纳一场“看起来并不热闹”的圆圈吗？"], practice: "寻找一位伙伴，共同设计并主持一次诗歌回响会。", pitfall: "产生“救世主”心态，认为质量取决于自己的魅力。" }
  ],
  // 随机问题
  questionLibrary: [
    { category: "自我觉察", text: "你最近一次真正被听见，是在什么时候？" },
    { category: "自我觉察", text: "此刻的你，最需要被温柔看见的是什么？" },
    { category: "自我觉察", text: "你正在把哪一部分自己藏起来？" },
    { category: "自我觉察", text: "有什么话，你一直想说，却还没有找到安全的地方？" },
    { category: "自我觉察", text: "如果不需要表现，你现在会怎样坐在这里？" },
    { category: "情绪", text: "如果你的疲惫可以说话，它会说什么？" },
    { category: "关系", text: "你希望别人不要急着修复你，而只是怎样陪着你？" },
    { category: "生命方向", text: "你生命中正在关闭的一扇门，也许在保护什么？" },
    { category: "分裂与整全", text: "你是否正在过一种外在成功、内在分裂的生活？" },
    { category: "整全", text: "回归完整的第一步，对你而言是什么？" }
  ],
  // 问题小径
  paths: [
    { id: 'back-to-self', title: '回到自己', icon: Compass, desc: '当你感到分散、疲惫、失去中心。', questions: ["我现在真正的状态是什么？", "我最近最常扮演的角色是什么？", "哪一部分自己被我留在了门外？", "如果我不再证明自己，会发生什么？", "我今天可以如何更诚实地生活一点？"] },
    { id: 'through-fear', title: '穿过恐惧', icon: Mountain, desc: '当你被担心、羞耻或不确定困住。', questions: ["我最害怕被别人看见什么？", "这个恐惧想保护我什么？", "我是否把一次失败误认为自己的全部？", "如果恐惧可以说话，它会说什么？", "我可以怎样温柔地陪着这个恐惧？"] },
    { id: 'wholeness', title: '从分裂到整全', icon: ShieldCheck, desc: '当外在生活与内在真实不一致。', questions: ["我在哪里活成了别人期待的样子？", "我的身体最近在提醒我什么？", "哪些成功让我离自己更远？", "我真正不愿再背负的是什么？", "如果向整全迈出一步，它会是什么？"] }
  ],
  witnessPool: [
    "“我也常常不知道，自己到底在怕什么。”",
    "“我发现，我最想被听见的，不是答案，而是沉默中的陪伴。”",
    "“原来不说，也可以是一种诚实。”",
    "“我正在学习不急着解释自己。”"
  ]
};

// --- 2. 基础 UI 组件与全局样式 ---

const GlobalStyles = () => (
  <style>{`
    @keyframes slowFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes breathe { 0% { transform: scale(1); opacity: 0.2; } 50% { transform: scale(1.4); opacity: 0.05; } 100% { transform: scale(1); opacity: 0.2; } }
    @keyframes circleStep { 0% { transform: scale(0.95); } 50% { transform: scale(1.05); } 100% { transform: scale(0.95); } }
    .animate-slow-fade { animation: slowFadeIn 2s ease-out forwards; }
    .breathe-ring { animation: breathe 6s ease-in-out infinite; }
    .breathe-text { animation: circleStep 6s ease-in-out infinite; }
    .card-base { transition: all 0.8s cubic-bezier(0.2, 1, 0.3, 1); border: 2.5px solid rgba(210, 196, 181, 0.3); }
    .card-base:hover { transform: translateY(-8px); box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.15); border-color: rgba(118, 140, 118, 0.5); background: white; }
    .stone-card { background: #FDFCF8; border: 1.5px solid rgba(210, 196, 181, 0.4); background-image: radial-gradient(circle at 90% 10%, rgba(197, 179, 88, 0.15) 0%, transparent 40%); }
    .learn-chapter-title { position: relative; font-weight: 900; }
    .learn-chapter-title::after { content: ''; position: absolute; left: 0; bottom: -10px; width: 40px; height: 2.5px; background: #768C76; }
    
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-thumb { background: #8C7A66; border-radius: 10px; }

    input[type='range'] {
      -webkit-appearance: none;
      width: 100%;
      height: 8px;
      background: #D2C4B5;
      border-radius: 10px;
      outline: none;
    }
    input[type='range']::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 28px;
      height: 28px;
      background: #768C76;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      border: 3px solid white;
    }
  `}</style>
);

const PageTransition = ({ children }) => (
  <div className="animate-in fade-in slide-in-from-bottom-2 duration-1000 ease-in-out w-full px-4 md:px-0">
    {children}
  </div>
);

const Button = ({ onClick, children, variant = 'primary', className = '', disabled = false }) => {
  const baseStyles = "px-6 md:px-8 py-4 rounded-full transition-all duration-700 ease-out transform active:scale-95 flex items-center justify-center gap-2 tracking-widest text-xs md:text-sm whitespace-nowrap font-black border-2";
  const variants = {
    primary: `bg-[#2D2D2B] text-white border-[#2D2D2B] hover:bg-black shadow-md disabled:opacity-30`,
    secondary: `bg-white/70 text-[#2D2D2B] border-[#8C7A66]/50 hover:bg-white hover:border-[#8C7A66] backdrop-blur-sm`,
    ghost: `text-[#2D2D2B] border-transparent hover:bg-[#768C76]/15 bg-transparent`,
    accent: `bg-[#768C76] text-white border-[#768C76] hover:opacity-90`
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

// --- 3. 核心功能组件 ---

// 3.1 顶部导航
const Navbar = ({ onNavigate, currentPath }) => {
  if (currentPath === 'arrival') return null;
  return (
    <nav className="fixed top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-50 bg-[#F8F7F2]/95 backdrop-blur-md border-b border-[#D2C4B5]/40 shadow-sm">
      <div 
        className="text-[#2D2D2B] font-serif font-black cursor-pointer text-base md:text-xl tracking-widest flex items-center gap-2" 
        onClick={() => onNavigate('hub')}
      >
        <span className="w-3 h-3 rounded-full bg-[#768C76]"></span>
        <span>信任圈小院 2.0</span>
      </div>
      <Button variant="ghost" onClick={() => onNavigate('hub')} className="p-2 min-w-0 rounded-xl border-none">
        <Home size={26} strokeWidth={2.5} className="text-[#2D2D2B]" />
      </Button>
    </nav>
  );
};

// 3.2 底部导航
const BottomNav = ({ onNavigate, currentPath }) => {
  if (currentPath === 'arrival') return null;
  const navItems = [
    { id: 'hub', label: '小院', icon: Waves },
    { id: 'journal', label: '日志', icon: PenTool },
    { id: 'timer', label: '静默', icon: Timer },
    { id: 'daily', label: '灵感', icon: Sparkles },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#F8F7F2]/98 backdrop-blur-lg border-t-2 border-[#D2C4B5]/50 px-4 pb-6 pt-3 flex justify-around items-center safe-area-inset-bottom shadow-[0_-8px_20px_rgba(0,0,0,0.05)]">
      {navItems.map(({ id, label, icon: Icon }) => (
        <button 
          key={id}
          onClick={() => onNavigate(id)}
          className={`flex flex-col items-center gap-1.5 transition-all duration-300 py-1 ${currentPath === id ? 'text-[#768C76] scale-110' : 'text-[#8C7A66]'}`}
        >
          <Icon size={24} strokeWidth={currentPath === id ? 3 : 2.5} />
          <span className="text-[11px] font-black tracking-widest uppercase">{label}</span>
        </button>
      ))}
    </nav>
  );
};

// --- 4. 页面内容组件 ---

// 4.1 首页
const ArrivalPage = ({ navigate, onMicroStart }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 md:p-8 bg-[#F8F7F2] relative overflow-hidden select-none text-center pt-28">
    <GlobalStyles />
    <div className="absolute top-[-5%] right-[-5%] text-[#768C76] opacity-10 pointer-events-none"><Wind size={600} strokeWidth={0.2} /></div>
    <div className="text-center max-w-3xl z-10 space-y-10 md:space-y-14">
      <div className="animate-slow-fade opacity-0 text-center"><p className="text-xs md:text-sm tracking-[0.4em] text-[#8C7A66] font-black uppercase">Circle of Trust · 内在生命的空地</p></div>
      <div className="animate-slow-fade delay-1s text-center px-2"><h1 className="text-3xl md:text-6xl font-black tracking-[0.1em] text-[#2D2D2B] leading-snug md:leading-tight text-center">你不需要表现</h1></div>
      <div className="animate-slow-fade delay-1s text-center px-2"><h1 className="text-3xl md:text-6xl font-black tracking-[0.1em] text-[#2D2D2B] leading-snug md:leading-tight text-center">只需要在这里</h1></div>

      <div className="animate-slow-fade delay-2s max-w-md mx-auto text-center px-4"><p className="text-[#4A4A48] text-base md:text-xl font-serif leading-loose tracking-wider font-black text-center">这里是一处数字化的小院<br/>邀请你慢一点<br/>听见自己 也学习如何听见他人</p></div>
      <div className="animate-slow-fade delay-3s pt-6 flex flex-col md:flex-row gap-5 justify-center items-center">
        <Button onClick={() => navigate('hub')} className="w-full md:min-w-[200px] text-lg py-5 shadow-xl">进入小院</Button>
        <div className="flex gap-4 w-full md:w-auto">
          <Button variant="secondary" onClick={onMicroStart} className="flex-1 py-5">体验一次</Button>
          <Button variant="ghost" onClick={() => navigate('about')} className="flex-1 font-black underline underline-offset-4 decoration-2">了解更多</Button>
        </div>
      </div>
    </div>
    <div className="absolute bottom-28 md:bottom-32 text-center w-full animate-slow-fade delay-3s"><p className="text-xs md:text-sm tracking-[0.2em] text-[#8C7A66] font-black uppercase text-center">Circle of Trust · Courtyard 2.0</p></div>
  </div>
);

// 4.2 小院入口
const HubPage = ({ navigate, onMicroStart }) => {
  const menuItems = [
    { id: 'micro', icon: Waves, title: '微型体验', desc: '用三到五分钟，停下来，听见此刻的自己。', btn: '开始体验' },
    { id: 'daily', icon: Sparkles, title: '每日一问', desc: '一个开放而诚实的问题，陪你走近真实。', btn: '抽取问题' },
    { id: 'timer', icon: Timer, title: '静默时光', desc: '设定一段安静的时间，深呼吸，不被打扰。', btn: '开启计时' },
    { id: 'path', icon: Map, title: '问题小径', desc: '按主题深入探索，步入内在的森林。', btn: '踏入小径' }
  ];
  return (
    <PageTransition>
      <div className="pt-28 md:pt-40 pb-40 max-w-6xl mx-auto min-h-screen">
        <header className="mb-12 md:mb-20 text-center px-4">
          <h2 className="text-3xl md:text-4xl font-black tracking-[0.2em] text-[#2D2D2B] mb-5 text-center">今天，你想如何进入？</h2>
          <p className="text-[#4A4A48] font-serif text-base md:text-lg tracking-widest leading-relaxed font-black text-center">这里的一切，都是邀请，不是要求。</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-20 px-2 text-center">
          {menuItems.map((item) => {
            const IconComp = item.icon;
            return (
              <div key={item.id} className="card-base group bg-white/70 p-10 md:p-14 rounded-[40px] flex flex-col items-center relative overflow-hidden text-center shadow-sm">
                <div className="mb-8 text-[#768C76] relative z-10"><IconComp size={48} strokeWidth={2} /></div>
                <h3 className="text-2xl font-black mb-4 text-[#2D2D2B] tracking-[0.1em] text-center">{item.title}</h3>
                <p className="text-base md:text-lg text-[#4A4A48] mb-10 font-black leading-relaxed text-center px-2">{item.desc}</p>
                <Button onClick={() => item.id === 'micro' ? onMicroStart() : navigate(item.id)} variant="secondary" className="group-hover:bg-[#2D2D2B] group-hover:text-white relative z-10 px-12 border-2 text-center">{item.btn}</Button>
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 pt-12 border-t-2 border-[#D2C4B5]/40 text-sm tracking-[0.3em] uppercase text-[#8C7A66] px-4 font-black text-center">
          {['learn', 'facilitator', 'stones', 'safety', 'about'].map(id => (
            <button key={id} onClick={() => navigate(id)} className="hover:text-[#768C76] transition-colors whitespace-nowrap text-center">
              {{learn:'认识信任圈', facilitator:'引导者之路', stones:'十一条基石', safety:'安全与边界', about:'关于小院'}[id]}
            </button>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

// 4.3 认识信任圈
const LearnPage = ({ navigate }) => {
  const sections = [
    { title: "它不是普通分享会", content: "在信任圈里，重点不是表达得多好，也不是观点多正确，而是让每个人都有机会靠近自己的真实。", icon: Users },
    { title: "它不是心理治疗", content: "信任圈尊重人的痛苦，但不诊断、不治疗、不分析。它通过创造一个极度安全、互不侵犯的空间，让人听见自己内在的声音。", icon: Stethoscope, question: "你最近是否也在扮演一个很累的角色？" },
    { title: "它不是讨论会", content: "这里不争辩、不说服、不抢答案。我们学习把真理放在圆心，而不是把自己放在中心。", icon: MessageCircle },
    { title: "它的核心精神", content: "为了守护每一个害羞的灵魂，我们共同承诺：", isSpecial: true, nos: ["不修复", "不拯救", "不建议", "不纠正"], icon: Shield, question: "你是否也有过被急着建议的时刻？" },
    { title: "它相信什么", content: "每个人内在都有一种更深的智慧。真正的帮助，不是替别人找到答案，而是创造条件，让答案从他自己的生命中浮现。", icon: Sparkles },
    { title: "它带人去哪里", content: "从分裂回到整全。从角色回到真实。从孤独回到连接。从恐惧回到信任。", icon: Map, question: "如果有人不急着改变你，你会想说什么？" }
  ];
  return (
    <PageTransition>
      <div className="pt-28 md:pt-40 pb-40 max-w-4xl mx-auto min-h-screen px-4 md:px-8">
        <header className="text-center mb-16 md:mb-24 text-center">
          <h2 className="text-3xl md:text-5xl font-black tracking-[0.3em] mb-10 text-[#2D2D2B] text-center uppercase">信任圈是什么？</h2>
          <div className="relative p-10 md:p-16 bg-white/70 rounded-[40px] border-2 border-[#D2C4B5] shadow-md text-center">
             <Quote className="absolute top-6 left-8 text-[#768C76]/20" size={56} />
             <p className="text-xl md:text-3xl font-serif italic font-black text-[#2D2D2B] leading-relaxed relative z-10 text-center">
               「信任圈，是一群人围坐在一起，学习不急着改变彼此，而是安静地听见真实。」
             </p>
          </div>
        </header>
        <div className="space-y-24 md:space-y-40">
          {sections.map((section, idx) => {
            const IconComp = section.icon;
            return (
              <div key={idx} className="relative text-left">
                <div className="flex items-center gap-5 mb-8 justify-center md:justify-start">
                  <div className="p-4 bg-[#768C76]/15 rounded-[24px] text-[#768C76] shadow-sm"><IconComp size={32} strokeWidth={2.5} /></div>
                  <h3 className="text-2xl md:text-4xl font-black tracking-widest text-[#2D2D2B]">{section.title}</h3>
                </div>
                <div className="pl-6 md:pl-16 border-l-6 border-[#D2C4B5]">
                  <p className="text-lg md:text-2xl text-[#4A4A48] font-serif leading-loose font-black mb-10">{section.content}</p>
                  {section.isSpecial && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
                      {section.nos.map((no, i) => (<div key={i} className="bg-[#2D2D2B] text-white p-5 rounded-[20px] text-center shadow-lg"><span className="text-base md:text-lg font-black tracking-widest uppercase">{no}</span></div>))}
                    </div>
                  )}
                  {section.question && (
                    <div className="bg-[#768C76]/10 p-8 md:p-14 rounded-[40px] border-2 border-dashed border-[#768C76] flex flex-col items-center text-center shadow-inner">
                      <Zap className="text-[#C5B358] mb-6 animate-pulse" size={32} />
                      <p className="text-xl md:text-2xl italic font-serif font-black text-[#2D2D2B]">“{section.question}”</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <footer className="mt-40 pt-24 border-t-4 border-[#D2C4B5]/40 text-center">
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center text-center">
            <Button onClick={() => navigate('micro')} className="w-full md:w-auto text-xl py-6 px-12 shadow-2xl">开始一次微型体验</Button>
            <Button variant="secondary" onClick={() => navigate('stones')} className="w-full md:w-auto text-xl py-6 px-12 border-4 text-center">阅读基石原则</Button>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

// 4.4 每日一问
const DailyQuestionPage = ({ navigate, onSave }) => {
  const [q, setQ] = useState(null);
  const [ans, setAns] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const draw = () => { setQ(CONFIG.questionLibrary[Math.floor(Math.random() * CONFIG.questionLibrary.length)]); setAns(""); setIsSaved(false); };
  useEffect(() => draw(), []);
  if (!q) return null;
  return (
    <PageTransition>
      <div className="pt-28 md:pt-40 pb-32 max-w-4xl mx-auto min-h-screen flex flex-col items-center text-center px-4">
        <header className="mb-12 text-center"><h2 className="text-3xl md:text-5xl font-black tracking-[0.2em] text-[#2D2D2B] text-center">每日一问</h2><p className="text-[#4A4A48] font-serif text-lg md:text-2xl tracking-widest mt-6 font-black text-center">「一个好问题，不急着要答案。」</p></header>
        <div className="stone-card p-10 md:p-24 rounded-[48px] md:rounded-[72px] w-full mb-12 flex flex-col items-center shadow-2xl border-4 border-[#D2C4B5]/60">
          <span className="text-base font-black text-[#768C76] mb-8 tracking-[0.5em] uppercase text-center">{q.category}</span>
          <h3 className="text-3xl md:text-5xl font-serif font-black italic text-[#2D2D2B] leading-relaxed mb-12 md:mb-20 px-4 text-center">“{q.text}”</h3>
          <textarea value={ans} onChange={(e)=>setAns(e.target.value)} className="w-full h-48 p-8 rounded-[40px] bg-white border-4 border-[#D2C4B5]/30 focus:border-[#768C76] focus:outline-none mb-10 font-serif text-lg md:text-2xl font-black text-[#2D2D2B] shadow-inner" placeholder="在此写下私人回应..."/>
          <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
            <Button onClick={()=>{onSave('每日一问', q.text, ans); setIsSaved(true);}} disabled={!ans.trim() || isSaved} className="w-full sm:w-auto text-xl py-6 px-14 shadow-lg text-center">{isSaved ? '已存入日志' : '存入我的日志'}</Button>
            <Button variant="secondary" onClick={draw} className="w-full sm:w-auto text-xl py-6 px-14 font-black text-center text-center"><RefreshCw size={28} strokeWidth={3}/> 换个问题</Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

// 4.5 问题小径
const QuestionPathPage = ({ onSave, navigate }) => {
  const [active, setActive] = useState(null);
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState({});
  const [done, setDone] = useState(false);

  if (!active) return (
    <PageTransition>
      <div className="pt-28 md:pt-40 pb-40 px-4 text-center min-h-screen">
        <h2 className="text-3xl md:text-5xl font-black mb-12 tracking-[0.3em] text-[#2D2D2B] text-center uppercase">问题小径</h2>
        <p className="text-base md:text-xl font-black text-[#4A4A48] mb-20 text-center">「选择一条小径，为了更靠近自己。」</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto text-center">
          {CONFIG.paths.map((p) => {
            const PathIcon = p.icon;
            return (
              <div key={p.id} className="card-base p-10 md:p-16 rounded-[48px] bg-white flex flex-col items-center border-4 border-[#D2C4B5]/40 shadow-xl text-center">
                <div className="p-5 bg-[#768C76]/10 rounded-full mb-8"><PathIcon size={56} strokeWidth={2} className="text-[#768C76]" /></div>
                <h3 className="text-2xl md:text-4xl font-black mb-6 tracking-widest text-center">{p.title}</h3>
                <p className="text-base md:text-lg text-[#4A4A48] mb-12 font-black leading-loose text-center px-2">{p.desc}</p>
                <Button onClick={() => { setActive(p); setStep(0); setAns({}); setDone(false); }} variant="secondary" className="w-full text-xl py-6 border-4">踏上小径</Button>
              </div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );

  if (done) return (
    <PageTransition>
      <div className="pt-28 md:pt-40 px-6 text-center max-w-3xl mx-auto min-h-screen text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-16 text-[#2D2D2B] text-center uppercase tracking-widest">今日小径回声</h2>
        <div className="space-y-10 text-left mb-20">
          {active.questions.map((q, i) => (
            <div key={i} className="border-l-8 border-[#768C76] pl-8 py-6 bg-white shadow-lg rounded-r-[40px] text-left">
              <p className="text-xs md:text-sm font-black text-[#8C7A66] uppercase mb-3 tracking-widest text-left">提问：{q}</p>
              <p className="text-xl md:text-3xl font-serif font-black text-[#2D2D2B] text-left leading-relaxed">{ans[i] || '（在此刻留下了沉默）'}</p>
            </div>
          ))}
        </div>
        <Button onClick={() => { onSave(`问题小径：${active.title}`, '五个深处提问的回响', active.questions.map((q,i)=>`问：${q}\n答：${ans[i]}`).join('\n\n')); setActive(null); }} className="mx-auto w-full text-2xl py-8 shadow-2xl">保存回声并离开</Button>
      </div>
    </PageTransition>
  );

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center py-20 bg-[#F8F7F2] px-4 md:px-6 text-center">
        <div className="w-full max-w-2xl space-y-12 text-center text-center">
          <div className="flex items-center gap-6 text-center">
            <div className="flex-1 h-3 bg-[#D2C4B5]/40 relative rounded-full shadow-inner"><div className="absolute left-0 top-0 h-full bg-[#768C76] rounded-full transition-all duration-1000 shadow-sm" style={{width:`${(step+1)*20}%`}}></div></div>
            <span className="text-base md:text-lg text-[#2D2D2B] font-black tracking-widest">{step+1}/5</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-black italic text-[#2D2D2B] leading-relaxed text-center px-4 mb-10 bg-white/40 py-8 rounded-[48px] border-2 border-[#D2C4B5]/40 text-center">“{active.questions[step]}”</h2>
          <textarea key={step} defaultValue={ans[step]||""} onBlur={(e) => setAns({...ans, [step]:e.target.value})} className="w-full h-64 md:h-80 p-10 rounded-[48px] bg-white border-4 border-[#8C7A66]/30 focus:border-[#768C76] focus:outline-none font-serif text-2xl md:text-3xl font-black text-[#2D2D2B] shadow-inner text-left" placeholder="在此写下回响..." />
          <div className="flex gap-6 justify-center text-center">
            <Button variant="ghost" onClick={() => step > 0 && setStep(step-1)} disabled={step===0} className="flex-1 text-xl py-6 font-black text-center">上一步</Button>
            <Button onClick={() => step < 4 ? setStep(step+1) : setDone(true)} className="flex-[2] text-xl py-7 shadow-2xl font-black text-center">{step===4 ? "完成探索":"继续前行"}</Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

// 4.6 静默时光
const SilenceTimerPage = () => {
  const [duration, setDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isActive, setIsActive] = useState(false);
  const playSoftBell = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(528, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 3);
      oscillator.connect(gainNode); gainNode.connect(audioCtx.destination);
      oscillator.start(); oscillator.stop(audioCtx.currentTime + 3);
    } catch (e) { console.log("Audio not supported"); }
  };
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) { interval = setInterval(() => { setTimeLeft((prev) => prev - 1); }, 1000); }
    else if (timeLeft === 0 && isActive) { setIsActive(false); playSoftBell(); }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);
  const handleReset = () => { setIsActive(false); setTimeLeft(duration * 60); };
  const handleDurationChange = (e) => { const val = parseInt(e.target.value); setDuration(val); if (!isActive) setTimeLeft(val * 60); };
  const formatTime = (seconds) => { const mins = Math.floor(seconds / 60); const secs = seconds % 60; return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`; };
  return (
    <PageTransition>
      <div className="pt-28 md:pt-40 pb-40 max-w-xl mx-auto min-h-screen flex flex-col items-center px-6 text-center">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black tracking-[0.2em] text-[#2D2D2B] mb-5 uppercase text-center text-center">静默时光</h2>
          <p className="text-[#4A4A48] font-serif text-base md:text-xl font-black text-center text-center">「在静默中，与自己相遇。」</p>
        </header>
        <div className="w-full card-base bg-white/70 p-10 md:p-14 rounded-[48px] flex flex-col items-center shadow-xl border-4 border-[#D2C4B5]/40 mb-8 relative overflow-hidden text-center text-center">
           {isActive && <div className="absolute inset-0 bg-[#768C76]/5 animate-pulse pointer-events-none" />}
           <div className="text-6xl md:text-8xl font-serif font-black text-[#2D2D2B] mb-12 tracking-widest tabular-nums relative z-10 text-center">{formatTime(timeLeft)}</div>
           <div className="w-full space-y-8 relative z-10">
             <div className="flex justify-between items-center px-2">
               <span className="text-sm font-black text-[#8C7A66] uppercase">时长设置</span>
               <span className="text-lg font-black text-[#768C76]">{duration} 分钟</span>
             </div>
             <input type="range" min="1" max="30" value={duration} onChange={handleDurationChange} disabled={isActive} className="w-full accent-[#768C76] cursor-pointer" />
           </div>
           <div className="flex gap-6 mt-16 relative z-10 justify-center text-center">
              <button onClick={() => setIsActive(!isActive)} className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 border-4 ${isActive ? 'bg-white border-[#8C7A66] text-[#8C7A66]' : 'bg-[#768C76] border-[#768C76] text-white'}`}>
                {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
              </button>
              <button onClick={handleReset} className="w-20 h-20 rounded-full bg-white border-4 border-[#D2C4B5] flex items-center justify-center text-[#8C7A66] shadow-md transition-all active:scale-90">
                <RotateCcw size={32} strokeWidth={3} />
              </button>
           </div>
        </div>
        <div className="flex items-center gap-3 text-[#8C7A66] font-black uppercase text-xs tracking-widest mt-8 text-center text-center"><Bell size={14} className="animate-bounce text-center" /> 计时结束响起柔和禅铃</div>
      </div>
    </PageTransition>
  );
};

// 4.7 小院日志
const JournalPage = ({ journal, onDelete, onToggleStar, onNavigate, onMicroStart }) => {
  const exportJournal = () => {
    const text = journal.map(e => `【${e.date} | ${e.source}】\n问：${e.question}\n答：${e.content}\n${e.isStarred ? '[陪伴中]' : ''}\n--------------------`).join('\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url; link.download = `小院日志_${new Date().toLocaleDateString()}.txt`; link.click(); URL.revokeObjectURL(url);
  };
  return (
    <PageTransition>
      <div className="pt-28 md:pt-40 pb-40 max-w-4xl mx-auto min-h-screen px-4">
        <header className="text-center mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-black tracking-[0.2em] text-[#2D2D2B] mb-6 text-center text-center uppercase">小院日志</h2>
          <p className="text-[#4A4A48] font-serif text-base md:text-xl font-black text-center px-4 leading-relaxed text-center">「这些不是答案，而是你曾经认真听见自己的痕迹。」</p>
          {journal.length > 0 && <button onClick={exportJournal} className="mt-8 flex items-center gap-3 mx-auto text-[#768C76] font-black text-sm tracking-widest hover:underline uppercase p-3 bg-white rounded-2xl shadow-sm border-2 border-[#768C76]/20 text-center"><Download size={18} strokeWidth={3} /> 导出文本</button>}
        </header>
        {journal.length === 0 ? (
          <div className="text-center py-24 bg-white/60 rounded-[48px] border-4 border-dashed border-[#8C7A66]/40 px-10 shadow-lg text-center text-center">
            <div className="text-[#8C7A66] mb-10 flex justify-center text-center"><PenTool size={64} strokeWidth={1.5} /></div>
            <p className="text-[#4A4A48] mb-12 text-xl font-black leading-relaxed text-center">这里还很安静。从一个问题开始？</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-center">
              <Button onClick={() => onNavigate('daily')} variant="secondary" className="py-5 px-10">抽取问题</Button>
              <Button onClick={onMicroStart} className="py-5 px-10">微型体验</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {journal.map((entry) => (
              <div key={entry.id} className={`card-base p-8 md:p-12 rounded-[40px] md:rounded-[56px] bg-white relative flex flex-col border-4 ${entry.isStarred ? 'border-[#768C76] ring-8 ring-[#768C76]/10' : 'border-transparent'} shadow-md text-left`}>
                <div className="flex justify-between items-start mb-8 text-left">
                  <div className="flex flex-col gap-2 text-left">
                    <span className="text-xs md:text-sm font-black text-[#768C76] uppercase tracking-[0.2em] bg-[#768C76]/10 px-4 py-1.5 rounded-full w-fit">{entry.source}</span>
                    <span className="text-xs md:text-sm font-black text-[#8C7A66] tracking-widest">{entry.date}</span>
                  </div>
                  <div className="flex gap-3 text-left"><button onClick={() => onToggleStar(entry.id)} className={`p-3 rounded-2xl transition-all border-2 ${entry.isStarred ? 'text-[#768C76] bg-[#768C76]/15 border-[#768C76]' : 'text-[#D2C4B5]'}`}><Heart size={24} fill={entry.isStarred ? 'currentColor' : 'none'} strokeWidth={3} /></button><button onClick={() => onDelete(entry.id)} className="p-3 rounded-2xl text-[#D2C4B5] hover:text-red-600 border-2 transition-all"><Trash2 size={24} strokeWidth={3} /></button></div>
                </div>
                <div className="space-y-8 text-left">
                  <div className="border-l-6 border-[#768C76]/30 pl-6 bg-[#F8F7F2] p-6 rounded-r-3xl text-left"><p className="text-sm md:text-base text-[#8C8C88] font-black mb-3 text-left">所见的问题：</p><p className="text-lg md:text-2xl text-[#2D2D2B] leading-relaxed font-black text-left">“{entry.question}”</p></div>
                  <div className="bg-white p-8 md:p-12 rounded-[32px] md:rounded-[40px] shadow-inner border-2 border-[#D2C4B5]/20 text-left"><p className="text-sm md:text-base text-[#8C8C88] font-black mb-4 text-left">内在回响：</p><p className="text-xl md:text-3xl text-[#2D2D2B] font-serif leading-loose whitespace-pre-wrap font-black text-left">{entry.content}</p></div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-24 pt-16 border-t-2 border-[#D2C4B5]/40 text-center">
           <p className="text-sm md:text-base text-[#8C7A66] font-black italic text-center">你的日志默认保存在本地。请守护它。</p>
           {journal.length > 0 && <button onClick={() => { if(window.confirm('确认清空？')) { onDelete('ALL'); } }} className="text-xs text-red-700 font-black mt-12 block mx-auto uppercase opacity-70 text-center">Clear History</button>}
        </div>
      </div>
    </PageTransition>
  );
};

// 4.8 引导者之路
const FacilitatorPage = ({ navigate }) => {
  const [lvl, setLvl] = useState(1);
  const current = CONFIG.facilitatorLevels.find(l => l.id === lvl);
  const FacIcon = current.icon;
  return (
    <PageTransition>
      <div className="pt-28 md:pt-40 pb-40 max-w-5xl mx-auto min-h-screen px-4 text-center">
        <header className="text-center mb-16 text-center text-center"><h2 className="text-3xl md:text-5xl font-black tracking-[0.3em] mb-8 text-[#2D2D2B] text-center uppercase">引导者之路</h2></header>
        <div className="flex justify-center mb-12 gap-4 flex-wrap text-center text-center">{CONFIG.facilitatorLevels.map(l => (<button key={l.id} onClick={() => setLvl(l.id)} className={`px-8 md:px-10 py-4 rounded-full text-sm md:text-lg font-black transition-all border-4 ${lvl === l.id ? 'bg-[#2D2D2B] text-white' : 'bg-white border-[#D2C4B5]/40'}`}>阶段 {l.id}</button>))}</div>
        <div className="bg-white p-10 md:p-16 rounded-[48px] shadow-2xl border-4 border-[#8C7A66]/10 text-left text-center md:text-left"><div className="flex items-center gap-6 mb-10 justify-center md:justify-start"><div className="p-4 bg-[#768C76]/15 rounded-3xl"><FacIcon size={40} className="text-[#768C76]" strokeWidth={3} /></div><h3 className="text-3xl md:text-5xl font-black text-[#2D2D2B] uppercase text-center md:text-left">{current.title}</h3></div><p className="text-lg md:text-2xl text-[#4A4A48] font-black leading-loose text-left mb-12 border-b-4 pb-12 text-left">{current.desc}</p></div>
      </div>
    </PageTransition>
  );
};

// 4.9 十一条基石
const StonesPage = ({ navigate }) => {
  const [exp, setExp] = useState(null);
  return (
    <PageTransition>
      <div className="pt-28 md:pt-40 pb-40 max-w-7xl mx-auto min-h-screen px-4 text-center">
        <header className="mb-20 text-center text-center text-center text-center"><div className="flex justify-center mb-10 text-[#768C76] text-center text-center text-center"><ShieldCheck size={72} strokeWidth={2.5} /></div><h2 className="text-4xl md:text-6xl font-black mb-8 text-[#2D2D2B] text-center tracking-widest uppercase">十一条基石原则</h2></header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-24 text-center">
          {CONFIG.touchstones.map(s=>(
            <div key={s.id} onClick={()=>setExp(exp===s.id?null:s.id)} className="stone-card card-base p-10 rounded-[48px] cursor-pointer flex flex-col text-left border-4 shadow-lg text-left text-left text-left">
              <span className="text-4xl md:text-6xl font-serif text-[#8C7A66]/60 mb-6 font-black text-left text-left">0{s.id}</span>
              <h3 className="text-2xl md:text-4xl font-black mb-6 text-[#2D2D2B] text-left text-left leading-tight text-left">{s.cn}</h3>
              <div className="border-l-8 border-[#768C76] pl-6 mb-8 text-left text-left"><p className="text-base md:text-xl font-black text-left text-left leading-relaxed text-left">「{s.summary}」</p></div>
              {exp===s.id && (<div className="mt-8 pt-10 border-t-4 border-[#D2C4B5]/40 animate-in fade-in slide-in-from-top-4 duration-700 text-left text-left"><p className="text-xl md:text-3xl font-black text-[#2D2D2B] mb-8 text-left text-left">{s.detailCn}</p><p className="text-base md:text-xl font-serif italic text-[#5C5C58] mb-10 font-black bg-white/60 p-8 rounded-3xl text-left text-left">{s.detailEn}</p></div>)}
              <div className="mt-auto flex justify-center pt-8 text-center">{exp===s.id?<ChevronUp size={40}/>:<ChevronDown size={40}/>}</div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

// 4.10 安全与边界
const SafetyPage = ({ navigate }) => (
  <PageTransition>
    <div className="pt-28 md:pt-40 pb-40 max-w-5xl mx-auto min-h-screen px-4 text-center">
      <header className="text-center mb-20 text-center text-center"><h2 className="text-3xl md:text-5xl font-black tracking-[0.2em] mb-8 text-[#2D2D2B] text-center uppercase">守护安全</h2></header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-24 text-center">
        {[{id:1,t:"你不需要分享",i:MicOff,d:"所有表达都是邀请。"},{id:2,t:"没有人会分析你",i:SearchX,d:"这里不诊断生命。"},{id:3,t:"没有人会急着修复你",i:Shield,d:"放下改变他人的冲动。"},{id:4,t:"你的文字只属于你",i:PenTool,d:"日志存储在本地。"},{id:5,t:"非心理治疗",i:Stethoscope,d:"不替代专业医疗。"},{id:6,t:"共同守护",i:Users,d:"保密、尊重、不建议。" }].map(p=>{
          const SafeIcon = p.i;
          return (
            <div key={p.id} className="card-base p-10 rounded-[48px] bg-white border-4 border-[#D2C4B5]/40 text-center shadow-md flex flex-col items-center">
              <div className="mb-8 text-[#768C76] flex justify-center text-center"><SafeIcon size={48} strokeWidth={2.5} /></div>
              <h3 className="text-2xl font-black mb-5 tracking-widest text-[#2D2D2B] text-center uppercase text-center">{p.t}</h3>
              <p className="text-base md:text-lg font-black text-[#4A4A48] text-center leading-relaxed font-serif text-center">{p.d}</p>
            </div>
          );
        })}
      </div>
      <Button variant="ghost" onClick={()=>navigate('hub')} className="mx-auto text-xl py-6 px-16 font-black border-4 border-[#D2C4B5]/40 text-center">返回入口</Button>
    </div>
  </PageTransition>
);

// 4.11 关于页面
const AboutPage = ({ navigate }) => (
  <PageTransition>
    <div className="pt-28 md:pt-40 pb-40 px-6 max-w-4xl mx-auto min-h-screen text-center">
      <h2 className="text-3xl md:text-5xl font-black tracking-[0.2em] mb-12 text-[#2D2D2B] text-center uppercase">关于信任圈小院</h2>
      <div className="space-y-12 text-[#4A4A48] font-serif text-lg md:text-2xl font-black text-center text-center text-center">
        <p className="text-center max-w-2xl mx-auto leading-loose text-center">「信任圈小院」灵感来自帕克·帕尔默关于 Circle of Trust 的实践。</p>
        <div className="bg-white p-12 md:p-20 rounded-[56px] border-4 border-[#768C76]/20 shadow-2xl text-center text-center">
          <p className="text-[#2D2D2B] text-xl md:text-3xl mb-12 tracking-widest font-black text-center text-center uppercase">日常微小体验：</p>
          <div className="space-y-8 text-[#768C76] font-black text-center text-center text-center">
            <p className="tracking-[0.4em] text-2xl md:text-4xl text-center underline decoration-wavy underline-offset-8">慢下来 · 听见自己</p>
            <p className="tracking-[0.4em] text-2xl md:text-4xl text-center underline decoration-wavy underline-offset-8">学习不急着改变别人</p>
            <p className="tracking-[0.4em] text-2xl md:text-4xl text-center underline decoration-wavy underline-offset-8">在安静中 · 让真实慢慢浮现</p>
          </div>
        </div>
      </div>
      <div className="mt-20 text-center text-center"><Button onClick={()=>navigate('hub')} className="mx-auto w-full md:w-auto text-2xl px-20 py-8 shadow-2xl border-4 text-center">开始探索</Button></div>
    </div>
  </PageTransition>
);

// 4.12 微型体验 MicroCircle (核心流程)
const MicroCirclePage = ({ microStep, setMicroStep, userInput, setUserInput, isAnonymized, setIsAnonymized, saveJournalEntry, navigate }) => {
  const [phase, setPhase] = useState("吸气");
  const [count, setCount] = useState(0);
  const randomQ = useMemo(() => CONFIG.questionLibrary[Math.floor(Math.random() * CONFIG.questionLibrary.length)], []);
  const randomSnippet = useMemo(() => CONFIG.witnessPool[Math.floor(Math.random() * CONFIG.witnessPool.length)], []);
  useEffect(() => { if (microStep === 1) { const interval = setInterval(() => setPhase(p => p === "吸气" ? "呼气" : "吸气"), 3000); return () => clearInterval(interval); } }, [microStep]);
  useEffect(() => { if (microStep === 1 && count < 6) { const timer = setTimeout(() => setCount(c => c + 1), 3000); return () => clearTimeout(timer); } }, [count, microStep]);
  
  if (microStep === 1) return (<PageTransition><div className="min-h-[85vh] flex flex-col items-center justify-center pt-32 pb-32 text-center bg-[#F8F7F2] px-6 text-center text-center text-center"><div className="max-w-md space-y-12 text-center"><div className="space-y-6 text-center"><h2 className="text-3xl md:text-5xl font-black tracking-[0.1em] text-[#2D2D2B] text-center">先不要继续。</h2><p className="text-[#4A4A48] font-serif text-xl md:text-3xl font-black text-center leading-loose text-center">把注意力带回呼吸。</p></div><div className="relative w-56 h-56 md:w-72 md:h-72 mx-auto flex items-center justify-center text-center"><div className="absolute inset-0 rounded-full border-6 border-[#768C76]/30 breathe-ring text-center text-center"></div><div className="w-36 h-36 md:w-48 md:h-48 rounded-full border-4 border-[#768C76] flex items-center justify-center text-center text-center shadow-md text-center"><span className="text-[#768C76] text-2xl md:text-4xl font-black tracking-widest breathe-text text-center text-center">{phase}</span></div></div><div className="h-20 flex items-center justify-center text-center text-center text-center">{count >= 6 ? <Button onClick={() => setMicroStep(2)} className="text-2xl px-16 py-6 shadow-xl text-center">我准备好了</Button> : <p className="text-lg text-[#8C8C88] tracking-[0.3em] font-black animate-pulse text-center uppercase text-center">安顿中... {Math.floor(count/2)}/3</p>}</div></div></div></PageTransition>);
  if (microStep === 2) return (<PageTransition><div className="min-h-[85vh] flex flex-col items-center justify-center pt-24 pb-32 text-center bg-[#F8F7F2] px-6 text-center text-center text-center text-center text-center"><header className="mb-14 text-center"><span className="text-base md:text-lg uppercase tracking-[0.4em] text-[#8C7A66] block mb-8 font-black text-center text-center text-center">今日问题</span><h2 className="text-3xl md:text-6xl font-serif font-black italic text-[#2D2D2B] leading-relaxed shadow-sm py-8 bg-white/50 rounded-[48px] border-2 border-[#D2C4B5]/40 text-center">“{randomQ.text}”</h2></header><p className="text-xl md:text-3xl text-[#4A4A48] mb-16 font-black text-center text-center text-center">让问题在心里停一会儿。</p><Button onClick={() => setMicroStep(3)} className="mx-auto text-2xl py-6 px-16 shadow-lg text-center text-center">带着这个问题继续</Button></div></PageTransition>);
  if (microStep === 3) return (<PageTransition><div className="min-h-[85vh] flex flex-col items-center justify-center pt-24 pb-32 bg-[#F8F7F2] px-4 md:px-6 text-center text-center text-center text-center text-center text-center text-center text-center"><header className="mb-10 text-center text-center text-center text-center text-center text-center text-center text-center text-center"><h2 className="text-3xl md:text-4xl font-black tracking-[0.1em] text-[#2D2D2B] mb-5 text-center text-center text-center text-center text-center text-center text-center">写下一句话</h2><p className="text-lg md:text-2xl text-[#4A4A48] font-black opacity-80 text-center leading-relaxed text-center text-center">它可以只属于你。</p></header><textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} className="w-full h-64 md:h-80 p-10 md:p-14 rounded-[48px] bg-white border-4 border-[#8C7A66]/30 focus:border-[#768C76] focus:outline-none font-serif text-2xl md:text-4xl font-black text-[#2D2D2B] shadow-inner mb-12 text-left" placeholder="此刻，我想说……" /><div className="flex items-center gap-4 px-6 justify-center mb-12 scale-110 text-center text-center"><input type="checkbox" id="anon" checked={isAnonymized} onChange={(e) => setIsAnonymized(e.target.checked)} className="w-8 h-8 rounded-full accent-[#768C76]" /><label htmlFor="anon" className="text-base md:text-xl text-[#4A4A48] font-black text-center">我愿意匿名分享陪伴他人</label></div><Button onClick={() => { saveJournalEntry('微型信任圈', randomQ.text, userInput); setMicroStep(4); }} disabled={!userInput.trim()} className="w-full text-2xl py-8 shadow-2xl text-center">安静放下</Button></div></PageTransition>);
  if (microStep === 4) return (<PageTransition><div className="min-h-[85vh] flex flex-col items-center justify-center pt-24 pb-32 text-center bg-[#F8F7F2] px-6 text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center"><h2 className="text-2xl md:text-4xl font-black tracking-[0.1em] text-[#2D2D2B] text-center text-center text-center text-center text-center">{isAnonymized ? "你的这句话，已经轻轻放入小院。" : "这句话已被你自己听见。"}</h2><div className="bg-white p-12 md:p-20 rounded-[56px] border-4 border-[#768C76]/30 shadow-2xl relative overflow-hidden my-16 max-w-3xl text-center text-center text-center text-center"><Quote className="absolute top-10 left-12 text-[#768C76]/15 text-center" size={80} strokeWidth={3} /><p className="text-2xl md:text-5xl font-serif italic text-[#2D2D2B] leading-relaxed text-center font-black text-center text-center text-center text-center">{isAnonymized ? randomSnippet : "（在此刻的静默中，深深地呼吸）"}</p></div><Button onClick={() => setMicroStep(5)} className="mx-auto text-2xl py-7 px-16 shadow-lg text-center text-center text-center text-center">继续收束</Button></div></PageTransition>);
  return (<PageTransition><div className="min-h-[85vh] flex flex-col items-center justify-center pt-24 pb-32 text-center bg-[#F8F7F2] px-6 text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center"><div className="space-y-8 text-center text-center text-center text-center"><CheckCircle2 className="mx-auto text-[#768C76] text-center" size={80} strokeWidth={3} /><h2 className="text-3xl md:text-5xl font-black tracking-[0.1em] text-[#2D2D2B] uppercase text-center text-center text-center">谢谢你愿意停在这里</h2><p className="text-xl md:text-3xl text-[#4A4A48] font-serif font-black max-w-xl mx-auto text-center leading-relaxed text-center">愿你把此刻的一点真实，轻轻带回今天的生活。</p></div><div className="flex flex-col gap-6 mt-20 text-center text-center text-center text-center"><Button onClick={() => navigate('hub')} className="mx-auto w-full md:w-auto text-2xl px-20 py-7 shadow-xl text-center">回到入口</Button></div></div></PageTransition>);
};

// --- 5. 主应用逻辑 App ---

export default function App() {
  const [path, setPath] = useState('arrival');
  const [journal, setJournal] = useState([]);
  const [microStep, setMicroStep] = useState(1);
  const [userInput, setUserInput] = useState("");
  const [isAnonymized, setIsAnonymized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('cot_journal_v15');
    if (saved) setJournal(JSON.parse(saved));
  }, []);

  const saveEntry = (source, question, content) => {
    if (!content.trim()) return;
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
      source, question, content, isStarred: false
    };
    const updated = [newEntry, ...journal];
    setJournal(updated);
    localStorage.setItem('cot_journal_v15', JSON.stringify(updated));
  };

  const deleteEntry = (id) => {
    if (id === 'ALL') { setJournal([]); localStorage.setItem('cot_journal_v15', JSON.stringify([])); return; }
    const updated = journal.filter(e => e.id !== id);
    setJournal(updated);
    localStorage.setItem('cot_journal_v15', JSON.stringify(updated));
  };

  const toggleStar = (id) => {
    const updated = journal.map(e => e.id === id ? { ...e, isStarred: !e.isStarred } : e);
    setJournal(updated);
    localStorage.setItem('cot_journal_v15', JSON.stringify(updated));
  };

  const navigate = (p) => { setPath(p); window.scrollTo(0, 0); };
  const startMicro = () => { setMicroStep(1); setUserInput(""); setIsAnonymized(false); setPath('micro'); };

  const renderContent = () => {
    switch (path) {
      case 'arrival': return <ArrivalPage navigate={navigate} onMicroStart={startMicro} />;
      case 'hub': return <HubPage navigate={navigate} onMicroStart={startMicro} />;
      case 'learn': return <LearnPage navigate={navigate} />;
      case 'facilitator': return <FacilitatorPage navigate={navigate} />;
      case 'stones': return <StonesPage navigate={navigate} />;
      case 'safety': return <SafetyPage navigate={navigate} />;
      case 'about': return <AboutPage navigate={navigate} />;
      case 'daily': return <DailyQuestionPage navigate={navigate} onSave={saveEntry} />;
      case 'path': return <QuestionPathPage onSave={saveEntry} navigate={navigate} />;
      case 'micro': return <MicroCirclePage microStep={microStep} setMicroStep={setMicroStep} userInput={userInput} setUserInput={setUserInput} isAnonymized={isAnonymized} setIsAnonymized={setIsAnonymized} saveJournalEntry={saveEntry} navigate={navigate} />;
      case 'journal': return <JournalPage journal={journal} onDelete={deleteEntry} onToggleStar={toggleStar} onNavigate={navigate} onMicroStart={startMicro} />;
      case 'timer': return <SilenceTimerPage />;
      default: return <ArrivalPage navigate={navigate} onMicroStart={startMicro} />;
    }
  };

  return (
    <div className="font-sans text-[#2D2D2B] bg-[#F8F7F2] min-h-screen selection:bg-[#768C76]/40 flex flex-col overflow-x-hidden pb-32">
      <GlobalStyles />
      <Navbar onNavigate={navigate} currentPath={path} />
      <main className="flex-1 w-full text-center">{renderContent()}</main>
      <BottomNav onNavigate={navigate} currentPath={path} />
    </div>
  );
}