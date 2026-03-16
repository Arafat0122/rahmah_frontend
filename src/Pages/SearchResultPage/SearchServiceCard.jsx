import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';

const SearchServiceCard = ({ service }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/service-details/${service._id}`)}
            className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500 cursor-pointer flex flex-col h-full"
        >
            {/* Service Image Header */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={service.featuredImage || "https://content.jwplatform.com/thumbs/9bocdLvQ-720.jpg"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={service.title}
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-dark px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm">
                    {service.category}
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Service Content */}
            <div className="p-5 flex flex-col flex-1">
                {/* Teacher / Provider Info */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                        <img src={service.userPhoto || "https://rahmahinstitute.com/User%20RahmahInstitute.png"} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                        {service.userName || "Verified Scholar"}
                    </span>
                </div>

                <h5 className="font-serif font-bold text-lg text-dark line-clamp-2 mb-3 group-hover:text-primary transition-colors leading-snug">
                    {service.title}
                </h5>

                {/* Rating Placeholder (Fiverr Style) */}
                <div className="flex items-center gap-1 mb-4">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-dark">5.0</span>
                    <span className="text-[10px] text-slate-500 font-medium">(24)</span>
                </div>

                {/* Footer: Price & Action */}
                <div className="mt-auto pt-4 border-t border-slate-50 flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Starting at</span>
                        <span className="text-lg font-black text-primary leading-none">
                            ${service.price}
                        </span>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <ArrowRight size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchServiceCard;