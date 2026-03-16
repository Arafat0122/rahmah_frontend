import { useRef } from 'react';
import { BookOpen, Languages, ShieldCheck, GraduationCap, History, ChevronLeft, ChevronRight } from 'lucide-react';

const CategoryBar = ({ categories, selected, onSelect }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const getIcon = (cat) => {
        if (cat.includes("Arabic")) return <Languages size={18} />;
        if (cat.includes("Fiqh") || cat.includes("Zakat") || cat.includes("Finance")) return <ShieldCheck size={18} />;
        if (cat.includes("Quran") || cat.includes("Hifz") || cat.includes("Tafsir")) return <BookOpen size={18} />;
        if (cat.includes("History") || cat.includes("Seerah") || cat.includes("Civilization")) return <History size={18} />;
        return <GraduationCap size={18} />;
    };

    return (
        <nav
            className="w-full bg-slate-50 border-b border-slate-200 sticky top-0 z-40"
            aria-label="Scholar Categories"
        >
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative group">

                {/* Left Arrow - WAVE: Added aria-label and hidden from tab when not needed */}
                <div className="absolute left-0 top-0 bottom-0 flex items-center z-10 sm:px-2 bg-gradient-to-r from-slate-50 via-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => scroll('left')}
                        aria-label="Scroll categories left"
                        className="p-1.5 rounded-full border border-slate-300 bg-white shadow-sm hover:bg-slate-50 transition-colors"
                    >
                        <ChevronLeft size={20} className="text-slate-700" />
                    </button>
                </div>

                {/* Categories Container */}
                <div
                    ref={scrollRef}
                    role="tablist"
                    className="flex flex-row items-center gap-2 overflow-x-auto no-scrollbar py-4 px-2 scroll-smooth"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
                    }}
                >
                    {["All", ...categories].map((cat) => (
                        <button
                            key={cat}
                            role="tab"
                            aria-selected={selected === cat}
                            onClick={() => onSelect(cat)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border whitespace-nowrap transition-all duration-300 text-sm font-bold shrink-0 ${selected === cat
                                    ? "bg-slate-900 text-white border-slate-900 shadow-md"
                                    : "bg-white text-slate-700 border-slate-200 hover:border-primary/50 hover:bg-slate-50"
                                }`}
                        >
                            {/* Contrast Fix: Increased icon visibility */}
                            <span className={selected === cat ? "text-primary" : "text-slate-500"}>
                                {getIcon(cat)}
                            </span>
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Right Arrow */}
                <div className="absolute right-0 top-0 bottom-0 flex items-center z-10 sm:px-2 bg-gradient-to-l from-slate-50 via-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => scroll('right')}
                        aria-label="Scroll categories right"
                        className="p-1.5 rounded-full border border-slate-300 bg-white shadow-sm hover:bg-slate-50 transition-colors"
                    >
                        <ChevronRight size={20} className="text-slate-700" />
                    </button>
                </div>

            </div>
        </nav>
    );
};

export default CategoryBar;