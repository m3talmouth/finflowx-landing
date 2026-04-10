# FinFlowX Landing Page — Claude Code Prompt

## Your Role

You are building the marketing landing page and logo for FinFlowX (finflowx.io). Before writing any code, research the following:

1. **Study Apple's pre-September event landing pages** — how they use abstraction, progressive disclosure, bold typography, scroll-driven storytelling, and minimal copy to create anticipation and desire. Study how Apple reveals product capabilities through visual metaphors rather than feature lists.

2. **Study the best SaaS landing pages in fintech/accounting** — Ramp, Brex, Tipalti, Coupa, Stripe. Note how they communicate complex B2B products simply.

3. **Study the psychology of B2B sales pages** — what makes a CFO or a managing partner at an accounting firm click "Contact Us." Understand: pain-first messaging, social proof patterns, trust signals, and urgency without desperation.

4. **Study Big 4/Big 5 consulting firm aesthetics** — Deloitte, PwC, EY, KPMG, BDO. This product is positioned to eventually partner with firms of this caliber. The brand must feel worthy of that conversation from Day 1.

You are the best salesman for this product. Every word, every scroll section, every animation must earn its place by moving the visitor closer to "I need this."

---

## Brand Identity & Logo

### Logo Requirements

Create an SVG logo for FinFlowX that:

- Uses the brand color palette (see below)
- Works at all sizes — favicon (16x16), navbar (32px height), hero section (large)
- Has two variants: **logomark** (icon only) and **logotype** (icon + "FinFlowX" text)
- The mark should abstractly represent the concept of **flow** — financial data flowing through a system and emerging organized. Think: streams converging, order from chaos, a transformation point.
- Must feel premium, modern, and enterprise-worthy. Not playful, not startup-y. Think Stripe's logo confidence meets Deloitte's gravitas.
- The "F" or "FF" can be a starting point but don't force it if a more abstract mark works better.
- No gradients that break in SVG. Use flat colors or simple linear gradients only.
- Generate all variants: full logo SVG, favicon SVG, and navbar-height SVG.

### Color Palette — 2026 Premium

Three colors only. Pearl white background with two royal, premium accent colors drawn from 2026's defining luxury palette.

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Background | Cloud Dancer (Pearl White) | #F5F0EB | Page background, cards, breathing space. Pantone's 2026 Color of the Year. Warm, airy, serene. |
| Primary | Alexandrite Deep Teal | #1A5C6B | Headlines, primary CTAs, logo primary, navigation. Pantone 18-4835 — intense, trust-signaling, finance-appropriate. |
| Accent | Amethyst Orchid | #7B4FA0 | Secondary CTAs, highlights, hover states, decorative elements. Pantone 17-3628 — visionary, luxurious, bold without being loud. |

**Supporting neutrals (derived, not counted as additional colors):**
- Dark text: #1A1A1A (near-black, high contrast on pearl white)
- Subtle text: #6B6B6B (secondary copy, captions)
- Subtle borders/dividers: #E0D8D0 (warm gray, harmonizes with Cloud Dancer)

**Rules:**
- Pearl white is the dominant surface. The page should feel airy and open — 70%+ white space.
- Alexandrite Deep Teal is used sparingly but with authority — headlines, the logo, primary buttons.
- Amethyst Orchid is the surprise — it appears in hover states, accent lines, decorative SVG elements, and secondary interactions. It signals vision and ambition.
- Never use both accent colors at equal weight in the same section. One leads, one supports.

---

## About the Product

**FinFlowX** is a universal Accounts Payable (AP) and Accounts Receivable (AR) automation engine.

### The Problem We Solve

Businesses today face a broken choice:
- **Pay $100K+/year for SAP** to get proper AP/AR automation (3-way matching, dunning, payment proposals, cash flow forecasting)
- **Or use Tally/QuickBooks/Xero** and do everything manually — matching invoices in Excel, chasing payments via WhatsApp, reconciling taxes in spreadsheets, and hoping nothing falls through the cracks

The result: duplicate payments go undetected, early payment discounts are missed, fraud is invisible, collections are slow, CFOs make decisions on stale data, and accountants drown in manual work.

### What FinFlowX Does

FinFlowX takes SAP's proven AP/AR methodology — refined over 50 years across thousands of enterprises — and makes it work with ANY accounting software. Tally, QuickBooks, Xero, Zoho, SAP itself, or even CSV exports. No SAP license required.

**Core capabilities:**
- **3-Way Matching** — Automatically match invoices against purchase orders and goods receipts. AI handles fuzzy amounts, partial deliveries, multi-line POs.
- **Smart Dunning** — Automated, escalating payment reminders for overdue receivables. Email + WhatsApp. Configurable levels.
- **Anomaly Detection** — AI flags duplicate invoices, unusual amounts, vendor behavior changes, and fraud patterns before they become problems.
- **Cash Flow Forecasting** — Know your cash position 30/60/90 days out. Not backwards-looking bank balance checks.
- **Tax Compliance** — GST e-invoicing (India), BIR (Philippines), VAT (EU). Compliance baked in, not bolted on.
- **Payment Proposals** — System-generated payment runs that optimize for early payment discounts.
- **CFO Dashboards** — Real-time AP aging, AR aging, DPO, DSO. Reports that update themselves.
- **Universal Connectivity** — Works with Tally, SAP, QuickBooks, Xero, Zoho, and 20+ platforms via unified API. CSV upload as Day 1 fallback.

### Who It's For

**Segment 1: Accounting & Advisory Firms**
Professional services firms — from boutique practices managing 50 clients to regional firms managing 200+ — and eventually, the Big 5. These firms manage AP/AR reconciliation, tax compliance, and financial reporting across diverse client portfolios on different accounting platforms. Each client is configured differently. The firm drowns in manual reconciliation.

FinFlowX gives them a single platform to standardize AP/AR processes across their entire client portfolio, with white-label dashboards they can offer as a value-added service. One firm onboarding = 50-200 clients on the platform.

**Segment 2: Mid-Market Businesses**
Companies with $500K to $50M annual revenue. Small finance teams (2-10 people) on Tally, QuickBooks, or Xero. They manage day-to-day AP/AR internally but have zero automation — matching in Excel, approvals via email, collections via phone calls, tax reconciliation by hand.

FinFlowX gives them enterprise-grade AP/AR automation at a fraction of enterprise cost.

### Why FinFlowX Will Win
- SAP's methodology without SAP's price tag
- The only product that deeply integrates with Tally (70%+ of Indian SMBs) AND connects to 20+ global platforms
- AI makes enterprise-grade features viable at mid-market pricing
- Tax compliance as entry point, full automation as upsell
- One accounting firm = 50-200 clients on the platform (built-in distribution)
- Positioned to partner with Big 5 advisory firms as a white-label AP/AR engine

### One-Liner
"SAP-grade AP/AR automation for every accounting software. AI-powered. Compliance built-in."

---

## Design Direction

### Philosophy: Apple Pre-Event Meets Enterprise Fintech

**Abstraction:** Do NOT show screenshots of dashboards or product UI. The product is not built yet. Instead, use abstract visual metaphors — flowing data streams, geometric patterns representing order from chaos, connected nodes representing universal connectivity. Think Apple's event teasers: you feel the capability before you see the product.

**Encapsulation:** Each scroll section is a self-contained story. It reveals ONE idea completely, then transitions to the next. No information leaks between sections. Each section should work as a standalone billboard.

**Enterprise Gravitas:** This is not a startup landing page with quirky illustrations and playful copy. This is a product that aspires to partner with Deloitte and PwC. The design must feel worthy of that conversation — premium, confident, understated power.

**Scroll-Driven Storytelling:**
1. Hero — Bold statement. Intrigue. One sentence that makes you scroll.
2. The Pain — Show the broken world. Make them feel it.
3. The Shift — "What if..." Introduce the possibility.
4. What It Does — Capabilities revealed through metaphor, not feature lists.
5. Who It's For — Two segments, speaking directly to each.
6. Why Now — The convergence of forces (regulation, AI, market gap).
7. How It's Different — Competitive positioning without naming competitors.
8. Contact Us — The only CTA that matters.

### Visual Language
- **Color palette:** Cloud Dancer pearl white (#F5F0EB) background. Alexandrite Deep Teal (#1A5C6B) primary. Amethyst Orchid (#7B4FA0) accent. See full palette above.
- **Typography:** Large, bold headlines in Alexandrite Teal. Thin body text in near-black. Generous whitespace. Think Apple's typography scale meets Stripe's documentation elegance.
- **Animation:** Subtle. Scroll-triggered fade-ins and parallax. NO bouncing, spinning, or attention-grabbing gimmicks. Sophistication, not carnival.
- **Imagery:** Abstract. Geometric. No stock photos of people in offices. No screenshots. Think: data flowing through a prism and emerging organized. Chaos becoming order. Disconnected nodes becoming a unified network. All rendered in the brand palette using CSS/SVG.
- **CSS approach:** Use pure CSS animations and SVG for visuals. No external image dependencies. Everything generated in code.

### Responsive
Must work flawlessly on mobile. Many business owners and firm partners will view this on their phone first.

---

## Contact Us Page

The contact page is critical. This is not a generic "drop us a message" form. It is a qualification and discovery form that helps us understand the prospect.

### Contact Form Fields

**Section 1: About You**
- Full Name (required)
- Business Email (required)
- Phone Number (required — WhatsApp is primary communication in key markets)
- Company / Firm Name (required)

**Section 2: Your Role**
- Radio selection:
  - "I lead an accounting or advisory firm"
  - "I manage finance for my business"
  - "I'm a consulting partner (SAP, ERP, or advisory)"
  - "Other"

**Section 3: Your Current Setup**
- "What accounting software do you use?" — Multi-select checkboxes:
  - Tally Prime
  - SAP (ECC or S/4HANA)
  - QuickBooks
  - Xero
  - Zoho Books
  - Sage
  - NetSuite
  - Other (text field)

- "How many client entities / companies do you manage?" — Dropdown:
  - 1-5
  - 6-20
  - 21-50
  - 51-100
  - 100+

**Section 4: Your Challenges**
- "What are your biggest AP/AR challenges?" — Multi-select checkboxes:
  - Invoice matching is manual and error-prone
  - Chasing overdue payments takes too much time
  - Tax reconciliation is a recurring headache
  - No visibility into cash flow
  - Duplicate payments or fraud concerns
  - Scaling operations without hiring more staff
  - Managing multiple clients on different accounting platforms
  - Other (text field)

**Section 5: Interest**
- "What interests you most about FinFlowX?" — Multi-select checkboxes:
  - 3-Way Matching automation
  - Automated payment reminders (dunning)
  - Tax compliance automation
  - Cash flow forecasting
  - CFO dashboards and reporting
  - White-label for my clients
  - All of the above

- "When are you looking to solve this?" — Radio:
  - Immediately — we need this now
  - In the next 1-3 months
  - Just exploring for now

**Section 6: Anything Else**
- Free text area: "Tell us anything else about your situation or what you're looking for."

**Submit button text:** "Get Early Access" (not "Submit" — create desire)

**After submission:** Show a confirmation message: "Thank you. We'll reach out within 24 hours. Welcome to the future of AP/AR."

### Form Backend
- For the initial GitHub Pages version, use Formspree (formspree.io) or a similar free form backend to collect submissions and send them to a designated email.
- Store form data in a way that's easy to export (the form service will handle this).

---

## Technical Requirements

- **Single-page application** with smooth scroll navigation
- **Pure HTML + CSS + vanilla JavaScript** — no frameworks. Must be hostable as a static site on GitHub Pages.
- **All visuals created in CSS/SVG** — no external images or assets. The logo, all illustrations, all decorative elements must be code-generated.
- **Fast loading** — no heavy libraries. Every byte must earn its place.
- **SEO-ready** — proper meta tags, Open Graph tags, structured data for SaaS product
- **Favicon** — use the logomark SVG as favicon
- **Mobile-first responsive design**
- **Accessibility** — proper ARIA labels, keyboard navigation, contrast ratios (WCAG AA minimum)
- **Smooth scroll** between sections with navigation anchors
- **Sticky navigation** with section indicators and the logo
- **Dark mode aware** — respect prefers-color-scheme (dark mode inverts: dark background with Cloud Dancer as text color, teal and orchid remain as accents)

---

## File Structure

```
/
├── index.html          (main landing page with all sections including contact)
├── css/
│   └── style.css       (all styles)
├── js/
│   └── main.js         (scroll animations, form handling, navigation)
├── assets/
│   ├── logo.svg        (full logotype — icon + text)
│   ├── logomark.svg    (icon only — also used as favicon)
│   └── logo-light.svg  (light variant for dark backgrounds)
├── favicon.svg
├── CNAME               (finflowx.io)
└── README.md
```

---

## Quality Bar

Before considering this done, ask yourself:
1. Would a CFO who lands on this page understand what FinFlowX does within 5 seconds?
2. Would a managing partner at an accounting firm feel "this is built for me" within 10 seconds?
3. Would a Big 5 consulting partner feel this brand is worthy of a partnership conversation?
4. Does every section earn its scroll? Is there a single section you could remove without losing the story?
5. Does the page feel premium — like a product backed by serious people — or does it feel like a weekend project?
6. Would Apple's marketing team nod approvingly at the typography and whitespace?
7. Does the color palette feel cohesive, luxurious, and distinctly 2026?
8. Does the logo work at 16px and at 160px? Does it feel like it belongs on a Big 5 partner's integration page?
9. Does the contact form feel like a conversation, not an interrogation?
10. Is the mobile experience as good as desktop, or better?

If any answer is no, iterate until it's yes.
