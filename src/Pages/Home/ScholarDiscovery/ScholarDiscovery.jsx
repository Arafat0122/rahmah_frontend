import { useState, useEffect, useMemo } from 'react';
import CategoryBar from './CategoryBar';
import TopTeacherCard from './TopTeacherCard';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const categories = [
    "Quran teacher", "Arabic teacher", "Fiqh Hanafi Teacher",
    "Hadis Teacher", "Hifz Teacher", "Tafsir Teacher",
    "Islamic Finance", "Tawheed"
];

const ScholarDiscovery = () => {
    const axiosPublic = useAxiosPublic();
    const [teachers, setTeachers] = useState([]);
    const [selectedCat, setSelectedCat] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosPublic.get("/eligible-teachers")
            .then(res => {
                setTeachers(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, [axiosPublic]);

    const filtered = useMemo(() => {
        let list = selectedCat === "All"
            ? [...teachers]
            : teachers.filter(t => t.category?.includes(selectedCat));

        const sortedList = list.sort((a, b) => {
            const idA = parseInt(a.userId?.split('-')[1]) || 999999;
            const idB = parseInt(b.userId?.split('-')[1]) || 999999;
            return idA - idB;
        });

        return sortedList.slice(0, 3);
    }, [selectedCat, teachers]);

    return (
        <section className="py-16 md:py-20 bg-slate-50" aria-labelledby="discovery-title">
            <div className="max-w-[1400px] mx-auto px-6 md:px-8">

                {/* Heading Section */}
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-3 block">
                        Academic Excellence
                    </span>
                    <h2 id="discovery-title" className="font-serif text-4xl md:text-5xl text-slate-900 mb-4 tracking-tight leading-tight">
                        Meet Our <span className="italic text-slate-500 font-medium">World-Class</span> Scholars
                    </h2>
                    <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                        Connect with highly qualified instructors specializing in Islamic sciences, Quranic studies, and Arabic language.
                    </p>
                    <div className="w-12 h-[2px] bg-primary mx-auto mt-8 opacity-40 rounded-full" aria-hidden="true"></div>
                </div>

                <CategoryBar
                    categories={categories}
                    selected={selectedCat}
                    onSelect={setSelectedCat}
                />

                {/* Results Area: Horizontal Slide on Mobile/Tab, Grid on Desktop */}
                <div
                    className="mt-12 -mx-6 px-6 flex flex-row overflow-x-auto pb-10 gap-5 no-scrollbar snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:mx-0 lg:px-0 lg:overflow-visible lg:pb-0 lg:gap-6"
                    aria-live="polite"
                >
                    {loading ? (
                        [1, 2, 3, 4].map(n => (
                            <div
                                key={n}
                                className="w-[85vw] sm:w-[340px] h-[450px] bg-white animate-pulse rounded-[2.5rem] border border-slate-200 shrink-0 lg:w-full"
                                role="status"
                            />
                        ))
                    ) : (
                        <>
                            {filtered.length > 0 ? (
                                filtered.map(teacher => (
                                    <div
                                        key={teacher._id}
                                        className="w-[85vw] sm:w-[340px] lg:w-full lg:min-w-0 snap-center shrink-0"
                                    >
                                        <TopTeacherCard teacher={teacher} />
                                    </div>
                                ))
                            ) : (
                                <p className="col-span-full text-center py-10 text-slate-500 font-medium">
                                    No scholars found in this category.
                                </p>
                            )}

                            {/* View More Card */}
                            <div className="w-[85vw] sm:w-[340px] lg:w-full lg:min-w-0 snap-center shrink-0">
                                <TopTeacherCard isViewMore />
                            </div>

                            {/* Spacer to fix right-side padding in horizontal scroll */}
                            <div className="min-w-[1px] lg:hidden shrink-0" />
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ScholarDiscovery;