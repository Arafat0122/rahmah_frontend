import React from 'react';
import { X } from 'lucide-react';
import LanguageDropdown from './LanguageDropdown';

const MobileFilterDrawer = ({
    isOpen,
    setIsOpen,
    availability, setAvailability,
    selectedCategory, setSelectedCategory,
    selectedGender, setSelectedGender,
    selectedLang, setSelectedLang,
    CATEGORIES,
    LANGUAGES
}) => {
    if (!isOpen) return null;

    const resetFilters = () => {
        setSelectedCategory("All");
        setAvailability("All");
        setSelectedLang("All");
        setSelectedGender("All");
    };

    return (
        <div className="fixed inset-0 z-[1000] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={() => setIsOpen(false)}
            />

            {/* Drawer Content */}
            <div className="relative w-[85%] max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Filters</h2>
                        <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">Refine your search</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2.5 bg-slate-50 text-slate-500 rounded-full active:scale-90 transition-transform"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                    {/* 1. Availability */}
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Availability</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setAvailability("All")}
                                className={`py-3.5 rounded-2xl border-2 font-bold text-xs transition-all ${availability === 'All' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 text-slate-500 bg-slate-50'
                                    }`}
                            >All</button>
                            <button
                                onClick={() => setAvailability("Online")}
                                className={`py-3.5 rounded-2xl border-2 font-bold text-xs transition-all ${availability === 'Online' ? 'border-green-500 bg-green-50 text-green-600' : 'border-slate-100 text-slate-500 bg-slate-50'
                                    }`}
                            >Online Now</button>
                        </div>
                    </div>

                    {/* 2. Focus Area */}
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Focus Area</h3>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedCategory("All")}
                                className={`px-5 py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${selectedCategory === 'All' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-100'
                                    }`}
                            >All</button>
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-5 py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${selectedCategory === cat ? 'bg-primary text-white border-primary shadow-md shadow-primary/20' : 'bg-white text-slate-600 border-slate-100'
                                        }`}
                                >{cat}</button>
                            ))}
                        </div>
                    </div>

                    {/* 3. Gender */}
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Preferred Gender</h3>
                        <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                            {["All", "Male", "Female"].map((gender) => (
                                <button
                                    key={gender}
                                    onClick={() => setSelectedGender(gender)}
                                    className={`py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${selectedGender === gender ? "bg-white shadow-md text-primary ring-1 ring-slate-200/50" : "text-slate-500"
                                        }`}
                                >{gender}</button>
                            ))}
                        </div>
                    </div>

                    {/* 4. Language Dropdown */}
                    <div className="pb-10">
                        <LanguageDropdown
                            selectedLang={selectedLang}
                            setSelectedLang={setSelectedLang}
                            languages={LANGUAGES}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 bg-white space-y-3">
                    <button
                        onClick={resetFilters}
                        className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-slate-500"
                    >
                        Reset Filters
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all"
                    >
                        Show Results
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileFilterDrawer;