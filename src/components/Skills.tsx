"use client";

import { useState } from "react";
import { FaBrain, FaCode, FaTools } from "react-icons/fa";

interface Skill {
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: string[];
  color: string;
  bgColor: string;
}

const skillsData: Skill[] = [
  {
    category: "AI & Chatbot Development",
    icon: FaBrain,
    skills: ["Natural Language Processing", "Conversational AI", "Chatbot Architecture"],
    color: "text-purple-400",
    bgColor: "bg-purple-500/10 border-purple-500/20 hover:border-purple-400/50"
  },
  {
    category: "Web Development",
    icon: FaCode,
    skills: ["Frontend Design", "Backend Development", "Full-Stack Solutions"],
    color: "text-blue-400",
    bgColor: "bg-blue-500/10 border-blue-500/20 hover:border-blue-400/50"
  },
  {
    category: "Tools & Technologies",
    icon: FaTools,
    skills: ["Python", "JavaScript", "Docker"],
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-400/50"
  }
];

export default function Skills() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="skills" className="py-20 bg-slate-900/50">
      <div className="w-full max-w-6xl mx-auto px-6">
        {/* Section title */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-400 mb-4 relative inline-block">
            Skills
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-transparent rounded-full" />
          </h2>
        </div>
        
        {/* Skills grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillsData.map((skill, index) => {
            const Icon = skill.icon;
            const isHovered = hoveredCard === index;
            
            return (
              <div
                key={skill.category}
                className={`
                  relative group rounded-xl border backdrop-blur-sm p-6 
                  transition-all duration-500 transform hover:scale-105
                  ${skill.bgColor}
                  ${isHovered ? 'shadow-2xl' : 'shadow-lg'}
                `}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Icon and title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-lg ${skill.color} bg-slate-800/50`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className={`font-semibold text-lg ${skill.color}`}>
                      {skill.category}
                    </h3>
                  </div>
                  
                  {/* Skills list */}
                  <ul className="space-y-3">
                    {skill.skills.map((skillItem, skillIndex) => (
                      <li
                        key={skillItem}
                        className={`
                          flex items-center gap-3 text-slate-300 transition-all duration-300
                          ${isHovered ? 'translate-x-2' : ''}
                        `}
                        style={{
                          transitionDelay: isHovered ? `${skillIndex * 100}ms` : '0ms'
                        }}
                      >
                        <div className={`w-2 h-2 rounded-full ${skill.color.replace('text-', 'bg-')}`} />
                        <span className="text-sm font-medium">{skillItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
