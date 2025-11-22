**Repository Overview**
- **Tech stack:** Next.js (v14), React 18, `framer-motion` for animations. No Tailwind packages are installed despite README references.
- **App layout:** Pages live under `src/pages` (Next.js routing). Global CSS is in `src/styles/globals.css`. Page-specific styles use CSS Modules in `src/styles/*.module.css` (example: `src/styles/Home.module.css`).
- **Static assets & content:** Images and static text live in `public/` (notably `public/images/*` and `public/All-Texts/*.txt`). `public/All-Texts` contains content lists (e.g., `pages.txt`, `prompts.txt`, `styles.txt`) used as raw assets.

**How the code is wired (quick mental model)**
- Next routes: files inside `src/pages` map to routes. `src/pages/index.js` is the homepage. `src/pages/api/*` contains API routes (simple example: `src/pages/api/hello.js`).
- App shell: `src/pages/_app.js` imports `src/styles/globals.css` and wraps pages. `src/pages/_document.js` provides base HTML markup.
- Module resolution: the project uses an import alias `@/*` -> `./src/*` configured in `jsconfig.json`. Use `import styles from '@/styles/Home.module.css'` in components.
- Image handling: components use `next/image` with paths under `public/` (e.g., `<Image src="/images/profile/developer-pic-1.png" .../>`). Keep explicit `width` and `height` props when adding new `next/image` usages.

**Developer workflows & commands**
- Install dependencies: `npm ci` (or `npm install`) before running anything.
- Local dev server: `npm run dev` -> runs `next dev` (watch mode on default Next port 3000).
- Build (production): `npm run build` then `npm run start` to run the built app.
- Lint: `npm run lint` (uses Next's built-in ESLint config). Note: ESLint is listed in `dependencies`.

**Project-specific conventions**
- Styling: prefer CSS Modules for page/component styles under `src/styles/*.module.css`. Global theme variables live in `src/styles/globals.css`.
- Content: small, editable content blocks (pages/prompts/icons) are kept as plain `.txt` under `public/All-Texts/`. If you need to change copy used across pages, check these files first.
- Animations: `framer-motion` is already included for animated UI. Search for `framer-motion` imports when adding or editing motion behaviour.
- Absolute imports: always use the `@/` alias when importing from `src/` to match existing files (e.g., `@/styles/...`, `@/components/...` if you add components).

**Where to change common things**
- Homepage content and layout: `src/pages/index.js` and `src/styles/Home.module.css`.
- Global layout/wrappers: `src/pages/_app.js` and `src/pages/_document.js`.
- API endpoints: add/modify under `src/pages/api/` (these run as serverless functions locally via `next dev`).
- Static assets: add images under `public/images/*` and reference them with `/images/...`.

**Examples & patterns to copy**
- Absolute import example: `import styles from '@/styles/Home.module.css'`.
- next/image example: `<Image src="/next.svg" alt="Next.js Logo" width={180} height={37} priority />` (keep width/height).
- Simple API route example: `src/pages/api/hello.js` exports default `handler(req, res)` returning JSON.

**Checks an agent should run before editing**
- Confirm `package.json` scripts (`dev`, `build`, `start`, `lint`). Use `npm ci` locally before `npm run dev`.
- Do not assume Tailwind is available — README mentions Tailwind, but it is not in `package.json` dependencies. If you add Tailwind, update `package.json` and PostCSS config accordingly.
- When adding images, put files in `public/images/` and use the `/images/...` path with `next/image`.

**Do not change unless requested**
- Do not modify `jsconfig.json` import alias without updating usages; many files rely on `@/*`.
- Do not move `public/All-Texts/*` to `src/` without confirming how the app reads them — they are expected as public static files.

If anything here is unclear or you'd like examples for a specific change (add a new page, add Tailwind, or wire an API), tell me which area to expand and I will update this file.
