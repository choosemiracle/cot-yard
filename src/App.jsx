import React, { useState, useEffect, useMemo } from 'react';
import { 
  Wind, Map, BookOpen, Heart, ShieldCheck, Compass, MessageCircle, 
  PenTool, Home, ChevronRight, ArrowLeft, Loader2, Leaf, Coffee, 
  Sparkles, Waves, Armchair, CheckCircle2, Bookmark, ChevronDown, 
  ChevronUp, Shield, AlertCircle, EyeOff, Users, Quote, MicOff, 
  SearchX, Stethoscope, RefreshCw, Mountain, Flag, Circle, Flame, 
  UserCheck, Target
} from 'lucide-react';

// --- 1. 核心配置文件 ---

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
  // 引导者阶梯
  facilitatorLevels: [
    { id: 1, title: "理解精神", icon: BookOpen, desc: "深入理解信任圈的精神内核、边界原则与帕尔默思想。", learnItems: ["理解分裂的人生", "发现隐秘的完整", "学会聆听内在导师", "理解第三事物的隐喻力量", "践行不修复、不建议原则"], assessment: ["我能清晰解释为什么不建议比建议更难吗？", "我理解了为什么灵魂像害羞的野兽吗？"], practice: "本周尝试在对话中，彻底忍住给他人建议的冲动。", pitfall: "试图把信任圈变成一种可以用技巧操控的工具。" },
    { id: 2, title: "基本能力", icon: Flame, desc: "从自己的倾听习惯开始，培养作为守护者的容量。", learnItems: ["全然在场：放下评判", "深度聆听：听见余音", "静默承载：不急于填满空白", "开放提问：不带预设答案", "去中心化：不把自己当成关键"], assessment: ["在沉默中，我会感到尴尬或焦虑吗？", "我提出的问题是真正的好奇，还是披着提问外衣的建议？"], practice: "在朋友说话停顿后，多留出五秒钟的静默。", pitfall: "过度关注提问技巧是否高级，从而失去了与对方真实的连接。" },
    { id: 3, title: "守护空间", icon: ShieldCheck, desc: "学习如何设计并维护一个能让参与者感到安全的“容器”。", learnItems: ["设计开场与欢迎仪式", "确认共同契约：朗读基石", "处理沉默：让静默成为力量", "面对眼泪：见证而不打断", "重申规则：温和纠正越界"], assessment: ["当场域里有人哭泣时，我能克制住安慰的冲动吗？", "我能有底气地打断一个正在违背规则的发言者吗？"], practice: "模拟一次五分钟的信任圈开场，尝试用最少的语言建立最大的安全感。", pitfall: "为了维持表面和谐而纵容越界行为。" },
    { id: 4, title: "真实带领", icon: Target, desc: "从小型练习开始，逐步进入真实、复杂的社会场域进行实践。", learnItems: ["设计 90 分钟沙龙流程", "设计半日深度工作坊", "双引导协作：背靠背的信任", "自我照看：防止替代性创伤", "伦理边界与转介意识"], assessment: ["我是否建立了个人支持系统（督导）？", "我能接纳一场“看起来并不热闹”的圆圈吗？"], practice: "寻找一位伙伴，共同设计并主持一次小型的诗歌回响会。", pitfall: "产生“救世主”心态，认为圆圈的质量取决于自己的个人魅力。" }
  ],
  // 精选问题池
  questionLibrary: [
    { category: "自我觉察", text: "你生命里有哪些东西是不需要向任何人证明的？" },
    { category: "自我觉察", text: "如果你不再扮演“有用”的人，你会是谁？" },
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
    { id: 'listening', title: '学习聆听', icon: MessageCircle, desc: '当你想成为更好的陪伴者或引导者。', questions: ["我听别人说话时，内心最常急着做什么？", "我是否急着修复、建议或解释？", "我能否允许对方保有自己的节奏？", "什么样的问题能帮助对方听见自己？", "我如何带着自己的倾听去表达？"] }
  ],
  witnessPool: [
    "“我也常常不知道，自己到底在怕什么。”",
    "“我发现，我最想被听见的，不是答案，而是沉默中的陪伴。”",
    "“原来不说，也可以是一种诚实。”",
    "“我正在学习不急着解释自己。”"
  ]
};

// --- 2. 基础 UI 组件与样式 ---

const GlobalStyles = () => (
  <style>{`
    @keyframes slowFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes breathe { 0% { transform: scale(1); opacity: 0.2; } 50% { transform: scale(1.4); opacity: 0.05; } 100% { transform: scale(1); opacity: 0.2; } }
    @keyframes circleStep { 0% { transform: scale(0.95); } 50% { transform: scale(1.05); } 100% { transform: scale(0.95); } }
    .animate-slow-fade { animation: slowFadeIn 2s ease-out forwards; }
    .breathe-ring { animation: breathe 6s ease-in-out infinite; }
    .breathe-text { animation: circleStep 6s ease-in-out infinite; }
    .card-base { transition: all 0.8s cubic-bezier(0.2, 1, 0.3, 1); border: 1px solid rgba(210, 196, 181, 0.2); }
    .card-base:hover { transform: translateY(-8px); box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.1); border-color: rgba(118, 140, 118, 0.4); background: white; }
    .stone-card { background: #FDFCF8; background-image: radial-gradient(circle at 90% 10%, rgba(197, 179, 88, 0.15) 0%, transparent 40%); }
    .learn-chapter-title { position: relative; }
    .learn-chapter-title::after { content: ''; position: absolute; left: 0; bottom: -10px; width: 40px; height: 2px; background: #768C76; }
    
    /* 手机端滚动条美化 */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-thumb { background: #8C7A66; border-radius: 10px; }
  `}</style>
);

const PageTransition = ({ children }) => (
  <div className="animate-in fade-in slide-in-from-bottom-2 duration-1000 ease-in-out w-full px-4 md:px-0">
    {children}
  </div>
);

const Button = ({ onClick, children, variant = 'primary', className = '', disabled = false }) => {
  const baseStyles = "px-6 md:px-8 py-3 rounded-full transition-all duration-700 ease-out transform active:scale-95 flex items-center justify-center gap-2 tracking-widest text-xs md:text-sm whitespace-nowrap font-medium";
  const variants = {
    primary: `bg-[#2D2D2B] text-white hover:bg-black shadow-sm disabled:opacity-30`,
    secondary: `bg-white/60 text-[#2D2D2B] border border-[#8C7A66]/40 hover:bg-white hover:border-[#8C7A66] backdrop-blur-sm`,
    ghost: `text-[#5C5C58] hover:text-[#2D2D2B] bg-transparent font-bold`,
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
    <nav className="fixed top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-50 bg-[#F8F7F2]/80 backdrop-blur-md border-b border-[#D2C4B5]/20">
      <div 
        className="text-[#2D2D2B] font-serif font-bold cursor-pointer text-base md:text-lg tracking-widest flex items-center gap-2" 
        onClick={() => onNavigate('hub')}
      >
        <span className="w-2 h-2 rounded-full bg-[#768C76]"></span>
        <span className="hidden sm:inline">信任圈小院</span>
        <span className="sm:hidden">小院 2.0</span>
      </div>
      <Button variant="ghost" onClick={() => onNavigate('hub')} className="p-2 min-w-0">
        <Home size={20} strokeWidth={2} />
      </Button>
    </nav>
  );
};

// --- 3. 页面模块组件 ---

const ArrivalPage = ({ navigate, onMicroStart }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 md:p-8 bg-[#F8F7F2] relative overflow-hidden select-none">
    <GlobalStyles />
    <div className="absolute top-[-5%] right-[-5%] text-[#768C76] opacity-10 pointer-events-none">
      <Wind className="w-[300px] h-[300px] md:w-[600px] md:h-[600px]" strokeWidth={0.2} />
    </div>
    <div className="text-center max-w-3xl z-10 space-y-8 md:space-y-12">
      <div className="animate-slow-fade opacity-0 text-center">
        <p className="text-xs md:text-sm tracking-[0.3em] text-[#8C7A66] font-bold uppercase">Circle of Trust · 内在生命的空地</p>
      </div>
      <div className="animate-slow-fade delay-1s text-center px-2">
        <h1 className="text-3xl md:text-5xl font-bold tracking-[0.1em] text-[#2D2D2B] leading-snug md:leading-tight">「你不需要表现，<br className="md:hidden" />只需要在这里。」</h1>
      </div>
      <div className="animate-slow-fade delay-2s max-w-md mx-auto text-center px-4">
        <p className="text-[#4A4A48] text-base md:text-lg font-serif leading-loose tracking-wider font-medium">这里是一处数字化的小院，邀请你慢一点，<br/>听见自己，也学习如何听见他人。</p>
      </div>
      <div className="animate-slow-fade delay-3s pt-4 flex flex-col md:flex-row gap-4 md:gap-5 justify-center items-center">
        <Button onClick={() => navigate('hub')} className="w-full md:min-w-[180px] text-base">进入小院</Button>
        <div className="flex gap-4 w-full md:w-auto">
          <Button variant="secondary" onClick={onMicroStart} className="flex-1">体验一次</Button>
          <Button variant="ghost" onClick={() => navigate('about')} className="flex-1">了解更多</Button>
        </div>
      </div>
    </div>
    <div className="absolute bottom-8 md:bottom-12 text-center w-full animate-slow-fade delay-3s">
      <p className="text-xs md:text-sm tracking-[0.2em] text-[#8C7A66] font-bold">「向内，不是退缩；安静，不是沉默失语。」</p>
    </div>
  </div>
);

const HubPage = ({ navigate, onMicroStart }) => {
  const menuItems = [
    { id: 'micro', icon: Waves, title: '微型体验', desc: '用三到五分钟，停下来，听见此刻的自己。', btn: '开始体验' },
    { id: 'daily', icon: Sparkles, title: '每日一问', desc: '一个开放而诚实的问题，陪你走近真实。', btn: '抽取问题' },
    { id: 'path', icon: Map, title: '问题小径', desc: '按主题深入探索，步入内在的森林。', btn: '踏入小径' },
    { id: 'facilitator', icon: Flag, title: '引导者之路', desc: '学习如何成为空间的守护者与见证者。', btn: '进入学习' }
  ];
  return (
    <PageTransition>
      <div className="pt-24 md:pt-32 pb-16 md:pb-24 max-w-6xl mx-auto min-h-screen">
        <header className="mb-12 md:mb-16 text-center px-4">
          <h2 className="text-3xl font-bold tracking-[0.2em] text-[#2D2D2B] mb-4">今天，你想如何进入？</h2>
          <p className="text-[#4A4A48] font-serif text-sm md:text-base tracking-widest leading-relaxed font-medium">这里的一切，都是邀请，不是要求。</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20 px-2">
          {menuItems.map(({ icon: Icon, ...item }) => (
            <div key={item.id} className="card-base group bg-white/60 p-8 md:p-12 rounded-[32px] md:rounded-[40px] flex flex-col items-center relative overflow-hidden">
              <div className="mb-6 md:mb-8 text-[#768C76] relative z-10"><Icon size={40} strokeWidth={1.5} /></div>
              <h3 className="text-xl font-bold mb-3 md:mb-4 text-[#2D2D2B] tracking-[0.1em]">{item.title}</h3>
              <p className="text-sm md:text-base text-[#4A4A48] mb-8 md:mb-10 font-serif leading-relaxed text-center font-medium">{item.desc}</p>
              <Button onClick={() => item.id === 'micro' ? onMicroStart() : navigate(item.id)} variant="secondary" className="group-hover:bg-[#2D2D2B] group-hover:text-white relative z-10 px-8 md:px-10">{item.btn}</Button>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 md:gap-x-12 gap-y-6 pt-10 border-t border-[#D2C4B5] text-xs md:text-sm tracking-[0.2em] uppercase text-[#8C7A66] px-4 font-bold">
          {['stones', 'safety', 'journal', 'about'].map(id => (
            <button key={id} onClick={() => navigate(id)} className="hover:text-[#768C76] transition-colors whitespace-nowrap">
              {{stones:'十一条基石', safety:'安全与边界', journal:'小院日志', about:'关于小院'}[id]}
            </button>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

const MicroCirclePage = ({ microStep, setMicroStep, userInput, setUserInput, isAnonymized, setIsAnonymized, saveJournalEntry, navigate }) => {
  const [phase, setPhase] = useState("吸气");
  const [count, setCount] = useState(0);
  const randomQ = useMemo(() => CONFIG.questionLibrary[Math.floor(Math.random() * CONFIG.questionLibrary.length)], []);
  const randomSnippet = useMemo(() => CONFIG.witnessPool[Math.floor(Math.random() * CONFIG.witnessPool.length)], []);

  useEffect(() => {
    if (microStep === 1) {
      const interval = setInterval(() => setPhase(p => p === "吸气" ? "呼气" : "吸气"), 3000);
      return () => clearInterval(interval);
    }
  }, [microStep]);

  useEffect(() => {
    if (microStep === 1 && count < 6) {
      const timer = setTimeout(() => setCount(c => c + 1), 3000);
      return () => clearTimeout(timer);
    }
  }, [count, microStep]);

  if (microStep === 1) return (
    <PageTransition>
      <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 text-center bg-[#F8F7F2]">
        <div className="max-w-md space-y-10 md:space-y-12 px-6">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-[0.1em] text-[#2D2D2B]">先不要继续。</h2>
            <p className="text-[#4A4A48] font-serif text-base md:text-lg leading-loose font-medium">让自己慢一点。<br/>把注意力带回呼吸。</p>
          </div>
          <div className="relative w-40 h-40 md:w-56 md:h-56 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-[#768C76]/30 breathe-ring"></div>
            <div className="w-28 h-28 md:w-40 md:h-40 rounded-full border-2 border-[#768C76] flex items-center justify-center text-center">
              <span className="text-[#768C76] text-lg md:text-xl font-bold tracking-widest breathe-text">{phase}</span>
            </div>
          </div>
          <div className="h-12 flex items-center justify-center">
            {count >= 6 ? <Button onClick={() => setMicroStep(2)} className="text-lg px-12">我准备好了</Button> : <p className="text-sm text-[#8C7A66] tracking-[0.2em] uppercase font-bold animate-pulse">安顿中... {Math.floor(count/2)}/3</p>}
          </div>
        </div>
      </div>
    </PageTransition>
  );

  if (microStep === 2) return (
    <PageTransition>
      <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 text-center bg-[#F8F7F2] px-6">
        <div className="max-w-2xl space-y-10">
          <header><span className="text-sm uppercase tracking-[0.3em] text-[#8C7A66] block mb-4 font-bold">今日问题</span><h2 className="text-2xl md:text-4xl font-serif font-bold italic text-[#2D2D2B] leading-relaxed tracking-wide">“{randomQ.text}”</h2></header>
          <p className="text-base md:text-lg text-[#4A4A48] font-serif tracking-widest max-w-sm mx-auto leading-loose font-medium">不必急着回答。让问题先在心里停一会儿。</p>
          <Button onClick={() => setMicroStep(3)} className="mx-auto text-lg">带着这个问题继续</Button>
        </div>
      </div>
    </PageTransition>
  );

  if (microStep === 3) return (
    <PageTransition>
      <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 bg-[#F8F7F2] px-4 md:px-6">
        <div className="w-full max-w-xl space-y-8">
          <header className="text-center"><h2 className="text-2xl font-bold tracking-[0.1em] text-[#2D2D2B] mb-3">写下一句话</h2><p className="text-sm md:text-base text-[#4A4A48] font-serif tracking-widest font-medium">它可以很短。可以凌乱。可以只属于你。</p></header>
          <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} className="w-full h-48 md:h-60 p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-white border-2 border-[#8C7A66]/30 focus:border-[#768C76] focus:outline-none transition-all duration-700 font-serif leading-loose text-lg md:text-xl text-[#2D2D2B] shadow-inner" placeholder="此刻，我想说……" />
          <div className="flex items-center gap-3 px-2">
            <input type="checkbox" id="anon" checked={isAnonymized} onChange={(e) => setIsAnonymized(e.target.checked)} className="w-5 h-5 rounded-full accent-[#768C76]" />
            <label htmlFor="anon" className="text-xs md:text-sm text-[#4A4A48] tracking-widest cursor-pointer select-none font-bold">我愿意匿名放入小院，让后来的人被这一句话陪伴</label>
          </div>
          <Button onClick={() => { saveJournalEntry(`[微型体验] ${randomQ.text}\n- ${userInput}`); setMicroStep(4); }} disabled={!userInput.trim()} className="w-full text-lg">安静放下</Button>
        </div>
      </div>
    </PageTransition>
  );

  if (microStep === 4) return (
    <PageTransition>
      <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 text-center bg-[#F8F7F2] px-6">
        <div className="max-w-2xl space-y-10">
          <h2 className="text-xl md:text-2xl font-bold tracking-[0.1em] text-[#2D2D2B]">{isAnonymized ? "你的这句话，已经轻轻放入小院。" : "这句话只属于你。它已经被你自己听见。"}</h2>
          <div className="bg-white p-10 md:p-16 rounded-[32px] md:rounded-[40px] border-2 border-[#768C76]/20 shadow-md relative overflow-hidden group">
            <Quote className="absolute top-4 md:top-6 left-6 md:left-8 text-[#768C76]/20" size={40} />
            <p className="text-xl md:text-3xl font-serif italic text-[#2D2D2B] leading-relaxed tracking-wider relative z-10 text-center font-medium">{isAnonymized ? randomSnippet : "（在此刻的静默中，深深地呼吸）"}</p>
          </div>
          <Button onClick={() => setMicroStep(5)} className="mx-auto text-lg">继续收束</Button>
        </div>
      </div>
    </PageTransition>
  );

  return (
    <PageTransition>
      <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 text-center bg-[#F8F7F2] px-6">
        <div className="max-w-md space-y-10">
          <div className="space-y-6">
            <CheckCircle2 className="mx-auto text-[#768C76]" size={56} strokeWidth={2} />
            <h2 className="text-2xl md:text-3xl font-bold tracking-[0.1em] text-[#2D2D2B]">谢谢你愿意停在这里</h2>
            <p className="text-[#4A4A48] font-serif text-lg md:text-xl leading-loose tracking-widest text-center font-medium">愿你把此刻的一点真实，<br/>轻轻带回今天的生活。</p>
          </div>
          <div className="flex flex-col gap-4">
            <Button onClick={() => navigate('hub')} className="mx-auto w-full md:w-auto text-lg px-12">回到小院</Button>
            <Button variant="ghost" onClick={() => { setMicroStep(1); setUserInput(""); setIsAnonymized(false); setCount(0); }} className="mx-auto font-bold">再来一个问题</Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

const FacilitatorPage = ({ navigate }) => {
  const [activeLevel, setActiveLevel] = useState(1);
  const [showMap, setShowMap] = useState(false);
  const [completed, setCompleted] = useState([1]);
  const handleLevel = (id) => { setActiveLevel(id); if (!completed.includes(id)) setCompleted([...completed, id]); };
  const current = CONFIG.facilitatorLevels.find(l => l.id === activeLevel);
  const Icon = current.icon;

  if (showMap) return (
    <PageTransition>
      <div className="pt-24 md:pt-32 pb-16 md:pb-24 max-w-4xl mx-auto min-h-screen text-center px-4">
        <h2 className="text-3xl font-bold tracking-[0.2em] mb-4 text-[#2D2D2B]">我的引导者练习地图</h2>
        <p className="text-[#4A4A48] text-sm md:text-base mb-12 font-serif italic font-bold">“慢慢走，灵魂的成长不急于一时。”</p>
        <div className="bg-white/80 p-8 md:p-12 rounded-[40px] md:rounded-[60px] grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10 border-2 border-[#8C7A66]/30">
          {CONFIG.facilitatorLevels.map(l => (
            <div key={l.id} className={`flex items-center gap-4 ${completed.includes(l.id) ? 'opacity-100' : 'opacity-30'} text-left`}>
              <div className="w-12 h-12 rounded-full bg-[#768C76]/20 flex items-center justify-center shrink-0">
                {completed.includes(l.id) ? <CheckCircle2 size={24} className="text-[#768C76]" /> : <Circle size={12} className="text-[#8C7A66]" />}
              </div>
              <p className="text-base font-bold text-[#2D2D2B]">{l.title}</p>
            </div>
          ))}
        </div>
        <Button onClick={() => setShowMap(false)} className="mx-auto text-lg px-10">回到路径详情</Button>
      </div>
    </PageTransition>
  );

  return (
    <PageTransition>
      <div className="pt-24 md:pt-32 pb-16 md:pb-24 max-w-5xl mx-auto min-h-screen px-4">
        <header className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[0.3em] mb-6 md:mb-8 text-[#2D2D2B]">引导者之路</h2>
          <p className="text-[#4A4A48] font-serif text-sm md:text-lg leading-loose tracking-[0.1em] italic font-medium">「引导者不是舞台中心，而是容器的守护者。<br className="hidden md:block" />真正的能力，不只是会带流程，而是能守住静默、边界与真实。」</p>
        </header>
        <div className="flex justify-center mb-10 md:mb-12 gap-3 flex-wrap text-center">
          {CONFIG.facilitatorLevels.map(l => (
            <button key={l.id} onClick={() => handleLevel(l.id)} className={`px-6 md:px-8 py-3 rounded-full text-xs md:text-sm font-bold tracking-widest transition-all border-2 ${activeLevel === l.id ? 'bg-[#2D2D2B] text-white border-[#2D2D2B]' : 'bg-white/60 text-[#5C5C58] border-[#8C7A66]/30'}`}>阶段 {l.id}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 md:p-10 rounded-[32px] md:rounded-[40px] shadow-md border border-[#8C7A66]/20">
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <Icon size={32} className="text-[#768C76]" />
                <h3 className="text-2xl md:text-3xl font-bold tracking-widest text-[#2D2D2B]">{current.title}</h3>
              </div>
              <p className="text-[#4A4A48] text-base md:text-lg leading-loose mb-8 border-b-2 border-[#D2C4B5]/40 pb-6 md:pb-8 font-medium">{current.desc}</p>
              <div className="space-y-8">
                <div><h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-[#2D2D2B]"><Sparkles size={18}/> 核心学习</h4><ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">{current.learnItems.map((item, i) => (<li key={i} className="text-sm md:text-base text-[#4A4A48] flex items-center gap-3 font-medium"><div className="w-1.5 h-1.5 bg-[#768C76] rounded-full shrink-0" />{item}</li>))}</ul></div>
                <div className="bg-[#768C76]/10 p-6 md:p-8 rounded-[24px] md:rounded-[32px] border-2 border-[#768C76]/20"><h4 className="text-lg font-bold text-[#768C76] mb-4 flex items-center gap-2"><UserCheck size={20}/> 自我评估</h4>{current.assessment.map((q, i) => (<p key={i} className="text-sm md:text-base italic font-serif leading-relaxed mb-4 text-[#2D2D2B] font-medium">“{q}”</p>))}</div>
              </div>
            </div>
          </div>
          <div className="space-y-6 md:space-y-8">
            <div className="bg-[#C5B358]/10 p-6 md:p-8 rounded-[24px] md:rounded-[32px] border-2 border-[#C5B358]/20">
              <h4 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#8C7A66] mb-4 flex items-center gap-2"><PenTool size={18}/> 阶段练习卡</h4>
              <p className="text-sm md:text-base text-[#2D2D2B] font-serif leading-loose font-bold">{current.practice}</p>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] border-2 border-[#D2C4B5]">
              <h4 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-red-600 mb-4 flex items-center gap-2"><AlertCircle size={18}/> 常见误区</h4>
              <p className="text-sm md:text-base text-[#4A4A48] font-serif leading-loose font-medium">{current.pitfall}</p>
            </div>
            <Button variant="ghost" onClick={() => setShowMap(true)} className="w-full border-2 border-dashed border-[#8C7A66]/40 text-lg">查看成长地图</Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

const SafetyPage = ({ navigate }) => {
  const safetyPillars = [
    { id: 1, title: "你不需要分享", icon: MicOff, desc: "所有表达都是邀请，不是要求。你可以全程保持静默，因为在信任圈里，沉默也是一种全然的参与。" },
    { id: 2, title: "没有人会分析你", icon: SearchX, desc: "这里不诊断、不解释你的生命、不替你定义问题。我们练习作为见证者，而非评论员。" },
    { id: 3, title: "没有人会急着修复你", icon: Shield, desc: "我们相信，每个人内在都有自己的节奏与智慧。我们放下改变他人的冲动，转而创造守护真实的空间。" },
    { id: 4, title: "你的文字默认只属于你", icon: PenTool, desc: "小院日志默认保存在你当下的设备本地，我们不上传、不收集你的私密反思。匿名分享必须由你主动决定。" },
    { id: 5, title: "这里不是心理治疗", icon: Stethoscope, desc: "本站旨在提供人文关怀与自我导引体验，不能替代专业医疗。若正处于严重心理危机，请寻求专业援助。" },
    { id: 6, title: "共同守护", icon: Users, desc: "如果未来参与互动，所有成员均需承诺：保密、尊重、不建议、不攻击、不评判。" }
  ];
  return (
    <PageTransition>
      <div className="pt-24 md:pt-32 pb-16 md:pb-24 max-w-5xl mx-auto min-h-screen px-4">
        <header className="text-center mb-12 md:mb-16 max-w-2xl mx-auto"><h2 className="text-3xl md:text-4xl font-bold tracking-[0.2em] mb-6 md:mb-8 text-[#2D2D2B]">这里如何守护安全</h2><p className="text-[#4A4A48] font-serif text-sm md:text-lg leading-loose tracking-[0.1em] italic font-medium">「真正温柔的空间，不是没有边界，而是边界清楚，所以人可以放松。」</p></header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          {safetyPillars.map(({ icon: Icon, ...pillar }) => (
            <div key={pillar.id} className="card-base p-8 rounded-[32px] md:rounded-[36px] bg-white p-8 shadow-sm flex flex-col border-2 border-[#D2C4B5]/30">
              <div className="mb-6 text-[#768C76] flex justify-center sm:justify-start"><Icon size={32} strokeWidth={2} /></div>
              <h3 className="text-lg md:text-xl font-bold tracking-widest text-[#2D2D2B] mb-4 text-center sm:text-left">{pillar.title}</h3>
              <p className="text-sm md:text-base text-[#4A4A48] font-serif leading-loose text-center sm:text-left font-medium">{pillar.desc}</p>
            </div>
          ))}
        </div>
        <footer className="text-center pt-12 md:pt-16 border-t-2 border-[#D2C4B5]/40 max-w-2xl mx-auto"><p className="text-[#8C7A66] text-xs md:text-sm tracking-[0.2em] uppercase mb-10 md:mb-12 italic font-bold text-center">「边界不是墙，而是一圈温柔的篱笆。因为有它，真实才敢慢慢出现。」</p><Button variant="ghost" onClick={() => navigate('hub')} className="mx-auto text-lg"><ArrowLeft size={20} /> 返回入口</Button></footer>
      </div>
    </PageTransition>
  );
};

const StonesPage = ({ navigate }) => {
  const [exp, setExp] = useState(null);
  return (
    <PageTransition>
      <div className="pt-24 md:pt-32 pb-16 md:pb-24 max-w-7xl mx-auto min-h-screen px-4">
        <header className="mb-16 md:mb-24 text-center"><div className="flex justify-center mb-6 text-[#768C76]"><ShieldCheck size={48} strokeWidth={2} /></div><h2 className="text-3xl md:text-4xl font-bold tracking-[0.2em] mb-6 md:mb-8 text-[#2D2D2B]">十一条基石原则</h2><p className="text-[#4A4A48] text-sm md:text-lg tracking-widest leading-loose font-serif font-medium">点击卡片展开详情，感受文字背后的温柔与力量。</p></header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mb-16 md:mb-24">
          {CONFIG.touchstones.map(s => (
            <div key={s.id} onClick={() => setExp(exp === s.id ? null : s.id)} className="stone-card card-base p-6 md:p-8 rounded-[28px] md:rounded-[32px] cursor-pointer flex flex-col text-left border-2 border-[#D2C4B5]/30">
              <span className="text-3xl md:text-4xl font-serif text-[#8C7A66]/60 mb-3 md:mb-4 font-bold">0{s.id}</span>
              <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 text-[#2D2D2B] leading-tight">{s.cn}</h3>
              <div className="border-l-4 border-[#768C76] pl-4 md:pl-5 mb-4 md:mb-6"><p className="text-sm md:text-base text-[#4A4A48] leading-relaxed font-bold">「{s.summary}」</p></div>
              {exp === s.id && (<div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t-2 border-[#D2C4B5]/40 animate-in fade-in slide-in-from-top-4 duration-700">
                <p className="text-lg md:text-xl font-bold text-[#2D2D2B] leading-relaxed mb-4">{s.detailCn}</p>
                <p className="text-sm md:text-base font-serif italic text-[#5C5C58] mb-6 font-medium bg-white/40 p-4 rounded-xl">{s.detailEn}</p>
                <div className="mt-4 p-4 bg-[#768C76]/10 rounded-xl border-l-4 border-[#768C76]"><p className="text-sm text-[#2D2D2B] font-bold">反思问题：{s.reflection}</p></div>
              </div>)}
              <div className="mt-auto flex justify-center text-[#8C7A66] pt-4 md:pt-6 font-bold">{exp === s.id ? <ChevronUp size={24}/> : <ChevronDown size={24}/>}</div>
            </div>
          ))}
        </div>
        <div className="text-center"><Button variant="secondary" onClick={() => navigate('hub')} className="text-lg px-12">回到小院入口</Button></div>
      </div>
    </PageTransition>
  );
};

const DailyQuestionPage = ({ navigate, onSave }) => {
  const [q, setQ] = useState(null);
  const draw = () => setQ(CONFIG.questionLibrary[Math.floor(Math.random() * CONFIG.questionLibrary.length)]);
  useEffect(() => draw(), []);
  if (!q) return null;
  return (
    <PageTransition><div className="pt-24 md:pt-32 pb-16 md:pb-24 max-w-4xl mx-auto min-h-screen flex flex-col items-center text-center px-4">
      <header className="mb-12 md:mb-16"><h2 className="text-3xl md:text-4xl font-bold tracking-[0.2em] text-[#2D2D2B]">每日一问</h2><p className="text-[#4A4A48] font-serif text-sm md:text-lg tracking-widest mt-4 font-medium">「一个好问题，不急着要答案。它只是陪你走近真实。」</p></header>
      <div className="stone-card p-10 md:p-20 rounded-[40px] md:rounded-[60px] w-full mb-10 flex flex-col items-center shadow-md border-2 border-[#D2C4B5]/40">
        <span className="text-sm font-bold text-[#768C76] mb-6 tracking-widest uppercase">{q.category}</span>
        <h3 className="text-2xl md:text-4xl font-serif font-bold italic text-[#2D2D2B] leading-relaxed mb-10 md:mb-12 text-center px-4">“{q.text}”</h3>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center px-4">
          <Button onClick={()=>onSave(`[每日一问] ${q.text}`)} className="w-full sm:w-auto text-lg px-10">存入我的日志</Button>
          <Button variant="secondary" onClick={draw} className="w-full sm:w-auto text-lg px-10 font-bold"><RefreshCw size={20}/> 换一个问题</Button>
        </div>
      </div>
      <footer className="mt-8 text-xs md:text-sm text-[#8C7A66] tracking-[0.1em] font-bold">「你不需要马上明白。真正重要的问题，会在生命里慢慢发光。」</footer>
    </div></PageTransition>
  );
};

const QuestionPathPage = ({ onSave, navigate }) => {
  const [active, setActive] = useState(null);
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState({});
  const [done, setDone] = useState(false);
  if (!active) return (
    <PageTransition><div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 text-center min-h-screen"><h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-12 tracking-[0.3em] text-[#2D2D2B]">问题小径</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
        {CONFIG.paths.map(({ icon: Icon, ...p }) => (
          <div key={p.id} className="card-base p-8 md:p-10 rounded-[32px] md:rounded-[40px] bg-white flex flex-col items-center border-2 border-[#D2C4B5]/30">
            <Icon size={40} className="mb-6 text-[#768C76]" />
            <h3 className="text-xl font-bold mb-4 text-[#2D2D2B] tracking-widest">{p.title}</h3>
            <p className="text-sm md:text-base text-[#4A4A48] mb-8 font-serif leading-relaxed text-center font-medium">{p.desc}</p>
            <Button onClick={() => { setActive(p); setStep(0); setAns({}); setDone(false); }} variant="secondary" className="w-full text-lg">踏上小径</Button>
          </div>
        ))}
      </div>
    </div></PageTransition>
  );
  if (done) return (<PageTransition><div className="pt-24 md:pt-32 px-6 text-center max-w-2xl mx-auto min-h-screen"><h2 className="text-3xl font-bold mb-10 text-[#2D2D2B]">今日小径回声</h2><div className="space-y-6 text-left mb-12">{active.questions.map((q, i) => (<div key={i} className="border-l-4 border-[#768C76] pl-6 py-2 bg-white/40 rounded-r-xl"><p className="text-xs font-bold text-[#8C7A66] uppercase mb-1">提问：{q}</p><p className="text-lg font-serif font-medium text-[#2D2D2B]">{ans[i] || '（静默）'}</p></div>))}</div><Button onClick={() => { onSave(`[小径：${active.title}]\n` + active.questions.map((q,i)=>`问：${q}\n答：${ans[i]}`).join('\n\n')); setActive(null); }} className="mx-auto w-full text-lg">保存回声并离开</Button></div></PageTransition>);
  return (<PageTransition><div className="min-h-screen flex flex-col items-center justify-center py-12 bg-[#F8F7F2] px-4 md:px-6"><div className="w-full max-w-xl space-y-10 md:space-y-12 text-center"><div className="flex items-center gap-4"><div className="flex-1 h-1.5 bg-[#D2C4B5]/40 relative rounded-full"><div className="absolute left-0 top-0 h-full bg-[#768C76] rounded-full transition-all duration-1000" style={{width:`${(step+1)*20}%`}}></div></div><span className="text-sm text-[#2D2D2B] font-bold tracking-widest">{step+1}/5</span></div><h2 className="text-2xl md:text-4xl font-serif font-bold italic text-[#2D2D2B] leading-relaxed text-center">“{active.questions[step]}”</h2><textarea key={step} defaultValue={ans[step]||""} onBlur={(e) => setAns({...ans, [step]:e.target.value})} className="w-full h-48 md:h-64 p-6 md:p-10 rounded-[32px] md:rounded-[40px] bg-white border-2 border-[#8C7A66]/30 focus:border-[#768C76] focus:outline-none font-serif text-lg md:text-xl text-[#2D2D2B] shadow-inner" placeholder="在此写下回响..." /><div className="flex gap-4 justify-center">{step > 0 && <Button variant="ghost" onClick={() => setStep(step-1)} className="flex-1 text-lg">上一步</Button>}<Button onClick={() => step < 4 ? setStep(step+1) : setDone(true)} className="flex-[2] text-lg font-bold">{step===4 ? "完成探索":"继续前行"}</Button></div></div></div></PageTransition>);
};

const AboutPage = ({ navigate }) => (
  <PageTransition><div className="pt-24 md:pt-32 pb-16 md:pb-24 px-6 max-w-3xl mx-auto min-h-screen text-center"><h2 className="text-3xl md:text-4xl font-bold tracking-[0.2em] mb-10 md:mb-12 text-[#2D2D2B]">关于信任圈小院</h2><div className="space-y-10 md:space-y-12 text-[#4A4A48] font-serif leading-loose text-base md:text-lg font-medium"><p>「信任圈小院」灵感来自帕克·帕尔默关于 Circle of Trust 的思想与实践。</p><div className="bg-white p-8 md:p-10 rounded-[32px] md:rounded-[40px] border-2 border-[#768C76]/20 shadow-md"><p className="text-[#2D2D2B] text-lg md:text-xl mb-8 tracking-widest font-bold">它试图把一种线下深度对话的精神，转化为日常的生活微小体验：</p><div className="space-y-4 text-[#768C76] font-bold"><p className="tracking-[0.4em] text-xl">慢下来 · 听见自己</p><p className="tracking-[0.4em] text-xl">学习不急着改变别人</p><p className="tracking-[0.4em] text-xl">在安静中 · 让真实慢慢浮现</p></div></div><p className="mt-8 italic font-bold text-[#8C7A66]">愿这里成为你回到自己的一处小小空地。</p></div><div className="mt-12"><Button onClick={() => navigate('hub')} className="mx-auto w-full md:w-auto text-lg px-12">开始小院探索</Button></div></div></PageTransition>
);

// --- 4. 主应用逻辑 ---

export default function App() {
  const [path, setPath] = useState('arrival');
  const [journal, setJournal] = useState([]);
  const [microStep, setMicroStep] = useState(1);
  const [userInput, setUserInput] = useState("");
  const [isAnonymized, setIsAnonymized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('cot_journal_v10');
    if (saved) setJournal(JSON.parse(saved));
  }, []);

  const saveEntry = (text) => {
    if (!text.trim()) return;
    const updated = [{ id: Date.now(), date: new Date().toLocaleDateString(), content: text }, ...journal];
    setJournal(updated);
    localStorage.setItem('cot_journal_v10', JSON.stringify(updated));
  };

  const navigate = (p) => { setPath(p); window.scrollTo(0, 0); };
  const startMicro = () => { setMicroStep(1); setUserInput(""); setIsAnonymized(false); setPath('micro'); };

  const renderContent = () => {
    switch (path) {
      case 'arrival': return <ArrivalPage navigate={navigate} onMicroStart={startMicro} />;
      case 'hub': return <HubPage navigate={navigate} onMicroStart={startMicro} />;
      case 'facilitator': return <FacilitatorPage navigate={navigate} />;
      case 'stones': return <StonesPage navigate={navigate} />;
      case 'safety': return <SafetyPage navigate={navigate} />;
      case 'about': return <AboutPage navigate={navigate} />;
      case 'daily': return <DailyQuestionPage navigate={navigate} onSave={saveEntry} />;
      case 'path': return <QuestionPathPage onSave={saveEntry} navigate={navigate} />;
      case 'micro': return <MicroCirclePage microStep={microStep} setMicroStep={setMicroStep} userInput={userInput} setUserInput={setUserInput} isAnonymized={isAnonymized} setIsAnonymized={setIsAnonymized} saveJournalEntry={saveEntry} navigate={navigate} />;
      case 'journal': return (
        <PageTransition>
          <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8 max-w-4xl mx-auto min-h-screen text-center"><h2 className="text-3xl font-bold mb-12 text-[#2D2D2B]">小院日志</h2>
            {journal.length === 0 ? (<div className="text-center py-20 md:py-24 bg-white p-10 rounded-[32px] md:rounded-[40px] border-2 border-dashed border-[#8C7A66]/30"><p className="text-[#4A4A48] mb-8 text-lg font-medium">这里还没有印记。去体验一次吧？</p><Button onClick={startMicro} variant="secondary" className="mx-auto text-lg px-12">开启旅程</Button></div>) 
            : (<div className="space-y-6 md:space-y-8 text-left">{journal.map((e) => (<div key={e.id} className="bg-white p-8 md:p-10 rounded-[28px] md:rounded-[32px] shadow-md border border-[#D2C4B5]/30"><div className="text-sm text-[#768C76] mb-3 font-bold uppercase tracking-widest">{e.date}</div><p className="text-base md:text-lg text-[#2D2D2B] font-serif leading-loose whitespace-pre-wrap font-medium">{e.content}</p></div>))}
                <button onClick={() => { if(window.confirm('确认清空所有本地日志吗？')) { setJournal([]); localStorage.removeItem('cot_journal_v10'); } }} className="text-xs text-red-700 font-bold hover:underline mt-12 block mx-auto tracking-[0.2em] uppercase">Clear History</button>
              </div>)}
          </div>
        </PageTransition>
      );
      default: return <ArrivalPage navigate={navigate} onMicroStart={startMicro} />;
    }
  };

  return (
    <div className="font-sans text-[#2D2D2B] bg-[#F8F7F2] min-h-screen selection:bg-[#768C76]/20 flex flex-col overflow-x-hidden">
      <GlobalStyles />
      <Navbar onNavigate={navigate} currentPath={path} />
      <main className="flex-1 w-full">{renderContent()}</main>
      {path !== 'arrival' && (
        <footer className="py-12 md:py-20 px-8 text-center border-t-2 border-[#D2C4B5]/40 bg-white/30 backdrop-blur-sm">
          <p className="text-xs md:text-sm tracking-[0.3em] text-[#8C7A66] font-bold uppercase">Parker J. Palmer · Circle of Trust · Courtyard 2.0</p>
        </footer>
      )}
    </div>
  );
}