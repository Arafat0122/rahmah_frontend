import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Clock, TrendingUp, ArrowDownWideNarrow, ArrowUpWideNarrow } from 'lucide-react';

const JobSorter = ({ sortBy, setSortBy }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Specific sorting options for Jobs
    const options = [
        { value: 'newest', label: 'Newest Jobs', icon: <TrendingUp size={14} /> },
        { value: 'oldest', label: 'Oldest Postings', icon: <Clock size={14} /> },
        { value: 'low', label: 'Salary: Low to High', icon: <ArrowDownWideNarrow size={14} /> },
        { value: 'high', label: 'Salary: High to Low', icon: <ArrowUpWideNarrow size={14} /> },
    ];

    const currentOption = options.find((o) => o.value === sortBy) || options[0];

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
                <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-slate-500">Sort Jobs</span>

                {/* Trigger Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`group flex items-center gap-3 px-5 py-3 bg-white border rounded-2xl transition-all duration-300 ${isOpen
                        ? "border-primary shadow-lg shadow-primary/5 ring-4 ring-primary/5"
                        : "border-slate-100 hover:border-slate-200 shadow-sm"
                        }`}
                >
                    <div className="text-primary">
                        {currentOption.icon}
                    </div>

                    <span className="text-sm font-bold text-slate-700 min-w-[130px] text-left">
                        {currentOption.label}
                    </span>

                    <ChevronDown
                        size={16}
                        className={`text-slate-300 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`}
                    />
                </button>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 z-[100] mt-2 w-64 bg-white border border-slate-100 shadow-2xl shadow-slate-200/60 rounded-[1.5rem] p-2 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 origin-top-right">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => {
                                setSortBy(option.value);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${sortBy === option.value
                                ? "bg-primary/5 text-primary"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={sortBy === option.value ? "text-primary" : "text-slate-500"}>
                                    {option.icon}
                                </span>
                                <span className="text-sm font-bold">{option.label}</span>
                            </div>

                            {sortBy === option.value && (
                                <Check size={14} strokeWidth={3} className="text-primary" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JobSorter;