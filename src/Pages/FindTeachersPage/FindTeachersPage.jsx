import { useState, useEffect, useMemo } from 'react';
import {
    Search, Filter, SlidersHorizontal, ChevronDown,
    User, Globe, Clock, CheckCircle2, X
} from 'lucide-react';
import SearchTeacherCard from '../SearchResultPage/SearchTeacherCard';
// import LanguageDropdown from './LanguageDropdown';
import SortDropdown from './SortDropdown';
import MobileFilterDrawer from './MobileFilterDrawer';
import FilterTag from './FilterTag';
import ScholarSidebar from './ScholarSidebar';
import { useSearchParams } from 'react-router-dom';
import Pagination from './Pagination';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const CATEGORIES = [
    "Quran teacher", "Arabic Grammars Teacher", "Arabic teacher", "Fiqh Hanafi Teacher",
    "Fiqh Hanboli Teacher", "Fiqh Maleki Teacher", "Fiqh Shafey Teacher", "Hadis Teacher",
    "Hadith Science Teacher", "Hifz Teacher", "Najera Teacher", "Tafsir Teacher",
    "Usule Fiqh Teacher", "Usule Hadis Teacher", "Usule Tafsir Teacher", "Basic Aqidah",
    "Advance Aqidah", "Islamic Finance", "Zakat", "Islamic Study", "Basic Seerah",
    "Advance Seerah", "Islamic History", "Islamic Civilization", "Fundamental of Islam",
    "Fasting (Saum)", "Pilgrimage (Hajj)", "Tawheed", "Islamic Thesis Supervisor",
    "Mazhab in Islam", "Maqamat Since", "Tazbeet"
];

const LANGUAGES = ["Bangla", "English", "Urdu", "Arabic", "Hindi", "Indonesian", "Malay", "Tamil", "Persian", "Piston", "Uzbek", "Russian"];

const FindTeachersPage = () => {
    const axiosPublic = useAxiosPublic();
    const [allTeachers, setAllTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Filter States
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [availability, setAvailability] = useState("All"); // All or Online
    const [selectedLang, setSelectedLang] = useState("All");
    const [selectedGender, setSelectedGender] = useState("All");
    const [sortOrder, setSortOrder] = useState("rank"); // rank, price-low, price-high, newest
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1');

    const ITEMS_PER_PAGE = 12;

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const { data } = await axiosPublic.get('/eligible-teachers');
                setAllTeachers(data.filter(u => u.role === 'teacher'));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTeachers();
    }, [axiosPublic]);

    // --- FILTER & SORT LOGIC ---
    const filteredAndSortedTeachers = useMemo(() => {
        let result = [...allTeachers];

        // 1. Filter by Category
        if (selectedCategory !== "All") {
            result = result.filter(t => t.category?.includes(selectedCategory));
        }

        // 2. Filter by Online Status
        if (availability === "Online") {
            result = result.filter(t => t.online === true);
        }

        // 3. Filter by Language
        if (selectedLang !== "All") {
            result = result.filter(t => {
                const teacherLangs = t.teachingLanguages || [];
                return teacherLangs.some(lang => {
                    const l = lang.toLowerCase();
                    const s = selectedLang.toLowerCase();
                    return l === s ||
                        (s === 'bangla' && l === 'bengali') ||
                        (s === 'persian' && l === 'farsi');
                });
            });
        }

        // 4. Filter by Gender
        if (selectedGender !== "All") {
            result = result.filter(t => t.gender?.toLowerCase() === selectedGender.toLowerCase());
        }

        // 5. Sorting Engine
        result.sort((a, b) => {
            // Priority 1: User Rank (RI-001 comes before RI-010)
            const getRank = (uid) => {
                const match = uid?.match(/\d+/);
                return match ? parseInt(match[0], 10) : Infinity;
            };

            const rankA = getRank(a.userId);
            const rankB = getRank(b.userId);

            if (sortOrder === "rank") {
                if (rankA !== rankB) return rankA - rankB;
                return (b.totalOnlineSeconds || 0) - (a.totalOnlineSeconds || 0);
            }

            if (sortOrder === "price-low") return parseFloat(a.minRate) - parseFloat(b.minRate);
            if (sortOrder === "price-high") return parseFloat(b.minRate) - parseFloat(a.minRate);

            if (sortOrder === "newest") {
                return new Date(b.join) - new Date(a.join);
            }

            return 0;
        });

        return result;
    }, [allTeachers, selectedCategory, availability, selectedLang, selectedGender, sortOrder]);

    // Calculate total pages based on your ALREADY filtered list
    const totalPages = Math.ceil(filteredAndSortedTeachers.length / ITEMS_PER_PAGE);

    // This is the list you will actually MAP over in your JSX
    const paginatedTeachers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredAndSortedTeachers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredAndSortedTeachers, currentPage]);

    // Function to change the page
    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage });
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll up so they see the new results
    };

    if (loading) return <div className="h-screen flex items-center justify-center font-serif italic text-primary">Loading Scholars...</div>;

    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* --- PAGE HEADER --- */}
            <header className="relative bg-white border-b border-slate-100 overflow-hidden pt-12">
                {/* Subtle Background Pattern/Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-slate-100 rounded-full blur-[100px]" />
                </div>

                <div className="relative pt-12 py-2 lg:py-16 px-6 max-w-5xl mx-auto text-center">
                    {/* Animated Accent Label */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-[1px] w-8 bg-slate-200" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                            Academic Excellence
                        </span>
                        <div className="h-[1px] w-8 bg-slate-200" />
                    </div>

                    {/* Main Heading with Refined Serif Mix */}
                    <h2 className="font-serif text-2xl md:text-6xl text-slate-900 mb-6 tracking-tight leading-[1.1]">
                        Meet Our <span className="relative inline-block">
                            <span className="italic text-slate-500 font-light pr-2">World-Class</span>
                            {/* Subtle underline for the italic word */}
                            <svg className="absolute -bottom-2 left-0 w-full h-2 text-primary/10 hidden lg:flex" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </span> Scholars
                    </h2>
                </div>
            </header>

            <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">

                {/* --- SIDEBAR FILTERS (PC) --- */}
                <ScholarSidebar
                    availability={availability}
                    setAvailability={setAvailability}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedGender={selectedGender}
                    setSelectedGender={setSelectedGender}
                    selectedLang={selectedLang}
                    setSelectedLang={setSelectedLang}
                    CATEGORIES={CATEGORIES}
                    LANGUAGES={LANGUAGES}
                />

                {/* --- MAIN CONTENT --- */}
                <div className="flex-1">

                    {/* Top Bar (Mobile Filter Toggle & Sorter) */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsMobileFilterOpen(true)}
                                className="lg:hidden flex items-center gap-2 bg-white px-5 py-3 rounded-2xl border border-slate-200 text-sm font-bold active:scale-95 transition-all shadow-sm"
                            >
                                <SlidersHorizontal size={16} /> Filters
                            </button>
                            <p className="text-slate-500 text-sm font-medium">
                                Found <span className="text-dark font-bold">{filteredAndSortedTeachers.length}</span> results
                            </p>
                        </div>

                        <SortDropdown
                            sortOrder={sortOrder}
                            setSortOrder={setSortOrder}
                        />
                    </div>

                    {/* --- ACTIVE FILTER CHIPS --- */}
                    {(selectedCategory !== "All" || availability !== "All" || selectedLang !== "All" || selectedGender !== "All") && (
                        <div className="flex flex-wrap items-center gap-2 mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                            <span className="text-[10px] font-black uppercase text-slate-500 mr-2">Active:</span>

                            {/* Category Tag */}
                            {selectedCategory !== "All" && (
                                <FilterTag label={selectedCategory} onClear={() => setSelectedCategory("All")} />
                            )}

                            {/* Availability Tag */}
                            {availability !== "All" && (
                                <FilterTag label="Online Now" onClear={() => setAvailability("All")} color="text-green-600 bg-green-50 border-green-100" />
                            )}

                            {/* Language Tag */}
                            {selectedLang !== "All" && (
                                <FilterTag label={`Lang: ${selectedLang}`} onClear={() => setSelectedLang("All")} />
                            )}

                            {/* Gender Tag */}
                            {selectedGender !== "All" && (
                                <FilterTag label={selectedGender} onClear={() => setSelectedGender("All")} />
                            )}

                            {/* Clear All Button */}
                            <button
                                onClick={() => {
                                    setSelectedCategory("All");
                                    setAvailability("All");
                                    setSelectedLang("All");
                                    setSelectedGender("All");
                                }}
                                className="text-xs font-bold text-primary hover:underline ml-2"
                            >
                                Clear All
                            </button>
                        </div>
                    )}
                    {/* Results Grid */}
                    {paginatedTeachers.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {paginatedTeachers.map(teacher => (
                                    <SearchTeacherCard key={teacher._id} teacher={teacher} />
                                ))}
                            </div>

                            {/* Add the Pagination component here */}
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </>
                    ) : (
                        <div className="bg-white rounded-[3rem] py-32 border border-dashed border-slate-200 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search size={32} className="text-slate-200" />
                            </div>
                            <h2 className="text-xl font-serif font-bold text-dark">No scholars match your filters</h2>
                            <p className="text-slate-500 mt-2">Try resetting your filters to see more results.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* --- MOBILE FILTER OVERLAY --- */}
            <MobileFilterDrawer
                isOpen={isMobileFilterOpen}
                setIsOpen={setIsMobileFilterOpen}
                availability={availability}
                setAvailability={setAvailability}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedGender={selectedGender}
                setSelectedGender={setSelectedGender}
                selectedLang={selectedLang}
                setSelectedLang={setSelectedLang}
                CATEGORIES={CATEGORIES}
                LANGUAGES={LANGUAGES}
            />
        </div>
    );
};

export default FindTeachersPage;