import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
    Calendar, Clock, DollarSign, User, Send,
    CheckCircle, Award, ArrowLeft, ShieldCheck,
    MapPin, Globe, Zap, Info
} from 'lucide-react';
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const ApplyJob = () => {
    const { id } = useParams(); // ID of the Job from URL
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    // --- Manual ID Configuration ---
    const currentUserId = "67f7ce5fc76bfe5006bb48a4";
    const idLoading = false;
    // -------------------------------

    const [job, setJob] = useState(null);
    const [pageLoading, setPageLoading] = useState(true);
    const [alreadyApplied, setAlreadyApplied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        const fetchJobData = async () => {
            try {
                setPageLoading(true);
                // Fetch specific job from your Render server
                const res = await axiosPublic.get(`/jobs/${id}`);
                setJob(res.data);

                // Check if this specific ID is already in the applications list
                if (res.data?.applications) {
                    const hasApplied = res.data.applications.some(app => app.teacherId === currentUserId);
                    setAlreadyApplied(hasApplied);
                }
            } catch (err) {
                console.error("Error fetching job details:", err);
            } finally {
                setPageLoading(false);
            }
        };

        if (id) fetchJobData();
    }, [id, axiosPublic, currentUserId]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        Swal.fire({
            title: "Submitting...",
            didOpen: () => Swal.showLoading(),
            allowOutsideClick: false
        });

        try {
            const payload = {
                teacherId: currentUserId,
                message: data.message
            };

            await axiosPublic.patch(`/jobs/apply/${id}`, payload);

            Swal.fire({
                icon: "success",
                title: "Application Sent",
                text: "Your request has been recorded.",
                confirmButtonColor: '#0F172A'
            });

            setAlreadyApplied(true);
            reset();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: error.response?.data?.message || "Something went wrong"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (pageLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <>
            <div className="min-h-screen bg-[#f1f2f4] pb-6 md:pb-10 pt-36">
                <div className="max-w-6xl mx-auto px-4">

                    {/* Simplified Header */}
                    <div className="flex items-center gap-4 mb-6">
                        <button
                            type="button" // Always specify type to avoid form submission bugs
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-600"
                            // {/* FIX: This tells screen readers and SEO bots what the button actually does */}
                            aria-label="Go back to previous page"
                        >
                            {/* aria-hidden="true" prevents the screen reader from trying to read the SVG code */}
                            <ArrowLeft size={20} aria-hidden="true" />
                        </button>

                        <h2 className="text-xl font-bold text-slate-900">Submit a proposal</h2>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 items-start">

                        {/* Main Content Area */}
                        <div className="w-full lg:flex-1 space-y-6">

                            {/* Job Details Card */}
                            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                <div className="p-6 md:p-8">
                                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{job?.jobTitle}</h1>

                                    <div className="flex flex-wrap gap-4 mb-8 text-sm">
                                        <span className="bg-[#000]/5 text-primary-dark px-3 py-1 rounded-full font-semibold">
                                            {job?.teacherType?.label || job?.teacherType}
                                        </span>
                                        <span className="text-slate-500 flex items-center gap-1">
                                            <Globe size={14} /> Worldwide
                                        </span>
                                        <span className="text-slate-500">Posted just now</span>
                                    </div>

                                    <hr className="border-slate-100 mb-8" />

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                                        <JobSpec icon={<Zap size={18} className="text-slate-600" />} title="Experience Level" detail="Intermediate" />
                                        <StatItem icon={<DollarSign size={18} />} label="Hourly Budget" value={`$${job?.minSalary} - $${job?.maxSalary}`} />
                                        <StatItem icon={<Clock size={18} />} label="Project Length" value={`${job?.howManyDays} Days`} />
                                    </div>

                                    <hr className="border-slate-100 mb-8" />

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 mb-3">Job Description</h3>
                                            <p className="text-slate-700 leading-relaxed text-[15px] whitespace-pre-line">
                                                {job?.jobDescription}
                                            </p>
                                        </div>

                                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                                            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                                                <Info size={16} className="text-primary" /> Preferred Qualifications
                                            </h3>
                                            <p className="text-slate-600 text-sm italic">{job?.qualifications}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Application/Cover Letter Card */}
                            <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-900 mb-6">Proposal Details</h3>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div>
                                        {/* FIX 1: Linked label to textarea using 'htmlFor' */}
                                        <label
                                            htmlFor="cover-letter"
                                            className="block text-sm font-bold text-slate-900 mb-2"
                                        >
                                            Cover Letter
                                        </label>

                                        <textarea
                                            id="cover-letter" // FIX 2: id must match label's htmlFor
                                            {...register("message", { required: "A cover letter is required to apply." })}
                                            aria-invalid={errors.message ? "true" : "false"} // SEO/A11y: Tells search/readers if input is valid
                                            aria-describedby={errors.message ? "cover-letter-error" : undefined} // Links error msg to input
                                            className={`w-full p-4 bg-white border ${errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
                                                } rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all h-64 text-sm text-slate-700 placeholder:text-slate-400`}
                                            placeholder="Introduce yourself and explain why you're a strong candidate..."
                                        />

                                        {/* FIX 3: Added id for connection and role="alert" for instant screen reader feedback */}
                                        {errors.message && (
                                            <p
                                                id="cover-letter-error"
                                                role="alert"
                                                className="text-red-600 text-xs mt-2 font-medium"
                                            >
                                                {errors.message.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100">
                                        <button
                                            type="submit"
                                            disabled={alreadyApplied || isSubmitting}
                                            className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm ${alreadyApplied
                                                ? "bg-slate-100 text-slate-500 cursor-not-allowed"
                                                : "bg-slate-900 text-white hover:bg-black active:scale-95 shadow-slate-200"
                                                }`}
                                        >
                                            {alreadyApplied ? "Already Applied" : isSubmitting ? "Sending..." : "Submit Proposal"}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => navigate(-1)}
                                            className="px-8 py-2.5 rounded-full font-bold text-sm text-slate-700 hover:bg-slate-100 transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Sidebar: About the Client */}
                        <div className="w-full lg:w-[320px] space-y-6">
                            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                                <h3 className="font-bold text-slate-900 mb-4 uppercase text-[11px] tracking-wider">Client Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-secondary-dark">
                                            <ShieldCheck size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-900">Payment verified</p>
                                            <div className="flex text-yellow-800 text-[10px]">★★★★★</div>
                                        </div>
                                    </div>
                                    <div className="text-sm">
                                        <p className="text-slate-500 text-xs">Location</p>
                                        <p className="font-semibold text-slate-800 flex items-center gap-1"><MapPin size={12} /> Bangladesh</p>
                                    </div>
                                    <div className="text-sm border-t border-slate-50 pt-4">
                                        <p className="text-slate-500 text-xs mb-1">Your Identity</p>
                                        <code className="text-[10px] bg-slate-50 p-2 rounded block truncate text-slate-600 font-mono">
                                            {currentUserId}
                                        </code>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-primary/5 border border-primary/10 rounded-xl p-6">
                                <h4 className="text-primary font-bold text-sm mb-2">Pro Tip</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Clients are 50% more likely to hire teachers who provide a clear, customized cover letter for their specific needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const StatItem = ({ icon, label, value }) => (
    <div className="flex items-start gap-3">
        <div className="text-slate-500 mt-1">{icon}</div>
        <div>
            <p className="text-sm font-bold text-slate-900">{value}</p>
            <p className="text-xs text-slate-500">{label}</p>
        </div>
    </div>
);

const JobSpec = ({ icon, title, detail }) => (
    <div className="flex items-start gap-3">
        <div className="text-slate-500 mt-1">{icon}</div>
        <div>
            <p className="text-sm font-bold text-slate-900">{detail}</p>
            <p className="text-xs text-slate-500">{title}</p>
        </div>
    </div>
);

export default ApplyJob;