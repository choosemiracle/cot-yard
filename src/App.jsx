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
  Quote
} from 'lucide-react';

// --- 1. 基础 UI 组件 ---

const PageTransition = ({ children }) => (
  <div className="animate-in fade-in slide-in-from-bottom-2 duration-1000 ease-in-out">
    {children}
  </div>
);

const Button = ({ onClick, children, variant = 'primary', className = '', disabled = false }) => {
  const baseStyles = "px-8 py-3 rounded-full transition-all duration-700 ease-out transform active:scale-95 flex items-center justify-center gap-2 tracking-widest text-sm";
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

// --- 2. 核心配置文件 ---

const CONFIG = {
  touchstones: [
    {
      id: 1,
      en: "Extend and receive welcome.",
      cn: "给予欢迎，也接受欢迎。",
      summary: "在这里，我们以好客之心彼此相待。",
      reflection: "我是否允许自己也成为被欢迎的人？",
      detailCn: "表达和接受欢迎。人们在受欢迎的环境中学习效果最好。在这个圈子里，我们通过给予和接受善意来支持彼此的学习。",
      detailEn: "Extend and receive welcome. People learn best in hospitable spaces. In this circle, we support each other's learning by giving and receiving hospitality."
    },
    {
      id: 2,
      en: "Be present as fully as possible.",
      cn: "尽可能全然在场。",
      summary: "带着你的完整状态来到这里，包括疑虑、疲惫、喜悦与不确定。",
      reflection: "此刻，我是否允许完整的自己出现？",
      detailCn: "以最大可能的整全的状态于当下。在此处，带着你的疑惑、恐惧和弱点，同时带着你的信念、快乐和成功，在此处，带着你的倾听去表达。",
      detailEn: "Be present as fully as possible. Be here with your doubts, fears, and failings as well as your convictions, joys, and successes, your listening as well as your speaking."
    },
    {
      id: 3,
      en: "What is offered in the circle is by invitation, not demand.",
      cn: "所有分享，源于邀请，而非要求。",
      summary: "你的灵魂知道自己的节奏。",
      reflection: "我是否能尊重自己不说话的权利？",
      detailCn: "邀请，而不是要求。这不是一个“必须分享，否则后悔”的活动！在这次活动期间，做任何你灵魂所呼唤的事情，并且知道你在我们的支持下。你的灵魂比我们更了解你的需求。",
      detailEn: "What is offered in the circle is by invitation, not demand. This is not a \"share or die\" event! During this retreat, do whatever your soul calls for, and know that you do it with our support. Your soul knows your needs better than we do."
    },
    {
      id: 4,
      en: "Speak your truth in ways that respect other people's truth.",
      cn: "说出自己的真实，也尊重他人的真实。",
      summary: "真实不是用来压倒别人，而是放在圆心中被温柔见证。",
      reflection: "我能否说‘我’的经验，而不是解释‘你’的问题？",
      detailCn: "表达自己的时候，需要尊重别人表达的事实。我们对事实的看法可能会有所不同，但是在一个信任圆圈里说出一个人的观点并不意味着解释、纠正或者辩论别人表达的东西。从你的中心出发，来到圈子的中心去说话，使用“我”的陈述，相信人们会做他们自己的评估和筛选。",
      detailEn: "Speak your truth in ways that respect other people's truth. Our views of reality may differ, but speaking one's truth in a circle of trust does not mean interpreting, correcting, or debating what others say. Speak from your center to the center of the circle, using \"I\" statements, trusting people to do their own sifting and winnowing."
    },
    {
      id: 5,
      en: "No fixing, saving, advising, or correcting.",
      cn: "不修复，不拯救，不建议，不纠正。",
      summary: "真正的陪伴，不急着把别人带离他的处境。",
      reflection: "我在听别人说话时，最容易急着做什么？",
      detailCn: "不修复，不拯救，不建议，也不纠正对方。对于我们这些从事“帮助人”的人来说，这是最难的准则之一。但如果我们希望创造一个欢迎灵魂的空间，这是最重要的规则之一。",
      detailEn: "No fixing, no saving, no advising, and no setting each other straight. This is one of the hardest guidelines for those of us in the \"helping professions.\" But it is one of the most vital rules if we wish to make a space that welcomes the soul, the inner teacher."
    },
    {
      id: 6,
      en: "Learn to respond with honest, open questions.",
      cn: "学习用诚实、开放的问题回应。",
      summary: "好问题不是引导别人到我的答案，而是帮助他听见自己的答案。",
      reflection: "我能提出一个没有隐藏建议的问题吗？",
      detailCn: "用诚实、开放的问题来回应别人，而不是建议或纠正。通过这样的问题，我们可以帮助“倾听彼此，进入更深的交流。”",
      detailEn: "Learn to respond to others with honest, open questions instead of counsel or corrections. With such questions, we help \"hear each other into deeper speech.\""
    },
    {
      id: 7,
      en: "When the going gets rough, turn to wonder.",
      cn: "当关系变得困难，转向好奇。",
      summary: "困惑时，不急着判断，先问：这里发生了什么？",
      reflection: "我最近一次把判断转为好奇，是在什么时候？",
      detailCn: "当进行不顺利时，转念为好奇。如果你感到评判或防御，问问自己，“我想知道，是什么让她这么认为的?” 或者 “他现在是什么感觉?” 或者“我的反应让我了解了自己什么?” 抛开评判，更深入地倾听别人和自己。",
      detailEn: "When the going gets rough, turn to wonder. If you feel judgmental or defensive, ask yourself, \"I wonder, what might have brought her to this belief?\" or \"What is he feeling right now?\" or \"What does my reaction teach me about myself?\" Set aside judgment to listen to others-and to yourself-more deeply."
    },
    {
      id: 8,
      en: "Attend to your own inner teacher.",
      cn: "聆听你内在的老师。",
      summary: "最深的指引，不总在外面，也在你里面。",
      reflection: "我内在的老师，最近在提醒我什么？",
      detailCn: "关注你内心的老师。我们当然会向别人学习。但当我们在一个信任圆圈里探索诗歌、故事、问题和静默时，我们就有了一个从内心学习的特殊机会。所以要密切关注你自己的反应和回应，关注你最重要的老师。",
      detailEn: "Attend to your own inner teacher. We learn from others, of course. But as we explore poems, stories, questions, and silence in a circle of trust, we have a special opportunity to learn from within. So pay close attention to your own reactions and responses, to your most important teacher."
    },
    {
      id: 9,
      en: "Trust and learn from the silence.",
      cn: "信任沉默，并向沉默学习。",
      summary: "沉默不是空白，而是真实慢慢浮现的地方。",
      reflection: "我能否不急着填满沉默？",
      detailCn: "相信并从静默中学习。静默是我们这个嘈杂世界的礼物，也是了解自身的一种方式。把静默当作小组的一员。在某人说完话之后，花点时间反思，不要立刻用言语填满空间。",
      detailEn: "Trust and learn from the silence. Silence is a gift in our noisy world and a way of knowing in itself. Treat silence as a member of the group. After someone has spoken, take time to reflect without immediately filling the space with words."
    },
    {
      id: 10,
      en: "Commit to and maintain confidentiality.",
      cn: "承诺并守护保密。",
      summary: "安全感来自彼此对边界的共同守护。",
      reflection: "我是否值得别人把真实托付给我？",
      detailCn: "严格保密。信任来自于知道团队成员尊重信任，认真对待隐私和谨慎的道德规范。",
      detailEn: "Observe deep confidentiality. Trust comes from knowing that group members honor confidences and take seriously the ethics of privacy and discretion."
    },
    {
      id: 11,
      en: "Believe seeds will grow.",
      cn: "相信你会带着自己真正需要的东西离开。",
      summary: "你未必得到答案，但可能带走更深的清明。",
      reflection: "如果今天只带走一样东西，我希望是什么？",
      detailCn: "相信种子会成长。从一开始就知道，你可能会在这个圈子结束的时候，拿到了你需要的东西。还要知道，在这里种下的种子可以在未来的日子里继续生长。",
      detailEn: "Know that it's possible to leave the circle with whatever it was that you needed when you arrived. Know that the seeds planted here can keep growing in the days ahead."
    }
  ],
  questionLibrary: [
    { text: "你最近一次真正被听见，是在什么时候？", category: "自我觉察" },
    { text: "此刻的你，最需要被温柔看见的是什么？", category: "自我觉察" },
    { text: "你正在把哪一部分自己藏起来？", category: "自我觉察" },
    { text: "如果不需要表现，你现在会怎样坐在这里？", category: "自我觉察" },
    { text: "你生命里正在关闭的一扇门，也许在保护什么？", category: "自我觉察" },
    { text: "你真正想守护的东西是什么？", category: "自我觉察" },
    { text: "今天，你愿意对自己的真实说一句什么？", category: "自我觉察" },
    { text: "有哪些时刻，你感到自己是“整全”的，而不是分裂的？", category: "自我觉察" }
  ],
  witnessPool: [
    "“我终于允许自己不再完美了。”",
    "“在静默中，我听见了一直被我忽略的叹息。”",
    "“原来不给建议，才是最深切的关怀。”",
    "“我正在学习如何站在‘悲剧性的间隔’里。”",
    "“我的灵魂很害羞，需要安静才会出来。”"
  ]
};

// --- 3. 全局样式 ---

const GlobalStyles = () => (
  <style>{`
    @keyframes slowFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes shadowMove {
      0% { transform: rotate(0deg) translateX(0); opacity: 0.05; }
      50% { transform: rotate(2deg) translateX(10px); opacity: 0.1; }
      100% { transform: rotate(0deg) translateX(0); opacity: 0.05; }
    }
    @keyframes breathe {
      0% { transform: scale(1); opacity: 0.3; }
      50% { transform: scale(1.6); opacity: 0.1; }
      100% { transform: scale(1); opacity: 0.3; }
    }
    .animate-slow-fade { animation: slowFadeIn 2s ease-out forwards; }
    .delay-1s { animation-delay: 1s; opacity: 0; }
    .delay-2s { animation-delay: 2s; opacity: 0; }
    .delay-3s { animation-delay: 3s; opacity: 0; }
    .bamboo-shadow { animation: shadowMove 15s ease-in-out infinite; }
    .breathe-circle { animation: breathe 8s ease-in-out infinite; }
    
    .card-base { transition: all 0.8s cubic-bezier(0.2, 1, 0.3, 1); border: 1px solid rgba(210, 196, 181, 0.1); }
    .card-base:hover { transform: translateY(-8px); box-shadow: 0 20px 40px -15px rgba(210, 196, 181, 0.3); border-color: rgba(210, 196, 181, 0.5); background: white; }

    .stone-card {
      background: #FDFCF8;
      background-image: radial-gradient(circle at 90% 10%, rgba(197, 179, 88, 0.08) 0%, transparent 40%);
    }

    .learn-chapter-title {
      position: relative;
    }
    .learn-chapter-title::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -10px;
      width: 40px;
      height: 2px;
      background: #768C76;
      opacity: 0.3;
    }
  `}</style>
);

// --- 4. 导航组件 ---

const Navbar = ({ onNavigate, currentPath }) => {
  if (currentPath === 'arrival') return null;
  return (
    <nav className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-[#F8F7F2]/60 backdrop-blur-md">
      <div 
        className="text-[#4A4A48] font-serif italic cursor-pointer text-lg tracking-widest flex items-center gap-2"
        onClick={() => onNavigate('hub')}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#768C76]"></span>
        信任圈小院
      </div>
      <Button variant="ghost" onClick={() => onNavigate('hub')} className="p-2">
        <Home size={18} strokeWidth={1.5} />
      </Button>
    </nav>
  );
};

// --- 5. 各功能页面 ---

/**
 * 认识信任圈页面
 */
const LearnPage = ({ navigate }) => {
  const chapters = [
    {
      title: "1. 它不是普通分享会",
      content: "在信任圈里，重点不是表达得多好，也不是观点多正确，而是让每个人都有机会靠近自己的真实。这里不追求共鸣的快感，只追求看见的深度。",
      question: "你是否也有过在人群中感到必须“表现”得很优秀的时刻？"
    },
    {
      title: "2. 它不是心理治疗",
      content: "信任圈尊重人的痛苦，但不诊断、不治疗、不分析。它通过创造一个极度安全、互不侵犯的空间，让人听见自己内在那个被压抑的声音。我们相信：最好的治疗是听见自己。",
      question: "你最近是否也在扮演一个很累的角色，忽略了内在的声音？"
    },
    {
      title: "3. 它不是讨论会",
      content: "这里不争辩、不说服、不抢答案。我们学习把真理放在圆心，而不是把自己放在中心。每个人的分享都是投向圆心的一块石子，波纹扩散，却不互相碰撞。",
      question: "如果不再需要争辩对错，你的心会感到轻松一点吗？"
    },
    {
      title: "4. 它的核心精神：四不原则",
      isSpecial: true,
      content: "为了保护“害羞的灵魂”，我们共同承诺：",
      nos: ["不修复", "不拯救", "不建议", "不纠正"],
      question: "这四个“不”中，哪一个最让你感到意外或挑战？"
    },
    {
      title: "5. 它相信什么",
      content: "我们相信每个人内在都有一种更深的智慧，帕克·帕尔默称之为“内在导师”。真正的帮助，不是替别人找到答案，而是创造条件，让答案从他自己的生命中浮现。",
      question: "你是否也有过被急着给建议，反而感到更加孤独的时刻？"
    },
    {
      title: "6. 它带人去哪里",
      content: "信任圈的终点不是一个结论，而是一种状态：从分裂回到整全，从角色回到真实，从孤独回到连接，从恐惧回到信任。",
      question: "如果此时有人不急着改变你，你最想对自己说一句什么？"
    }
  ];

  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-8 max-w-4xl mx-auto min-h-screen">
        <header className="text-center mb-24">
          <h2 className="text-3xl md:text-4xl font-light tracking-[0.5em] mb-8 text-[#4A4A48]">信任圈是什么？</h2>
          <div className="max-w-xl mx-auto">
             <Quote className="text-[#D2C4B5] mb-4 mx-auto" size={32} strokeWidth={1} />
             <p className="text-lg md:text-xl font-serif italic text-[#4A4A48] leading-relaxed tracking-wider">
               “信任圈，是一群人围坐在一起，<br/>学习不急着改变彼此，而是安静地听见真实。”
             </p>
          </div>
        </header>

        <div className="space-y-32">
          {chapters.map((chap, index) => (
            <section key={index} className="relative">
              <h3 className="learn-chapter-title text-xl font-medium tracking-widest text-[#4A4A48] mb-8">
                {chap.title}
              </h3>
              
              <div className="pl-6 border-l border-[#D2C4B5]/30">
                <p className="text-[#8C8C88] leading-loose text-base font-serif tracking-wide mb-8">
                  {chap.content}
                </p>

                {chap.isSpecial && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {chap.nos.map((no, idx) => (
                      <div key={idx} className="bg-white/60 p-4 rounded-2xl text-center border border-[#768C76]/20 shadow-sm">
                        <span className="text-[#768C76] font-semibold tracking-widest">{no}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-[#768C76]/5 p-8 rounded-3xl relative overflow-hidden group hover:bg-[#768C76]/10 transition-all duration-700">
                  <div className="absolute top-2 right-4 opacity-10 text-[#768C76] group-hover:scale-110 transition-transform">
                    <Sparkles size={40} />
                  </div>
                  <p className="text-sm italic text-[#768C76] font-serif leading-relaxed tracking-widest relative z-10">
                    “{chap.question}”
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-40 pt-20 border-t border-[#D2C4B5]/30 text-center">
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Button onClick={() => navigate('micro')} className="min-w-[220px]">体验一次微型信任圈</Button>
            <Button variant="secondary" onClick={() => navigate('stones')} className="min-w-[220px]">阅读十一条基石</Button>
          </div>
          <button 
            onClick={() => navigate('hub')}
            className="mt-12 text-xs tracking-[0.4em] text-[#D2C4B5] hover:text-[#4A4A48] transition-colors uppercase font-light"
          >
            <ArrowLeft size={12} className="inline mr-2" /> 返回小院入口
          </button>
        </footer>
      </div>
    </PageTransition>
  );
};

// --- (其他页面组件保持逻辑，整合到 renderContent) ---

const Arrival = ({ navigate, onMicroStart }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#F8F7F2] relative overflow-hidden select-none">
    <GlobalStyles />
    <div className="absolute top-[-10%] right-[-5%] text-[#768C76] bamboo-shadow pointer-events-none">
      <Wind size={600} strokeWidth={0.2} />
    </div>
    <div className="text-center max-w-3xl z-10 space-y-12">
      <div className="animate-slow-fade opacity-0">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#D2C4B5] font-light">Circle of Trust · A clearing for the inner life</p>
      </div>
      <div className="animate-slow-fade delay-1s">
        <h1 className="text-3xl md:text-5xl font-light tracking-[0.3em] text-[#4A4A48] leading-tight">「你不需要表现，<br className="md:hidden" />只需要在这里。」</h1>
      </div>
      <div className="animate-slow-fade delay-2s max-w-md mx-auto">
        <p className="text-[#8C8C88] text-sm md:text-base font-serif leading-loose tracking-wider">这里是一处数字化的小院，邀请你慢一点，<br/>听见自己，也学习如何听见他人。</p>
      </div>
      <div className="animate-slow-fade delay-3s pt-8">
        <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
          <Button onClick={() => navigate('hub')} className="min-w-[160px]">进入小院</Button>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={onMicroStart}>体验一次</Button>
            <Button variant="ghost" onClick={() => navigate('about')}>我先看看</Button>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute bottom-12 text-center w-full animate-slow-fade delay-3s">
      <p className="text-[11px] tracking-[0.2em] text-[#D1CEC1] font-light">「向内，不是退缩；安静，不是沉默失语。」</p>
    </div>
  </div>
);

const Hub = ({ navigate, onMicroStart }) => {
  const menuItems = [
    { id: 'micro', Icon: Waves, title: '微型信任圈', desc: '用三到五分钟，停下来，听见此刻的自己。', btn: '开始体验' },
    { id: 'daily', Icon: Sparkles, title: '每日一问', desc: '一个开放而诚实的问题，陪你走近真实。', btn: '抽取今日问题' },
    { id: 'learn', Icon: BookOpen, title: '认识信任圈', desc: '了解它的精神、边界、方法与温柔力量。', btn: '慢慢了解' },
    { id: 'stones', Icon: ShieldCheck, title: '十一条基石', desc: '信任圈的底层共识，守护真实的篱笆。', btn: '踏入基石' }
  ];

  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-8 max-w-6xl mx-auto min-h-screen">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-light tracking-[0.4em] text-[#4A4A48] mb-6">今天，你想如何进入？</h2>
          <p className="text-[#8C8C88] font-serif text-sm tracking-widest leading-relaxed opacity-80">你可以只是看看，也可以停下来体验一次。这里的一切，都是邀请，不是要求。</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {menuItems.map((item) => (
            <div key={item.id} className="card-base group bg-white/40 p-10 md:p-12 rounded-[40px] flex flex-col items-center text-center relative overflow-hidden">
              <div className="mb-8 text-[#D2C4B5] group-hover:text-[#768C76] transition-colors duration-700 relative z-10">
                <item.Icon size={40} strokeWidth={1.2} />
              </div>
              <h3 className="text-xl font-medium mb-4 text-[#4A4A48] tracking-[0.2em] relative z-10">{item.title}</h3>
              <p className="text-sm text-[#8C8C88] mb-10 font-serif h-12 max-w-xs relative z-10 opacity-90">{item.desc}</p>
              <Button onClick={() => item.id === 'micro' ? onMicroStart() : navigate(item.id)} variant="secondary" className="group-hover:bg-[#4A4A48] group-hover:text-white relative z-10 px-10">{item.btn}</Button>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 pt-12 border-t border-[#D2C4B5]/20 text-[10px] tracking-[0.3em] uppercase text-[#D2C4B5]">
          {['stones', 'safety', 'journal', 'about'].map(id => (
            <button key={id} onClick={() => navigate(id)} className="hover:text-[#768C76] transition-colors">
              {{stones:'十一条基石', safety:'安全与边界', journal:'小院日志', about:'关于小院'}[id]}
            </button>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

const StoneCard = ({ stone, onSave }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.stopPropagation();
    onSave(`[收藏基石 ${stone.id}] ${stone.cn}\n反思：${stone.reflection}`);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div onClick={() => setIsExpanded(!isExpanded)} className="stone-card card-base p-8 rounded-[32px] cursor-pointer relative overflow-hidden flex flex-col">
      <div className="absolute top-0 right-0 opacity-[0.04] pointer-events-none translate-x-1/4 -translate-y-1/4"><Wind size={240} strokeWidth={0.5} /></div>
      <div className="flex justify-between items-start mb-6 relative z-10">
        <span className="text-4xl font-serif text-[#D2C4B5]/40 leading-none">0{stone.id}</span>
        <button onClick={handleSave} className={`p-2 transition-all duration-500 ${isSaved ? 'text-[#768C76] scale-110' : 'text-[#D2C4B5] hover:text-[#768C76]'}`}>
          {isSaved ? <CheckCircle2 size={20} /> : <Bookmark size={20} />}
        </button>
      </div>
      <div className="relative z-10 flex-1">
        <h3 className="text-xl font-medium tracking-[0.1em] text-[#4A4A48] mb-2">{stone.cn}</h3>
        <p className="text-xs text-[#8C8C88] font-serif italic mb-4 opacity-70 leading-relaxed">{stone.en}</p>
        <div className="border-l-2 border-[#C5B358]/40 pl-5 mb-4"><p className="text-sm text-[#4A4A48] leading-relaxed font-medium">「{stone.summary}」</p></div>
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-[#D2C4B5]/20 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="bg-white/40 p-6 rounded-2xl border border-[#D2C4B5]/10">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#D2C4B5] block mb-4 font-bold">深度解读</span>
              <p className="text-base font-semibold text-[#4A4A48] leading-relaxed mb-4">{stone.detailCn}</p>
              <p className="text-xs text-[#8C8C88] font-serif italic leading-relaxed opacity-60">{stone.detailEn}</p>
            </div>
            <div className="mt-4 bg-[#768C76]/5 p-4 rounded-xl border-l-4 border-[#768C76]">
              <p className="text-xs text-[#768C76] font-serif tracking-widest leading-relaxed">反思提问：{stone.reflection}</p>
            </div>
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-center text-[#D2C4B5] opacity-40">{isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</div>
    </div>
  );
};

const StonesPage = ({ navigate, onSave, onMicroStart }) => (
  <PageTransition>
    <div className="pt-32 pb-24 px-8 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-24 max-w-3xl mx-auto">
        <div className="flex justify-center mb-6 text-[#768C76] opacity-60"><ShieldCheck size={48} strokeWidth={1} /></div>
        <h2 className="text-3xl md:text-4xl font-light tracking-[0.5em] mb-8 text-[#4A4A48]">十一条基石原则</h2>
        <p className="text-[#8C8C88] text-sm tracking-widest leading-loose font-serif">基石不是规则墙，而是守护真实出现的篱笆。<br className="hidden md:block" />点击卡片展开详情，感受文字背后的温柔与力量。</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
        {CONFIG.touchstones.map((stone) => <StoneCard key={stone.id} stone={stone} onSave={onSave} />)}
      </div>
      <div className="text-center pt-20 border-t border-[#D2C4B5]/30 max-w-2xl mx-auto">
        <Button onClick={onMicroStart} className="mx-auto min-w-[200px]">开始一次微型体验</Button>
      </div>
    </div>
  </PageTransition>
);

const SafetyPage = ({ navigate }) => (
  <PageTransition>
    <div className="pt-32 pb-24 px-8 max-w-4xl mx-auto min-h-screen">
      <div className="text-center mb-20 max-w-2xl mx-auto">
        <h2 className="text-3xl font-light tracking-[0.4em] mb-8">这里如何守护安全</h2>
        <p className="text-[#8C8C88] font-serif leading-loose tracking-widest text-sm">「真正温柔的空间，不是没有边界，而是边界清楚，所以人可以放松。」</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {[
          { title: "你不需要分享", icon: <Users size={24}/>, desc: "所有表达都是邀请，不是要求。沉默也是一种参与。在圆圈里，静默拥有与言语同等的价值。" },
          { title: "没有人会分析你", icon: <EyeOff size={24}/>, desc: "这里不诊断、不解释你的生命、不替你定义问题。我们练习作为见证者，而非评论员。" },
          { title: "没有人会急着修复你", icon: <Shield size={24}/>, desc: "我们相信，每个人内在都有自己的节奏与智慧。我们放下改变他人的冲动，转而创造守护真实的空间。" },
          { title: "你的文字默认只属于你", icon: <PenTool size={24}/>, desc: "小院日志默认保存在本地浏览器中，我们不存储你的私密书写。匿名分享必须由你主动勾选。" }
        ].map((p, i) => (
          <div key={i} className="bg-white/50 p-10 rounded-[32px] border border-[#D2C4B5]/20 hover:bg-white transition-all duration-700">
            <div className="text-[#768C76] mb-6 opacity-60">{p.icon}</div>
            <h4 className="text-lg font-medium mb-4 tracking-widest text-[#4A4A48]">{p.title}</h4>
            <p className="text-sm text-[#8C8C88] leading-loose font-serif">{p.desc}</p>
          </div>
        ))}
      </div>
      <div className="bg-[#D2C4B5]/10 p-10 rounded-[40px] border border-[#D2C4B5]/10 text-center">
        <h4 className="font-bold tracking-widest text-[#4A4A48] mb-4">重要提醒：这里不是心理治疗</h4>
        <p className="text-sm text-[#8C8C88] leading-loose font-serif">如果你正处于严重心理危机，请联系专业心理咨询师或当地紧急援助。</p>
      </div>
    </div>
  </PageTransition>
);

const AboutPage = ({ navigate }) => (
  <PageTransition>
    <div className="pt-32 pb-24 px-8 max-w-3xl mx-auto min-h-screen text-center">
      <h2 className="text-3xl font-light tracking-[0.4em] mb-12 text-[#4A4A48]">关于信任圈小院</h2>
      <div className="space-y-12 text-[#8C8C88] font-serif leading-loose text-left mb-20">
        <p>「信任圈小院」灵感来自帕克·帕尔默关于 Circle of Trust 的思想与实践。</p>
        <div className="bg-white p-10 rounded-[40px] border border-[#D2C4B5]/20 shadow-sm text-center">
          <p className="text-[#4A4A48] text-lg mb-8 tracking-widest font-light">它试图把一种线下深度对话中的精神，转化为日常生活中也能接触的微小体验：</p>
          <div className="space-y-4 text-[#768C76] font-medium">
            <p className="tracking-[0.4em]">慢下来 · 听见自己</p>
            <p className="tracking-[0.4em]">学习不急着改变别人</p>
            <p className="tracking-[0.4em]">在安静中 · 让真实慢慢浮现</p>
          </div>
        </div>
        <p>这里不是心理治疗，也不是宗教团契。它更像一座小院：你可以路过，可以坐一会儿，可以带着一个问题离开，也可以慢慢学习如何为他人守护这样的空间。</p>
      </div>
      <div className="pt-12 border-t border-[#D2C4B5]/20">
        <p className="text-lg font-light text-[#4A4A48] tracking-widest mb-16">「愿这里成为你回到自己的一处小小空地。」</p>
        <Button onClick={() => navigate('hub')}>进入小院探索</Button>
      </div>
    </div>
  </PageTransition>
);

const MicroExperience = ({ microStep, setMicroStep, hasSlept, setHasSlept, userInput, setUserInput, isAnonymized, setIsAnonymized, saveJournalEntry, navigate }) => {
  const randomQuestion = useMemo(() => {
    const questions = CONFIG.questionLibrary;
    return questions[Math.floor(Math.random() * questions.length)].text;
  }, []);
  const randomWitness = useMemo(() => CONFIG.witnessPool[Math.floor(Math.random() * CONFIG.witnessPool.length)], []);

  useEffect(() => {
    if (microStep === 1) {
      const timer = setTimeout(() => setHasSlept(true), 12000); 
      return () => clearTimeout(timer);
    }
  }, [microStep, setHasSlept]);

  if (microStep === 1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-[#F8F7F2] overflow-hidden">
        <div className="relative mb-20"><div className="breathe-circle w-32 h-32 rounded-full bg-[#768C76]/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" /><div className="w-16 h-16 rounded-full border border-[#768C76] relative z-10" /></div>
        <div className="space-y-6"><h2 className="text-2xl font-light tracking-widest text-[#4A4A48]">先不要继续。</h2><p className="text-[#8C8C88] font-serif leading-loose">让自己慢一点。<br/>把注意力带回呼吸。</p><div className="text-[#768C76] text-sm tracking-widest opacity-60 animate-pulse">吸气 · 呼气</div><div className="pt-12">{!hasSlept ? <div className="text-[10px] text-[#D2C4B5] uppercase tracking-widest">安顿中...</div> : <Button onClick={() => setMicroStep(2)} className="mx-auto">我准备好了</Button>}</div></div>
      </div>
    );
  }

  if (microStep === 2) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-[#F8F7F2]">
        <div className="max-w-2xl"><span className="text-[10px] tracking-[0.3em] uppercase text-[#D2C4B5] mb-8 block">今日问题</span><h2 className="text-3xl font-serif italic mb-8 text-[#4A4A48] leading-relaxed">“{randomQuestion}”</h2><p className="text-xs text-[#8C8C88] mb-16 tracking-widest">不必急着回答。让问题先在心里停一会儿。</p><Button onClick={() => setMicroStep(3)} className="mx-auto">带着这个问题继续</Button></div>
      </div>
    );
  }

  if (microStep === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#F8F7F2]">
        <div className="w-full max-w-xl">
          <h2 className="text-xl font-light mb-4 text-[#4A4A48] tracking-widest">写下一句话</h2>
          <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} className="w-full h-40 p-6 rounded-3xl border border-[#D2C4B5]/30 bg-white/50 focus:bg-white focus:outline-none transition-all duration-500 mb-8 text-[#4A4A48]" placeholder="此刻，我想说……" />
          <div className="flex items-center gap-4 mb-12"><input type="checkbox" id="anon" checked={isAnonymized} onChange={(e) => setIsAnonymized(e.target.checked)} className="w-4 h-4 accent-[#768C76]" /><label htmlFor="anon" className="text-xs text-[#8C8C88]">我愿意匿名放入小院，让后来的人被这一句话陪伴</label></div>
          <Button onClick={() => { saveJournalEntry(userInput); setMicroStep(4); }} disabled={!userInput} className="w-full">安静放下</Button>
        </div>
      </div>
    );
  }

  if (microStep === 4) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-[#F8F7F2]">
        <div className="max-w-2xl"><h2 className="text-xl font-light mb-12 text-[#4A4A48] tracking-widest">{isAnonymized ? "你的这句话，已经轻轻放入小院。" : "这句话只属于你。它已经被你自己听见。"}</h2><div className="bg-white/60 p-16 rounded-[40px] border border-[#D2C4B5]/10 mb-12 shadow-sm backdrop-blur-sm"><p className="text-xl text-[#4A4A48] font-serif italic leading-relaxed">{isAnonymized ? randomWitness : "（深呼吸，听见内心的回音）"}</p></div><Button onClick={() => setMicroStep(5)} className="mx-auto">继续收束</Button></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-[#F8F7F2]">
      <div className="max-w-md"><h2 className="text-2xl font-light mb-8 text-[#4A4A48] tracking-widest">谢谢你愿意停在这里</h2><p className="text-[#8C8C88] mb-16 leading-loose font-serif">愿你把此刻的一点真实，轻轻带回今天的生活。</p><div className="flex gap-4 justify-center"><Button onClick={() => navigate('hub')} variant="secondary">回到小院</Button><Button onClick={() => setMicroStep(1)} variant="ghost">再来一个问题</Button></div></div>
    </div>
  );
};

// --- 6. 主应用组件 ---

export default function App() {
  const [path, setPath] = useState('arrival');
  const [journal, setJournal] = useState([]);
  const [microStep, setMicroStep] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isAnonymized, setIsAnonymized] = useState(false);
  const [hasSlept, setHasSlept] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('cot_journal_v3');
    if (saved) setJournal(JSON.parse(saved));
  }, []);

  const saveJournalEntry = (text) => {
    if (!text.trim()) return;
    const newEntry = { id: Date.now(), date: new Date().toLocaleDateString(), content: text };
    const updated = [newEntry, ...journal];
    setJournal(updated);
    localStorage.setItem('cot_journal_v3', JSON.stringify(updated));
  };

  const navigate = (newPath) => {
    setPath(newPath);
    window.scrollTo(0, 0);
  };

  const startMicro = () => {
    setMicroStep(1); setHasSlept(false); setUserInput(""); setIsAnonymized(false); setPath('micro');
  };

  const renderContent = () => {
    switch (path) {
      case 'arrival': return <Arrival navigate={navigate} onMicroStart={startMicro} />;
      case 'hub': return <Hub navigate={navigate} onMicroStart={startMicro} />;
      case 'safety': return <SafetyPage navigate={navigate} />;
      case 'about': return <AboutPage navigate={navigate} />;
      case 'stones': return <StonesPage navigate={navigate} onSave={saveJournalEntry} onMicroStart={startMicro} />;
      case 'learn': return <LearnPage navigate={navigate} />;
      case 'journal': return (
        <PageTransition>
          <div className="pt-32 pb-24 px-8 max-w-4xl mx-auto min-h-screen">
            <h2 className="text-3xl font-light mb-6 tracking-widest text-[#4A4A48] text-center">小院日志</h2>
            {journal.length === 0 ? (
              <div className="text-center py-24 bg-white/30 rounded-[40px] border border-dashed border-[#D2C4B5]/40"><p className="text-[#D2C4B5] tracking-widest">这里还没有印记。去体验一次吧？</p><Button onClick={startMicro} variant="secondary" className="mt-10 mx-auto">开启旅程</Button></div>
            ) : (
              <div className="space-y-8">
                {journal.map((entry) => (
                  <div key={entry.id} className="bg-white/70 p-10 rounded-[30px] shadow-sm border border-[#D2C4B5]/10">
                    <div className="text-[10px] text-[#D2C4B5] mb-6 tracking-[0.3em] font-light uppercase">{entry.date}</div>
                    <p className="text-[#4A4A48] leading-loose font-serif text-lg whitespace-pre-wrap">{entry.content}</p>
                  </div>
                ))}
                <button onClick={() => { if(window.confirm('清除日志？')) { setJournal([]); localStorage.removeItem('cot_journal_v3'); } }} className="text-[10px] text-[#D1CEC1] hover:text-red-300 uppercase mt-12 tracking-widest">Clear History</button>
              </div>
            )}
          </div>
        </PageTransition>
      );
      case 'micro':
        return <MicroExperience microStep={microStep} setMicroStep={setMicroStep} hasSlept={hasSlept} setHasSlept={setHasSlept} userInput={userInput} setUserInput={setUserInput} isAnonymized={isAnonymized} setIsAnonymized={setIsAnonymized} saveJournalEntry={saveJournalEntry} navigate={navigate} />;
      case 'daily':
      case 'path':
      case 'facilitator':
        return (
          <PageTransition>
            <div className="pt-32 px-8 text-center min-h-screen flex flex-col justify-center items-center">
              <div className="w-16 h-16 border border-[#D2C4B5] rounded-full flex items-center justify-center mb-10 opacity-40 animate-pulse"><Leaf size={24} className="text-[#D2C4B5]" /></div>
              <h2 className="text-xl font-light mb-6 tracking-[0.2em] text-[#4A4A48]">此角落正在静默生长</h2>
              <Button variant="secondary" onClick={() => navigate('hub')}>去别处看看</Button>
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
      <main>{renderContent()}</main>
      {path !== 'arrival' && (
        <footer className="py-20 px-8 text-center border-t border-[#D2C4B5]/10 bg-[#F8F7F2]">
          <p className="text-[9px] tracking-[0.4em] text-[#D2C4B5] uppercase">Parker J. Palmer · Circle of Trust · Courtyard 2.0</p>
        </footer>
      )}
    </div>
  );
}