import { useState, useEffect, useRef } from 'react';
import { Star, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import TopTeacherCard from '../ScholarDiscovery/TopTeacherCard';

const FEATURED_TEACHER_IDS = [
    "680d530a6287fdb0902156dd",
    "67df05f06087743fe2f276b0",
    "67e6b5cb67dd3242569be947",
    "67e45cf8dd087cfc4a50d5bb",
    "68d2b7f9c093e15b5c073a45",
    "67df1ed7f3f9b1422228604b"
];

const FeaturedFaculty = () => {
    const axiosPublic = useAxiosPublic();
    const [featuredTeachers, setFeaturedTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPaused, setIsPaused] = useState(false); // For pausing on hover
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchTopTeachers = async () => {
            try {
                const requests = FEATURED_TEACHER_IDS.map(id => axiosPublic.get(`/users/${id}`));
                const responses = await Promise.all(requests);
                setFeaturedTeachers(responses.map(res => res.data));
            } catch (err) {
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTopTeachers();
    }, [axiosPublic]);

    // --- Auto Scroll Logic ---
    useEffect(() => {
        if (loading || isPaused) return;

        const interval = setInterval(() => {
            if (scrollRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

                // If we've reached the end, reset to start
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    handleScroll('right');
                }
            }
        }, 7000); // 7 Seconds

        return () => clearInterval(interval);
    }, [loading, isPaused, featuredTeachers]);

    const handleScroll = (direction) => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            // On mobile clientWidth is the card width, on desktop it scrolls a full "view"
            const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": featuredTeachers.map((t, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
                "@type": "Person",
                "name": t.displayName,
                "jobTitle": "Faculty Scholar",
                "image": t.photoURL,
                "description": `Senior scholar specializing in ${t.category?.join(", ")}`
            }
        }))
    };

    return (
        <section className="py-20 bg-white overflow-hidden" aria-labelledby="featured-faculty-title">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="max-w-[1400px] mx-auto px-6 md:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="max-w-2xl text-left">
                        <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-4">
                            <Star size={14} className="fill-primary" /> Senior Faculty
                        </div>
                        <h2 id="featured-faculty-title" className="font-serif text-4xl md:text-5xl text-slate-900 leading-tight tracking-tight">
                            Meet Our <span className="italic text-slate-500 font-medium">Top Rated</span> <br />World-Class Scholars
                        </h2>
                    </div>

                    <div className="hidden md:flex gap-3">
                        <button
                            onClick={() => handleScroll('left')}
                            className="p-4 rounded-full border border-slate-200 text-slate-500 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => handleScroll('right')}
                            className="p-4 rounded-full border border-slate-200 text-slate-500 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
                            aria-label="Scroll right"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className="flex flex-row overflow-x-auto -mx-6 px-6 pb-12 gap-5 no-scrollbar snap-x snap-mandatory scroll-smooth"
                >
                    {loading ? (
                        [1, 2, 3, 4].map(n => (
                            <div key={n} className="w-[85vw] sm:w-[340px] shrink-0 h-[480px] bg-slate-50 animate-pulse rounded-[2.5rem] border border-slate-100" />
                        ))
                    ) : (
                        <>
                            {featuredTeachers.map((teacher) => (
                                <div
                                    key={teacher._id}
                                    className="w-[85vw] sm:w-[340px] shrink-0 snap-center transition-all duration-500"
                                >
                                    <TopTeacherCard teacher={teacher} />
                                </div>
                            ))}

                            <div className="w-[85vw] sm:w-[340px] shrink-0 snap-center">
                                <div className="group h-full min-h-[450px] flex flex-col items-center justify-center bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[2.5rem] hover:border-primary/50 hover:bg-white transition-all duration-500 cursor-pointer p-8 text-center">
                                    <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-300 group-hover:text-primary transition-all border border-slate-100">
                                        <Award size={24} />
                                    </div>
                                    <h4 className="mt-6 font-serif font-bold text-slate-900 text-xl">Global Faculty</h4>
                                    <p className="text-[11px] text-slate-600 font-bold uppercase tracking-[0.2em] mt-3 leading-relaxed">
                                        Join 50+ Certified<br />Senior Scholars
                                    </p>
                                </div>
                            </div>
                            <div className="min-w-[1px] shrink-0" />
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FeaturedFaculty;