import { useState, useEffect } from "react";
import {
    CheckCircle2, ShieldCheck, BookOpen, Scroll, Award, Calendar, ExternalLink, Quote
} from 'lucide-react';
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SearchTeacherCard from "../../SearchResultPage/SearchTeacherCard";
import SearchServiceCard from "../../SearchResultPage/SearchServiceCard";
import DawraSemester1FAQ from "./DawraSemester1FAQ";

const DawraSemester1Page = () => {
    const [dawraServices, setDawraServices] = useState([]);
    const [dawraTeachers, setDawraTeachers] = useState([]);
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
                    // 1. Services Logic: Filter by "Dawra hadis class"
                    const filteredServices = serviceRes.data
                        .filter(s =>
                            s.status === "Accepted" &&
                            s.category === "Dawra hadis class" ||
                            s.title?.toLowerCase().includes("semester 1")
                        )
                        .sort((a, b) => (a.userId || "").localeCompare(b.userId || "", undefined, { numeric: true }))
                        .slice(0, 3);

                    setDawraServices(filteredServices);

                    // 2. Teacher Logic: Filter by "Hadis Teacher"
                    const filteredTeachers = teacherRes.data
                        .filter(t =>
                            t.role === "teacher" &&
                            Array.isArray(t.category) &&
                            t.category.includes("Hadis Teacher")
                        )
                        .sort((a, b) => (a.userId || "").localeCompare(b.userId || "", undefined, { numeric: true }))
                        .slice(0, 4);

                    setDawraTeachers(filteredTeachers);
                }
            } catch (err) {
                console.error("Error fetching Dawra Semester 1 data:", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchData();
        return () => { isMounted = false; };
    }, [axiosPublic]);

    return (
        <main className="min-h-screen bg-[#FBFDFF] pb-20 pt-4 font-body">
            {/* --- ANNOUNCEMENT BAR --- */}
            <div className="bg-slate-200 text-black py-3 px-6 text-center text-sm font-medium">
                <span className="text-primary font-bold">📢 Special Announcement:</span> Exclusive Dawra Program for Sisters begins <span className="underline decoration-primary">15 Shawwal</span>.
                <a href="https://dawra.rahmahinstitute.com" target="_blank" className="ml-2 inline-flex items-center gap-1 text-primary hover:text-white transition-colors">
                    Visit dawra.rahmahinstitute.com <ExternalLink size={14} />
                </a>
            </div>

            {/* --- 1. HERO SECTION --- */}
            <section className="relative bg-white pt-5 pb-16 px-6 overflow-hidden">
                <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/10 blur-[120px] rounded-full -ml-20 -mt-20" aria-hidden="true"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
                            <Calendar size={14} className="text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">In-Depth Hadith Studies</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]">
                            Islamic Dawra Program <br />
                            <span className="text-primary italic font-medium">Semester 1 Foundations</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-600 mb-10 leading-relaxed">
                            The pinnacle of traditional Islamic education. Semester 1 focuses on the introductory authentication methods and the first volumes of the <span className="text-slate-900 font-semibold">Sihah al-Sittah</span>.
                        </p>
                        <div className="flex gap-4">
                            <button className="px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                                Enroll in Semester 1
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 2. SEMESTER CORE FOCUS --- */}
            <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-2 rounded-[2.5rem] shadow-xl border border-slate-100">
                    {[
                        { icon: <Scroll size={18} />, label: "Introduction", sub: "Hadith Cannon" },
                        { icon: <BookOpen size={18} />, label: "Sahih Bukhari", sub: "Vol 1 Focus" },
                        { icon: <ShieldCheck size={18} />, label: "Isnad", sub: "Chain Analysis" },
                        { icon: <Award size={18} />, label: "Ijazah", sub: "Chain Link" },
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center justify-center py-6 text-center group">
                            <div className="text-primary mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
                            <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">{stat.label}</p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.sub}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- 3. SERVICES (Semester 1 Classes) --- */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="mb-12 flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Semester 1 Modules</h2>
                        <p className="text-slate-500 mt-2">Specialized Dawra sessions covering foundational texts.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(n => <div key={n} className="h-80 bg-slate-100 animate-pulse rounded-[3rem]" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {dawraServices.length > 0 ? (
                            dawraServices.map(service => (
                                <SearchServiceCard key={service._id} service={service} />
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-100 rounded-[3rem]">
                                <p className="text-slate-400 font-serif">Semester 1 modules are currently being finalized.</p>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* --- 4. HADITH SCHOLARS --- */}
            <section className="max-w-7xl mx-auto px-6 py-20 bg-slate-50 rounded-[4rem]">
                <header className="mb-12 text-center">
                    <h2 className="text-3xl font-serif font-bold text-slate-900">Hadith Specialists</h2>
                    <p className="text-slate-500 font-medium mt-2">Scholars with deep specialization in the sciences of Riwayah and Dirayah.</p>
                </header>
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(n => <div key={n} className="aspect-[4/5] bg-slate-200 animate-pulse rounded-[2.5rem]" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {dawraTeachers.map(teacher => (
                            <SearchTeacherCard key={teacher._id} teacher={teacher} />
                        ))}
                    </div>
                )}
            </section>

            {/* --- 5. SISTERS PROGRAM HIGHLIGHT --- */}
            <section className="max-w-7xl mx-auto px-6 my-24">
                <div className="bg-primary/5 rounded-[4rem] p-12 flex flex-col md:flex-row items-center gap-12 border border-primary/10">
                    <div className="flex-1">
                        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Sisters&rsquo; Dawra Program</h2>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            We are proud to offer a dedicated Dawra track exclusively for sisters, beginning on <span className="font-bold text-slate-900">15 Shawwal</span>. This program is designed to provide the same academic rigor with a tailored environment for female students of knowledge.
                        </p>
                        <ul className="space-y-3 mb-8">
                            {["Female Hadith Specialists", "Flexible Scheduling", "Dedicated Student Support"].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                                    <CheckCircle2 size={16} className="text-primary" /> {item}
                                </li>
                            ))}
                        </ul>
                        <a href="https://dawra.rahmahinstitute.com" className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-primary transition-all inline-block">
                            Register for Sisters&rsquo; Track
                        </a>
                    </div>
                    <div className="flex-1 bg-white p-8 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <Quote className="absolute top-4 right-4 text-primary/10" size={100} />
                        <p className="italic text-slate-700 relative z-10 leading-relaxed text-lg">
                            &rdquo;The pursuit of knowledge is an obligation upon every Muslim, and the Dawra program serves as the bridge between contemporary life and Prophetic wisdom.&rdquo;
                        </p>
                    </div>
                </div>
            </section>

            <DawraSemester1FAQ />
        </main>
    );
};

export default DawraSemester1Page;