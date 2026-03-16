import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, ArrowUpDown, Sparkles, CircleDollarSign, Clock } from 'lucide-react';

const SortDropdown = ({ sortOrder, setSortOrder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const options = [
        { value: 'rank', label: 'Recommended', icon: <Sparkles size={14} /> },
        { value: 'price-low', label: 'Price: Low to High', icon: <CircleDollarSign size={14} /> },
        { value: 'price-high', label: 'Price: High to Low', icon: <CircleDollarSign size={14} /> },
        { value: 'newest', label: 'Newest Joiners', icon: <Clock size={14} /> },
    ];

    const currentOption = options.find((o) => o.value === sortOrder);

    useEffect(() => {
        const handleClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Sort By</span>

                {/* Trigger Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`group flex items-center gap-3 px-4 py-2.5 bg-white border rounded-2xl transition-all duration-300 ${isOpen
                        ? "border-primary shadow-lg shadow-primary/5 ring-4 ring-primary/5"
                        : "border-slate-200 hover:border-slate-300 shadow-sm"
                        }`}
                >
                    <div className="text-primary opacity-80 group-hover:opacity-100 transition-opacity">
                        {currentOption?.icon || <ArrowUpDown size={14} />}
                    </div>

                    <span className="text-sm font-bold text-slate-700 min-w-[140px] text-left">
                        {currentOption?.label}
                    </span>

                    <ChevronDown
                        size={16}
                        className={`text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`}
                    />
                </button>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 z-[100] mt-2 w-64 bg-white border border-slate-100 shadow-2xl shadow-slate-200/60 rounded-2xl p-1.5 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 origin-top-right">
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-3 py-2">
                        Ranking Options
                    </div>

                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => {
                                setSortOrder(option.value);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 ${sortOrder === option.value
                                ? "bg-primary/5 text-primary"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={sortOrder === option.value ? "text-primary" : "text-slate-500"}>
                                    {option.icon}
                                </span>
                                <span className="text-sm font-bold">{option.label}</span>
                            </div>

                            {sortOrder === option.value && (
                                <div className="bg-primary text-white rounded-full p-0.5">
                                    <Check size={10} strokeWidth={4} />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SortDropdown;