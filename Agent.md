# Agent Guide

This repository is the personal academic website for Shuairu Zhu, published through GitHub Pages at `https://sphy2016.github.io`. It is based on the Academic Pages Jekyll theme, with personalized pages for research, publications, presentations, and CV content.

## Project Overview

- Static site generator: Jekyll, Liquid, Kramdown, Rouge, Sass.
- Theme lineage: Academic Pages / Minimal Mistakes style structure.
- Primary site configuration: `_config.yml`.
- Header navigation: `_data/navigation.yml`.
- Main public pages: `_pages/about.md`, `_pages/research.md`, `_pages/publications.md`, `_pages/presentations.md`, `_pages/cv.md`.
- Layouts and partials: `_layouts/` and `_includes/`.
- Styles: `assets/css/main.scss` imports Sass partials from `_sass/`.
- JavaScript: source files live in `assets/js/`; bundled/minified output is `assets/js/main.min.js`.
- Static assets: `images/`, `files/`, `talkmap/`, fonts under `assets/fonts/` and `assets/webfonts/`.

## Important Content Boundaries

- Treat `_pages/*.md` as the current hand-maintained public content unless the user says otherwise.
- The active homepage is `_pages/about.md`, with `permalink: /`.
- `_pages/publications.md` is a hand-written publication list with real papers and DOI links.
- `_pages/presentations.md` is a hand-written conference and workshop list.
- `_pages/cv.md` links to `files/cv.pdf`; `_data/cv.json` still contains Academic Pages placeholder data.
- Several collection files in `_publications/`, `_talks/`, `_teaching/`, `_portfolio/`, and old `_posts/` are still template/demo content. Do not assume they are live authoritative academic records.
- `_pages/publications.html` and `_pages/publications.md` both declare `permalink: /publications/`. Check the rendered output before changing either file, and avoid introducing more duplicate permalinks.
- `_site/`, `.sass-cache/`, `node_modules/`, `package-lock.json`, local bundle directories, and local development files are generated or local artifacts; do not edit them as source.

## Local Development

Install Ruby dependencies:

```sh
bundle install
```

Run the site locally:

```sh
bundle exec jekyll serve --host 127.0.0.1 --port 4000 --livereload
```

Build the site:

```sh
bundle exec jekyll build
```

Run with Docker:

```sh
docker compose up --build
```

Update the JavaScript bundle after editing `assets/js/_main.js` or plugin scripts:

```sh
npm install
npm run build:js
```

Notes:

- Changes to `_config.yml` require restarting `jekyll serve`.
- `Gemfile.lock` is ignored by `.gitignore`; do not rely on it as a required tracked source file.
- The Docker setup serves Jekyll on container port `4000`.

## Editing Guidelines

- Preserve YAML front matter. Jekyll pages and collection items need the opening and closing `---` block.
- Keep existing permalinks stable unless the user explicitly asks to change URLs.
- Use `_data/navigation.yml` only for header navigation order and labels; removing a link from navigation does not remove the page.
- Prefer editing source Sass partials under `_sass/` or `assets/css/main.scss`, not generated CSS under `_site/`.
- If changing minified JavaScript behavior, edit the source files and regenerate `assets/js/main.min.js` with `npm run build:js`.
- Keep academic content factual and concise. Publications should include authors, year, journal, volume/page where available, and DOI links when known.
- Use root-relative links for site assets, for example `/files/cv.pdf` or `/images/profile.png`.
- Before using `markdown_generator/`, inspect the TSV/notebook/script first. The generator inputs currently include placeholder Academic Pages example data.
- `scripts/update_cv_json.sh` is interactive and may start a Jekyll server after converting `_pages/cv.md` to `_data/cv.json`; do not run it blindly in automation.

## Common File Patterns

Page front matter:

```yaml
---
layout: archive
title: "Research"
permalink: /research/
author_profile: true
---
```

Publication collection item:

```yaml
---
title: "Paper Title"
collection: publications
category: manuscripts
permalink: /publication/YYYY-MM-DD-slug
excerpt: "Short summary"
date: YYYY-MM-DD
venue: "Journal Name"
paperurl: "https://example.org/paper"
citation: "Author list. (Year). Title. Journal."
---
```

Talk collection item:

```yaml
---
title: "Talk Title"
collection: talks
type: "Talk"
permalink: /talks/YYYY-MM-DD-slug
venue: "Conference or Institute"
date: YYYY-MM-DD
location: "City, Country"
---
```

## Verification Checklist

After meaningful edits, run:

```sh
bundle exec jekyll build
```

For JavaScript bundle changes, also run:

```sh
npm run build:js
```

For content-only edits, check the generated page in `_site/` or run `jekyll serve` and open the local URL. Pay special attention to duplicate permalinks, broken internal links, malformed YAML front matter, and placeholder Academic Pages text accidentally appearing on public pages.
