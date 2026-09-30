import Image from 'next/image';
import Link from 'next/link';
import XkcdStrip from '@/components/XkcdStrip';
import { XKCD_COMICS } from '@/constants/xkcd';

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

  const leadership = [
    { name: 'Gaurav Naidu', role: 'President', badge: 'Executive', color: 'var(--accent)' },
    { name: 'Bharat Kumar Saxena', role: 'Secretary', badge: 'Executive', color: 'var(--accent2)' },
    { name: 'Yammanuru Narasimha Shashank', role: 'Technical Secretary', badge: 'Technical', color: 'var(--accent3)' },
  ];

  const chiefEditors = [
    'Moloy Sikka',
    'Chinmay Senke',
    'Aadyaa Mehrotra',
  ];

  const eventLeads = [
    'Hithav Ambiti',
    'Sharang Desai',
  ];

  const webDevelopers = [
    { name: 'Viren Suthar', initials: 'VS', color: 'var(--accent)' },
    { name: 'Harsh Sahu', initials: 'HS', color: 'var(--accent2)' },
    { name: 'Chinmay Senke', initials: 'CS', color: 'var(--accent3)' },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden flex items-center" style={{ minHeight: '40vh', background: 'transparent' }}>
        <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 w-full">
          <div className="mb-6"><span className="text-xl font-yanone uppercase tracking-[0.2em] text-accent">About Us</span></div>
          <h1 className="text-4xl md:text-6xl text-text leading-tight font-display">
            Promoting the beautiful language of <span className="text-accent font-lobster text-[4.5rem] md:text-[7rem] lowercase leading-[0.7] inline-block transform -rotate-2">physics</span>
            <span className="font-marker text-accent2 text-2xl md:text-4xl absolute mt-4 md:mt-8 ml-2 rotate-12 inline-block">!</span>
          </h1>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-24 border-t" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative h-[600px] w-full"><Image src="https://raw.githubusercontent.com/bitsphyassoc/bitsphyassoc.github.io/main/assets/images/feature-image.jpg" alt="Physics Association Team" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" /></div>
            <div className="order-1 md:order-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-8"><span className="text-2xl font-yanone uppercase tracking-[0.2em] text-accent">Our Mission</span><div className="flex-1 h-px bg-border max-w-xs" /></div>
                <div className="space-y-6 text-[1.1rem] text-text-dim leading-[1.8]"><p>We are a passionate group of students dedicated to promoting the beautiful language of physics in all of its true glory.</p><p>Based at BITS Pilani, we provide quality content through our blog, engaging social media posts, and interactive events designed to spark curiosity and wonder.</p></div>
              </div>
              <div className="mt-8 pt-6 border-t border-[var(--rule)]">
                <XkcdStrip
                  comic={XKCD_COMICS.physicists}
                  maxWidth="max-w-[280px]"
                  align="left"
                  className="!py-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team & Leadership / PoRs */}
      <section className="py-24 border-t" style={{ background: 'transparent', borderColor: 'var(--border)' }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-3">
              <span className="text-2xl font-yanone uppercase tracking-[0.2em] text-accent">
                Team &amp; Leadership
              </span>
              <div className="w-12 h-px bg-border" />
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-text">
              PoRs
            </h2>
            <p className="text-text-dim text-lg mt-3 max-w-2xl leading-relaxed">
              The team leading initiatives, editorial publications, events, and student outreach for the Physics Association.
            </p>
          </div>

          {/* Core Leadership Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {leadership.map((item) => (
              <div
                key={item.role}
                className="p-8 border bg-bg-surface transition-all duration-300 hover:border-accent hover:shadow-md flex flex-col justify-between"
                style={{ borderColor: 'var(--border)' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-xs uppercase font-mono tracking-widest px-3 py-1 font-semibold"
                      style={{ background: `${item.color}15`, color: item.color }}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-display font-bold text-text mb-1 leading-snug">{item.name}</h3>
                  <p className="text-xl font-yanone uppercase tracking-wider text-accent">{item.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Department Leads Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Chief Editors */}
            <div className="p-8 border bg-bg-surface" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs uppercase font-mono tracking-widest px-3 py-1 font-semibold bg-accent/10 text-accent">
                  Editorial Board
                </span>
              </div>
              <h3 className="text-2xl font-display font-semibold text-text mb-4">Chief Editors</h3>
              <ul className="space-y-3">
                {chiefEditors.map((name) => (
                  <li key={name} className="flex items-center gap-3 text-text-dim text-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-text font-medium">{name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Event Leads */}
            <div className="p-8 border bg-bg-surface" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs uppercase font-mono tracking-widest px-3 py-1 font-semibold bg-accent2/10 text-accent2">
                  Activities &amp; Talks
                </span>
              </div>
              <h3 className="text-2xl font-display font-semibold text-text mb-4">Event Leads</h3>
              <ul className="space-y-3">
                {eventLeads.map((name) => (
                  <li key={name} className="flex items-center gap-3 text-text-dim text-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent2" />
                    <span className="text-text font-medium">{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 border-t" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="mb-16 flex items-center gap-4"><span className="text-2xl font-yanone uppercase tracking-[0.2em] text-accent">Our Values</span><div className="w-12 h-px bg-border" /></div>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <div key={v.num} className="p-8 border bg-bg-surface transition-colors hover:border-accent" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-start gap-6">
                  <span className="text-5xl font-bungee" style={{ color: `var(--accent${i === 0 ? '' : i === 1 ? '2' : i === 2 ? '3' : ''})` }}>{v.num}</span>
                  <div><h3 className="text-2xl font-display font-semibold text-text mb-2">{v.title}</h3><p className="text-text-dim leading-relaxed">{v.text}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-24 border-t" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="mb-16 flex items-center gap-4"><span className="text-2xl font-yanone uppercase tracking-[0.2em] text-accent">What We Offer</span><div className="w-12 h-px bg-border" /></div>
          <div className="grid md:grid-cols-3 gap-8">
            {offerings.map((item, i) => (
              <div key={i} className="p-8 border flex flex-col bg-bg-surface" style={{ borderColor: 'var(--border)' }}>
                <h3 className="text-2xl font-display font-semibold text-text mb-4">{item.title}</h3>
                <p className="text-text-dim mb-8 flex-1 leading-relaxed">{item.text}</p>
                {item.external ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xl font-yanone uppercase tracking-[0.15em] hover:text-accent transition-colors text-text">{item.linkLabel} →</a>
                ) : (
                  <Link href={item.link} className="text-xl font-yanone uppercase tracking-[0.15em] hover:text-accent transition-colors text-text">{item.linkLabel} →</Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Website Development Credits */}
      <section className="py-20 border-t" style={{ background: 'transparent', borderColor: 'var(--border)' }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div
            className="border bg-bg-surface p-8 md:p-12 relative overflow-hidden transition-all duration-300 hover:shadow-lg"
            style={{ borderColor: 'var(--border)' }}
          >
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent via-accent2 to-accent3" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs uppercase font-mono tracking-widest px-3 py-1 font-semibold border rounded-sm"
                    style={{
                      background: 'rgba(26, 158, 143, 0.12)',
                      color: 'var(--accent2)',
                      borderColor: 'rgba(26, 158, 143, 0.3)',
                    }}
                  >
                    Web &amp; Design
                  </span>
                  <div className="w-8 h-px bg-border" />
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-text">
                  <span style={{ color: 'var(--accent)' }}>Website</span> Development
                </h2>
                <p className="text-text-dim text-base mt-2 max-w-xl leading-relaxed">
                  Engineered and maintained for the Physics Association by our student web development team.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                {webDevelopers.map((dev) => (
                  <div
                    key={dev.name}
                    className="p-5 border bg-bg flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md group"
                    style={{
                      borderColor: 'var(--border)',
                      borderTop: `3px solid ${dev.color}`,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs tracking-wider shrink-0 transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: `${dev.color}15`,
                        color: dev.color,
                        border: `1.5px solid ${dev.color}40`,
                        boxShadow: `0 0 12px ${dev.color}20`,
                      }}
                    >
                      {dev.initials}
                    </div>
                    <span className="font-display font-semibold text-text text-lg group-hover:text-accent transition-colors">
                      {dev.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
