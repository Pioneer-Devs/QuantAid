"use client";

import React from "react";

export default function HowItWorks() {
  const solutions = [
    {
      icon: "🛡️",
      title: "Post-quantum encryption (Kyber-1024)",
      description: "NIST-approved post-quantum cryptography protects your data right in your browser",
      gradient: "from-blue-50 to-blue-100"
    },
    {
      icon: "⛓️",
      title: "Immutable proofs anchored on BlockDAG",
      description: "Timestamped, tamper-proof records ensure dataset integrity forever",
      gradient: "from-cyan-50 to-cyan-100"
    },
    {
      icon: "✅",
      title: "Easy verification and sharing",
      description: "Generate compliance reports and share verifiable proofs with stakeholders instantly",
      gradient: "from-green-50 to-green-100"
    },
    {
      icon: "🚀",
      title: "User-friendly workflow",
      description: "Safe, streamlined process designed for AI teams and researchers - no crypto expertise needed",
      gradient: "from-purple-50 to-purple-100"
    }
  ];

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-16">
          How QUANTAID Protects Your Data
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((solution, index) => (
            <div 
              key={index}
              className={`group bg-gradient-to-br ${solution.gradient} border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {solution.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {solution.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

