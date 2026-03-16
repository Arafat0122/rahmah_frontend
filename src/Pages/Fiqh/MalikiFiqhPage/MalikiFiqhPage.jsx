import { useState, useEffect } from "react";
import {
    CheckCircle2, ShieldCheck, BookOpen, Sun, Globe, Landmark
} from 'lucide-react';
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SearchTeacherCard from "../../SearchResultPage/SearchTeacherCard";
import SearchServiceCard from "../../SearchResultPage/SearchServiceCard";
import MalikiFiqhFAQ from "./MalikiFiqhFAQ";

const MalikiFiqhPage = () => {
    const [fiqhServices, setFiqhServices] = useState([]);
    const [fiqhTeachers, setFiqhTeachers] = useState([]);
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
                    // 1. Services Logic: Filter by "Maleki Fiqh"
                    const filteredServices = serviceRes.data
                        .filter(s =>
                            s.status === "Accepted" &&
                            s.category === "Maleki Fiqh"
                        )
                        .sort((a, b) => (a.userId || "").localeCompare(b.userId || "", undefined, { numeric: true }))
                        .slice(0, 3);

                    setFiqhServices(filteredServices);

                    // 2. Teacher Logic: Filter by "Fiqh Maleki Teacher"
                    const filteredTeachers = teacherRes.data
                        .filter(t =>
                            t.role === "teacher" &&
                            Array.isArray(t.category) &&
                            t.category.includes("Fiqh Maleki Teacher")
                        )
                        .sort((a, b) => (a.userId || "").localeCompare(b.userId || "", undefined, { numeric: true }))
                        .slice(0, 4);

                    setFiqhTeachers(filteredTeachers);
                }
            } catch (err) {
                console.error("Error fetching Maliki Fiqh data:", err);
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
        "name": "Maliki Fiqh Mastery Program",
        "description": "A deep study of the school of Madinah, focusing on the practice of the people of Madinah and the legal heritage of Imam Malik ibn Anas.",
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
                        <Sun size={14} className="text-primary fill-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">The School of Madinah</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]">
                        Embrace the Heritage of <br />
                        <span className="text-primary italic font-medium">Imam Malik ibn Anas</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-600 mb-10 leading-relaxed">
                        Learn the legal tradition rooted in the <span className="text-slate-900 font-semibold">Amal of Madinah</span>. From foundational primers to the Muwatta, master the school known for its deep connection to the prophetic city.
                    </p>
                    <button className="px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                        Join the Madhhab Study
                    </button>
                </div>
            </section>

            {/* --- 2. FIQH STATS --- */}
            <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-2 rounded-[2.5rem] shadow-xl border border-slate-100">
                    {[
                        { icon: <Globe size={18} />, label: "Tradition", sub: "Prophetic City" },
                        { icon: <Landmark size={18} />, label: "Method", sub: "Amal Ahlul Madinah" },
                        { icon: <ShieldCheck size={18} />, label: "Rulings", sub: "Evidence-Based" },
                        { icon: <BookOpen size={18} />, label: "Texts", sub: "Maliki Primers" },
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
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Maliki Fiqh Modules</h2>
                    <p className="text-slate-500 mt-2">Specialized tracks focusing on the North and West African legal heritage.</p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(n => <div key={n} className="h-80 bg-slate-100 animate-pulse rounded-[3rem]" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {fiqhServices.length > 0 ? (
                            fiqhServices.map(service => (
                                <SearchServiceCard key={service._id} service={service} />
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-100 rounded-[3rem]">
                                <p className="text-slate-400 font-serif">Maliki Fiqh modules are currently being prepared.</p>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* --- 4. TEACHERS (Ranked) --- */}
            <section className="max-w-7xl mx-auto px-6 py-20 bg-slate-50 rounded-[4rem]">
                <header className="mb-12 text-center">
                    <h2 className="text-3xl font-serif font-bold text-slate-900">Maliki Scholars</h2>
                    <p className="text-slate-500 font-medium mt-2">Instructors with deep mastery in the Muwatta and the Maliki legal framework.</p>
                </header>
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(n => <div key={n} className="aspect-[4/5] bg-slate-200 animate-pulse rounded-[2.5rem]" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {fiqhTeachers.map(teacher => (
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
                            The Methodology <br />
                            <span className="text-primary">of the Madinan School</span>
                        </h2>
                        <div className="space-y-6">
                            {[
                                { title: "Amal Ahlul Madinah", desc: "Understanding the foundational principle of following the continuous practice of Madinah's early generations." },
                                { title: "Mukhtasar al-Khalil Study", desc: "Diving into one of the most authoritative summary texts of the Maliki school for advanced rulings." },
                                { title: "Usul of Imam Malik", desc: "Exploring the broad sources of law including Maslaha Mursala (Public Interest) and Sadd al-Dharai'." }
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
                        <h3 className="text-xl font-serif font-bold text-white mb-6">Course Path</h3>
                        <div className="space-y-4">
                            {["Matn al-'Ashmawiyya", "The Muwatta (Selected Chapters)", "Risala of Ibn Abi Zayd", "Aqrab al-Masalik", "Applied Maliki Finance"].map((module, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/10 border border-white/5 hover:border-primary/50 transition-all">
                                    <span className="text-slate-200 font-medium text-sm">{module}</span>
                                    <CheckCircle2 size={16} className="text-primary" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <MalikiFiqhFAQ />
        </main>
    );
};

export default MalikiFiqhPage;