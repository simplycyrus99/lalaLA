# La La L.A.

A complete static LMML (Live Museum of Movie Locations) website for the Information Modeling and Web Technologies course, A.Y. 2024-25 — **LA Through the Eyes of La La Land**, a single-film location tour of Damien Chazelle's *La La Land* (2016).

## Included

- 15 real filming locations from *La La Land*, across the Los Angeles region
- 2 narratives: a practical one-day road route, and the film's own screen order (this project's required chronological narrative, reinterpreted for a single film)
- 2 switchable and structurally different visual themes: Noir Case File and VHS Video Store
- 9 reading combinations per location (3 lengths x 3 audience/competence modes)
- Approximate coordinates, camera orientation, access notes and source links (**verify coordinates before submission** — see Documentation, section 6)
- Interactive Google Maps location viewer, route-section links, an offline SVG fallback, previous/next navigation and QR codes
- An unbounded photo gallery per location (add any number of your own photos, no fixed frame count) with a click-to-enlarge lightbox
- JSON and CSV data
- About, documentation and disclaimer pages

## Run locally

Open `index.html` directly, or run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Before submission

1. Replace `[Add your team name]` and your details in `about.html` and `data/locations.json` (`project.team`).
2. Replace the placeholder GitHub Pages URL (`SITE_URL` in `tools/regenerate_qr.py`), then run the script to regenerate QR codes.
3. Add your own on-site photographs or properly licensed images to each location's `gallery` array in `data/locations.json`. The included SVGs are original angle guides, not film stills or gallery photos.
4. Verify the coordinates in `data/locations.json` against Google Maps — they were reconstructed from street addresses, not measured directly.
5. Add the specific seeing-stars.com page URL for each location to its `sources` array (only the index page was used while compiling this data — see `disclaimer.html`).
6. Re-check venue access, route time and opening hours — one stop (Warner Bros. backlot) requires a booked studio tour, one (the Rialto Theatre) is currently closed to the public, and one (Cathy's Corner) is a real hike on a car-free road.
7. Push the folder to a GitHub repository and enable GitHub Pages from the repository root.

## Main structure

- `index.html` cover page
- `map.html` geographic collection map
- `itinerary.html` narrative planner
- `location.html?id=...` dynamic location viewer, with photo gallery
- `documentation.html` design and metadata rationale
- `disclaimer.html` educational scope and sources
- `data/` machine-readable records (`locations.json` canonical, `locations.js` browser mirror, `locations.csv` flat export)
- `assets/css/themes/` two full visual systems

## Theme rationale

- Noir Case File: an evidence-dossier register, deliberately unrelated to the film's own aesthetic
- VHS Video Store: a video-rental-era register, likewise deliberately unrelated

Neither theme literally recreates *La La Land*'s Technicolor-musical look on purpose — see `documentation.html` section 3 for the reasoning.

## Motion and transitions

- Headings, cards, map panels, itinerary stops and long-form sections rise and fade into view as the visitor scrolls.
- The effect uses `IntersectionObserver`, runs once per element and also covers dynamically generated roadbook and itinerary entries.
- Narrative changes and reading-level updates use a small content refresh transition.
- All effects automatically switch off when the visitor enables **reduced motion** in their operating system or browser.

## Google Maps

- `map.html` contains a live Google Maps iframe that updates when a roadbook stop is selected.
- The route-section buttons open groups of stops as Google Maps driving directions.
- Every location page contains its own embedded Google Map and directions link.
- The Google Map requires an internet connection; the schematic SVG map remains available as an offline fallback.

## Photo gallery model

Each object in `data/locations.json` now contains:

- `gallery`: an array of `{ "src": "path/or/url", "caption": "..." }` objects — add as many as you want, in any order
- No `movieShotImage` / `realLocationImage` fixed slots anymore; the old two-slot comparison layout was replaced with this open-ended gallery, since a fixed frame count didn't fit how photos were actually being sourced.

After changing `locations.json`, mirror the same data in `locations.js` (the included file is the browser-ready copy). The location viewer keeps the original SVG as a separate camera-angle guide, alongside the gallery rather than inside it.

## Theme layout systems

The two themes alter information architecture as well as typography and colour: Noir uses dossier-like horizontal evidence blocks; VHS changes navigation into a fixed side rail with a two-screen composition.
