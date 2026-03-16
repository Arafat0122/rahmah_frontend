import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen } from 'lucide-react';

const categories = [
    "Quran teacher", "Arabic Grammars Teacher", "Arabic teacher",
    "Fiqh Hanafi Teacher", "Fiqh Hanboli Teacher", "Fiqh Maleki Teacher",
    "Fiqh Shafey Teacher", "Hadis Teacher", "Hadith Science Teacher",
    "Hifz Teacher", "Najera Teacher", "Tafsir Teacher",
    "Usule Fiqh Teacher", "Usule Hadis Teacher", "Usule Tafsir Teacher",
    "Basic Aqidah", "Advance Aqidah", "Islamic Finance",
    "Zakat", "Islamic Study", "Basic Seerah",
    "Advance Seerah", "Islamic History", "Islamic Civilization",
    "Fundamental of Islam", "Fasting (Saum)", "Pilgrimage (Hajj)",
    "Tawheed", "Islamic Thesis Supervisor", "Mazhab in Islam",
    "Maqamat Since", "Tazbeet"
];

const SearchBar = () => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.length >= 2) {
            const filtered = categories.filter(cat =>
                cat.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 6);
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSearch = (query) => {
        const finalQuery = query?.trim();
        if (!finalQuery) return;
        setShowSuggestions(false);
        navigate(`/search?query=${encodeURIComponent(finalQuery)}`);
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
        handleSearch(suggestion);
    };

    return (
        <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto px-4 sm:px-0">
            <div className="relative group">
                {/* 1. VISUALLY HIDDEN LABEL FOR WAVE/SEO */}
                <label htmlFor="course-search" className="sr-only">
                    Search for courses, teachers, or subjects
                </label>

                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 z-10">
                    <Search size={20} aria-hidden="true" />
                </div>

                <input
                    id="course-search" // Match with label htmlFor
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(inputValue)}
                    placeholder="What do you want to learn?"
                    // 2. Added aria-label for backup support
                    aria-label="Search learning content"
                    className="w-full pl-14 pr-32 py-4 bg-white border-2 border-slate-200 rounded-2xl shadow-2xl shadow-slate-200/50 focus:border-primary focus:ring-0 transition-all text-slate-900 font-medium placeholder:text-slate-500 outline-none"
                />

                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {inputValue && (
                        <button
                            type="button"
                            aria-label="Clear search"
                            onClick={() => { setInputValue(''); setSuggestions([]); }}
                            className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
                        >
                            <X size={18} />
                        </button>
                    )}
                    <button
                        onClick={() => handleSearch(inputValue)}
                        aria-label="Submit search"
                        className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-900 transition-all active:scale-95 shadow-lg shadow-primary/20"
                    >
                        Search
                    </button>
                </div>
            </div>

            {showSuggestions && suggestions.length > 0 && (
                <div role="listbox" className="absolute z-50 w-full mt-3 bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden">
                    <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
                        <BookOpen size={14} className="text-primary" aria-hidden="true" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Suggested For You</span>
                    </div>

                    <ul className="max-h-80 overflow-y-auto">
                        {suggestions.map((item, index) => (
                            <li
                                key={index}
                                role="option"
                                aria-selected="false"
                                onClick={() => handleSuggestionClick(item)}
                                className="px-5 py-3.5 hover:bg-slate-50 cursor-pointer flex items-center justify-between group transition-colors border-b border-slate-50 last:border-0"
                            >
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">
                                        {item}
                                    </span>
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Category</span>
                                </div>
                                <Search size={14} className="opacity-0 group-hover:opacity-100 text-primary transition-all" aria-hidden="true" />
                            </li>
                        ))}
                    </ul>

                    <div
                        onClick={() => handleSearch(inputValue)}
                        className="p-4 text-center bg-slate-50 hover:bg-primary/5 cursor-pointer border-t border-slate-100 transition-colors group"
                    >
                        <span className="text-xs font-bold text-primary">
                            See all results for "{inputValue}"
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;