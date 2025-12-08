import { ChevronDown } from "lucide-react";
import { useState } from "react";

// Helper component for the Accordion functionality
const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b dark:border-gray-700 py-4">
      <button
        className="flex justify-between items-center w-full text-left font-semibold text-lg dark:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${isOpen ? 'max-h-96 pt-3' : 'max-h-0'}`}>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default function Faq() {
  const faqData = [
    // 1. Age & Legal Requirements
    { 
      category: "Age & Legal Requirements (Most Important)", 
      questions: [
        { 
          q: "What is the minimum legal age to order from your website?", 
          a: "You must be 21 years of age or older to purchase alcohol."
        },
        { 
          q: "Do I need to show ID when the order is delivered?", 
          a: "Yes, a valid government-issued photo ID is required upon delivery to verify the recipient is 21+ and to obtain a signature."
        },
      ]
    },
    // 2. Shipping & Delivery
    {
      category: "Shipping & Delivery",
      questions: [
        {
          q: "Do you ship to my state/province/country?",
          a: "Shipping is restricted by law. Please check our Shipping Policy page or enter your ZIP/postal code at checkout to confirm we deliver to your address."
        },
        {
          q: "What are the shipping costs?",
          a: "Shipping costs vary based on your location and the weight of your order. We offer free shipping on orders over $X."
        },
      ]
    },
    // 3. Orders & Returns
    {
      category: "Orders & Returns",
      questions: [
        {
          q: "Can I return a bottle of liquor if I change my mind?",
          a: "Due to state/local regulations, we generally cannot accept returns of alcoholic beverages unless the product is damaged or defective upon arrival."
        },
        {
          q: "What should I do if my bottle arrives damaged or broken?",
          a: "Please take photos of the damaged box and bottle immediately and contact our Customer Service team within 48 hours for replacement or refund."
        },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-['Playfair_Display'] text-4xl font-bold mb-8 text-center dark:text-white border-b pb-4 dark:border-gray-800">
          Frequently Asked Questions
        </h1>
        
        <div className="space-y-8">
          {faqData.map((section, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-[#333333] dark:text-white border-b dark:border-gray-700 pb-2">
                {section.category}
              </h2>
              {section.questions.map((item, qIndex) => (
                <FaqItem 
                  key={qIndex}
                  question={item.q}
                  answer={item.a}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}