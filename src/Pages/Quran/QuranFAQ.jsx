import { useState, useEffect } from 'react';
import { ChevronDown, Plus, BookOpen } from 'lucide-react';

const QuranFAQ = () => {
    const allFaqs = [
        // --- High Volume SEO Questions ---
        { id: 1, q: "How can I find a qualified online Quran teacher?", a: "You can find qualified Quran teachers through accredited online academies like ours, where we vet instructors for Ijazah certification and teaching experience." },
        { id: 2, q: "Is it possible to learn Quran tajweed online effectively?", a: "Yes, online learning is highly effective for Tajweed. Our platform uses high-definition audio and screen-sharing to ensure students master the correct makharij (articulation points) of Arabic letters." },
        { id: 3, q: "What is an Ijazah in Quranic studies?", a: "An Ijazah is an accredited certification that grants a person the authority to teach Quran recitation or memorization, tracing their lineage back to the Prophet (PBUH)." },
        { id: 4, q: "Can adults start learning the Quran as beginners?", a: "Absolutely. We offer specialized adult beginner courses that focus on basic Arabic literacy (Noorani Qaida) before progressing to full Quranic recitation." },
        { id: 5, q: "How long does it take to memorize the Quran (Hifz)?", a: "The duration for Hifz varies per student, but typically takes between 2 to 5 years depending on daily consistency and individual memorization capacity." },
        { id: 6, q: "What are the benefits of online Quran classes for kids?", a: "Online classes offer a safe, home-based environment with flexible scheduling, interactive digital tools, and access to world-class scholars that might not be available locally." },
        { id: 7, q: "Do you offer Quran classes for females with female teachers?", a: "Yes, we provide 1-on-1 private sessions with highly qualified female Quran teachers to ensure a comfortable and professional learning environment for sisters." },
        { id: 8, q: "What is the best age for children to start Quran memorization?", a: "While every child is different, many experts suggest starting basic literacy at age 4-5 and formal memorization (Hifz) around age 6-7." },
        { id: 9, q: "What are the basic rules of Tajweed?", a: "Basic Tajweed rules include Noon Sakinah and Tanween, Meem Sakinah rules, Ghunnah, and the proper articulation of letters from their specific throat and mouth exits." },
        { id: 10, q: "Why is it important to learn Quran with Tafsir?", a: "Understanding Tafsir (interpretation) allows students to go beyond recitation to understand the context, laws, and spiritual guidance within the verses." },
        { id: 11, q: "What is the difference between Hafiz and Qari?", a: "A Hafiz is someone who has memorized the entire Quran, while a Qari is a master of the art of recitation according to specific rules of Tajweed and melodies." },
        { id: 12, q: "How do I choose between different Riwayat (recitations)?", a: "Most students begin with the 'Hafs an Asim' recitation. Advanced students may pursue other Riwayat like Warsh or Qalun through specialized Ijazah programs." },
        { id: 13, q: "Are online Quran classes expensive?", a: "Online classes are often more affordable than local private tutors because they eliminate travel costs and offer flexible subscription-based pricing models." },
        { id: 14, q: "Can I get an Ijazah online?", a: "Yes, our senior scholars provide structured Ijazah programs online. Upon successful completion and examination, students receive a formal certificate." },
        { id: 15, q: "What is Noorani Qaida and why is it important?", a: "Noorani Qaida is a fundamental book for beginners that teaches the Arabic alphabet and basic phonetics required for correct Quranic recitation." },
        { id: 16, q: "How many hours a week should I study to learn Quran?", a: "For steady progress, we recommend at least 3 sessions of 30-45 minutes per week, combined with daily self-practice." },
        { id: 17, q: "What technology do I need for online Quran classes?", a: "A stable internet connection, a laptop or tablet, and a good quality headset are all you need to start your online learning journey." },
        { id: 18, q: "Do online Quran classes include Islamic studies?", a: "Many of our courses integrate basic Islamic studies, including Seerah, Fiqh, and daily Duas, alongside Quranic recitation." },
        { id: 19, q: "How do you track student progress in Hifz?", a: "We use digital student portals where teachers log daily lessons, mistakes, and revision (Muraja'ah) progress for parents to review." },
        { id: 20, q: "Can I learn Quranic Arabic to understand the meanings?", a: "Yes, we offer specialized Quranic Arabic courses that focus on the vocabulary and grammar used specifically in the Holy Quran." },
        { id: 21, q: "What is the reward for reading Quran every day?", a: "The Prophet (PBUH) stated that for every letter recited, there is a ten-fold reward, bringing immense spiritual peace and guidance." },
        { id: 22, q: "How to correct Tajweed mistakes at home?", a: "Listening to professional reciters (like Husary or Minshawi) and recording your own voice to compare is an excellent way to self-correct." },
        { id: 23, q: "Is there a trial class for new students?", a: "Yes, we offer a free trial session so you can meet your teacher and evaluate our teaching methodology before committing." },
        { id: 24, q: "How to stay motivated during Quran memorization?", a: "Consistent schedules, understanding the meaning of the verses, and having a supportive teacher are key to long-term Hifz motivation." },
        { id: 25, q: "Can I learn Quran if Arabic is not my native language?", a: "Absolutely. The vast majority of Quran students are non-native speakers. Our teachers specialize in helping non-Arabs master the phonetics of the language." }
    ];

    const [visibleCount, setVisibleCount] = useState(5);
    const [activeIndex, setActiveIndex] = useState(null);

    // --- SEO SCHEMA GENERATION ---
    useEffect(() => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": allFaqs.map(faq => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.a
                }
            }))
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.innerHTML = JSON.stringify(schema);
        document.head.appendChild(script);

        return () => document.head.removeChild(script);
    }, []);

    const showMore = () => setVisibleCount(prev => Math.min(prev + 10, allFaqs.length));
    const toggleAccordion = (index) => setActiveIndex(activeIndex === index ? null : index);

    return (
        <section className="py-24 bg-[#FDFDFD]">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-6">
                        <BookOpen size={14} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Academy Support</span>
                    </div>
                    <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
                    <p className="text-slate-500 max-w-lg mx-auto">Get expert answers to common questions about online Quranic studies, Tajweed, and Hifz programs.</p>
                </div>

                <div className="space-y-3">
                    {allFaqs.slice(0, visibleCount).map((faq, index) => (
                        <div 
                            key={faq.id}
                            className={`group border rounded-[1.5rem] transition-all duration-500 ${
                                activeIndex === index 
                                ? 'border-primary/30 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.03)]' 
                                : 'border-slate-100 bg-transparent hover:border-slate-200'
                            }`}
                        >
                            <button 
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className={`text-sm md:text-base font-bold tracking-tight transition-colors duration-300 ${
                                    activeIndex === index ? 'text-primary' : 'text-slate-700'
                                }`}>
                                    <span className="text-[10px] font-black text-slate-300 mr-4 tabular-nums">
                                        {faq.id.toString().padStart(2, '0')}
                                    </span>
                                    {faq.q}
                                </span>
                                <div className={`shrink-0 ml-4 p-1 rounded-full transition-all duration-500 ${
                                    activeIndex === index ? 'rotate-180 bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-300 bg-slate-50'
                                }`}>
                                    <ChevronDown size={18} />
                                </div>
                            </button>
                            
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                activeIndex === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                                <div className="px-16 pb-8 text-sm md:text-base text-slate-500 leading-relaxed font-medium">
                                    {faq.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {visibleCount < allFaqs.length && (
                    <div className="mt-12 text-center">
                        <button 
                            onClick={showMore}
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 group"
                        >
                            Load More Insights
                            <Plus size={16} className="group-hover:rotate-90 transition-transform duration-500" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default QuranFAQ;