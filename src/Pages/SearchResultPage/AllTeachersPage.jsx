import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2, User, ArrowLeft, LayoutGrid } from 'lucide-react';
import Fuse from 'fuse.js';
import SearchTeacherCard from './SearchTeacherCard';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import SortDropdown from '../FindTeachersPage/SortDropdown';

const AllTeachersPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get('query') || "";
    const axiosPublic = useAxiosPublic();

    const [allData, setAllData] = useState([]); // Raw data
    const [sortOrder, setSortOrder] = useState('rank');
    const [loading, setLoading] = useState(true);

    // 1. Fetch Data
    useEffect(() => {
        const fetchAllTeachers = async () => {
            setLoading(true);
            try {
                const { data } = await axiosPublic.get('/eligible-teachers');
                const teachersOnly = data.filter(u => u.role === 'teacher');
                setAllData(teachersOnly);
            } catch (err) {
                console.error("Failed to fetch all teachers", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllTeachers();
    }, [axiosPublic]);

    // 2. Search & Sort Engine (useMemo for performance)
    const processedTeachers = useMemo(() => {
        let results = [...allData];

        // Fuzzy Search
        if (query) {
            const fuse = new Fuse(results, {
                keys: ['displayName', 'category', 'bio'],
                threshold: 0.4,
            });
            results = fuse.search(query).map(r => r.item);
        }

        // Sorting Logic
        const getNumericId = (uid) => {
            const match = uid?.match(/\d+/);
            return match ? parseInt(match[0], 10) : Infinity;
        };

        results.sort((a, b) => {
            switch (sortOrder) {
                case 'price-low':
                    return (a.minRate || 0) - (b.minRate || 0);
                case 'price-high':
                    return (b.minRate || 0) - (a.minRate || 0);
                case 'newest':
                    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
                case 'rank':
                default:
                    const rankA = getNumericId(a.userId);
                    const rankB = getNumericId(b.userId);
                    if (rankA !== rankB) return rankA - rankB;
                    return (b.totalOnlineSeconds || 0) - (a.totalOnlineSeconds || 0);
            }
        });

        return results;
    }, [allData, query, sortOrder]);

    if (loading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-white" role="alert" aria-busy="true">
                <Loader2 className="animate-spin text-primary mb-4" size={40} />
                <p className="font-serif italic text-slate-600">Curating our full faculty...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/30">
            {/* SEO Headings - Hidden but readable by bots */}
            <h1 className="sr-only">Directory of Verified Islamic Scholars and Teachers - Rahmah Institute</h1>

            {/* Top Navigation Bar */}
            <header className="bg-white border-b border-slate-100 sticky top-0 z-30">
                <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors font-bold text-sm group"
                        aria-label="Go back to previous page"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden sm:inline">Back to Search</span>
                    </button>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col text-right">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Directory</span>
                            <span className="text-sm font-bold text-slate-900">{processedTeachers.length} Scholars Found</span>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500" aria-hidden="true">
                            <LayoutGrid size={18} />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto px-6 py-8 md:py-12">
                {/* Responsive Header & Sort Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-primary/10 rounded-lg" aria-hidden="true">
                                <User className="text-primary" size={20} />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
                                Faculty <span className="text-slate-500 italic font-medium">Results</span>
                            </h2>
                        </div>
                        <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                            Discover verified scholars matching <span className="text-slate-900 font-bold underline decoration-primary/30">"{query || 'All'}"</span>.
                            Select a scholar to view their full credentials and teaching style.
                        </p>
                    </div>

                    {/* Sorting Dropdown Integration */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
                    </div>
                </div>

                {/* The Full Grid */}
                <section aria-label="Scholar search results">
                    {processedTeachers.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                            {processedTeachers.map((teacher) => (
                                <SearchTeacherCard key={teacher._id} teacher={teacher} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-24 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <User size={32} className="text-slate-300" />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-slate-900">No scholars found</h3>
                            <p className="text-slate-600 mt-2">Try adjusting your search terms or clearing filters.</p>
                        </div>
                    )}
                </section>

                {/* Footer Quote */}
                <footer className="mt-24 pt-12 border-t border-slate-200 text-center">
                    <blockquote className="font-serif italic text-slate-500 text-sm">
                        "Seeking knowledge is a duty upon every Muslim."
                    </blockquote>
                </footer>
            </main>
        </div>
    );
};

export default AllTeachersPage;