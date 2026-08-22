# Mobile-First and Responsive Design Requirements for Encamp Privé

Encamp Privé is a **mobile-native travel experience**. Mobile is NOT a secondary responsive breakpoint. The itinerary must be designed for mobile first, while also providing a highly polished desktop experience.

> **Mobile-native UX + premium desktop presentation**

---

## 1. Design Priority

```text
Mobile (360px – 414px)
  ↓
Tablet (768px – 1024px)
  ↓
Desktop (1280px – 1440px)
  ↓
Large Desktop (1920px+)
```

Do not design desktop first and shrink for mobile. Mobile must have its own intentional, thumb-friendly composition.

---

## 2. Mobile Experience Principles

- **Thumb-friendly interaction**: Minimum 44x44px touch targets, reachable buttons.
- **Readable typography**: Coherent scale, avoiding tiny text.
- **Comfortable spacing & minimal UI**: Clean, airy layout without dense clutter or desktop-style tables.
- **Cinematic imagery**: Responsive crops, fast loading, prioritized above-the-fold hero.
- **Vertical scrolling flow**: Avoid forced horizontal sliders for essential content.
- **Sticky / Accessible Enquiry CTA**: Always accessible without obstructing content.
- **Lightweight Motion**: Shorter, simpler animations (`opacity`, `transform`, `scale`, `clip-path`), no heavy mobile parallax, respecting `prefers-reduced-motion`.
- **Pure JavaScript (No TypeScript)**: Use JavaScript (.js, .jsx) throughout the project.

---

## 3. Architecture & Responsive Implementation

- **Shared Data Model**: A single unified itinerary data structure drives both mobile and desktop views.
- **Responsive Components**: Reusable components (`DaySection`, `Hero`, `Navigation`, `EnquiryCTA`) adapting via CSS / Tailwind responsive modifiers (`sm:`, `md:`, `lg:`, `xl:`), minimizing JS-based viewport branching.
- **Next.js & Server Components**: Core itinerary renders as Server Components for instant HTML paint on 4G/slow networks. Client Components isolated only for interactive menus/modals.
- **Next/Image**: Responsive sizes, WebP/AVIF formats, eager loading on Hero, lazy loading below the fold.

---

## 4. Breakpoint Testing Matrix

- **Mobile**: 360px, 375px, 390px, 414px
- **Tablet**: 768px, 1024px
- **Desktop**: 1280px, 1440px, 1920px
