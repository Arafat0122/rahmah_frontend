import React from 'react';
import { X } from 'lucide-react';
import CustomDropdown from './CustomDropdown';

const ServiceMobileDrawer = ({
    isOpen,
    setIsOpen,
    selectedCategory, setSelectedCategory,
    selectedLevel, setSelectedLevel,
    categories,
    englishLevels
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex justify-end">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

            <div className="relative w-[85%] max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800">Filters</h2>
                    <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-50 rounded-full"><X size={20} /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Categories */}
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Categories</h3>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedCategory("All")}
                                className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all ${selectedCategory === 'All' ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-100'
                                    }`}
                            >All</button>
                            {categories.map(cat => (
                                <button
                                    key={cat.value}
                                    onClick={() => setSelectedCategory(cat.value)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all ${selectedCategory === cat.value ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-100'
                                        }`}
                                >{cat.label}</button>
                            ))}
                        </div>
                    </div>

                    {/* English Level */}
                    <CustomDropdown
                        label="English Level"
                        options={englishLevels}
                        selected={selectedLevel}
                        setSelected={setSelectedLevel}
                    />
                </div>

                <div className="p-6 border-t border-slate-100 bg-white">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceMobileDrawer;