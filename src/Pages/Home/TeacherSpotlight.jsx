import React, { useState, useEffect } from 'react';
import { CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { premiumTeachers } from './TeacherData';

const TeacherSpotlight = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % premiumTeachers.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const t = premiumTeachers[currentIndex];

    return (
        <div className="w-full lg:col-span-7 relative flex justify-center lg:justify-end px-4 sm:px-8 lg:px-0 py-0 lg:py-0">
            <Link
                to={`/teacher/${t.id}`}
                key={t.id}
                aria-label={`View profile of ${t.name}, ${t.specialty}`}
                className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] transition-all duration-700 ease-in-out group block cursor-pointer outline-offset-4"
            >
                {/* Main Image */}
                <div className="relative rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden bg-slate-200 aspect-[6/7] shadow-2xl border-[3px] sm:border-[6px] border-white transition-transform duration-500 group-hover:scale-[1.02]">
                    <img
                        src={t.image}
                        alt={`Portrait of ${t.name}`}
                        // FIX: Changed from fetchpriority to fetchPriority
                        fetchPriority="high"
                        className="w-full h-full object-cover transition-all duration-1000 transform scale-100 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>

                {/* Floating Card */}
                <div className="absolute -bottom-16 lg:-bottom-12 left-1/2 -translate-x-1/2 md:-translate-x-0 md:-left-10 w-[95%] sm:w-[300px] lg:w-[320px] bg-white p-4 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.15)] rounded-2xl sm:rounded-3xl border-l-[6px] border-primary z-20 transition-all duration-500 group-hover:-translate-y-2">
                    <div className="space-y-2 sm:space-y-4">
                        <div className="relative">
                            {/* Rating Badge */}
                            <div
                                className="absolute -top-8 -right-7 lg:-right-10 flex items-center bg-orange-700 text-white px-2 sm:px-3 py-1 rounded-full shadow-lg border-2 sm:border-4 border-white"
                                aria-label={`Rating: ${t.rating} stars`}
                            >
                                <Star size={10} fill="currentColor" className="sm:w-3 sm:h-3" aria-hidden="true" />
                                <span className="text-[10px] sm:text-xs font-black ml-1">{t.rating}</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                                <h3 className="font-serif font-bold text-lg sm:text-xl lg:text-2xl text-slate-900 leading-tight truncate">
                                    {t.name}
                                </h3>
                                <CheckCircle size={16} className="text-primary shrink-0" aria-hidden="true" />
                            </div>
                            <p className="text-[9px] sm:text-[11px] font-black text-primary uppercase tracking-[0.1em] sm:tracking-[0.2em]">
                                {t.specialty}
                            </p>
                        </div>

                        {/* Uni */}
                        <div className="bg-slate-50 rounded-xl p-2 sm:p-3 flex items-center gap-2 border border-slate-100">
                            <span className="text-xs sm:text-sm" role="img" aria-label="University">🎓</span>
                            <p className="text-[9px] sm:text-[11px] font-bold text-slate-700 uppercase truncate leading-none">
                                {t.uni}
                            </p>
                        </div>

                        <div className="flex justify-between items-center pt-2 sm:pt-3 border-t border-slate-100">
                            <div className="flex flex-col">
                                <span className="text-[7px] sm:text-[9px] text-slate-600 font-bold uppercase">Hourly Rate</span>
                                <span className="text-sm sm:text-lg font-black text-slate-900 leading-none">
                                    ${t.rate}<span className="text-[10px] font-normal text-slate-600">/hr</span>
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="text-[7px] sm:text-[9px] text-slate-600 font-bold uppercase block">Medium</span>
                                <span className="inline-block text-[9px] sm:text-[11px] font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded-md mt-1 uppercase">
                                    {t.languages.split(',')[0]}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default TeacherSpotlight;