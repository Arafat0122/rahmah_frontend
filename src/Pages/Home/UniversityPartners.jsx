import React from 'react';

const UniversityPartners = () => {
    const universities = [
        { name: "Al-Azhar University", logo: "https://alazharinstitutebd.com/public/storage/images/general_setting/OMGDSCbJpUL3AoLfvEqqV9vKWB3QkicYL6lgNhor.png" },
        { name: "Islamic University of Madinah", logo: "https://upload.wikimedia.org/wikipedia/en/4/48/Islamic_University_of_Madinah_Logo.svg" },
        { name: "Umm Al-Qura University", logo: "https://upload.wikimedia.org/wikipedia/en/c/c3/Umm_Al-Qura_University_logo.png" },
        { name: "Zaitouna University", logo: "https://dirasa.eu/media/logo-UZ-final.png" },
        { name: "Darul Uloom Deoband", logo: "https://crystalpng.com/wp-content/uploads/2023/02/Darul_Uloom_Deoband_logo.png" }
    ];

    return (
        <section
            className="w-full bg-[#F8FAFC] border-y border-slate-200 py-12"
            aria-labelledby="partners-heading"
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Branding Side */}
                    <div className="shrink-0 text-center lg:text-left lg:border-r lg:border-slate-300 lg:pr-12">
                        {/* 1. Corrected Heading Level for SEO hierarchy */}
                        <h2
                            id="partners-heading"
                            className="text-[11px] font-black text-primary uppercase tracking-[0.3em] mb-2"
                        >
                            Academic Lineage
                        </h2>
                        <p className="text-xl md:text-2xl font-serif font-bold text-slate-900 leading-tight">
                            {/* 2. Contrast Fix: Darkened slate-400 to slate-600 for readability */}
                            Global <span className="italic text-slate-600 font-medium">Affiliations</span>
                        </p>
                    </div>

                    {/* Logos Grid */}
                    <div className="flex-1 w-full overflow-hidden">
                        <div
                            className="flex flex-wrap items-center justify-center lg:justify-between gap-x-12 gap-y-8"
                            role="list"
                        >
                            {universities.map((uni, index) => (
                                <div
                                    key={index}
                                    role="listitem"
                                    className="group relative flex items-center justify-center"
                                >
                                    <div className="relative h-12 md:h-16 w-32 md:w-40">
                                        <img
                                            src={uni.logo}
                                            alt={`${uni.name} - Academic Partner`}
                                            loading="lazy"
                                            width="160"
                                            height="64"
                                            className="h-full w-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-in-out"
                                        />
                                    </div>

                                    {/* 5. Contrast Fix: Darkened tooltip text for a11y compliance */}
                                    <span
                                        className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none uppercase tracking-widest whitespace-nowrap"
                                        aria-hidden="true"
                                    >
                                        {uni.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default UniversityPartners;