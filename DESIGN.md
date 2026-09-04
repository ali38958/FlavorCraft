# Design Specification: FlavorCraft — Recipe Sharing Web Application

A cohesive, culinary-themed design system crafted for rich, inviting culinary storytelling, clear navigation, and responsive multi-device fidelity.

---

## 🎨 Design Philosophy: "Artisan Culinary & Modern Warmth"

The visual language blends editorial food publication typography with modern, responsive SaaS precision.
- **Warmth over Sterile:** Avoid generic cold blues or sterile tech grays. Use warm terracotta paprika, sun-drenched saffron, and fresh garden herbs.
- **Editorial Contrast:** Elegant serif titles (`Playfair Display`) paired with ultra-legible, geometric sans-serif body text (`Plus Jakarta Sans`).
- **Tactile Depth:** Subtle organic shadows, delicate border lines, and smooth micro-interactions that invite browsing and recipe contribution.

---

## 🌈 Color Palette Tokens

```yaml
colors:
  # Primary Brand: Warm Terracotta Paprika
  primary:
    DEFAULT: "hsl(24, 95%, 53%)"       # #F4611A
    hover: "hsl(24, 90%, 45%)"         # #DE5212
    light: "hsl(24, 100%, 96%)"        # #FFF3ED
    subtle: "hsl(24, 85%, 90%)"

  # Secondary: Fresh Sage Garden Herb
  secondary:
    DEFAULT: "hsl(152, 55%, 36%)"      # #298E59
    hover: "hsl(152, 60%, 28%)"
    light: "hsl(150, 40%, 95%)"

  # Accent: Golden Saffron / Warm Butter
  accent:
    DEFAULT: "hsl(43, 96%, 56%)"       # #F8B826
    hover: "hsl(43, 92%, 48%)"
    subtle: "hsl(43, 100%, 96%)"

  # Neutrals: Artisan Paper & Warm Charcoal
  background: "hsl(38, 30%, 98%)"      # #FBF9F5 (Warm Cream)
  surface: "hsl(0, 0%, 100%)"          # #FFFFFF (Pure Card White)
  surface-elevated: "hsl(38, 25%, 96%)" # #F7F4EE
  border: "hsl(35, 18%, 88%)"          # #E5E1D9
  border-subtle: "hsl(35, 18%, 93%)"   # #F1EFEA

  # Text Tiers
  text:
    primary: "hsl(220, 20%, 12%)"      # #191E24 (Deep Espresso)
    secondary: "hsl(220, 12%, 35%)"    # #4F5762
    muted: "hsl(220, 10%, 55%)"        # #838A94
    inverse: "hsl(0, 0%, 100%)"

  # Semantic Feedback
  danger: "hsl(354, 70%, 54%)"         # #DF3446
  success: "hsl(142, 65%, 38%)"        # #229A4D
  warning: "hsl(38, 92%, 50%)"         # #F59E0B

  # Category Specific Accent Colors
  categories:
    breakfast: "hsl(38, 92%, 50%)"
    vegan: "hsl(150, 60%, 38%)"
    desserts: "hsl(330, 75%, 55%)"
    quick-meals: "hsl(200, 85%, 48%)"
    dinner: "hsl(14, 85%, 50%)"
```

---

## 🔤 Typography Specification

```yaml
typography:
  font-family:
    sans: "'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    serif: "'Playfair Display', Georgia, Cambria, 'Times New Roman', serif"
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"

  font-weight:
    regular: 400
    medium: 500
    semibold: 600
    bold: 700
    black: 800

  scale:
    xs: ["0.75rem", { lineHeight: "1rem" }]       # 12px
    sm: ["0.875rem", { lineHeight: "1.25rem" }]   # 14px
    base: ["1rem", { lineHeight: "1.5rem" }]      # 16px
    lg: ["1.125rem", { lineHeight: "1.75rem" }]   # 18px
    xl: ["1.25rem", { lineHeight: "1.75rem" }]    # 20px
    2xl: ["1.5rem", { lineHeight: "2rem" }]       # 24px
    3xl: ["1.875rem", { lineHeight: "2.25rem" }]  # 30px
    4xl: ["2.25rem", { lineHeight: "2.75rem" }]   # 36px
    5xl: ["3rem", { lineHeight: "1.15" }]         # 48px
```

---

## 📐 Spatial System & Elevation

```yaml
spacing:
  1: "0.25rem"   # 4px
  2: "0.5rem"    # 8px
  3: "0.75rem"   # 12px
  4: "1rem"      # 16px
  5: "1.25rem"   # 20px
  6: "1.5rem"    # 24px
  8: "2rem"      # 32px
  10: "2.5rem"   # 40px
  12: "3rem"     # 48px
  16: "4rem"     # 64px
  20: "5rem"     # 80px

radii:
  sm: "6px"
  md: "12px"
  lg: "18px"
  xl: "24px"
  full: "9999px"

shadows:
  xs: "0 1px 2px rgba(25, 30, 36, 0.04)"
  sm: "0 2px 8px rgba(25, 30, 36, 0.06)"
  md: "0 6px 20px rgba(25, 30, 36, 0.08)"
  lg: "0 14px 34px rgba(25, 30, 36, 0.12)"
  hover: "0 18px 40px -8px rgba(244, 97, 26, 0.18)"
  glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)"
```

---

## 🧩 Component Visual Rules

### 1. Navigation Bar
- **Position:** Fixed or sticky top (`top: 0`, `z-index: 100`)
- **Background:** Semi-transparent warm surface with backdrop blur (`background: hsla(38, 30%, 98%, 0.92); backdrop-filter: blur(12px)`)
- **Top-Left Logo:** Brand icon with stylized typography "FlavorCraft", accented with saffron flame/cloche mark
- **Navigation Links:** `Home`, `Browse Recipes`, `Submit Recipe`, `User Profile`
- **Active State:** Terracotta bottom indicator pill or bold font with warm accent background
- **Responsive:** Hamburger icon triggers smooth slide-down mobile menu on viewports < 768px

### 2. Recipe Card
- **Surface:** White card with `border: 1px solid var(--color-border)`, `border-radius: var(--radius-lg)`
- **Image:** 16:10 aspect ratio with `object-fit: cover`, subtle zoom on hover (`transform: scale(1.04)`)
- **Category Badge:** Positioned floating over image top-left, color-coded per category
- **Cooking Time & Rating:** Time pill top-right (`⏱️ 20 min`), golden star rating pill (`★ 4.8`)
- **Body:** Serif recipe title, clamped 2-line description, author attribution, and difficulty badge

### 3. Buttons
- **Primary:** Filled terracotta, white text, smooth transition, box-shadow on hover
- **Secondary:** White surface, border in terracotta or charcoal, warm hover background
- **Accent:** Saffron background with dark espresso text
- **Ghost:** Transparent background, text colored with subtle border/hover wash

### 4. Interactive Feedback & Micro-animations
- Transition duration: `200ms` to `300ms` with `cubic-bezier(0.16, 1, 0.3, 1)`
- Interactive elements feature accessible `:focus-visible` outlines in primary terracotta
