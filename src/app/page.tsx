import { Banner, SectionHeading, ArticleCard } from '@/components';
import { featuredArticles, aboutContent } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Banner Section */}
      <Banner />

      {/* About Section */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-4">
          <SectionHeading title="About Us" />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {aboutContent.description}
              </p>
              <Link
                href="/about"
                className="inline-block bg-orange hover:bg-orange/80 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Read More
              </Link>
            </div>

            {/* Image */}
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src={aboutContent.image}
                alt="About Us"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-prussian/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Upcoming Events"
            subtitle="We're thinking of amazing new ones for you 🚀"
          />
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Check back soon for exciting new physics events and seminars!
            </p>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start mb-12">
            <SectionHeading title="Featured Articles" />
            <Link
              href="https://bitsphyassoc.github.io/blog/"
              className="text-orange hover:text-orange/80 transition-colors font-semibold whitespace-nowrap mt-4"
            >
              Go to Blog →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
