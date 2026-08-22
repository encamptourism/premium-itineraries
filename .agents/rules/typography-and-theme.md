# Typography, Theme, and Iconography Rules for Encamp Privé

## 1. Default Application Theme

The global default is completely neutral:
- **Background**: `#FFFFFF`
- **Text**: `#000000`

```css
body {
  background: #ffffff;
  color: #000000;
}
```

- Do NOT make forest green the default page background.
- Do NOT make ivory the default page background.
- Do NOT make gold the default text color.
- Apply brand colors (`forest`, `gold`, `ivory`, `cream`, `muted`, `border`) intentionally to specific components and sections.

---

## 2. Iconography Standard

> **CRITICAL RULE**: NEVER use emoji icons (e.g. 🌴, 🚗, ✈️, 🌟, ✦) anywhere in the application or UI.
> **ALWAYS use Lucide React (`lucide-react`) vector icons** (e.g. `<Compass />`, `<Sparkles />`, `<Car />`, `<PlaneTakeoff />`, `<Check />`, `<ShieldCheck />`, etc.).

---

## 3. Three-Tier Typography System

1. **Decorative Script** (`font-display-script` / `--font-display-script`):
   - Editorial accents, small hero phrases (e.g. *"Explore the Best of"*), decorative callouts.
   - *Never* for body text, navigation, buttons, labels, or accessibility-critical content.
2. **Primary Display Serif** (`font-display-serif` / `--font-display-serif`):
   - Hero titles (*"MEGHALAYA"*), major itinerary titles, large section headings.
   - Elegant, high-contrast, strong uppercase appearance.
3. **Modern Sans Serif** (`font-sans` / `--font-sans`):
   - Body copy, descriptions, navigation, buttons, labels, metadata, package details.
   - Optimized for mobile readability and performance.

---

## 4. Global Design Tokens

```css
:root {
  /* Default Neutral Base */
  --background: #ffffff;
  --foreground: #000000;

  /* Brand Palette (Applied intentionally) */
  --forest: #062212;
  --forest-light: #0b3a24;
  --forest-dark: #03150b;

  --gold: #dfa62f;
  --gold-light: #f0c85a;

  --ivory: #f8f5ed;
  --cream: #f1ebdd;

  /* Supporting */
  --muted: #667067;
  --border: #d9ccad;
}
```

---

## 5. Typography Scale & Semantic Classes

- `display-script`: Script font, fluid scaling
- `display-hero`: Display serif font, uppercase, high contrast
- `heading-xl`, `heading-lg`, `heading-md`, `heading-sm`: Display serif
- `body-lg`, `body-md`, `body-sm`: Sans-serif
- `label`, `caption`, `eyebrow`: Sans-serif with intentional tracking
