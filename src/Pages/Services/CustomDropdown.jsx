import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, BookOpen } from 'lucide-react';

const CustomDropdown = ({ label, options, selected, setSelected }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-3">
                {label}
            </label>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 bg-slate-50 border transition-all rounded-2xl ${isOpen ? "border-primary bg-white ring-4 ring-primary/5" : "border-slate-100 hover:border-slate-200"
                    }`}
            >
                <div className="flex items-center gap-3">
                    <BookOpen size={16} className={isOpen ? "text-primary" : "text-slate-500"} />
                    <span className="text-sm font-bold text-slate-700">
                        {selected === "All" ? `Any ${label}` : selected}
                    </span>
                </div>
                <ChevronDown size={16} className={`text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu - Positioned to open UPWARDS */}
            {isOpen && (
                <div className="absolute z-50 w-full bottom-full mb-2 bg-white border border-slate-100 shadow-xl rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200 origin-bottom">
                    <div className="p-2 max-h-60 overflow-y-auto custom-scrollbar">
                        <button
                            onClick={() => { setSelected("All"); setIsOpen(false); }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold ${selected === "All" ? "bg-primary/5 text-primary" : "text-slate-600 hover:bg-slate-50"
                                }`}
                        >
                            Any Level {selected === "All" && <Check size={14} />}
                        </button>
                        {options.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => { setSelected(opt.value); setIsOpen(false); }}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold ${selected === opt.value ? "bg-primary/5 text-primary" : "text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                {opt.label} {selected === opt.value && <Check size={14} />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;