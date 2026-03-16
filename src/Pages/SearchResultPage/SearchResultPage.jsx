import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Loader2, User, BookOpen, AlertCircle, ChevronRight } from 'lucide-react';
import Fuse from 'fuse.js';
import SearchTeacherCard from './SearchTeacherCard';
import SearchServiceCard from './SearchServiceCard';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const SearchResultPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get('query') || "";
    const axiosPublic = useAxiosPublic();

    const [results, setResults] = useState({ teachers: [], services: [] });
    const [loading, setLoading] = useState(true);

    // Grid Limit: 4 columns * 3 rows = 12 items
    const DISPLAY_LIMIT = 12;

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            try {
                const [userRes, serviceRes] = await Promise.all([
                    axiosPublic.get('/eligible-teachers'),
                    axiosPublic.get('/services')
                ]);

                const allTeachers = userRes.data.filter(u => u.role === 'teacher');
                const allServices = serviceRes.data;

                // 1. Configure Fuse Fuzzy Search
                const teacherOptions = {
                    keys: ['displayName', 'category', 'bio'],
                    threshold: 0.4,
                    distance: 100
                };

                const serviceOptions = {
                    keys: ['title', 'category', 'description'],
                    threshold: 0.4
                };

                const fuseTeachers = new Fuse(allTeachers, teacherOptions);
                const fuseServices = new Fuse(allServices, serviceOptions);

                // 2. Execute Search
                let teacherResults = query
                    ? fuseTeachers.search(query).map(r => r.item)
                    : allTeachers;

                const serviceResults = query
                    ? fuseServices.search(query).map(r => r.item)
                    : allServices;

                // 3. RANKING LOGIC (Teacher ID Numeric + Online Seconds)
                teacherResults.sort((a, b) => {
                    // Extract number from userId (e.g., "RI-00310" -> 310)
                    const getRankNumber = (uid) => {
                        if (!uid) return Infinity;
                        const match = uid.match(/\d+/);
                        return match ? parseInt(match[0], 10) : Infinity;
                    };

                    const rankA = getRankNumber(a.userId);
                    const rankB = getRankNumber(b.userId);

                    // Sort by numeric rank (01, 02, 03...)
                    if (rankA !== rankB) {
                        return rankA - rankB;
                    }

                    // Tie-breaker: Most online seconds first
                    const onlineA = a.totalOnlineSeconds || 0;
                    const onlineB = b.totalOnlineSeconds || 0;
                    return onlineB - onlineA;
                });

                setResults({ teachers: teacherResults, services: serviceResults });
            } catch (err) {
                console.error("Search failed", err);
            } finally {
                setLoading(false);
            }
        };

        if (query) fetchSearchResults();
    }, [query, axiosPublic]);

    if (loading) {
        return (
            <div className="h-[70vh] flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-primary mb-4" size={40} />
                <p className="font-serif italic text-slate-500 font-medium">Scanning for "{query}"...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <header className="bg-slate-50 border-b border-slate-100 py-12">
                <div className="max-w-[1400px] mx-auto px-6 text-center lg:text-left">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-dark">
                        Search results for <span className="text-primary italic">"{query}"</span>
                    </h1>
                    <p className="text-slate-500 text-sm mt-3 font-medium">
                        Found {results.teachers.length} scholars and {results.services.length} services
                    </p>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto px-6 py-12">

                {/* 1. Scholars Section */}
                <section className="mb-24">
                    <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                        <div className="flex items-center gap-3">
                            <User className="text-primary" size={24} />
                            <h2 className="text-2xl font-serif font-bold text-dark">Available Scholars</h2>
                        </div>
                    </div>

                    {results.teachers.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {results.teachers.slice(0, DISPLAY_LIMIT).map(teacher => (
                                    <SearchTeacherCard key={teacher._id} teacher={teacher} />
                                ))}
                            </div>

                            {/* Show More Button for Teachers */}
                            {results.teachers.length > DISPLAY_LIMIT && (
                                <div className="mt-12 flex justify-center">
                                    <button
                                        onClick={() => navigate(`/all-teachers?query=${query}`)}
                                        className="flex items-center gap-2 px-8 py-3 bg-dark text-primary-dark hover:text-white rounded-full font-bold text-sm hover:bg-primary transition-all shadow-lg hover:shadow-primary/30 group"
                                    >
                                        Show All {results.teachers.length} Scholars
                                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-16 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center px-6">
                            <AlertCircle className="text-slate-300 mb-4" size={48} />
                            <h3 className="text-lg font-bold text-slate-500 font-serif">No scholars found</h3>
                            <p className="text-sm text-slate-500 mt-2">Try a different keyword or check spelling.</p>
                        </div>
                    )}
                </section>

                {/* 2. Services Section */}
                <section className="mb-20">
                    <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                        <div className="flex items-center gap-3">
                            <BookOpen className="text-primary" size={24} />
                            <h2 className="text-2xl font-serif font-bold text-dark">Related Services</h2>
                        </div>
                    </div>

                    {results.services.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {results.services.slice(0, DISPLAY_LIMIT).map((service) => (
                                    <SearchServiceCard key={service._id} service={service} />
                                ))}
                            </div>

                            {/* Show More Button for Services */}
                            {results.services.length > DISPLAY_LIMIT && (
                                <div className="mt-12 flex justify-center">
                                    <button
                                        onClick={() => navigate(`/all-services?query=${query}`)}
                                        className="flex items-center gap-2 px-8 py-3 bg-dark text-primary-dark hover:text-white rounded-full font-bold text-sm hover:bg-primary transition-all shadow-lg hover:shadow-primary/30 group"
                                    >
                                        See More Services
                                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-12 text-center text-slate-500 italic text-sm font-serif">
                            No specialized services matching this keyword.
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default SearchResultPage;