import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleCardProps {
  title: string;
  description: string;
  author: string;
  image: string;
  url: string;
}

export default function ArticleCard({
  title,
  description,
  author,
  image,
  url,
}: ArticleCardProps) {
  return (
    <article className="bg-prussian/30 backdrop-blur-sm rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300 border border-prussian">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <Link href={url} target="_blank" rel="noopener noreferrer">
          <h3 className="text-xl font-bold text-white hover:text-orange transition-colors mb-3">
            {title}
          </h3>
        </Link>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{description}</p>

        <div className="flex justify-between items-center">
          <span className="text-orange font-semibold text-sm">{author}</span>
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange hover:text-orange/80 transition-colors font-semibold"
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
}
