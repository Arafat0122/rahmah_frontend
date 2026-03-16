import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: "How is Quranic Arabic different from Conversational Arabic?",
        answer: "Quranic Arabic focuses on the classical vocabulary and structural nuances used in the Quran and Hadith. While modern conversational Arabic uses dialects, this course prepares you for high-level literacy and spiritual comprehension."
    },
    {
        question: "Will this course help me understand the Quran without a translation?",
        answer: "Yes. By focusing on the root-word system and frequent vocabulary, our goal is to help you understand a significant portion of the Quranic text directly by the end of the intermediate level."
    },
    {
        question: "Are there any prerequisites?",
        answer: "You should be able to read the Arabic script fluently. We recommend our Beginner Reading & Writing course if you are not yet comfortable with the alphabet."
    },
    {
        question: "How long does it take to see results?",
        answer: "Most students begin to recognize common words and understand short Surahs within the first 3 months of consistent study."
    }
];

const QuranicArabicFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Quranic Arabic FAQ</h2>
                    <p className="text-slate-500">Connecting your heart to the Divine Language.</p>
                </div>
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <div key={index} className={`border rounded-3xl transition-all ${activeIndex === index ? 'border-primary shadow-lg shadow-primary/5' : 'border-slate-100'}`}>
                            <button onClick={() => setActiveIndex(activeIndex === index ? null : index)} className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none">
                                <span className={`font-bold ${activeIndex === index ? 'text-primary' : 'text-slate-900'}`}>{faq.question}</span>
                                {activeIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-8 pt-0 text-slate-600 border-t border-slate-50">{faq.answer}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QuranicArabicFAQ;