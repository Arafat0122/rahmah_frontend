import { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedInstructors = ({ teachersData }) => {
    const scrollRef = useRef(null);

    // Manual scroll function
    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 350;
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

            if (direction === 'right') {
                // If we are at the end, jump back to start
                if (scrollLeft + clientWidth >= scrollWidth - 5) {
                    scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            } else {
                scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        }
    };

    // Auto-scroll logic
    useEffect(() => {
        const interval = setInterval(() => {
            scroll('right');
        }, 5000);

        return () => clearInterval(interval);
    }, [teachersData]); // Re-run if data changes

    return (
        <section
            className="max-w-[1400px] mx-auto px-6 md:px-8 mt-16 lg:mt-24 w-full shrink-0"
            aria-labelledby="featured-instructors-heading"
        >
            {/* Header with Navigation */}
            <div className="flex justify-between items-end mb-6">
                <div className="shrink-0 text-left lg:border-r lg:border-slate-300 lg:pr-12">
                    <h2
                        id="featured-instructors-heading"
                        className="text-[11px] font-black text-primary uppercase tracking-[0.3em] mb-2"
                    >
                        Elite scholars
                    </h2>
                    <p className="text-xl md:text-2xl font-serif font-bold text-slate-900 leading-tight">
                        Featured <span className="italic text-slate-500 font-medium">Instructors</span>
                    </p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        aria-label="Scroll left"
                        className="p-2 border border-slate-300 rounded-full hover:bg-slate-100 transition-all active:scale-90 shadow-sm text-slate-700"
                    >
                        <ChevronLeft size={18} aria-hidden="true" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        aria-label="Scroll right"
                        className="p-2 border border-slate-300 rounded-full hover:bg-slate-100 transition-all active:scale-90 shadow-sm text-slate-700"
                    >
                        <ChevronRight size={18} aria-hidden="true" />
                    </button>
                </div>
            </div>

            {/* Scrolling Container */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory focus:outline-none"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                tabIndex="0"
                role="region"
                aria-label="Instructors list"
            >
                {teachersData?.map((teacher, index) => (
                    <Link
                        to={`/teacher/${teacher._id || teacher.id}`}
                        key={teacher._id || teacher.id || index}
                        aria-label={`View profile of ${teacher.displayName || teacher.name}, ${teacher.category || teacher.specialty}`}
                        className="min-w-[280px] md:min-w-[340px] snap-start flex bg-slate-50 rounded-2xl p-4 border border-slate-200 hover:border-primary/40 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 cursor-pointer group outline-offset-4"
                    >
                        {/* Profile Image */}
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white shadow-sm bg-slate-200">
                            <img
                                src={teacher.photoURL || teacher.image}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                alt={teacher.displayName || teacher.name}
                            />
                        </div>

                        {/* Teacher Info */}
                        <div className="ml-4 flex flex-col justify-center flex-1 overflow-hidden">
                            <h3 className="font-serif font-bold text-base md:text-lg text-slate-900 leading-tight truncate group-hover:text-primary transition-colors">
                                {teacher.displayName || teacher.name}
                            </h3>

                            <p className="text-[11px] font-bold text-slate-600 mt-0.5 truncate uppercase tracking-tight">
                                {teacher.category || teacher.specialty}
                            </p>

                            <div className="mt-3 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-primary font-black leading-none uppercase tracking-tighter">
                                        Rate
                                    </span>
                                    <span className="text-sm font-black text-slate-900">
                                        ${teacher.maxRate || teacher.rate}
                                        <span className="text-[9px] text-slate-600 font-bold ml-0.5">/hr</span>
                                    </span>
                                </div>

                                <div className="flex gap-1.5">
                                    <span className="text-[9px] bg-white px-2 py-0.5 rounded-md border border-slate-300 font-bold text-slate-700 uppercase">
                                        {teacher.gender}
                                    </span>
                                    <span className="text-[9px] bg-primary text-white px-2 py-0.5 rounded-md font-bold shadow-sm">
                                        Pro
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default FeaturedInstructors;