import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: "What makes the Shafi Madhhab unique?",
        answer: "Imam al-Shafi is often called the 'Architect of Islamic Law.' His school is known for its rigorous emphasis on Sunnah as a primary source and its highly systematic methodology (Usul), providing a balanced approach between reason and tradition."
    },
    {
        question: "What are the first books we will study?",
        answer: "For beginners, we typically start with 'Safinat al-Naja' for basic worship and 'Matn Abi Shuja' for a broader overview of legal chapters."
    },
    {
        question: "How do you handle the different views within the Madhhab?",
        answer: "We focus on the 'Mu'tamad' (relied-upon) positions of the late Shafi school as codified by Imams like Nawawi and Rafi'i, ensuring students learn the most correct application for today."
    },
    {
        question: "Do I need to know Arabic to join the Shafi Fiqh course?",
        answer: "While we offer courses in English and other languages, having a basic understanding of Arabic terminology is helpful. We explain all technical terms throughout the lectures."
    }
];

const ShafiFiqhFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Shafi Fiqh FAQ</h2>
                    <p className="text-slate-500">Clarifying the path of Imam al-Shafi.</p>
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

export default ShafiFiqhFAQ;