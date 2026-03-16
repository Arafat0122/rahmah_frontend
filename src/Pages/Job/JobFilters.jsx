import React from 'react';
import { Filter, X, Check, RotateCcw } from 'lucide-react';

const JobFilters = ({ categories, genderOptions, selectedCategory, setSelectedCategory, selectedGender, setSelectedGender, isOpen, setIsOpen }) => {

    const clearFilters = () => {
        setSelectedCategory('all');
        setSelectedGender('all');
    };

    const FilterContent = () => (
        <div className="flex flex-col h-full">
            <div className="space-y-8 flex-1">
                {/* Category Filter */}
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 flex justify-between items-center">
                        Subject Category
                        {selectedCategory !== 'all' && <span className="text-primary lowercase font-bold">1 active</span>}
                    </h4>

                    {/* Scrollable Area for Categories */}
                    <div className="flex flex-col gap-1.5 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${selectedCategory === 'all' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                        >
                            All Categories {selectedCategory === 'all' && <Check size={14} strokeWidth={3} />}
                        </button>

                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setSelectedCategory(cat.value)}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${selectedCategory === cat.value ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                            >
                                <span className="truncate mr-2">{cat.label}</span>
                                {selectedCategory === cat.value && <Check size={14} strokeWidth={3} />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Gender Filter */}
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Gender Preference</h4>
                    <div className="grid grid-cols-2 gap-3">
                        {genderOptions.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => setSelectedGender(opt.value)}
                                className={`px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all border-2 ${selectedGender === opt.value ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-200'}`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Action */}
            <div className="mt-8 pt-6 border-t border-slate-100">
                <button
                    onClick={clearFilters}
                    className="group flex items-center justify-center gap-2 w-full py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-red-500 transition-colors"
                >
                    <RotateCcw size={12} className="group-hover:rotate-[-45deg] transition-transform" />
                    Reset Filters
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop View (Sidebar) */}
            <div className="hidden lg:block w-80 shrink-0">
                <div className="sticky top-28 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm shadow-slate-200/50 max-h-[calc(100vh-140px)] flex flex-col">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Filter size={18} className="text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Filters</h3>
                    </div>

                    <div className="overflow-y-auto pr-1 custom-scrollbar">
                        <FilterContent />
                    </div>
                </div>
            </div>

            {/* Mobile View (Drawer) */}
            {isOpen && (
                <div className="fixed inset-0 z-[200] lg:hidden">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 top-0 h-full w-[85%] max-w-[400px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                        <div className="flex items-center justify-between p-6 border-b border-slate-50">
                            <h3 className="text-xl font-bold text-slate-900">Filters</h3>
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                <X size={20} className="text-slate-500" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            <FilterContent />
                        </div>

                        <div className="p-6 bg-slate-50">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Global CSS for Custom Scrollbar */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }
            `}</style>
        </>
    );
};

export default JobFilters;