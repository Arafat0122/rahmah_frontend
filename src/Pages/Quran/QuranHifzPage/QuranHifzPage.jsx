import { useState, useEffect } from "react";
import {
    CheckCircle2, ShieldCheck, BookOpen, Brain, Award, Star, Target
} from 'lucide-react';
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SearchTeacherCard from "../../SearchResultPage/SearchTeacherCard";
import SearchServiceCard from "../../SearchResultPage/SearchServiceCard";
import HifzFAQ from "./HifzFAQ";

const QuranHifzPage = () => {
    const [hifzServices, setHifzServices] = useState([]);
    const [hifzTeachers, setHifzTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                setLoading(true);
                const [serviceRes, teacherRes] = await Promise.all([
                    axiosPublic.get("/services"),
                    axiosPublic.get("/eligible-teachers")
                ]);

                if (isMounted) {
                    // 1. Services Logic: Filter by "Quran learning" category + "hifz" or "memorization" keywords
                    // Then rank by userId (Natural Sort)
                    const filteredServices = serviceRes.data
                        .filter(s =>
                            s.status === "Accepted" &&
                            s.category === "Quran learning" &&
                            (s.title?.toLowerCase().includes("hifz") || s.title?.toLowerCase().includes("memorization"))
                        )
                        .sort((a, b) => (a.userId || "").localeCompare(b.userId || "", undefined, { numeric: true }))
                        .slice(0, 3);

                    setHifzServices(filteredServices);

                    // 2. Teacher Logic: Filter by "Hifz Teacher" within the category array
                    // Then rank by userId
                    const filteredTeachers = teacherRes.data
                        .filter(t =>
                            t.role === "teacher" &&
                            Array.isArray(t.category) &&
                            t.category.includes("Hifz Teacher")
                        )
                        .sort((a, b) => (a.userId || "").localeCompare(b.userId || "", undefined, { numeric: true }))
                        .slice(0, 4);

                    setHifzTeachers(filteredTeachers);
                }
            } catch (err) {
                console.error("Error fetching Hifz data:", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchData();
        return () => { isMounted = false; };
    }, [axiosPublic]);

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Quran Memorization (Hifz) Program",
        "description": "A structured Hifz program with personalized revision tracks, Mutashabihat mastery, and Ijazah certification.",
        "provider": {
            "@type": "Organization",
            "name": "Rahmah Institute"
        }
    };

    return (
        <main className="min-h-screen bg-[#FBFDFF] pb-20 font-body">
            <script type="application/ld+json">{JSON.stringify(schemaData)}</script>

            {/* --- 1. HERO SECTION --- */}
            <section className="relative bg-white pt-24 pb-16 px-6 overflow-hidden">
                <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full -ml-20 -mt-20" aria-hidden="true"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 mb-8">
                            <Target size={14} className="text-primary fill-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white">Spiritual Excellence</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]">
                            Preserve the Light of <br />
                            <span className="text-primary italic font-medium">The Holy Quran</span>
                        </h1>
                        <p className="max-w-2xl text-base md:text-lg text-slate-600 mb-10 leading-relaxed">
                            Join our structured <span className="text-slate-900 font-semibold">Hifz Program</span> designed for all ages. Benefit from personalized tracking, specialized revision (Muraja&rsquo;ah) techniques, and guidance from certified Huffaz.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                                Start Your Journey
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 2. HIFZ STATS --- */}
            <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-2 rounded-[2.5rem] shadow-xl border border-slate-100">
                    {[
                        { icon: <Brain size={18} />, label: "Personalized", sub: "Hifz Track" },
                        { icon: <ShieldCheck size={18} />, label: "Mutashabihat", sub: "Mastery" },
                        { icon: <Award size={18} />, label: "Ijazah", sub: "Completion" },
                        { icon: <BookOpen size={18} />, label: "Revision", sub: "Daily System" },
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center justify-center py-6 text-center group">
                            <div className="text-primary mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
                            <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">{stat.label}</p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.sub}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- 3. HIFZ SERVICES (Ranked) --- */}
            <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <Star size={24} className="text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Memorization Tracks</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Choose Your Hifz Plan</h2>
                        <p className="text-slate-500 mt-4 font-medium">From full-time intensity to part-time convenience.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(n => <div key={n} className="h-80 bg-slate-100 animate-pulse rounded-[2.5rem]" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {hifzServices.length > 0 ? (
                            hifzServices.map(service => (
                                <SearchServiceCard key={service._id} service={service} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                                <h3 className="text-xl font-serif font-bold text-slate-500">Custom Hifz Plans Available</h3>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* --- 4. TOP HUFFAZ (Ranked) --- */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <header className="mb-12">
                    <h2 className="text-3xl font-serif font-bold text-slate-900">Lead Huffaz & Mentors</h2>
                    <p className="text-slate-500 font-medium mt-2">Certified teachers with experience in multi-methodology memorization.</p>
                </header>
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(n => <div key={n} className="aspect-[4/5] bg-slate-100 animate-pulse rounded-[2.5rem]" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {hifzTeachers.map(teacher => (
                            <SearchTeacherCard key={teacher._id} teacher={teacher} />
                        ))}
                    </div>
                )}
            </section>

            {/* --- 5. THE HIFZ BLUEPRINT --- */}
            <section className="bg-slate-900 py-20 overflow-hidden relative rounded-[4rem] mx-6">
                <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
                            A Scientific Approach <br />
                            <span className="text-primary">to Memorization</span>
                        </h2>
                        <div className="space-y-6">
                            {[
                                { title: "Sabaq (New Lesson)", desc: "Daily new verses with correct Tajweed and connection to previous verses." },
                                { title: "Sabqi (Recent Revision)", desc: "Strengthening the most recently memorized portion to prevent forgetting." },
                                { title: "Manzil (Old Revision)", desc: "A systematic cycle to ensure the entire Quran remains fresh in your heart." }
                            ].map((step, i) => (
                                <div key={i} className="flex gap-5 group">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white font-black group-hover:bg-primary transition-all">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold mb-1">{step.title}</h3>
                                        <p className="text-slate-300 text-sm leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 w-full lg:max-w-md bg-white/5 rounded-[3rem] p-8 border border-white/10 backdrop-blur-sm">
                        <h3 className="text-xl font-serif font-bold text-white mb-6">Program Highlights</h3>
                        <div className="space-y-4">
                            {["Mutashabihat Identification", "Breath Control Training", "Quarterly Progress Audits", "Ijazah in Memorization", "Global Hifz Competitions"].map((module, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <span className="text-slate-300 font-medium text-sm">{module}</span>
                                    <CheckCircle2 size={16} className="text-primary" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <HifzFAQ />
        </main>
    );
};

export default QuranHifzPage;