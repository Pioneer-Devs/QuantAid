"use client";

import React from "react";

export default function ProblemSection() {
  const problems = [
    {
      icon: "🔓",
      title: "Data Vulnerability",
      description: "Sensitive AI datasets are exposed to unauthorized access and breaches"
    },
    {
      icon: "⚛️",
      title: "Quantum Threats",
      description: "Current encryption methods will be broken by quantum computers"
    },
    {
      icon: "🔒",
      title: "Privacy at Risk",
      description: "One breach can destroy trust and cost millions in damages"
    }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-6">
          The Challenge AI Teams Face
        </h2>
        
        <p className="text-lg sm:text-xl text-gray-700 max-w-4xl mx-auto text-center leading-relaxed mb-16">
          AI models are only as strong as the data they are trained on. That data is private, sensitive, and valuable. Current encryption methods won't survive the quantum era, leaving datasets exposed to future attacks. <span className="text-red-600 font-semibold">One breach can destroy trust and cost millions.</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="group bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-blue-300 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {problem.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {problem.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
