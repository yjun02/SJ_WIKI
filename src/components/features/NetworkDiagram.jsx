import React from 'react';
import { Card } from '../ui/Card';

export function NetworkDiagram({ src, alt }) {
  // If we had real diagram images, we would use src. 
  // For now, we create a placeholder card if src is missing or specific placeholders.
  
  return (
    <Card className="my-6 border-dashed border-2 border-slate-700 bg-navy/50 flex flex-col items-center justify-center p-8 hover:border-mint transition-colors group">
      <div className="w-16 h-16 bg-navy-lighter rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <img src={src} alt={alt} className="max-w-full max-h-full p-2 opacity-80" onError={(e) => {e.target.style.display='none'}} /> 
        {/* Fallback icon if image fails or is abstract */}
        <span className="text-2xl">📊</span> 
      </div>
      <p className="text-slate-400 font-medium">{alt || "Network Diagram"}</p>
      <p className="text-xs text-slate-500 mt-2">Interactive Diagram Placeholder</p>
    </Card>
  );
}
