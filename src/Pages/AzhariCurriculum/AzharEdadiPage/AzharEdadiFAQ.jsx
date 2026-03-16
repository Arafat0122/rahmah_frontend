import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: "Who should enroll in the Azhar Edadi program?",
        answer: "This program is designed for students who have completed the Ibtedai (Primary) level or have a solid foundation in basic Arabic and Islamic knowledge and wish to advance to an academic level."
    },
    {
        question: "What makes the Edadi stage different from the Ibtedai?",
        answer: "While Ibtedai focuses on memorization and basics, the Edadi stage introduces 'Mantiq' (Logic) and 'Usul' (Principles), encouraging students to understand the 'why' and 'how' behind Islamic sciences."
    },
    {
        question: "Is this course recognized for further Azhari studies?",
        answer: "Our curriculum follows the official Al-Azhar Al-Sharif standards, making it an excellent preparation for those wishing to pursue higher degrees in Islamic scholarship."
    },
    {
        question: "How intensive is the Arabic requirement?",
        answer: "Students should be comfortable reading Arabic fluently. The course will significantly increase your ability to analyze classical texts and understand complex sentence structures."
    }
];

const AzharEdadiFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Azhari Edadi FAQ</h2>
                    <p className="text-slate-500">Connecting foundational knowledge to academic mastery.</p>
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

export default AzharEdadiFAQ;