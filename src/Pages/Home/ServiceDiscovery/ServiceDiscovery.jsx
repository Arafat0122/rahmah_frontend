import { useState, useEffect, useMemo } from 'react';
import CategoryBar from '../ScholarDiscovery/CategoryBar';
import ServiceCard from './ServiceCard';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const serviceCategories = [
    "Alemi course", "Arabic Grammar", "Arabic language", "Azhari curriculum", "Dawra hadis class",
    "General Fiqh", "Hadith", "Hadith Science", "Hanafi Fiqh", "Hanmbali Fiqh",
    "Maleki Fiqh", "Quran learning", "Shafee Fiqh", "Tafsir", "Tafsir Science"
];

const ServiceDiscovery = () => {
    const axiosPublic = useAxiosPublic();
    const [services, setServices] = useState([]);
    const [selectedCat, setSelectedCat] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosPublic.get("/services")
            .then(res => {
                const acceptedServices = res.data.filter(s => s.status === "Accepted");
                setServices(acceptedServices);
                setLoading(false);
            })
            .catch(err => {
                console.error("Service Fetch Error:", err);
                setLoading(false);
            });
    }, [axiosPublic]);

    const filtered = useMemo(() => {
        let list = selectedCat === "All"
            ? [...services]
            : services.filter(s => s.category === selectedCat);

        return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);
    }, [selectedCat, services]);

    return (
        <section className="pb-20 bg-slate-50" aria-labelledby="service-discovery-title">
            <div className="max-w-[1400px] mx-auto px-6 md:px-8">

                {/* Heading Section */}
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    {/* Contrast Fix: Primary color should be verified for AA compliance on bg-slate-50 */}
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-3 block">
                        Academic Services
                    </span>
                    <h2
                        id="service-discovery-title"
                        className="font-serif text-4xl md:text-5xl text-slate-900 mb-4 tracking-tight leading-tight"
                    >
                        Explore Our <span className="italic text-slate-500 font-medium">Specialized</span> Services
                    </h2>

                    {/* SEO Description for better indexation */}
                    <p className="text-slate-600 max-w-xl mx-auto text-sm md:text-base">
                        Deepen your knowledge with our curated Azhari curriculum, specializing in Fiqh, Hadith Science, and Quranic studies.
                    </p>

                    <div className="w-12 h-[2px] bg-primary mx-auto mt-8 opacity-40 rounded-full" aria-hidden="true"></div>
                </div>

                {/* Categories */}
                <CategoryBar
                    categories={serviceCategories}
                    selected={selectedCat}
                    onSelect={setSelectedCat}
                />

                {/* Optimized Grid: Horizontal Carousel for Mobile & Tablet, Grid for Desktop */}
                <div
                    className="mt-12 -mx-6 px-6 flex flex-row overflow-x-auto pb-8 gap-5 no-scrollbar snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:mx-0 lg:px-0 lg:overflow-visible lg:pb-0 lg:gap-6"
                    aria-live="polite"
                >
                    {loading ? (
                        [1, 2, 3, 4].map(n => (
                            <div
                                key={n}
                                className="w-[85vw] sm:w-[340px] h-[400px] bg-white animate-pulse rounded-[2.5rem] border border-slate-200 shrink-0 lg:w-full"
                            />
                        ))
                    ) : (
                        <>
                            {filtered.map(service => (
                                <div
                                    key={service._id}
                                    className="w-[85vw] sm:w-[340px] lg:w-full lg:min-w-0 snap-center shrink-0"
                                >
                                    <ServiceCard service={service} />
                                </div>
                            ))}

                            {/* View More Card */}
                            <div className="w-[85vw] sm:w-[340px] lg:w-full lg:min-w-0 snap-center shrink-0">
                                <ServiceCard isViewMore />
                            </div>

                            {/* Spacer for proper padding-right on mobile/tablet scroll */}
                            <div className="min-w-[1px] lg:hidden shrink-0" aria-hidden="true" />
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ServiceDiscovery;