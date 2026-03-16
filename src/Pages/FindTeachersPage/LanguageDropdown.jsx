import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';

const LanguageDropdown = ({ selectedLang, setSelectedLang, languages }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-3">
                Instruction Language
            </label>

            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between pl-4 pr-4 py-3 bg-slate-50 border transition-all duration-200 rounded-2xl ${
                    isOpen
                        ? "border-primary/30 ring-4 ring-primary/5 bg-white"
                        : "border-slate-100 hover:border-slate-200"
                }`}
            >
                <div className="flex items-center gap-3">
                    <Globe size={16} className={`${isOpen ? "text-primary" : "text-slate-500"} transition-colors`} />
                    <span className="text-sm font-bold text-slate-700">
                        {selectedLang === "All" ? "Any Language" : selectedLang}
                    </span>
                </div>
                <ChevronDown
                    size={16}
                    className={`text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {/* Custom Dropdown Menu (Positioned on TOP) */}
            {isOpen && (
                <div className="absolute z-[110] w-full bottom-full mb-2 bg-gray-50 border border-slate-100 shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200 origin-bottom">
                    <div className="max-h-60 overflow-y-auto custom-scrollbar p-2">
                        <button
                            onClick={() => { setSelectedLang("All"); setIsOpen(false); }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                                selectedLang === "All" ? "bg-primary/5 text-primary" : "text-slate-600 hover:bg-slate-50"
                            }`}
                        >
                            Any Language
                            {selectedLang === "All" && <Check size={14} />}
                        </button>

                        <div className="h-px bg-slate-100 my-1 mx-2" />

                        {languages.map((l) => (
                            <button
                                key={l}
                                onClick={() => { setSelectedLang(l); setIsOpen(false); }}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                                    selectedLang === l ? "bg-primary/5 text-primary" : "text-slate-600 hover:bg-slate-50"
                                }`}
                            >
                                {l}
                                {selectedLang === l && <Check size={14} />}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <p className="mt-2 text-[10px] text-slate-500 italic px-1">
                *Multiple languages can be selected by scholars
            </p>
        </div>
    );
};

export default LanguageDropdown;