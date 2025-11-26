import { Star } from "lucide-react";
import { Link, useLocation } from "wouter";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-yellow-50/20 font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#004494] text-white shadow-sm">
              <Star className="h-4 w-4 text-[#FFD617] fill-[#FFD617]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#004494]">
              EU Funding Finder
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/" className={`hover:text-[#004494] transition-colors ${location === '/' ? 'text-[#004494] font-semibold' : ''}`}>
              Start
            </Link>
            <Link href="/o-nas" className={`hover:text-[#004494] transition-colors ${location === '/o-nas' ? 'text-[#004494] font-semibold' : ''}`}>
              O nas
            </Link>
            <Link href="/kontakt" className={`hover:text-[#004494] transition-colors ${location === '/kontakt' ? 'text-[#004494] font-semibold' : ''}`}>
              Kontakt
            </Link>
          </nav>
        </div>
      </header>

      {children}

      {/* Footer */}
      <footer className="bg-slate-900 py-8 text-center text-slate-400">
        <div className="container mx-auto px-4">
          <p className="text-sm font-medium">
            © 2025 Imperador Solutions — powered by Imperador Solutions.
          </p>
          <p className="mt-2 text-xs opacity-50">
            Projekt finansowany ze środków Unii Europejskiej (symulacja)
          </p>
        </div>
      </footer>
    </div>
  );
}
