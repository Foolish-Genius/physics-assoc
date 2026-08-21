import { ArticleCard } from '@/components';
import { featuredArticles } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* ── Hero / About ── */}
      <section 
        className="pt-16 pb-24 border-b" 
        style={{ background: 'transparent', borderColor: 'var(--border)' }}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          
          <div className="mb-6">
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-accent">
              About
            </span>
          </div>

          <div className="max-w-4xl">
            <h1 
              className="text-[4rem] md:text-[6.5rem] text-text leading-[1.05] tracking-tight font-medium" 
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Promoting the beautiful language of <span className="text-accent italic font-light">physics</span>
            </h1>
          </div>
          
        </div>
      </section>

      {/* ── Mission ── */}
      <section 
        style={{ background: 'var(--bg-surface)' }} 
        className="py-24"
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          
          <div className="grid md:grid-cols-2 gap-16 items-start">
            
            {/* Left: Text Content */}
            <div className="flex flex-col">
              
              <div className="flex items-center gap-4 mb-10">
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-accent">
                  Mission
                </span>
                <div className="flex-1 h-px bg-border max-w-xs" />
              </div>
              
              <div className="space-y-8 text-[1.1rem] text-text-dim leading-[1.8] max-w-xl">
                <p>
                  We are a bunch of passionate nerds trying to promote the beautiful language 
                  of physics in all of its true glory. Our mission is to bridge the gap between 
                  complex physics concepts and everyday understanding.
                </p>
                <p>
                  Based at BITS Pilani, we provide quality content through our blog, engaging 
                  Instagram posts, and interactive events that explain fascinating physics 
                  phenomena in an accessible way.
                </p>
                <p>
                  Whether you're interested in quantum computing, cosmology, particle 
                  physics, or any other field — we have something for you.
                </p>
              </div>

              <div className="mt-12">
                <Link 
                  href="/about" 
                  className="text-sm font-semibold uppercase tracking-[0.15em] text-text hover:text-accent transition-colors"
                >
                  Learn More ➔
                </Link>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative w-full h-[600px]">
              <Image
                src="https://raw.githubusercontent.com/bitsphyassoc/bitsphyassoc.github.io/main/assets/images/feature-image.jpg"
                alt="Einstein figure"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Articles ── */}
      <section 
        className="py-24 border-t" 
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-16">
            <div className="flex items-center gap-4">
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-accent">
                Latest
              </span>
              <div className="w-12 h-px bg-border" />
              <h2 
                className="text-3xl text-text font-medium" 
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Featured Articles
              </h2>
            </div>
            
            <Link
              href="/blog"
              className="text-sm font-semibold uppercase tracking-[0.15em] text-text hover:text-accent transition-colors"
            >
              All Articles ➔
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
