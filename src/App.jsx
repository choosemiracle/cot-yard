import React, { useState, useEffect, useMemo } from 'react';
import { 
  Wind, 
  Map, 
  BookOpen, 
  Heart, 
  ShieldCheck, 
  Compass, 
  MessageCircle, 
  PenTool, 
  Home,
  ChevronRight,
  ArrowLeft,
  Loader2,
  Leaf,
  Coffee,
  Sparkles,
  Waves,
  Armchair,
  CheckCircle2,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Shield,
  AlertCircle,
  EyeOff,
  Users,
  Quote,
  MicOff,
  SearchX,
  Stethoscope,
  RefreshCw,
  Mountain,
  Flame,
  UserCheck,
  Target,
  Flag
} from 'lucide-react';

// --- 1. 核心配置文件 ---

const CONFIG = {
  touchstones: [
    {
      id: 1, en: "Extend and receive welcome.", cn: "给予欢迎，也接受欢迎。", summary: "在这里，我们以好客之心彼此相待。", reflection: "我是否允许自己也成为被欢迎的人？",
      detailCn: "表达和接受欢迎。人们在受欢迎的环境中学习效果最好。在这个圈子里，我们通过给予和接受善意来支持彼此的学习。",
      detailEn: "Extend and receive welcome. People learn best in hospitable spaces. In this circle, we support each other's learning by giving and receiving hospitality."
    },
    {
      id: 2, en: "Be present as fully as possible.", cn: "尽可能全然在场。", summary: "带着你的完整状态来到这里，包括疑虑、疲惫、喜悦与不确定。", reflection: "此刻，我是否允许完整的自己出现？",
      detailCn: "以最大可能的整全的状态于当下。在此处，带着你的疑惑、恐惧和弱点，同时带着你的信念、快乐和成功，在此处，带着你的倾听去表达。",
      detailEn: "Be present as fully as possible. Be here with your doubts, fears, and failings as well as your convictions, joys, and successes, your listening as well as your speaking."
    },
    {
      id: 3, en: "What is offered in the circle is by invitation, not demand.", cn: "所有分享，源于邀请，而非要求。", summary: "你的灵魂知道自己的节奏。", reflection: "我是否能尊重自己不说话的权利？",
      detailCn: "邀请，而不是要求。这不是一个“必须分享，否则后悔”的活动！在这次活动期间，做任何你灵魂所呼唤的事情。你的灵魂比我们更了解你的需求。",
      detailEn: "What is offered in the circle is by invitation, not demand. This is not a \"share or die\" event! During this retreat, do whatever your soul calls for, and know that you do it with our support. Your soul knows your needs better than we do."
    },
    {
      id: 4, en: "Speak your truth in ways that respect other people's truth.", cn: "说出自己的真实，也尊重他人的真实。", summary: "真实不是用来压倒别人，而是放在圆心中被温柔见证。", reflection: "我能否说‘我’的经验，而不是解释‘你’的问题？",
      detailCn: "表达自己的时候，需要尊重别人表达的事实。在一个信任圆圈里说出一个人的观点并不意味着解释、纠正或者辩论别人表达的东西。从你的中心出发，来到圈子的中心去说话，使用“我”的陈述。",
      detailEn: "Speak your truth in ways that respect other people's truth. Our views of reality may differ, but speaking one's truth in a circle of trust does not mean interpreting, correcting, or debating what others say."
    },
    {
      id: 5, en: "No fixing, saving, advising, or correcting.", cn: "不修复，不拯救，不建议，不纠正。", summary: "真正的陪伴，不急着把别人带离他的处境。", reflection: "我在听别人说话时，最容易急着做什么？",
      detailCn: "不修复，不拯救，不建议，也不纠正对方。对于我们这些从事“帮助人”的人来说，这是最难的准则之一。但如果我们希望创造一个欢迎灵魂的空间，这是最重要的规则之一。",
      detailEn: "No fixing, no saving, no advising, and no setting each other straight. This is one of the hardest guidelines for those of us in the \"helping professions.\""
    },
    {
      id: 6, en: "Learn to respond with honest, open questions.", cn: "学习用诚实、开放的问题回应。", summary: "好问题不是引导别人到我的答案，而是帮助他听见自己的答案。", reflection: "我能提出一个没有隐藏建议的问题吗？",
      detailCn: "用诚实、开放的问题来回应别人，而不是建议或纠正。通过这样的问题，我们可以帮助“倾听彼此，进入更深的交流。”",
      detailEn: "Learn to respond to others with honest, open questions instead of counsel or corrections. With such questions, we help \"hear each other into deeper speech.\""
    },
    {
      id: 7, en: "When the going gets rough, turn to wonder.", cn: "当关系变得困难，转向好奇。", summary: "困惑时，不急着判断，先问：这里发生了什么？", reflection: "我最近一次把判断转为好奇，是在什么时候？",
      detailCn: "当进行不顺利时，转念为好奇。如果你感到评判或防御，问问自己，“我想知道，是什么让她这么认为的?”。抛开评判，更深入地倾听别人和自己。",
      detailEn: "When the going gets rough, turn to wonder. If you feel judgmental or defensive, ask yourself, \"I wonder, what might have brought her to this belief?\""
    },
    {
      id: 8, en: "Attend to your own inner teacher.", cn: "聆听你内在的老师。", summary: "最深的指引，不总在外面，也在你里面。", reflection: "我内在的老师，最近在提醒我什么？",
      detailCn: "关注你内心的老师。我们当然会向别人学习。但当我们在信任圆圈里探索时，我们就有了一个从内心学习的特殊机会。关注你最重要的老师。",
      detailEn: "Attend to your own inner teacher. We learn from others, of course. But we have a special opportunity to learn from within."
    },
    {
      id: 9, en: "Trust and learn from the silence.", cn: "信任沉默，并向沉默学习。", summary: "沉默不是空白，而是真实慢慢浮现的地方。", reflection: "我能否不急着填满沉默？",
      detailCn: "相信并从静默中学习。静默是我们这个嘈杂世界的礼物。把静默当作小组的一员。在某人说完话之后，花点时间反思。",
      detailEn: "Trust and learn from the silence. Silence is a gift in our noisy world and a way of knowing in itself. Treat silence as a member of the group."
    },
    {
      id: 10, en: "Commit to and maintain confidentiality.", cn: "承诺并守护保密。", summary: "安全感来自彼此对边界的共同守护。", reflection: "我是否值得别人把真实托付给我？",
      detailCn: "严格保密。信任来自于知道团队成员尊重信任，认真对待隐私和谨慎的道德规范。",
      detailEn: "Observe deep confidentiality. Trust comes from knowing that group members honor confidences and take seriously the ethics of privacy and discretion."
    },
    {
      id: 11, en: "Believe seeds will grow.", cn: "相信你会带着自己真正需要的东西离开。", summary: "你未必得到答案，但可能带走更深的清明。", reflection: "如果今天只带走一样东西，我希望是什么？",
      detailCn: "相信种子会成长。从一开始就知道，你可能会在这个圈子结束的时候，拿到了你需要的东西。这里种下的种子可以在未来继续生长。",
      detailEn: "Know that it's possible to leave the circle with whatever it was that you needed when you arrived. Know that the seeds planted here can keep growing."
    }
  ],
  questionLibrary: [
    { category: "自我觉察", text: "你生命里有哪些东西是不需要向任何人证明的？" },
    { category: "自我觉察", text: "如果你不再扮演“有用”的人，你会是谁？" },
    { category: "情绪", text: "如果你的疲惫可以说话，它会说什么？" },
    { category: "关系", text: "你最希望别人不要急着修复你，而只是怎样陪着你？" },
    { category: "分裂与整全", text: "你是否正在过一种外在成功、内在分裂的生活？" },
    { category: "沉默与聆听", text: "当别人说话时，你内心最常急着做什么？" }
  ],
  paths: [
    {
      id: 'back-to-self', title: '回到自己', icon: Compass, desc: '当你感到分散、疲惫、失去中心。',
      questions: ["我现在真正的状态是什么？", "我最近最常扮演的角色是什么？", "哪一部分自己被我留在了门外？", "如果我不再证明自己，会发生什么？", "我今天可以如何更诚实地生活一点？"]
    },
    {
      id: 'through-fear', title: '穿过恐惧', icon: Mountain, desc: '当你被担心、羞耻或不确定困住。',
      questions: ["我最害怕被别人看见什么？", "这个恐惧想保护我什么？", "我是否把一次失败误认为自己的全部？", "如果恐惧可以说话，它会说什么？", "我可以怎样温柔地陪着这个恐惧？"]
    },
    {
       id: 'listening', title: '学习聆听', icon: MessageCircle, desc: '当你想成为更好的陪伴者或引导者。',
       questions: ["我听别人说话时，内心最常急着做什么？", "我是否急着修复、建议或解释？", "我能否允许对方保有自己的节奏？", "什么样的问题能帮助对方听见自己？", "我如何带着自己的倾听去表达？"]
    }
  ],
  facilitatorLevels: [
    {
      id: 1, title: "第一阶段：理解精神", icon: BookOpen,
      desc: "深入理解信任圈的精神内核、边界原则与帕尔默的思想精髓。",
      learnItems: ["理解什么是分裂的人生", "发现隐秘的完整", "学会聆听内在导师", "理解第三事物的隐喻力量", "践行不修复、不建议原则"],
      assessment: ["我能清晰解释为什么“不给建议”反而是一种更深的善意吗？", "我理解了为什么灵魂像害羞的野兽吗？"],
      practice: "本周尝试在一次对话中，彻底忍住给他人建议的冲动。",
      pitfall: "试图把信任圈变成一种可以用技巧操控的工具，而忽略了它首先是一种生命状态。"
    },
    {
      id: 2, title: "第二阶段：练习基本能力", icon: Flame,
      desc: "从调整自己的倾听习惯开始，培养作为一个守护者所需的容量。",
      learnItems: ["练习全然在场：放下评判", "深度聆听：听见字里行间的余音", "静默承载：不急于填满空白", "诚实提问：不带预设答案的提问", "去中心化：不把自己当成关键"],
      assessment: ["在沉默发生时，我会感到尴尬并急着想说点什么吗？", "我提出的问题是真正的好奇，还是披着提问外衣的建议？"],
      practice: "在朋友说话停顿后，多留出五秒钟的静默，看看会发生什么。",
      pitfall: "过度关注自己的提问技巧是否高级，从而失去了与对方真实的连接。"
    },
    {
      id: 3, title: "第三阶段：学习守护空间", icon: ShieldCheck,
      desc: "学习如何设计并维护一个能让参与者感到安全且有尊严的“容器”。",
      learnItems: ["设计开场与欢迎仪式", "朗读基石：确立共同契约", "处理沉默：让静默成为力量", "面对眼泪：见证而不打断", "重申规则：温和地纠正越界行为", "结束与收束：将体验带回现实"],
      assessment: ["当场域里有人哭泣时，我能克制住递纸巾或安慰的冲动吗？", "我能有底气地打断一个正在“给建议”的发言者吗？"],
      practice: "模拟一次五分钟的信任圈开场，尝试用最少的语言建立最大的安全感。",
      pitfall: "为了维持表面和谐而纵容越界行为，导致空间的安全感瓦解。"
    },
    {
      id: 4, title: "第四阶段：进入真实带领", icon: Target,
      desc: "从小型练习开始，逐步进入真实、复杂的社群场域进行实践。",
      learnItems: ["设计一次 90 分钟沙龙流程", "设计半日深度工作坊", "双引导协作：背靠背的信任", "自我照看：防止过度卷入", "伦理边界：建立转介专业心理咨询的意识"],
      assessment: ["我是否建立了个人支持系统（同行圈或督导）？", "我能接纳一场“看起来并不热闹”的圆圈吗？"],
      practice: "寻找一位伙伴，共同设计并主持一次小型的诗歌回响会。",
      pitfall: "产生“救世主”心态，认为圆圈的质量取决于自己的个人魅力。"
    }
  ],
  witnessPool: [
    "“我也常常不知道，自己到底在怕什么。”",
    "“我发现，我最想被听见的，不是答案，而是沉默中的陪伴。”",
    "“原来不说，也可以是一种诚实。”",
    "“我正在学习不急着解释自己。”"
  ]
};

// --- 2. 基础 UI 组件 ---

const PageTransition = ({ children }) => (
  <div className="animate-in fade-in slide-in-from-bottom-2 duration-1000 ease-in-out w-full">
    {children}
  </div>
);

const Button = ({ onClick, children, variant = 'primary', className = '', disabled = false }) => {
  const baseStyles = "px-8 py-3 rounded-full transition-all duration-700 ease-out transform active:scale-95 flex items-center justify-center gap-2 tracking-widest text-sm whitespace-nowrap";
  const variants = {
    primary: `bg-[#4A4A48] text-white hover:bg-black shadow-sm disabled:opacity-30`,
    secondary: `bg-white/40 text-[#4A4A48] border border-[#D2C4B5]/40 hover:bg-white hover:border-[#D2C4B5] backdrop-blur-sm`,
    ghost: `text-[#8C8C88] hover:text-[#4A4A48] bg-transparent`,
    accent: `bg-[#768C76] text-white hover:opacity-90`
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Navbar = ({ onNavigate, currentPath }) => {
  if (currentPath === 'arrival') return null;
  return (
    <nav className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-[#F8F7F2]/60 backdrop-blur-md">
      <div className="text-[#4A4A48] font-serif italic cursor-pointer text-lg tracking-widest flex items-center gap-2" onClick={() => onNavigate('hub')}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#768C76]"></span>信任圈小院
      </div>
      <Button variant="ghost" onClick={() => onNavigate('hub')} className="p-2"><Home size={18} strokeWidth={1.5} /></Button>
    </nav>
  );
};

const GlobalStyles = () => (
  <style>{`
    @keyframes slowFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes breathe { 0% { transform: scale(1); opacity: 0.2; } 50% { transform: scale(1.5); opacity: 0.05; } 100% { transform: scale(1); opacity: 0.2; } }
    @keyframes circleBreathe { 0% { transform: scale(1); border-width: 1px; } 50% { transform: scale(1.2); border-width: 4px; } 100% { transform: scale(1); border-width: 1px; } }
    .animate-slow-fade { animation: slowFadeIn 2s ease-out forwards; }
    .breathe-ring { animation: breathe 6s ease-in-out infinite; }
    .breathe-inner { animation: circleBreathe 6s ease-in-out infinite; }
    .card-base { transition: all 0.8s cubic-bezier(0.2, 1, 0.3, 1); border: 1px solid rgba(210, 196, 181, 0.1); }
    .card-base:hover { transform: translateY(-8px); box-shadow: 0 20px 40px -15px rgba(210, 196, 181, 0.3); border-color: rgba(210, 196, 181, 0.5); background: white; }
    .stone-card { background: #FDFCF8; background-image: radial-gradient(circle at 90% 10%, rgba(197, 179, 88, 0.08) 0%, transparent 40%); }
    .learn-chapter-title { position: relative; }
    .learn-chapter-title::after { content: ''; position: absolute; left: 0; bottom: -10px; width: 40px; height: 2px; background: #768C76; opacity: 0.3; }
  `}</style>
);

// --- 3. 页面模块组件 ---

const Arrival = ({ navigate, onMicroStart }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#F8F7F2] relative overflow-hidden select-none">
    <div className="absolute top-[-10%] right-[-5%] text-[#768C76] opacity-10 pointer-events-none"><Wind size={600} strokeWidth={0.2} /></div>
    <div className="text-center max-w-3xl z-10 space-y-12">
      <div className="animate-slow-fade opacity-0 text-center text-center text-center"><p className="text-[10px] tracking-[0.4em] uppercase text-[#D2C4B5] font-light">Circle of Trust · A clearing for the inner life</p></div>
      <div className="animate-slow-fade delay-1s text-center text-center text-center"><h1 className="text-3xl md:text-5xl font-light tracking-[0.3em] text-[#4A4A48] leading-tight text-center">「你不需要表现，<br className="md:hidden" />只需要在这里。」</h1></div>
      <div className="animate-slow-fade delay-2s max-w-md mx-auto text-center text-center text-center"><p className="text-[#8C8C88] text-sm md:text-base font-serif leading-loose tracking-wider text-center">这里是一处数字化的小院，邀请你慢一点，听见自己，也学习如何听见他人。</p></div>
      <div className="animate-slow-fade delay-3s pt-8 text-center text-center text-center flex flex-col md:flex-row gap-5 justify-center items-center"><Button onClick={() => navigate('hub')} className="min-w-[160px]">进入小院</Button><div className="flex gap-4 text-center"><Button variant="secondary" onClick={onMicroStart}>体验一次</Button><Button variant="ghost" onClick={() => navigate('about')}>我先看看</Button></div></div>
    </div>
    <div className="absolute bottom-12 text-center w-full animate-slow-fade delay-3s text-center text-center text-center"><p className="text-[11px] tracking-[0.2em] text-[#D1CEC1] font-light text-center">「向内，不是退缩；安静，不是沉默失语。」</p></div>
  </div>
);

const Hub = ({ navigate, onMicroStart }) => {
  const menuItems = [
    { id: 'micro', icon: Waves, title: '微型体验', desc: '用三到五分钟，停下来，听见此刻的自己。', btn: '开始体验' },
    { id: 'daily', icon: Sparkles, title: '每日一问', desc: '一个开放而诚实的问题，陪你走近真实。', btn: '抽取问题' },
    { id: 'path', icon: Map, title: '问题小径', desc: '按主题深入探索，步入内在的森林。', btn: '踏入小径' },
    { id: 'facilitator', icon: Flag, title: '引导者之路', desc: '如何成为信任圈空间的守护者与见证者。', btn: '进入学习' }
  ];
  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-8 max-w-6xl mx-auto min-h-screen">
        <div className="mb-16 text-center text-center text-center"><h2 className="text-3xl font-light tracking-[0.4em] text-[#4A4A48] mb-6 text-center">今天，你想如何进入？</h2><p className="text-[#8C8C88] font-serif text-sm tracking-widest leading-relaxed opacity-80 text-center">这里的一切，都是邀请，不是要求。</p></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 text-center">{menuItems.map((item) => (
          <div key={item.id} className="card-base group bg-white/40 p-10 md:p-12 rounded-[40px] flex flex-col items-center text-center relative overflow-hidden text-center text-center">
            <div className="mb-8 text-[#D2C4B5] group-hover:text-[#768C76] transition-colors duration-700 relative z-10"><item.icon size={40} strokeWidth={1.2} /></div>
            <h3 className="text-xl font-medium mb-4 text-[#4A4A48] tracking-[0.2em] relative z-10 text-center">{item.title}</h3>
            <p className="text-sm text-[#8C8C88] mb-10 font-serif h-12 max-w-xs relative z-10 opacity-90 text-center text-center text-center">{item.desc}</p>
            <Button onClick={() => item.id === 'micro' ? onMicroStart() : navigate(item.id)} variant="secondary" className="group-hover:bg-[#4A4A48] group-hover:text-white relative z-10 px-10 text-center">{item.btn}</Button>
          </div>
        ))}</div>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 pt-12 border-t border-[#D2C4B5]/20 text-[10px] tracking-[0.3em] uppercase text-[#D2C4B5] text-center">
          {['stones', 'safety', 'journal', 'about'].map(id => (<button key={id} onClick={() => navigate(id)} className="hover:text-[#768C76] transition-colors text-center text-center">{{stones:'十一条基石', safety:'安全与边界', journal:'小院日志', about:'关于小院'}[id]}</button>))}
        </div>
      </div>
    </PageTransition>
  );
};

const LearnPage = ({ navigate }) => (
  <PageTransition>
    <div className="pt-32 pb-24 px-8 max-w-4xl mx-auto min-h-screen">
      <header className="text-center mb-24"><h2 className="text-3xl md:text-4xl font-light tracking-[0.5em] mb-8 text-[#4A4A48] text-center">认识信任圈</h2><p className="text-lg md:text-xl font-serif italic text-[#4A4A48] leading-relaxed tracking-wider text-center text-center">“信任圈，是一群人围坐在一起，学习不急着改变彼此，而是安静地听见真实。”</p></header>
      <footer className="mt-40 text-center"><Button onClick={() => navigate('hub')} variant="secondary">回到小院入口</Button></footer>
    </div>
  </PageTransition>
);

const FacilitatorPathPage = ({ navigate }) => {
  const [activeLevel, setActiveLevel] = useState(1);
  const [showMap, setShowMap] = useState(false);
  const [completed, setCompleted] = useState([1]);

  const handleLevel = (id) => {
    setActiveLevel(id);
    if (!completed.includes(id)) setCompleted([...completed, id]);
  };

  const current = CONFIG.facilitatorLevels.find(l => l.id === activeLevel);

  if (showMap) return (
    <PageTransition>
      <div className="pt-32 pb-24 px-8 max-w-4xl mx-auto min-h-screen text-center text-center text-center">
        <h2 className="text-3xl font-light tracking-[0.4em] mb-4 text-center">我的引导者练习地图</h2>
        <p className="text-[#8C8C88] mb-12 font-serif italic text-center">“慢慢走，灵魂的成长不急于一时。”</p>
        <div className="bg-white/50 p-12 rounded-[60px] grid md:grid-cols-2 gap-8 mb-12 border border-[#D2C4B5]/20">
          {CONFIG.facilitatorLevels.map(l => (
            <div key={l.id} className={`flex items-center gap-4 ${completed.includes(l.id) ? 'opacity-100' : 'opacity-20'} text-left`}>
              <div className="w-10 h-10 rounded-full bg-[#768C76]/10 flex items-center justify-center shrink-0">
                {completed.includes(l.id) ? <CheckCircle2 size={20} className="text-[#768C76]" /> : <div className="w-2 h-2 rounded-full bg-[#D2C4B5]" />}
              </div>
              <p className="text-sm font-medium">{l.title}</p>
            </div>
          ))}
        </div>
        <Button onClick={() => setShowMap(false)} className="mx-auto">回到路径详情</Button>
      </div>
    </PageTransition>
  );

  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-8 max-w-5xl mx-auto min-h-screen">
        <header className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-light tracking-[0.5em] mb-8 text-[#4A4A48] text-center">引导者之路</h2><p className="text-[#8C8C88] font-serif leading-loose tracking-[0.1em] text-center italic text-center text-center">「信任圈引导者不是舞台中心，而是容器的守护者。<br/>真正的能力，不只是会带流程，而是能守住静默、边界与真实。」</p></header>
        <div className="flex justify-center mb-12 gap-2 flex-wrap text-center">{CONFIG.facilitatorLevels.map(l => (
          <button key={l.id} onClick={() => handleLevel(l.id)} className={`px-6 py-2 rounded-full text-xs tracking-widest transition-all border ${activeLevel === l.id ? 'bg-[#4A4A48] text-white border-[#4A4A48]' : 'bg-white/40 text-[#8C8C88] border-[#D2C4B5]/30'}`}>阶段 {l.id}</button>
        ))}</div>
        <div className="grid lg:grid-cols-3 gap-12 text-center md:text-left">
          <div className="lg:col-span-2 space-y-10"><div className="bg-white/60 p-10 rounded-[50px] shadow-sm"><div className="flex items-center gap-4 mb-6"><current.icon size={24} className="text-[#768C76]" /><div><h3 className="text-2xl font-light tracking-widest">{current.title}</h3></div></div><p className="text-[#8C8C88] leading-loose mb-8 border-b border-[#D2C4B5]/20 pb-8">{current.desc}</p>
            <div className="space-y-8"><div><h4 className="text-sm font-bold mb-4">核心学习</h4><ul className="grid md:grid-cols-2 gap-4">{current.learnItems.map((item, i) => (<li key={i} className="text-sm text-[#8C8C88] flex items-center gap-2"><div className="w-1 h-1 bg-[#768C76] rounded-full" />{item}</li>))}</ul></div>
            <div className="bg-[#768C76]/5 p-8 rounded-[36px]"><h4 className="text-sm font-bold text-[#768C76] mb-4">自我评估</h4>{current.assessment.map((q, i) => (<p key={i} className="text-sm italic font-serif leading-relaxed mb-2">“{q}”</p>))}</div></div></div>
          </div>
          <div className="space-y-8 text-center text-left">
            <div className="bg-[#C5B358]/5 p-8 rounded-[40px] border border-[#C5B358]/10 text-center text-left"><h4 className="text-xs font-bold uppercase tracking-[0.3em] text-[#C5B358] mb-4 text-center text-left">阶段练习卡</h4><p className="text-sm text-[#4A4A48] leading-loose">{current.practice}</p></div>
            <div className="bg-white/40 p-8 rounded-[40px] border border-[#D2C4B5]/20 text-center text-left"><h4 className="text-xs font-bold uppercase tracking-[0.3em] text-red-300 mb-4 text-center text-left">常见误区</h4><p className="text-xs text-[#8C8C88] leading-loose">{current.pitfall}</p></div>
            <Button variant="ghost" onClick={() => setShowMap(true)} className="w-full border-dashed border-[#D2C4B5]/40 text-center mx-auto text-center text-center"><MapIcon size={16} /> 练习地图</Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

const SafetyPage = ({ navigate }) => (
  <PageTransition>
    <div className="pt-32 pb-24 px-8 max-w-4xl mx-auto min-h-screen text-center">
      <h2 className="text-3xl font-light tracking-[0.4em] mb-12 text-center text-center text-center">这里如何守护安全</h2>
      <p className="text-[#8C8C88] mb-16 italic text-center">「真正温柔的空间，不是没有边界，而是边界清楚，所以人可以放松。」</p>
      <footer className="mt-12 text-center"><Button variant="ghost" onClick={() => navigate('hub')} className="mx-auto text-center"><ArrowLeft size={16} /> 返回</Button></footer>
    </div>
  </PageTransition>
);

const AboutPage = ({ navigate }) => (
  <PageTransition>
    <div className="pt-32 pb-24 px-8 max-w-3xl mx-auto min-h-screen text-center text-center text-center">
      <h2 className="text-3xl font-light tracking-[0.4em] mb-12 text-center text-center text-center">关于信任圈小院</h2>
      <Button onClick={() => navigate('hub')} className="mx-auto text-center text-center text-center">回到入口</Button>
    </div>
  </PageTransition>
);

const DailyQuestionPage = ({ navigate, onSave }) => {
  const [q, setQ] = useState(null);
  const draw = () => setQ(CONFIG.questionLibrary[Math.floor(Math.random() * CONFIG.questionLibrary.length)]);
  useEffect(() => draw(), []);
  if (!q) return null;
  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-8 max-w-4xl mx-auto min-h-screen text-center text-center text-center flex flex-col items-center">
        <h2 className="text-3xl font-light tracking-[0.5em] mb-12 text-center text-center text-center">每日一问</h2>
        <div className="stone-card p-12 rounded-[60px] mb-12 text-center text-center"><h3 className="text-2xl italic font-serif leading-relaxed mb-8 text-center text-center">“{q.text}”</h3><Button variant="secondary" onClick={draw} className="mx-auto text-center text-center"><RefreshCw size={16} /> 换一个</Button></div>
      </div>
    </PageTransition>
  );
};

const StonesPage = ({ navigate, onSave, onMicroStart }) => {
  const [exp, setExp] = useState(null);
  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-8 max-w-7xl mx-auto min-h-screen text-center text-center text-center">
        <h2 className="text-3xl md:text-4xl font-light tracking-[0.5em] mb-12 text-center text-center text-center">十一条基石原则</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 text-left text-center">
          {CONFIG.touchstones.map(s => (
            <div key={s.id} onClick={() => setExp(exp === s.id ? null : s.id)} className="stone-card p-8 rounded-[32px] cursor-pointer flex flex-col text-left text-center text-left">
              <span className="text-4xl font-serif text-[#D2C4B5]/40 mb-4 text-center">0{s.id}</span><h3 className="text-xl font-medium mb-4 text-left">{s.cn}</h3>
              {exp === s.id && (<div className="mt-4 pt-4 border-t text-center"><p className="font-bold text-lg mb-4 text-center">{s.detailCn}</p><p className="text-xs italic text-[#8C8C88] text-center">{s.detailEn}</p></div>)}
              <div className="mt-auto flex justify-center text-[#D2C4B5] opacity-40 text-center text-center">{exp === s.id ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}</div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

const QuestionPathPage = ({ navigate, onSave }) => {
  const [active, setActive] = useState(null);
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState({});
  const [done, setDone] = useState(false);
  if (!active) return (
    <PageTransition><div className="pt-32 pb-24 px-8 text-center text-center text-center"><h2 className="text-3xl font-light mb-12 text-center text-center text-center">问题小径</h2>
      <div className="grid md:grid-cols-3 gap-8 text-center text-center text-center">{CONFIG.paths.map(p => (<div key={p.id} className="card-base p-10 rounded-[40px] flex flex-col items-center text-center text-center text-center"><p.icon size={32} className="mb-4" /><h3 className="text-lg font-medium mb-4 text-center text-center">{p.title}</h3><Button onClick={() => setActive(p)} variant="secondary" className="text-center">踏上小径</Button></div>))}</div>
    </div></PageTransition>
  );
  if (done) return (<PageTransition><div className="pt-32 text-center text-center text-center"><h2 className="text-3xl mb-12 text-center text-center text-center">回声</h2><Button onClick={() => setActive(null)} className="text-center mx-auto">离开</Button></div></PageTransition>);
  return (<PageTransition><div className="pt-32 text-center text-center text-center"><h2 className="text-2xl italic mb-8 text-center text-center text-center">“{active.questions[step]}”</h2><Button onClick={() => step < 4 ? setStep(step+1) : setDone(true)} className="mx-auto text-center text-center">{step===4 ? "完成":"继续"}</Button></div></PageTransition>);
};

const MicroExperience = ({ microStep, setMicroStep, userInput, setUserInput, isAnonymized, setIsAnonymized, saveJournalEntry, navigate }) => {
  const [ph, setPh] = useState("吸气");
  const [cnt, setCnt] = useState(0);
  useEffect(() => { if(microStep===1){ const i = setInterval(()=>setPh(p=>p==="吸气"?"呼气":"吸气"), 3000); return ()=>clearInterval(i); } }, [microStep]);
  useEffect(() => { if(microStep===1 && cnt<6){ const t = setTimeout(()=>setCnt(c=>c+1), 3000); return ()=>clearTimeout(t); } }, [cnt, microStep]);
  const q = useMemo(() => CONFIG.questionLibrary[Math.floor(Math.random() * CONFIG.questionLibrary.length)], []);
  if (microStep === 1) return (<div className="min-h-screen flex items-center justify-center text-center text-center text-center text-center"><div className="space-y-12 text-center text-center text-center"><h2 className="text-2xl text-center text-center text-center text-center">慢一点，呼吸。</h2><div className="w-24 h-24 border rounded-full mx-auto flex items-center justify-center text-center text-center text-center"><span className="text-center text-center">{ph}</span></div>{cnt>=6 && <Button onClick={()=>setMicroStep(2)} className="text-center mx-auto text-center">我准备好了</Button>}</div></div>);
  if (microStep === 2) return (<div className="min-h-screen flex flex-col items-center justify-center text-center text-center text-center text-center"><h2 className="text-3xl italic mb-12 text-center text-center text-center">“{q.text}”</h2><Button onClick={()=>setMicroStep(3)} className="text-center mx-auto text-center">继续</Button></div>);
  return (<div className="min-h-screen flex items-center justify-center text-center text-center text-center text-center"><Button onClick={()=>navigate('hub')} className="text-center mx-auto text-center">回到入口</Button></div>);
};

// --- 4. 主应用 ---

export default function App() {
  const [path, setPath] = useState('arrival');
  const [journal, setJournal] = useState([]);
  const [microStep, setMicroStep] = useState(1);
  const [userInput, setUserInput] = useState("");
  const [isAnonymized, setIsAnonymized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('cot_journal_v5');
    if (saved) setJournal(JSON.parse(saved));
  }, []);

  const saveJournalEntry = (text) => {
    if (!text.trim()) return;
    const newEntry = { id: Date.now(), date: new Date().toLocaleDateString(), content: text };
    const updated = [newEntry, ...journal];
    setJournal(updated);
    localStorage.setItem('cot_journal_v5', JSON.stringify(updated));
  };

  const navigate = (newPath) => { setPath(newPath); window.scrollTo(0, 0); };
  const startMicro = () => { setMicroStep(1); setUserInput(""); setIsAnonymized(false); setPath('micro'); };

  const renderContent = () => {
    switch (path) {
      case 'arrival': return <Arrival navigate={navigate} onMicroStart={startMicro} />;
      case 'hub': return <Hub navigate={navigate} onMicroStart={startMicro} />;
      case 'learn': return <LearnPage navigate={navigate} />;
      case 'facilitator': return <FacilitatorPathPage navigate={navigate} />;
      case 'safety': return <SafetyPage navigate={navigate} />;
      case 'about': return <AboutPage navigate={navigate} />;
      case 'daily': return <DailyQuestionPage navigate={navigate} onSave={saveJournalEntry} />;
      case 'stones': return <StonesPage navigate={navigate} onSave={saveJournalEntry} onMicroStart={startMicro} />;
      case 'path': return <QuestionPathPage navigate={navigate} onSave={saveJournalEntry} />;
      case 'micro': return <MicroExperience microStep={microStep} setMicroStep={setMicroStep} userInput={userInput} setUserInput={setUserInput} isAnonymized={isAnonymized} setIsAnonymized={setIsAnonymized} saveJournalEntry={saveJournalEntry} navigate={navigate} />;
      case 'journal': return (
        <PageTransition>
          <div className="pt-32 pb-24 px-8 max-w-4xl mx-auto min-h-screen text-center text-center text-center"><h2 className="text-3xl font-light mb-12 text-center text-center text-center">小院日志</h2>
            {journal.length === 0 ? (<div className="text-center py-24 bg-white/30 rounded-[40px] text-center text-center"><p className="text-[#D2C4B5] mb-8 text-center text-center text-center text-center">暂无印记。</p><Button onClick={startMicro} variant="secondary" className="mx-auto text-center text-center">开启旅程</Button></div>) 
            : (<div className="space-y-8 text-center text-center">{journal.map((e) => (<div key={e.id} className="bg-white/70 p-10 rounded-[30px] shadow-sm text-left text-center"><div className="text-[10px] text-[#D2C4B5] mb-2 uppercase text-center">{e.date}</div><p className="text-[#4A4A48] leading-loose whitespace-pre-wrap text-center">{e.content}</p></div>))}
                <button onClick={() => { if(window.confirm('清空日志？')) { setJournal([]); localStorage.removeItem('cot_journal_v5'); } }} className="text-[10px] text-[#D1CEC1] hover:text-red-300 mt-12 block mx-auto text-center text-center">Clear History</button>
              </div>)}
          </div>
        </PageTransition>
      );
      default: return <Arrival navigate={navigate} onMicroStart={startMicro} />;
    }
  };

  return (
    <div className="font-sans text-[#4A4A48] bg-[#F8F7F2] min-h-screen selection:bg-[#768C76]/20">
      <GlobalStyles />
      <Navbar onNavigate={navigate} currentPath={path} />
      <main className="w-full text-center text-center">{renderContent()}</main>
      {path !== 'arrival' && (
        <footer className="py-20 px-8 text-center border-t border-[#D2C4B5]/10 text-center text-center">
          <p className="text-[9px] tracking-[0.4em] text-[#D2C4B5] uppercase text-center text-center text-center">Parker J. Palmer · Circle of Trust · Courtyard 2.0</p>
        </footer>
      )}
    </div>
  );
}