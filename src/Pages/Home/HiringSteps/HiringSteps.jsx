import { MessageSquare, CalendarCheck, GraduationCap } from 'lucide-react';

const HiringSteps = () => {
    const steps = [
        {
            id: "01",
            title: "Talk to a Teacher",
            desc: "Consult with our faculty to align on your academic goals and learning path.",
            icon: <MessageSquare size={20} strokeWidth={2} />,
        },
        {
            id: "02",
            title: "Book an Order",
            desc: "Secure your mentorship sessions through our protected and transparent platform.",
            icon: <CalendarCheck size={20} strokeWidth={2} />,
        },
        {
            id: "03",
            title: "Learn from the Best",
            desc: "Acquire sacred knowledge and specialized skills from world-leading scholars.",
            icon: <GraduationCap size={20} strokeWidth={2} />,
        },
    ];

    // SEO: JSON-LD Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to hire an Academic Teacher",
        "step": steps.map((step) => ({
            "@type": "HowToStep",
            "position": parseInt(step.id),
            "name": step.title,
            "text": step.desc
        }))
    };

    return (
        <section className="py-24 bg-white border-y border-slate-100" aria-labelledby="hiring-steps-title">
            {/* Inject Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="max-w-6xl mx-auto px-6">
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-3 block">
                        Our Process
                    </span>
                    <h2 id="hiring-steps-title" className="font-serif text-4xl md:text-5xl text-slate-900 leading-tight tracking-tight">
                        How to hire <span className="italic text-slate-500">excellence.</span>
                    </h2>
                    <div className="w-12 h-[2px] bg-primary mx-auto mt-8 opacity-30 rounded-full"></div>
                </div>

                {/* --- Different Approach: Vertical Timeline for Mobile, Bordered Grid for MD+ --- */}
                <div className="relative flex flex-col md:flex-row gap-0">

                    {/* Vertical Connecting Line (Mobile Only) */}
                    <div className="absolute left-[27px] top-10 bottom-10 w-[2px] bg-slate-100 md:hidden" aria-hidden="true" />

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`relative pt-0 pb-12 md:py-12 flex flex-col group transition-all duration-500 flex-1
                                ${index !== steps.length - 1 ? 'md:pr-16 md:border-r border-slate-100' : 'md:pl-16'}
                                pl-16 md:pl-0`} // Padding left on mobile for the vertical line
                        >
                            {/* Step Header: Circle and Number */}
                            <div className="flex items-center justify-between mb-6 md:mb-10">
                                <div className="flex flex-col relative">
                                    {/* Mobile Timeline Circle */}
                                    <div className="absolute -left-[53px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-primary md:hidden z-10" />

                                    <span className="text-[10px] md:text-xs font-bold text-primary tracking-widest uppercase mb-1">Step</span>
                                    <span className="font-serif text-4xl md:text-5xl font-bold text-slate-700 group-hover:text-slate-900 transition-colors duration-500">
                                        {step.id}
                                    </span>
                                </div>

                                <div className="p-3 md:p-4 rounded-xl bg-slate-50 text-slate-500 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm border border-slate-100">
                                    {step.icon}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-primary transition-colors">
                                {step.title}
                            </h3>
                            <p className="text-slate-600 text-[15px] leading-relaxed font-normal">
                                {step.desc}
                            </p>

                            {/* Decorative Animated Line (Desktop Only) */}
                            <div className="hidden md:flex mt-12 items-center gap-4" aria-hidden="true">
                                <div className="h-[2px] w-12 bg-slate-100 group-hover:w-full group-hover:bg-primary transition-all duration-700"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HiringSteps;