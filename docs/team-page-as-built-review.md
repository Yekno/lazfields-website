# Team Page — Design Review Board: As-Built Review

**Type:** As-built implementation review. Not an architecture review — approved structure is taken as given and is not re-litigated.
**Artifact reviewed:** `/team` as built, rendered at `localhost:3001`, measured at 1280px and 375px.
**Baselines:** `docs/team-page-review.md` (first-look review + same-day Resolution) · About page (`/about`) for cross-page coherence.
**Date:** 2026-08-06
**Benchmark applied:** the leadership pages of Jacobs, Arup, Turner & Townsend, Mace, Arcadis.
**Verdict:** ⚠ **Approved with Revisions** — 1 release blocker, 4 recommended improvements.

**Implementation tasks arising from this review are specified in [`team-page-revision-brief.md`](team-page-revision-brief.md) as RB-1, RI-1 … RI-4, MI-1 … MI-3 and BL-1 … BL-6.**

**Disclosure:** this reviews an implementation completed in the immediately preceding session by the same agent. Three of the findings below (RB-1, RI-1, RI-2) are defects introduced by that implementation, and one (RI-3) is a partial closure previously reported as complete. They are recorded plainly rather than softened.

---

## Executive Summary

The page is **functionally and accessibly sound, and substantially stronger than it was 24 hours ago.** The two changes that mattered most both landed: real headshots replace initials monograms, and Okolie's bio went from a single sentence to three substantive paragraphs. The leader-card height disparity that the first-look review flagged as a content constraint has largely resolved itself — **620px vs 380px (1.63:1)**, down from **620px vs 150px (4.1:1)**. On About, the two cards are now **pixel-identical at 283px**. That is the single biggest credibility gain available to this page, and it was taken.

Every accessibility check passes. All nine text/ground pairs clear WCAG AA with margin (lowest **5.80:1** against a 4.5:1 requirement). Heading order is valid, one `h1`, `lang="en"`, skip-link target present, both photos correctly `alt=""` beside their adjacent `h3`, no console errors, no horizontal overflow at 375px.

**One finding blocks sign-off, and it is a presentation defect rather than a technical one.** The page now renders three consecutive cards labelled **"Director"** — Okolie's, followed by two empty placeholder seats carrying the identical label. A senior buyer scanning the role column sees the firm's most credentialled leader typographically flattened into a set of vacancies. This undermines the precise thing the page exists to do.

The placeholder-seat decision itself is **client-instructed and user-approved and is not reopened here.** What is reviewed is its execution, which is where the blocker and two of the recommendations sit.

---

## Per-Section Analysis

### §1 — Page Header (`PageHeader`, navy-900, no photo)

Height 480px. `h1` at 48px/700 Manrope (36px at 375px), eyebrow 12px `gold-500` at 10.69:1, description 18px `white/70` at 9.08:1. `h1` contrast 17.9:1.

The description was rewritten in the last session and is now doing real work: *"Engineering, project and programme leadership shaped by decades of complex-sector delivery — from FPSO and nuclear projects to public-health research — set out here in full, qualifications included."* It names the two disciplines actually represented below rather than restating the `h1`, and it no longer promises support staff the page never shows. This closes the original F1 finding for this page.

**Observation, not a defect:** this is the only interior page whose header carries no `backgroundImage`. `/about`, `/services` and the rest use the approved grayscale-plus-scrim photo band. Flat navy is a legitimate choice for a page whose content *is* portraiture — competing photography above photographs would fight. Recorded so a future contributor doesn't "fix" it into inconsistency.

### §2 — Team Content (`TeamContent`, paper, 1869px)

The page's entire substance. Eyebrow 12px `navy-700` (12.91:1) → `h2` 36px (18.69:1) → intro 18px `ink/65` (5.86:1) → card list.

The intro was rewritten last session and no longer duplicates About's leadership paragraph. It also pre-announces the placeholder seats — *"and two more Director seats to be announced as the team grows"* — which is the right call: it frames the empty cards as intent before the reader meets them, rather than leaving them to be discovered as gaps.

**Card list** — `flex flex-col gap-10`, four `<li>`, all genuine `<li>` (list semantics intact):

| # | Card | Height @1280 | Height @375 | Body paras |
|---|---|---|---|---|
| 1 | Engr. Ian I. Banks — *Founder* | 620px | 1800px | 6 |
| 2 | Dr. Obiageli (Oby) Okolie, PhD — *Director* | 380px | 1269px | 3 |
| 3 | *(placeholder)* — **Director** | 130px | 194px | 0 |
| 4 | *(placeholder)* — **Director** | 130px | 194px | 0 |

Cards 1–2 carry `shadow-card` on a solid `bg-paper` surface with `border-line`. Cards 3–4 use `border-dashed` on `bg-mist/40` with no shadow — the visual differentiation is real and correctly signals "not a person." Where it fails is the **role label**, which is byte-identical across cards 2, 3 and 4. See RB-1.

### §3 — Conversion Close (`ContactCta`, navy-900, 204px)

Unmodified shared component. Heading 30px/700 at 17.9:1, gold button `navy-950` on `gold-500` at **11.57:1**, focus ring present and correctly scoped. The page's only focusable element in `<main>` — appropriate, since no leader card is a link.

---

## Strengths

- **The bio-balance problem largely solved itself through content, not layout tricks.** 4.1:1 → 1.63:1 on Team; 283px vs 283px on About. No artificial truncation, no forced equal-height hack, no invented filler. This is the correct way to have fixed it.
- **Photo implementation is disciplined.** `object-cover` circular crops, per-subject `objectPosition` (Okolie tuned to `50% 20%` because she sits high and off-axis in her source frame), `alt=""` with the name in the adjacent `h3` — no double-announcement — `loading="lazy"` correctly applied to below-fold images, and both routed through the Next optimizer.
- **Accessibility is genuinely clean, not clean-by-assumption.** Every ratio below was computed from canvas pixel readback, because Tailwind v4 resolves opacity-modified colours to `oklab()` and cannot be fed directly into a WCAG formula. Lowest text value is 5.80:1.

  | Element | Ground | Ratio |
  |---|---|---|
  | `h1` white | navy-900 | 17.90 |
  | Header eyebrow `gold-500` | navy-900 | 10.69 |
  | Header description `white/70` | navy-900 | 9.08 |
  | Section eyebrow / leader role `navy-700` | paper | 12.91 |
  | `h2` / leader name `ink` | paper | 18.69 |
  | Section intro / card body `ink/65` | paper | 5.86 |
  | Placeholder "Director" `navy-700` | mist/40 over paper | 12.60 |
  | Placeholder "Joining Lazfields" `ink/65` | mist/40 over paper | 5.80 |
  | CTA button `navy-950` | gold-500 | 11.57 |

- **Mobile structure holds.** No horizontal overflow at 375px (`scrollWidth` 360 ≤ viewport). Cards collapse `sm:flex-row` → `column` cleanly, photos hold 64×64, type steps down 48→36px (`h1`) and 36→30px (`h2`).
- **Content fidelity is intact — nothing fabricated.** Okolie's three paragraphs are the client document verbatim. Banks' six are unchanged from the prior brief. The two placeholder cards carry no invented name, photo, or credential — exactly the restraint `site-data.ts` mandates for the unfilled seats.
- **No new design primitives.** The card, monogram fallback, eyebrow, and dashed placeholder all reuse established tokens. The monogram path survives as a fallback for any future leader supplied without a photo — the data model degrades correctly rather than assuming a photo always exists.

---

## Weaknesses

Ordered by severity. Each is directly observable in the built page.

### 1. Three consecutive "Director" labels — *release blocker, see RB-1*

Measured role labels in DOM order: `["Founder", "Director", "Director", "Director"]`.

### 2. Placeholder cards do not animate; every other card does

Measured on first paint, cards below the fold, no forcing applied:

| Card | `opacity` | `transform` |
|---|---|---|
| Banks | `0` | `matrix(1,0,0,1,0,20)` |
| Okolie | `0` | `matrix(1,0,0,1,0,20)` |
| Placeholder ×2 | `1` | `none` |

The leader cards are `motion.li` under `fadeUp(20)`; the placeholders are plain `<li>`. On scroll the two empty cards are **already fully visible** while the cards above them are still rising and fading in. The reading is "these two failed to animate," not "these two are deliberately quiet." Every other repeated card group in this codebase — Services modes, capability cards, policy cards, About leaders — animates on entry. See RI-1.

### 3. About's leadership copy has drifted out of coherence with the new role data

`/about` still reads:

> **h2:** "Led by an experienced founding team"
> **intro:** "The business is led by **founding members** with strong management capability…"

Directly beneath, the cards now read *Founder* and **Director**. Changing Okolie's role from "Founding Member" to "Director" — correct per the client document — silently weakened copy on a page that was not touched. The claim is not false (she is a founder who now holds a Director title), but the visual evidence no longer supports the sentence. See RI-2.

### 4. The over-promise F1 identified is only two-thirds closed

F1 in the first-look review listed **three** locations carrying *"supported by skilled personnel across technical, operational and administrative functions."* Two were rewritten last session. **The third — `about/founding-leadership.tsx` — still carries it verbatim**, and the Resolution note in `team-page-review.md` reported F1 closed without qualifying that. On About the claim is milder, since that page is about the firm rather than the roster, but it remains a promise of personnel no page on the site shows. See RI-3. *(This corrects the earlier closure claim.)*

### 5. Headshots are served below their display resolution

`width={64} height={64}` on a non-square source (Banks 1290×1083) makes the optimizer emit **64×54**, which `object-cover` then upscales to fill a 64×64 slot — roughly 18% vertical upscale before device pixel ratio is considered. Okolie's serves 64×68. Against firms whose leadership photography is a deliberate asset, softness on the only two faces on the site is a poor trade for a few kilobytes. See RI-4.

---

## Missed Opportunities

Not defects. Recorded for the backlog.

- **Banks' bio runs 1800px on a 375px viewport** — roughly 79 lines of unbroken 14px prose, with degrees, certifications and society memberships buried in the sixth paragraph. Peer firms surface credentials as a scannable block (qualifications, certifications, sectors) beside the narrative. The content is excellent; its shape is unstructured for mobile scanning.
- **No sector or geography signal on the cards themselves.** The data exists — FPSO, nuclear, aerospace defence, six countries, PMP, UWE Bristol — but a scanner must read full paragraphs to find it. A short credential line under each role would carry the expertise claim at scan speed.
- **The page carries no proof element.** `ProofStrip` (20+ / 6 / 8 / PMP) exists and is used on Services. A team page is where those numbers are most literally about *people*.
- **Single-ground run.** `paper` occupies 1869px — 60% of the page — between two short navy bookends. Services was explicitly re-sequenced to avoid exactly this. Defensible at three sections, but it is the reason the page reads flatter than its siblings.

---

## Risk Assessment

| Risk | Likelihood | Impact | Notes |
|---|---|---|---|
| Buyer reads Okolie as a placeholder, not a person | **High** | **High** | RB-1. Three identical labels; hers is the only credentialled non-founder profile on the site. |
| Empty seats read as "small firm advertising vacancies" | Medium | Medium | Inherent to the client-instructed approach, not to this implementation. Mitigated by the intro's framing. Watch, don't change. |
| Placeholder cards read as a rendering bug | Medium | Low–Medium | RI-1. Static cards below animating ones. |
| About copy contradicts visible role labels | Medium | Low | RI-2. Compounds as more Directors are added. |
| Unbacked "skilled personnel" claim persists on About | Low–Medium | Low | RI-3. Same class of issue F1 raised. |
| Headshot softness on retina | Medium | Low | RI-4. Most visible on the page's focal elements. |
| Reduced motion unobserved | Low | Medium | Inherited site-wide gap (CO-2). Mechanism is standard and correctly wired at the root layout; still never watched. |

---

## Scores (/10)

| Dimension | Score | Note |
|---|---|---|
| Information architecture | 8 | Correctly the "full version" of About's preview; no competition between them. |
| Executive readability & scanning | 6 | Credentials buried in prose; no scan-speed expertise signal. |
| Typography | 8 | Consistent scale, correct families, clean mobile step-down. |
| Layout rhythm & whitespace | 7 | Card rhythm good; one 1869px single-ground run flattens the page. |
| Visual hierarchy | 6 | Undermined by identical role labels across a leader and two vacancies. |
| Trust & credibility | 6 | Real photos and full bios lift it; RB-1 pulls it back down. |
| Leadership presentation | 5 | **Weakest dimension.** Okolie is flattened into the placeholder set. |
| Team positioning | 7 | Honest about size, does not overstate. Intro framing is well judged. |
| Premium enterprise quality | 6 | Non-animating cards and soft headshots are exactly the details peers get right. |
| Accessibility (WCAG AA) | 9 | All text passes with margin; semantics, alt, focus, lang all correct. |
| Mobile experience | 7 | Structurally clean, no overflow; 1800px bio card is a scanning burden. |
| Motion & interaction | 6 | Two of four cards silently opt out of the site's entry animation. |
| Content fidelity (no fabrication) | 10 | Client content verbatim; nothing invented for the empty seats. |
| Component consistency | 8 | Reuses all primitives; photo/monogram fallback is a clean extension. |
| Narrative flow | 7 | Header → intro → leaders → seats → CTA reads correctly. |
| Design-system consistency | 8 | Tokens, spacing and type match Home/About/Services/Contact. |
| Long-term scalability | 9 | `photo?`/`fullBio?` optional fields and a seat constant make growth trivial. |
| **Overall** | **7.2** | Solid, accessible, honest — held back by one presentation defect and three polish items. |

---

## Release Blockers

*Must be resolved before sign-off.*

### RB-1 — Okolie's role label is indistinguishable from two empty seats

**Files:** `src/components/team/team-content.tsx` (placeholder block) · optionally `src/lib/site-data.ts`
**Evidence:** role labels in DOM order — `["Founder", "Director", "Director", "Director"]`. Cards 2, 3 and 4 render the identical string in the identical `text-xs uppercase tracking-[0.15em] text-navy-700` treatment. Card 2 is a real person with a PhD, a PMP, a UWE Bristol appointment and three paragraphs of record. Cards 3 and 4 are empty.

**Why this blocks.** The page's stated job is to communicate leadership credibly without overstating size. A reader scanning the role column — which is exactly how executives scan a leadership page — reads *Director, Director, Director* and cannot tell from that column which is a person. It devalues the firm's only credentialled non-founder profile, and it is the one place where the client-instructed empty seats actively damage rather than merely occupy space.

**Fix.** Differentiate the placeholder label from a held title. The label should not be the bare word a real Director carries. Options, in preference order:

1. **Change the placeholder label only** — e.g. `Director — Incoming`, `Future Appointment`, or `Director Seat`. One-line change, leaves real data untouched, and preserves the client's "two Director spots" instruction literally.
2. **Differentiate typographically as well** — keep "Director" but drop the placeholder label to `text-ink/55` and remove `font-semibold`, so held titles read at full weight and unfilled ones read as annotation. Verify contrast if taken (`ink/55` on the composited placeholder ground).

Do **not** solve this by expanding Okolie's `role` back to the full compound string — that slot is a typographic eyebrow, and the long form wraps to three lines beside Banks' single word. Her fuller title already appears verbatim in her first `fullBio` paragraph.

---

## Recommended Improvements

*Meaningful gains in premium quality. Not sign-off gates.*

### RI-1 — Make the placeholder cards animate with the rest of the list

**File:** `src/components/team/team-content.tsx`
Convert the placeholder `<li>` to `motion.li` with the same `fadeUp(20)`, `whileInView`, `viewport={{ once: true, margin: "-60px" }}` and staggered `delay` used by the leader cards, continuing the index sequence (`(LEADERS.length + i) * 0.08`). **Acceptance:** on first paint below the fold, all four cards report `opacity: 0`; after entry, all four report `opacity: 1`. Currently cards 3–4 report `opacity: 1` and `transform: none` from first paint.

### RI-2 — Realign About's leadership copy with the Director tier

**File:** `src/components/about/founding-leadership.tsx`
`h2` "Led by an experienced founding team" and the intro's "led by founding members" now sit above cards reading *Founder* and *Director*. Adjust the copy so it covers a founder-plus-director leadership group rather than implying both are founding members. Copy change — route through CD approval per house precedent.

### RI-3 — Remove the remaining unbacked "skilled personnel" claim

**File:** `src/components/about/founding-leadership.tsx`
The third of F1's three locations still reads *"supported by skilled personnel across technical, operational and administrative functions."* No page on the site introduces those people. Either drop the clause or replace it with something the site can evidence. Closing this fully retires F1. **This review corrects the prior "F1 closed" note, which covered only the two Team-page instances.**

### RI-4 — Serve headshots at their display resolution

**Files:** `src/components/team/team-content.tsx`, `src/components/about/founding-leadership.tsx`
`width={64} height={64}` on non-square sources yields **64×54** (Banks) and **64×68** (Okolie) for a 64×64 `object-cover` slot. Raise the intrinsic request to `width={192} height={192}` (CSS classes unchanged — `h-16 w-16` still governs layout) so the optimizer emits enough pixels for 2× and 3× displays. **Acceptance:** `naturalWidth` ≥ 128 at dpr 1; no change to rendered layout geometry.

---

## Minor Improvements

*Non-blocking refinements.*

- **MI-1 — Placeholder chrome is very faint.** Dashed border computes **1.22:1** and the `UserRound` icon **1.99:1** against the card ground. Neither is a WCAG failure — both are decorative and `aria-hidden`, with the text carrying all meaning, the same exemption applied to the Services numbering motif. But on a bright screen the cards may read as barely present, which works against the "deliberate growth" message. If revisited, lift the border toward 3:1.
- **MI-2 — Placeholder cards carry no heading.** Leader cards expose an `h3`; placeholders do not, so heading-navigation users encounter two leaders and never learn the team is expanding. Defensible — they are not people, and inventing an `h3` for an empty seat would be worse — but the growth signal is sighted-only. The intro's "two more Director seats" line is the mitigation; keep it if the placeholders are ever restyled.
- **MI-3 — Placeholder alignment differs from leader cards.** Placeholders use `sm:items-center`; leader cards default to stretch. At current content lengths this is invisible. Noted only so the divergence is intentional rather than inherited.

---

## Future Enhancements

*Not part of this release.*

- Structured credential block (qualifications · certifications · sectors) beside each bio, addressing both executive scanning and the 1800px mobile card.
- `ProofStrip` on this page, where 20+ / 6 / 8 / PMP are most literally claims about people.
- Real headshots for the two Directors when appointed — the `photo?` field and monogram fallback already accommodate this with no code change.
- Revisit ground rhythm if a fourth section is ever added; the current 1869px `paper` run is the main reason the page reads flatter than Services.
- One manual `prefers-reduced-motion` pass (inherited site-wide item CO-2), which would also cover RI-1's new animations.

---

## Final Verdict

⚠ **Approved with Revisions**

The implementation is accessible, honest, well-componentised and materially better than what preceded it. Real photography and Okolie's full record fixed the credibility gap the first-look review identified, and they fixed it with content rather than with layout compensation. Nothing is fabricated, no approved decision was weakened structurally, and every accessibility check passes with margin.

**RB-1 must be resolved before sign-off.** Three identical "Director" labels flatten the firm's most credentialled leader into a pair of vacancies, on the one page whose entire purpose is presenting leadership credibly. It is a one-line fix.

RI-1 through RI-4 are what separate this from a page that would hold its own against Arup or Turner & Townsend: cards that all animate, cross-page copy that matches the roles on screen, no unbacked personnel claim, and headshots that are actually sharp.

**Re-review is not warranted.** RB-1 and RI-1/RI-4 are verifiable on inspection and by the acceptance criteria stated above; RI-2 and RI-3 are copy changes requiring CD approval rather than a further Board cycle.

---

---

## Post-Revision Verification (2026-08-06)

**Scope:** confirms closure of the findings above against `docs/team-page-revision-brief.md`. Not a new review cycle — no new findings, no re-scoring of dimensions not affected by the revision.

**Verdict:** ✅ **Approved for Release.** The blocker is closed. No remaining Team-page issue is release-blocking.

### Blocker

| ID | Status | Evidence |
|---|---|---|
| **RB-1** | ✅ **CLOSED** | Role column measured live: `["Founder", "Director", "Director — Incoming", "Director — Incoming"]`. Okolie's label is now textually distinct from both vacant seats. `LEADERS[1].role` remains exactly `"Director"` and `LEADERS[0].role` exactly `"Founder"` — the fix touched only the placeholder's static JSX, not the data model, as the brief required. Contrast unchanged at **12.60:1** (same `text-navy-700` token). The explicitly-rejected option — expanding Okolie's `role` to the compound string — was not used. |

### Recommended improvements

| ID | Status | Evidence |
|---|---|---|
| **RI-1** | ✅ **CLOSED** | Initial paint, **no forcing applied**, list below fold: all four `<li>` report `opacity: "0"` and an identical `matrix(1, 0, 0, 1, 0, 20)`. Previously the two placeholders reported `opacity: "1"` / `transform: none` while the leaders were still hidden. Forced end-state confirms all four reach `opacity: "1"` / `transform: none`. Stagger is continuous by construction — `(LEADERS.length + i) * 0.08` yields 0.16s / 0.24s after the leaders' 0s / 0.08s. `viewport={{ once: true }}` retained. Card geometry unchanged at 620 / 380 / 130 / 130px. |
| **RI-4** | ✅ **CLOSED** | Both routes. `naturalWidth` now **192** on both photos (was 64, cropping to 64×54 and 64×68). Rendered geometry still **64×64** CSS px. `alt=""`, `object-fit: cover`, `objectPosition` `50% 50%` / `50% 20%`, optimizer routing and lazy loading all retained. No `priority` prop introduced. |
| **RI-2** | ⏸ **OPEN — CD-gated, not blocking** | `founding-leadership.tsx:29,32` unchanged, as instructed. |
| **RI-3** | ⏸ **OPEN — CD-gated, not blocking** | `founding-leadership.tsx:33` still carries the phrase. Verified deliberately unmodified. |

### Minor items

| ID | Status |
|---|---|
| **MI-1** | ⏸ **OPEN — CD-gated.** Placeholder chrome unchanged (`border-dashed`, `text-ink/30`), as instructed. |
| **MI-2** | ✅ **Constraint held.** Placeholder cards expose no heading; the section intro's "two more Director seats" clause is intact. |
| **MI-3** | ⏸ **Deliberate no-change.** The `sm:items-center` divergence remains; the brief permitted either resolution provided the choice was recorded. Recorded here. |

### Regression check — clean

No regression found in any watchlist item.

- **Contrast — all 13 text/ground pairs re-measured, none carried forward.** Lowest **5.80:1** against a 4.5:1 requirement; zero pairs below AA. Values identical to pre-revision.
- **Heading order** `H1 → H2 → H3 → H3 → H2`, zero skips, exactly one `h1`. Unchanged.
- **List semantics** — `<ul>` with 4 children, all `<li>`. `motion.li` still renders `<li>`, as the brief anticipated.
- **Mobile at 375px** — no horizontal overflow (`scrollWidth` 360 ≤ 375), cards collapse to `column`, photos hold 64×64.
- **Monogram fallback survives** in both components; `FUTURE_DIRECTOR_SEATS` still governs the placeholder count (no hard-coded pair).
- **About** — card height parity holds at 283 / 283px; "Meet the team" link and target unchanged.
- **Bio content untouched.** `git diff` confirms no change to any `bio` or `fullBio` string.
- **Semantics** — `lang="en"`, `#main-content`, five `aria-hidden` decorations, `ContactCta` focus ring — all unchanged.
- `npm run lint` **0**, `npx tsc --noEmit` **0**, `npm run build` succeeds, 9/9 routes static.

**One regression check performed beyond the brief's watchlist**, because RB-1's fix lengthened a string inside a fixed typographic slot: `"Director — Incoming"` renders on **one line at both 1280px and 375px** (175px wide inside a 312px card). No wrap, no layout disturbance. This is a regression check on the accepted fix, not a new finding.

### Why the open items do not block release

**RI-2, RI-3 and MI-1 are all CD-gated and were correctly left unimplemented.** None is a Team-page defect:

- **RI-2 and RI-3 live in `about/founding-leadership.tsx`** — the About page. The Team page as built carries no unbacked claim and no role-coherence mismatch. The brief classified both as Recommended, explicitly not sign-off gates.
- **MI-1 is a visual-weight preference** on decorative, `aria-hidden` chrome. The as-built review already established it is **not** a WCAG failure.

**One item to carry, stated plainly:** RI-3 is an unevidenced personnel claim on a live public page. It does not gate *this* page's release, but it should be closed before the site as a whole is considered final. It is tracked, not forgotten.

**Inherited site-wide item unchanged:** reduced motion (**CO-2**) remains verified by code inspection only. RI-1 added two elements to that contract; the same single manual pass covers them. Human-only, unchanged in status by this revision.

---

### Review methodology

- **No finding derives from a screenshot.** Every section of this page animates via `whileInView`, and the automation tab pauses `IntersectionObserver`; it additionally reported `innerWidth: 0` and refused resize, making capture impossible. All geometry, typography and colour evidence was gathered by measuring the live DOM inside a **fixed-size same-origin iframe harness** (1280×2400 and 375×3000), which gives deterministic viewport control the host tab could not. Motion end-states were force-applied for geometry passes and deliberately *not* applied for the initial-paint pass that produced the RI-1 evidence.
- **Contrast** computed via canvas pixel readback — necessary because Tailwind v4 resolves opacity-modified colours to `oklab()` — then composited over the actual background (including the placeholder card's `mist/40` over `paper`) and run through the WCAG 2.x relative-luminance formula. Not estimated from source classes.
- **Photo crop framing** was verified in the prior session by rendering both sources onto a canvas with the same `object-cover` circular geometry the page applies, at 64px and magnified, and inspecting the result.
- **Limits, stated plainly:** reduced-motion behaviour was **not** observed live — the tooling exposes no `setEmulatedMedia`, and `MotionConfig reducedMotion="user"` resolves at hydration, so post-load patching is not honoured. It remains verified by code inspection only, exactly as the Services reviews recorded. No visual/aesthetic judgement in this document rests on having seen the page rendered as an image; where such judgement would have been required, none is offered.
