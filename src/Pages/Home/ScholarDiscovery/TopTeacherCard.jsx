import { ArrowRight, ShieldCheck, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopTeacherCard = ({ teacher, isViewMore }) => {
    // 1. View More State
    if (isViewMore) {
        return (
            <Link
                to="/find-teachers"
                className="group h-full min-h-[360px] flex flex-col items-center justify-center bg-slate-50/50 border border-dashed border-slate-300 rounded-[2.5rem] hover:border-primary/50 hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 p-8"
            >
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-500 group-hover:text-primary group-hover:shadow-md transition-all border border-slate-200">
                    <ArrowRight size={24} />
                </div>
                <p className="mt-6 font-serif font-bold text-slate-900 text-lg">Explore All</p>
                {/* Contrast Fix: slate-400 to slate-600 */}
                <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em] mt-2">Certified Faculty</p>
            </Link>
        );
    }

    const countryCode = teacher.permanentCountry?.toLowerCase() || 'un';

    return (
        <Link
            to={`/teacher/${teacher._id}`}
            className="bg-white rounded-[2.5rem] p-4 border border-slate-100 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-700 group flex flex-col h-full relative overflow-hidden text-left"
        >
            {/* 1. Image Section */}
            <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden mb-6 bg-slate-100">
                <img
                    src={teacher.photoURL}
                    alt={`${teacher.displayName} - Faculty Scholar Profile`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[10%] group-hover:grayscale-0"
                    loading="lazy"
                />

                {/* Modern Verified Badge */}
                <div className="absolute top-4 right-4 flex items-center justify-center">
                    <div className="relative bg-white p-1.5 rounded-full shadow-lg border border-white/50">
                        <ShieldCheck size={18} className="text-blue-600 fill-blue-50" aria-label="Verified Scholar" />
                    </div>
                </div>

                {/* Country Pill */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2.5 bg-white/95 backdrop-blur-md pl-1.5 pr-3 py-1.5 rounded-full border border-white/20 shadow-lg">
                    <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-200 shrink-0">
                        <img
                            src={`https://flagcdn.com/w40/${countryCode}.png`}
                            alt={`Flag of ${teacher.permanentCountry}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Contrast Fix: text-slate-700 to text-slate-900 */}
                    <span className="text-[10px] font-black tracking-widest uppercase text-slate-900">{teacher.permanentCountry}</span>
                </div>
            </div>

            {/* 2. Content Section */}
            <div className="px-1 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-xl text-slate-900 truncate leading-tight mb-1 group-hover:text-primary transition-colors capitalize">
                            {teacher.displayName}
                        </h4>
                        <div className="flex items-center gap-1.5 text-slate-500">
                            <Globe2 size={11} strokeWidth={3} className="text-slate-500" />
                            {/* Contrast Fix: slate-400 opacity-60 to slate-600 */}
                            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-600">Faculty Scholar</p>
                        </div>
                    </div>

                    <div className="text-right shrink-0">
                        <div className="flex flex-col">
                            <span className="text-xl font-black text-slate-900 tracking-tighter leading-none">
                                ${teacher.minRate || '15'}
                            </span>
                            {/* Contrast Fix: slate-400 to slate-600 */}
                            <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest mt-1">Hourly</span>
                        </div>
                    </div>
                </div>

                {/* 3. Footer: Speciality tags */}
                <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                        {teacher.category?.slice(0, 1).map((c, i) => (
                            <span
                                key={i}
                                className="text-[9px] px-3 py-1.5 rounded-full font-bold text-slate-700 bg-slate-50 border border-slate-200 uppercase tracking-wider group-hover:border-primary/20 group-hover:bg-primary/5 transition-all"
                            >
                                {c}
                            </span>
                        ))}
                        {teacher.category?.length > 1 && (
                            <span className="text-[10px] text-slate-500 font-bold self-center">
                                +{teacher.category.length - 1} More
                            </span>
                        )}
                    </div>

                    {/* Action Circle */}
                    <div className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-white group-hover:bg-primary group-hover:border-primary transition-all duration-300 shadow-sm">
                        <ArrowRight size={16} />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default TopTeacherCard;