# Sentry Roofing — rebuild brief

Read this first. It tells you what is in this folder, what it is and is not, and how to turn it into a production site.

## What this is

A complete, high-fidelity prototype of the Sentry Roofing marketing site (sentryrg.com): 13 pages, all copy final, all imagery final, all interactions built and working. It was authored in a design tool that renders HTML through its own small React-based component runtime.

**It is a design reference, not a deployable codebase.** The task is to recreate these pages in a real framework — Next.js, Astro, or plain static HTML — matching them pixel for pixel. Do not try to ship the `.dc.html` files.

## Why you can't ship the files as-is

Each page is a `Name.dc.html` file with three parts:

- a template between `<x-dc>` tags — HTML with `{{ value }}` holes and custom control-flow tags
- a `<script type="text/x-dc" data-dc-script>` block holding `class Component extends DCLogic { … }`
- a `data-props` JSON attribute on that script tag, describing editable props

`support.js` (in this folder) is the runtime that compiles the template into React and mounts it. The custom tags you will see:

| Tag / attribute | Means |
| --- | --- |
| `<sc-for list="{{items}}" as="item">` | map over a list; `$index` in scope |
| `<sc-if value="{{flag}}">` | conditional render |
| `<dc-import name="Site Nav" current="areas">` | mount the sibling `Site Nav.dc.html` with props |
| `{{ path }}` | dotted lookup into values returned by `renderVals()` |
| `style-hover="…"` | hover styles (no CSS classes) |
| `hint-*` attributes | streaming placeholders only — discard them |

Translating each is mechanical: `sc-for` → `.map()`, `sc-if` → `&&` / ternary, `dc-import` → a React/Astro component import, `renderVals()` → component state and derived values, `style-hover` → a CSS class or Tailwind `hover:` variant. Everything else is ordinary inline-styled HTML you can lift verbatim.

The pages open in a browser directly (double-click `Homepage.dc.html`) as long as `support.js` sits beside them, so use them as the live visual reference while you rebuild.

## Fidelity

**High-fidelity.** Colors, type, spacing, copy and interaction behavior are all final and client-approved. Match them exactly. Where you see a value in the HTML, that value is the spec.

---

## Design tokens

These are not in a stylesheet — they are inlined throughout the pages. Extract them into your framework's token layer first.

### Color

| Role | Value | Used for |
| --- | --- | --- |
| Navy (primary ground) | `#0d1b2e` | nav bar, dark sections, footer top |
| Navy deep | `#0a1524` | hero base, footer |
| Gold (accent) | `#f5b301` | CTAs, kickers, stat numbers, accent rules |
| Gold deep (on light) | `#9a7500` | kicker text on light grounds (contrast-safe) |
| Cream | `#f4f0e6` | alternating light section ground |
| White | `#ffffff` | primary light ground |
| Ink | `#1a2230` | headings on light |
| Body text | `#5a6272` | paragraphs on light |
| Hairline | `#e6e1d3` / `#eee9dc` | borders and dividers on light |
| Text on dark | `#ffffff`, `rgba(255,255,255,.82)`, `rgba(255,255,255,.72)` | headings / body / muted on navy |
| Border on dark | `rgba(255,255,255,.14)` | dividers, dropdown edges |

CSS custom properties in the source: `--hx` = gold `#f5b301`, `--hxd` = gold deep `#9a7500`.

### Type

Two families, both web-loaded:

- **Open Sauce One** (800) — headings. Loaded from `db.onlinewebfonts.com`; buy or self-host a licensed copy for production.
- **Plus Jakarta Sans** (400/500/600/700/800) — body, UI, kickers. Google Fonts.

| Element | Spec |
| --- | --- |
| H1 | Open Sauce One 800, `clamp(42px,5.4vw,74px)`, line-height 1.06, letter-spacing −.015em |
| H2 (section) | Open Sauce One 800, `clamp(30px,3.4vw,42px)`, line-height 1.14 |
| Kicker | Plus Jakarta Sans 600, 11.5px, letter-spacing .28em, uppercase |
| Lead paragraph | Plus Jakarta Sans 400, 17.5px, line-height 1.65 |
| Body | Plus Jakarta Sans 400, 15.5–16px, line-height 1.65–1.7 |
| Nav link | Plus Jakarta Sans 600, 12px, letter-spacing .12em, uppercase |
| Button | Plus Jakarta Sans 700, 13px, padding 12×22px |
| Stat number | Open Sauce One 700, 44px |

Emphasis inside headings is done with `<em>` set to `font-style:normal` plus a gold color or weight shift — not italics.

### Layout and spacing

- Content max-width `1180px`, centered, horizontal padding `28px`.
- Narrow content blocks cap at `640–900px`.
- Section vertical rhythm: `104px` desktop, fluid as `clamp(60px,9vw,104px)` on the newer pages. Use the fluid form throughout.
- Border radius: `14px` on cards and photos, `12px` on dropdowns, `6px` on the logo. Buttons are pill-to-rounded per the `.sn-cta` / `.hx-cta` rules.
- Mobile breakpoint: `window.innerWidth < 1120` switches the nav to the hamburger menu. Make this a CSS media query in the rebuild rather than a JS resize listener.
- All layout is flex/grid with `gap`. Grids use `repeat(auto-fit,minmax(Npx,1fr))` — keep that so they reflow.

### Non-negotiable content rule

Phone number is **+1 833 736-8793** — display as `(833) 736-8793`, link as `tel:+18337368793`. **Every primary CTA is a `tel:` link, not a form.** There is no lead form on the site except the newsletter/contact blocks that are explicitly styled as such. Do not substitute a contact form for a call CTA.

---

## Pages

Nine page templates plus two shared components. Suggested routes on the right.

| File | Route | Notes |
| --- | --- | --- |
| `Homepage.dc.html` | `/` | The big one (~168 KB). Video hero, 15 sections. |
| `Services.dc.html` | `/services` | Index of the 10 services. |
| `Service.dc.html` | `/services/[slug]` | One template, driven by a `?service=` query param. |
| `Service Area.dc.html` | `/roofing/[city]` | One template, driven by `?area=` — 8 cities. |
| `Our Work.dc.html` | `/our-work` | Project gallery, before/after. |
| `About.dc.html` | `/about` | Founder story (JJ). |
| `Process.dc.html` | `/process` | Five-step process. |
| `Journal.dc.html` | `/journal` | Blog index. |
| `Contact.dc.html` | `/contact` | |
| `Site Nav.dc.html` | component | Fixed nav, three dropdowns, mobile sheet. Takes a `current` prop for the active state. |
| `Site Footer.dc.html` | component | |
| `estimator.html` | standalone | A roofing quote estimator, plain HTML/JS — ships as-is or ports directly. |

### Homepage sections, in DOM order

Each is marked in the source with a `data-screen-label` attribute — grep for it to jump to any section.

1. **Navbar** — fixed, transparent over the hero, gains a solid navy ground on scroll.
2. **Video hero** — full-viewport `assets/hero-video-2.mp4`, autoplay/muted/loop, `assets/hero-poster.jpg` poster, layered navy gradient scrim, kicker + H1 + lead + two CTAs. (A `Hero (split)` variant exists behind a prop; the video hero is the shipped one.)
3. **Why us comparison** — two-column "them vs us" table, white card on hairline border.
4. **Stats bar** — four navy cells, gold numbers, 1px gaps.
5. **Materials band** — manufacturer badges incl. `assets/iko-roofpro-badge.png`.
6. **Welcome / about** — image + copy, the JJ story (25 years in the trade, 20 as an insurance adjuster).
7. **Our work** — a featured before/after **drag slider** (`clip-path: inset(0 N% 0 0)` driven by pointer position), then project cards.
8. **Services** — 10 service cards on cream.
9. **Gallery** — a 3D coverflow carousel is the shipped variant; turntable and auto-slider variants exist behind props.
10. **Testimonials** — photographic ground (`assets/testimonial-bg.png`) under a navy gradient, rating card, quote carousel.
11. **Process** — five-step carousel, `assets/proc-1…5.png`.
12. **What we install** — materials grid on cream.
13. **FAQ** — accordion beside `assets/faq-photo.png`.
14. **Secondary CTA** — full-bleed photo, navy scrim, centered call-to-action.
15. **Footer** — navy, sitemap columns, phone CTA.

### Service Area sections

Area hero → gold credibility bar → local intro → quick answers (parallax navy) → services → gallery → testimonials → process → why us → FAQ → nearby areas → closing CTA.

Eight area slugs: `san-antonio`, `new-braunfels`, `austin`, `san-marcos`, `boerne`, `fredericksburg`, `schertz`, `hill-country`. Per-area copy lives in a data object in that file's logic class — lift it into a CMS collection or a JSON/MDX file and render the template per route. **Rebuild these as real static routes** (`/roofing/san-antonio`), not query params; the query-param approach was a prototype convenience and is bad for SEO on local-service pages.

### Services

Ten services, in nav order: Roof Replacement & Re-Roofing, Roof Repair, Roof Inspections, Storm Damage & Insurance Claims, Gutter Installation, New Construction Roofing, Roof Maintenance & Care Plans, Temporary Emergency Services, Skylight Installation & Repair, Commercial & Flat Roofing. Same note: give each a real route.

---

## Interactions to reproduce

- **Nav scroll state** — transparent → solid navy past the hero. Currently a scroll listener toggling a class; keep it cheap.
- **Nav dropdowns** — hover-open on desktop (Services, Service Areas, About), tap-open in the mobile sheet. Add keyboard access in the rebuild; the prototype is mouse-only.
- **Mobile menu** — full-width sheet below the 96px nav bar, `< 1120px`.
- **Before/after sliders** — pointer-drag revealing the "after" image via `clip-path: inset(0 N% 0 0)`. Used on the homepage featured transformation and in Our Work.
- **Gallery coverflow** — 3D `perspective` + `translateZ` card ring, arrow-driven.
- **Process carousel** — stepped, five items.
- **Testimonial carousel** — arrow-driven.
- **Auto-scrolling strips** — CSS `@keyframes` translate with a mask-image fade at both edges; `animation-play-state: paused` on hover.
- **FAQ accordion** — one open at a time.
- **All hover states** are inline `style-hover` in the source; collect them into your CSS layer.

Add what a prototype skips: `:focus-visible` rings, `prefers-reduced-motion` handling for the carousels and auto-scrollers, and `aria-expanded` / `aria-controls` on the accordion and dropdowns.

## Assets

Everything referenced is in `assets/` (~70 files) and already final:

- `hero-video-2.mp4` + `hero-poster.jpg` — hero video and its poster.
- `logo.png`, `logo-light.png`, `logo-reversed.svg` — the light one is used in the navy nav.
- `iko-roofpro-badge.png` — IKO ROOFPRO certification.
- `svc-*.jpg` / `svc-*.png` — per-service photography (two treatments per service: card and hero).
- `proj1/2/3-before|mid|after.png`, `welcome-before|after.png`, `owner-before|after.png` — before/after pairs for the sliders.
- `proc-1…5.png` and `process-1…5.png` — two process image sets; `proc-*` is the one in use.
- `area-*`, `journal-*`, `faq-*`, `testimonial-bg`, `founder.jpg`, `modern-roof-parallax.jpg`, `cta-parallax-roof.jpg`.

For production: convert the JPG/PNG set to WebP/AVIF with responsive `srcset`, and compress the hero video (it is the single largest file in this bundle) or replace it with a poster + lazy-loaded video.

The `uploads/` folder is working scratch — original client uploads and duplicate design-system files. Ignore it; nothing in the site references it.

## Suggested rebuild order

1. Scaffold the framework, install the two fonts, port the tokens above into CSS variables or a Tailwind theme.
2. Build `SiteNav` and `SiteFooter` as components — every page uses them.
3. Build the shared primitives the pages repeat: section shell, kicker + H2 heading block, service card, project card, stat cell, FAQ accordion, before/after slider, carousel.
4. Homepage, section by section, top to bottom, against the open prototype.
5. Services index → service detail template → move the 10 services into data.
6. Service area template → move the 8 areas into data → real static routes.
7. About, Process, Our Work, Journal, Contact.
8. Port or drop in `estimator.html`.
9. SEO pass: titles, meta descriptions, LocalBusiness + Service schema per page, sitemap. The area and service pages are the whole point of the site's search strategy.
10. Accessibility and performance pass.

## Housekeeping

- `github.md` records the intended repo: `max-capacity-agency/sentryrg`, branch `main`. It was empty at the time of this handoff.
- `CLAUDE.md` holds the standing project rules (the phone number, the `tel:` CTA rule, the brand spelling). Carry it into the new repo.
- `_ds/` and `ds-base.js` are a design-system loader from the authoring environment. **Not used by these pages** — the site has its own visual language documented above. Ignore both.
- `support.js` is the authoring runtime. Keep it only while you use the prototypes as reference; it does not belong in the production repo.
