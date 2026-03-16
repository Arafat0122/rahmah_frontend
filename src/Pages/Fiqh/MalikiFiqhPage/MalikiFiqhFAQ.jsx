import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: "What distinguishes the Maliki Madhhab?",
        answer: "The Maliki school is uniquely characterized by its reliance on the 'Amal (practice) of the people of Madinah, viewing their continuous traditions as a living sunnah that provides clarity on prophetic practice."
    },
    {
        question: "What are the core texts we will study?",
        answer: "Beginners typically start with the 'Ashmawiyya or the Risala of Ibn Abi Zayd, moving towards the Muwatta of Imam Malik and advanced texts like the Mukhtasar of Khalil."
    },
    {
        question: "Is this course applicable for those living in the West?",
        answer: "Yes. The Maliki school has a very robust framework for public interest (Maslaha) and custom ('Urf), making it highly adaptable for Muslims living in modern, diverse societies."
    },
    {
        question: "What is the teacher's background?",
        answer: "Our Maliki instructors have spent years studying under scholars in traditional centers of learning, specifically focusing on the authentic chains of the school."
    }
];

const MalikiFiqhFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Maliki Fiqh FAQ</h2>
                    <p className="text-slate-500">Clarifying the school of the Imam of Dar al-Hijrah.</p>
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

export default MalikiFiqhFAQ;