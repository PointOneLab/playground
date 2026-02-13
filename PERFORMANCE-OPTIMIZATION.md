# Performance Optimization Initiative

**Project:** PointOneLab Playground  
**Date:** February 13, 2026  
**Goal:** Reduce page load time by minimizing HTTP requests, eliminating unminified assets, unifying CDN origins, and optimizing script/style loading strategy.

---

## Table of Contents

- [Current Performance Audit](#current-performance-audit)
- [Optimization Steps (Ranked by Impact)](#optimization-steps-ranked-by-impact)
  - [Step 1 — Bundle All Footer Scripts Into One File](#step-1--bundle-all-footer-scripts-into-one-file)
  - [Step 2 — Add defer and preload to the Bundle](#step-2--add-defer-and-preload-to-the-bundle)
  - [Step 3 — Inline Prism CSS Into the Head](#step-3--inline-prism-css-into-the-head)
  - [Step 4 — Consolidate Head Style Blocks](#step-4--consolidate-head-style-blocks)
  - [Step 5 — Consolidate Footer Inline Scripts](#step-5--consolidate-footer-inline-scripts)
  - [Step 6 — Update Library Versions](#step-6--update-library-versions)
  - [Step 7 — Fix applyCurrentMode Duplication](#step-7--fix-applycurrentmode-duplication)
- [Before vs After Comparisons](#before-vs-after-comparisons)
  - [Head Code](#head-code-before--after)
  - [Footer Code](#footer-code-before--after)
  - [Repository Structure](#repository-structure-before--after)
  - [Network Requests](#network-requests-before--after)
  - [CDN Origins](#cdn-origins-before--after)
  - [Asset Sizes](#asset-sizes-before--after)

---

## Current Performance Audit

### Problems Identified

| Problem | Detail |
|---|---|
| **19 blocking script requests** | Each `<script>` in the footer loads sequentially — the browser must download, parse, and execute one before starting the next |
| **3 separate CDN origins** | `cdnjs.cloudflare.com`, `unpkg.com`, `cdn.jsdelivr.net` — each requires its own DNS lookup (~20-100ms) and TLS handshake (~50-150ms) |
| **2 unminified libraries** | `rough.js` (full bundle, ~120KB) and `typed.js` (~30KB) are loaded without minification |
| **Prism CSS in footer** | The Prism theme stylesheet is loaded as a `<link>` in the footer — triggers a late layout shift |
| **7 separate `<style>` blocks in head** | Adds unnecessary parsing overhead and DOM nodes |
| **3 inline `<script>` blocks in footer** | Two are nearly identical scroll-prevention handlers |
| **Duplicate function definition** | `applyCurrentMode()` is defined in both `dark-light-mode.js` and `info-guide-visibility.js` |
| **Outdated library versions** | GSAP 3.11.5, rough.js 4.5.2, Prism 1.29.0, Typed.js 2.0.9 |

### Current Footer Script Loading Sequence (19 blocking requests)

```
Request  Origin              File                        Minified?   ~Size
──────── ─────────────────── ─────────────────────────── ─────────── ──────
 1       cdnjs.cloudflare    gsap.min.js                 Yes         ~70KB
 2       cdnjs.cloudflare    Draggable.min.js            Yes         ~30KB
 3       unpkg.com           rough.js                    NO          ~120KB
 4       cdn.jsdelivr.net    get-page-id.js              No (src)    2.4KB
 5       cdn.jsdelivr.net    collection-visibility.js    No (src)    1.1KB
 6       cdn.jsdelivr.net    itemhovershow-sizing.js     No (src)    1.4KB
 7       cdn.jsdelivr.net    audio-processing.js         No (src)    0.6KB
 8       cdn.jsdelivr.net    widget-code-injection.js    No (src)    1.0KB
 9       cdn.jsdelivr.net    posts-structure.js          No (src)    2.1KB
10       cdnjs.cloudflare    prism.min.js                Yes         ~18KB
11       cdn.jsdelivr.net    code-display.js             No (src)    1.6KB
12       cdn.jsdelivr.net    info-guide-visibility.js    No (src)    2.4KB
13       cdn.jsdelivr.net    dark-light-mode.js          No (src)    4.5KB
14       cdnjs.cloudflare    typed.js                    NO          ~30KB
15       cdn.jsdelivr.net    typewriter.js               No (src)    0.4KB
16       cdn.jsdelivr.net    main-ui.js                  No (src)    24.7KB
17       cdn.jsdelivr.net    dynamic-sizing.js           No (src)    0.9KB
18       cdn.jsdelivr.net    dev-mode.js                 No (src)    9.8KB
         cdnjs.cloudflare    prism-tomorrow.min.css      Yes (CSS)   ~2KB
```

**Estimated sequential network overhead: ~900–1,400ms** (depending on connection speed and latency).

---

## Optimization Steps (Ranked by Impact)

Steps are ranked by **estimated time savings** — highest ROI first.

---

### Step 1 — Bundle All Footer Scripts Into One File

| | |
|---|---|
| **Estimated savings** | **800–1,200ms** |
| **Effort** | Medium |
| **Risk** | Low (order-preserving concatenation) |

#### What This Does

Combines all 6 vendor libraries and 13 project scripts into a **single file** (`dist/bundle.min.js`), served from **one CDN origin** (`cdn.jsdelivr.net`). This collapses 19 sequential HTTP requests into 1.

#### Why This Is #1

Every blocking `<script>` tag forces the browser to:
1. Open a connection (or wait for an existing one)
2. Send the HTTP request
3. Wait for the server response (TTFB)
4. Download the file
5. Parse and execute it
6. **Only then** move to the next `<script>`

Even on a fast connection, each request takes **30–100ms minimum** due to network latency. With 19 requests in series, this compounds to nearly a second of pure waiting.

Additionally, this step eliminates:
- **2 extra DNS lookups** (cdnjs.cloudflare.com, unpkg.com) — each ~20-100ms
- **2 extra TLS handshakes** — each ~50-150ms
- **Unminified payloads** — rough.js and typed.js are bundled as their minified versions, saving ~93KB

#### What Needs to Happen

**1. Create a `vendor/` folder in the repo and download minified vendor libs into it:**

```
vendor/
├── gsap.min.js            (from cdnjs, v3.14.2)
├── Draggable.min.js       (from cdnjs, v3.14.2)
├── rough.min.js           (from unpkg, v4.6.6 — use the .min.js)
├── prism.min.js           (from cdnjs, v1.30.0)
└── typed.min.js           (from cdnjs, v2.1.0 — use the .min.js)
```

**2. Create a build script (`build.sh`) that concatenates everything in dependency order:**

```
Bundle order (dependency-safe):
─────────────────────────────────
 1. vendor/gsap.min.js              ← GSAP core (required by Draggable)
 2. vendor/Draggable.min.js         ← GSAP plugin
 3. vendor/rough.min.js             ← independent
 4. vendor/prism.min.js             ← independent
 5. vendor/typed.min.js             ← independent
 6. get-page-id.js                  ← resolves CMS data first
 7. collection-visibility.js
 8. itemhovershow-sizing.js
 9. audio-processing.js
10. widget-code-injection.js
11. posts-structure.js
12. code-display.js                 ← uses Prism (loaded above)
13. info-guide-visibility.js
14. dark-light-mode.js
15. typewriter.js                   ← uses Typed (loaded above)
16. main-ui.js                     ← uses GSAP/Draggable/rough
17. dynamic-sizing.js
18. dev-mode.js                    ← depends on main-ui.js globals
```

**3. Output to `dist/bundle.min.js` and commit to the repo.**

**4. Replace all 19 `<script>` tags in the footer with one:**

```html
<script src="https://cdn.jsdelivr.net/gh/PointOneLab/playground@main/dist/bundle.min.js"></script>
```

> Note: Using `@main` pins to the main branch. For cache-busting on updates, you can use a specific commit hash or tag.

#### Dependency Order Matters

| File | Depends On |
|---|---|
| `Draggable.min.js` | `gsap.min.js` |
| `code-display.js` | `prism.min.js` |
| `typewriter.js` | `typed.min.js` |
| `main-ui.js` | `gsap`, `Draggable`, `rough`, `applyCurrentMode()` |
| `dev-mode.js` | globals from `main-ui.js` |

The bundle order listed above respects all of these.

---

### Step 2 — Add defer and preload to the Bundle

| | |
|---|---|
| **Estimated savings** | **200–500ms** |
| **Effort** | Trivial |
| **Risk** | Very low |

#### What This Does

By default, `<script>` tags block HTML parsing. Adding `defer` lets the browser **download the script in parallel** with parsing the rest of the page, then execute it after parsing completes (which fires before `DOMContentLoaded`).

Adding a `<link rel="preload">` in the `<head>` tells the browser to **start downloading the bundle immediately** — even before it reaches the `<script>` tag in the footer.

#### Why This Works

All 13 project scripts already wait for `DOMContentLoaded`, so they are inherently compatible with `defer`. The `defer` attribute guarantees execution before `DOMContentLoaded` fires, so behavior is preserved.

#### What Needs to Happen

**1. In the head code, add a preload hint (before the loading overlay script):**

```html
<link rel="preload" href="https://cdn.jsdelivr.net/gh/PointOneLab/playground@main/dist/bundle.min.js" as="script">
```

**2. In the footer, add `defer` to the bundle script tag:**

```html
<script defer src="https://cdn.jsdelivr.net/gh/PointOneLab/playground@main/dist/bundle.min.js"></script>
```

---

### Step 3 — Inline Prism CSS Into the Head

| | |
|---|---|
| **Estimated savings** | **50–100ms** |
| **Effort** | Trivial |
| **Risk** | None |

#### What This Does

The Prism theme CSS (`prism-tomorrow.min.css`) is currently loaded as a `<link>` in the **footer**. This means:
- The browser doesn't discover this CSS file until it reaches the footer
- Once discovered, it must fetch it (another HTTP request)
- Until loaded, code blocks may flash unstyled (layout shift)

By inlining the Prism CSS into the consolidated `<style>` block in the head, the styles are immediately available.

#### What Needs to Happen

**1. Download the contents of `prism-tomorrow.min.css` (~2KB)**

**2. Paste it into the head `<style>` block (see Step 4)**

**3. Remove the `<link>` tag from the footer**

---

### Step 4 — Consolidate Head Style Blocks

| | |
|---|---|
| **Estimated savings** | **10–30ms** |
| **Effort** | Trivial |
| **Risk** | None |

#### What This Does

The head currently has **7 separate `<style>` blocks**. Each one creates a new DOM node that the CSS parser must process independently. Merging them into one block reduces overhead and improves readability.

#### What Needs to Happen

Merge all 7 `<style>` blocks into a single `<style id="pol-global-styles">` block in this order:

```
1. Global user-select: none
2. Touch-action overrides (.pow-library-container, .pow-sticky)
3. Item handler hover states (.pow-item-handler, .pow-itemhovershow)
4. Select appearance reset
5. Rich text / code / audio / hr / details / summary / board guide styles
6. Dark mode / light mode CSS variable definitions
7. Guide and info group visibility rules
8. Prism theme CSS (moved from footer — see Step 3)
```

---

### Step 5 — Consolidate Footer Inline Scripts

| | |
|---|---|
| **Estimated savings** | **5–15ms** |
| **Effort** | Trivial |
| **Risk** | None |

#### What This Does

The footer has **3 inline `<script>` blocks**:
- Two are nearly identical scroll-prevention handlers (one for `.pow-content`, one for `.pow-info`)
- One is the selection-disabling CSS (already a `<style>`, fine as-is)

The two scroll handlers can be merged into a single `DOMContentLoaded` listener.

#### What Needs to Happen

**Before (2 separate scripts):**
```html
<script>
document.addEventListener('DOMContentLoaded', function() {
  var scrollableDiv = document.querySelector('.pow-content');
  scrollableDiv.addEventListener('mouseover', function() {
    document.body.style.overflow = 'hidden';
  });
  scrollableDiv.addEventListener('mouseout', function() {
    document.body.style.overflow = 'auto';
  });
});
</script>

<script>
document.addEventListener('DOMContentLoaded', function() {
  var scrollableDiv = document.querySelector('.pow-info');
  scrollableDiv.addEventListener('mouseover', function() {
    document.body.style.overflow = 'hidden';
  });
  scrollableDiv.addEventListener('mouseout', function() {
    document.body.style.overflow = 'auto';
  });
});
</script>
```

**After (1 merged script):**
```html
<script>
document.addEventListener('DOMContentLoaded', function() {
  ['.pow-content', '.pow-info'].forEach(function(selector) {
    var el = document.querySelector(selector);
    if (!el) return;
    el.addEventListener('mouseover', function() {
      document.body.style.overflow = 'hidden';
    });
    el.addEventListener('mouseout', function() {
      document.body.style.overflow = 'auto';
    });
  });
});
</script>
```

> Note: Added a null check (`if (!el) return`) for robustness — prevents errors if the element doesn't exist on a given page.

---

### Step 6 — Update Library Versions

| | |
|---|---|
| **Estimated savings** | **0–100ms** (variable, depends on internal lib optimizations) |
| **Effort** | Low |
| **Risk** | Low (test after updating) |

#### What This Does

Updates vendor libraries to their latest stable versions, which may include performance fixes, smaller file sizes, and bug fixes.

#### Version Updates

| Library | Current | Latest | Notes |
|---|---|---|---|
| GSAP core | 3.11.5 | 3.14.2 | Significant perf improvements in animation engine |
| GSAP Draggable | 3.11.5 | 3.14.2 | Must match GSAP core version |
| Rough.js | 4.5.2 | 4.6.6 | Bug fixes |
| Prism.js | 1.29.0 | 1.30.0 | Minor update |
| Typed.js | 2.0.9 | 2.1.0 | Bug fixes, smaller bundle |

> This step is already included in Step 1 if following the recommended approach (downloading latest versions into `vendor/`).

---

### Step 7 — Fix applyCurrentMode Duplication

| | |
|---|---|
| **Estimated savings** | **0ms** (correctness fix, not performance) |
| **Effort** | Low |
| **Risk** | Prevents potential bugs |

#### What This Does

`applyCurrentMode()` is currently defined in **both** `dark-light-mode.js` and `info-guide-visibility.js`. When bundled into a single file, the second definition will silently overwrite the first. Depending on which one `main-ui.js` expects to call, this could cause theme or guide-visibility bugs.

#### What Needs to Happen

- Audit both definitions of `applyCurrentMode()` to understand their differences
- Merge the logic into a single canonical definition in one file
- Have the other file import/reference it (or simply remove the duplicate)

---

## Before vs After Comparisons

### Head Code: Before & After

**BEFORE — 3 `<script>` blocks + 7 `<style>` blocks + 1 external async scripts block:**
```html
<!-- Loading overlay script (~300 lines inline) -->
<script>(function() { /* ... loader IIFE ... */ })();</script>

<!-- 3 Finsweet async scripts -->
<script async src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsfilter@1/cmsfilter.js"></script>
<script async src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmssort@1/cmssort.js"></script>
<script async src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsload@1/cmsload.js"></script>

<!-- 7 separate <style> blocks -->
<style>/* user-select: none */</style>
<style>/* touch-action overrides */</style>
<style>/* hover states */</style>
<style>/* select reset */</style>
<style>/* RTB, audio, code, hr, details, board guides */</style>
<style>/* dark/light mode vars + guide/info visibility */</style>
<style>/* body visibility: hidden */</style>

<!-- Dark mode init script -->
<script>(function() { /* ... dark mode check ... */ })();</script>

<!-- DOMContentLoaded script for mode/guide/info + body visible -->
<script>document.addEventListener("DOMContentLoaded", function() { /* ... */ });</script>
```

**AFTER:**
```html
<!-- Preload the bundle so download starts immediately -->
<link rel="preload" href="https://cdn.jsdelivr.net/gh/PointOneLab/playground@main/dist/bundle.min.js" as="script">

<!-- Loading overlay script (unchanged) -->
<script>(function() { /* ... loader IIFE ... */ })();</script>

<!-- 3 Finsweet async scripts (unchanged — already optimized) -->
<script async src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsfilter@1/cmsfilter.js"></script>
<script async src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmssort@1/cmssort.js"></script>
<script async src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsload@1/cmsload.js"></script>

<!-- 1 consolidated <style> block (includes Prism CSS moved from footer) -->
<style id="pol-global-styles">
  /* All styles merged: user-select, touch-action, hover, select,
     RTB/audio/code/hr/details/guides, dark-light vars,
     guide/info visibility, Prism theme */
</style>

<!-- Dark mode init script (unchanged — must run early) -->
<script>(function() { /* ... dark mode check ... */ })();</script>

<!-- DOMContentLoaded script (unchanged) -->
<script>document.addEventListener("DOMContentLoaded", function() { /* ... */ });</script>
```

**Changes:**
- Added 1 `<link rel="preload">`
- 7 `<style>` blocks → 1 (includes Prism CSS moved from footer)
- Everything else unchanged

---

### Footer Code: Before & After

**BEFORE — 19 blocking scripts + 1 CSS link + 3 inline blocks:**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/Draggable.min.js"></script>
<script src="https://unpkg.com/roughjs@4.5.2/bundled/rough.js"></script>
<script src="https://cdn.jsdelivr.net/gh/PointOneLab/playground/get-page-id.js"></script>
<script src="https://cdn.jsdelivr.net/gh/PointOneLab/playground/collection-visibility.js"></script>
<script src="https://cdn.jsdelivr.net/gh/PointOneLab/playground/itemhovershow-sizing.js"></script>
<script src="https://cdn.jsdelivr.net/gh/PointOneLab/playground/audio-processing.js"></script>
<script src="https://cdn.jsdelivr.net/gh/PointOneLab/playground/widget-code-injection.js"></script>
<script src="https://cdn.jsdelivr.net/gh/PointOneLab/playground/posts-structure.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/PointOneLab/playground/code-display.js"></script>
<script src="https://cdn.jsdelivr.net/gh/PointOneLab/playground/info-guide-visibility.js"></script>
<script src="https://cdn.jsdelivr.net/gh/PointOneLab/playground/dark-light-mode.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.9/typed.js"></script>
<script src="https://cdn.jsdelivr.net/gh/PointOneLab/playground/typewriter.js"></script>
<script src="https://cdn.jsdelivr.net/gh/PointOneLab/playground/main-ui.js"></script>
<script src="https://cdn.jsdelivr.net/gh/PointOneLab/playground/dynamic-sizing.js"></script>
<style>/* selection disable CSS */</style>
<script>/* .pow-content scroll handler */</script>
<script>/* .pow-info scroll handler */</script>
<script src="https://cdn.jsdelivr.net/gh/PointOneLab/playground/dev-mode.js"></script>
```

**AFTER:**
```html
<!-- Single bundled file: all vendor libs + all project scripts -->
<script defer src="https://cdn.jsdelivr.net/gh/PointOneLab/playground@main/dist/bundle.min.js"></script>

<!-- Selection disable (unchanged) -->
<style>
  ::selection { background: transparent; color: inherit; }
  ::-moz-selection { background: transparent; color: inherit; }
</style>

<!-- Merged scroll handler -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  ['.pow-content', '.pow-info'].forEach(function(selector) {
    var el = document.querySelector(selector);
    if (!el) return;
    el.addEventListener('mouseover', function() {
      document.body.style.overflow = 'hidden';
    });
    el.addEventListener('mouseout', function() {
      document.body.style.overflow = 'auto';
    });
  });
});
</script>
```

**Changes:**
- 19 `<script>` tags + 1 `<link>` → **1 `<script defer>`**
- 2 inline scroll scripts → 1 merged script
- Prism CSS moved to head (Step 3)

---

### Repository Structure: Before & After

**BEFORE:**
```
playground/
├── README.md
├── vercel.json
├── audio-processing.js          (0.6KB)
├── code-display.js              (1.6KB)
├── collection-visibility.js     (1.1KB)
├── dark-light-mode.js           (4.5KB)
├── dev-mode.js                  (9.8KB)
├── dynamic-sizing.js            (0.9KB)
├── get-page-id.js               (2.5KB)
├── info-guide-visibility.js     (2.4KB)
├── item-inquiry.js              (13.7KB)
├── itemhovershow-sizing.js      (1.4KB)
├── main-ui.js                   (24.7KB)
├── posts-structure.js           (2.1KB)
├── typewriter.js                (0.4KB)
├── widget-code-injection.js     (1.0KB)
└── storage/
    ├── 7segment.ttf
    ├── Roboto-VariableFont_wdth,wght.ttf
    └── RobotoSlab-VariableFont_wght.ttf
```

**AFTER:**
```
playground/
├── README.md
├── vercel.json
├── build.sh                         (NEW — build script)
│
├── vendor/                          (NEW — self-hosted libs)
│   ├── gsap.min.js                  (~70KB, v3.14.2)
│   ├── Draggable.min.js             (~30KB, v3.14.2)
│   ├── rough.min.js                 (~45KB, v4.6.6)
│   ├── prism.min.js                 (~18KB, v1.30.0)
│   └── typed.min.js                 (~12KB, v2.1.0)
│
├── dist/                            (NEW — build output)
│   └── bundle.min.js                (~240KB, gzipped ~60-70KB)
│
├── audio-processing.js              (unchanged, source files preserved)
├── code-display.js
├── collection-visibility.js
├── dark-light-mode.js
├── dev-mode.js
├── dynamic-sizing.js
├── get-page-id.js
├── info-guide-visibility.js
├── item-inquiry.js
├── itemhovershow-sizing.js
├── main-ui.js
├── posts-structure.js
├── typewriter.js
├── widget-code-injection.js
└── storage/
    ├── 7segment.ttf
    ├── Roboto-VariableFont_wdth,wght.ttf
    └── RobotoSlab-VariableFont_wght.ttf
```

Source files are preserved as-is for development. Only `dist/bundle.min.js` is referenced by the site.

---

### Network Requests: Before & After

| | Before | After |
|---|---|---|
| Blocking script requests | 19 | **1** |
| Async script requests | 3 (Finsweet) | 3 (Finsweet, unchanged) |
| CSS link requests (footer) | 1 (Prism theme) | **0** (inlined in head) |
| Total external requests | **23** | **4** |

---

### CDN Origins: Before & After

| | Before | After |
|---|---|---|
| `cdnjs.cloudflare.com` | 5 requests (GSAP, Draggable, Prism JS, Prism CSS, Typed) | **0** |
| `unpkg.com` | 1 request (rough.js) | **0** |
| `cdn.jsdelivr.net` (npm) | 3 requests (Finsweet) | 3 (unchanged) |
| `cdn.jsdelivr.net` (gh) | 13 requests (project files) | **1** (single bundle) |
| DNS lookups required | **3** (cdnjs, unpkg, jsdelivr) | **1** (jsdelivr only) |
| TLS handshakes | **3** | **1** |

---

### Asset Sizes: Before & After

| | Before | After |
|---|---|---|
| rough.js | ~120KB (unminified) | ~45KB (minified) |
| typed.js | ~30KB (unminified) | ~12KB (minified) |
| Project JS (13 files) | ~67KB (unminified, 13 requests) | ~35KB (minified, in bundle) |
| Vendor JS (5 files) | ~268KB (mixed) | ~175KB (all minified) |
| **Total JS payload** | **~335KB** | **~210KB** |
| Gzipped transfer size | ~100KB (but 19 roundtrips) | **~60-70KB (1 roundtrip)** |
| Prism CSS | ~2KB (separate request) | ~2KB (inlined, 0 requests) |

---

### Estimated Total Load Time Savings

| Step | Savings |
|---|---|
| Step 1 — Bundle all scripts | 800–1,200ms |
| Step 2 — defer + preload | 200–500ms |
| Step 3 — Inline Prism CSS | 50–100ms |
| Step 4 — Consolidate styles | 10–30ms |
| Step 5 — Merge inline scripts | 5–15ms |
| Step 6 — Update lib versions | 0–100ms |
| **Total estimated savings** | **~1,100–1,900ms** |

> These are estimates for a typical connection (~50ms RTT). On slower/mobile connections, savings will be significantly larger.
