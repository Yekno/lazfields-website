# Policies Page — CD Revision Implementation Brief

**Source:** `docs/policies-page-as-built-review.md` (Design Review Board, as-built review) — verdict ⚠ Approved with Revisions, 7.1/10
**Prior review:** `docs/policies-page-review.md` (first-look review + Resolution, 2026-08-06)
**Architecture baseline:** unchanged — no rework required. `/policies` remains a single content section between the shared `PageHeader` and `ContactCta` bookends, fed by the `POLICIES` single source of truth shared with the homepage preview.
**Created:** 2026-08-06
**Status:** **RI-2, RI-3, MI-1, MI-2 closed. MI-3 resolved as a deliberate no-change.** RB-1 and RI-1 remain open and client-gated; RI-4 and RI-5 remain open and CD-gated. Verified 2026-08-07 — see the Post-Revision Verification section of [`policies-page-as-built-review.md`](policies-page-as-built-review.md), which also **corrects RI-2's predicted geometry** (actual growth +36px, not +8px; cause measured and recorded). **Policies page verdict: ⚠ Approved Pending Client/CD Decisions.**

This brief translates **only** the accepted findings from the as-built review into implementation tasks. It introduces no new findings and re-argues no accepted decision.

Every task carries: affected files, the exact change, rationale traced to the review, acceptance criteria, and regression notes. **Task IDs are stable and match the review's own numbering** — reference them in commit messages.

**Format note:** modelled on `docs/team-page-revision-brief.md` and `docs/services-page-revision-brief.md`. No Contact-page brief exists in `docs/`; if one was produced outside the repo it was not available when this was written.

---

## Scope

Nine tasks: 1 release blocker, 5 recommended improvements, 3 minor items, plus 5 backlog entries carried from the review's Missed Opportunities.

**One task in this brief is not engineering work.** RI-1 is a request to the client for policy content that does not exist in this repository. RB-1 cannot close without it, and no amount of implementation effort substitutes. Read RI-1 before planning any batch.

**Not in scope.** The uncommitted-route / navbar-404 shipping fact recorded above the review's Executive Summary is not a design task and carries no ID here. It is resolved by committing `src/app/policies/` and `src/components/policies/`, which should happen independently of and prior to this brief's batches.

---

## Approval gates

Each task is tagged with one of two markers. **Do not begin a CD-gated task until wording or visual treatment is signed off.**

| Marker | Meaning |
|---|---|
| 🟢 **Engineering Safe** | Mechanical, accessibility, or performance work. No CD approval needed. Build it. |
| 🟡 **CD Approval Required Before Implementation** | Touches copy, visual hierarchy, or content strategy. Bring the proposed wording/treatment to CD first. |

| ID | Task | Gate | Blocks sign-off? |
|---|---|---|---|
| **RB-1** | Route must deliver value the homepage section does not | 🟡 CD / client-gated | **Yes** |
| **RI-1** | Obtain policy substance from the client | 🟡 Client-gated | Gates RB-1 |
| **RI-2** | Align card chrome with the design system | 🟢 Engineering Safe | No |
| **RI-3** | Use list semantics for the policy grid | 🟢 Engineering Safe | No |
| **RI-4** | Resolve the tablet orphan (640–1023px) | 🟡 CD Approval Required | No |
| **RI-5** | Decide the page-header treatment | 🟡 CD Approval Required | No |
| **MI-1** | Name the homepage preview section | 🟢 Engineering Safe | No |
| **MI-2** | Make the decorative-icon guarantee explicit | 🟢 Engineering Safe | No |
| **MI-3** | Dead band above the CTA | 🟢 Engineering Safe *(constraint, not a change)* | No |

### Critical sequencing constraint

**RI-2, RI-3, RI-4 and MI-2 all edit the same two regions** — `policy-card.tsx` (34 lines total) and the single grid line in each of the two consumers. Land them as **one coordinated edit**, not four sequential ones. Four separate passes over the same thirty-odd lines will produce merge churn and four rounds of the same cross-surface re-verification for no benefit. See §E.

**RI-3 and RI-4 edit the identical line in both consumer files** (`policies-content.tsx:42`, `policies-preview.tsx:26`). If RI-4's CD decision is not available when Batch 1 is built, RI-3 will land first and RI-4 will re-edit that line — acceptable, but avoidable by requesting the RI-4 decision early.

---

# A. Release Blockers

*Must be resolved before sign-off.*

---

## RB-1 — The route delivers no value the homepage section does not

🟡 **CD / client-gated** *(closes on RI-1's content; no engineering task exists in the meantime)*

**Review ref:** Release Blockers · RB-1 · Information Architecture (5.0/10) · Trust & Credibility (4.0/10) · Premium Enterprise Quality (5.5/10)
**Files:** `src/components/policies/policies-content.tsx` · `src/lib/site-data.ts` (`POLICIES`, L279–298)
**Severity:** Blocks sign-off, **not shipping**. The route ships regardless because `NAV_LINKS` and the footer already link it; withholding it means serving a 404 from the primary navigation.

### Problem

Measured element for element against the homepage's `PoliciesPreview`:

| | Home preview | `/policies` |
|---|---|---|
| Eyebrow | "OUR COMMITMENT" | identical |
| `h2` | "Policies that guide everything we do" | identical |
| Intro block | 209px / 293 chars | 342px / 546 chars |
| Card grid | 230px, 3 × 230px | identical |
| Section total | 791px | 852px |

**253 characters of unique prose. 61px net section height** — roughly 130px of added text against a 68px "View Our Policies" link the page correctly drops. At **2089px** total the route is the thinnest interior page on the site (`/services` 6260, `/about` 4211, `/team` 3133, `/contact` 2237).

A reader who clicks "View Our Policies" is returned to the section they just read, one scroll up.

### Change

**No engineering change is specified, and none should be invented.** RB-1 closes when RI-1's content lands and `PoliciesContent` diverges from `PoliciesPreview` on substance rather than on paragraph count.

### Explicitly rejected — do not implement

**Do not close RB-1 by reflowing the existing three sentences into a taller layout.** Splitting the cards across two rows, adding a decorative divider band, expanding the intro to three paragraphs of the same material, or introducing an accordion over one-sentence descriptions all consume a revision's effort, add zero information for the reader, and make the real rebuild harder once content arrives. The review names this explicitly.

**Do not close RB-1 by thinning the homepage preview** so the full page looks comparatively richer. The preview is correct as built; degrading it to flatter the page it links to is a regression on the higher-traffic surface.

### Acceptance criteria

- `/policies` presents at least one category of information that does not appear on the homepage — commitment text, standards, mechanism, ownership, or review metadata (see RI-1).
- The `h2` and eyebrow no longer duplicate `PoliciesPreview`'s strings verbatim, **or** the sections diverge enough in body content that the repetition reads as continuity rather than as a loop.
- Total document height at 1280px is no longer the lowest of the interior routes.
- No claim on the page is unsourced (see RI-1's fidelity constraint).

### Regression notes

- `POLICIES` feeds both surfaces. Any field added for the full page must either be optional or be rendered only by `PoliciesContent` — the preview must stay condensed.
- `PolicyCard` is now shared by both surfaces. If the full page needs a deeper card, add a variant prop; **do not fork the component.**

---

# B. Recommended Improvements

*Meaningful premium-quality gains. Not sign-off gates, except RI-1 which gates RB-1.*

---

## RI-1 — Obtain policy substance from the client ★ gates the blocker

🟡 **Client-gated** *(content request, not an engineering task)*

**Review ref:** Recommended Improvements · RI-1 · Trust & Credibility (4.0/10) · Weaknesses #2, #3 · Risk Assessment rows 1 and 3
**Files:** `src/lib/site-data.ts` — `POLICIES`, L279–298 (destination for whatever arrives)

### Problem

`POLICIES` holds three one-sentence intentions. No standard is named, no certification claimed or disclaimed, no mechanism described, no owner identified, no review date given. For a firm pitching executives, government agencies and NGOs, this is the due-diligence page — the one a procurement reader opens to check whether SHEQ management is real. The `h1` promises *"Disciplined by policy, not just intention"*; the body delivers intention.

### Change

Request the **"About Us brief (revised 19.07.26)"** cited at `site-data.ts:272`. That document is named in code as the source for the copy already shipped and is **absent from this repository** — it may already carry more of §Policies than was used.

Then, per policy area, request:

1. **Commitment statement** — what the company binds itself to, in its own words; ideally the text of the signed policy.
2. **Standards or frameworks referenced** — ISO 9001 / 45001 / 14001, local HSE regulation, client-specific SHEQ regimes. **The certified / working-toward / aligned-with distinction must be supplied by the client and never chosen here.**
3. **Mechanism** — how the commitment is implemented on a live project: inductions, audits, incident reporting, competency checks, subcontractor requirements.
4. **Accountability** — who owns the policy, and the review cadence.
5. **Approval and date** — signatory and last review date, if the policies are formally issued.

Items 1–4 turn three cards into a page. Item 5 turns the page into a due-diligence artifact.

### Binding constraint — no fabrication

**Nothing in the list above may be drafted speculatively, including as placeholder, including as commented-out scaffolding.** `site-data.ts:265–268` already establishes the house rule for absent client content ("do not invent names, bios or photos"). That rule binds harder here: a fabricated management-system reference, certification claim or safety commitment on a page a client may rely on in a tender response is a commercial and legal exposure, not a copy defect. The review scored Content Fidelity **10/10** precisely because this restraint held under pressure; the revision must not spend it.

### Acceptance criteria

- The source brief has been requested, and its availability recorded in `docs/`.
- Any content added to `POLICIES` traces to a client-supplied document, cited in a code comment in the same style as `site-data.ts:271–272`.
- Zero standards, certifications, dates, signatories or headcounts appear in `src/` without a client source.
- If the client supplies nothing, **RI-1 stays open and RB-1 stays open.** That is the correct outcome; it is not a reason to lower the bar.

### Regression notes

- Whatever shape the content takes, extend `POLICIES` rather than introducing a parallel array — the single-source model scored well and both surfaces depend on it.
- The `Policy` interface (`site-data.ts:273–277`) is the extension point. Prefer optional fields so `PoliciesPreview` continues to render the condensed form unchanged.

---

## RI-2 — Card chrome deviates from the design system

🟢 **Engineering Safe**

**Review ref:** Recommended Improvements · RI-2 · Design System Consistency (6.5/10) · Premium Enterprise Quality (5.5/10) · §2 deviation table rows 1–2
**Files:** `src/components/policies/policy-card.tsx` — **L27**

### Problem

Two deviations, both verified against the rest of the codebase:

| Deviation | Evidence |
|---|---|
| `p-7` padding | **The only `p-7` in `src/`.** Every other card is `p-8` — `capabilities-section.tsx:33`, `team-content.tsx:46`, `service-index.tsx:52` |
| No `shadow-card` | Capabilities and Team cards both carry it; policy cards render flat |

The `--shadow-card` token exists in `globals.css:27` specifically for this card treatment. Flat, tightly-padded cards are a material contributor to the page reading as a stub beside `/services`.

### Change

```tsx
// policy-card.tsx L27
className="rounded-xl border border-line bg-paper p-8 shadow-card"
```

### Acceptance criteria

- `grep -rn '\bp-7\b' src/` returns **zero** matches (currently one).
- Computed `box-shadow` on each policy card is non-`none` on **both** `/` and `/policies`.
- Card padding computes to 32px on all four sides.
- No text/ground contrast pair changes — the card ground remains `bg-paper`; floor stays **5.83:1**.

### Regression notes

- **Card height grows ~8px** (230px → ~238px at 1280px), and the section grows with it (852px → ~860px). Re-measure; do not "correct" the growth by trimming `mt-14` or the section's `py-28`, both of which are house-standard.
- `PolicyCard` is shared — this changes the homepage preview too. That is intended: the preview's cards carry the same deviations today.
- The preview sits on `bg-mist`; a shadow under a `bg-paper` card on `mist` is the same pairing `capabilities-section.tsx` already ships. No new token, no new value.

---

## RI-3 — The policy grid uses generic containers where the system uses list semantics

🟢 **Engineering Safe**

**Review ref:** Recommended Improvements · RI-3 · Design System Consistency (6.5/10) · Accessibility (9.5/10, −0.5 attributed to this) · §2 deviation table row 3
**Files:** `src/components/policies/policy-card.tsx` **L21** · `src/components/policies/policies-content.tsx` **L42, L46** · `src/components/policies-preview.tsx` **L26, L30**

### Problem

The policy areas are a list of three peer items rendered as `<div>` inside `<div>`. Every other repeated card set in the codebase uses `<ul>` with `<motion.li>`: `capabilities-section.tsx:22–24`, `founding-leadership.tsx:38–40`, `lifecycle-band.tsx:43–56`, `how-we-run.tsx:73–75`, `team-content.tsx:37–41`.

Screen-reader users receive no item count and no list context for a set the page presents as a triad.

### Change

Root element of the shared card:

```tsx
// policy-card.tsx L21
<motion.li
```
…with the matching `</motion.li>` at **L34**.

Both grid containers:

```tsx
// policies-content.tsx L42  and  policies-preview.tsx L26
<ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
```
…with the matching `</ul>`.

No `list-none` reset is required — the codebase's other card grids carry none, and the Tailwind preflight already removes list markers.

### Acceptance criteria

- On both `/` and `/policies`, the grid is a `<ul>` whose children are **all** `<li>` and nothing else.
- Accessibility tree reports a list of 3 items on both surfaces.
- No visual change: card geometry, gap, stagger and grid columns identical before and after at 1280px (allowing for RI-2's padding growth if landed together).
- No list bullets or default list padding appear at any breakpoint.

### Regression notes

- **After this change `PolicyCard` may only be rendered inside a `<ul>`/`<ol>`.** Both current consumers comply. Record this in the component's docblock so a third consumer does not drop it into a `<div>`.
- Touches the same line as RI-4 in both consumer files — see §E.
- The `key` prop stays on `PolicyCard`, not on an inner element.

---

## RI-4 — Three cards in a two-column grid orphan the third across the whole tablet band

🟡 **CD Approval Required Before Implementation** *(alters visual composition)*

**Review ref:** Recommended Improvements · RI-4 · Responsive Behaviour (8.0/10) · Layout & Spacing (7.0/10) · §2 deviation table row 4
**Files:** `src/components/policies/policies-content.tsx` **L42** · `src/components/policies-preview.tsx` **L26**

### Problem

Measured at **768px**: cards 1 and 2 sit at `y933`; card 3 sits alone at `y1186`, 340px wide inside a 672px container, with an equal void beside it. This holds across the entire **640–1023px** band, between the `sm` and `lg` breakpoints.

The class is `sm:grid-cols-2 lg:grid-cols-3` — **identical to `capabilities-section.tsx:22`, where `CAPABILITIES` has six items** and it resolves to a clean 2×3 / 3×2. With three items it cannot. This is a copied class, not a considered one.

### Change

CD to choose one:

**Option 1 (simplest) — skip the two-column step.**

```tsx
<ul className="mt-14 grid gap-6 lg:grid-cols-3">
```

One column until `lg`, then three. Cards stay full-width and comfortable through the tablet band; nothing is ever orphaned. Cost: a taller stack between 640–1023px.

**Option 2 — keep two columns and centre the trailing card.**

Retain `sm:grid-cols-2 lg:grid-cols-3` and add `sm:[&>*:last-child]:col-span-2 sm:[&>*:last-child]:mx-auto sm:[&>*:last-child]:max-w-[calc(50%-0.75rem)] lg:[&>*:last-child]:col-span-1 lg:[&>*:last-child]:max-w-none` — or the equivalent expressed on the card itself. Preserves the two-column rhythm; costs an arbitrary-variant selector that exists nowhere else in the codebase.

**Recommendation to CD: Option 1.** It is one class, introduces no new selector pattern, and the review's finding is that the two-column step was never chosen deliberately for this set.

### Acceptance criteria

- At **768px** all three cards occupy the same number of grid rows as each other, or the trailing card is visually centred — no half-width card sitting alone against a void.
- Verified at **640px, 768px, 1023px and 1024px** (the breakpoint edges), not only at 768.
- 375px remains a single column; 1024px and 1440px remain three columns.
- No horizontal overflow at any of those widths.
- Applied to **both** consumers — the homepage preview has the identical orphan.

### Regression notes

- Same line as RI-3 in both files. Land together if the CD decision is available; otherwise expect to re-edit.
- **Do not fix this by adding a fourth policy.** `POLICIES` is client-sourced; inventing an item to balance a grid is an RI-1 fidelity violation.
- Option 2's arbitrary variants must be verified at the `sm` and `lg` edges specifically — that selector class is where this kind of change breaks.

---

## RI-5 — The page header is the only unjustified flat-navy band on the site

🟡 **CD Approval Required Before Implementation** *(visual hierarchy / asset request)*

**Review ref:** Recommended Improvements · RI-5 · §1 · Visual Hierarchy (7.5/10) · Premium Enterprise Quality (5.5/10)
**Files:** `src/app/policies/page.tsx` — `PageHeader` props, **L19–23**

### Problem

`/about` (`hero-commissioning.jpg`), `/services` (`hero-epci.jpg`) and `/contact` (`hero-pm.jpg`) all pass `backgroundImage`. `/policies` does not. `/team` also does not — but `team-page-as-built-review.md` justifies that explicitly: its content *is* portraiture, and competing photography above photographs would fight. **That justification does not transfer here.** At 1280px roughly the right half of a 451px band is empty navy.

### Change

CD to choose one:

**Option 1 — supply a background band**, consistent with the other three interior pages. Note that all three existing images are site and engineering photography; a policies header likely wants a different subject (people, governance, inspection), which makes this **a small asset request rather than a one-line change**.

**Option 2 — record the flat navy as deliberate.** Add a comment in `policies/page.tsx` stating the reason, in the same spirit as `PageHeader`'s own docblock (`page-header.tsx:19–23`), so a future contributor does not "fix" it into inconsistency.

Either is acceptable. **What is not acceptable is leaving it undecided**, which is the current state.

### Acceptance criteria

- Either `backgroundImage` is passed with an approved asset, **or** `policies/page.tsx` carries a comment recording the deliberate exception.
- If an image is supplied: it routes through `next/image` with `fill`, `priority`, `sizes="100vw"`, `alt=""`, and the existing grayscale + double-scrim treatment — all of which `PageHeader` already applies. No new styling.
- If an image is supplied: `h1` contrast remains **≥ 17.9:1** and the description **≥ 9.03:1**, measured over the composited scrim, not over flat navy.
- Header height stays within ~10px of the current 451px at 1280px / 446px at 375px.

### Regression notes

- `PageHeader` is shared by five routes. **Change only the props passed from `policies/page.tsx`** — do not alter the component.
- A new asset must be added to `public/` and sized comparably to the existing three, or it will regress LCP on a page that currently has no image at all.
- The stale "only interior page" claim in `team-page-as-built-review.md` already carries a dated correction; do not re-correct it.

---

# C. Minor Items

*Non-blocking refinements. Batch with the RI-2/RI-3 card edit where they overlap.*

| ID | Item | Gate | File(s) | Change |
|---|---|---|---|---|
| **MI-1** | Homepage preview section is unnamed | 🟢 Eng | `policies-preview.tsx` **L10, L16** | It is the only `<section>` in the codebase without `aria-labelledby` or `aria-label`. Every sibling names itself — `policies-content.tsx:10`, `team-content.tsx:11`, `about-intro.tsx:24`, `capabilities-section.tsx:13`. Add `id="policies-preview-heading"` to the `h2` at L16 and `aria-labelledby="policies-preview-heading"` to the section at L10. Use a distinct id from `policies-content.tsx`'s `policies-heading` — the two never render together, but identical ids across sibling components invite a future collision. Homepage file; adjacent to this page's scope, filed here because it was found reviewing this component pair. |
| **MI-2** | Icon `aria-hidden` relies on a library default | 🟢 Eng | `policy-card.tsx` **L30** | Verified present in the DOM, so **this is not a defect** — all three icons report `aria-hidden="true"`. But `capabilities-section.tsx:39` passes the attribute explicitly, and matching that makes the guarantee independent of Lucide's defaults across future upgrades. Add `aria-hidden="true"` to the `<Icon>` call. One-line change; batch with RI-2/RI-3. |
| **MI-3** | ~200px dead band between the card row and the CTA at ≥1280px | 🟢 Eng *(constraint, not a change)* | `policies-content.tsx` L10 · `contact-cta.tsx` L19 | **Do not change any spacing value.** `py-20 sm:py-28` and the CTA's `py-16 lg:py-20` are house-standard and identical on every other page. The emptiness is a symptom of RB-1 — one short section cannot fill the rhythm five sections were tuned for. Tightening the padding here would break cross-page consistency to hide a content problem. **Re-assess only after RI-1 lands**, at which point it will most likely resolve itself. |

---

# D. Backlog

*Not part of this release. From the review's Missed Opportunities.*

| ID | Item | Notes |
|---|---|---|
| **BL-1** | Cross-link SHEQ between `/policies` and `/services` | `how-we-run.tsx` describes delivery discipline; this page claims the standards behind it, and the two never meet. One link in each direction would make both pages more credible at near-zero cost. Cheap, but it needs RI-1's content first — linking to a page of intentions adds nothing. |
| **BL-2** | Name an accountable policy owner | The Team page already establishes the right person: Dr. Okolie's record explicitly covers governance and quality assurance. This is the cheapest credibility gain available and requires **no new client content — only permission**. Overlaps RI-1 item 4; decide them together. |
| **BL-3** | Downloadable policy statements | Every benchmark firm (Jacobs, Arup, Turner & Townsend, Mace, Arcadis) publishes PDFs; it is the artifact procurement actually expects. The current architecture has nowhere to put one. Needs both client documents and a small layout decision — do not scaffold a download UI before a document exists. |
| **BL-4** | Extend `POLICIES` to carry per-policy commitments | The same expansion that turned Team's one-line `bio` into a three-paragraph `fullBio`. The card layout does not need to change to accommodate it. Effectively the implementation half of RI-1 — hold until content arrives so the field shape follows the content rather than predicting it. |
| **BL-5** | Header pull-quote from a signed policy statement | The empty right half of the header would be filled better by a short quotation from an actual signed policy than by photography. Couples with **RI-5** — if CD takes this route, RI-5 Option 1's asset request is unnecessary. Gated on RI-1 item 1. |

---

# E. Sequencing

**Batch 0 — Commit the route (no ID, prerequisite).** `src/app/policies/` and `src/components/policies/` are untracked while `NAV_LINKS` and the footer link `/policies` on `master`. Ship this first and independently; every batch below assumes the route exists in version control.

**Batch 1 — The shared card and its two grids, as ONE coordinated edit.** RI-2 + RI-3 + MI-2, plus RI-4 **if** its CD decision is in hand. All touch `policy-card.tsx` (34 lines) and the single grid line in each consumer. **Do not make four sequential passes over these lines.** Engineering-safe apart from RI-4; request the RI-4 decision before starting so the grid line is edited once.

**Batch 2 — MI-1.** Independent, one file, two lines. Can ship with Batch 1 or alone.

**Batch 3 — RI-1, the content request.** Not engineering. Issue it now, in parallel with Batches 1–2, because its turnaround is external and it gates the blocker.

**Batch 4 — RI-5.** CD decision; if Option 1, an asset request follows and this becomes the slowest non-content item.

**Batch 5 — RB-1.** Only after RI-1 delivers. Requires a fresh revision brief at that point; **do not attempt it from this one**, which deliberately specifies no implementation for it.

### Dependencies

- **RI-2 ↔ RI-3 ↔ MI-2** — same file, overlapping lines. One edit.
- **RI-3 ↔ RI-4** — identical line in both consumers. One edit if RI-4 is approved in time; otherwise RI-4 re-edits after RI-3.
- **RI-1 → RB-1** — hard gate. RB-1 has no engineering path without it.
- **RI-1 → BL-1, BL-3, BL-4, BL-5** — all four are content-gated.
- **RI-5 ↔ BL-5** — mutually exclusive treatments of the same space. Decide RI-5 with BL-5 on the table.
- **MI-3** is a guard on Batches 1 and 5, not a task in either.
- **MI-1** is independent of everything.

---

# F. Regression watchlist

Re-check after each batch:

- **Both surfaces, every time.** `PolicyCard` is shared by `/` and `/policies`. Every task in Batch 1 changes the homepage. Verifying only `/policies` will miss half the blast radius.
- **Contrast floor** — currently **5.83:1** (`ink/65` on `paper`, both the intro paragraphs and the card body) against a 4.5:1 requirement. No task here alters a text/ground pair, so any movement indicates an unintended change. Measure by **canvas pixel readback**, not from class names.
- **Card geometry after RI-2** — 230px → ~238px at 1280px, section 852px → ~860px. Expected. Confirm the grid rows and the `mt-14` gap are otherwise untouched.
- **List semantics after RI-3** — the grid must be a `<ul>` whose every child is an `<li>`. `motion.li` renders `<li>`; verify in the DOM, not in the JSX.
- **Heading order** — `H1 → H2 → H3 → H3 → H3 → H2`, zero skips, exactly one `h1`. No task here adds or removes a heading.
- **Section naming** — `policies-content.tsx:10` must retain `aria-labelledby="policies-heading"`. MI-1 adds a *second*, distinct id on the homepage; it must not reuse `policies-heading`.
- **Icon `aria-hidden`** — all three must still report `true` after MI-2, and the `h3` must remain the sole accessible name for each card.
- **No horizontal overflow at 375, 768, 1024, 1280 and 1440** — currently clean at all five. RI-2's padding growth and RI-4's grid change both touch the widths that could break this.
- **`"use client"` must remain on both consumers.** `policies-preview.tsx` no longer imports `framer-motion` directly and looks like a server component candidate — **it is not.** It spreads `Icon`, a component reference, into a client component, which is not serialisable across the boundary. The directive is load-bearing; do not remove it as dead code. A clean console on a full page load is the proof.
- **Motion contract** — `fadeUp(20)`, `SECTION_EASE`, `0.1` stagger, `once: true`, `margin: "-80px"`. Unchanged by every task here.
- **Focus treatment** — the page's single focusable element (`ContactCta`'s "Talk to Us") carries a 2px `navy-900` offset + 4px `gold-500` ring. No task touches it; confirm it survives.
- **Content fidelity** — no batch in this brief adds a factual claim. Any diff introducing a standard, certification, date, signatory or headcount is out of scope and should be rejected in review.

---

# G. Explicitly approved — do not "fix"

The Review Board explicitly endorsed these. Changing them is a regression, not an improvement.

- **The section shell** — `bg-paper py-20 sm:py-28`, `max-w-7xl`, `px-6 lg:px-8`, `aria-labelledby`. Identical to Team, About, Services and Contact. Do not adjust to compensate for MI-3.
- **The hand-rolled section header block** (`policies-content.tsx:12–40`) — structurally identical to `team-content.tsx:13–35`. This is **not** a failure to reuse `SectionHeader`; only `capabilities-section.tsx` consumes that component, and its two-column shape does not fit a two-paragraph intro. The review considered and cleared this. **Do not re-raise it.**
- **The page-header description** — *"Quality, wellbeing, safety and environmental responsibility are built into how we plan and run every project."* Names the four areas without restating the `h1`; the review calls it the strongest line on the page.
- **The `h1`** — *"Disciplined by policy, not just intention."* The gap is in the body, not the line. Do not soften the `h1` to match a thin body; RI-1 raises the body to match the `h1`.
- **The `ContactCta` heading override** — *"Have a question about how we operate?"* Page-aware and well judged.
- **`POLICIES` as a single source of truth** — one array, two surfaces. Scored as a strength and the extension point for RI-1.
- **`PolicyCard` as a shared component** — the two surfaces are expected to diverge in content depth, not card treatment. Do not fork it (see RB-1).
- **Content fidelity** — nothing invented, source cited at `site-data.ts:271–272`. Scored **10/10**. This is the highest-scoring dimension in the review and RI-1 must not spend it.
- **All ten text/ground contrast pairs** — floor 5.83:1. No token in the passing set needs adjustment.
- **The 14px card body size** — at the floor for an executive audience but on-system; the review noted it without filing it.
- **Semantic structure** — landmarks, one `h1`, valid heading order, `lang="en"`, `#main-content` skip target, working skip link at 171×44px on focus.
- **Motion configuration** — `fadeUp`/`SECTION_EASE`/stagger/`once: true`, with `MotionConfig reducedMotion="user"` at the layout. Visually confirmed.
- **The `"use client"` directives on both consumers** — load-bearing, per §F.
- **Design-token discipline** — no new colours, type scale, spacing or motion primitives are introduced by any task above. RI-2 uses the existing `--shadow-card`. Every task stays inside the locked system.

---

# H. Reviewer notes carried forward

**No implementation occurred between the first-look review and the as-built review.** The as-built brief was issued on the premise that the page "has now been implemented"; file mtimes show `src/app/policies/page.tsx` dated **Aug 1 13:33** and untouched, with the only Aug 6 changes being the `PolicyCard` extraction. The as-built review therefore assessed the same build as the first-look review, and this brief translates findings against that build. **If work lands before these tasks are started, re-verify the measurements in §F before relying on them.**

**Two findings in this brief are against code the reviewing agent wrote.** RI-2's `p-7` and missing `shadow-card` live in `policy-card.tsx`, created during the F4/F5 refactor an hour before the as-built review. They were **preserved, not created** — the extraction copied the pre-existing inline markup verbatim, deliberately, to guarantee no visual change on either surface. That was correct for that commit and is the wrong thing to leave standing. Recorded plainly rather than softened.

**The shipping-state 404 is not a design task.** `NAV_LINKS` and the footer link `/policies` on `master` while the route is untracked. It carries no ID because it is not a finding; it is Batch 0. Do not fold it into RB-1's scope.

**Items deliberately not filed as defects — do not re-raise them as such.**
- **`SectionHeader` non-reuse.** Considered and cleared; see §G.
- **MI-2's icon `aria-hidden`.** Verified present in the DOM. A consistency improvement, **not** an accessibility failure. Do not re-file it as one.
- **MI-3's dead band.** A symptom of RB-1, with house-correct padding values. Not a spacing defect.
- **The 14px card body.** On-system; noted, not filed.

**One approach is explicitly rejected and must not be re-proposed.** Closing RB-1 by reflowing existing copy into a taller layout — see RB-1's rejected-options block. The review names this directly.

**Verification guidance — read before testing.**
- **`resize_window` does not work in this environment.** Two attempts reported success while `innerWidth` stayed at 1280. The as-built measurements at 375 / 768 / 1024 / 1440 were taken with a **fixed-size same-origin iframe harness** injected into the host page (`iframe.style.width = Npx`, `src = "/policies"`, measure `contentDocument`). Reuse that technique; it is the only reliable viewport control here.
- **Contrast must be computed by canvas pixel readback.** Tailwind v4 resolves opacity-modified colours to `oklab(L a b / α)`, which cannot be fed into a WCAG relative-luminance formula. A naive parse of that string produced a false **1.13:1** for the header description during this review; the true composited value is **9.03:1**. Draw the ground, draw the text colour over it, read the pixel.
- **Do not verify motion by screenshot in a background tab.** The automation tab pauses `IntersectionObserver`, so `whileInView` never fires and every card reports `opacity: 0` — a false "stuck animation" reading. Bring the tab forward, or force end-states only for geometry passes.
- **Capture the console with `clear: true` followed by a reload.** A read issued after load misses page-load diagnostics. The clean baseline for this page is: React DevTools notice + HMR only, zero errors, zero warnings.

**Scoring context.** Overall **7.1/10**. The lowest dimensions — Trust & Credibility (4.0), Information Architecture (5.0), Premium Enterprise Quality (5.5), Executive Readability (6.5), Design System Consistency (6.5), Long-term Scalability (6.5) — map to tasks as follows: **RI-1 and RB-1** carry Trust, IA and Readability; **RI-2 and RI-5** carry Premium Quality; **RI-2, RI-3 and RI-4** carry Design System Consistency; **BL-3 and BL-4** carry Scalability and are deliberately deferred. Landing Batch 1 alone should lift Design System Consistency into the 9 range and Premium Quality by roughly a point — but **Trust & Credibility cannot move without RI-1**, and it is the dimension that produced the blocker. Batch 1 is worth shipping; it is not worth mistaking for progress on the blocker.
