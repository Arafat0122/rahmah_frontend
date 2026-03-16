import { useState, useEffect } from "react";
import {
    CheckCircle2, ShieldCheck, BookOpen, GraduationCap, School, Lightbulb
} from 'lucide-react';
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SearchTeacherCard from "../../SearchResultPage/SearchTeacherCard";
import SearchServiceCard from "../../SearchResultPage/SearchServiceCard";
import AzharIbtedaiFAQ from "./AzharIbtedaiFAQ";

const AzharIbtedaiPage = () => {
    const [azharServices, setAzharServices] = useState([]);
    const [azharTeachers, setAzharTeachers] = useState([]);
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
                    // 1. Services Logic: Filter by "Azhari curriculum"
                    // Rank by userId (Natural Sort)
                    const filteredServices = serviceRes.data
                        .filter(s =>
                            s.status === "Accepted" &&
                            s.category === "Azhari curriculum" ||
                            s.title?.toLowerCase().includes("ibtedai")
                        )
                        .sort((a, b) => (a.userId || "").localeCompare(b.userId || "", undefined, { numeric: true }))
                        .slice(0, 3);

                    setAzharServices(filteredServices);

                    // 2. Teacher Logic: Filter by "Islamic Study"
                    const filteredTeachers = teacherRes.data
                        .filter(t =>
                            t.role === "teacher" &&
                            Array.isArray(t.category) &&
                            t.category.includes("Islamic Study")
                        )
                        .sort((a, b) => (a.userId || "").localeCompare(b.userId || "", undefined, { numeric: true }))
                        .slice(0, 4);

                    setAzharTeachers(filteredTeachers);
                }
            } catch (err) {
                console.error("Error fetching Azhar Ibtedai data:", err);
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
        "name": "Al-Azhar Ibtedai Islamic Curriculum",
        "description": "The primary stage of the authentic Al-Azhar curriculum, focusing on foundational Islamic sciences and Arabic literacy.",
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

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 mb-8">
                        <School size={14} className="text-primary fill-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">The Foundation of Excellence</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]">
                        Begin the Noble Journey: <br />
                        <span className="text-primary italic font-medium">Al-Azhar Ibtedai</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-600 mb-10 leading-relaxed">
                        Modeled after the world&rsquo;s oldest seat of learning. The <span className="text-slate-900 font-semibold">Ibtedai Program</span> provides young learners and beginners with a balanced foundation in Quran, Fiqh, and Arabic.
                    </p>
                    <button className="px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                        View Ibtedai Syllabus
                    </button>
                </div>
            </section>

            {/* --- 2. CURRICULUM STATS --- */}
            <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-2 rounded-[2.5rem] shadow-xl border border-slate-100">
                    {[
                        { icon: <GraduationCap size={18} />, label: "Azhari", sub: "Standard" },
                        { icon: <BookOpen size={18} />, label: "Balanced", sub: "Curriculum" },
                        { icon: <ShieldCheck size={18} />, label: "Authentic", sub: "Tradition" },
                        { icon: <Lightbulb size={18} />, label: "Primary", sub: "Focus" },
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center justify-center py-6 text-center group">
                            <div className="text-primary mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
                            <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">{stat.label}</p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.sub}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- 3. SERVICES (Ranked) --- */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Program Modules</h2>
                    <p className="text-slate-500 mt-2">Core subjects designed by Azhar scholars for foundational growth.</p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(n => <div key={n} className="h-80 bg-slate-100 animate-pulse rounded-[3rem]" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {azharServices.length > 0 ? (
                            azharServices.map(service => (
                                <SearchServiceCard key={service._id} service={service} />
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-100 rounded-[3rem]">
                                <p className="text-slate-400 font-serif">Azhari Ibtedai modules are being localized.</p>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* --- 4. TEACHERS (Ranked) --- */}
            <section className="max-w-7xl mx-auto px-6 py-20 bg-slate-50 rounded-[4rem]">
                <header className="mb-12 text-center">
                    <h2 className="text-3xl font-serif font-bold text-slate-900">Certified Instructors</h2>
                    <p className="text-slate-500 font-medium mt-2">Educators trained in the balanced methodology of Al-Azhar Al-Sharif.</p>
                </header>
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(n => <div key={n} className="aspect-[4/5] bg-slate-200 animate-pulse rounded-[2.5rem]" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {azharTeachers.map(teacher => (
                            <SearchTeacherCard key={teacher._id} teacher={teacher} />
                        ))}
                    </div>
                )}
            </section>

            {/* --- 5. METHODOLOGY BLUEPRINT --- */}
            <section className="bg-slate-900 py-24 overflow-hidden relative rounded-[4rem] mx-6 my-20">
                <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
                            The Balanced Path <br />
                            <span className="text-primary">of Al-Azhar</span>
                        </h2>
                        <div className="space-y-6">
                            {[
                                { title: "Spiritual Literacy", desc: "Instilling love for the Quran and the Prophetic character from the earliest levels." },
                                { title: "Linguistic Strength", desc: "A rigorous approach to Arabic as the key to understanding the Islamic sciences." },
                                { title: "Wasatiyyah (Moderation)", desc: "Teaching a balanced worldview that combines traditional depth with modern relevance." }
                            ].map((step, i) => (
                                <div key={i} className="flex gap-5 group">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white font-black group-hover:bg-primary transition-all">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold mb-1">{step.title}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 w-full lg:max-w-md bg-white/5 rounded-[3rem] p-8 border border-white/10 backdrop-blur-sm">
                        <h3 className="text-xl font-serif font-bold text-white mb-6">Primary Syllabus</h3>
                        <div className="space-y-4">
                            {["Quran Memorization & Tajwid", "Basic Arabic (Nouraniyah)", "Sirah & Akhlaq Basics", "Introductory Fiqh (Worship)", "Islamic Creed (Simplified)"].map((module, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/10 border border-white/5 hover:border-primary/50 transition-all">
                                    <span className="text-slate-200 font-medium text-sm">{module}</span>
                                    <CheckCircle2 size={16} className="text-primary" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <AzharIbtedaiFAQ />
        </main>
    );
};

export default AzharIbtedaiPage;