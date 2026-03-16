import React, { useEffect, useState, useMemo } from 'react';
import { Briefcase, Filter, Search, ChevronDown, X } from 'lucide-react';
import JobPostCard from './JobPostCard';
import JobFilters from './JobFilters';
import JobSorter from './JobSorter';
import Pagination from '../FindTeachersPage/Pagination';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const categories = [
    { label: 'Quran Teacher', value: 'quran_teacher' },
    { label: 'Arabic Grammars Teacher', value: 'arabic_grammars_teacher' },
    { label: 'Arabic Teacher', value: 'arabic_teacher' },
    { label: 'Fiqh Hanafi Teacher', value: 'fiqh_hanafi_teacher' },
    { label: 'Fiqh Hanbali Teacher', value: 'fiqh_hanbali_teacher' },
    { label: 'Fiqh Maleki Teacher', value: 'fiqh_maleki_teacher' },
    { label: 'Fiqh Shafey Teacher', value: 'fiqh_shafey_teacher' },
    { label: 'Hadis Teacher', value: 'hadis_teacher' },
    { label: 'Hadith Science Teacher', value: 'hadith_science_teacher' },
    { label: 'Hifz Teacher', value: 'hifz_teacher' },
    { label: 'Najera Teacher', value: 'najera_teacher' },
    { label: 'Tafsir Teacher', value: 'tafsir_teacher' },
    { label: 'Usule Fiqh Teacher', value: 'usule_fiqh_teacher' },
    { label: 'Usule Hadis Teacher', value: 'usule_hadis_teacher' },
    { label: 'Usule Tafsir Teacher', value: 'usule_tafsir_teacher' },
];

const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
];

const JobsPage = () => {
    const axiosPublic = useAxiosPublic();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter & Sort States
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedGender, setSelectedGender] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // --- Pagination States ---
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 12;

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { data } = await axiosPublic.get('/jobs');
                const activeJobs = data.filter(j => j.status === "Pending" || j.status === "accepted");
                setJobs(activeJobs);
            } catch (err) {
                console.error("Job load error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, [axiosPublic]);

    // Reset to page 1 when filters or sorting change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory, selectedGender, sortBy]);

    // 1. Filter and Sort logic
    const allFilteredJobs = useMemo(() => {
        let result = jobs.filter(job => {
            const matchesSearch = job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' ||
                job.category?.some(cat => cat.value === selectedCategory);
            const matchesGender = selectedGender === 'all' ||
                job.genderPreference?.value === selectedGender;
            return matchesSearch && matchesCategory && matchesGender;
        });

        return result.sort((a, b) => {
            switch (sortBy) {
                case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
                case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt);
                case 'low': return (Number(a.minSalary) || 0) - (Number(b.minSalary) || 0);
                case 'high': return (Number(b.minSalary) || 0) - (Number(a.minSalary) || 0);
                default: return 0;
            }
        });
    }, [jobs, searchQuery, selectedCategory, selectedGender, sortBy]);

    // 2. Paginate the filtered results
    const paginatedJobs = useMemo(() => {
        const startIndex = (currentPage - 1) * jobsPerPage;
        return allFilteredJobs.slice(startIndex, startIndex + jobsPerPage);
    }, [allFilteredJobs, currentPage]);

    const totalPages = Math.ceil(allFilteredJobs.length / jobsPerPage);

    if (loading) return (
        <div className="h-screen flex items-center justify-center italic text-primary font-serif font-bold">
            Searching opportunities...
        </div>
    );

    return (
        <>
            <div className="min-h-screen bg-[#F8FAFC] py-24 lg:py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* --- Header Section --- */}
                    <header className="relative overflow-hidden">
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
                                    Teaching Opportunities
                                </span>
                                <div className="h-[1px] w-8 bg-slate-200" />
                            </div>

                            {/* Main Heading with Refined Serif Mix */}
                            <h2 className="font-serif text-2xl md:text-5xl text-slate-900 mb-6 tracking-tight leading-[1.1]">
                                Browse <span className="relative inline-block">
                                    <span className="italic text-primary font-light pr-2">{allFilteredJobs.length}</span>
                                    {/* Subtle underline for the italic word */}
                                    <svg className="absolute -bottom-2 left-0 w-full h-2 text-primary/10 hidden lg:flex" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </span> active positions across the globe.
                            </h2>
                        </div>
                    </header>

                    {/* --- Search & Control Bar --- */}
                    <div className="flex flex-col gap-4 mb-10">
                        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">

                            {/* Search Bar - Expands on PC */}
                            <form
                                onSubmit={(e) => e.preventDefault()}
                                className="relative flex-1 group"
                            >
                                {/* Decorative Icon - Hidden from Screen Readers to avoid "Empty Graphic" errors */}
                                <Search
                                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors"
                                    size={20}
                                    aria-hidden="true"
                                />

                                {/* 1. Visually Hidden Label: Solves the WAVE "Missing Label" error */}
                                <label htmlFor="main-search-input" className="sr-only">
                                    Search by subject, title or keyword
                                </label>

                                <input
                                    id="main-search-input" // 2. Must match the label's 'htmlFor'
                                    type="text"
                                    name="q" // SEO: Standard search query parameter name
                                    placeholder="Search by subject, title or keyword..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    // {/* 3. Aria-label provides extra context for SEO & Screen Readers */}
                                    aria-label="Search scholars by subject, title or keyword"
                                    className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-3xl shadow-sm outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all font-medium text-slate-700 placeholder:text-slate-400"
                                />
                            </form>

                            {/* Sorter - Next to Search on PC */}
                            <div className="hidden md:block">
                                <JobSorter sortBy={sortBy} setSortBy={setSortBy} />
                            </div>

                            {/* Mobile Filter & Sort Trigger (Side-by-side buttons on mobile) */}
                            <div className="flex md:hidden gap-3">
                                <button
                                    onClick={() => setIsMobileFilterOpen(true)}
                                    className="flex-1 bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-slate-700 shadow-sm active:scale-95 transition-transform"
                                >
                                    <Filter size={18} className="text-primary" />
                                    <span>Filters</span>
                                </button>
                                <div className="flex-1">
                                    {/* On mobile, we can pass a prop to JobSorter to make it full width if needed */}
                                    <JobSorter sortBy={sortBy} setSortBy={setSortBy} isFullWidth={true} />
                                </div>
                            </div>
                        </div>

                        {/* --- Active Filter Chips --- */}
                        {(searchQuery || selectedCategory !== 'all' || selectedGender !== 'all') && (
                            <div className="flex flex-wrap items-center gap-2 px-2 animate-in fade-in slide-in-from-top-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mr-2">Applied:</span>
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery('')} className="group flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-bold transition-all hover:bg-red-500">
                                        "{searchQuery}" <X size={14} />
                                    </button>
                                )}
                                {selectedCategory !== 'all' && (
                                    <button onClick={() => setSelectedCategory('all')} className="group flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full text-xs font-bold hover:bg-red-500 hover:text-white hover:border-transparent transition-all">
                                        {categories.find(c => c.value === selectedCategory)?.label} <X size={14} />
                                    </button>
                                )}
                                {selectedGender !== 'all' && (
                                    <button onClick={() => setSelectedGender('all')} className="group flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-xs font-bold hover:bg-red-500 hover:text-white transition-all">
                                        {selectedGender} <X size={14} />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* --- Main Content Grid --- */}
                    <div className="flex flex-col lg:flex-row gap-10 items-start">
                        {/* Desktop Sidebar */}
                        <aside className="hidden lg:block w-80 sticky top-24">
                            <JobFilters
                                categories={categories}
                                genderOptions={genderOptions}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                selectedGender={selectedGender}
                                setSelectedGender={setSelectedGender}
                                isOpen={isMobileFilterOpen}
                                setIsOpen={setIsMobileFilterOpen}
                            />
                        </aside>

                        {/* Job List */}
                        <main className="flex-1 w-full">
                            <div className="space-y-6">
                                {paginatedJobs.length > 0 ? (
                                    <>
                                        <div className="grid grid-cols-1 gap-6">
                                            {paginatedJobs.map(job => <JobPostCard key={job._id} job={job} />)}
                                        </div>
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={(page) => {
                                                setCurrentPage(page);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                        />
                                    </>
                                ) : (
                                    <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-slate-200 shadow-inner">
                                        <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Briefcase size={32} className="text-slate-300" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900">No matching roles found</h3>
                                        <p className="text-slate-500 mt-2 max-w-xs mx-auto">Try adjusting your filters or search terms to find more opportunities.</p>
                                        <button
                                            onClick={() => { setSelectedCategory('all'); setSelectedGender('all'); setSearchQuery('') }}
                                            className="mt-8 text-primary font-bold underline underline-offset-4"
                                        >
                                            Clear all filters
                                        </button>
                                    </div>
                                )}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobsPage;