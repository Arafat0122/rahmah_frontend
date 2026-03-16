import React from 'react';
import LanguageDropdown from './LanguageDropdown';

const ScholarSidebar = ({
    availability, setAvailability,
    selectedCategory, setSelectedCategory,
    selectedGender, setSelectedGender,
    selectedLang, setSelectedLang,
    CATEGORIES,
    LANGUAGES
}) => {
    return (
        <aside className="hidden lg:block w-72 shrink-0">
            {/* Sticky Wrapper */}
            <div className="sticky top-24 space-y-6 max-h-[calc(100vh-40px)] overflow-y-auto pr-2 custom-scrollbar">

                {/* Availability Toggle */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-600 mb-4">
                        Availability
                    </h3>

                    <div className="flex bg-slate-100 p-1 rounded-xl" role="group" aria-label="Filter by availability">
                        <button
                            type="button"
                            onClick={() => setAvailability("All")}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${availability === 'All'
                                ? 'bg-white shadow-sm text-primary' // Ensure 'primary' is dark enough (e.g., Indigo-600+)
                                : 'text-slate-700 hover:text-slate-900' // Darker gray for unselected state
                                }`}
                            aria-pressed={availability === 'All'}
                        >
                            All
                        </button>

                        <button
                            type="button"
                            onClick={() => setAvailability("Online")}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${availability === 'Online'
                                ? 'bg-white shadow-sm text-emerald-700' // Emerald-700 is much safer than Green-600
                                : 'text-slate-700 hover:text-slate-900'
                                }`}
                            aria-pressed={availability === 'Online'}
                        >
                            Online Now
                        </button>
                    </div>
                </div>

                {/* Focus Area / Category List */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
                        Focus Area
                    </h3>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        <button
                            onClick={() => setSelectedCategory("All")}
                            className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold transition-all ${selectedCategory === 'All' ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >All Categories</button>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold transition-all ${selectedCategory === cat ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                            >{cat}</button>
                        ))}
                    </div>
                </div>

                {/* Profile Details (Gender & Language) */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-8">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-3">
                            Preferred Gender
                        </label>
                        <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                            {["All", "Male", "Female"].map((gender) => (
                                <button
                                    key={gender}
                                    onClick={() => setSelectedGender(gender)}
                                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all duration-200 ${selectedGender === gender
                                        ? "bg-white shadow-sm text-primary ring-1 ring-slate-200/50"
                                        : "text-slate-500 hover:text-slate-700"
                                        }`}
                                >
                                    {gender}
                                </button>
                            ))}
                        </div>
                    </div>

                    <LanguageDropdown
                        selectedLang={selectedLang}
                        setSelectedLang={setSelectedLang}
                        languages={LANGUAGES}
                    />
                </div>
            </div>
        </aside>
    );
};

export default ScholarSidebar;