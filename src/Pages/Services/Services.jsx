import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, BookOpen, X } from 'lucide-react';
import SearchServiceCard from "../SearchResultPage/SearchServiceCard";
import ServiceSidebar from "./ServiceSidebar";
import ServiceMobileDrawer from "./ServiceMobileDrawer";
import ServiceSortDropdown from "./ServiceSortDropdown";
import Pagination from "../FindTeachersPage/Pagination";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const categories = [
    "Alemi course", "Arabic Grammar", "Arabic language", "Azhari curriculum", "Dawra hadis class",
    "General Fiqh", "Hadith", "Hadith Science", "Hanafi Fiqh", "Hanmbali Fiqh",
    "Maleki Fiqh", "Quran learning", "Shafee Fiqh", "Tafsir", "Tafsir Science"
].map(cat => ({ value: cat, label: cat }));

const englishLevels = [
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
    { value: "Fluent", label: "Fluent" }
];

const Services = () => {
    const [allServices, setAllServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState("");
    const axiosPublic = useAxiosPublic();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedLevel, setSelectedLevel] = useState("All");

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Adjust this number based on your design preference

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                const res = await axiosPublic.get("/services");
                const accepted = res.data.filter(s => s.status === "Accepted");
                setAllServices(accepted);
                setFilteredServices(accepted);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, [axiosPublic]);

    useEffect(() => {
        let results = [...allServices];

        if (searchTerm) {
            results = results.filter(s =>
                s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.userName?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (selectedCategory !== "All") {
            results = results.filter(s => s.category === selectedCategory);
        }
        if (selectedLevel !== "All") {
            results = results.filter(s => s.engLevel === selectedLevel);
        }

        if (sortOrder === "lowToHigh") {
            results.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "highToLow") {
            results.sort((a, b) => b.price - a.price);
        }

        setFilteredServices(results);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, selectedCategory, selectedLevel, sortOrder, allServices]);

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredServices.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
    };

    const clearAll = () => {
        setSelectedCategory("All");
        setSelectedLevel("All");
        setSearchTerm("");
        setSortOrder("");
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FBFDFF] font-body pb-20">
            {/* --- Hero Section --- */}
            <div className="bg-tertiary/40 border-b border-slate-100 py-12 md:py-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <header className="relative overflow-hidden">
                        {/* Subtle Background Pattern/Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
                            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-slate-100 rounded-full blur-[100px]" />
                        </div>

                        <div className="relative pt-12 py-2 lg:py-10 px-6 max-w-5xl mx-auto text-center">
                            {/* Animated Accent Label */}
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="h-[1px] w-8 bg-slate-200" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/80">
                                    Academic Excellence
                                </span>
                                <div className="h-[1px] w-8 bg-slate-200" />
                            </div>

                            {/* Main Heading with Refined Serif Mix */}
                            <h2 className="font-serif text-2xl md:text-6xl text-slate-900 mb-0 tracking-tight leading-[1.1]">
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
                    <form
                        onSubmit={(e) => e.preventDefault()} // SEO/UX: Wrapping in a form enables 'Enter' key search
                        className="max-w-3xl mx-auto bg-white p-2 rounded-2xl shadow-xl border border-slate-200 flex flex-col md:flex-row gap-2"
                    >
                        <div className="flex-1 flex items-center px-4 gap-3">
                            {/* WAVE: Changed text-slate-300 to 400+ for better icon visibility context */}
                            <Search className="text-slate-400" size={20} aria-hidden="true" />

                            {/* FIX: Added id and aria-label for 100% WAVE compliance */}
                            <label htmlFor="service-search" className="sr-only">Search services</label>
                            <input
                                id="service-search"
                                type="text"
                                role="searchbox"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search services..."
                                aria-label="Search for Islamic services or scholars"
                                className="w-full py-3 outline-none font-medium text-slate-700 bg-transparent placeholder:text-slate-400"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-primary text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-primary/20"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-10">
                    <ServiceSidebar
                        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                        selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel}
                        categories={categories} englishLevels={englishLevels}
                    />

                    <div className="flex-1">
                        {/* --- TOP VIEW --- */}
                        <div className="bg-white border border-slate-100 rounded-3xl p-4 md:p-6 mb-8 shadow-sm">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-[10px] font-black uppercase text-slate-500 mr-2 tracking-tighter">Selected:</span>
                                    {selectedCategory === "All" && selectedLevel === "All" && !searchTerm && (
                                        <span className="text-xs font-bold text-slate-500 italic">No filters applied</span>
                                    )}
                                    {selectedCategory !== "All" && <FilterChip label={selectedCategory} onClear={() => setSelectedCategory("All")} />}
                                    {selectedLevel !== "All" && <FilterChip label={selectedLevel} onClear={() => setSelectedLevel("All")} />}
                                    {searchTerm && <FilterChip label={`"${searchTerm}"`} onClear={() => setSearchTerm("")} />}
                                    {(selectedCategory !== "All" || selectedLevel !== "All" || searchTerm) && (
                                        <button onClick={clearAll} className="text-[10px] font-black text-red-400 uppercase hover:text-red-600 ml-2">Clear All</button>
                                    )}
                                </div>
                                <ServiceSortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
                            </div>
                        </div>

                        {/* Mobile Toggle */}
                        <div className="lg:hidden mb-6">
                            <button onClick={() => setIsMobileFilterOpen(true)} className="w-full flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 font-bold text-slate-700 shadow-sm">
                                <div className="flex items-center gap-2"><SlidersHorizontal size={18} className="text-primary" />Filters</div>
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-lg">{filteredServices.length} Results</span>
                            </button>
                        </div>

                        {/* Grid - Render currentItems instead of filteredServices */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {currentItems.map(service => <SearchServiceCard key={service._id} service={service} />)}
                        </div>

                        {/* Pagination Component */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />

                        {/* Empty State */}
                        {filteredServices.length === 0 && (
                            <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200">
                                <BookOpen className="mx-auto text-slate-200 mb-4" size={48} />
                                <h3 className="text-xl font-serif font-bold text-slate-500">No services match your filters</h3>
                                <button onClick={clearAll} className="mt-4 text-primary font-bold text-sm">Clear all filters</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ServiceMobileDrawer
                isOpen={isMobileFilterOpen} setIsOpen={setIsMobileFilterOpen}
                selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel}
                categories={categories} englishLevels={englishLevels}
            />
        </div>
    );
};

const FilterChip = ({ label, onClear }) => (
    <div className="flex items-center gap-2 bg-primary/5 text-primary border border-primary/10 px-3 py-1.5 rounded-full text-xs font-bold animate-in fade-in zoom-in duration-200">
        {label}
        <button onClick={onClear} className="hover:text-red-500"><X size={12} /></button>
    </div>
);

export default Services;