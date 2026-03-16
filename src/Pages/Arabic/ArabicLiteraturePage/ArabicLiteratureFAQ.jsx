import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: "What level of Arabic do I need for this course?",
        answer: "This is an advanced course. Students should have a strong grasp of Arabic Grammar (Nahw & Sarf) and be able to read complex texts without diacritical marks (tashkeel)."
    },
    {
        question: "What is the focus of the Balagha module?",
        answer: "Balagha focuses on how the language conveys beauty, emphasis, and subtle meanings. It is essential for anyone wanting to truly understand the eloquence of the Quran and classical poetry."
    },
    {
        question: "Do you study modern Arabic literature?",
        answer: "While our focus is primarily on the Classical (Turath) heritage, we do analyze modern literary masters to show the evolution of the language."
    },
    {
        question: "Will I learn to write poetry in this course?",
        answer: "The course focuses on analysis and appreciation, but students are encouraged to compose their own prose and poems using the rhetorical devices learned in class."
    }
];

const ArabicLiteratureFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Literature FAQ</h2>
                    <p className="text-slate-500">Unveiling the treasures of the language.</p>
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

export default ArabicLiteratureFAQ;