import { ArrowUpRight, BookOpen, PenTool, ShieldCheck, Globe, Scale, Landmark, MessageSquare, Search } from 'lucide-react';

const ScholarCapabilityGrid = () => {
    const capabilities = [
        {
            title: "Classical Fiqh",
            desc: "Deep immersion into the four legal schools (Madhahib) and contemporary jurisprudence for modern contexts.",
            icon: <Scale size={32} strokeWidth={1.2} />,
        },
        {
            title: "Arabic Linguistics",
            desc: "Comprehensive mastery of Nahw, Sarf, and Balagha to unlock the hidden nuance of classical Arabic texts.",
            icon: <PenTool size={32} strokeWidth={1.2} />,
        },
        {
            title: "Quranic Sciences",
            desc: "Advanced Tajweed, Hifz, and the multifaceted layers of Tafsir studies from authorized academic lineages.",
            icon: <BookOpen size={32} strokeWidth={1.2} />,
        },
        {
            title: "Hadith Studies",
            desc: "Critical analysis of Riwayah and Dirayah (chains and text) of the Prophetic legacy and preservation.",
            icon: <Landmark size={32} strokeWidth={1.2} />,
        },
        {
            title: "Islamic Creed",
            desc: "Theology (Aqidah) focused on the sound foundations of faith and traditional rational discourse.",
            icon: <ShieldCheck size={32} strokeWidth={1.2} />,
        },
        {
            title: "Civilization & Seerah",
            desc: "Historical context of the Islamic world and the profound life and character of the Messenger (PBUH).",
            icon: <Globe size={32} strokeWidth={1.2} />,
        },
        {
            title: "Ethical Finance",
            desc: "Specialized guidance on Zakat, Islamic banking, inheritance, and modern financial ethics and contracts.",
            icon: <MessageSquare size={32} strokeWidth={1.2} />,
        },
    ];

    return (
        <section className="py-24 bg-white overflow-hidden min-h-screen flex flex-col justify-center">
            <div className="max-w-[1440px] mx-auto px-6 md:px-10 w-full">

                {/* --- Header Section --- */}
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    {/* Subtle Accent Label */}
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-3 block">
                        Academic Excellence
                    </span>

                    {/* Main Bold Heading */}
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-5xl text-dark mb-4 tracking-tight leading-tight">
                        Access <span className="italic text-slate-500 font-medium">World-Class</span> Knowledge
                    </h2>

                    {/* Decorative Divider Line */}
                    <div className="w-12 h-[2px] bg-primary mx-auto mt-8 opacity-30 rounded-full"></div>
                </div>

                {/* --- Unified Table Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-slate-100">

                    {/* Items 1 - 7 */}
                    {capabilities.map((item, index) => (
                        <div
                            key={index}
                            className="group p-5 border-r border-b border-slate-100 hover:bg-slate-50/80 transition-all duration-500 min-h-[200px]"
                        >
                            <div className="flex items-start gap-6">
                                <div className="text-primary shrink-0 transition-transform duration-500 group-hover:scale-110">
                                    {item.icon}
                                </div>

                                <div className="flex flex-col gap-3">
                                    <h4 className="font-serif text-2xl font-bold text-dark leading-tight tracking-tight group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h4>
                                    <p className="text-base text-slate-500 leading-relaxed font-light">
                                        {item.desc}
                                    </p>

                                    <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 group-hover:text-primary transition-colors">
                                        Explore Discipline <ArrowUpRight size={14} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Combined Item 8 & 9 (Adjusted to match others) */}
                    <div className="lg:col-span-2 p-10 border-r border-b border-slate-100 hover:bg-slate-50/80 transition-all duration-500 min-h-[280px]">
                        <div className="flex items-start gap-6 h-full">
                            {/* Matching Icon Style */}
                            <div className="text-primary shrink-0 transition-transform duration-500 group-hover:scale-110">
                                <Search size={32} strokeWidth={1.2} />
                            </div>

                            {/* Matching Content Style */}
                            <div className="flex flex-col justify-between h-full w-full">
                                <div>
                                    <h4 className="font-serif text-2xl font-bold text-dark leading-tight tracking-tight group-hover:text-primary transition-colors mb-3">
                                        Custom Research & Specialized Mentorship
                                    </h4>
                                    <p className="text-base text-slate-500 leading-relaxed font-light max-w-2xl">
                                        Can't find your specific area of study? Our academic concierge will hand-select a specialized scholar for niche fields like Islamic Bioethics, Thesis Supervision, or Manuscript analysis.
                                    </p>
                                </div>

                                {/* Buttons adjusted for a clean professional look */}
                                <div className="mt-8 flex flex-wrap gap-4">
                                    <button className="px-8 py-4 rounded-full bg-dark text-primary-dark text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all active:scale-95 shadow-lg shadow-dark/10">
                                        Request Custom Program
                                    </button>
                                    <button className="px-8 py-4 rounded-full border border-slate-200 text-dark text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-100 transition-all active:scale-95">
                                        Become a Scholar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ScholarCapabilityGrid;