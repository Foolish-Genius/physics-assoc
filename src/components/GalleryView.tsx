import React from 'react';
import Image from 'next/image';

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: '1000124987',
    src: '/images/gallery/1000124987.jpg',
    alt: 'Physics Association team preparing dry ice experiment',
    width: 1280,
    height: 855,
  },
  {
    id: '1000124985',
    src: '/images/gallery/1000124985.jpg',
    alt: 'Cloud chamber assembly and preparation',
    width: 855,
    height: 1280,
  },
  {
    id: 'IMG_20260930_110342_533',
    src: '/images/gallery/IMG_20260930_110342_533.jpg',
    alt: 'Oscilloscope showing waveform curve',
    width: 1280,
    height: 855,
  },
  {
    id: '1000124986',
    src: '/images/gallery/1000124986.jpg',
    alt: 'Students observing cloud chamber particle tracks',
    width: 855,
    height: 1280,
  },
  {
    id: '1000124979',
    src: '/images/gallery/1000124979.jpg',
    alt: 'Laser optics interferometry setup',
    width: 1280,
    height: 855,
  },
  {
    id: 'IMG_20260930_110341_014',
    src: '/images/gallery/IMG_20260930_110341_014.jpg',
    alt: 'Dual trace oscilloscope on the lab workbench',
    width: 855,
    height: 1280,
  },
  {
    id: '1000124984',
    src: '/images/gallery/1000124984.jpg',
    alt: 'Students collaborating on electronics hardware',
    width: 1280,
    height: 855,
  },
  {
    id: '1000124981',
    src: '/images/gallery/1000124981.jpg',
    alt: 'Vertical view of precision laser apparatus',
    width: 855,
    height: 1280,
  },
  {
    id: '1000124982',
    src: '/images/gallery/1000124982.jpg',
    alt: 'Electronics circuit wiring and transmitter setup',
    width: 1280,
    height: 855,
  },
  {
    id: '1000124983',
    src: '/images/gallery/1000124983.jpg',
    alt: 'Remote controller transmitter and testing circuits',
    width: 855,
    height: 1280,
  },
  {
    id: '1000124980',
    src: '/images/gallery/1000124980.jpg',
    alt: 'Laser apparatus bench overview',
    width: 1280,
    height: 855,
  },
];

export default function GalleryView() {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
      {GALLERY_PHOTOS.map((photo) => (
        <div
          key={photo.id}
          className="break-inside-avoid mb-6 border bg-bg-surface overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-lg group"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="relative overflow-hidden bg-black/5">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
