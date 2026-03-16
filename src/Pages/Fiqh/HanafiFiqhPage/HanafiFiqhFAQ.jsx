import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: "Why study the Hanafi Madhhab specifically?",
        answer: "The Hanafi school is the most widely followed school of law in the Muslim world. It is known for its sophisticated legal reasoning and its ability to provide practical solutions for complex social and economic contexts."
    },
    {
        question: "Do I need to be a student of knowledge to join?",
        answer: "We offer tracks for all levels. Our beginner courses focus on essential daily rulings (Fard al-Ayn), while advanced tracks dive into legal theory and comparative Fiqh."
    },
    {
        question: "Are the teachers certified to teach this Madhhab?",
        answer: "Yes. All our Fiqh instructors hold verified Ijazahs (permissions) in the specific texts they teach, ensuring the chain of transmission remains authentic."
    },
    {
        question: "Will I learn about other Madhhabs in this course?",
        answer: "The primary focus is the Hanafi position. However, in advanced modules, comparative Fiqh is introduced to understand the diverse reasoning across the four schools."
    }
];

const HanafiFiqhFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Hanafi Fiqh FAQ</h2>
                    <p className="text-slate-500">Understanding the path of legal scholarship.</p>
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

export default HanafiFiqhFAQ;