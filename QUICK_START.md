# Quick Start Guide - Optimized Next.js App

## 🚀 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## ⚙️ Required Configuration

Before deploying, update these files with your actual information:

### 1. SEO Metadata
**File:** `src/app/[locale]/layout.tsx`
```typescript
// Lines 20-32
title: "Your Actual Company Name"
description: "Your actual description"
keywords: ["your", "actual", "keywords"]
```

### 2. Structured Data
**File:** `src/lib/schema.ts`
```typescript
// Update all instances of:
- "Your Company Name"
- "yourdomain.com"
- Social media URLs
```

### 3. Sitemap
**File:** `src/app/sitemap.ts`
```typescript
// Replace yourdomain.com with your actual domain
url: 'https://yourdomain.com'
```

### 4. Robots.txt
**File:** `public/robots.txt`
```
Sitemap: https://yourdomain.com/sitemap.xml
```

### 5. PWA Manifest
**File:** `src/app/manifest.ts`
```typescript
name: 'Your Actual Company Name'
description: 'Your actual description'
```

## 📊 Performance Testing

### Test Locally
```bash
npm run build
npm start
```

### Test with Lighthouse
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Performance", "SEO", "Accessibility"
4. Click "Generate report"

**Target Scores:**
- Performance: 90+
- SEO: 95+
- Accessibility: 95+
- Best Practices: 100

### Test Online
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

## 🎯 Key Features

### ✅ Server-Side Rendering (SSR)
Most components are server-rendered for better performance and SEO.

### ✅ Optimized Images
Using Next.js Image component with:
- Automatic WebP/AVIF conversion
- Lazy loading
- Responsive sizes

### ✅ Minimal JavaScript
Only essential client components:
- Language selector
- Search with debounce
- Pagination
- Video controls

### ✅ SEO Optimized
- Structured data (JSON-LD)
- Dynamic sitemap
- Robots.txt
- Meta tags
- Open Graph tags

### ✅ Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Alt text on images

## 🔍 SEO Checklist

- [ ] Update company name in all files
- [ ] Update domain in sitemap and robots.txt
- [ ] Add actual social media links
- [ ] Configure Google Search Console
- [ ] Submit sitemap to search engines
- [ ] Add Google Analytics (optional)
- [ ] Test with Lighthouse
- [ ] Verify structured data with [Rich Results Test](https://search.google.com/test/rich-results)

## 📱 Mobile Optimization

- Responsive design with Tailwind CSS
- Touch-friendly navigation
- PWA manifest for "Add to Home Screen"
- Optimized font loading

## 🌐 Internationalization

Supports multiple locales (en, ar):
- URL-based locale switching
- Language selector component
- RTL support ready

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Type Errors
```bash
# Regenerate types
npm run dev
```

### Image Optimization Issues
Check `next.config.ts` remote patterns match your image sources.

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [SEO Best Practices](https://nextjs.org/learn/seo/introduction-to-seo)

## 🎉 You're Ready!

Your app is now optimized for:
- ⚡ Fast loading times
- 🔍 Search engine visibility
- ♿ Accessibility
- 📱 Mobile devices
- 🌐 Multiple languages

Run `npm install` and start building! 🚀
