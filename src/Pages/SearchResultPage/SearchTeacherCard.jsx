import { ArrowRight, ShieldCheck, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchTeacherCard = ({ teacher }) => {
    // Convert code to lowercase for API (e.g., "GB" -> "gb")
    const countryCode = teacher.permanentCountry?.toLowerCase() || 'un';
    const teacherName = teacher.displayName || "Scholar";
    const hourlyRate = teacher.minRate || teacher.maxRate || '0';

    return (
        /* FIX: Removed nested div logic. 
           The Link itself becomes the card container for a cleaner DOM tree.
        */
        <Link
            to={`/teacher/${teacher._id}`}
            className="group bg-white rounded-[2.5rem] p-4 border border-slate-100 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-700 flex flex-col h-full relative overflow-hidden"
            aria-label={`View profile of ${teacherName}, ${teacher.category?.[0] || 'Scholar'}`}
        >
            {/* 1. Image Section */}
            <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden mb-6 bg-slate-100">
                <img
                    src={teacher.photoURL || "/User RahmahInstitute.png"}
                    alt={`${teacherName} - Rahmah Institute Verified Scholar`} // SEO: Descriptive Alt
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[15%] group-hover:grayscale-0"
                    loading="lazy" // SEO: Better performance
                />

                {/* Modern Verified Badge */}
                <div className="absolute top-4 right-4 flex items-center justify-center" aria-label="Verified Profile">
                    <div className="absolute inset-0 bg-blue-600/20 blur-md rounded-full animate-pulse group-hover:hidden"></div>
                    <div className="relative bg-white p-1.5 rounded-full shadow-lg border border-white/50">
                        <ShieldCheck size={18} className="text-blue-600 fill-blue-50" />
                    </div>
                </div>

                {/* Country Pill with Flag */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2.5 bg-white/90 backdrop-blur-md pl-1.5 pr-3 py-1.5 rounded-full border border-white/20 shadow-lg">
                    <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-200 shrink-0">
                        <img
                            src={`https://flagcdn.com/w40/${countryCode}.png`}
                            alt={`Flag of ${teacher.permanentCountry}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="text-[10px] font-black tracking-widest uppercase text-slate-700">
                        {teacher.permanentCountry || 'Global'}
                    </span>
                </div>
            </div>

            {/* 2. Content Section */}
            <div className="px-1 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4 gap-2">
                    <div className="flex-1 min-w-0">
                        {/* SEO: h3/h4 used correctly. 
                           WAVE: Ensured contrast for text-slate-500 (changed to 500 for compliance)
                        */}
                        <h3 className="font-serif font-bold text-xl text-slate-900 truncate leading-tight mb-1 group-hover:text-primary transition-colors capitalize">
                            {teacherName}
                        </h3>
                        <div className="flex items-center gap-1.5 text-slate-500">
                            <Globe2 size={11} strokeWidth={3} className="opacity-70" />
                            <p className="text-[10px] font-black uppercase tracking-[0.15em]">Verified Scholar</p>
                        </div>
                    </div>

                    <div className="text-right shrink-0">
                        <div className="flex flex-col">
                            <span className="text-xl font-black text-slate-900 tracking-tighter leading-none">
                                ${hourlyRate}
                            </span>
                            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Hourly</span>
                        </div>
                    </div>
                </div>

                {/* 3. Footer: Speciality tags & Action */}
                <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                        {Array.isArray(teacher.category) ? (
                            teacher.category.slice(0, 1).map((c, i) => (
                                <span
                                    key={i}
                                    className="text-[9px] px-3 py-1.5 rounded-full font-bold text-slate-600 bg-slate-50 border border-slate-100 uppercase tracking-wider group-hover:border-primary/20 group-hover:bg-primary/5 transition-all"
                                >
                                    {c}
                                </span>
                            ))
                        ) : (
                            <span className="text-[9px] px-3 py-1.5 rounded-full font-bold text-slate-600 bg-slate-50 border border-slate-100 uppercase tracking-wider">
                                {teacher.category}
                            </span>
                        )}

                        {teacher.category?.length > 1 && (
                            <span className="text-[10px] text-slate-500 font-bold self-center">
                                +{teacher.category.length - 1} More
                            </span>
                        )}
                    </div>

                    {/* Action Circle */}
                    <div
                        className="w-9 h-9 rounded-full border border-slate-100 flex items-center justify-center text-slate-500 group-hover:text-white group-hover:bg-primary group-hover:border-primary transition-all duration-300 shadow-sm"
                        aria-hidden="true" // Decorative because the parent Link handles the action
                    >
                        <ArrowRight size={16} />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SearchTeacherCard;