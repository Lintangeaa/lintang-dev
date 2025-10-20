"use client";

import { useEffect, useRef, useState } from "react";
import { FaHome, FaUser, FaCode, FaProjectDiagram, FaShoppingCart } from "react-icons/fa";

interface NavItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const navItems: NavItem[] = [
  { href: "#home", icon: FaHome, label: "Home" },
  { href: "#about", icon: FaUser, label: "About" },
  { href: "#skills", icon: FaCode, label: "Skills" },
  { href: "#projects", icon: FaProjectDiagram, label: "Projects" },
  { href: "/catalog", icon: FaShoppingCart, label: "Catalog" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [pathname, setPathname] = useState("/");
  const navRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Observe sections to update active link
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
    const sections = navItems
      .map((n) => document.getElementById(n.href.slice(1)))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close on outside click and ESC
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!isOpen) return;
      const t = e.target as Node;
      if (
        navRef.current && !navRef.current.contains(t) &&
        toggleRef.current && !toggleRef.current.contains(t)
      ) {
        setIsOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("mousedown", onDocClick);
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("mousedown", onDocClick);
      window.removeEventListener("keydown", onEsc);
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
        setActiveSection(targetId);
        setIsOpen(false);
      }
    } else {
      if (typeof window !== "undefined") {
        window.location.assign(href);
      }
    }
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        ref={toggleRef}
        onClick={() => setIsOpen((v) => !v)}
        className="fixed right-4 bottom-24 z-50 md:hidden w-12 h-12 rounded-full bg-emerald-500 text-white shadow-lg"
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      {/* Sidebar nav */}
      <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-40">
        <div
          ref={navRef}
          className={`
            flex flex-col items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-4
            rounded-l-xl border-l-2 border-emerald-500 shadow-xl transition-all duration-300
            ${isOpen ? 'translate-x-0' : 'translate-x-24 md:translate-x-0'}
            md:translate-x-0
          `}
        >
          {navItems.map(({ href, icon: Icon, label }) => {
            const isSection = href.startsWith("#");
            const isActive = isSection ? activeSection === href.slice(1) : pathname.startsWith("/catalog");
            return (
              <button
                key={href}
                onClick={() => handleNavClick(href)}
                className={`
                  relative flex items-center gap-3 p-2 rounded-lg transition-all duration-300 w-full
                  ${isActive ? 'bg-emerald-500 text-white' : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50'}
                `}
                aria-label={label}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="hidden md:inline text-sm font-medium whitespace-nowrap">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
