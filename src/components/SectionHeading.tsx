import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  link?: {
    text: string;
    href: string;
  };
}

export default function SectionHeading({
  title,
  subtitle,
  link,
}: SectionHeadingProps) {
  return (
    <div className="border-b border-gray-700 pb-6 mb-12">
      <h2 className="text-4xl font-bold text-white mb-2">{title}</h2>
      {subtitle && <p className="text-gray-400 text-lg">{subtitle}</p>}
      {link && (
        <a
          href={link.href}
          className="text-accent hover:text-red-600 transition-colors font-semibold mt-4 inline-block"
        >
          {link.text} →
        </a>
      )}
    </div>
  );
}
