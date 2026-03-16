import React from 'react';
import CustomDropdown from './CustomDropdown'; // We'll define this below

const ServiceSidebar = ({
    selectedCategory, setSelectedCategory,
    selectedLevel, setSelectedLevel,
    categories,
    englishLevels
}) => {
    return (
        <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 space-y-6">

                {/* Category Selection */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
                        Focus Area
                    </h3>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        <button
                            onClick={() => setSelectedCategory("All")}
                            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedCategory === 'All'
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            All Categories
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.value}
                                onClick={() => setSelectedCategory(cat.value)}
                                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedCategory === cat.value
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* English Level Dropdown */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <CustomDropdown
                        label="English Proficiency"
                        options={englishLevels}
                        selected={selectedLevel}
                        setSelected={setSelectedLevel}
                    />
                </div>

            </div>
        </aside>
    );
};

export default ServiceSidebar;