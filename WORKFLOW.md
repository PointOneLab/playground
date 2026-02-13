# Development Workflow

How to make changes to the PointOneLab Playground JavaScript code and deploy them to the live site.

---

## How It Works

- All JavaScript source files live in the **root** of this repo (e.g. `main-ui.js`, `code-display.js`)
- Third-party libraries (GSAP, Prism, etc.) live in the **`vendor/`** folder as minified files
- A build script (`build.sh`) **concatenates** all vendor + source files into a single bundle: **`dist/bundle.js`**
- The live Webflow site loads only this one bundle via jsdelivr CDN
- The Webflow custom code (head + footer) lives in `webflow custom code/` for reference

---

## Everyday Workflow: Editing a JavaScript File

### Step 1 — Edit the source file

Open and edit the individual source file directly. For example:

```
code-display.js
main-ui.js
dark-light-mode.js
```

Do **not** edit `dist/bundle.js` directly — it gets overwritten by the build.

### Step 2 — Rebuild the bundle

Run the build script from the repo root:

```bash
./build.sh
```

You should see output like:

```
Building bundle...
Build complete: dist/bundle.js (217297 bytes)
```

### Step 3 — Commit and push

```bash
git add -A && git commit -m "update code-display.js" && git push
```

### Step 4 — Wait for CDN cache

jsdelivr caches files from GitHub. After pushing:
- **Automatic refresh:** Cache expires within ~24 hours for `@main` branch references
- **Instant refresh:** Purge the cache manually by visiting:

```
https://purge.jsdelivr.net/gh/PointOneLab/playground@main/dist/bundle.js
```

Just open that URL in a browser after pushing — it forces jsdelivr to fetch the latest version immediately.

---

## Updating the Webflow Custom Code

The head and footer code that goes into Webflow is stored in:

```
webflow custom code/head.html
webflow custom code/footer.html
```

If you need to change the Webflow custom code:

1. Edit the file in this repo
2. Copy the full contents of the file
3. Paste it into the corresponding Webflow custom code section (Site Settings > Custom Code)
4. Publish the Webflow site

---

## Repository Structure

```
playground/
├── build.sh                         # Build script — run after any JS change
├── dist/
│   └── bundle.js                    # Built bundle (do NOT edit directly)
├── vendor/                          # Self-hosted third-party libraries
│   ├── gsap.min.js                  # GSAP core v3.11.5
│   ├── Draggable.min.js             # GSAP Draggable v3.11.5
│   ├── rough.min.js                 # Rough.js v4.5.2
│   ├── prism.min.js                 # Prism.js v1.29.0
│   └── prism-tomorrow.min.css       # Prism theme (inlined in head.html)
├── webflow custom code/
│   ├── head.html                    # Copy into Webflow head custom code
│   └── footer.html                  # Copy into Webflow footer custom code
├── get-page-id.js                   # Source files (edit these)
├── collection-visibility.js
├── itemhovershow-sizing.js
├── audio-processing.js
├── widget-code-injection.js
├── posts-structure.js
├── code-display.js
├── info-guide-visibility.js
├── dark-light-mode.js
├── main-ui.js
├── dynamic-sizing.js
├── dev-mode.js
├── item-inquiry.js                  # Not included in the bundle (not loaded on site)
├── storage/                         # Font files
├── WORKFLOW.md                      # This file
├── PERFORMANCE-OPTIMIZATION.md      # Performance optimization documentation
└── README.md
```

---

## Bundle Build Order

The build script concatenates files in this specific order (dependency-safe):

| # | File | Why this position |
|---|---|---|
| 1 | `vendor/gsap.min.js` | GSAP core — required by Draggable |
| 2 | `vendor/Draggable.min.js` | GSAP plugin — depends on GSAP core |
| 3 | `vendor/rough.min.js` | Independent library |
| 4 | `vendor/prism.min.js` | Independent library |
| 5 | `get-page-id.js` | Resolves CMS data — should run first |
| 7 | `collection-visibility.js` | Independent |
| 8 | `itemhovershow-sizing.js` | Independent |
| 9 | `audio-processing.js` | Independent |
| 10 | `widget-code-injection.js` | Independent |
| 11 | `posts-structure.js` | Independent |
| 12 | `code-display.js` | Uses Prism.js (#4) |
| 13 | `info-guide-visibility.js` | Independent |
| 14 | `dark-light-mode.js` | Independent |
| 15 | `main-ui.js` | Uses GSAP, Draggable, rough.js |
| 16 | `dynamic-sizing.js` | Independent |
| 17 | `dev-mode.js` | Depends on main-ui.js globals |

---

## Adding a New JavaScript File

1. Create the new `.js` file in the repo root
2. Open `build.sh` and add the file to the `cat` list in the correct position (consider dependencies)
3. Run `./build.sh` to rebuild
4. Commit and push

---

## Updating a Vendor Library

1. Download the new minified version
2. Replace the file in `vendor/` (keep the same filename)
3. Run `./build.sh` to rebuild
4. Test thoroughly — vendor updates can introduce breaking changes
5. Commit and push

---

## Troubleshooting

**Changes not showing on the live site?**
- Make sure you ran `./build.sh` after editing
- Make sure you committed and pushed `dist/bundle.js`
- Purge the jsdelivr cache: `https://purge.jsdelivr.net/gh/PointOneLab/playground@main/dist/bundle.js`

**Build script fails?**
- Make sure you are in the repo root directory
- Make sure the script is executable: `chmod +x build.sh`
- Check that all source files listed in `build.sh` exist

**Site broken after a change?**
- Check the browser console for JavaScript errors
- The error message will reference a line number in `bundle.js` — cross-reference with the source files
- Revert your change if needed: `git checkout -- [filename]` then rebuild
