"use client";

import React from "react";

export default function StatsCards() {
  const cards = [
    {
      icon: "🔓",
      date: "03.2025",
      category: "BIOMETRIC BREACH",
      title: "Clearview AI $50M Settlement 2025",
      description: "In March 2025, a federal judge approved a novel ~$51.75M class-action settlement granting plaintiffs a 23% equity stake in Clearview AI for illegally scraping and using billions of facial images without consent, violating biometric privacy laws.",
      link: "https://www.reuters.com/legal/litigation/us-judge-approves-novel-clearview-ai-class-action-settlement-2025-03-21/"
    },
    {
      icon: "📰",
      date: "06-07.2025",
      category: "AI VULNERABILITY",
      title: "McDonald's AI Leak Millions Exposed",
      description: "In June 2025, security researchers uncovered vulnerabilities in McDonald's AI hiring platform McHire—including default password '123456' and an IDOR flaw—exposing personal data and chat histories of up to 64 million job applicants.",
      link: "https://www.wired.com/story/mcdonalds-ai-hiring-chat-bot-paradoxai/"
    },
    {
      icon: "🧪",
      date: "2030",
      category: "QUANTUM DEADLINE",
      title: "2030 Quantum Threat Today's Encryption Dies",
      description: "Experts and NIST project that by 2030, scalable quantum computers could break current RSA and ECC encryption via Shor's algorithm, necessitating full migration to post-quantum cryptography to counter 'harvest now, decrypt later' attacks.",
      link: "https://csrc.nist.gov/projects/post-quantum-cryptography"
    }
  ];

  return (
    <section className="py-20 w-full bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">High-profile breaches that made headlines</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <a
              key={index}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-gradient-to-b from-blue-600 to-blue-700 rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col min-h-[400px] group cursor-pointer"
            >
              {/* Icon */}
              <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center text-4xl mb-6">
                {card.icon}
              </div>

              {/* Date and Category */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-blue-100 text-sm font-medium">{card.date}</span>
                <span className="text-blue-100 text-xs font-semibold tracking-wider">{card.category}</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl text-white font-bold mb-3">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-blue-50 text-sm leading-relaxed mb-6 flex-grow">
                {card.description}
              </p>

              {/* Arrow Button */}
              <div className="w-12 h-12 bg-blue-500 group-hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:scale-110">
                <svg 
                  className="w-5 h-5 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
