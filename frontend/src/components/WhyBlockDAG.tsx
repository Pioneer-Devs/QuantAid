"use client";

import React from "react";

export default function WhyBlockDAG() {
  const userTypes = [
    {
      title: "Startups",
      icon: "🚀",
      description: "Launch with confidence knowing your proprietary AI datasets are quantum-secure from day one",
      benefits: ["Fast setup", "Cost-effective", "Investor-ready security"]
    },
    {
      title: "Researchers",
      icon: "🔬",
      description: "Publish verifiable proofs of your datasets and maintain integrity throughout the research lifecycle",
      benefits: ["Data provenance", "Reproducibility", "Collaboration-ready"]
    },
    {
      title: "Developers",
      icon: "💻",
      description: "Integrate post-quantum security into ML pipelines with simple APIs and browser-based encryption",
      benefits: ["No backend needed", "Easy integration", "Developer-friendly"]
    }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-6">
          Why Teams Love QUANTAID
        </h2>
        
        <p className="text-lg sm:text-xl text-gray-700 max-w-4xl mx-auto text-center leading-relaxed mb-16">
          Startups, researchers, and developers can now securely encrypt AI datasets, generate verifiable proofs, and build trust without complex setup. Every proof strengthens the BlockDAG ecosystem and contributes to a more secure AI future.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {userTypes.map((type, index) => (
            <div 
              key={index}
              className="group bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-blue-300 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-6xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {type.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {type.title}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {type.description}
              </p>
              <ul className="space-y-2">
                {type.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <span className="text-blue-600 mr-2">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BlockDAG Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-gray-200 rounded-3xl p-10 shadow-lg">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block px-6 py-3 rounded-full bg-blue-600 text-white font-bold text-xl mb-4">
                BlockDAG
              </div>
              <div className="text-5xl font-extrabold text-gray-900 mb-3">15K+ TPS</div>
              <p className="text-gray-700 text-lg">High throughput and low cost make BlockDAG ideal for publishing proofs at scale</p>
            </div>

            <div className="flex-1">
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-200">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">✓</div>
                  <div>
                    <div className="text-gray-900 font-semibold">Massive throughput</div>
                    <div className="text-gray-600 text-sm">High-performance finality for proofs</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-200">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-600 flex items-center justify-center text-white font-bold text-lg">✓</div>
                  <div>
                    <div className="text-gray-900 font-semibold">Low cost proofs</div>
                    <div className="text-gray-600 text-sm">Economical for high-volume ML workflows</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-200">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold text-lg">✓</div>
                  <div>
                    <div className="text-gray-900 font-semibold">Censorship resistant</div>
                    <div className="text-gray-600 text-sm">Decentralized integrity guarantees</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
