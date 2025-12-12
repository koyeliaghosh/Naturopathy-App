import React from 'react';
import { Leaf } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900">
      <header className="bg-emerald-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-white p-2 rounded-full text-emerald-600">
              <Leaf size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight">{title}</h1>
              <p className="text-emerald-100 text-xs hidden sm:block">{subtitle}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-6 sm:py-8">
        {children}
      </main>

      <footer className="bg-slate-800 text-slate-400 py-6 text-center text-sm">
        <div className="max-w-4xl mx-auto px-4">
          <p>© {new Date().getFullYear()} Naturopathy Access. Powered by Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
};
