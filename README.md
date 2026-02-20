# Joe English - Professional English Coaching Website

A modern, responsive single-page website for Joe English's ESL coaching services.

## 📁 Project Structure

```
joenglish/
├── assets/
│   └── images/           # All images (profile, testimonials)
├── index.html            # Main website
├── thank-you.html        # Form submission confirmation page
├── style.css             # Styles (responsive: 480px, 768px, 992px)
├── script.js             # Interactivity
├── robots.txt            # Search engine crawler rules
├── sitemap.xml           # Site map for SEO
├── llms.txt              # AI/LLM-friendly content
├── testmonials.txt       # Testimonial source text
└── README.md             # This file
```

## ⚙️ Setup Checklist

### 1. Web3Forms API Key (Required)

The contact form uses [Web3Forms](https://web3forms.com/).

1. Create a free account at https://web3forms.com
2. Get your **access_key**
3. Edit `index.html` and replace:

```html
<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
```

### 2. Domain Configuration (When Ready)

When you have a domain, search and replace `YOUR_DOMAIN.com` in these files:

| File | Description |
|------|-------------|
| `robots.txt` | Sitemap URL |
| `sitemap.xml` | All page URLs |
| `llms.txt` | Contact/method links |
| `index.html` | Add `<link rel="canonical">` and `<meta property="og:url">` |

**Quick find & replace:**
```bash
# macOS/Linux
grep -r "YOUR_DOMAIN.com" .
```

### 3. Optional: Add Canonical & OG:URL

Once you have a domain, add these to `<head>` in `index.html`:

```html
<link rel="canonical" href="https://YOUR_DOMAIN.com/">
<meta property="og:url" content="https://YOUR_DOMAIN.com/">
```

## 🚀 Local Development

```bash
# Simple Python server
python3 -m http.server 8000

# Then open: http://localhost:8000
```

## ✨ Features

- **Responsive Design**: 3 breakpoints (mobile, tablet, desktop)
- **Hamburger Menu**: Mobile navigation with animation
- **Testimonial Carousel**: Touch/swipe + keyboard navigation (← →)
- **Scroll to Top**: Appears after scrolling 300px
- **Accessibility**: Skip links, ARIA labels, focus states, reduced motion support
- **SEO Optimized**: Meta tags, Schema.org JSON-LD, sitemap
- **AI-Friendly**: llms.txt for LLM discoverability
- **Print Styles**: Clean printing support

## 📱 Contact Channels

- **WhatsApp**: +51 940 780 086
- **LINE**: @jwhmilne
- **Email**: jwhmilne@gmail.com

## 🔧 Tech Stack

- HTML5 / CSS3 / Vanilla JavaScript
- Font Awesome 6.0 (icons)
- Google Fonts (Inter)
- Animate.css (subtle animations)
- Web3Forms (contact form)
- Google Translate Widget
