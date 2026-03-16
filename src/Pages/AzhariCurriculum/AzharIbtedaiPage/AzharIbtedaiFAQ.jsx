import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: "What is the Al-Azhar Ibtedai curriculum?",
        answer: "It is the foundational stage (Primary) of the formal Azhari educational system, designed to provide students with a comprehensive and balanced introduction to Islamic sciences and Arabic."
    },
    {
        question: "Is this program only for children?",
        answer: "While it is modeled after the primary school system, the materials are excellent for any adult beginner looking for a systematic and authentic start to their Islamic studies."
    },
    {
        question: "Will students receive a certificate?",
        answer: "Yes. Upon successful completion of the assessments for each level, Rahmah Institute provides a certificate of completion based on the Azhari standard."
    },
    {
        question: "Do teachers speak English or Arabic?",
        answer: "Our instructors are bilingual. They use English to explain complex concepts while ensuring the core Arabic terminology and texts are mastered."
    }
];

const AzharIbtedaiFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Azhari Ibtedai FAQ</h2>
                    <p className="text-slate-500">Clarifying the foundations of the Azhari path.</p>
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

export default AzharIbtedaiFAQ;