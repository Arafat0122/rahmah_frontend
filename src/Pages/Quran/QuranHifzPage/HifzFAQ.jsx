import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: "How long does it take to complete the Hifz?",
        answer: "Completion time varies by individual capacity and daily commitment. On average, our students complete the full Hifz in 2 to 4 years with consistent 1-on-1 coaching."
    },
    {
        question: "Do you teach students who cannot read Arabic?",
        answer: "We recommend completing a Nazira or Tajweed course first to ensure correct pronunciation. However, we do have integrated tracks for simultaneous reading and memorization."
    },
    {
        question: "How do you handle the revision (Muraja'ah)?",
        answer: "We use a three-tier system: Sabaq (new), Sabqi (recent), and Manzil (old). This ensures that while you move forward, your previous lessons remain strong."
    },
    {
        question: "Can adults join the Hifz program?",
        answer: "Absolutely. We have specialized memorization techniques tailored for working professionals and adults who have busy schedules."
    }
];

const HifzFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Hifz Program FAQ</h2>
                    <p className="text-slate-500">Common questions about the memorization path.</p>
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

export default HifzFAQ;