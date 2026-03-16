import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: "Is the Sanabi stage equivalent to high school?",
        answer: "In the Azhari system, the Sanabi (Secondary/Thanawiyyah) stage is the final step before entering university. It is academically equivalent to high school but focused heavily on specialized Islamic and Arabic sciences."
    },
    {
        question: "Does this course prepare me for Al-Azhar University?",
        answer: "Absolutely. This curriculum is specifically designed to meet the entry requirements and academic rigor expected of students entering the various faculties of Al-Azhar University in Cairo."
    },
    {
        question: "Can I join this program if I didn't do Ibtedai or Edadi?",
        answer: "Yes, provided you pass an assessment to ensure you have the necessary Arabic fluency and foundational knowledge in Fiqh and Usul required for this advanced level."
    },
    {
        question: "What kind of support is provided for students?",
        answer: "We provide intensive one-on-one mentorship, mock exams following the Azhari format, and guidance on university applications for those wishing to study abroad."
    }
];

const AzharSanabiFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Azhari Sanabi FAQ</h2>
                    <p className="text-slate-500">Preparing the next generation of scholars and leaders.</p>
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

export default AzharSanabiFAQ;