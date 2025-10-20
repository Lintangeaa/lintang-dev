"use client";

import { useEffect, useState } from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Lintang Dandung Prakoso";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/lintangdandungprakoso25/",
      icon: FaLinkedinIn,
      label: "LinkedIn",
      color: "hover:text-blue-400"
    },
    {
      href: "https://github.com/Lintangeaa",
      icon: FaGithub,
      label: "GitHub",
      color: "hover:text-gray-400"
    }
  ];

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)] animate-pulse" />
      </div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16">
        <div className="space-y-6">
          {/* Typing animation title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
            {displayText}
            <span className="animate-pulse text-emerald-400">|</span>
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-xl md:text-2xl lg:text-3xl text-emerald-400 font-semibold">
            Backend Developer & AI Engineer
          </h2>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Building innovative technology solutions with expertise in{" "}
            <span className="text-emerald-400 font-semibold">Backend Development</span> and{" "}
            <span className="text-emerald-400 font-semibold">Artificial Intelligence</span>.
          </p>
          
          {/* Social links */}
          <div className="flex items-center gap-6 pt-4">
            {socialLinks.map(({ href, icon: Icon, label, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  p-3 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700
                  text-slate-300 ${color} transition-all duration-300
                  hover:scale-110 hover:bg-slate-700/50 hover:border-emerald-400
                  focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900
                `}
                aria-label={label}
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <a
              href="#projects"
              className="
                inline-flex items-center justify-center px-8 py-4 
                bg-emerald-500 hover:bg-emerald-600 
                text-white font-semibold rounded-lg
                transition-all duration-300 transform hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900
                shadow-lg hover:shadow-emerald-500/25
              "
            >
              View Projects
            </a>
            <a
              href="#about"
              className="
                inline-flex items-center justify-center px-8 py-4
                border-2 border-emerald-400 text-emerald-400 
                hover:bg-emerald-400/10 font-semibold rounded-lg
                transition-all duration-300 transform hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900
              "
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
