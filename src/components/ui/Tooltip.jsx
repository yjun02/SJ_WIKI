import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { AnimatePresence, motion } from 'framer-motion';

export function Tooltip({ text, content, children }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span 
      className="relative inline-block border-b border-dashed border-mint cursor-help group"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="text-mint font-medium">{text || children}</span>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-navy-lighter border border-slate-700 rounded-lg shadow-xl text-sm text-slate-300 z-50 pointer-events-none"
          >
            {content}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-navy-lighter" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
