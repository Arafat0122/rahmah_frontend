import React from 'react';
import { ChevronDown } from 'lucide-react';

const ServiceFilters = ({
    categories,
    englishLevels,
    activeCategory,
    setActiveCategory,
    activeLevel,
    setActiveLevel
}) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-6 mb-12 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex flex-wrap items-center gap-4 md:gap-8">
                {/* Category Dropdown */}
                <div className="relative group">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 ml-1">Knowledge Area</label>
                    <div className="relative">
                        <select
                            value={activeCategory}
                            onChange={(e) => setActiveCategory(e.target.value)}
                            className="appearance-none bg-slate-50 border border-slate-100 text-slate-900 text-xs font-bold py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                        >
                            <option value="All">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={14} />
                    </div>
                </div>

                {/* English Level Dropdown */}
                <div className="relative group">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 ml-1">Language Level</label>
                    <div className="relative">
                        <select
                            value={activeLevel}
                            onChange={(e) => setActiveLevel(e.target.value)}
                            className="appearance-none bg-slate-50 border border-slate-100 text-slate-900 text-xs font-bold py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                        >
                            <option value="All">Any English Level</option>
                            {englishLevels.map(level => (
                                <option key={level.value} value={level.value}>{level.label}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={14} />
                    </div>
                </div>
            </div>

            {/* Result Counter */}
            <div className="hidden md:block text-right">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Showing</span>
                <p className="text-primary font-serif font-bold text-xl leading-none">Vetted Results</p>
            </div>
        </div>
    );
};

export default ServiceFilters;