import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About Us - Physics Association | BITS Pilani',
};

export default function About() {
  const values = [
    { num: '01', title: 'Innovation', text: 'Pushing the boundaries of physics education through modern content and engaging discussions.' },
    { num: '02', title: 'Community', text: 'Building a vibrant community of physics enthusiasts at BITS Pilani.' },
    { num: '03', title: 'Excellence', text: 'Striving for the highest quality in our articles, events, and interactions.' },
    { num: '04', title: 'Accessibility', text: 'Making complex physics concepts accessible to everyone, regardless of background.' },
  ];

  const offerings = [
    { title: 'Blog Articles', text: 'In-depth articles covering quantum mechanics to cosmology.', link: '/blog', linkLabel: 'Read Articles', color: 'var(--accent)' },
    { title: 'Social Content', text: 'Engaging Instagram posts about fascinating physics phenomena.', link: 'https://www.instagram.com/bits_phyassoc/', linkLabel: 'Follow Us', external: true, color: 'var(--accent2)' },
    { title: 'Events & Talks', text: 'Seminars and interactive sessions with experts in physics.', link: '/', linkLabel: 'Learn More', color: 'var(--accent3)' },
  ];

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden flex items-center" style={{ minHeight: '40vh', background: 'transparent' }}>
        <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 w-full">
          <div className="mb-6"><span className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-accent">About Us</span></div>
          <h1 className="text-4xl md:text-6xl text-text leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
            Promoting the beautiful language of <span className="text-accent italic font-light">physics</span>
          </h1>
        </div>
      </section>

      <section className="py-24 border-t" style={{ background: 'var(--bg-raised)', borderColor: 'var(--border)' }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative h-[600px] w-full"><Image src="https://raw.githubusercontent.com/bitsphyassoc/bitsphyassoc.github.io/main/assets/images/feature-image.jpg" alt="Physics Association Team" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" /></div>
            <div className="order-1 md:order-2 flex flex-col">
              <div className="flex items-center gap-4 mb-10"><span className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-accent">Our Mission</span><div className="flex-1 h-px bg-border max-w-xs" /></div>
              <div className="space-y-6 text-[1.1rem] text-text-dim leading-[1.8]"><p>We are a passionate group of students dedicated to promoting the beautiful language of physics in all of its true glory.</p><p>Based at BITS Pilani, we provide quality content through our blog, engaging social media posts, and interactive events designed to spark curiosity and wonder.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t" style={{ background: 'transparent', borderColor: 'var(--border)' }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="mb-16 flex items-center gap-4"><span className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-accent">Our Values</span><div className="w-12 h-px bg-border" /></div>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <div key={v.num} className="p-8 border bg-bg-surface transition-colors hover:border-accent" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-start gap-6">
                  <span className="text-3xl font-light" style={{ color: `var(--accent${i === 0 ? '' : i === 1 ? '2' : i === 2 ? '3' : ''})`, fontFamily: '"Playfair Display", serif' }}>{v.num}</span>
                  <div><h3 className="text-xl font-semibold text-text mb-2">{v.title}</h3><p className="text-text-dim leading-relaxed">{v.text}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t" style={{ background: 'var(--bg-raised)', borderColor: 'var(--border)' }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="mb-16 flex items-center gap-4"><span className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-accent">What We Offer</span><div className="w-12 h-px bg-border" /></div>
          <div className="grid md:grid-cols-3 gap-8">
            {offerings.map((item, i) => (
              <div key={i} className="p-8 border flex flex-col bg-bg-surface" style={{ borderColor: 'var(--border)' }}>
                <h3 className="text-xl font-semibold text-text mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>{item.title}</h3>
                <p className="text-text-dim mb-8 flex-1 leading-relaxed">{item.text}</p>
                {item.external ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[0.7rem] font-bold uppercase tracking-[0.15em] hover:text-accent transition-colors text-text">{item.linkLabel} →</a>
                ) : (
                  <Link href={item.link} className="text-[0.7rem] font-bold uppercase tracking-[0.15em] hover:text-accent transition-colors text-text">{item.linkLabel} →</Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
