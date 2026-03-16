import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: "What is the difference between Nahw and Sarf?",
        answer: "Sarf (Morphology) is the study of how individual words are built from roots, while Nahw (Syntax) is the study of how those words work together to form sentences and the changes at the end of words (I'rab)."
    },
    {
        question: "Is this course suitable for beginners?",
        answer: "This course is best suited for students who can already read Arabic fluently and have a basic vocabulary. If you are a total beginner, we recommend starting with our Reading & Writing course."
    },
    {
        question: "Will I learn to speak Arabic in this grammar course?",
        answer: "While the focus is on the mechanics of the language, understanding grammar is essential for correct speech. We combine grammatical rules with practical composition and speaking exercises."
    },
    {
        question: "Which classical books are used in this program?",
        answer: "We use a mix of modern pedagogical materials and classical texts like Al-Ajrumiyyah and Qatr al-Nada, depending on the student's level."
    }
];

const ArabicGrammarFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Grammar FAQ</h2>
                    <p className="text-slate-500">Clarifying the linguistic path.</p>
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

export default ArabicGrammarFAQ;