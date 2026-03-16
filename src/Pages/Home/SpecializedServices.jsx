import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, User2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const SpecializedServices = ({ servicesData }) => {
    const serviceScrollRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    const scroll = (direction) => {
        if (serviceScrollRef.current) {
            const scrollAmount = 400;
            const { scrollLeft, scrollWidth, clientWidth } = serviceScrollRef.current;

            if (direction === 'right') {
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    serviceScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    serviceScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            } else {
                serviceScrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        }
    };

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            scroll('right');
        }, 5000);
        return () => clearInterval(interval);
    }, [servicesData, isPaused]);

    return (
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 mt-12 mb-10 w-full shrink-0">
            {/* Header Area */}
            <div className="flex justify-between items-end mb-6">
                <div className="shrink-0 text-left lg:border-r lg:border-slate-300 lg:pr-12">
                    {/* Contrast Fix: Text-primary or text-slate-700 for better visibility */}
                    <h4 className="text-[11px] font-black text-primary uppercase tracking-[0.3em] mb-2">
                        Rahmah Institute
                    </h4>
                    <p className="text-xl md:text-2xl font-serif font-bold text-slate-900 leading-tight">
                        {/* Contrast Fix: Darkened italicized text from slate-400 to slate-500 */}
                        Specialized <span className="italic text-slate-500 font-medium">Services</span>
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="p-2.5 border border-slate-300 rounded-full hover:bg-slate-50 transition-all active:scale-90 shadow-sm"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={20} className="text-slate-700" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-2.5 border border-slate-300 rounded-full hover:bg-slate-50 transition-all active:scale-90 shadow-sm"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={20} className="text-slate-700" />
                    </button>
                </div>
            </div>

            {/* Scrolling Container */}
            <div
                ref={serviceScrollRef}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="flex gap-6 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                tabIndex="0"
                role="region"
                aria-label="Specialized services carousel"
            >
                {servicesData?.map((service, index) => (
                    <Link
                        to={`/service-details/${service._id || service.id}`}
                        key={service._id || index}
                        className="min-w-[300px] md:min-w-[400px] snap-start bg-white rounded-[2rem] border border-slate-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500 cursor-pointer group flex flex-col overflow-hidden"
                    >
                        {/* 1. Banner Image Area */}
                        <div className="relative w-full h-44 overflow-hidden">
                            <img
                                src={service.featuredImage}
                                alt={service.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                loading="lazy"
                            />
                            {/* Price Tag Overlay */}
                            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-white">
                                <span className="text-primary font-black text-sm">${service.price}</span>
                            </div>
                            {/* Category Badge */}
                            <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                                {service.category}
                            </div>
                        </div>

                        {/* 2. Content Area */}
                        <div className="p-6 flex flex-col justify-between flex-1">
                            <div className="space-y-3">
                                <h5 className="font-serif font-bold text-xl text-slate-900 leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                                    {service.title}
                                </h5>

                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                        <User2 size={12} />
                                    </div>
                                    <p className="text-xs font-bold text-slate-600 uppercase tracking-tighter">
                                        By {service.userName}
                                    </p>
                                </div>
                            </div>

                            {/* Footer Info */}
                            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                                <div className="flex flex-col">
                                    <span className="text-[9px] text-slate-500 font-bold uppercase">Level</span>
                                    <span className="text-xs font-bold text-slate-900">{service.engLevel}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[9px] text-slate-500 font-bold uppercase flex items-center gap-1">
                                        <Clock size={10} /> Delivery
                                    </span>
                                    <span className="text-xs font-bold text-slate-900">
                                        {service.deliveryTime} {service.deliveryTime > 1 ? 'Days' : 'Day'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SpecializedServices;