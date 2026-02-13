"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "@/components/design-system";

export default function MobileCatalogPage() {
  const [platform, setPlatform] = useState<"android" | "crossplatform">("android");

  const selectPackage = (packageName: string, platformType: string) => {
    alert(`Terima kasih telah memilih paket ${packageName} (${platformType})!\n\nSilakan hubungi tim kami untuk melanjutkan diskusi dan konsultasi gratis.\n\n✨ Semua paket sudah termasuk server hosting 3 bulan!`);
  };

  const showPlatform = (selectedPlatform: "android" | "crossplatform") => {
    setPlatform(selectedPlatform);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 relative overflow-x-hidden">

      <div className="max-w-[1200px] mx-auto px-5 py-[60px] relative z-10">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/catalog">
            <Button variant="outline" leftIcon={<FaArrowLeft />}>
              Back to Catalog
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="-mx-5 md:-mx-10 mb-12">
          <div className="px-5 md:px-10 py-12 text-center bg-gradient-to-br from-slate-900 to-slate-800 text-white border-b-2 border-emerald-500 dark:border-emerald-400">
            <div className="text-4xl font-extrabold tracking-widest mb-2">SOULCODE</div>
            <div className="text-sm italic opacity-90 mb-6">Where Code Meet Soul</div>
            <div className="inline-block bg-emerald-500/20 dark:bg-emerald-400/20 border border-emerald-500 dark:border-emerald-400 text-emerald-400 dark:text-emerald-300 px-5 py-2 rounded-full text-sm font-semibold mb-5 tracking-wider">
              📱 PROFESSIONAL MOBILE DEVELOPMENT
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
              Pricelist Aplikasi Mobile
            </h1>
            <p className="text-lg text-slate-300 max-w-[700px] mx-auto mb-8 font-normal">
              Solusi lengkap pembuatan aplikasi mobile Android dan Cross-platform dengan teknologi terkini dan tim berpengalaman
            </p>
          
            {/* Platform Toggle */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => showPlatform("android")}
                className={`px-7 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  platform === "android"
                    ? "bg-emerald-500 dark:bg-emerald-400 text-white border-transparent shadow-lg"
                    : "bg-white/10 border border-white/20 text-slate-300 hover:bg-white/20 hover:border-white/30"
                }`}
              >
                🤖 Android Native
              </button>
              <button
                onClick={() => showPlatform("crossplatform")}
                className={`px-7 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  platform === "crossplatform"
                    ? "bg-emerald-500 dark:bg-emerald-400 text-white border-transparent shadow-lg"
                    : "bg-white/10 border border-white/20 text-slate-300 hover:bg-white/20 hover:border-white/30"
                }`}
              >
                🌐 Cross-Platform (iOS + Android)
              </button>
            </div>
          </div>
        </div>

        {/* Android Packages */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 mt-16 ${platform !== "android" ? "hidden" : ""}`}>
          {/* BASIC Package */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 relative overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-xl group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            
            <div className="w-16 h-16 rounded-lg bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center text-3xl mb-6">
              🟢
            </div>
            
            <h2 className="text-2xl font-bold mb-2 text-white dark:text-white">BASIC</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 font-mono">Lean MVP</p>
            <div className="text-3xl font-extrabold mb-2 text-white dark:text-white">
              15 - 30 Jt
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex items-center gap-2">
              <span className="w-5 h-5 inline-flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded-full text-xs">⏱️</span>
              <span>4–8 Minggu</span>
            </div>
            <div className="inline-block bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
              ✨ Termasuk Server 3 Bulan
            </div>
            
            <ul className="list-none mb-6 space-y-2">
              {[
                "Login & Authentication",
                "Database Integration",
                "Basic UI/UX Design",
                "Custom API Development",
                "Core Features Implementation",
              ].map((feature, idx) => (
                <li key={idx} className="py-2 text-slate-700 dark:text-slate-300 flex items-start gap-3 text-sm border-b border-slate-200 dark:border-slate-700 last:border-0 hover:text-slate-900 dark:hover:text-white hover:pl-2 transition-all duration-300">
                  <span className="text-emerald-500 dark:text-emerald-400 font-bold text-lg flex-shrink-0">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => selectPackage("BASIC", "Android")}
              className="w-full py-2 px-6 bg-slate-200 dark:bg-slate-700 border-2 border-emerald-500 dark:border-emerald-400 rounded-lg text-emerald-600 dark:text-emerald-400 text-sm font-semibold cursor-pointer transition-all duration-300 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:border-emerald-500 dark:hover:text-white hover:-translate-y-0.5 animate-glow-emerald"
            >
              Pilih Paket Ini →
            </button>
          </div>

          {/* STANDARD Package */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 relative overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-xl group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            
            <div className="w-16 h-16 rounded-lg bg-yellow-500/10 dark:bg-yellow-400/10 flex items-center justify-center text-3xl mb-6">
              🟡
            </div>
            
            <h2 className="text-2xl font-bold mb-2 text-white dark:text-white">STANDARD</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 font-mono">Complete Solution</p>
            <div className="text-3xl font-extrabold mb-2 text-white dark:text-white">
              40 - 80 Jt
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex items-center gap-2">
              <span className="w-5 h-5 inline-flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded-full text-xs">⏱️</span>
              <span>2–3 Bulan</span>
            </div>
            <div className="inline-block bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
              ✨ Termasuk Server 3 Bulan
            </div>
            
            <ul className="list-none mb-6 space-y-2">
              {[
                "Semua fitur BASIC",
                "Push Notification",
                "Advanced Backend Development",
                "Advanced UI/UX Design",
                "Payment Gateway Integration",
                "Third-party Integration",
              ].map((feature, idx) => (
                <li key={idx} className="py-2 text-slate-700 dark:text-slate-300 flex items-start gap-3 text-sm border-b border-slate-200 dark:border-slate-700 last:border-0 hover:text-slate-900 dark:hover:text-white hover:pl-2 transition-all duration-300">
                  <span className="text-yellow-500 dark:text-yellow-400 font-bold text-lg flex-shrink-0">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => selectPackage("STANDARD", "Android")}
              className="w-full py-2 px-6 bg-slate-200 dark:bg-slate-700 border-2 border-yellow-500 dark:border-yellow-400 rounded-lg text-yellow-600 dark:text-yellow-400 text-sm font-semibold cursor-pointer transition-all duration-300 hover:bg-yellow-500 hover:border-yellow-500 hover:text-white dark:hover:bg-yellow-500 dark:hover:border-yellow-500 dark:hover:text-white hover:-translate-y-0.5 animate-glow-yellow"
            >
              Pilih Paket Ini →
            </button>
          </div>

          {/* ADVANCED Package */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 relative overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-xl group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            
            <div className="w-16 h-16 rounded-lg bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center text-3xl mb-6">
              🔵
            </div>
            
            <h2 className="text-2xl font-bold mb-2 text-white dark:text-white">ADVANCED</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 font-mono">Enterprise Ready</p>
            <div className="text-3xl font-extrabold mb-2 text-white dark:text-white">
              100 - 200 Jt
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex items-center gap-2">
              <span className="w-5 h-5 inline-flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded-full text-xs">⏱️</span>
              <span>3–5 Bulan</span>
            </div>
            <div className="inline-block bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
              ✨ Termasuk Server 3 Bulan
            </div>
            
            <ul className="list-none mb-6 space-y-2">
              {[
                "Semua fitur STANDARD",
                "Real-time Features (Chat, Live Update)",
                "Admin Dashboard Web",
                "Multiple Third-party API Integration",
                "Analytics & Reporting",
                "Advanced Security Features",
              ].map((feature, idx) => (
                <li key={idx} className="py-2 text-slate-700 dark:text-slate-300 flex items-start gap-3 text-sm border-b border-slate-200 dark:border-slate-700 last:border-0 hover:text-slate-900 dark:hover:text-white hover:pl-2 transition-all duration-300">
                  <span className="text-blue-500 dark:text-blue-400 font-bold text-lg flex-shrink-0">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => selectPackage("ADVANCED", "Android")}
              className="w-full py-2 px-6 bg-slate-200 dark:bg-slate-700 border-2 border-blue-500 dark:border-blue-400 rounded-lg text-blue-600 dark:text-blue-400 text-sm font-semibold cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:border-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:border-blue-500 dark:hover:text-white hover:-translate-y-0.5 animate-glow-blue"
            >
              Pilih Paket Ini →
            </button>
          </div>
        </div>

        {/* Cross-Platform Packages */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 mt-16 ${platform !== "crossplatform" ? "hidden" : ""}`}>
          {/* BASIC Package */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 relative overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-xl group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            
            <div className="w-16 h-16 rounded-lg bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center text-3xl mb-6">
              🟢
            </div>
            
            <h2 className="text-2xl font-bold mb-2 text-white dark:text-white">
              BASIC <span className="inline-block bg-purple-500/10 dark:bg-purple-400/10 border border-purple-500 dark:border-purple-400 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-lg text-xs font-semibold ml-2">iOS + Android</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 font-mono">Lean MVP</p>
            <div className="text-3xl font-extrabold mb-2 text-white dark:text-white">
              25 - 45 Jt
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex items-center gap-2">
              <span className="w-5 h-5 inline-flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded-full text-xs">⏱️</span>
              <span>6–10 Minggu</span>
            </div>
            <div className="inline-block bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 ">
              ✨ Termasuk Server 3 Bulan
            </div>
            
            <ul className="list-none mb-6 space-y-2">
              {[
                "Login & Authentication",
                "Database Integration",
                "Basic UI/UX Design",
                "Custom API Development",
                "Core Features Implementation",
                "Deploy ke App Store & Play Store",
              ].map((feature, idx) => (
                <li key={idx} className="py-2 text-slate-700 dark:text-slate-300 flex items-start gap-3 text-sm border-b border-slate-200 dark:border-slate-700 last:border-0 hover:text-slate-900 dark:hover:text-white hover:pl-2 transition-all duration-300">
                  <span className="text-emerald-500 dark:text-emerald-400 font-bold text-lg flex-shrink-0">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => selectPackage("BASIC", "Cross-Platform")}
              className="w-full py-2 px-6 bg-slate-200 dark:bg-slate-700 border-2 border-emerald-500 dark:border-emerald-400 rounded-lg text-emerald-600 dark:text-emerald-400 text-sm font-semibold cursor-pointer transition-all duration-300 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:border-emerald-500 dark:hover:text-white hover:-translate-y-0.5 animate-glow-emerald"
            >
              Pilih Paket Ini →
            </button>
          </div>

          {/* STANDARD Package */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 relative overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-xl group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            
            <div className="w-16 h-16 rounded-lg bg-yellow-500/10 dark:bg-yellow-400/10 flex items-center justify-center text-3xl mb-6">
              🟡
            </div>
            
            <h2 className="text-2xl font-bold mb-2 text-white dark:text-white">
              STANDARD <span className="inline-block bg-purple-500/10 dark:bg-purple-400/10 border border-purple-500 dark:border-purple-400 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-lg text-xs font-semibold ml-2">iOS + Android</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 font-mono">Complete Solution</p>
            <div className="text-3xl font-extrabold mb-2 text-white dark:text-white">
              60 - 120 Jt
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex items-center gap-2">
              <span className="w-5 h-5 inline-flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded-full text-xs">⏱️</span>
              <span>2.5–4 Bulan</span>
            </div>
            <div className="inline-block bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 ">
              ✨ Termasuk Server 3 Bulan
            </div>
            
            <ul className="list-none mb-6 space-y-2">
              {[
                "Semua fitur BASIC",
                "Push Notification (iOS & Android)",
                "Advanced Backend Development",
                "Advanced UI/UX Design",
                "Payment Gateway Integration",
                "Third-party Integration",
                "Deploy ke App Store & Play Store",
              ].map((feature, idx) => (
                <li key={idx} className="py-2 text-slate-700 dark:text-slate-300 flex items-start gap-3 text-sm border-b border-slate-200 dark:border-slate-700 last:border-0 hover:text-slate-900 dark:hover:text-white hover:pl-2 transition-all duration-300">
                  <span className="text-yellow-500 dark:text-yellow-400 font-bold text-lg flex-shrink-0">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => selectPackage("STANDARD", "Cross-Platform")}
              className="w-full py-2 px-6 bg-slate-200 dark:bg-slate-700 border-2 border-yellow-500 dark:border-yellow-400 rounded-lg text-yellow-600 dark:text-yellow-400 text-sm font-semibold cursor-pointer transition-all duration-300 hover:bg-yellow-500 hover:border-yellow-500 hover:text-white dark:hover:bg-yellow-500 dark:hover:border-yellow-500 dark:hover:text-white hover:-translate-y-0.5 animate-glow-yellow"
            >
              Pilih Paket Ini →
            </button>
          </div>

          {/* ADVANCED Package */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 relative overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-xl group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            
            <div className="w-16 h-16 rounded-lg bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center text-3xl mb-6">
              🔵
            </div>
            
            <h2 className="text-2xl font-bold mb-2 text-white dark:text-white">
              ADVANCED <span className="inline-block bg-purple-500/10 dark:bg-purple-400/10 border border-purple-500 dark:border-purple-400 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-lg text-xs font-semibold ml-2">iOS + Android</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 font-mono">Enterprise Ready</p>
            <div className="text-3xl font-extrabold mb-2 text-white dark:text-white">
              150 - 300 Jt
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex items-center gap-2">
              <span className="w-5 h-5 inline-flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded-full text-xs">⏱️</span>
              <span>4–6 Bulan</span>
            </div>
            <div className="inline-block bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 ">
              ✨ Termasuk Server 3 Bulan
            </div>
            
            <ul className="list-none mb-6 space-y-2">
              {[
                "Semua fitur STANDARD",
                "Real-time Features (Chat, Live Update)",
                "Admin Dashboard Web",
                "Multiple Third-party API Integration",
                "Analytics & Reporting",
                "Advanced Security Features",
                "Deploy ke App Store & Play Store",
              ].map((feature, idx) => (
                <li key={idx} className="py-2 text-slate-700 dark:text-slate-300 flex items-start gap-3 text-sm border-b border-slate-200 dark:border-slate-700 last:border-0 hover:text-slate-900 dark:hover:text-white hover:pl-2 transition-all duration-300">
                  <span className="text-blue-500 dark:text-blue-400 font-bold text-lg flex-shrink-0">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => selectPackage("ADVANCED", "Cross-Platform")}
              className="w-full py-2 px-6 bg-slate-200 dark:bg-slate-700 border-2 border-blue-500 dark:border-blue-400 rounded-lg text-blue-600 dark:text-blue-400 text-sm font-semibold cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:border-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:border-blue-500 dark:hover:text-white hover:-translate-y-0.5 animate-glow-blue"
            >
              Pilih Paket Ini →
            </button>
          </div>

          {/* PREMIUM Package */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 relative overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-xl group md:col-span-2 lg:col-span-1">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            
            <div className="w-16 h-16 rounded-lg bg-purple-500/10 dark:bg-purple-400/10 flex items-center justify-center text-3xl mb-6">
              💎
            </div>
            
            <h2 className="text-2xl font-bold mb-2 text-white dark:text-white">
              PREMIUM <span className="inline-block bg-purple-500/10 dark:bg-purple-400/10 border border-purple-500 dark:border-purple-400 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-lg text-xs font-semibold ml-2">iOS + Android</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 font-mono">Full-Scale Enterprise</p>
            <div className="text-3xl font-extrabold mb-2 text-white dark:text-white">
              350 Jt+
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex items-center gap-2">
              <span className="w-5 h-5 inline-flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded-full text-xs">⏱️</span>
              <span>6+ Bulan</span>
            </div>
            <div className="inline-block bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 ">
              ✨ Termasuk Server 3 Bulan
            </div>
            
            <ul className="list-none mb-6 space-y-2">
              {[
                "Semua fitur ADVANCED",
                "Advanced Security & Encryption",
                "Microservices Architecture",
                "AI/ML Integration",
                "Custom Animation & Transitions",
                "Scalable Infrastructure",
                "Dedicated Team & Support",
              ].map((feature, idx) => (
                <li key={idx} className="py-2 text-slate-700 dark:text-slate-300 flex items-start gap-3 text-sm border-b border-slate-200 dark:border-slate-700 last:border-0 hover:text-slate-900 dark:hover:text-white hover:pl-2 transition-all duration-300">
                  <span className="text-purple-500 dark:text-purple-400 font-bold text-lg flex-shrink-0">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => selectPackage("PREMIUM", "Cross-Platform")}
              className="w-full py-2 px-6 bg-slate-200 dark:bg-slate-700 border-2 border-purple-500 dark:border-purple-400 rounded-lg text-purple-600 dark:text-purple-400 text-sm font-semibold cursor-pointer transition-all duration-300 hover:bg-purple-500 hover:border-purple-500 hover:text-white dark:hover:bg-purple-500 dark:hover:border-purple-500 dark:hover:text-white hover:-translate-y-0.5 animate-glow-purple"
            >
              Pilih Paket Ini →
            </button>
          </div>
        </div>

        {/* Info Section */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-8 mt-16 border border-slate-200 dark:border-slate-700 shadow-lg animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-center text-2xl font-bold mb-3 text-white dark:text-white">Yang Anda Dapatkan</h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Setiap paket dirancang untuk memberikan nilai maksimal</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[
              { icon: "🛡️", title: "Garansi 30 Hari", desc: "Bug fixing gratis selama 30 hari setelah launching aplikasi" },
              { icon: "🚀", title: "Deployment Lengkap", desc: "Testing menyeluruh dan deployment ke Google Play Store (dan App Store untuk cross-platform)" },
              { icon: "💬", title: "Konsultasi Gratis", desc: "Diskusi kebutuhan proyek dan ide aplikasi tanpa biaya tambahan" },
              { icon: "🖥️", title: "Server 3 Bulan", desc: "Hosting dan maintenance server included dalam semua paket" },
              { icon: "📱", title: "Source Code", desc: "Full source code diberikan setelah project selesai" },
              { icon: "🎨", title: "UI/UX Design", desc: "Desain modern dan user-friendly disesuaikan dengan brand Anda" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center text-2xl flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white dark:text-white">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-16 pt-8 border-t border-slate-200 dark:border-slate-700 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <div className="text-2xl font-bold mb-4 text-white dark:text-white">
            Siap Mulai Proyek Anda?
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Hubungi kami untuk konsultasi dan diskusi kebutuhan aplikasi mobile Anda
          </p>
        </footer>
      </div>
    </div>
  );
}

