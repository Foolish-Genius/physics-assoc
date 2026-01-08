# Physics Association Website

A modern, responsive website for the BITS Pilani Physics Association built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- ⚡ **Next.js 14** - Latest React framework with App Router
- 🎨 **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- 📱 **Fully Responsive** - Mobile-first design approach
- 🌙 **Dark Theme** - Modern dark mode interface
- ♿ **Accessible** - WCAG compliant components
- 🚀 **Performance Optimized** - Image optimization, code splitting
- 📝 **TypeScript** - Type-safe development
- 🔄 **Auto Carousel** - Featured content carousel with smooth transitions

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   ├── about/
│   │   └── page.tsx        # About Us page
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Footer with social links
│   ├── Banner.tsx          # Carousel banner with quotes
│   ├── ArticleCard.tsx     # Featured article component
│   ├── SectionHeading.tsx  # Reusable section heading
│   └── index.ts            # Component exports
└── constants/
    └── index.ts            # Site constants and data
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Key Improvements Over Previous Version

### Architecture
- ✅ Component-based architecture for better maintainability
- ✅ Separation of concerns (components, constants, styles)
- ✅ Type-safe development with TypeScript
- ✅ Modern build tooling with Next.js

### Performance
- ✅ Image optimization with Next.js Image component
- ✅ Automatic code splitting
- ✅ CSS-in-JS with Tailwind (no runtime overhead)
- ✅ Static Site Generation (SSG) capability

### Styling
- ✅ Tailwind CSS for consistent design system
- ✅ Custom color variables for theming
- ✅ Responsive design out of the box
- ✅ Smooth animations and transitions

### User Experience
- ✅ Fast page loads
- ✅ Smooth carousel with auto-play
- ✅ Better mobile experience
- ✅ Improved accessibility

### Developer Experience
- ✅ Hot Module Replacement (HMR) for instant updates
- ✅ Type checking during development
- ✅ Organized file structure
- ✅ Reusable components and constants

## Sections

### Home Page
- **Banner** - Auto-playing carousel with physics quotes
- **About** - Brief introduction with featured image and call-to-action
- **Events** - Upcoming events section (placeholder)
- **Featured Articles** - Latest blog posts from the community

### About Page
- **Mission** - Detailed mission statement
- **Values** - Core values of the association
- **Content Offerings** - Blog, social media, and events
- **Social Connect** - Links to all social media platforms

## Deployment

### GitHub Pages
```bash
npm run export
# Push the `out` directory to your GitHub Pages repository
```

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
This Next.js app can be deployed to:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Digital Ocean App Platform

## Configuration

### Environment Variables
Create a `.env.local` file (optional):
```env
NEXT_PUBLIC_SITE_URL=https://bitsphyassoc.github.io
```

## Content Management

Update site content in `src/constants/index.ts`:
- Social media links
- Featured articles
- Navigation items
- About section content
- Physics quotes for banner

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2026 BITS Pilani Physics Association. All rights reserved.

## Contributing

We welcome contributions! Please feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## Contact

- **Instagram**: [@bits_phyassoc](https://www.instagram.com/bits_phyassoc/)
- **Facebook**: [Physics Association BITS Pilani](https://www.facebook.com/Physics.Association.BITSPilani/)
- **LinkedIn**: [Physics Association BITS Pilani](https://www.linkedin.com/company/physicsassociationbitspilani)
- **YouTube**: [Physics Association](https://www.youtube.com/channel/UCh81x2kZQHc64xVwWAmCKWQ)
