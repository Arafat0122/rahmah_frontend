import React, { useState } from 'react';
import {
    Menu, X, Bell, Mail, ChevronDown, User,
    Settings, LogOut, LayoutDashboard,
    ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(false);

    const exploreData = [
        {
            label: "Quran",
            subMenu: [
                { label: "Noorani Qaida", title: "Noorani Qaida – Quran Reading Course", link: "/noorani-qaida-quran-reading" },
                { label: "Quran Tajweed", title: "Quran Recitation with Tajweed", link: "/quran-recitation-tajweed-course" },
                { label: "Advanced Tajweed", title: "Advanced Tajweed & Tilawah", link: "/advanced-tajweed-tilawah" },
                { label: "Quran Hifz", title: "Quran Memorization (Hifz Program)", link: "/quran-hifz-program" },
            ],
        },
        {
            label: "Arabic",
            subMenu: [
                { label: "Beginner Arabic", title: "Arabic Reading & Writing for Beginners", link: "/arabic-reading-writing-course" },
                { label: "Arabic Grammar", title: "Arabic Grammar (Nahw & Sarf)", link: "/arabic-grammar-nahw-sarf" },
                { label: "Quranic Arabic", title: "Quranic Arabic Language Course", link: "/quranic-arabic-course" },
                { label: "Arabic Literature", title: "/advanced-arabic-language-course" },
            ],
        },
        {
            label: "Fiqh",
            subMenu: [
                { label: "Hanafi Fiqh", title: "Hanafi Fiqh Course", link: "/hanafi-fiqh-course" },
                { label: "Shafi Fiqh", title: "Shafi Fiqh Course", link: "/shafi-fiqh-course" },
                { label: "Maliki Fiqh", title: "Maliki Fiqh Course", link: "/maliki-fiqh-course" },
                { label: "Hanbali Fiqh", title: "Hanbali Fiqh Course", link: "/hanbali-fiqh-course" },
            ],
        },
        {
            label: "Dawra",
            subMenu: [
                { label: "Semester 1", title: "Islamic Dawra Program – Semester 1", link: "/dawra-semester-1" },
                { label: "Semester 2", title: "Islamic Dawra Program – Semester 2", link: "/dawra-semester-2" },
                { label: "Semester 3", title: "Islamic Dawra Program – Semester 3", link: "/dawra-semester-3" },
            ],
        },
        {
            label: "Azhari",
            subMenu: [
                { label: "Azhar Ibtedai", title: "Al-Azhar Ibtedai Islamic Curriculum", link: "/al-azhar-ibtedai-program" },
                { label: "Azhar Edadi", title: "Al-Azhar Edadi Islamic Curriculum", link: "/al-azhar-edadi-program" },
                { label: "Azhar Sanabi", title: "Al-Azhar Sanabi Islamic Curriculum", link: "/al-azhar-sanabi-program" },
            ],
        },
    ];

    return (
        <nav aria-label="Main Navigation" className="fixed top-0 w-full z-50 bg-white border-b border-slate-200">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="flex justify-between h-20 items-center">

                    {/* LEFT: Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer outline-primary" aria-label="Rahmah Institute Home">
                        <img
                            className="h-10 transition-transform hover:scale-105 hidden md:block"
                            src="/1.png"
                            alt="Rahmah Institute Logo"
                        />
                        <img
                            className="h-10 transition-transform hover:scale-105 md:hidden"
                            src="/Rahmah-Institute.png"
                            alt="Rahmah Institute Logo"
                        />
                    </Link>

                    {/* RIGHT: Navigation Content */}
                    <div className="flex items-center gap-8">

                        {/* Desktop Navigation Links - Darkened for Contrast */}
                        <div className="hidden xl:flex items-center gap-7 text-[16px] font-sans font-bold text-slate-700">
                            <Link to="/find-teacher" className="hover:text-primary transition-colors">Find Teachers</Link>
                            <Link to="/find-services" className="hover:text-primary transition-colors">Services</Link>
                            <Link to="/find-jobs" className="hover:text-primary transition-colors">Jobs</Link>

                            {/* Mega Menu Dropdown */}
                            <div
                                className="relative h-20 flex items-center group cursor-pointer"
                                onMouseEnter={() => setActiveDropdown(true)}
                                onMouseLeave={() => setActiveDropdown(false)}
                            >
                                <button
                                    aria-expanded={activeDropdown}
                                    aria-haspopup="true"
                                    className="flex items-center gap-1 group-hover:text-primary font-bold transition-colors"
                                >
                                    Explore <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Mega Menu Content */}
                                <div
                                    className={`absolute top-full right-0 w-[950px] bg-white border border-slate-200 shadow-2xl rounded-b-2xl p-8 grid grid-cols-5 gap-6 transition-all duration-300 origin-top z-50 ${activeDropdown ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'
                                        }`}
                                    // FIX 1: Use 'navigation' or 'region' instead of 'menu' if you have nested divs/headings. 
                                    // 'menu' is strictly for specific widget behavior.
                                    role="region"
                                    aria-label="Explore Quranic Courses"
                                    aria-hidden={!activeDropdown}
                                >
                                    {exploreData.map((section, idx) => (
                                        <div key={idx} className="space-y-4">
                                            {/* SEO: Maintained h4 hierarchy */}
                                            <h4 className="font-serif font-bold text-slate-900 text-lg border-b border-slate-100 pb-2">
                                                {section.label}
                                            </h4>

                                            {/* FIX 2: Removed role="none" and role="menuitem" conflicts */}
                                            <ul className="space-y-2.5">
                                                {section.subMenu.map((item, i) => (
                                                    <li key={i}>
                                                        <Link
                                                            to={item.link}
                                                            // FIX 3: Removed invalid inline comments {/* ... */} from inside the element tag
                                                            title={item.title}
                                                            aria-label={item.title}
                                                            className="text-[14px] text-slate-600 hover:text-primary font-semibold block leading-tight transition-colors focus:outline-none focus:text-primary"
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* User Interface Section */}
                        <div className="flex items-center gap-3 pl-6 md:border-l border-slate-200">
                            {isLoggedIn ? (
                                <div className="flex items-center gap-2 sm:gap-4">
                                    <button aria-label="Messages" className="relative p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
                                        <Mail size={22} />
                                        <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border border-white"></span>
                                    </button>
                                    <button aria-label="Notifications" className="relative p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
                                        <Bell size={22} />
                                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                                    </button>

                                    {/* User Avatar Dropdown */}
                                    <div className="relative group">
                                        <button aria-label="User account menu" className="flex items-center gap-2 cursor-pointer p-0.5 rounded-full hover:ring-2 hover:ring-primary/20 transition-all">
                                            <img
                                                src="https://i.ibb.co/gZ6wLnLW/shohaib-pic.jpg"
                                                className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 object-cover"
                                                alt="Profile"
                                            />
                                        </button>
                                        <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-slate-200 shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                            <div className="px-4 py-2 border-b border-slate-50 mb-1">
                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Account</p>
                                            </div>
                                            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors"><LayoutDashboard size={18} className="text-slate-500" /> Dashboard</Link>
                                            <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors"><User size={18} className="text-slate-500" /> Profile</Link>
                                            <Link to="/settings" className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors"><Settings size={18} className="text-slate-500" /> Settings</Link>
                                            <hr className="my-2 border-slate-100" />
                                            <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors font-bold"><LogOut size={18} /> Logout</button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setIsLoggedIn(true)}
                                        className="text-slate-700 font-bold text-sm hover:text-primary transition-colors hidden sm:block"
                                    >
                                        Sign In
                                    </button>
                                    <Link to="/join" className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
                                        Join Now
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Hamburger - aria-label added */}
                            <button
                                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                                className="xl:hidden ml-2 p-2 text-slate-900"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            <div
                className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] transition-opacity duration-500 xl:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
            />

            {/* Sidebar Container */}
            <aside
                role="dialog"
                aria-modal="true"
                aria-label="Main Navigation"
                className={`fixed top-0 right-0 w-[300px] h-full bg-white z-[70] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] transform transition-transform duration-500 ease-out xl:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="p-0 h-full flex flex-col">
                    {/* Header Section */}
                    <div className="p-6 flex justify-between items-center border-b border-slate-50 bg-slate-50/50">
                        <div className="flex flex-col">
                            <span className="font-serif font-black text-xl text-slate-900 tracking-tight">Rahmah</span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Institute</span>
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 bg-white rounded-full shadow-sm border border-slate-100 text-slate-500 hover:text-red-500 transition-colors"
                            aria-label="Close navigation menu"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Scrollable Navigation Area */}
                    <nav className="flex-1 overflow-y-auto custom-scrollbar px-6 py-8">
                        {/* Primary Links */}
                        <div className="flex flex-col gap-1 mb-8">
                            {[
                                { name: 'Find Teachers', path: '/find-teacher' },
                                { name: 'Services', path: '/find-services' },
                                { name: 'Jobs', path: '/find-jobs' }
                            ].map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="py-3 text-lg font-bold text-slate-800 hover:text-primary transition-all flex justify-between items-center group"
                                >
                                    {link.name}
                                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-primary" />
                                </Link>
                            ))}
                        </div>

                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-slate-100"></div>
                            </div>
                            <div className="relative flex justify-start">
                                <span className="bg-white pr-3 text-[10px] uppercase font-black tracking-[0.2em] text-slate-400">
                                    Explore Courses
                                </span>
                            </div>
                        </div>

                        {/* Courses Sub-Navigation */}
                        <div className="space-y-8 pb-10">
                            {exploreData.map((item, i) => (
                                <section key={i} className="space-y-4">
                                    <h3 className="text-slate-900 text-sm font-black uppercase tracking-widest px-1 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/30"></span>
                                        {item.label}
                                    </h3>

                                    <div className="flex flex-col pl-3 gap-1 border-l border-slate-100">
                                        {item.subMenu.map((sub, j) => (
                                            <Link
                                                key={j}
                                                to={sub.link}
                                                title={sub.title}
                                                aria-label={sub.title}
                                                className="text-[15px] text-slate-600 hover:text-primary font-medium py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-all"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {sub.label}
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    </nav>

                    {/* Optional Footer Action */}
                    <div className="p-6 border-t border-slate-50 bg-slate-50/30">
                        <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-slate-200 active:scale-[0.98] transition-all">
                            Join as Teacher
                        </button>
                    </div>
                </div>
            </aside>
        </nav>
    );
};

export default Navbar;