import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: "Why is the Hanbali Madhhab known for being strict yet flexible?",
        answer: "It is 'strict' in its adherence to textual evidence (Hadith and Athar), but very flexible in matters of contracts and transactions, where it allows anything that is not explicitly forbidden."
    },
    {
        question: "Which books will we start with?",
        answer: "We typically begin with foundational primers like 'Akhsar al-Mukhtasarat' or 'Umdat al-Fiqh' by Imam al-Maqdisi, which provide a clear entry into the school's rulings."
    },
    {
        question: "Does the course cover the Aqidah of Imam Ahmad?",
        answer: "While this is a Fiqh course, we touch upon the creedal foundations of the school where they intersect with legal practice and the methodology of deriving rulings."
    },
    {
        question: "Are the lessons suitable for English speakers?",
        answer: "Yes. Our Hanbali track is designed to be accessible, with all technical Arabic terms explained in detail for those not yet fluent in the language."
    }
];

const HanbaliFiqhFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Hanbali Fiqh FAQ</h2>
                    <p className="text-slate-500">Understanding the school of the Imam of Sunnah.</p>
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

export default HanbaliFiqhFAQ;