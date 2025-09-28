import React from 'react';

export const Section = ({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`py-12 md:py-20 ${className}`}>{children}</section>
);

export const Container = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);
