import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: "Is this course suitable for beginners?",
        answer: "No, this is an advanced specialization. Students must have a firm grasp of basic Tajweed rules and be able to recite the Quran fluently before enrolling."
    },
    {
        question: "Can I get an Ijazah through this program?",
        answer: "Yes. We offer an Ijazah track where students recite the entire Quran to a certified Shaykh. Upon successful completion with zero errors, you receive a Sanad (chain of narration) reaching back to the Prophet (PBUH)."
    },
    {
        question: "Do you teach the Maqamat (Melodic Tones)?",
        answer: "We introduce the basics of Maqamat (Bayati, Hijaz, etc.) to help students beautify their voice, but our primary focus remains the absolute preservation of Tajweed rules over melody."
    },
    {
        question: "What is Al-Jazariyyah?",
        answer: "It is a famous poem by Imam Ibn al-Jazari that outlines the most intricate rules of Tajweed. Advanced students study this text to master the theoretical science of recitation."
    }
];

const AdvancedTajweedFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Advanced Tilawah FAQ</h2>
                    <p className="text-slate-500">Addressing technical aspects of professional recitation.</p>
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

export default AdvancedTajweedFAQ;