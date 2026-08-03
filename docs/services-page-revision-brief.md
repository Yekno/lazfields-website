# Services Page — CD Revision Implementation Brief

**Source:** `docs/services-page-review.md` (Design Review Board, implementation audit) — verdict ⚠ Approved with Revisions
**Architecture baseline:** `docs/services-page.md` v2 — unchanged, no rework required
**Created:** 2026-08-01
**Status:** Batches 1, 2 and 3 complete. Batch 1 (RB-1, RB-2, RB-3) — sign-off gates cleared. Batch 2 (RI-1, RI-3, RI-4, RI-8, plus MI-3) — shipped with CD-approved copy. Batch 3 (RI-2, RI-7, RI-9, and RI-5+RI-6 as one ground-sequence decision) — §2 moved to mist, §6 moved to paper (with token updates: eyebrow/h2/dt/dd flipped from white-on-navy to ink/navy-700-on-paper); measured live in-browser at 787px / 12.6% continuous dark run (down from 34%), confined to the exempt §7+footer bookend, with no two adjacent content sections sharing a ground. **Batch 4 (MI-1 … MI-9) complete** — all nine minors implemented; MI-6 closed automatically by RI-3 as predicted. **All tasks in this brief are now implemented and verified** — see the as-built verification in [`services-page-as-built-review.md`](services-page-as-built-review.md).

## Scope

This brief translates **only** the approved findings from the review into implementation tasks. It introduces no new findings and re-argues none of the accepted decisions.

Every task carries: affected files, the change, acceptance criteria, and regression notes. Task IDs are stable — reference them in commit messages.

**Sign-off gates:** RB-* must all be closed before release sign-off. RI-1, RI-3, RI-4 and RI-8 involve copy or structure and need CD approval on wording before implementation. MI-* and BL-* do not block.

---

# A. Release Blockers

*All three must be closed before sign-off.*

---

## RB-1 — Card teasers permanently hidden on touch devices ≥640px

**Review ref:** Blocker 1 · §3 · Mobile & touch (4/10)
**Files:** `src/components/services/service-index.tsx` (teaser `<p>` L81, "See how" `<span>` L85); `src/app/globals.css`
**Severity:** Blocks sign-off — violates `docs/services-page.md:34`, marked *mandatory*

### Problem
The hide is a width query (`sm:opacity-0`) but Tailwind wraps `hover:` in `@media (hover: hover)`. On touch devices ≥640px the hide applies and the restore can never fire. iPad portrait (768px) and landscape (1024px) are both affected — the teaser and the only link affordance are unreachable.

### Change
Gate the hide on **input capability**, not viewport width.

Add the variant in `globals.css`:
```css
@custom-variant can-hover (@media (hover: hover) and (pointer: fine));
```

Then on both the teaser and the "See how" span, replace:
```
sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100
```
with:
```
sm:can-hover:opacity-0 sm:can-hover:group-hover:opacity-100 sm:can-hover:group-focus-visible:opacity-100
```

Retaining `sm:` preserves the approved intent (mobile always visible); adding `can-hover` ensures the hide only ever applies where a restore is possible.

### Acceptance criteria
- On a touch device or emulated coarse pointer at 768px and 1024px: teaser and "See how" are visible at rest.
- On a hover-capable desktop at ≥640px: hidden at rest, revealed on hover **and** on keyboard focus.
- Below 640px: visible at rest on all devices.
- Verify in **generated CSS**, not just source — this is mandatory, not optional. Confirm the rule nests as:
  ```
  @media (min-width:40rem){@media (hover:hover) and (pointer:fine){ … opacity:0 … }}
  ```

### If the variant misbehaves
`@custom-variant` with a bare `@media (...)` parameter, stacked against a breakpoint, is the combination most likely to emit something other than intended. **If the nesting inverts or the `can-hover` condition is dropped, use an arbitrary variant directly on the element instead — no custom variant required:**
```
sm:[@media(hover:hover)and(pointer:fine)]:opacity-0
```
Do **not** fall back to plain `sm:opacity-0` — that reintroduces the blocker.

### Regression notes
- Keyboard parity currently works and must not break — `group-focus-visible` must stay outside any hover-only wrapper.
- If **RI-2** ships first, the "See how" span becomes always-visible and drops out of this task; the teaser change still applies.

---

## RB-2 — §4 column labels fail WCAG AA contrast

**Review ref:** Blocker 2 · §4 · Accessibility (5/10)
**Files:** `src/components/services/service-depth.tsx` — the three `<dt>` elements (L61, L67, L73)
**Severity:** Blocks sign-off — measured **3.44:1** against a 4.5:1 requirement

### Change
Replace `text-ink/50` with `text-ink/60` on all three `<dt>` elements.

| Token | On mist | AA (4.5:1) |
|---|---|---|
| `text-ink/50` (current) | 3.44:1 | ❌ |
| `text-ink/60` | 4.77:1 | ✅ |
| `text-ink/65` | 5.68:1 | ✅ |

**Recommended: `text-ink/60`.** It clears AA while preserving tonal separation from the `<dd>` value text at `text-ink/70`. Do not reach for `/65` — the label already reads as a label through uppercase, `tracking-[0.15em]` and `font-semibold`; tone is not carrying that distinction, so the extra margin costs hierarchy without buying accessibility headroom that matters.

### Also in scope
Grep `text-ink/50` and `text-white/50` repo-wide and fix any other body-text usage. On paper the same token measures 3.49:1 — equally failing.

### Acceptance criteria
- All three `<dt>` elements compute ≥4.5:1 against `--color-mist`.
- No remaining `text-ink/50` on non-decorative text anywhere in `src/`.
- The label/value distinction remains visually legible.

---

## RB-3 — Motion ignores `prefers-reduced-motion`

**Review ref:** Blocker 3 · Motion & interaction (5/10)
**Files:** `src/app/layout.tsx`; new `src/components/motion-provider.tsx`
**Severity:** Blocks sign-off on **spec-fidelity** grounds — `docs/services-page.md:36` locks *"degrades cleanly under reduced-motion"*. This is **not** a WCAG AA failure (2.3.3 is AAA); do not re-categorise it as one.

### Problem
Nothing outside `ProofStrip` respects the preference. Framer Motion does not do this automatically — every section and card animates regardless.

### Change
`MotionConfig` is a client component and `layout.tsx` is a Server Component, so it cannot be dropped in directly. Add a thin client wrapper:

```tsx
// src/components/motion-provider.tsx
"use client";
import { MotionConfig } from "framer-motion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
```

Wrap `{children}` in `layout.tsx`'s `<body>`.

`reducedMotion="user"` suppresses transform animations while allowing opacity — the `fadeUp` translate stops, the fade remains. That is the intended "degrades cleanly", not a blanket kill.

### Acceptance criteria
- With OS reduced-motion enabled, **all `fadeUp` transform entrances stop translating on every page**; opacity fade is retained and content is visible without interaction.
- With it disabled, current motion is unchanged.
- `ProofStrip`'s existing count-up handling still lands on the true value (`20+`, `6`, `8`, `PMP`) — it is independent and must not regress.

### Explicitly out of scope for RB-3
`reducedMotion="user"` suppresses Framer Motion **transform and layout** animations only. It does **not** affect:
- plain CSS transitions (`transition-colors`, `transition-opacity`) anywhere on the site;
- the navbar mobile-menu `height` animation (`navbar.tsx:98–101`) — `AnimatePresence` height is a value animation, not a transform.

Neither is a defect against this task. Do not chase them while closing RB-3 — if CD wants them covered, that is **BL-7**.

### Regression notes
Site-wide change. Spot-check Home, About, Team, Policies and Contact, not only Services.

---

# B. Recommended Improvements

*Significant premium-quality gains. Not sign-off gates, but RI-1 is the highest-leverage item in this brief.*

---

## RI-1 — Restore the missing "integrated route" element in engagement mode 3 ★ highest leverage

**Review ref:** §3 fidelity gap · Option B positioning (5/10) · Executive Summary
**Files:** `src/lib/site-data.ts` (`ENGAGEMENT_MODES[2]`, `EngagementMode` interface); `src/components/services/service-index.tsx`
**Gate:** Needs CD approval on form + copy before build.

### Problem
The approved architecture (`docs/services-page.md:18`) defines mode 3 as **three** elements:

> **End-to-end (EPCI)** → **integrated route** + Commissioning & Decommissioning · Marine & Offshore (specialist)

Only the two service cards shipped. The integrated-route element was dropped, so the mode labelled EPCI contains none of the E, P, C or I services — those sit under *Advise Us* and *Deliver for Us*. Option B's hero positioning currently has **no structural expression anywhere on the page**; it is carried entirely by repeated copy.

This is a fidelity gap against approved structure. It is **not** the per-service assignment question that `docs/services-page.md:19` defers, and should not be closed by invoking that line.

### Change
Add the integrated-route element to mode 3 — a lead element preceding the two service cards, expressing the full E→P→C→I path as the integrated route (a row-spanning lead card or an intro panel; form is a CD decision).

Requires an optional field on `EngagementMode` (e.g. `leadElement`) so modes 1 and 2 are unaffected.

Copy is writable now from existing positioning — do not invent projects, metrics or client names.

**Alternative considered and not recommended:** renaming mode 3 to "Through-life & Specialist" also removes the mismatch, but abandons approved structure and surrenders the integrated framing that is the page's entire thesis.

### Acceptance criteria
- Mode 3 renders an element expressing the integrated E→P→C→I route.
- An executive reading the section does not conclude "integrated route = commissioning + marine".
- Modes 1 and 2 render unchanged.
- Reads as structure, not another restatement of the one-team claim (coordinate with **RI-3**/**RI-4**).

---

## RI-2 — Give cards a rest-state link affordance and a real hover surface

**Review ref:** §3 · Executive scanning (5/10) · Visual hierarchy (6/10)
**Files:** `src/components/services/service-index.tsx` (L66 card anchor, L85 "See how")

### Problem
At rest on desktop the card shows only an icon, a 2.62:1 number and a title — no indication it is a link. `transition-colors` is declared on the anchor but **no `hover:` colour is ever set**, so the surface gives no feedback at all.

### Change
1. Persist the "See how" affordance at all times (remove it from the hover-gated set), or add an always-visible corner chevron.
2. Add a genuine hover/focus surface change — e.g. `hover:bg-navy-800`, which is an existing token and now unused since the "specialist" treatment was reverted.
3. Keep or remove `transition-colors` accordingly — it must not remain dead.

### Acceptance criteria
- Cards are identifiable as interactive without hovering, at every viewport.
- Hover and keyboard focus both produce a visible surface change.
- No dead utility classes remain on the anchor.
- All six cards stay visually identical to one another — the rejected two-weight treatment must not reappear.

---

## RI-3 — Rewrite §6 as evidence, not restatement

**Review ref:** §6 · Trust & credibility (7/10) · Premium enterprise quality (6/10)
**Files:** `src/components/services/proof-section.tsx` (`EVIDENCE`)
**Gate:** Copy — needs CD approval.

### Problem
`proof-section.tsx:23` states the intent — *"Proof only — validates §2's promises without restating them"* — and the implementation does not meet it. "20+ years… PMP-certified" and "8 core sectors and 6 countries" sit ~200px above a `ProofStrip` rendering exactly **20+**, **6**, **8**, **PMP**. Two of three items are prose versions of the numbers below them.

### Change
Rewrite all three `EVIDENCE` items to say what the numbers cannot — depth of the credential rather than its magnitude. Drop the sectors/countries restatement entirely. Fixes **MI-6** as a side effect.

### Acceptance criteria
- No `EVIDENCE` item restates a `ProofStrip` figure.
- Each lead matches its own body (see MI-6).
- No fabricated proof introduced.

---

## RI-4 — De-duplicate §2 promises

**Review ref:** §2 · Premium enterprise quality (6/10)
**Files:** `src/components/services/delivery-model.tsx` (`PROMISES`)
**Gate:** Copy — needs CD approval.

### Problem
Two of four slots say the same thing: #1 "One accountable team — *the same team stays responsible throughout*" and #3 "EPCI and PM, one roof — *under a single accountable team, with no handoffs*". Separately, #2 "The people who plan your project are the people who deliver it" is near-verbatim from `src/app/team/page.tsx:22`.

### Change
Merge #1 and #3 into one promise; write a genuinely distinct fourth. Rephrase #2 so it is not verbatim Team.

### Acceptance criteria
- Four promises, four distinct claims.
- No sentence appears verbatim on another page.
- Section still reads as the thesis that sets up §3/§4.

---

## RI-5 + RI-6 — Ground rhythm: paper–paper adjacency and the dark tail ⚠ evaluate as one change

**Review ref:** Layout rhythm & whitespace (6/10) · Premium enterprise quality (6/10)
**Files:** `service-index.tsx`, `delivery-model.tsx`, `proof-section.tsx` (section `bg-*` only)

### Problem
Measured section heights: 528 / 562 / 1443 / 1446 / 646 / 626 / 204, footer 583, document 6036px.
- **RI-5:** §2 and §3 are both `bg-paper` (562px then 1443px), abutting with no divider — they read as one undifferentiated ~2000px white block. The locked paper/mist/navy rhythm breaks here.
- **RI-6:** §5 → §6 → §7 → footer is **2059px of continuous dark ground = 34% of the page**; with the header, 43% is navy. The last third reads as one long dark run.

### Why these are coupled
Fixing RI-5 naively by moving §3 to mist creates a **new** mist–mist adjacency with §4. These must be resolved as a single ground sequence, not patched independently.

### Proposed sequence (CD to confirm)
| Section | Current | Proposed |
|---|---|---|
| §1 Header | navy-900 | navy-900 |
| §2 Delivery Model | paper | **mist** |
| §3 Engage Us | paper | paper |
| §4 Service Depth | mist | mist |
| §5 How We Run | navy-900 + photo | navy-900 + photo |
| §6 Why Lazfields | navy-950 | **paper** |
| §7 CTA | navy-900 | navy-900 |
| Footer | navy-900 | navy-900 |

This alternates cleanly and cuts the dark tail from 2059px to ~787px.

**The §7 + footer navy run is intentional and exempt.** `ContactCta` is documented as a footer bookend (`contact-cta.tsx:14`) and reads as one unit with the footer on every other page. It is not the same defect as the §2/§3 adjacency — see the acceptance criterion below, which is scoped to content sections.

### Trade-off to weigh
§6 on paper places the navy `ProofStrip` panel on a light ground — exactly Home's treatment. That is consistent with the design system but slightly reduces differentiation from Home. If CD prefers to protect differentiation, keep §6 navy-950 and accept a longer dark tail, or move only §2.

### Acceptance criteria
- No two adjacent **content** sections (§1–§6) share a ground colour. The §7 CTA + footer bookend is exempt.
- Continuous dark run reduced from 34% of document height.
- No new colours introduced; `ProofStrip` contrast still passes on whichever ground is chosen.

---

## RI-7 — Fix card CTA misalignment

**Review ref:** §3 · Component consistency (6/10)
**Files:** `src/components/services/service-index.tsx` (L85 "See how" span)

### Problem
Measured: in rows 1 and 3, one card's "See how" sits 176px from card top and its neighbour's 153px — a **23px misalignment**, with trailing gaps of 24px vs 47px. Cards stretch to equal height but content is top-packed. Home's `capabilities-section.tsx:50` solved the analogous problem with a deliberate min-height reservation; that discipline was not carried across.

### Change
Add `mt-auto` to the "See how" span (the anchor is already `flex flex-col h-full`), or reserve teaser height as Home does. `mt-auto` is preferred — it adapts to any teaser length rather than hard-coding a measured height.

### Acceptance criteria
- "See how" baseline-aligns across both cards in all three rows, at all viewports ≥640px.
- Trailing gap below the CTA is equal across a row.
- Holds after RB-1 and RI-2 land.

---

## RI-8 — Differentiate the Services `h1` from Home's `h2`

**Review ref:** Differentiation from Home/About/Contact (6/10)
**Files:** `src/app/services/page.tsx` (`PageHeader` title)
**Gate:** Copy — needs CD approval.

### Problem
Three near-identical headlines, two of them ~600px apart on this page:
- Home `h2`: "Complete project delivery, engineered **for certainty**"
- Services `h1`: "Complete project delivery, engineered **as one integrated capability**"
- Services §2 `h2`: "The complete, integrated delivery capability"

### Change
Rewrite the Services `h1` so it does not share its opening clause with Home's `h2`, and does not pre-empt §2's own heading.

### Acceptance criteria
- No shared opening clause with Home.
- Still states the integrated thesis (Option B must not weaken).
- `<title>`/meta description remain consistent with the new h1.

---

## RI-9 — Strengthen engagement-mode label hierarchy

**Review ref:** §3 · Visual hierarchy (6/10)
**Files:** `src/components/services/service-index.tsx` (L48 mode `h3`, L49 description)

### Problem
Mode labels are `text-lg` (18px); card titles are `text-base` (16px). The three engagement modes — the organising concept of the section — render 2px above the items they organise.

### Change
Raise the mode label's visual weight: a larger display size, or an eyebrow/rule treatment that clearly separates the mode tier from the service tier. Stay within the locked type scale; introduce no new primitives.

### Acceptance criteria
- Mode labels are unambiguously superior to card titles when scanned.
- Heading order stays valid (`h2` → `h3` mode → `h4` service).
- Coordinate with **RI-1**, which adds a fourth element to mode 3.

---

# C. Minor Items

*Nice-to-have refinements. Individually small; batch them.*

| ID | Item | File(s) | Change |
|---|---|---|---|
| **MI-1** | Numbering motif below 3:1 | `service-index.tsx` L72, `service-depth.tsx` L52 | `text-white/30` (2.62:1) → `text-white/45`; `text-ink/30` (1.97:1) → `text-ink/45`. Both `aria-hidden`, so not 1.4.3 violations — the fix is so the §3↔§4 wayfinding motif is actually visible. |
| **MI-2** | "Continuity Advantage" mislabels two rows | `service-depth.tsx` L74 | Rename to a label true for all six (e.g. "The Advantage"). For Procurement and Marine the payoff is not continuity. |
| **MI-3** | §6 eyebrow outranks its heading | `proof-section.tsx` L39–47 | Eyebrow "The Proof Behind the Promise" carries the message; `h2` is the generic "Why Lazfields". Swap or strengthen the `h2`. |
| **MI-4** | Double enumeration in §5 | `how-we-run.tsx` L83 | Add `aria-hidden="true"` to the numeral badge — `<ol>` already conveys position. |
| **MI-5** | JSON-LD `address` is a plain string | `src/app/services/page.tsx` L26 | Emit as a `PostalAddress` object. |
| **MI-6** | "Full lifecycle, integrated" lead ≠ body | `proof-section.tsx` L12–15 | Body talks about sectors/countries (breadth, not lifecycle). Resolved automatically if **RI-3** ships. |
| **MI-7** | `fill` images missing `sizes` | `page-header.tsx` L32, `how-we-run.tsx` L36, `hero.tsx` L77 | Add `sizes="100vw"`. **Lint hygiene only** — the `100vw` default is already correct for these full-bleed images. Do not report as a perf defect. (`hero.tsx` is Home, not Services — included deliberately as repo hygiene since the fix is identical.) |
| **MI-8** | No skip link | `layout.tsx` / `navbar.tsx` | Add skip-to-content. Real (WCAG 2.4.1, Level A), with two caveats: site-wide rather than Services-specific, and the page already exposes `header`/`nav`/`main`/`footer` landmarks, a sufficient technique (ARIA11). |
| **MI-9** | `ProofStrip` animation inconsistency | `proof-strip.tsx` L80–88 | Uses `useInView` + `animate` while every other component uses `whileInView`. Align for consistency — **preserve the reduced-motion count-up handling**, which is correct. |

---

# D. Backlog

*Not part of this release.*

| ID | Item | Notes |
|---|---|---|
| **BL-1** | §4 depth enrichment | Client-supplied named projects and metrics. Already tracked in `docs/services-page.md:108`. **Do not invent specifics.** |
| **BL-2** | Promote services to dedicated pages | The spoke-ready structure already supports it; this is the documented SEO growth path. |
| **BL-3** | Per-service `Service` JSON-LD entities | Once spoke pages exist. |
| **BL-4** | Re-add `/clients-partners` | Only once the client supplies an approved list. Currently blocked by confidentiality per `docs/services-page.md:115`. |
| **BL-5** | §3→§4 scroll affordance | `scroll-behavior` is now `auto`; anchor jumps are instant. If smooth scrolling is reinstated, it must sit behind a reduced-motion guard. Instant is defensible for vestibular safety — this is a refinement, not a defect. |
| **BL-6** | `SERVICE_DETAILS` keyed by title string | A service rename silently breaks the join — `if (!capability || !detail) return null` fails quietly rather than loudly. Consider a stable key or a build-time assertion. |
| **BL-7** | Reduced motion for non-transform animation | Out of scope for RB-3: CSS transitions site-wide, and the navbar mobile-menu `AnimatePresence` height animation (`navbar.tsx:98–101`). Only pursue if CD wants coverage beyond Framer Motion transforms. |

---

# E. Sequencing

**Batch 1 — Blockers (ship first, independently).** RB-1, RB-2, RB-3. Small commits, no dependencies between them. Clears sign-off.

**Batch 2 — Structure & copy (needs CD approval first).** RI-1, RI-3, RI-4, RI-8. All copy/structure; approve wording before building. RI-1 is the highest-leverage item in the brief.

**Batch 3 — Visual system (evaluate together, not piecemeal).** RI-5+RI-6 as one ground-sequence decision; then RI-2, RI-7, RI-9 on §3.

**Batch 4 — Minors.** MI-1 … MI-9. MI-6 may already be closed by RI-3.

### Dependencies
- RB-1 ↔ RI-2 — if RI-2 persists "See how", it drops out of RB-1's scope.
- RI-7 must be re-verified after RB-1 and RI-2 land.
- RI-9 must account for RI-1's added element in mode 3.
- RI-5 and RI-6 must be decided as one sequence.

---

# F. Regression watchlist

Re-check after each batch:

- **Keyboard parity on §3 cards** — currently correct; RB-1 and RI-2 both touch those classes.
- **Card visual uniformity** — all six must stay identical. The two-weight "Specialist" treatment was explicitly rejected by client review (`docs/services-page.md:24`) and must not reappear via hover or ground changes.
- **`ProofStrip` count-up** — must still land on `20+`, `6`, `8`, `PMP`, including under reduced motion. RB-3 and MI-9 both touch this area.
- **Anchor landing geometry** — `scroll-mt-24` (96px) against a 71px navbar. Re-verify if navbar height or section padding changes.
- **Cross-page consistency** — `PageHeader`, `ProofStrip`, `ContactCta` are shared. RB-3 is site-wide. Spot-check Home, About, Team, Policies, Contact.
- **Contrast after any ground change** — RI-5/RI-6 move text between grounds; re-measure anything not pure white or full-strength ink.

---

# G. Explicitly approved — do not "fix"

The review approved these. Changing them is a regression, not an improvement.

- **§4 Service Depth structure** — risk → approach → advantage, the 280px label column, hairline row dividers. Strongest section on the site; only its `<dt>` tone changes (RB-2).
- **§1 and §5 photographic scrim treatment** — identical gradient values, correctly reused.
- **§7 `ContactCta`** — correct and restrained as-is.
- **Semantic structure** — landmarks, `aria-labelledby`, heading order, `alt=""` on decorative images, `aria-hidden` on icons.
- **Focus rings** — gold with correct `ring-offset` per ground. Better than most commercial sites; preserve exactly.
- **Design-token discipline** — no new colours, type scale or motion primitives. Every task above stays within the locked system.
- **Single-source data model** — `site-data.ts` keying prevents §3/§4 drift (see BL-6 for the one robustness caveat).
- **Content integrity** — no fabricated clients, projects or metrics. The `/clients-partners` restraint was correct and stands.
- **Instant anchor scrolling** — defensible for vestibular safety; see BL-5.

---

# H. Reviewer notes carried forward

**One finding was discarded during the audit — do not re-raise it.** A screenshot showed `ProofStrip` reading "6+ years / 2 countries / 2 sectors" instead of 20+/6/8. Live DOM inspection returned the correct values with `requestAnimationFrame` confirmed paused (`rafFired: false`) in the hidden automation tab. It was stale paint from a throttled count-up, **not a defect**. The count-up code is correct, including its reduced-motion handling.

**Verification guidance.** When testing these tasks in an automated browser, screenshots of animated state are unreliable — hidden tabs pause `requestAnimationFrame` and `IntersectionObserver`. Verify dynamic state via computed styles and DOM reads, and verify responsive/interaction gating against **generated CSS** rather than source classes. Two intermediate readings during this audit were contaminated before the pattern was caught; the blockers above are all backed by generated-CSS or clean-load evidence.

**Scoring context.** Overall 6.3/10 across 17 dimensions. The lowest scores — Mobile & touch (4), Executive scanning (5), Accessibility (5), Motion (5), Option B positioning (5) — are addressed by RB-1, RI-2, RB-2/RB-3 and RI-1 respectively. Closing Batches 1–3 should move every one of those into the 7–8 range.
