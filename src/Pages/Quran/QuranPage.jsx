import { useState, useEffect } from "react";
import { BookOpen, GraduationCap, CheckCircle2, Sparkles, ShieldCheck, Globe2 } from 'lucide-react';
import SearchTeacherCard from "../SearchResultPage/SearchTeacherCard";
import SearchServiceCard from "../SearchResultPage/SearchServiceCard";
import QuranFAQ from "./QuranFAQ";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const QuranPage = () => {
    const [quranServices, setQuranServices] = useState([]);
    const [quranTeachers, setQuranTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // 1. Fetch Services (Filtered for Quran)
                const serviceRes = await axiosPublic.get("/services");
                const filteredServices = serviceRes.data.filter(s =>
                    s.status === "Accepted" &&
                    (s.category === "Quran learning" || s.category === "Tafsir" || s.category === "Arabic language")
                ).slice(0, 6);
                setQuranServices(filteredServices);

                // 2. Fetch Teachers (Filtered for Quran specialists)
                const teacherRes = await axiosPublic.get("/eligible-teachers"); // Assuming teachers are in /users
                const filteredTeachers = teacherRes.data.filter(t =>
                    t.role === "teacher" &&
                    (t.category?.includes("Quran teacher") || t.category?.includes("Arabic teacher"))
                ).slice(0, 8); // Limit to top 4 for the featured section

                setQuranTeachers(filteredTeachers);
            } catch (err) {
                console.error("Error fetching Quran page data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [axiosPublic]);

    return (
        <div className="min-h-screen bg-[#FBFDFF] pb-20 font-body">
            {/* --- 1. SEO & HERO SECTION --- */}
            <section className="relative bg-white pt-24 pb-12 px-6 overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full -mr-20 -mt-20"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col items-center">

                        {/* 1. Sleek Top Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/60 mb-8">
                            <div className="flex -space-x-1.5">
                                {[1, 2, 3].map((i) => (
                                    <img
                                        key={i}
                                        src={`https://i.pravatar.cc/100?u=scholar${i}`}
                                        className="w-5 h-5 rounded-full ring-2 ring-white object-cover"
                                        alt="Faculty"
                                    />
                                ))}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Azhari Certified Faculty
                            </span>
                        </div>

                        {/* 2. Balanced Headline (Scaled for Professionalism) */}
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-6 tracking-tight text-center leading-[1.1]">
                            Academic Excellence in <br />
                            <span className="text-primary italic font-medium">Quranic Sciences</span>
                        </h1>

                        {/* 3. Refined Description (Best for SEO & Readability) */}
                        <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-500 text-center mb-12 leading-relaxed">
                            Our <span className="text-slate-900 font-semibold">Online Quran Academy</span> bridges traditional
                            Azhari scholarship with modern pedagogy. Master <span className="text-slate-700">Tajweed</span>,
                            <span className="text-slate-700">Hifz</span>, and <span className="text-slate-700">Tafsir</span>
                            through a structured, Ijazah-certified curriculum designed for global students.
                        </p>

                        {/* 4. Organized Feature Grid (The "Framer" Grid) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl">
                            {[
                                {
                                    label: "Ijazah Certification",
                                    desc: "Authentic Isnad (chains of transmission) verified by senior scholars.",
                                    icon: "01"
                                },
                                {
                                    label: "Flexible Pedagogy",
                                    desc: "Adaptive learning paths for beginners to advanced students worldwide.",
                                    icon: "02"
                                },
                                {
                                    label: "Theological Integrity",
                                    desc: "Curriculums audited for accuracy by certified Islamic institutions.",
                                    icon: "03"
                                }
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="group relative bg-white border border-slate-200/60 p-6 rounded-[1.5rem] hover:border-primary/30 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                                >
                                    <span className="text-[10px] font-black text-slate-200 group-hover:text-primary/20 transition-colors duration-500 absolute top-6 right-8">
                                        {item.icon}
                                    </span>
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-3">
                                        {item.label}
                                    </h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Section Header */}
                    <header className="relative bg-white border-b border-slate-100 overflow-hidden">
                        {/* Subtle Background Pattern/Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
                            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-slate-100 rounded-full blur-[100px]" />
                        </div>

                        <div className="relative pt-12 py-2 lg:py-7 px-6 max-w-5xl mx-auto text-center">
                            {/* Animated Accent Label */}
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="h-[1px] w-8 bg-slate-200" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/80">
                                    Academic Excellence
                                </span>
                                <div className="h-[1px] w-8 bg-slate-200" />
                            </div>

                            {/* Main Heading with Refined Serif Mix */}
                            <h2 className="font-serif text-2xl md:text-5xl text-slate-900 mb-6 tracking-tight leading-[1.1]">
                                Why Our Quranic <span className="relative inline-block">
                                    <span className="italic text-slate-500 font-light pr-2">Program</span>
                                    {/* Subtle underline for the italic word */}
                                    <svg className="absolute -bottom-2 left-0 w-full h-2 text-primary/10 hidden lg:flex" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </span> Stands Apart
                            </h2>
                        </div>
                    </header>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100 border border-slate-100 rounded-[2rem] overflow-hidden">
                        {[
                            {
                                title: "Azhari Excellence",
                                desc: "Instructors graduated from Al-Azhar University, ensuring the highest level of scholarly authority.",
                                icon: <ShieldCheck className="text-primary" size={20} />
                            },
                            {
                                title: "Interactive LMS",
                                desc: "Track progress, access resources, and join live sessions through our custom-engineered portal.",
                                icon: <Globe2 className="text-primary" size={20} />
                            },
                            {
                                title: "Personalized Hifz",
                                desc: "1-on-1 memorization plans adapted to your pace, schedule, and individual learning capacity.",
                                icon: <Sparkles className="text-primary" size={20} />
                            },
                            {
                                title: "Authentic Isnad",
                                desc: "Earn Ijazah through direct chains of transmission, preserving the Prophetic tradition.",
                                icon: <CheckCircle2 className="text-primary" size={20} />
                            }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="group bg-white p-10 hover:bg-slate-50/50 transition-all duration-500"
                            >
                                <div className="mb-8 p-3 bg-slate-50 w-fit rounded-2xl group-hover:scale-110 group-hover:bg-white group-hover:shadow-sm transition-all duration-500">
                                    {item.icon}
                                </div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">

                {/* --- 2. TEACHERS SECTION (SEO Authority) --- */}
                <section className="my-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div className="max-w-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <GraduationCap size={24} className="text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Faculty</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Featured Quranic Scholars</h2>
                            <p className="text-slate-500 mt-4 font-medium">Verified experts from prestigious Islamic institutions dedicated to your growth.</p>
                        </div>
                    </div>

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

                {/* --- 3. SERVICES SECTION --- */}
                <section className="py-12 border-t border-slate-100">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div className="max-w-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <BookOpen size={24} className="text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Curriculum</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Structured Quran Courses</h2>
                            <p className="text-slate-500 mt-4 font-medium">Browse specialized services tailored to your specific learning goals.</p>
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
                                    <h3 className="text-xl font-serif font-bold text-slate-500">New Quran courses coming soon</h3>
                                    <p className="text-slate-300 text-sm mt-2">Our scholars are currently designing new curriculums.</p>
                                </div>
                            )}
                        </div>
                    )}
                </section>

                <QuranFAQ />
            </div>
        </div>
    );
};

export default QuranPage;