import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2, BookOpen, ArrowLeft, Filter } from 'lucide-react';
import Fuse from 'fuse.js';
import SearchServiceCard from './SearchServiceCard';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import ServiceSortDropdown from '../Services/ServiceSortDropdown';

const AllServicesPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get('query') || "";
    const axiosPublic = useAxiosPublic();

    const [allServices, setAllServices] = useState([]);
    const [sortOrder, setSortOrder] = useState(''); // '' (Default), 'lowToHigh', 'highToLow'
    const [loading, setLoading] = useState(true);

    // Fetch raw data once
    useEffect(() => {
        const fetchAllServices = async () => {
            setLoading(true);
            try {
                const { data } = await axiosPublic.get('/services');
                setAllServices(data);
            } catch (err) {
                console.error("Failed to fetch all services", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllServices();
    }, [axiosPublic]);

    // Computation Logic (Fuzzy Search + Ranking + Price Sort)
    const filteredAndSortedServices = useMemo(() => {
        let results = [...allServices];

        // 1. Fuzzy Search
        if (query) {
            const fuse = new Fuse(results, {
                keys: ['title', 'category', 'description'],
                threshold: 0.4,
            });
            results = fuse.search(query).map(r => r.item);
        }

        // 2. Sorting & Ranking Engine
        results.sort((a, b) => {
            // If user selected a Price Sort, prioritize it
            if (sortOrder === 'lowToHigh') return a.price - b.price;
            if (sortOrder === 'highToLow') return b.price - a.price;

            // DEFAULT RANKING (By Provider ID + Efficiency)
            const getRankNumber = (uid) => {
                const match = uid?.match(/\d+/);
                return match ? parseInt(match[0], 10) : Infinity;
            };

            const rankA = getRankNumber(a.userId);
            const rankB = getRankNumber(b.userId);

            if (rankA !== rankB) return rankA - rankB;
            return (b.popularity || 0) - (a.popularity || 0);
        });

        return results;
    }, [allServices, query, sortOrder]);

    if (loading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-white" aria-live="polite">
                <Loader2 className="animate-spin text-primary mb-4" size={40} />
                <p className="font-serif italic text-slate-600">Loading educational offerings...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/30">
            {/* SEO: Hidden H1 for Indexing */}
            <h1 className="sr-only">Available Islamic Educational Services and Courses - Rahmah Institute</h1>

            {/* Sticky Navigation */}
            <header className="bg-white border-b border-slate-100 sticky top-0 z-30">
                <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors font-bold text-sm group"
                        aria-label="Go back"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden md:inline">Back to Search</span>
                    </button>

                    <div className="flex items-center gap-4">
                        <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-slate-500">
                            {filteredAndSortedServices.length} Offerings Available
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20" aria-hidden="true">
                            <BookOpen size={18} />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto px-6 py-8 md:py-12">
                {/* Header & Filter Controls */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
                            Educational <span className="text-primary italic font-medium">Offerings</span>
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-base">
                            Specialized sessions related to <span className="text-slate-900 font-bold underline decoration-primary/30">"{query || 'All'}"</span>.
                            Provided by our verified global faculty.
                        </p>
                    </div>

                    {/* Integrated Sort Dropdown */}
                    <div className="flex items-center">
                        <ServiceSortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
                    </div>
                </div>

                {/* Service Grid */}
                <section aria-label="Course list">
                    {filteredAndSortedServices.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                            {filteredAndSortedServices.map((service) => (
                                <SearchServiceCard key={service._id} service={service} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-24 flex flex-col items-center justify-center bg-white rounded-[2rem] border border-dashed border-slate-200">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                <Filter size={24} className="text-slate-300" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 font-serif">No services found</h3>
                            <p className="text-sm text-slate-500 mt-2">Try searching for "Quran", "Arabic", or "History".</p>
                        </div>
                    )}
                </section>

                <footer className="mt-24 pt-12 border-t border-slate-200 text-center">
                    <p className="font-serif italic text-slate-500 text-sm">
                        Quality Islamic education, accessible everywhere.
                    </p>
                </footer>
            </main>
        </div>
    );
};

export default AllServicesPage;