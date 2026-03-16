import { useState, useEffect } from "react";
import {
    CheckCircle2, ShieldCheck, BookOpen, Scroll, Award, ExternalLink, Quote, Sparkles
} from 'lucide-react';
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SearchTeacherCard from "../../SearchResultPage/SearchTeacherCard";
import SearchServiceCard from "../../SearchResultPage/SearchServiceCard";
import DawraSemester3FAQ from "./DawraSemester3FAQ";

const DawraSemester3Page = () => {
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
                    // 1. Services Logic: Filter by &ldquo;Dawra hadis class&rdquo; + &ldquo;semester 3&rdquo;
                    const filteredServices = serviceRes.data
                        .filter(s =>
                            s.status === "Accepted" &&
                            s.category === "Dawra hadis class" ||
                            s.title?.toLowerCase().includes("semester 3")
                        )
                        .sort((a, b) => (a.userId || "").localeCompare(b.userId || "", undefined, { numeric: true }))
                        .slice(0, 3);

                    setDawraServices(filteredServices);

                    // 2. Teacher Logic: Filter by &ldquo;Hadis Teacher&rdquo;
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
                console.error("Error fetching Dawra Semester 3 data:", err);
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
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 blur-[120px] rounded-full -mr-20 -mt-20" aria-hidden="true"></div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
                        <Sparkles size={14} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">The Culmination of Knowledge</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]">
                        Islamic Dawra Program <br />
                        <span className="text-primary italic font-medium">Semester 3 Graduation</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-600 mb-10 leading-relaxed">
                        Completing the sacred journey. Semester 3 covers the final portions of the <span className="text-slate-900 font-semibold">Kutub al-Sittah</span>, culminating in the official graduation ceremonies and the granting of <span className="text-slate-900 font-semibold">Ijazahs</span> with connected chains to the Prophet (PBUH).
                    </p>
                    <button className="px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                        Apply for Final Semester
                    </button>
                </div>
            </section>

            {/* --- 2. SEMESTER CORE FOCUS --- */}
            <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-2 rounded-[2.5rem] shadow-xl border border-slate-100">
                    {[
                        { icon: <Scroll size={18} />, label: "Completion", sub: "Final Books" },
                        { icon: <BookOpen size={18} />, label: "Sunan", sub: "Ibn Majah & Nasai" },
                        { icon: <ShieldCheck size={18} />, label: "Authority", sub: "Graduation" },
                        { icon: <Award size={18} />, label: "Ijazah", sub: "Chained Sanad" },
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center justify-center py-6 text-center group">
                            <div className="text-primary mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
                            <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">{stat.label}</p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.sub}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- 3. SERVICES (Semester 3 Classes) --- */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Semester 3 Modules</h2>
                    <p className="text-slate-500 mt-2">The concluding academic modules for the Dawra program.</p>
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
                                <p className="text-slate-400 font-serif">Semester 3 modules will be available for registration shortly.</p>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* --- 4. HADITH SCHOLARS --- */}
            <section className="max-w-7xl mx-auto px-6 py-20 bg-slate-50 rounded-[4rem]">
                <header className="mb-12 text-center">
                    <h2 className="text-3xl font-serif font-bold text-slate-900">Distinguished Hadith Shuyookh</h2>
                    <p className="text-slate-500 font-medium mt-2">The academic board responsible for the final evaluations and Ijazahs.</p>
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
                <div className="bg-primary rounded-[4rem] p-12 flex flex-col md:flex-row items-center gap-12 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -mr-32 -mt-32"></div>
                    <div className="flex-1 relative z-10">
                        <h2 className="text-3xl font-serif font-bold mb-4">Sisters&rsquo; Dawra: Registration Open</h2>
                        <p className="text-white/90 mb-6 leading-relaxed">
                            Our flagship Sisters&rsquo; Dawra program begins on <span className="font-bold border-b-2 border-white">15 Shawwal</span>. This program provides an unparalleled opportunity for sisters to gain mastery in Hadith sciences from the comfort of their homes, under the guidance of world-class scholars.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            <div className="bg-white/10 p-4 rounded-2xl flex items-center gap-3">
                                <CheckCircle2 size={18} />
                                <span className="text-xs font-bold uppercase">Shawwal Intake</span>
                            </div>
                            <div className="bg-white/10 p-4 rounded-2xl flex items-center gap-3">
                                <CheckCircle2 size={18} />
                                <span className="text-xs font-bold uppercase">Connected Sanad</span>
                            </div>
                        </div>
                        <a href="https://dawra.rahmahinstitute.com" target="_blank" className="px-10 py-4 bg-white text-primary rounded-2xl font-black shadow-lg hover:bg-slate-900 hover:text-white transition-all inline-block">
                            Secure Your Seat Now
                        </a>
                    </div>
                    <div className="flex-1 w-full bg-slate-900/20 p-8 rounded-[3rem] border border-white/20 backdrop-blur-sm">
                        <Quote className="text-white/20 mb-6" size={60} />
                        <p className="text-lg italic font-serif leading-relaxed text-white">
                            &ldquo;Graduating from the Dawra is not the end, but the beginning of a life dedicated to the service of the Sunnah. We invite all sisters to take this step with us on 15 Shawwal.&rdquo;
                        </p>
                    </div>
                </div>
            </section>

            <DawraSemester3FAQ />
        </main>
    );
};

export default DawraSemester3Page;