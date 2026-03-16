import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import TeacherSpotlight from './TeacherSpotlight';
import SearchBar from './SearchBar';
import FeaturedInstructors from './FeaturedInstructors';
import { premiumTeachers } from './TeacherData';
import { servicesData } from '../../assets/services';
import SpecializedServices from './SpecializedServices';

const Hero = () => {
    const [lookingFor, setLookingFor] = useState('teachers');
    const scrollRef = useRef(null);
    const serviceScrollRef = useRef(null);
    const teachersData = premiumTeachers;

    // 1. Improved Scroll Function: Now accepts a "targetRef"
    const scroll = (targetRef, direction) => {
        if (targetRef.current) {
            const { scrollLeft, clientWidth } = targetRef.current;
            const scrollTo = direction === 'left'
                ? scrollLeft - clientWidth / 2
                : scrollLeft + clientWidth / 2;

            targetRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    // 2. Universal Auto-Play: Handles any ref you pass to it
    const autoScroll = (targetRef) => {
        if (targetRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = targetRef.current;
            if (scrollLeft + clientWidth >= scrollWidth - 10) {
                targetRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                // We call the scroll function and pass the specific ref
                scroll(targetRef, 'right');
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            autoScroll(scrollRef);        // Auto-scroll Teachers
            autoScroll(serviceScrollRef); // Auto-scroll Services
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col pt-24 pb-6 overflow-hidden bg-gray-100">
            {/* 1. Top Switcher - Responsive width */}
            <div className="flex lg:hidden flex-col items-center mb-6 md:mb-10 shrink-0 px-4">
                <div className="flex items-center gap-1 md:gap-4 bg-slate-50 p-1 md:p-1.5 rounded-full border border-slate-200 w-full max-w-fit overflow-x-auto no-scrollbar">
                    <span className="hidden sm:inline pl-4 text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">I am looking for</span>
                    {['teachers', 'services', 'jobs'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setLookingFor(type)}
                            className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold transition-all whitespace-nowrap ${lookingFor === type
                                ? 'bg-primary text-white shadow-md'
                                : 'text-slate-600 hover:bg-white'
                                }`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* 2 & 3. Main Content - Flex-1 ensures it takes available space */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-8 flex-1 flex flex-col justify-center w-full">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-0 items-center">

                    {/* Left Side: Business Message */}
                    <div className="lg:col-span-6 space-y-6 text-center lg:text-left order-1 lg:order-1">
                        {/* 1. Trust Kicker: Optimized for SEO and Accessibility Tree */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 font-bold text-[10px] md:text-xs uppercase tracking-[0.1em]">
                            {/* We remove aria-hidden from the icon if it's inside a status role, 
      OR we simplify the role. Let's use a simpler approach that 
      Google and WAVE both love:
    */}
                            <CheckCircle
                                size={14}
                                className="text-emerald-900 shrink-0"
                                aria-hidden="true"
                                focusable="false"
                            />
                            {/* Wrap the text in its own span and ensure no parent has aria-hidden.
      We remove role="status" unless you are dynamically changing this text. 
      For static text, a simple div/span is better for WAVE.
    */}
                            <span className="sr-only">Status: </span>
                            <span className='hidden md:flex'>Verified Scholars from Global Institutions</span>
                            <span className='flex md:hidden'>Verified Global Scholars</span>
                        </div>
                        {/* 2. Headline: Used "Elite" and "Authentic" for better attraction */}
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-[1.05] tracking-tight">
                            Master the Sciences of <br className="hidden md:block" />
                            <span className="text-primary italic font-medium">Authentic Islam</span>
                            <span className="text-slate-800"> with Elite Scholars.</span>
                        </h1>

                        {/* 3. Body: Clearly listed Top Universities for high conversion */}
                        <p className="text-base md:text-lg text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed font-heading hidden lg:block">
                            Connect directly with certified graduates from the world's most prestigious seats of learning:
                            <span className="text-dark font-bold"> Al-Azhar University</span>,
                            <span className="text-dark font-bold"> Islamic University of Madinah</span>, and
                            <span className="text-dark font-bold"> Umm Al-Qura Makkah</span>.
                            Pure knowledge, preserved through chains of narration (Isnad).
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-md mx-auto lg:mx-0 group relative">
                            <SearchBar />
                        </div>
                    </div>

                    {/* Right Side: Spotlight - Stacks under for mobile */}
                    <div className="lg:col-span-6 order-2 lg:order-2 mt-0">
                        <TeacherSpotlight />
                    </div>
                </div>
            </div>

            <div className='mt-12 lg:mt-0'>
                {/* 4. Featured Instructors Slider */}
                <FeaturedInstructors teachersData={teachersData} />

                {/* 5. Specialized Services - Long Banner Style */}
                <SpecializedServices servicesData={servicesData} />
            </div>

        </section>
    );
};

export default Hero;