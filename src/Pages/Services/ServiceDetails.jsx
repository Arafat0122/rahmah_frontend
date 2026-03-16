import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    ArrowLeft, CheckCircle, Star, ShieldCheck,
    Clock, Globe, MessageSquare, Share2, Info
} from 'lucide-react';
import DOMPurify from 'dompurify'; // Recommended for rendering the description HTML safely
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const ServiceDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchService = async () => {
            try {
                setLoading(true);
                const res = await axiosPublic.get(`/services/${id}`);
                setService(res.data);
            } catch (err) {
                console.error("Error fetching service:", err);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchService();
    }, [id, axiosPublic]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-tertiary/20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!service) return (
        <div className="min-h-screen flex flex-col items-center justify-center font-heading">
            <h2 className="text-2xl font-bold text-slate-800">Service not found</h2>
            <button onClick={() => navigate(-1)} className="mt-4 text-primary font-bold">Return to home</button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FBFDFF] font-body">
            {/* Top Navigation Bar */}
            <div className="bg-white border-b border-slate-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold text-xs uppercase tracking-widest"
                    >
                        <ArrowLeft size={16} /> Back to explore
                    </button>
                    <div className="flex gap-4">
                        <button className="p-2 text-slate-500 hover:text-primary transition-colors"><Share2 size={18} /></button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* --- Left Column: Service Content --- */}
                    <div className="flex-1 lg:max-w-[70%]">
                        <nav className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                            <span className="text-secondary">{service.category}</span>
                            <span>/</span>
                            <span>Service Details</span>
                        </nav>

                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
                            {service.title}
                        </h1>

                        {/* Instructor Meta */}
                        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {service.userName?.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">{service.userName}</p>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <div className="flex text-accent">
                                        <Star size={12} fill="currentColor" />
                                        <Star size={12} fill="currentColor" />
                                        <Star size={12} fill="currentColor" />
                                        <Star size={12} fill="currentColor" />
                                        <Star size={12} fill="currentColor" />
                                    </div>
                                    <span className="font-bold">(Top Rated Instructor)</span>
                                </div>
                            </div>
                        </div>

                        {/* Featured Image Section */}
                        <div className="rounded-[2.5rem] overflow-hidden mb-10 shadow-2xl shadow-primary/5 border border-slate-100">
                            <img
                                src={service.featuredImage}
                                alt={service.title}
                                className="w-full h-[400px] object-cover"
                            />
                        </div>

                        {/* Description Section */}
                        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-50 shadow-sm mb-12">
                            <h3 className="text-xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <Info className="text-primary" size={22} /> About this service
                            </h3>
                            <div
                                className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(service.description) }}
                            />
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            <div className="bg-tertiary/30 p-6 rounded-3xl border border-tertiary/50">
                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Delivery Standards</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                                        <Clock className="text-primary" size={18} />
                                        {service.deliveryTime} Day Turnaround
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                                        <Globe className="text-primary" size={18} />
                                        English Level: {service.engLevel}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-secondary/5 p-6 rounded-3xl border border-secondary/10">
                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Institute Guarantee</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    This service is vetted by Rahmah Institute for quality of tazweed and academic accuracy.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* --- Right Column: Booking Sidebar --- */}
                    <div className="lg:w-[400px]">
                        <div className="sticky top-24 bg-white rounded-[3rem] p-8 md:p-10 shadow-[0_30px_70px_rgba(41,170,227,0.1)] border border-slate-100">
                            <div className="flex items-center justify-between mb-8">
                                <div className="px-4 py-1 rounded-full bg-secondary/10 text-secondary-dark text-[10px] font-black uppercase tracking-widest">
                                    Official Service
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-300 uppercase">One-time Investment</p>
                                    <h2 className="text-4xl font-black text-slate-900">${service.price}</h2>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                                    <CheckCircle size={18} className="text-secondary shrink-0 mt-0.5" />
                                    <span>Personalized 1-on-1 session</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                                    <CheckCircle size={18} className="text-secondary shrink-0 mt-0.5" />
                                    <span>Comprehensive study material</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                                    <CheckCircle size={18} className="text-secondary shrink-0 mt-0.5" />
                                    <span>Recorded session for review</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <button className="w-full py-5 bg-primary hover:bg-primary-dark text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-primary/20 active:scale-95">
                                    Secure Enrollment
                                </button>
                                <button className="w-full py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-slate-50 flex items-center justify-center gap-2">
                                    <MessageSquare size={16} /> Contact Teacher
                                </button>
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-900 uppercase">Rahmah Verified</p>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase">100% Satisfaction Guarantee</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;