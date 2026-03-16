import { useState, useEffect } from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const reviews = [
    {
        "review": "Rahmah Institute has completely transformed my understanding of Islamic studies. The teachers are knowledgeable and very supportive.",
        "rating": 5,
        "clientName": "Ahmed Hassan",
        "country": "EG"
    },
    {
        "review": "The classes are well-structured and easy to follow. I appreciate the personal attention from the instructors.",
        "rating": 5,
        "clientName": "Fatima Noor",
        "country": "BD"
    },
    {
        "review": "I enrolled for Tajweed classes and the improvement in my recitation is amazing. Highly recommended.",
        "rating": 5,
        "clientName": "Abdullah Khan",
        "country": "GB"
    },
    {
        "review": "Very professional platform. The teachers explain complex Islamic topics in a simple and clear way.",
        "rating": 4,
        "clientName": "Aisha Rahman",
        "country": "MY"
    },
    {
        "review": "My children love their Quran classes. The environment is positive and encouraging.",
        "rating": 5,
        "clientName": "Mohammed Ali",
        "country": "AE"
    },
    {
        "review": "Flexible timings and experienced scholars make this institute stand out.",
        "rating": 4,
        "clientName": "Zainab Siddiqui",
        "country": "PK"
    },
    {
        "review": "The one-on-one sessions helped me build confidence in learning Arabic and understanding the Quran.",
        "rating": 5,
        "clientName": "Omar Farooq",
        "country": "CA"
    },
    {
        "review": "Rahmah Institute provides authentic knowledge with modern teaching methods. Very satisfied.",
        "rating": 5,
        "clientName": "Khadija Yusuf",
        "country": "NG"
    },
    {
        "review": "The teachers are patient and truly care about student progress. May Allah reward them.",
        "rating": 5,
        "clientName": "Bilal Ahmad",
        "country": "IN"
    },
    {
        "review": "Excellent communication and structured curriculum. I feel more connected to my deen now.",
        "rating": 4,
        "clientName": "Maryam Saleh",
        "country": "SA"
    },
    {
        "review": "Affordable and high-quality Islamic education. I recommend it to anyone seeking authentic knowledge.",
        "rating": 5,
        "clientName": "Yusuf Ibrahim",
        "country": "US"
    },
    {
        "review": "The online platform is smooth and easy to use. Great experience overall.",
        "rating": 4,
        "clientName": "Hafsa Karim",
        "country": "AU"
    }
];

const ReviewSection = () => {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % reviews.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [isPaused]);

    const visibleReviews = [
        reviews[index % reviews.length],
        reviews[(index + 1) % reviews.length],
        reviews[(index + 2) % reviews.length],
    ];

    // SEO: JSON-LD Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": reviews.map((r, i) => ({
            "@type": "Review",
            "position": i + 1,
            "author": { "@type": "Person", "name": r.clientName },
            "reviewBody": r.review,
            "reviewRating": { "@type": "Rating", "ratingValue": r.rating, "bestRating": "5" }
        }))
    };

    return (
        <section
            className="py-24 bg-white relative overflow-hidden"
            aria-labelledby="testimonial-heading"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Inject SEO Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">
                {/* Header */}
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-3 block">
                        Testimonials
                    </span>
                    <h2 id="testimonial-heading" className="font-serif text-4xl md:text-5xl text-slate-900 tracking-tight leading-tight">
                        Trusted by <span className="italic text-slate-500 font-medium">Global Seekers</span>
                    </h2>
                    <div className="w-12 h-[2px] bg-primary mx-auto mt-8 opacity-30 rounded-full"></div>
                </div>

                {/* Animated Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[400px]" aria-live="polite">
                    <AnimatePresence mode="popLayout">
                        {visibleReviews.map((item, i) => (
                            <motion.div
                                key={`${item.clientName}-${index}-${i}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="relative bg-slate-50 p-10 border border-slate-100 group flex flex-col justify-between"
                                style={{
                                    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)"
                                }}
                            >
                                {/* Fold Design */}
                                <div className="absolute bottom-0 right-0 w-[30px] h-[30px] bg-slate-200 transition-colors group-hover:bg-primary/20"
                                    style={{ clipPath: "polygon(0 0, 0 100%, 100% 0)" }}></div>

                                <div>
                                    <div className="flex justify-between items-start mb-8">
                                        <Quote className="text-slate-200 group-hover:text-primary/30 transition-colors" size={40} />
                                        <img
                                            src={`https://flagcdn.com/w40/${item.country.toLowerCase()}.png`}
                                            alt={`Flag of ${item.countryName}`}
                                            className="w-10 h-auto rounded-sm transition-all duration-500"
                                        />
                                    </div>

                                    {/* Rating */}
                                    <div className="flex gap-1 mb-6" aria-label={`Rated ${item.rating} out of 5 stars`}>
                                        {[...Array(5)].map((_, s) => (
                                            <Star
                                                key={s}
                                                size={14}
                                                fill={s < item.rating ? "#C5A059" : "transparent"}
                                                className={s < item.rating ? "text-primary" : "text-slate-300"}
                                            />
                                        ))}
                                    </div>

                                    <p className="text-slate-900 text-lg font-light leading-relaxed italic">
                                        "{item.review}"
                                    </p>
                                </div>

                                {/* Footer */}
                                <div className="mt-10 flex items-center gap-4 border-t border-slate-200/60 pt-6">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-slate-900 text-sm">{item.clientName}</h3>
                                            <CheckCircle2 size={14} className="text-primary" aria-label="Verified Student" />
                                        </div>
                                        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-1">
                                            Verified Student • {item.countryName}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Navigation Dots */}
                <nav className="flex gap-3 mt-12 justify-center" aria-label="Testimonial pagination">
                    {reviews.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            aria-label={`Go to testimonial ${i + 1}`}
                            className={`h-1.5 transition-all duration-500 rounded-full ${i === index % reviews.length ? 'w-12 bg-primary' : 'w-2 bg-slate-300 hover:bg-slate-400'
                                }`}
                        />
                    ))}
                </nav>
            </div>
        </section>
    );
};

export default ReviewSection;