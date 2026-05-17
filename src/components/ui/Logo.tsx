import React from 'react';

export const Logo = ({ className = "h-8" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center border border-white/20 shrink-0">
        <span className="text-xl font-bold text-white">VP</span>
      </div>
      <span className="text-xl font-black tracking-tighter uppercase text-white hidden md:block">
        VRAI <span className="text-primary">PATRIOTE</span>
      </span>
    </div>
  );
};
