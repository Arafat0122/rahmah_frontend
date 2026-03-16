import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: "What does Semester 3 focus on specifically?",
        answer: "The final semester concludes the study of Sunan al-Nasa&rsquo;i and Sunan Ibn Majah, alongside a thematic review of legal rulings and the ethics of a Hadith narrator."
    },
    {
        question: "How do I receive my Ijazah?",
        answer: "Upon completing the attendance requirements and passing the final comprehensive oral and written exams, students are granted an Ijazah from their respective teachers, documenting their connection to the prophetic chain."
    },
    {
        question: "Is the Sisters&rsquo; program separate or combined?",
        answer: "The Sisters&rsquo; program at dawra.rahmahinstitute.com is a completely separate track with its own dedicated schedule, ensuring a specialized and comfortable environment for female students."
    },
    {
        question: "When are the final exams held?",
        answer: "Final exams are typically held in the last two weeks of the semester. Specific dates for the current term will be released via the student portal."
    }
];

const DawraSemester3FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Semester 3 FAQ</h2>
                    <p className="text-slate-500">Preparing for the final step in your scholarly journey.</p>
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

export default DawraSemester3FAQ;