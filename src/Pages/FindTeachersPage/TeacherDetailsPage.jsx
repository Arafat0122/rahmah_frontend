import React, { useEffect, useState } from 'react';
import {
    Globe, Mail, MapPin, Award, BookOpen,
    Calendar, Clock, CheckCircle, GraduationCap,
    Briefcase, MessageCircle, Facebook, Languages
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const TeacherDetailsPage = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTeacherData = async () => {
            try {
                // Fetching from your specific endpoint
                const { data } = await axiosPublic.get(`/users/${id}`);
                setTeacher(data);
            } catch (err) {
                console.error("Error fetching scholar:", err);
            } finally {
                setLoading(false);
            }
        };
        getTeacherData();
    }, [id, axiosPublic]);

    if (loading) return <div className="h-screen flex items-center justify-center font-serif italic text-primary">Loading Scholar Profile...</div>;

    if (!teacher) return <div className="h-screen flex items-center justify-center font-bold">Scholar not found.</div>;

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-20">
            {/* 1. PREMIUM HERO HEADER */}
            <div className="relative h-64 md:h-96 w-full overflow-hidden">
                <img
                    src={teacher.coverImage || "https://images.unsplash.com/photo-1523050335102-c325091422f9?q=80&w=2070&auto=format&fit=crop"}
                    className="w-full h-full object-cover"
                    alt="Cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="relative -mt-32 flex flex-col lg:flex-row gap-10">

                    {/* --- LEFT SIDEBAR (Sticky Info Card) --- */}
                    <div className="w-full lg:w-[400px]">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 sticky top-10 border border-slate-100">
                            {/* Profile Image */}
                            <div className="relative w-40 h-40 mx-auto -mt-24 mb-6">
                                <img
                                    src={teacher.photoURL}
                                    className="w-full h-full object-cover rounded-[2.5rem] border-8 border-white shadow-xl"
                                    alt={teacher.displayName}
                                />
                                <div className={`absolute bottom-3 right-3 w-6 h-6 border-4 border-white rounded-full ${teacher.online ? 'bg-green-500' : 'bg-slate-300'}`} title={teacher.online ? 'Online' : 'Offline'} />
                            </div>

                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-serif font-bold text-slate-900">{teacher.displayName}</h1>
                                <p className="text-primary font-bold text-sm tracking-wide mt-1 uppercase italic">{teacher.jobTitle}</p>
                                <div className="flex items-center justify-center gap-2 mt-3">
                                    <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase rounded-full border border-amber-100">
                                        {teacher.teacherTier} Scholar
                                    </span>
                                </div>
                            </div>

                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-slate-50 p-4 rounded-3xl text-center">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Min Rate</p>
                                    <p className="text-xl font-black text-slate-900">${teacher.minRate}<span className="text-xs font-normal">/hr</span></p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-3xl text-center">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Max Rate</p>
                                    <p className="text-xl font-black text-slate-900">${teacher.maxRate}<span className="text-xs font-normal">/hr</span></p>
                                </div>
                            </div>

                            {/* Personal Details */}
                            <div className="space-y-4 text-sm mb-8">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><MapPin size={14} /></div>
                                    <span>{teacher.presentAddress}, {teacher.presentCountry}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><Languages size={14} /></div>
                                    <span className="capitalize">{teacher.teachingLanguages.join(", ")}</span>
                                </div>
                            </div>

                            {/* Socials & Contact */}
                            <div className="flex gap-3 mb-8">
                                {teacher.whatsapp && (
                                    <a href={`https://wa.me/${teacher.whatsapp}`} target="_blank" className="flex-1 bg-green-50 text-green-600 py-3 rounded-2xl flex items-center justify-center hover:bg-green-100 transition-all"><MessageCircle size={20} /></a>
                                )}
                                {teacher.facebook && (
                                    <a href={teacher.facebook} target="_blank" className="flex-1 bg-blue-50 text-blue-600 py-3 rounded-2xl flex items-center justify-center hover:bg-blue-100 transition-all"><Facebook size={20} /></a>
                                )}
                            </div>

                            <button className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-bold text-lg hover:bg-primary transition-all shadow-xl shadow-slate-900/20 active:scale-95">
                                Book Trial Lesson
                            </button>
                        </div>
                    </div>

                    {/* --- RIGHT SIDE (Main Content) --- */}
                    <div className="flex-1 space-y-8">

                        {/* 1. Bio Section */}
                        <section className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
                            <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                                <BookOpen className="text-primary" size={24} /> About the Scholar
                            </h3>
                            <div
                                className="prose prose-lg max-w-none text-slate-600 leading-relaxed scholar-bio"
                                dangerouslySetInnerHTML={{ __html: teacher.bio }}
                            />
                        </section>

                        {/* 2. Skills (Language Proficiency) */}
                        <section className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
                            <h3 className="text-2xl font-serif font-bold mb-8">Language Proficiency</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                {teacher.skills.map((skill, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between mb-2">
                                            <span className="font-bold text-slate-700 capitalize">{skill.name}</span>
                                            <span className="text-primary font-bold">{skill.level}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${skill.level}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 3. Education & Experience Timeline */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                            {/* Education */}
                            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
                                <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                                    <GraduationCap className="text-primary" /> Academic Journey
                                </h3>
                                <div className="space-y-8">
                                    {teacher.education.map((edu, idx) => (
                                        <div key={idx} className="relative pl-8 border-l-2 border-slate-100">
                                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm" />
                                            <span className="text-[10px] font-black text-slate-500 uppercase">{edu.year}</span>
                                            <h4 className="text-lg font-bold text-slate-900 mt-1">{edu.degree}</h4>
                                            <p className="text-slate-500 font-medium">{edu.institution}</p>
                                            <p className="text-sm italic text-slate-500 mt-2">"{edu.description}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Experience */}
                            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
                                <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                                    <Briefcase className="text-primary" /> Professional Experience
                                </h3>
                                <div className="space-y-8">
                                    {teacher.experience.map((exp, idx) => (
                                        <div key={idx} className="relative pl-8 border-l-2 border-slate-100">
                                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-4 border-white shadow-sm" />
                                            <span className="text-[10px] font-black text-slate-500 uppercase">{exp.duration}</span>
                                            <h4 className="text-lg font-bold text-slate-900 mt-1">{exp.role}</h4>
                                            <p className="text-slate-500 font-medium">{exp.company}</p>
                                            {exp.description && <p className="text-sm text-slate-500 mt-2">{exp.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 4. Certificates & Gallery */}
                        <section className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
                            <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                                <Award className="text-primary" /> Verified Credentials
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[...teacher.certificates, ...teacher.galleryImages].map((img, i) => (
                                    <div key={i} className="group relative aspect-square rounded-3xl overflow-hidden bg-slate-100 border border-slate-200">
                                        <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Credential" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white text-[10px] font-bold uppercase tracking-widest border border-white/40 px-3 py-1 rounded-full">Enlarge</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDetailsPage;