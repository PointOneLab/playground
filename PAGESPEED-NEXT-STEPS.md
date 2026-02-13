# PageSpeed Insights: Next Steps Action Plan

**Site:** www.pointonelab.com  
**Report Date:** February 13, 2026  
**Tool:** Google PageSpeed Insights (Lighthouse 13.0.1)

---

## Current Scores

| Category | Mobile | Desktop |
|---|---|---|
| **Performance** | **19** (Poor) | **44** (Poor) |
| Accessibility | 88 | 88 |
| Best Practices | 100 | 100 |
| SEO | 91 | 91 |

---

## Core Web Vitals (Mobile)

| Metric | Value | Target | Status |
|---|---|---|---|
| **First Contentful Paint (FCP)** | 11.9s | < 1.8s | FAIL — first thing users see takes nearly 12 seconds |
| **Largest Contentful Paint (LCP)** | 15.0s | < 2.5s | FAIL — main content takes 15 seconds to appear |
| **Cumulative Layout Shift (CLS)** | 0.302 | < 0.1 | FAIL — page elements visibly jump around while loading |
| **Total Blocking Time (TBT)** | ~530ms | < 200ms | FAIL — page is frozen/unresponsive for over half a second |
| **Speed Index** | ~12.0s | < 3.4s | FAIL — the page visually loads very slowly |

---

## Why the Score Is So Low — The Big Picture

The performance score of 19 (mobile) / 44 (desktop) is driven by a handful of root causes that all compound on each other:

- **Too many render-blocking resources** — the browser can't show anything until CSS and certain JS files finish downloading
- **Massive page weight** — 5.4 MB of total assets (images, fonts, scripts) is far too heavy, especially for mobile
- **Too many images without optimization** — 30+ images are PNGs/JPEGs that could be WebP, and many lack proper dimensions
- **Heavy JS that runs immediately** — hls.js (video player library) loads on every page even if there's no video, blocking the main thread
- **No font-display strategy** — custom fonts block text from appearing until they download

---

## Issues Action Plan

### Opportunities (Things That Save Time or Bytes)

| # | Issue | Plain Language Explanation | Steps to Fix | Effort | Can AI Do It? | Where |
|---|---|---|---|---|---|---|
| 1 | **Render-blocking resources** (4,650ms mobile / 770ms desktop) | The browser can't paint anything on screen until the Webflow CSS file and hls.js script finish downloading. On a slow mobile connection, this alone wastes 4.6 seconds of staring at a blank page. | (a) Load hls.js only on pages that have video, not globally. (b) Add `media="print" onload="this.media='all'"` pattern or `rel="preload"` for the Webflow CSS if possible. (c) Mark non-critical scripts as `async` or `defer`. | Medium | **Partially** — I can change how hls.js loads in bundle.js (conditionally). Webflow's own CSS loading can't be changed from custom code. | `bundle.js` source code + `head.html` custom code |
| 2 | **Improve image delivery** (891 KiB mobile) | About 30 images are served as uncompressed PNG/JPEG when they could be WebP or AVIF — modern formats that are 25-50% smaller at the same quality. | (a) Re-export all portfolio images as WebP (or let Webflow auto-convert if available). (b) Resize images to the actual display size — don't serve a 2000px image for a 400px slot. (c) Use `<picture>` elements with WebP + fallback where possible. | **High** | **No** — images are hosted in Webflow CMS. You need to re-upload optimized versions through the Webflow Designer/Asset Manager. | Webflow CMS → Asset Manager |
| 3 | **Reduce unused JavaScript** (341 KiB) | `hls.js` (video player) is ~350KB and loads on every page, but most pages don't have video. Google Analytics also ships unused code. | (a) Conditionally load hls.js only when a `<video>` element exists on the page. (b) Consider using `hls.js/dist/hls.light.min.js` (lighter build). (c) Evaluate if gtag needs to load synchronously. | Medium | **Yes** — I can modify the bundle to conditionally load hls.js. | `bundle.js` source code |
| 4 | **Font display** (290ms) | Three custom fonts (7segment, Roboto Variable, RobotoSlab Variable) block all text from showing until they download. Users see invisible text for 290ms+ on desktop (much worse on mobile). | (a) Add `font-display: swap` to all @font-face declarations so text shows immediately with a fallback font. (b) Preload the most critical font (Roboto) with `<link rel="preload" as="font">`. | **Low** | **Yes** — I can add @font-face overrides with `font-display: swap` in `head.html` and add preload links. | `head.html` custom code |
| 5 | **Efficient cache lifetimes** (731 KiB) | Fonts and scripts have short cache headers, meaning the browser re-downloads ~731KB of assets on every repeat visit instead of using cached copies. | (a) Set long `Cache-Control` headers for static assets (fonts, JS bundles) — e.g. `max-age=31536000, immutable`. (b) Use versioned filenames (e.g. `bundle.v2.js`) so you can safely set long cache times. | Low-Medium | **Partially** — I can set headers in `vercel.json` for assets we host. Webflow-hosted fonts and Finsweet CDN scripts are outside our control. | `vercel.json` + CDN configuration |
| 6 | **Minify JavaScript** (7 KiB) | A small portion of `bundle.js` is not fully minified — whitespace and comments remain. | Run `terser` or `uglifyjs` on the bundle during the build step. | **Very Low** | **Yes** — I can update the build script to add minification. | `build.sh` |

### Diagnostics (Things That Indicate Problems)

| # | Issue | Plain Language Explanation | Steps to Fix | Effort | Can AI Do It? | Where |
|---|---|---|---|---|---|---|
| 7 | **Layout shift culprits** (CLS: 0.302) | Elements on the page visibly jump/move as content loads. Users try to click something and it moves out of the way. This is caused by images without dimensions, fonts swapping in, and late-loading content. | (a) Add explicit `width` and `height` to all `<img>` tags (or CSS aspect-ratio). (b) Apply `font-display: swap` + font metric overrides. (c) Reserve space for dynamically loaded content. | Medium-High | **Partially** — font fixes I can do. Image dimensions need Webflow Designer changes. | Webflow Designer + `head.html` |
| 8 | **Image elements missing width/height** (30+ images) | When images don't have width/height attributes, the browser doesn't know how much space to reserve. So the page "jumps" every time an image finishes loading. | Add explicit `width` and `height` attributes to every `<img>` element in Webflow. | Medium | **No** — this is set per-image in Webflow Designer's image settings. | Webflow Designer |
| 9 | **Forced reflow** (bundle.js) | Our JavaScript reads layout properties (like element width/height) and then immediately changes the DOM — forcing the browser to recalculate layout multiple times. This is slow. | Batch all DOM reads before DOM writes. Use `requestAnimationFrame()` for write operations. Avoid reading `.offsetWidth` or `.getBoundingClientRect()` right before changing styles. | **High** | **Yes** — this is in our own `bundle.js` code (main-ui.js, dynamic-sizing.js). Requires careful refactoring. | Source JS files → rebuild |
| 10 | **LCP not optimized** (hero image) | The largest visible element (hero image) is not loading as fast as it could. It doesn't have `fetchpriority="high"`, and lazy loading may be interfering. | (a) Add `fetchpriority="high"` to the hero/main image. (b) Ensure the hero image is NOT lazy-loaded (remove `loading="lazy"` from above-the-fold images). (c) Preload the hero image with `<link rel="preload" as="image">` in the head. | **Low** | **Partially** — I can add a preload link in `head.html`. The `fetchpriority` and `loading` attributes need to be set on the actual `<img>` element in Webflow Designer. | `head.html` + Webflow Designer |
| 11 | **Minimize main-thread work** (3.6s mobile / 2.0s desktop) | The browser's main thread (which handles rendering, scrolling, and interaction) is busy for 3.6 seconds on mobile. During this time, the page feels frozen. | (a) Defer non-critical JS. (b) Break up long-running functions. (c) Remove or lazy-load third-party scripts. (d) Reduce DOM complexity. | **High** | **Partially** — I can optimize our JS code and loading strategy. Webflow's own JS and third-party scripts are harder to control. | Source JS + `head.html` + `footer.html` |
| 12 | **Reduce JavaScript execution time** (1.4s) | JavaScript alone takes 1.4 seconds to execute. The main culprits are: `bundle.js`, `hls.js`, and Webflow's own JS. | (a) Conditionally load hls.js. (b) Code-split bundle.js so only needed code runs per page. (c) Defer non-critical initialization. | Medium-High | **Partially** — bundle.js changes yes, Webflow JS changes no. | Source JS + build configuration |
| 13 | **Avoid long main-thread tasks** (5 long tasks) | Five separate JavaScript tasks each run for over 50ms, freezing the page. Major offenders: Webflow's chunk loader, Google Analytics (x2), and hls.js (x2). | (a) Defer Google Analytics with `setTimeout`. (b) Lazy-load hls.js. (c) Can't easily fix Webflow's own chunk loader. | Medium | **Partially** — I can defer gtag and hls.js loading in custom code. Webflow's core JS is not in our control. | `head.html` / `footer.html` |
| 14 | **Enormous network payloads** (5,476 KiB) | The total page download is 5.4 MB — Google recommends staying under 1.6 MB. The biggest offenders are images (~3MB), fonts (~700KB), and scripts (~900KB). | This is a roll-up of images, fonts, and scripts issues above. Fix those individually to bring total down. | **High** | **Partially** — script optimization yes, image/font optimization mostly requires Webflow changes. | Multiple areas |
| 15 | **Optimize DOM size** | The page has an excessive number of HTML elements (DOM nodes). More nodes = slower rendering, slower JS queries, more memory usage. | Simplify page structure in Webflow — reduce unnecessary wrapper divs, remove hidden/unused sections. | **High** | **No** — page structure is built entirely in Webflow Designer. | Webflow Designer |
| 16 | **Network dependency tree** (critical chains) | Resources depend on other resources in a long chain: HTML → CSS → fonts, HTML → JS → more JS → API calls. Each link in the chain adds delay. | (a) Preload critical resources (fonts, hero image). (b) Inline critical CSS. (c) Reduce chain depth by loading resources in parallel. | Medium | **Partially** — I can add more `<link rel="preload">` tags in `head.html`. | `head.html` |
| 17 | **3rd party scripts** (multiple) | External scripts (Finsweet CMS x3, Google Analytics, hls.js, Webflow JS) collectively add significant weight and processing time. | (a) Audit if all Finsweet plugins are needed. (b) Defer Google Analytics. (c) Lazy-load hls.js. (d) Consider lighter alternatives. | Medium | **Partially** — loading strategy changes yes, removing features no. | `head.html` + `footer.html` |
| 18 | **Duplicated JavaScript** | Some JavaScript modules are loaded more than once. | Audit the bundle for duplicate modules and remove them. | **Low** | **Yes** — I can check and fix duplicates in the build. | Build configuration |

### Non-Performance Issues

| # | Issue | Plain Language Explanation | Steps to Fix | Effort | Can AI Do It? | Where |
|---|---|---|---|---|---|---|
| 19 | **Missing meta description** (SEO) | The page has no meta description — the short summary that shows up in Google search results below your page title. | Add a meta description in Webflow's page settings (SEO tab). | **Very Low** | **No** — this is a Webflow page setting, not custom code. | Webflow → Page Settings → SEO |
| 20 | **Form elements missing labels** (A11y) | Some form inputs don't have labels, making them inaccessible to screen readers. | Add labels to all form elements in Webflow Designer. | **Low** | **No** — form structure is in Webflow Designer. | Webflow Designer |
| 21 | **Links missing discernible names** (A11y) | Some links (likely icon-only links) don't have readable text, so screen readers can't describe them. | Add `aria-label` attributes to icon-only links in Webflow. | **Low** | **No** — link structure is in Webflow Designer. | Webflow Designer |

---

## Priority Roadmap (Ranked by Impact)

### Tier 1: Quick Wins (Do First — Biggest Bang for Buck)

| Priority | Issue | Expected Impact | Effort |
|---|---|---|---|
| **P1** | Conditionally load hls.js (only on video pages) | Saves ~350KB download + eliminates 2 long tasks on non-video pages | Medium |
| **P2** | Add `font-display: swap` + preload critical fonts | Eliminates 290ms font blocking + reduces CLS | Low |
| **P3** | Preload hero image + add `fetchpriority="high"` | Directly improves LCP (the biggest metric) | Low |
| **P4** | Defer Google Analytics loading | Eliminates 2 long tasks from main thread | Low |

### Tier 2: Medium Effort (Do Next)

| Priority | Issue | Expected Impact | Effort |
|---|---|---|---|
| **P5** | Optimize and re-upload images as WebP in Webflow | Could save ~1-2MB (the single biggest payload reduction) | High (manual) |
| **P6** | Add explicit width/height to images in Webflow | Directly fixes CLS (layout shift) | Medium (manual) |
| **P7** | Improve cache headers in vercel.json | Saves ~731KB on repeat visits | Low |
| **P8** | Fix forced reflows in bundle.js | Reduces main-thread work | High |

### Tier 3: Longer Term

| Priority | Issue | Expected Impact | Effort |
|---|---|---|---|
| **P9** | Simplify Webflow DOM structure | Faster rendering and JS execution | High (manual) |
| **P10** | Code-split bundle.js per page type | Only load what each page needs | High |
| **P11** | Audit and remove unused Finsweet plugins | Fewer 3rd party scripts | Low |
| **P12** | Better minification of bundle.js | Saves ~7KB | Very Low |

---

## What I Can Do for You Right Now

Based on the analysis above, here are the things I can implement immediately in the custom code:

1. **Conditionally load hls.js** — modify `bundle.js` to only load the video player when a `<video>` element exists on the page
2. **Add `font-display: swap` overrides** — inject @font-face rules in `head.html` for 7segment, Roboto, and RobotoSlab
3. **Preload the hero image** — add `<link rel="preload">` for the main above-the-fold image
4. **Defer Google Analytics** — wrap gtag in a `setTimeout` or `requestIdleCallback` so it doesn't block initial load
5. **Add font preloading** — `<link rel="preload" as="font">` for the most critical font
6. **Improve cache headers** — update `vercel.json` with proper cache-control for static assets
7. **Fix JS minification** — update build script to fully minify

### What Requires Your Action in Webflow

These cannot be done through custom code — you'll need to make changes in the Webflow Designer:

1. **Re-upload images as WebP** (biggest single improvement)
2. **Set explicit width/height on all images** (fixes layout shifts)
3. **Add fetchpriority="high"** to the hero image
4. **Remove `loading="lazy"` from above-the-fold images**
5. **Add meta description** in page SEO settings
6. **Add labels to form elements**
7. **Add aria-labels to icon-only links**
8. **Simplify DOM structure** (reduce wrapper divs)

---

## Expected Score Improvements

If we implement Tier 1 + Tier 2 changes:

| Metric | Current (Mobile) | Estimated After | Improvement |
|---|---|---|---|
| FCP | 11.9s | ~4-6s | Better but still limited by Webflow CSS render-blocking |
| LCP | 15.0s | ~5-8s | Significant improvement from image optimization + preloading |
| CLS | 0.302 | ~0.05-0.1 | Near-passing with font-display + image dimensions |
| TBT | ~530ms | ~200-300ms | Better from deferring hls.js + analytics |
| **Performance Score** | **19** | **~40-60** | Meaningful jump, but reaching 90+ requires Webflow-level changes |

> **Honest note:** Reaching a 90+ performance score on a Webflow site with heavy imagery, multiple third-party scripts, and a complex DOM is very challenging. Webflow's own CSS and JS loading patterns are not optimizable from custom code. The realistic target is **60-75 on mobile** and **80-90 on desktop** after all optimizations.
