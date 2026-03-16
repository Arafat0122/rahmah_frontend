import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: "How long does it take to learn the Arabic alphabet?",
        answer: "Most students can learn to recognize and write the full alphabet with correct pronunciation within 4 to 6 weeks of consistent study."
    },
    {
        question: "Do I need any prior knowledge of Arabic?",
        answer: "No. This course is designed for absolute beginners. We start from the very first letter (Alif) and build your skills from zero."
    },
    {
        question: "Is this Modern Standard Arabic or a dialect?",
        answer: "We focus on Modern Standard Arabic (MSA), which is the foundation for reading the Quran, newspapers, and literature, and is understood across all Arabic-speaking countries."
    },
    {
        question: "Will I be able to write Arabic by the end of this course?",
        answer: "Yes. Our curriculum includes digital and manual writing exercises to ensure you can join letters correctly and write fluidly from right to left."
    }
];

const BeginnerArabicFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Beginner FAQ</h2>
                    <p className="text-slate-500">Everything you need to know about starting your Arabic journey.</p>
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

export default BeginnerArabicFAQ;