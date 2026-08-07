# Policies Page — Design Review Board: As-Built Review

**Type:** As-built implementation review. Not an architecture review — the approved structure (a single content section between the shared header and CTA bookends, fed by `POLICIES`) is taken as given and is not re-litigated.
**Artifact reviewed:** `/policies` as built, rendered at `localhost:3001`, measured at **375px, 768px, 1024px, 1280px and 1440px**.
**Baselines:** `docs/policies-page-review.md` (first-look review, same day) · `/team`, `/services`, `/about`, `/contact` for cross-page coherence · `capabilities-section.tsx` as the nearest structural sibling.
**Date:** 2026-08-06
**Benchmark applied:** the policy, governance and SHEQ pages of Jacobs, Arup, Turner & Townsend, Mace, Arcadis.
**Filename note:** requested as `docs/policy-page-review.md`; written to the house path instead, because `policy-page-review.md` differs from the existing `policies-page-review.md` by one letter while meaning a different artifact. Rename on request.
**Verdict:** ⚠ **Approved with Revisions** — 1 release blocker, 5 recommended improvements, 3 minor issues. **Overall 7.1/10.**

**Implementation tasks arising from this review are specified in [`policies-page-revision-brief.md`](policies-page-revision-brief.md) as RB-1, RI-1 … RI-5, MI-1 … MI-3 and BL-1 … BL-5.**

---

## Disclosure

Three things are recorded plainly rather than softened:

1. **No implementation happened between the first-look review and this one.** The brief for this review states the page "has now been implemented." File mtimes say otherwise: `src/app/policies/page.tsx` is dated **Aug 1 13:33** and is untouched; the only Aug 6 changes in the directory are `policy-card.tsx` (11:59) and `policies-content.tsx` (12:00), both written by this agent earlier today. `git status` shows the same working tree as before. **This review therefore assesses the same build the first-look review assessed** — it is a different and more rigorous artifact (thirteen scored dimensions, four measured breakpoints, composited contrast), not an assessment of new work.

2. **This reviews the reviewer's own code.** `PolicyCard` was extracted by this agent an hour before this review. Two of the design-system findings below (RI-2's `p-7` padding and missing `shadow-card`) are deviations that now live in that file. They were **preserved, not created** — the extraction copied the pre-existing inline markup verbatim, deliberately, to guarantee no visual change. That was the right call for that commit and the wrong outcome to leave standing; it is recorded here as a finding against the current build regardless of who wrote it.

3. **The first-look review's F1–F3 recur below.** They are not re-argued from scratch; they are re-stated with the measurements this pass added, and re-graded against the DRB rubric.

---

## Shipping state — established before assessment

`NAV_LINKS` (`site-data.ts:22`) and `footer.tsx:10` both link `/policies`, and both files are committed on `master`. The route is not: `git ls-files src/app/policies src/components/policies` returns nothing.

**`master` currently serves a 404 from its own primary navigation.** This is a shipping-state fact, not a design finding, so it is not scored and not listed as a release blocker. It is recorded here because it constrains the verdict: withholding approval from the route means shipping the 404, which is strictly worse than shipping a thin page. The verdict below approves the route and withholds sign-off from its depth.

---

## Executive Summary

**The page is technically and accessibly excellent, and substantively hollow.** Those two facts are not in tension — they describe a page whose engineering is finished and whose content never arrived.

Every accessibility check passes with margin. All ten text/ground pairs clear WCAG AA, the lowest at **5.83:1** against a 4.5:1 requirement. Focus rings were verified on both focusable elements (2px offset + 4px `gold-500` at 10.69:1 against its ground). Heading order is valid, one `h1`, `lang="en"`, skip-link target present and the link itself renders correctly on focus at 171×44px. Icons carry `aria-hidden="true"`. The content section is named via `aria-labelledby`. A full page-load console capture is clean — no errors, no warnings, no hydration or serialization complaints. **No horizontal overflow at any of 375, 768, 1024, 1280 or 1440px.** Section shell, header block, motion configuration and colour tokens match the house system exactly.

**The release blocker is that the route delivers 253 characters of unique prose.** Measured element for element against the homepage's `PoliciesPreview`: identical eyebrow, identical `h2`, identical three-card grid at identical dimensions. The intro block grows from 209px to 342px and that is the entire difference — **61px net** of section height, against a 68px link the page correctly drops. At 2089px total, `/policies` is the thinnest interior route on the site (`/services` 6260, `/about` 4211, `/team` 3133, `/contact` 2237). A reader who clicks "View Our Policies" is returned to the section they just read, one scroll up.

Beneath the blocker is a content-supply gap the code cannot close. `POLICIES` holds three one-sentence intentions. No standard is named, no certification claimed or disclaimed, no mechanism described, no owner identified, no review date given. For a firm pitching executives, government agencies and NGOs, this is the **due-diligence page** — the one a procurement reader opens to check whether SHEQ management is real. The `h1` promises *"Disciplined by policy, not just intention"*; the body delivers intention.

**The single best thing about this page is that nobody filled that gap by inventing anything.** Under obvious pressure to make a thin page look substantial, every sentence still traces to the cited source brief. That is the correct outcome and it is scored accordingly.

---

## Per-Section Analysis

### §1 — Page Header (`PageHeader`, navy-900, no background image)

**451px at 1280px, 446px at 375px.** Eyebrow 12px/600 Inter, `gold-500`, 2.4px tracking, **10.69:1**. `h1` 48px/700 Manrope (36px at 375px), `-1.2px` tracking, **17.90:1**. Description 18px/400, `white/70`, 29.25px line-height, **9.03:1**.

The type is right and the contrast is excellent. Two observations:

**The header carries no `backgroundImage` and has no recorded reason.** `/about` (`hero-commissioning.jpg`), `/services` (`hero-epci.jpg`) and `/contact` (`hero-pm.jpg`) all pass one. `/team` does not, and `team-page-as-built-review.md` justifies that explicitly — its content is portraiture, and competing photography would fight. **That justification does not transfer here.** At 1280px roughly the right half of a 451px band is empty navy with nothing in it. Whatever is decided, it should be decided rather than inherited. (The Team review's claim that `/team` is "the only interior page" without a band is stale; a dated correction was appended to that document.)

**The description does its job.** *"Quality, wellbeing, safety and environmental responsibility are built into how we plan and run every project"* names the four areas and does not restate the `h1` — it avoids the assert-then-re-assert pattern that both the Services and Team reviews scored down. It is the strongest single line on the page.

### §2 — Policies Content (`PoliciesContent`, paper, 852px)

The page's entire substance. `bg-paper py-20 sm:py-28`, `max-w-7xl`, `px-6 lg:px-8` — identical to `team-content.tsx`, `about-intro.tsx`, `service-index.tsx` and `contact-section.tsx`. Correct.

**Intro block (342px, `max-w-2xl` = 672px).** Eyebrow "OUR COMMITMENT" 12px/600 `navy-700` at **12.91:1** → `h2` 36px/700 at **18.69:1** → two paragraphs 18px/400 `ink/65` at **5.83:1**. The markup is structurally identical to `team-content.tsx:13–35` — same classes, same `fadeUp(16)`, same viewport config. This is house-standard hand-rolled section header markup, not a failure to reuse `SectionHeader` (only `capabilities-section.tsx` consumes that component, and its two-column shape doesn't fit a two-paragraph intro). **No finding.**

The copy itself is the problem, not its treatment. Both paragraphs describe a posture — "committed to meeting client requirements", "careful planning and consistent implementation" — without a single checkable particular.

**Card grid (230px at 1280px).** Three cards, `gap-6`, `mt-14`. Icon tile 48×48 `navy-900` with `gold-500` glyph at **10.69:1**; `h3` 18px/700 at **18.69:1**; body 14px/400 `ink/65` at **5.83:1**. All pass.

Four design-system deviations, each verified against the rest of the codebase:

| Deviation | Evidence | Severity |
|---|---|---|
| `p-7` card padding | **The only `p-7` in `src/`.** Every other card is `p-8` (`capabilities-section.tsx:33`, `team-content.tsx:46`, `service-index.tsx:52`) | RI-2 |
| No `shadow-card` | Capabilities and Team cards both carry it; these are flat | RI-2 |
| `<div>` grid, not `<ul>`/`<li>` | `capabilities-section.tsx`, `founding-leadership.tsx`, `lifecycle-band.tsx`, `how-we-run.tsx` and `team-content.tsx` all use `ul` + `motion.li` for repeated card sets | RI-3 |
| `sm:grid-cols-2 lg:grid-cols-3` on a 3-item set | The identical class governs `CAPABILITIES` — but that array has **6** items, so it resolves to a clean 2×3 / 3×2. With 3 items it orphans | RI-4 |

The last one is the cleanest finding in this review because the same class is simultaneously correct elsewhere and wrong here. Measured at **768px**: cards 1 and 2 sit at `y933`, card 3 sits alone at `y1186` at 340px wide inside a 672px container, with an equal void beside it. The site's 640–1023px band shows a two-plus-one stack for a set that reads as a triad everywhere else.

**Zero interactive elements.** The cards are static `div`s. Nothing links anywhere.

### §3 — Contact CTA (`ContactCta`, navy-900, 204px)

`h2` 30px/700 white at **17.90:1**; "Talk to Us" 14px/600 `navy-950` on `gold-500` at **11.57:1**; focus ring 2px `navy-900` offset + 4px `gold-500`, verified. The `heading` override — *"Have a question about how we operate?"* — is page-aware and well judged; it converts a generic CTA into one that follows from the section above it. **No finding.**

At ≥1280px there is a visible dead band between the card row and this section: the cards bottom out, then `py-28` plus the CTA's own `py-16` produce roughly 200px of empty paper. On a page with five sections that reads as rhythm; on a page with one it reads as running out of things to say. Recorded as MI-3 rather than a spacing defect, because the padding values themselves are house-correct.

### §4 — Footer

Shared component, reviewed elsewhere, unchanged here. Measured in passing: body copy **9.03:1**, phone link **10.69:1**, section labels **6.87:1**. All pass. Out of scope.

---

## Strengths

1. **Accessibility is genuinely finished, not merely adequate.** Lowest contrast on the page is 5.83:1 against a 4.5:1 bar. Both focusable elements have verified visible focus rings. Landmarks, heading order, `aria-labelledby`, `aria-hidden` on decorative icons, and a working skip link are all correct without exception.
2. **Content fidelity under pressure.** Every sentence traces to the "About Us brief (revised 19.07.26)" cited at `site-data.ts:272`. On a page this thin the temptation to invent an ISO number or a safety commitment is real, and nothing was invented. This is the highest-scoring dimension in the review and it deserves to be.
3. **Responsive behaviour is clean at every width tested.** No horizontal overflow at 375, 768, 1024, 1280 or 1440. Type scales correctly (`h1` 48→36, `h2` 36→30, body 18→16). The grid collapses to a single 312px column on mobile.
4. **Section shell is exactly house-standard.** `bg-paper py-20 sm:py-28`, `max-w-7xl px-6 lg:px-8`, `aria-labelledby`, `fadeUp(16)` intro with `SECTION_EASE` — indistinguishable from Team, About, Services and Contact. A contributor moving between pages will find no surprises.
5. **`POLICIES` as a single source of truth is the right architecture** and should survive whatever follows. Both surfaces read one array; adding fields extends both at once.
6. **Motion is on-system and respects user preference.** `fadeUp(20)`, `SECTION_EASE`, 0.1s stagger, `once: true`, and `MotionConfig reducedMotion="user"` applied globally at the layout. The card reveal was visually confirmed at 1280px.
7. **The CTA heading override is a small, correct piece of craft.**
8. **Clean console across a full page load** — including no serialization warning from spreading a component reference (`Icon`) into a client component, which confirms the `"use client"` boundary is correctly placed.

---

## Weaknesses

1. **The route has no reason to exist yet** (RB-1). 253 characters of unique prose; thinnest interior page on the site.
2. **Nothing on the page is checkable** (RI-1). No standard, certification, mechanism, owner, review date or signatory. The one page whose entire job is verifiable credibility offers nothing to verify.
3. **The `h1` writes a cheque the body doesn't cash.** *"Disciplined by policy, not just intention"* sits directly above two paragraphs of intention. This is the sharpest credibility problem on the page and it is caused by content absence, not by the line, which is good.
4. **Four design-system deviations in one 34-line component** (RI-2, RI-3, RI-4) — unique padding, missing shadow, wrong semantics, a grid class lifted from a set of a different size.
5. **A layout orphan across the entire tablet band** (RI-4), 640–1023px.
6. **The header is the only unjustified flat-navy band on the site** (RI-5).
7. **The page is a terminal node.** One focusable element in `main`, and it leaves the page. No policy connects to the services it governs, the people accountable for it, or a document.

---

## Missed Opportunities

These are not defects and none is a revision task. They are value the approved structure could carry without redesign, listed so they are considered when content lands.

1. **SHEQ is named here and operationalised on `/services`, and the two never meet.** `how-we-run.tsx` describes delivery discipline; this page claims the standards behind it. A single cross-link in each direction would make both pages more credible at near-zero cost.
2. **The Team page establishes exactly the right person to own this.** Dr. Okolie's record explicitly covers governance and quality assurance. A named accountable owner is the cheapest credibility gain available here, and it requires no new client content — only permission.
3. **Downloadable policy statements are the artifact procurement actually expects.** Every benchmark firm offers PDFs. The current architecture has nowhere to put one.
4. **`POLICIES` could carry per-policy commitments as an array** without changing the card layout — the same expansion that turned Team's one-line `bio` into a three-paragraph `fullBio`.
5. **The empty right half of the header** is space a pull-quote from a signed policy statement would fill better than a photograph would.

---

## Risk Assessment

| Risk | Likelihood | Impact | Notes |
|---|---|---|---|
| Procurement reader opens `/policies` for evidence, finds none, and discounts the firm's governance claims | **High** | **High** | This is the page's whole purpose; it is the only risk that justifies the blocker |
| `master` serves a 404 from navbar and footer | **Certain** (until committed) | **High** | Not a design defect; fixed by one commit |
| Pressure to "fill" the page produces a fabricated standard or certification | **Medium** | **Severe** | Legal and commercial exposure in tender responses. `site-data.ts:265–268` already sets the no-invention rule; RI-1 restates it as binding |
| `p-7` / missing `shadow-card` propagate by copy-paste into future cards | **Medium** | **Medium** | Deviations spread fastest from shared components, and `PolicyCard` is now shared by two surfaces |
| Page never deepens and becomes a permanent stub in the nav | **Medium** | **High** | Mitigated only by tracking RI-1 as a live content request, not a backlog wish |
| Tablet orphan read as carelessness by a reviewer on an iPad | **Medium** | **Low** | Cosmetic, but 640–1023px is a real executive viewing band |

---

## Scores

| # | Dimension | Score | Basis |
|---|---|---|---|
| 1 | Information Architecture | **5.0** | Correct slot in the nav and a sound single-source data model, but the route duplicates its own preview and has no internal structure |
| 2 | Visual Hierarchy | **7.5** | Unambiguous 48→36→18→14 progression, clean eyebrow→heading→body rhythm; penalised for the empty header half and for hierarchy with little to organise |
| 3 | Executive Readability & Scanning | **6.5** | Scans in seconds, 672px measure, three clear labels — but scanning ends without an answer to "what does this commit you to?" |
| 4 | Typography | **8.5** | Manrope/Inter correctly applied, 1.63 line-height on body, tracking handled at both display and eyebrow scale, correct mobile step-down. 14px card body is at the floor for this audience |
| 5 | Layout & Spacing | **7.0** | Section padding, container, gutters and `mt-14` all house-standard; deductions for unique `p-7`, the tablet orphan and the dead band above the CTA |
| 6 | Premium Enterprise Quality | **5.5** | Flat unshadowed cards, an empty header band and the shortest page on the site read as a stub beside `/services` |
| 7 | Trust & Credibility | **4.0** | The page exists to be trusted and supplies nothing verifiable. Lowest score in the review, and the reason for the blocker |
| 8 | Accessibility (WCAG AA) | **9.5** | Every check passes with margin; contrast floor 5.83:1, focus rings verified, landmarks and semantics correct. −0.5 for `div` where the system uses list semantics |
| 9 | Responsive Behaviour | **8.0** | No overflow at five widths, correct type scaling, clean mobile collapse; −2.0 for the 640–1023px orphan |
| 10 | Motion & Interaction | **7.5** | On-system easing, stagger and reduced-motion handling, visually confirmed; interaction is near-nil with one focusable element |
| 11 | Design System Consistency | **6.5** | Shell, header block, tokens and motion are exact matches; four verified deviations inside the card |
| 12 | Content Fidelity (no fabrication) | **10.0** | Nothing invented, source cited in code, no-invention rule honoured under pressure |
| 13 | Long-term Scalability | **6.5** | `POLICIES` and the now-shared `PolicyCard` will absorb growth well; the fixed three-card shape has nowhere to put commitments, documents or per-policy detail |

**Overall: 7.1/10** (unweighted mean of thirteen dimensions).

For calibration: `/team` scored 7.2 at its as-built review with one blocker. This page is stronger on accessibility and fidelity and materially weaker on substance.

---

## Required Revisions

### Release Blockers

**RB-1 — The route must deliver something the homepage section does not.**
Measured: 253 characters, 61px net. Identical eyebrow, `h2` and card grid. Blocks sign-off, not shipping — the route ships because the nav already links it. Closes when RI-1's content lands and `PoliciesContent` diverges from `PoliciesPreview` naturally. **Do not attempt to close it by reflowing the existing three sentences into a taller layout** — that consumes a revision's effort, adds no information, and makes the real rebuild harder.

### Recommended Improvements

**RI-1 — Obtain policy substance. 🟡 CD / client-gated. Blocks RB-1.**
Request the "About Us brief (revised 19.07.26)" cited at `site-data.ts:272` — absent from the repo — then, per policy area: the commitment statement in the company's own words; any standard or framework referenced, with the certified / working-toward / aligned-with distinction supplied by the client and never chosen here; the mechanism by which it is implemented on a live project; the accountable owner; and the approval signatory and review date. Items 1–4 turn three cards into a page; item 5 turns the page into a due-diligence artifact. **Nothing in this list may be drafted speculatively, including as placeholder.**

**RI-2 — Align card chrome with the system. 🟢 Engineering safe.**
`policy-card.tsx:27`: `p-7` → `p-8`, add `shadow-card`. `p-7` is the only instance in `src/`; every other card in the system is `p-8` with the shadow. Regression note: card height will grow ~8px and the grid row with it.

**RI-3 — Use list semantics for the policy grid. 🟢 Engineering safe.**
`policies-content.tsx:42` and `policies-preview.tsx:26`: `div` → `ul`, and `PolicyCard`'s root `motion.div` → `motion.li`. Matches `capabilities-section.tsx`, `founding-leadership.tsx`, `lifecycle-band.tsx`, `how-we-run.tsx` and `team-content.tsx`. Land with RI-2 as one edit — both touch the same lines.

**RI-4 — Resolve the tablet orphan. 🟡 CD approval on the chosen treatment.**
At 640–1023px, three cards in `sm:grid-cols-2` leave card 3 alone at half width. Options: drop the two-column step so the grid goes 1 → 3 at `lg`; or keep two columns and centre the trailing card. The class was inherited from `capabilities-section.tsx`, where six items make it correct — this is a copied class, not a considered one.

**RI-5 — Decide the header treatment. 🟡 CD approval required.**
Either supply a background band consistent with `/about`, `/services` and `/contact`, or record the flat-navy choice as deliberate in `policies/page.tsx` so it is not "fixed" into inconsistency later. Note that the three existing images are all site and engineering photography; a policies header likely wants a different subject, which makes this a small asset request rather than a one-line change.

### Minor Issues

**MI-1 — `policies-preview.tsx:10` has no `aria-labelledby`.** Every other section in the codebase names itself. Add an `id` to its `h2` and reference it. Homepage file, adjacent to this page's scope.

**MI-2 — Icons rely on Lucide's default `aria-hidden`.** Verified present in the DOM, so this is not a defect — but `capabilities-section.tsx:39` passes the attribute explicitly, and matching that makes the guarantee independent of the library's defaults.

**MI-3 — ~200px dead band between the card row and the CTA at ≥1280px.** The padding values are house-correct; the emptiness is a symptom of RB-1 and should not be "fixed" by reducing spacing. Re-assess after RI-1.

---

## Final Verdict

⚠ **Approved with Revisions**

The implementation is accessibly sound, visually on-system, responsive at every width tested, and honest about what it does not know. Its engineering is finished. What it lacks is the content that would make it worth visiting, and that content does not exist in this repository to be arranged.

**Commit the route** — the navigation already points at it, and a thin page beats a 404. **Land RI-2 and RI-3 now**; they are mechanical and unblocked. **Hold RB-1 open** against RI-1, which is a request to the client, not a task for an engineer.

Sign-off follows content, and no revision brief should be written before it arrives.

---

## Next Steps

1. Commit the route plus the `PolicyCard` extraction (unblocks the 404).
2. Land RI-2 + RI-3 as one coordinated edit; run `npm run lint`.
3. Issue the RI-1 content request, starting with the About Us brief.
4. Decide RI-4 and RI-5 with CD.
5. On content arrival: revision brief → implementation → follow-up as-built review, matching the Services and Team trail.

---

# Post-Revision Verification — 2026-08-07

**Scope:** verification pass over the 🟢 Engineering-Safe tasks from [`policies-page-revision-brief.md`](policies-page-revision-brief.md). Not a new design review; no architectural opinion is introduced and no "Explicitly approved" item was reopened.
**Method:** git diff review · `tsc --noEmit` · `npm run lint` · same-origin iframe harness at 375 / 768 / 1024 / 1280 / 1440px on **both** `/` and `/policies` · canvas-readback contrast · full page-load console capture.
**Result:** **5 of 5 implemented tasks verified complete. No regressions. One measurement in the brief was wrong and is corrected below.**

## Task verification

| ID | Status | Evidence |
|---|---|---|
| **RI-2** | ✅ Complete | `grep -rn '\bp-7\b' src/` → **zero matches**. Computed padding **32px** on all four sides; `box-shadow` non-`none` on all 3 cards on **both** surfaces. Contrast floor **5.83:1**, unchanged. |
| **RI-3** | ✅ Complete | Grid is `<ul>` on both surfaces; children `LI,LI,LI` — all `<li>`, nothing else. `list-style-type: none`, `padding-inline-start: 0px`, `margin: 56px 0 0` — no bullets, no indent, `mt-14` preserved. **No `validateDOMNesting` warning** in a full page-load console capture, confirming correct list nesting. Docblock records the `<ul>`/`<ol>` mount constraint. |
| **MI-1** | ✅ Complete | `policies-preview.tsx` section carries `aria-labelledby="policies-preview-heading"`; `h2` carries the matching `id`. Distinct from `policies-content.tsx`'s `policies-heading` — **no id collision**, as the brief required. |
| **MI-2** | ✅ Complete | All three policy icons report `aria-hidden="true"` explicitly in rendered HTML on both surfaces. `h3` remains the sole accessible name per card. |
| **MI-3** | ✅ Correctly no-change | `ContactCta` and `policies-content.tsx` section padding untouched. Verified by diff. |

## Correction to the brief's predicted geometry

**RI-2's regression note predicted 230px → ~238px cards and 852px → ~860px section (+8px). The actual growth is +36px: cards 230px → 266px, section 852px → 888px** (homepage preview 791px → 827px, identically).

Cause, measured rather than inferred:

| Measure | Value |
|---|---|
| Card outer width @1440px | 389px |
| Content width with `p-7` (before) | **333px** |
| Content width with `p-8` (after) | **325px** |
| Intrinsic width of "Safety, Health, Environment & Quality" @18px/700 Manrope | **326px** |

The longest policy title **misses the new content width by one pixel**, wrapping to a second line (+28px), which grid row-stretch propagates to all three cards. The brief's estimate accounted for vertical padding only and omitted the horizontal padding's effect on wrapping.

**This is not a defect and no corrective action is recommended.** The implementation matches the brief exactly and matches the design system (`p-8` everywhere else). Cards remain uniform height, no overflow appears at any tested width, and nothing accessible is affected. The brief explicitly forbids compensating by trimming `mt-14` or `py-28`, and that instruction was honoured. The title string is client-sourced, so shortening it is RI-1 territory, not an engineering option.

**Recorded because the threshold is one pixel wide.** A future change to the title, the font stack, or the container width will flip this back without warning. It is logged so the next contributor reads it as a known state rather than a new bug.

## Regression checks — all clear

- **Contrast:** all 14 text/ground pairs re-measured by canvas readback. Floor **5.83:1** against a 4.5:1 requirement. Identical to the pre-revision set.
- **Heading order:** `H1 → H2 → H3 → H3 → H3 → H2` (+ two footer `H3`). Zero skips, exactly one `h1`. Unchanged.
- **Overflow:** none at 375, 768, 1024, 1280 or 1440px on either surface.
- **Motion contract:** `fadeUp(20)` / `SECTION_EASE` / `0.1` stagger / `once: true` / `margin: "-80px"` intact. Cards settle at `opacity: 1`, `transform: none`, all three at identical `top` and `height`. *(An 8px offset visible mid-capture was the stagger in flight, not a layout defect — confirmed by post-settle measurement.)*
- **Section naming:** `policies-content.tsx` retains `aria-labelledby="policies-heading"`.
- **`"use client"`:** present on all three components. `policies-preview.tsx` still spreads `Icon` into a client component, so the directive remains load-bearing.
- **Console:** one hydration error, isolated to `<body>` and consisting solely of `data-new-gr-c-s-check-loaded` / `data-gr-ext-installed`. Reproduced identically on the untouched `/` route. **Grammarly browser extension, pre-existing, unrelated to these changes.**
- **Content fidelity:** diff contains zero copy changes. No factual claim added.
- **Gates respected:** RI-4's grid class (`sm:grid-cols-2 lg:grid-cols-3`) and RI-5's header (no `backgroundImage`) verified untouched.
- `tsc --noEmit` and `npm run lint` clean.

## Note for RI-4

The tablet orphan is now marginally more pronounced — at 768px the orphaned third card is **266px** against **238px** for the first row, where previously it was 258px against 230px. The proportion is unchanged; this is a consequence of RI-2, not a new finding, and stays inside RI-4's existing CD-gated scope.

## Verification verdict

⚠ **Approved Pending Client/CD Decisions.** All engineering-safe work is complete and correct. The page cannot reach ✅ Approved for Release while **RB-1** stands, and RB-1 closes only on **RI-1**'s client content. **RI-4** and **RI-5** await CD.
