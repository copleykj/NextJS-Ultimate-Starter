import React from 'react';

export default function Page ({ children }: { children: React.ReactNode | null }) {
  return (
    <div className="min-h-screen flex flex-col">
      {children}
    </div >
  );
};
