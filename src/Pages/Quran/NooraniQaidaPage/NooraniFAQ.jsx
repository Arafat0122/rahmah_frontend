import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const NooraniFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqData = [
        {
            question: "What is Noorani Qaida and why is it important?",
            answer: "Noorani Qaida is a foundational booklet used to teach beginners the basics of Arabic reading and Quranic recitation. It is essential because it covers the Arabic alphabet, pronunciation (Makhraj), and basic Tajweed rules, ensuring a correct start to Quranic literacy."
        },
        {
            question: "How long does it take to complete the Noorani Qaida course?",
            answer: "On average, a student takes 3 to 6 months to complete the course, depending on their pace and the number of classes per week. Most students find 2–3 sessions per week ideal for retention."
        },
        {
            question: "Can adults learn Noorani Qaida, or is it only for children?",
            answer: "Noorani Qaida is designed for all ages. While popular for children, it is the most effective tool for adult reverts or beginners who want to correct their Arabic pronunciation and start reading the Quran from scratch."
        },
        {
            question: "What are the benefits of learning Noorani Qaida online?",
            answer: "Online learning offers flexibility, access to certified Azhari tutors, and 1-on-1 personalized attention. It allows students to learn from the comfort of home while using digital tools to track progress and pronunciation."
        },
        {
            question: "Do I need any prior knowledge of Arabic to start?",
            answer: "No prior knowledge is required. The Noorani Qaida course starts from the very first letter of the Arabic alphabet and builds up to complex words and sentences."
        },
        {
            question: "Is there a certificate provided after completion?",
            answer: "Yes, upon successful completion and an assessment of your recitation, Rahmah Institute provides a certificate of completion verified by our expert Quranic scholars."
        },
        {
            question: "What is the difference between Noorani Qaida and Madani Qaida?",
            answer: "Both serve the same purpose. Noorani Qaida is the traditional method used globally, while Madani Qaida is a similar variation. Both focus on Tajweed and Makhraj, and our teachers are equipped to teach both."
        },
        {
            question: "Will I learn Tajweed rules in this course?",
            answer: "Yes, the course introduces foundational Tajweed rules such as Noon Sakinah, Meem Sakinah, and Madd, ensuring that your foundation is built on correct recitation principles."
        },
        {
            question: "Are the teachers native Arabic speakers?",
            answer: "We offer both native Arabic speakers (Azhari scholars) and highly qualified non-native teachers who are fluent in English to ensure clear communication and perfect pronunciation."
        },
        {
            question: "How do I book a free trial Noorani Qaida class?",
            answer: "You can book a free trial by clicking the 'Start Learning Today' button. This allows you to meet your tutor, assess your level, and experience our teaching methodology before committing."
        }
    ];

    // SEO: JSON-LD Structured Data
    const jsonLdData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    return (
        <section className="py-24 bg-white" aria-labelledby="faq-heading">
            {/* Injecting JSON-LD for Google SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
            />

            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-4">
                        <HelpCircle size={14} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">Support</span>
                    </div>
                    <h2 id="faq-heading" className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-500 max-w-lg mx-auto">
                        Everything you need to know about starting your Quranic journey with Noorani Qaida.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className={`border rounded-3xl transition-all duration-300 ${activeIndex === index ? 'border-primary shadow-lg shadow-primary/5' : 'border-slate-100 hover:border-slate-200'
                                }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none"
                                aria-expanded={activeIndex === index}
                            >
                                <span className={`text-base md:text-lg font-bold transition-colors ${activeIndex === index ? 'text-primary' : 'text-slate-900'
                                    }`}>
                                    {faq.question}
                                </span>
                                <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all ${activeIndex === index ? 'bg-primary text-white' : 'bg-slate-50 text-slate-400'
                                    }`}>
                                    {activeIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                                </div>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-6 md:p-8 pt-0 text-slate-600 leading-relaxed border-t border-slate-50">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NooraniFAQ;