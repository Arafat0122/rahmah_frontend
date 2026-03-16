import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: "What books are covered in Semester 2?",
        answer: "Semester 2 primarily focuses on the 'Sunan' works, specifically Sunan Abu Dawud and Sunan al-Tirmidhi, focusing on the chapters of Fiqh, Transactions, and the legal nuances between different narrations."
    },
    {
        question: "Is completion of Semester 1 mandatory?",
        answer: "While it is highly recommended to complete Semester 1 for the methodological foundation, students with prior equivalent studies may request an assessment to join Semester 2 directly."
    },
    {
        question: "Will the Sisters&rsquo; program cover the same syllabus?",
        answer: "Yes, the Sisters&rsquo; Dawra program at dawra.rahmahinstitute.com follows the exact same academic curriculum and standards as the general program, ensuring full scholarly qualification."
    },
    {
        question: "How are the assessments conducted?",
        answer: "Assessments are a combination of oral examinations (testifying to your connection to the chain) and written analytical papers on the legal deriving (Istinbat) of the Hadith."
    }
];

const DawraSemester2FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Semester 2 FAQ</h2>
                    <p className="text-slate-500">Deepening your scholarly journey.</p>
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

export default DawraSemester2FAQ;