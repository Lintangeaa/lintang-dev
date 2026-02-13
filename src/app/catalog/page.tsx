"use client";

import Link from "next/link";
import { FaArrowLeft, FaGlobe, FaMobileAlt } from "react-icons/fa";
import { Button } from "@/components/design-system";

export default function CatalogSelectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        {/* Back */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" leftIcon={<FaArrowLeft />}>
              Back to Portfolio
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-16 mt-12">
          <div className="inline-block bg-emerald-500/10 border border-emerald-500 text-emerald-400 px-5 py-2 rounded-full text-sm font-semibold mb-6 tracking-wider">
            📦 KATALOG LAYANAN
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-white via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Pilih Layanan Anda
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Pilih jenis layanan yang sesuai dengan kebutuhan bisnis Anda
          </p>
        </div>

        {/* Catalog Options Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Website Company Profile */}
          <Link href="/catalog/website" className="group">
            <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-emerald-500 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaGlobe className="text-4xl text-emerald-400" />
                </div>
                
                <h2 className="text-2xl font-bold mb-3 text-white">Website Company Profile</h2>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Paket pembuatan website professional untuk company profile dengan berbagai fitur lengkap dan modern
                </p>
                
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300">Responsive Design</span>
                  <span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300">SEO Optimized</span>
                  <span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300">Hosting Included</span>
                </div>
                
                <div className="text-emerald-400 font-semibold group-hover:text-emerald-300 transition-colors">
                  Lihat Paket →
                </div>
              </div>
            </div>
          </Link>

          {/* Mobile Application */}
          <Link href="/catalog/mobile" className="group">
            <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-purple-500 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaMobileAlt className="text-4xl text-purple-400" />
                </div>
                
                <h2 className="text-2xl font-bold mb-3 text-white">Mobile Application</h2>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Pricelist aplikasi mobile Android dan Cross-platform dengan teknologi terkini dan tim berpengalaman
                </p>
                
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300">Android Native</span>
                  <span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300">Cross-Platform</span>
                  <span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300">Server Included</span>
                </div>
                
                <div className="text-purple-400 font-semibold group-hover:text-purple-300 transition-colors">
                  Lihat Paket →
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-16 text-slate-400">
          <p>Butuh konsultasi? Hubungi kami untuk diskusi lebih lanjut</p>
        </div>
      </div>
    </div>
  );
}
