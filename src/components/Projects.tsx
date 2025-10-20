"use client";

import { FaRocket, FaClock } from "react-icons/fa";

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-slate-800/50">
      <div className="w-full max-w-6xl mx-auto px-6">
        {/* Section title */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-400 mb-4 relative inline-block">
            Projects
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-transparent rounded-full" />
          </h2>
        </div>
        
        {/* Coming soon card */}
        <div className="max-w-2xl mx-auto">
          <div className="relative group">
            {/* Animated background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
            
            <div className="relative bg-slate-900 rounded-2xl p-12 text-center border border-slate-700">
              {/* Icon */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-400 rounded-full blur-xl opacity-50 animate-pulse" />
                  <div className="relative bg-emerald-500 p-6 rounded-full">
                    <FaRocket className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-2xl md:text-3xl font-bold text-emerald-400 mb-4">
                Amazing Projects Coming Soon!
              </h3>
              
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                I'm currently working on some exciting projects that showcase my skills in 
                backend development and AI engineering. Stay tuned for updates!
              </p>
              
              {/* Status indicator */}
              <div className="inline-flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm rounded-full px-6 py-3 border border-slate-600">
                <FaClock className="w-4 h-4 text-yellow-400 animate-spin" />
                <span className="text-yellow-400 font-medium">Currently under development</span>
              </div>
              
              {/* Progress indicators */}
              <div className="mt-8 space-y-3">
                <div className="text-left">
                  <div className="flex justify-between text-sm text-slate-400 mb-1">
                    <span>Backend API Development</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-400 to-blue-500 h-2 rounded-full w-3/4 animate-pulse" />
                  </div>
                </div>
                
                <div className="text-left">
                  <div className="flex justify-between text-sm text-slate-400 mb-1">
                    <span>AI Integration</span>
                    <span>60%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full w-3/5 animate-pulse" />
                  </div>
                </div>
                
                <div className="text-left">
                  <div className="flex justify-between text-sm text-slate-400 mb-1">
                    <span>Frontend Interface</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full w-2/5 animate-pulse" />
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
