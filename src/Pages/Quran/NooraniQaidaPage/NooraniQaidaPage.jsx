import { useState, useEffect } from "react";
import {
    CheckCircle2, Sparkles, ShieldCheck,
    Globe2, Clock, Users, BookOpen
} from 'lucide-react';
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SearchTeacherCard from "../../SearchResultPage/SearchTeacherCard";
import SearchServiceCard from "../../SearchResultPage/SearchServiceCard"; // Ensure this import exists
import NooraniFAQ from "./NooraniFAQ";

const NooraniQaidaPage = () => {
    const [quranServices, setQuranServices] = useState([]);
    const [quranTeachers, setQuranTeachers] = useState([]);
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
                    // Logic for Services
                    const filteredServices = serviceRes.data.filter(s =>
                        s.status === "Accepted" &&
                        (s.title?.toLowerCase().includes("qaida") || s.category === "Quran learning")
                    ).slice(0, 3);
                    setQuranServices(filteredServices);

                    // Logic for Teachers
                    const filteredTeachers = teacherRes.data.filter(t =>
                        t.role === "teacher" &&
                        (t.category?.includes("Quran teacher") || t.specialization?.includes("Beginner"))
                    ).slice(0, 4);
                    setQuranTeachers(filteredTeachers);
                }
            } catch (err) {
                console.error("Error fetching course data:", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchData();
        return () => { isMounted = false; };
    }, [axiosPublic]);

    return (
        <main className="min-h-screen bg-[#FBFDFF] pb-20 font-body">
            {/* --- 1. HERO SECTION --- */}
            <section className="relative bg-white pt-24 pb-16 px-6 overflow-hidden" aria-labelledby="hero-heading">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full -mr-20 -mt-20" aria-hidden="true"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-8">
                            <Sparkles size={14} className="text-primary" aria-hidden="true" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Foundation Program</span>
                        </div>
                        <h1 id="hero-heading" className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]">
                            Master Arabic Basics with <br />
                            <span className="text-primary italic font-medium">Noorani Qaida</span>
                        </h1>
                        <p className="max-w-2xl text-base md:text-lg text-slate-600 mb-10 leading-relaxed">
                            The essential first step for <span className="text-slate-900 font-semibold">Quranic literacy</span>.
                            Master the Arabic alphabet and basic Tajweed rules through an Azhari-certified curriculum.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl hover:bg-black transition-all">
                                Start Learning Today
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 2. COURSE STATS --- */}
            <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-2 rounded-[2.5rem] shadow-xl border border-slate-100">
                    {[
                        { icon: <Clock size={18} />, label: "24 Lessons", sub: "Flexible Pace" },
                        { icon: <Users size={18} />, label: "1-on-1", sub: "Live Session" },
                        { icon: <ShieldCheck size={18} />, label: "Certified", sub: "Azhari Tutors" },
                        { icon: <Globe2 size={18} />, label: "Lifetime", sub: "Access" },
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center justify-center py-6 text-center group">
                            <div className="text-primary mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
                            <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">{stat.label}</p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.sub}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- 4. TEACHERS --- */}
            <section className="max-w-7xl mx-auto px-6 py-20" aria-labelledby="teachers-heading">
                <header className="mb-12">
                    <h2 id="teachers-heading" className="text-3xl font-serif font-bold text-slate-900">Recommended Tutors</h2>
                    <p className="text-slate-500 font-medium mt-2">Specialists in teaching beginners.</p>
                </header>
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(n => <div key={n} className="aspect-[4/5] bg-slate-100 animate-pulse rounded-[2.5rem]" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {quranTeachers.map(teacher => (
                            <SearchTeacherCard key={teacher._id} teacher={teacher} />
                        ))}
                    </div>
                )}
            </section>

            {/* --- 3. SERVICES SECTION (NEWLY ADDED) --- */}
            <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <BookOpen size={24} className="text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Curriculum</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Structured Qaida Courses</h2>
                        <p className="text-slate-500 mt-4 font-medium">Browse specialized services tailored to foundation learning.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(n => <div key={n} className="h-80 bg-slate-100 animate-pulse rounded-[2.5rem]" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {quranServices.length > 0 ? (
                            quranServices.map(service => (
                                <SearchServiceCard key={service._id} service={service} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <BookOpen className="text-slate-200" size={32} />
                                </div>
                                <h3 className="text-xl font-serif font-bold text-slate-500">New courses coming soon</h3>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* --- 5. LEARNING PATHWAY --- */}
            <section className="bg-slate-900 py-20 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
                            Structured Learning for <br />
                            <span className="text-primary">Lasting Success</span>
                        </h2>
                        <div className="space-y-6">
                            {[
                                { title: "Makhraj Mastery", desc: "Precise articulation of every Arabic letter." },
                                { title: "Connecting Letters", desc: "Understanding how letters change shape when joined." },
                                { title: "Tajweed Foundations", desc: "Introductory rules for smooth recitation." }
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
                            {["Letter Recognition", "Short Vowels", "Tanween Rules", "The Madd Letters", "Sukoon"].map((module, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all">
                                    <span className="text-slate-300 font-medium text-sm">{module}</span>
                                    <CheckCircle2 size={16} className="text-primary" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <NooraniFAQ />
        </main>
    );
};

export default NooraniQaidaPage;