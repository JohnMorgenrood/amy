# Makeup by Amy - Professional Portfolio Website

A stunning, modern portfolio website for Amy Morgenrood, a professional makeup artist based in Cape Town with 8+ years of on-set experience in film and television.

## 🎨 Features

- **Modern Dark Theme** - Elegant dark design with gold and rose accent colors
- **Framer Motion Animations** - Smooth, professional motion graphics throughout
- **Floating Elements** - Parallax effects and floating particles
- **Portfolio Carousel** - Swiper.js powered gallery with coverflow effect
- **Projects/Filmography** - Showcase of film, TV, and commercial work
- **Services Section** - Detailed service offerings with hover effects
- **Testimonials Slider** - Client reviews and ratings
- **Contact Form** - Professional booking inquiry form
- **Shop Page** - Coming soon e-commerce section
- **Mobile Responsive** - Fully optimized for all devices
- **SEO Optimized** - Full metadata, structured data, sitemap, robots.txt

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Carousel**: Swiper.js
- **Icons**: Lucide React
- **Deployment**: Vercel ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd amy
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── sitemap.ts          # SEO sitemap
│   ├── robots.ts           # SEO robots.txt
│   └── shop/
│       ├── layout.tsx      # Shop layout
│       └── page.tsx        # Shop page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Navigation
│   │   └── Footer.tsx      # Footer
│   ├── sections/
│   │   ├── Hero.tsx        # Hero section
│   │   ├── Portfolio.tsx   # Portfolio gallery
│   │   ├── Services.tsx    # Services section
│   │   ├── Projects.tsx    # Filmography carousel
│   │   ├── About.tsx       # About section
│   │   ├── Testimonials.tsx # Testimonials slider
│   │   └── Contact.tsx     # Contact form
│   └── effects/
│       └── FloatingElements.tsx # Background effects
└── public/
    ├── manifest.json       # PWA manifest
    └── icon.svg            # Favicon
```

## 🎯 SEO Features

- Full Open Graph and Twitter Card metadata
- JSON-LD structured data for LocalBusiness
- Automatic sitemap generation
- Robots.txt configuration
- Semantic HTML structure
- Image optimization
- Core Web Vitals optimized
 
## 🔍 Ready for Search Engines (Checklist)

Follow these steps to prepare your site for indexing and submit your sitemap to search engines:

1. Verify ownership in Google Search Console:
    - Log into https://search.google.com/search-console
        - Add your property (https://makeupbyamy.com) and follow the verification steps (DNS, HTML file, or Google Analytics).
        - Alternatively: I added the HTML meta verification token to the site metadata in `src/app/layout.tsx` using Next.js app metadata. Google verification token used: `bRiXFAAgSJZtJHLd1jC2hC_nnCfRPqiHlztXk7gLE4M`.
            - For extra convenience, I also added an HTML verification file at `public/googlebRiXFAAgSJZtJHLd1jC2hC_nnCfRPqiHlztXk7gLE4M.html` so you can use the file upload verification method if you prefer.
            - If verifying via Search Console, choose the HTML tag method and click Verify. The site metadata already contains the meta tag, so you should be able to verify immediately after deployment.
            - If you prefer DNS verification (TXT record), add the TXT record to your DNS provider with the same token: `google-site-verification=bRiXFAAgSJZtJHLd1jC2hC_nnCfRPqiHlztXk7gLE4M`.
2. Submit your sitemap:
    - Visit the Sitemaps page in Search Console and submit: https://makeupbyamy.com/sitemap.xml
3. Confirm robots.txt:
    - The site exposes a robots.txt via `src/app/robots.ts` and it points to the sitemap; ensure it's accessible: https://makeupbyamy.com/robots.txt
4. Check Open Graph / Social Preview:
    - The site includes an `og-image.svg` as a placeholder in `/public`. Replace this with a custom OG image if you want a nicer preview on social shares.
5. Validate Structured Data:
    - Use Google’s Rich Results Test (https://search.google.com/test/rich-results) and the Structured Data Testing Tool to confirm your JSON-LD (LocalBusiness) markup is valid.
6. Inspect and test pages:
    - Test important pages (home, shop, portfolio) in Search Console to ensure they are accessible and render correctly to Google.

If you want, I can help with a) generating per-product pages for better indexing, b) uploading higher-resolution OG images, and c) including `alternate` hreflang tags or region-specific metadata.

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project to Vercel
3. Deploy!

The site is pre-configured for Vercel deployment.

### Environment Variables

For production, add these to your Vercel project:

```env
# Optional - for form submissions
CONTACT_EMAIL=bookings@makeupbyamy.co.za

# Optional - for analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 📱 Contact Information

- **Phone**: 084 701 7012
- **Email**: bookings@makeupbyamy.co.za
- **Location**: Cape Town, South Africa
- **Instagram**: [@amyb_mup](https://instagram.com/amyb_mup)

## 📝 Customization

### Adding Portfolio Images

Replace placeholder images with actual portfolio photos. Update the image URLs in:
- `src/components/sections/Hero.tsx`
- `src/components/sections/Portfolio.tsx`
- `src/components/sections/Projects.tsx`

### Updating Contact Info

Update contact details in:
- `src/app/layout.tsx` (structured data)
- `src/components/sections/Contact.tsx`
- `src/components/layout/Footer.tsx`

### Adding Products (Shop)

When ready to launch the shop, integrate with:
- Stripe for payments
- Neon.tech or Supabase for database
- Update `src/app/shop/page.tsx`

## 📄 License

This project is private and created for Amy Morgenrood.

---

Made with ✨ for Amy Morgenrood - Professional Makeup Artist
