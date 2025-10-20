export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-slate-900 border-t border-slate-800">
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className="text-center">
          <p className="text-slate-400">
            © {currentYear} Lintang Dandung Prakoso. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
