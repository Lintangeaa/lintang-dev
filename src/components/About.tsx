import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-20 bg-slate-800/50">
      <div className="w-full max-w-6xl mx-auto px-6">
        {/* Section title */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-400 mb-4 relative inline-block">
            About Me
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-transparent rounded-full" />
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Profile image */}
          <div className="lg:col-span-1 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
              <div className="relative">
                <Image
                  src="/images/lintang.webp"
                  alt="Lintang Dandung Prakoso"
                  width={300}
                  height={300}
                  className="rounded-2xl object-cover shadow-2xl transform transition duration-500 group-hover:scale-105"
                  priority
                />
              </div>
            </div>
          </div>
          
          {/* About content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-slate-300 leading-relaxed text-lg">
                I am a dedicated <span className="text-emerald-400 font-semibold">Backend Developer</span> and{" "}
                <span className="text-emerald-400 font-semibold">AI Engineer</span> focused on creating efficient 
                and innovative technology solutions.
              </p>
              
              <p className="text-slate-400 leading-relaxed">
                With a passion for cutting-edge technology, I specialize in building robust backend systems 
                and implementing artificial intelligence solutions that solve real-world problems. My expertise 
                spans across modern development frameworks, cloud technologies, and machine learning algorithms.
              </p>
            </div>
            
            {/* Key highlights */}
            <div className="grid sm:grid-cols-2 gap-6 pt-6">
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-emerald-400/50 transition-colors duration-300">
                <h3 className="text-emerald-400 font-semibold mb-2">Experience</h3>
                <p className="text-slate-300 text-sm">
                  Specialized in backend development and AI implementation
                </p>
              </div>
              
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-emerald-400/50 transition-colors duration-300">
                <h3 className="text-emerald-400 font-semibold mb-2">Focus</h3>
                <p className="text-slate-300 text-sm">
                  Building scalable solutions with modern technologies
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
