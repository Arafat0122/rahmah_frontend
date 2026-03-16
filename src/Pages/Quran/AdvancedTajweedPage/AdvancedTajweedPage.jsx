import { useState, useEffect } from "react";
import {
    CheckCircle2, ShieldCheck, BookOpen, Music, Award, Star
} from 'lucide-react';
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SearchTeacherCard from "../../SearchResultPage/SearchTeacherCard";
import SearchServiceCard from "../../SearchResultPage/SearchServiceCard";
import AdvancedTajweedFAQ from "./AdvancedTajweedFAQ";

const AdvancedTajweedPage = () => {
    const [tajweedServices, setTajweedServices] = useState([]);
    const [tajweedTeachers, setTajweedTeachers] = useState([]);
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
                    // 1. Services Logic: Filter by "Quran learning" category + Title keywords
                    // Then rank by userId
                    const filteredServices = serviceRes.data
                        .filter(s =>
                            s.status === "Accepted" &&
                            s.category === "Quran learning" &&
                            (s.title?.toLowerCase().includes("advanced") || s.title?.toLowerCase().includes("tilawah"))
                        )
                        .sort((a, b) => (a.userId || "").localeCompare(b.userId || "", undefined, { numeric: true }))
                        .slice(0, 3);

                    setTajweedServices(filteredServices);

                    // 2. Teacher Logic: Filter by "Quran teacher" or "Hifz Teacher" within the category array
                    // Then rank by userId
                    const filteredTeachers = teacherRes.data
                        .filter(t =>
                            t.role === "teacher" &&
                            Array.isArray(t.category) &&
                            (t.category.includes("Quran teacher") || t.category.includes("Hifz Teacher"))
                        )
                        .sort((a, b) => (a.userId || "").localeCompare(b.userId || "", undefined, { numeric: true }))
                        .slice(0, 4);

                    setTajweedTeachers(filteredTeachers);
                }
            } catch (err) {
                console.error("Error fetching Advanced Tajweed data:", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchData();
        return () => { isMounted = false; };
    }, [axiosPublic]);

    // SEO Meta Data (To be used with React Helmet if installed)
    // const pageTitle = "Advanced Tajweed & Tilawah | Master the Art of Tarteel";
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Advanced Tajweed & Tilawah Mastery",
        "description": "Professional level Quranic recitation course focusing on applied Tajweed, Maqamat, and Ijazah preparation.",
        "provider": {
            "@type": "Organization",
            "name": "Rahmah Institute"
        }
    };

    return (
        <main className="min-h-screen bg-[#FBFDFF] pb-20 font-body">
            <script type="application/ld+json">{JSON.stringify(schemaData)}</script>

            {/* --- 1. HERO SECTION (Advanced Focus) --- */}
            <section className="relative bg-white pt-24 pb-16 px-6 overflow-hidden" aria-labelledby="advanced-hero-heading">
                <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full -ml-20 -mt-20" aria-hidden="true"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 mb-8">
                            <Star size={14} className="text-primary fill-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white">Professional Mastery</span>
                        </div>
                        <h1 id="advanced-hero-heading" className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]">
                            Master the Art of <br />
                            <span className="text-primary italic font-medium">Tilawah & Maqamat</span>
                        </h1>
                        <p className="max-w-2xl text-base md:text-lg text-slate-600 mb-10 leading-relaxed">
                            Elevate your recitation to a professional standard. Deep dive into the <span className="text-slate-900 font-semibold">nuances of Sifat</span>, breath control, and the melodic science of Tilawah with Ijazah-certified Qaris.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                                Apply for Evaluation
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 2. ADVANCED STATS --- */}
            <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-2 rounded-[2.5rem] shadow-xl border border-slate-100">
                    {[
                        { icon: <Music size={18} />, label: "Maqamat", sub: "Melodic Tones" },
                        { icon: <Award size={18} />, label: "Ijazah", sub: "Certification" },
                        { icon: <ShieldCheck size={18} />, label: "Isnad", sub: "Broken Chain" },
                        { icon: <BookOpen size={18} />, label: "Applied", sub: "Theory" },
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center justify-center py-6 text-center group">
                            <div className="text-primary mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
                            <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">{stat.label}</p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.sub}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- 3. ADVANCED MODULES --- */}
            <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <Award size={24} className="text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Ijazah Pathway</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Professional Tilawah Modules</h2>
                        <p className="text-slate-500 mt-4 font-medium">Advanced specialization for students who have completed basic Tajweed.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(n => <div key={n} className="h-80 bg-slate-100 animate-pulse rounded-[2.5rem]" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {tajweedServices.length > 0 ? (
                            tajweedServices.map(service => (
                                <SearchServiceCard key={service._id} service={service} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                                <h3 className="text-xl font-serif font-bold text-slate-500">New Advanced Batches Opening Soon</h3>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* --- 4. TOP TIER QARIS --- */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <header className="mb-12">
                    <h2 className="text-3xl font-serif font-bold text-slate-900">World-Class Qira&rsquo;at Instructors</h2>
                    <p className="text-slate-500 font-medium mt-2">Study under scholars with high Sanad (chains of narration).</p>
                </header>
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(n => <div key={n} className="aspect-[4/5] bg-slate-100 animate-pulse rounded-[2.5rem]" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tajweedTeachers.map(teacher => (
                            <SearchTeacherCard key={teacher._id} teacher={teacher} />
                        ))}
                    </div>
                )}
            </section>

            {/* --- 5. THE ADVANCED CURRICULUM --- */}
            <section className="bg-slate-900 py-20 overflow-hidden relative rounded-[4rem] mx-6">
                <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
                            Journey to <br />
                            <span className="text-primary">Recitation Perfection</span>
                        </h2>
                        <div className="space-y-6">
                            {[
                                { title: "Applied Tajweed Nuances", desc: "Focus on Al-Waqf wal-Ibtida (Stopping and Starting) and subtle letter traits." },
                                { title: "Voice & Breath Control", desc: "Techniques used by world-renowned Qaris to maintain long verses with ease." },
                                { title: "Introduction to Maqamat", desc: "Understanding the spiritual melodies (Bayati, Nahawand, Rast) without losing Tajweed rules." }
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
                        <h3 className="text-xl font-serif font-bold text-white mb-6">Course Syllabus</h3>
                        <div className="space-y-4">
                            {["Advanced Sifat al-Huroof", "Tuhfat al-Atfal Deep Dive", "Al-Jazariyyah Study", "Introduction to 10 Qira'at", "Professional Tilawah Coaching"].map((module, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <span className="text-slate-300 font-medium text-sm">{module}</span>
                                    <CheckCircle2 size={16} className="text-primary" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <AdvancedTajweedFAQ />
        </main>
    );
};

export default AdvancedTajweedPage;