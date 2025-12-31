"use client";

import React from "react";

export default function DashboardPreview() {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-6">
          See QUANTAID in Action
        </h2>
        
        <p className="text-lg sm:text-xl text-gray-700 max-w-4xl mx-auto text-center leading-relaxed mb-12">
          Upload your dataset, encrypt it client-side, and watch your proof appear in the dashboard. Everything is designed to be simple, fast, and secure.
        </p>

        {/* Preview Panel */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-xl max-w-5xl mx-auto">
          
          {/* Workflow Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                1
              </div>
              <h3 className="text-gray-900 font-semibold mb-2">Upload Dataset</h3>
              <p className="text-gray-600 text-sm">Drag & drop your AI training data</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                2
              </div>
              <h3 className="text-gray-900 font-semibold mb-2">Encrypt & Generate Proof</h3>
              <p className="text-gray-600 text-sm">Kyber-1024 encryption in browser</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                3
              </div>
              <h3 className="text-gray-900 font-semibold mb-2">Verify on BlockDAG</h3>
              <p className="text-gray-600 text-sm">Immutable proof in seconds</p>
            </div>
          </div>

          {/* Mock Dashboard Preview */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-gray-900 font-semibold text-lg">Recent Proofs</h4>
              <span className="text-green-600 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                Live
              </span>
            </div>
            
            {/* Mock Proof Cards */}
            <div className="space-y-3">
              {[
                { name: "training_data_v1.csv", hash: "0x7f3a...", time: "2 mins ago", status: "Verified" },
                { name: "model_weights.pkl", hash: "0x9c21...", time: "15 mins ago", status: "Verified" },
                { name: "validation_set.json", hash: "0x4e8b...", time: "1 hour ago", status: "Verified" }
              ].map((proof, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-gray-900 font-medium text-sm mb-1">{proof.name}</div>
                      <div className="text-gray-600 text-xs flex items-center gap-3">
                        <span>Hash: {proof.hash}</span>
                        <span>•</span>
                        <span>{proof.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-green-600 text-xs font-semibold px-3 py-1 rounded-full bg-green-50 border border-green-200">
                        {proof.status}
                      </span>
                      <button className="text-blue-600 hover:text-blue-700 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        View →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Toast Notification Animation */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4 animate-slide-in-bottom shadow-md">
              <div className="flex items-center gap-3">
                <div className="text-2xl">✓</div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Proof successfully generated!</div>
                  <div className="text-gray-700 text-xs">Your dataset is now quantum-secure on BlockDAG</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
