import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: "What is Tajweed and why is it necessary?",
        answer: "Tajweed refers to the set of rules governing the way the words of the Quran should be pronounced during recitation. It is necessary to preserve the correct meaning of the Divine words and to recite exactly as the Prophet Muhammad (PBUH) did."
    },
    {
        question: "Do I need to complete Noorani Qaida before starting Tajweed?",
        answer: "Yes, a basic understanding of Arabic letter recognition and vowels (Noorani Qaida) is a prerequisite. This ensures you can focus on the advanced rules of elongation, nasalization, and articulation."
    },
    {
        question: "What are the major rules covered in this Tajweed course?",
        answer: "The course covers the rules of Noon Sakinah and Tanween, Meem Sakinah, Ghunnah, Qalqalah, and the various types of Madd (elongation), along with the correct points of articulation (Makharij)."
    },
    {
        question: "How long does it take to master Tajweed?",
        answer: "Mastering the theory usually takes 4–6 months, but applying those rules fluently in recitation is a lifelong journey. Most students see significant improvement in their fluency within the first 12 weeks."
    },
    {
        question: "Are the Tajweed teachers certified?",
        answer: "Absolutely. All our Tajweed instructors are Azhari scholars or hold Ijazah (certification) in Quranic recitation, ensuring you receive the highest standard of authentic instruction."
    }
];

const TajweedFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const jsonLdData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": { "@type": "Answer", "text": item.answer }
        }))
    };

    return (
        <section className="py-24 bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }} />
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Tajweed Essentials FAQ</h2>
                    <p className="text-slate-500">Clarifying the science of Quranic recitation.</p>
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

export default TajweedFAQ;