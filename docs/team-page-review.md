# Team Page — Design Review

**Type:** First-look review — no prior review document exists for `/team`.
**Artifact reviewed:** `/team` — working tree at `master` (uncommitted), rendered live at `localhost:3001`, viewport 1280px.
**Related:** About page's `FoundingLeadership` component (`src/components/about/founding-leadership.tsx`) is a condensed preview of the same `LEADERS` data, linking to `/team` via "Meet the team". `site-data.ts:216–219` documents this preview→full relationship explicitly — Team is correctly the "full version" of that About section, not a separate concern.
**Date:** 2026-08-05
**Verdict:** ✅ **Approved, one recommended copy fix**

---

## Executive Summary

No release blockers. Accessibility, heading structure, and component reuse are all clean. The page's minimal architecture (one content section beyond the header/CTA bookends) is not a defect — it correctly matches its documented role as the expanded counterpart to About's leadership preview, not a standalone "who we are" page competing with About.

One real finding, worth fixing before this page is called done: **the page's own description promises a team it never shows, and says so three times in slightly different words** — twice on this page, ~40px apart, and a third time nearly verbatim on About.

---

## Findings

### F1 — Description over-promises and repeats itself · Recommended · copy

**Observed:**

| Location | Text |
|---|---|
| `team/page.tsx:22` (h1 description) | *"The professionals who plan your project are the same professionals who deliver it — **supported by skilled personnel across technical, operational and administrative functions.**"* |
| `team-content.tsx:29–34` (§ intro, one section below) | *"…The business is led by founding members with strong management capability and extensive industry experience, **supported by highly skilled personnel across technical, operational and administrative functions** — all working together to achieve the company's vision and mission."* |
| `about/founding-leadership.tsx:30–33` (About page, different route) | *"The business is led by founding members with strong management capability and extensive industry experience, **supported by skilled personnel across technical, operational and administrative functions.**"* |

Three problems in one phrase family:

1. **Same-page restatement.** The h1 description and the section intro directly beneath it both close on the identical clause — the assert-then-re-assert pattern the Services review scored down (6/10, "Premium enterprise quality") when it appeared at that page's h1.
2. **Cross-page near-duplication.** `team-content.tsx`'s second sentence and `founding-leadership.tsx`'s entire description are the same sentence with only the lead-in changed. Two different pages, same wording.
3. **Unmet promise.** All three instances promise "skilled personnel across technical, operational and administrative functions." The page shows exactly two people, both founders. No supporting personnel are named or shown anywhere on `/team`. A reader who came to meet "the team" the copy describes sees only its leadership.

**Fix.** Rewrite `team/page.tsx:22` so it stops restating the section beneath it and stops promising people the page doesn't introduce — parallel to how the Services review's Remaining Issue #1 was resolved (rewrite the description, not the more prominent element above it, since the h1 already does its job correctly).

The h1 — *"Senior people, hands-on from concept to handover"* — already carries seniority and hands-on involvement. The description's job is to add what the h1 can't, the way RI#1's replacement worked on Services by expanding EPCI and introducing the standalone-PM route rather than rephrasing the h1. Here, that means the **scope of the leadership record actually shown below** — sectors, geographies, certification, the kind of specifics `LEADERS[0].fullBio` already documents — not a second claim about supporting personnel the page can't back up. Drop "supported by … technical, operational and administrative functions" from the description entirely; it belongs to a page that introduces those people, and this one doesn't.

`team-content.tsx:29–34`'s echo of About's wording should be addressed in the same pass, since it's the same underlying duplication, not a separate defect. This is copy work — per the Services brief's precedent, route wording changes through CD approval before implementation.

---

## Observed, not actionable

### Leader bio length asymmetry — content-constrained, muted by layout

Measured live: Banks' card renders at **620px** (6 `fullBio` paragraphs), Okolie's at **150px** (1 sentence). A 4× disparity between the page's only two content items.

This is **not filed as a defect**. `site-data.ts:218–219` explicitly documents the constraint: *"Do not invent detail for Okolie beyond the brief's own '15+ years' line — a fuller bio is client-supplied."* There is no code fix available that doesn't fabricate content, which AGENTS.md and this codebase's own convention both rule out. The cards are also **vertically stacked** (`team-content.tsx:38`, `flex flex-col gap-10`), not a side-by-side grid — so the disparity reads as one long entry followed by a short one, not as two misaligned columns. Noted for whoever eventually receives Okolie's fuller bio; no action follows from this review.

---

## Verified clean

- **Heading structure:** `h1 → h2 → h3 → h3 → h2`, zero level skips, exactly one `h1`, `#main-content` present.
- **Contrast — every text/background pair measured, not estimated.** Tailwind v4 resolves opacity-modified colors to `oklab()`, so `getComputedStyle` alone can't be fed into a standard sRGB contrast formula; each value below was rendered to a 1×1 canvas and read back as composited sRGB before computing WCAG relative luminance.

  | Element | Ground | Ratio |
  |---|---|---|
  | Eyebrow / role label `navy-700` | paper | 12.91:1 |
  | Section intro `ink/65` | paper | 5.86:1 |
  | Leader name `ink` | paper | 18.69:1 |
  | Card body `ink/65` | paper | 5.86:1 |
  | `h1` white | navy-900 | 17.9:1 |
  | Header description `white/70` | navy-900 | 9.08:1 |
  | CTA heading white | navy-900 | 17.9:1 |
  | "Talk to Us" button (`navy-950` on `gold-500`) — the page's only interactive element besides the navbar | gold-500 | 11.57:1 |

  All comfortably clear of AA (4.5:1 body / 3:1 large text). Every text/background pair on the page — including the sole interactive control — was measured, not assumed.
- **No touch/hover-gating risk.** Unlike Services' card grid, nothing on this page hides content behind `:hover` — the leader cards are static, not links. RB-1's failure class doesn't apply here.
- **Reduced motion.** Same shared `MotionConfig` (`motion-provider.tsx`, root layout) covers this page's `fadeUp` sections. Verified by code inspection only, same caveat as the Services review — not yet observed live under OS/DevTools emulation.
- **Component reuse, no new primitives.** The leader card (`rounded-xl border border-line p-8 shadow-card`) and the initials monogram (`bg-navy-900` box, `text-gold-500` glyph) both reuse patterns already established elsewhere in the design system (`founding-leadership.tsx`'s own card, and the icon-box treatment on Services/Home). Nothing here invents a new visual language.

---

## Methodology

- No finding in this review is derived from a screenshot. Every section on this page animates via `whileInView`, and the automation tab's hidden `IntersectionObserver` pauses under load — the same carried-forward caveat from every prior review in this project. All measurements above are computed styles, DOM geometry, and canvas-based color readback against the live DOM.
- Contrast: canvas pixel readback (to force `oklab()`/`color-mix()` computed values to displayed sRGB) → WCAG 2.x relative-luminance formula. Not estimated, not assumed from source classes alone.

---

## Verdict

✅ **Approved.** No blockers. F1 (description copy) is the one item worth fixing before this page is called fully polished — it's a same-shape fix to one already solved on Services (RI#1), low effort, copy-only, no code risk. The bio-length asymmetry is real but has no available fix today and isn't blocking anything.

---

## Resolution (2026-08-05, same day)

Client supplied headshots (`photos.pdf`) and Okolie's full bio (`content of obiageli okolie.docx`) the same day this review was written. Both close F1 and the observed bio-asymmetry note together:

- **F1 closed *for the Team page* — see correction below.** `team/page.tsx:22`'s description was rewritten to *"Engineering, project and programme leadership shaped by decades of complex-sector delivery — from FPSO and nuclear projects to public-health research — set out here in full, qualifications included."* It no longer restates the h1 or promises unshown personnel; it now names the two sectors actually represented below. `team-content.tsx`'s intro paragraph was rewritten in the same pass to drop its near-duplicate of About's `founding-leadership.tsx` wording.
- **Bio asymmetry resolved by content, not layout.** Okolie's `bio`/`fullBio` were replaced with her client-supplied content (three full paragraphs, condensed to one for the About preview) — the 620px vs 150px disparity no longer exists. Her role also changed from "Founding Member" to "Director," matching the supplied document's title and Banks' terse role-label pattern (`role` is a typographic eyebrow slot, not free prose — her fuller title, "Public Health Consultant | Project Management Professional," is carried verbatim in `fullBio`'s first paragraph instead).
- **New, out-of-scope-for-this-review addition:** both leaders now render real photos (`Leader.photo`, object-cover circle) in place of the initials monogram, on both About and Team. Two muted, dashed-border "Director — Joining Lazfields" placeholder cards were added to Team only (not About's condensed preview), per client instruction to reserve two future Director seats. Contrast verified: placeholder "Director" label 12.6:1, "Joining Lazfields" 5.8:1, both against the card's actual composited background — not assumed from source classes.

No re-review of these additions was performed against the full DRB checklist above; they were verified for accessibility (contrast, `alt=""` on photos, heading order unaffected) and correctness (photo crop framing checked via canvas render, since `whileInView` sections are unreadable by screenshot in this environment) but not scored.

---

### Correction (2026-08-06)

The as-built review found the F1 closure above to be **partial, and this note overstated it**. F1 identified *three* locations carrying the "supported by skilled personnel across technical, operational and administrative functions" claim. Two were fixed (`team/page.tsx:22` and `team-content.tsx`'s intro); **the third, `about/founding-leadership.tsx`, still carries it verbatim** and was never touched. F1 is therefore closed for `/team` but open for `/about`, tracked as **RI-3** in [`team-page-as-built-review.md`](team-page-as-built-review.md).

That review also found three defects introduced by the same implementation pass: identical "Director" labels across one real leader and two empty seats (**RB-1**, release blocker), placeholder cards that skip the site's entry animation (**RI-1**), and About's "founding members" copy drifting out of step with the new Director role (**RI-2**).
