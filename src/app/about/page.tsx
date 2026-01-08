import { SectionHeading } from '@/components';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About Us - Physics Association | BITS Pilani',
  description:
    'Learn more about the Physics Association at BITS Pilani, our mission, and our team of passionate physics enthusiasts.',
};

export default function About() {
  const teamValues = [
    {
      title: 'Innovation',
      description:
        'We push the boundaries of physics education through modern content and engaging discussions.',
    },
    {
      title: 'Community',
      description:
        'Building a vibrant community of physics enthusiasts at BITS Pilani.',
    },
    {
      title: 'Excellence',
      description:
        'Striving for the highest quality in our articles, events, and interactions.',
    },
    {
      title: 'Accessibility',
      description:
        'Making complex physics concepts accessible to everyone, regardless of background.',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-dark-secondary to-dark">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-accent">Physics</span> Association
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Promoting the beautiful language of physics at BITS Pilani
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                We are a bunch of passionate nerds trying to promote the beautiful language of
                physics in all of its true glory. Our mission is to bridge the gap between
                complex physics concepts and everyday understanding.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Based at BITS Pilani, we provide quality content through our blog, engaging
                Instagram posts, and interactive events that explain fascinating physics phenomena
                in an accessible way.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Whether you're interested in quantum computing, cosmology, particle physics, or
                any other field of physics, we have something for you!
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="https://raw.githubusercontent.com/bitsphyassoc/bitsphyassoc.github.io/main/assets/images/feature-image.jpg"
                alt="Our Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-dark-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {teamValues.map((value, index) => (
              <div
                key={index}
                className="bg-dark p-8 rounded-lg border border-gray-700 hover:border-accent transition-colors"
              >
                <h3 className="text-2xl font-bold text-accent mb-4">{value.title}</h3>
                <p className="text-gray-300 text-lg">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12">What We Offer</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-dark-secondary p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-accent mb-4">Blog Articles</h3>
              <p className="text-gray-300 mb-6">
                In-depth articles covering various topics in physics, from quantum mechanics to
                cosmology.
              </p>
              <Link
                href="https://bitsphyassoc.github.io/blog"
                className="text-accent hover:text-red-600 transition-colors font-semibold"
              >
                Read Articles →
              </Link>
            </div>

            <div className="bg-dark-secondary p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-accent mb-4">Social Content</h3>
              <p className="text-gray-300 mb-6">
                Follow us on Instagram for quick, engaging posts about fascinating physics
                phenomena and discoveries.
              </p>
              <a
                href="https://www.instagram.com/bits_phyassoc/"
                className="text-accent hover:text-red-600 transition-colors font-semibold"
              >
                Follow Us →
              </a>
            </div>

            <div className="bg-dark-secondary p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-accent mb-4">Events & Talks</h3>
              <p className="text-gray-300 mb-6">
                We organize seminars, talks, and interactive sessions with experts in the field
                of physics.
              </p>
              <Link href="/" className="text-accent hover:text-red-600 transition-colors font-semibold">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-20 bg-dark-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Connect With Us</h2>
          <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
            Follow us on social media for the latest updates, articles, and announcements about
            our physics community.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <a
              href="https://www.facebook.com/Physics.Association.BITSPilani/"
              className="bg-accent hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/bits_phyassoc/"
              className="bg-accent hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/physicsassociationbitspilani"
              className="bg-accent hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.youtube.com/channel/UCh81x2kZQHc64xVwWAmCKWQ"
              className="bg-accent hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
