import React from 'react';
import {
    Clock, DollarSign, Calendar, MapPin,
    Briefcase, Users, ChevronRight, CheckCircle2
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom'; // Import Link

const JobPostCard = ({ job }) => {
    const applicationCount = job.applications?.length || 0;

    return (
        <Link
            to={`/apply/${job._id}`} // Adjust this route to match your App.js/main.jsx route
            className="block group"
        >
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 hover:border-primary/20 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 cursor-pointer relative overflow-hidden">

                {/* Decorative Hover Gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />

                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 relative z-10">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-3 py-1 rounded-full">
                                {job.teacherType?.label || job.teacherType}
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                Posted {formatDistanceToNow(new Date(job.createdAt))} ago
                            </span>
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-primary transition-colors duration-300">
                            {job.jobTitle}
                        </h3>
                    </div>

                    <div className="shrink-0 text-left md:text-right">
                        <p className="text-xl font-black text-slate-900">${job.minSalary} - ${job.maxSalary}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Budget Range</p>
                    </div>
                </div>

                {/* Meta Specs */}
                <div className="flex flex-wrap gap-6 mb-6 text-sm text-slate-500 relative z-10">
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-slate-300" />
                        <span className="font-medium">{job.hoursPerWeek} hrs/week</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-slate-300" />
                        <span className="font-medium">{job.howManyDays} Days Duration</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users size={16} className="text-slate-300" />
                        <span className="font-bold text-slate-700">{job.genderPreference?.label || 'Any'} Student</span>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-6 relative z-10">
                    <p className="text-slate-600 leading-relaxed line-clamp-2 text-sm">
                        {job.jobDescription}
                    </p>
                </div>

                {/* Qualifications Section (Condensed) */}
                <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100 group-hover:bg-white group-hover:border-primary/10 transition-all duration-500">
                    <h4 className="text-[10px] font-black uppercase text-slate-500 mb-1 flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-primary" /> Key Requirement
                    </h4>
                    <p className="text-xs text-slate-700 font-semibold line-clamp-1">{job.qualifications}</p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-50 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
                            <span className="text-sm font-bold text-slate-900">{applicationCount}</span>
                            <span className="text-xs font-bold text-slate-500 uppercase">Proposals</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em] group-hover:gap-4 transition-all duration-300">
                        View Details <ChevronRight size={14} />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default JobPostCard;