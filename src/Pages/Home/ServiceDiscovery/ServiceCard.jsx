import React from 'react';
import { ArrowRight, User, Tag, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service, isViewMore }) => {
    if (isViewMore) {
        return (
            <Link
                to="/find-services"
                className="group h-full min-h-[320px] md:min-h-[380px] flex flex-col items-center justify-center bg-slate-50/50 border border-dashed border-slate-300 rounded-[2rem] md:rounded-[2.5rem] hover:border-primary/50 hover:bg-white transition-all duration-500 p-6 md:p-8"
            >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-500 group-hover:text-primary transition-all border border-slate-100">
                    <ArrowRight size={24} />
                </div>
                <p className="mt-4 md:mt-6 font-serif font-bold text-slate-900 text-base md:text-lg">View All</p>
                <p className="text-[9px] md:text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em] mt-2 text-center">Certified Curriculum</p>
            </Link>
        );
    }

    const plainDescription = service.description?.replace(/<[^>]*>?/gm, '') || "";

    return (
        <Link
            to={`/service-details/${service._id}`}
            className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-3 md:p-4 border border-slate-100 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-700 group flex flex-col h-full relative text-left"
        >
            {/* Image Section - Fixed Large Mobile Image */}
            <div className="relative w-full aspect-[2/1] md:aspect-[16/9] max-h-[180px] md:max-h-none rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-4 md:mb-5 bg-slate-100 shadow-inner">
                <img
                    src={service.featuredImage}
                    alt={`${service.title} specialized course`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Level Badge - Slightly smaller on mobile */}
                <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-white/95 backdrop-blur-md px-2 md:px-3 py-1 rounded-full border border-white/20 shadow-lg">
                    <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-primary">
                        {service.engLevel || 'Beginner'}
                    </span>
                </div>

                <button
                    className="absolute top-3 right-3 md:top-4 md:right-4 text-white/80 hover:text-primary transition-colors z-10"
                    aria-label="Save this course"
                    onClick={(e) => e.preventDefault()}
                >
                    <Bookmark size={18} md:size={20} />
                </button>
            </div>

            {/* Content Section */}
            <div className="px-1 flex flex-col flex-1">
                <div className="mb-3 md:mb-4">
                    <div className="flex items-center gap-2 mb-1.5 md:mb-2">
                        <Tag size={10} className="text-primary" />
                        <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">{service.category}</span>
                    </div>
                    <h4 className="font-serif font-bold text-lg md:text-xl text-slate-900 line-clamp-1 group-hover:text-primary transition-colors mb-1 md:mb-2">
                        {service.title}
                    </h4>
                    <p className="text-slate-600 text-[11px] md:text-xs line-clamp-2 leading-relaxed">
                        {plainDescription}
                    </p>
                </div>

                {/* Footer Section */}
                <div className="mt-auto pt-4 md:pt-5 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 text-slate-600 mb-0.5 md:mb-1">
                            <User size={10} strokeWidth={3} />
                            <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-tight truncate max-w-[70px] md:max-w-[80px]">
                                {service.userName?.split(' ')[0]}
                            </span>
                        </div>
                        <div>
                            <span className="text-lg md:text-xl font-black text-slate-900 tracking-tighter">${service.price}</span>
                            <span className="text-[8px] md:text-[9px] text-slate-600 font-bold uppercase tracking-widest ml-1">Total</span>
                        </div>
                    </div>

                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-white group-hover:bg-primary group-hover:border-primary transition-all duration-300 shadow-sm">
                        <ArrowRight size={16} md:size={18} />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ServiceCard;