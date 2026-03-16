import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: "What is the primary focus of Semester 1?",
        answer: "Semester 1 introduces the student to the methodologies of the six authentic books (Sihah al-Sittah), beginning with the first volumes of Sahih al-Bukhari and Sahih Muslim, alongside the study of Hadith nomenclature (Mustalah)."
    },
    {
        question: "Is this program suitable for beginners?",
        answer: "The Dawra program is traditionally for advanced students. We recommend having a solid foundation in Arabic and basic Fiqh before enrolling in the Hadith-intensive Semester 1."
    },
    {
        question: "When does the Sisters' program start?",
        answer: "The specialized Sisters' Dawra track starts on 15 Shawwal. You can find more details and registration information at dawra.rahmahinstitute.com."
    },
    {
        question: "Are these classes recorded?",
        answer: "Yes, students have access to high-quality recordings of all sessions through the student portal, allowing for review and revision throughout the semester."
    }
];

const DawraSemester1FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Semester 1 FAQ</h2>
                    <p className="text-slate-500">Understanding the Dawra academic structure.</p>
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

export default DawraSemester1FAQ;