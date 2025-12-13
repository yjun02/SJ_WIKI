import React from 'react';
import { Sidebar } from './Sidebar';
import { TOC } from './TOC';

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-300 font-sans selection:bg-emerald-500/20 selection:text-emerald-400">
      <Sidebar />
      
      <main className="ml-0 md:ml-64 xl:mr-64 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
          {children}
        </div>
      </main>

      <TOC />
    </div>
  );
}
