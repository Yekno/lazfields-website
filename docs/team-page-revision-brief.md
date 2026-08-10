# Team Page — CD Revision Implementation Brief

**Source:** `docs/team-page-as-built-review.md` (Design Review Board, as-built review) — verdict ⚠ Approved with Revisions, 7.2/10
**Prior review:** `docs/team-page-review.md` (first-look review + Resolution + 2026-08-06 correction)
**Architecture baseline:** unchanged — no rework required. Team remains the full-detail counterpart to About's condensed leadership preview.
**Created:** 2026-08-06
**Status:** **RB-1 closed. RI-1, RI-4 closed. MI-2 held, MI-3 resolved as a deliberate no-change.** RI-2, RI-3 and MI-1 remain open — all CD-gated and all non-blocking. Verified 2026-08-06; see the Post-Revision Verification section of [`team-page-as-built-review.md`](team-page-as-built-review.md). **Team page verdict: ✅ Approved for Release.**

This brief translates **only** the accepted findings from the as-built review into implementation tasks. It introduces no new findings and re-argues no accepted decision.

Every task carries: affected files, the exact change, rationale traced to the review, acceptance criteria, and regression notes. **Task IDs are stable and match the review's own numbering** — reference them in commit messages.

**Format note:** the brief this is modelled on is `docs/services-page-revision-brief.md`. No Contact-page brief exists in `docs/`; if one was produced outside the repo it was not available when this was written.

---

## Approval gates

Each task is tagged with one of two markers. **Do not begin a CD-gated task until wording or visual treatment is signed off.**

| Marker | Meaning |
|---|---|
| 🟢 **Engineering Safe** | Mechanical, accessibility, or performance work. No CD approval needed. Build it. |
| 🟡 **CD Approval Required Before Implementation** | Touches copy, visual hierarchy, or content strategy. Bring the proposed wording/treatment to CD first. |

| ID | Task | Gate | Blocks sign-off? |
|---|---|---|---|
| **RB-1** | Differentiate placeholder role label from a held title | 🟡 CD Approval Required | **Yes** |
| **RI-1** | Placeholder cards must animate with the list | 🟢 Engineering Safe | No |
| **RI-2** | Realign About's "founding team" copy with the Director tier | 🟡 CD Approval Required | No |
| **RI-3** | Remove the remaining unbacked "skilled personnel" claim | 🟡 CD Approval Required | No |
| **RI-4** | Serve headshots at display resolution | 🟢 Engineering Safe | No |
| **MI-1** | Lift placeholder chrome contrast | 🟡 CD Approval Required | No |
| **MI-2** | Preserve the growth signal for non-sighted users | 🟢 Engineering Safe *(constraint, not a change)* | No |
| **MI-3** | Resolve placeholder/leader alignment divergence | 🟢 Engineering Safe | No |

### Critical sequencing constraint

**RB-1, RI-1, MI-1, MI-2 and MI-3 all edit the same JSX block** — `team-content.tsx:81–99`. Land them as **one coordinated edit**, not five sequential ones. Five separate passes over twenty lines will produce merge churn and repeated re-verification for no benefit. See §E.

---

# A. Release Blockers

*Must be resolved before sign-off.*

---

## RB-1 — Placeholder role label is indistinguishable from a real Director

🟡 **CD Approval Required Before Implementation** *(label wording is copy; typographic option alters visual hierarchy)*

**Review ref:** Release Blockers · RB-1 · Leadership presentation (5/10) · Trust & credibility (6/10) · Visual hierarchy (6/10)
**Files:** `src/components/team/team-content.tsx` — placeholder label, **L93–95**
**Severity:** Blocks sign-off. The page's stated purpose is to communicate leadership credibly without overstating size; this finding directly defeats it.

### Problem

Measured role labels in DOM order:

```
["Founder", "Director", "Director", "Director"]
```

Cards 2, 3 and 4 render the identical string in the identical treatment — `text-xs font-semibold uppercase tracking-[0.15em] text-navy-700`. Card 2 is Dr. Obiageli (Oby) Okolie, PhD: a PMP-certified Director with a UWE Bristol visiting appointment and three paragraphs of record. Cards 3 and 4 are empty seats.

Executives scan a leadership page by role column. That column currently cannot distinguish a person from a vacancy, and it flattens the firm's only credentialled non-founder profile into the placeholder set.

### Change

Differentiate the **placeholder** label so it does not read as a held title. Two options — CD to choose:

**Option 1 (preferred) — change the placeholder label text only.**

```tsx
// team-content.tsx L93–95, placeholder block only
<p className="text-xs font-semibold uppercase tracking-[0.15em] text-navy-700">
  Director — Incoming
</p>
```

Candidate wordings for CD: `Director — Incoming` · `Future Appointment` · `Director Seat` · `Director — To Be Announced`. One-line change, leaves `LEADERS` data untouched, and honours the client's "two Director spots" instruction literally.

**Option 2 — differentiate typographically as well.** Keep the word "Director" but drop the placeholder label to `text-ink/55` and remove `font-semibold`, so held titles read at full weight and unfilled seats read as annotation. **If taken, re-measure contrast** against the composited placeholder ground (`mist/40` over `paper` = `rgb(252,252,251)`); `text-ink/65` currently measures 5.80:1 there, and `/55` must clear 4.5:1.

### Explicitly rejected — do not implement

**Do not solve this by expanding Okolie's `role` back to the compound string** `"Director | Public Health Consultant | Project Management Professional"`. That field is a typographic eyebrow slot sized for one or two words; the long form wraps to three lines beside Banks' single-word "Founder". Her fuller title already appears verbatim in her first `fullBio` paragraph. This was tried and reverted during implementation — see §H.

### Acceptance criteria

- The role label on cards 3–4 is visually and textually distinguishable from card 2's at a glance, without reading the card body.
- `LEADERS[1].role` remains exactly `"Director"` — unchanged.
- Banks' label remains exactly `"Founder & CEO"` — unchanged. (Was `"Founder"`; the client revised the title on 2026-08-10.)
- If Option 2 is chosen, the placeholder label computes **≥4.5:1** against `rgb(252,252,251)`, measured by canvas readback (not estimated from the class name).
- No name, photo, or credential is invented for either empty seat.

### Regression notes

- The placeholder block is also touched by RI-1, MI-1, MI-2 and MI-3 — land as one edit (§E).
- `FUTURE_DIRECTOR_SEATS` (`site-data.ts`) governs the count. Do not hard-code two cards.
- Section intro (`team-content.tsx:30–34`) pre-announces "two more Director seats". If the label wording changes materially, confirm the intro still reads coherently against it — but **do not rewrite the intro**, which is explicitly approved (§G).

---

# B. Recommended Improvements

*Meaningful premium-quality gains. Not sign-off gates.*

---

## RI-1 — Placeholder cards skip the site's entry animation ★ highest leverage of the non-blockers

🟢 **Engineering Safe**

**Review ref:** Weaknesses #2 · Motion & interaction (6/10) · Premium enterprise quality (6/10)
**Files:** `src/components/team/team-content.tsx` — **L81–99**

### Problem

Measured on first paint, cards below the fold, no forcing applied:

| Card | `opacity` | `transform` |
|---|---|---|
| Banks | `0` | `matrix(1,0,0,1,0,20)` |
| Okolie | `0` | `matrix(1,0,0,1,0,20)` |
| Placeholder ×2 | `1` | `none` |

Leader cards are `motion.li` under `fadeUp(20)`; placeholders are plain `<li>`. On scroll the two empty cards are already fully visible while the cards above them are still rising and fading in. It reads as "these two failed to animate", not as a deliberate quiet treatment. Every other repeated card group in this codebase — Services engagement modes, capability cards, policy cards, About leaders — animates on entry.

### Change

Convert the placeholder `<li>` to `motion.li` using the identical motion contract as the leader cards, continuing the stagger sequence rather than restarting it:

```tsx
{Array.from({ length: FUTURE_DIRECTOR_SEATS }).map((_, i) => (
  <motion.li
    key={`future-director-${i}`}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
    variants={fadeUp(20)}
    transition={{ duration: 0.5, delay: (LEADERS.length + i) * 0.08, ease: SECTION_EASE }}
    className="flex flex-col items-start gap-6 rounded-xl border border-dashed border-line bg-mist/40 p-8 sm:flex-row sm:items-center sm:gap-8"
  >
```

`motion`, `fadeUp` and `SECTION_EASE` are already imported (L4, L7). `LEADERS` is already imported (L6). No new imports required.

### Acceptance criteria

- On first paint with the card list below the fold, **all four** `<li>` report `opacity: "0"`.
- After entry, all four report `opacity: "1"` and `transform: "none"`.
- Stagger is continuous across the whole list — placeholders animate after the leaders, not simultaneously with the first one.
- `viewport={{ once: true }}` retained: cards do not re-animate on scroll-back.
- No layout shift introduced — card geometry at 1280px stays 620 / 380 / 130 / 130 px.

### Regression notes

- Under `prefers-reduced-motion`, the root `MotionConfig reducedMotion="user"` suppresses the `y` transform and retains opacity. This adds two more elements to that contract — covered by the outstanding manual pass (**CO-2**, §D).
- Do not convert the placeholder's inner `<div>` wrappers to motion elements. One animated element per card, matching the leaders.

---

## RI-2 — About's leadership copy has drifted out of coherence with the Director tier

🟡 **CD Approval Required Before Implementation** *(copy)*

**Review ref:** Weaknesses #3 · Design-system consistency · Risk Assessment
**Files:** `src/components/about/founding-leadership.tsx` — `h2` **L29**, intro **L31–35**

### Problem

About currently reads:

> **h2 (L29):** "Led by an experienced founding team"
> **intro (L32):** "The business is led by **founding members** with strong management capability…"

Directly beneath, the two cards now render *Founder* and **Director**. Changing Okolie's role from "Founding Member" to "Director" — correct per the client-supplied document — silently weakened copy on a page that was not otherwise touched.

The claim is not false: she is a founder who now holds a Director title. But the visual evidence on screen no longer supports the sentence, and the mismatch will compound as the two additional Directors are appointed.

### Change

Adjust the `h2` and intro so they describe a founder-plus-director leadership group rather than implying both people are founding members. CD to supply wording. Constraints:

- Must remain true to `site-data.ts` — Banks is `Founder & CEO`, Okolie is `Director`.
- Must not reintroduce the "supported by skilled personnel" clause (see **RI-3**, same paragraph).
- Must not duplicate `/team`'s section intro (`team-content.tsx:30–34`), which was rewritten specifically to remove cross-page duplication.
- Keep it condensed — About's leadership block is a preview that links onward via "Meet the team", not a roster.

### Acceptance criteria

- No sentence on `/about` implies every person shown is a founding member.
- No sentence appears verbatim on both `/about` and `/team`.
- The "Meet the team" link and its `/team` target are unchanged.
- About's two cards remain height-parity at 283px each (1280px) — copy changes above the list must not disturb card geometry.

---

## RI-3 — The unbacked "skilled personnel" claim persists on About

🟡 **CD Approval Required Before Implementation** *(copy / content strategy)*

**Review ref:** Weaknesses #4 · corrects the F1 closure recorded in `team-page-review.md`
**Files:** `src/components/about/founding-leadership.tsx` — intro **L33–34**

### Problem

The first-look review's **F1** identified **three** locations carrying:

> *"supported by skilled personnel across technical, operational and administrative functions"*

Two were rewritten (`team/page.tsx:22` and `team-content.tsx`'s intro). **The third — `founding-leadership.tsx:33–34` — still carries it verbatim** and was never touched. The Resolution note in `team-page-review.md` reported F1 closed without qualifying this; that note has since been corrected.

No page on the site introduces the personnel this claims. On About the claim is milder than it was on the roster page, but it remains a promise the site cannot evidence.

### Change

Either drop the clause, or replace it with something the site can substantiate from existing `site-data.ts` content — sectors, geographies, certification, the partner network. **Do not invent headcount, department names, or organisational structure.**

This is the same paragraph RI-2 touches. **Implement RI-2 and RI-3 as a single copy revision**, not two passes.

### Acceptance criteria

- The phrase "skilled personnel across technical, operational and administrative functions" returns **zero matches** across `src/` (currently one).
- Any replacement claim traces to existing `site-data.ts` content or to a client-supplied document.
- F1 is fully closed — no remaining instance on any route.

---

## RI-4 — Headshots are served below their display resolution

🟢 **Engineering Safe**

**Review ref:** Weaknesses #5 · Premium enterprise quality (6/10)
**Files:** `src/components/team/team-content.tsx` **L52–53** · `src/components/about/founding-leadership.tsx` **L53–54**

### Problem

Both components pass `width={64} height={64}` against non-square sources (Banks 1290×1083, Okolie 1290×1373). The Next optimizer preserves source aspect ratio, emitting **64×54** for Banks and **64×68** for Okolie, which `object-cover` then upscales to fill a 64×64 slot — roughly 18% vertical upscale for Banks before device pixel ratio is considered.

Against firms whose leadership photography is a deliberate asset, softness on the only two faces on the site is a poor trade for a few kilobytes.

### Change

Raise the intrinsic request in **both** files. CSS classes are unchanged — `h-16 w-16` continues to govern layout:

```tsx
<Image
  src={leader.photo}
  alt=""
  width={192}
  height={192}
  className="h-16 w-16 shrink-0 rounded-full object-cover"
  style={{ objectPosition: leader.photoPosition ?? "center" }}
/>
```

192 gives clean headroom for 2× and 3× displays at a 64px slot.

### Acceptance criteria

- `naturalWidth` ≥ 128 at `devicePixelRatio: 1` on both photos, on both routes.
- Rendered layout geometry unchanged: both images still measure **64×64** CSS px.
- `alt=""` retained on both.
- `objectPosition` still resolves to `50% 50%` (Banks) and `50% 20%` (Okolie).
- `loading="lazy"` retained — both images are below the fold on both routes.
- Images still route through `/_next/image`.

### Regression notes

- Applies to **both** components. Fixing only `team-content.tsx` leaves About soft.
- Do not add `priority` — these are below-fold on both routes and `priority` would compete with the LCP element.
- Do not alter `photoPosition` values while in this file; Okolie's `50% 20%` was tuned against her source framing.

---

# C. Minor Items

*Non-blocking refinements. Batch with the RB-1/RI-1 placeholder edit.*

| ID | Item | Gate | File(s) | Change |
|---|---|---|---|---|
| **MI-1** | Placeholder chrome is very faint | 🟡 CD | `team-content.tsx` L84 (dashed border), L86–91 (icon) | Dashed border computes **1.22:1** and the `UserRound` icon **1.99:1** against the card ground. **Neither is a WCAG failure** — both are decorative and `aria-hidden`, with text carrying all meaning, the same exemption applied to the Services numbering motif (MI-1 there). But on a bright screen the cards may read as barely present, working against the deliberate-growth message. If CD wants them firmer, lift the border toward **3:1**. Purely a visual-weight decision — do not re-file as an accessibility defect. |
| **MI-2** | Growth signal is sighted-only | 🟢 Eng | `team-content.tsx` L30–34, L92–97 | **Constraint, not a change.** Placeholder cards expose no `h3`, so heading-navigation users encounter two leaders and never learn the team is expanding. This is correct — inventing an `h3` for an empty seat would be worse. The mitigation is the section intro's "two more Director seats to be announced" line. **Do not add a heading to the placeholders, and do not remove that clause from the intro** when implementing RB-1 or RI-2. |
| **MI-3** | Placeholder/leader alignment divergence | 🟢 Eng | `team-content.tsx` L84 vs L46 | Placeholders use `sm:items-center`; leader cards default to stretch. Invisible at current content lengths. Either align to the leader cards' default or leave as-is deliberately — but record the choice in the commit message so the divergence is intentional rather than inherited. |

---

# D. Backlog

*Not part of this release. From the review's Missed Opportunities and Future Enhancements.*

| ID | Item | Notes |
|---|---|---|
| **BL-1** | Structured credential block per leader | Qualifications · certifications · sectors as a scannable block beside the narrative. Addresses both Executive scanning (6/10) and Banks' **1800px** card at 375px — roughly 79 lines of unbroken 14px prose with degrees and memberships buried in the sixth paragraph. Content is excellent; its shape is unstructured for mobile scanning. **Not a defect — do not file it as one.** |
| **BL-2** | Sector/geography signal on the cards | FPSO, nuclear, aerospace defence, six countries, PMP, UWE Bristol all exist in the data but require reading full paragraphs to find. A short credential line under each role would carry expertise at scan speed. Overlaps BL-1 — decide them together. |
| **BL-3** | `ProofStrip` on `/team` | 20+ / 6 / 8 / PMP are most literally claims about people. Component already exists and is used on Services. Would also break up the 1869px single-ground run (BL-5). |
| **BL-4** | Real headshots for the two Directors when appointed | `photo?` field and the monogram fallback already accommodate this with **no code change** — supply the image and populate `LEADERS`. |
| **BL-5** | Ground-rhythm revisit | `paper` occupies 1869px, 60% of the page, between two short navy bookends. Defensible at three sections and **explicitly not filed as a defect**; revisit only if a fourth section is ever added. |
| **BL-6** | Reduced-motion manual pass | **Already tracked as CO-2 in `docs/services-page-closeout-brief.md`** — do not duplicate the task. Note only that RI-1 adds two more animated elements that the same pass should cover. Human-only; not actionable by an agent. |

---

# E. Sequencing

**Batch 1 — Engineering-safe, ship immediately (no approval needed).** RI-4 and MI-3. RI-4 spans both `team-content.tsx` and `founding-leadership.tsx`; MI-3 is a one-class decision. Neither depends on any CD decision.

**Batch 2 — The placeholder block, as ONE coordinated edit.** RB-1 (once CD confirms wording) + RI-1 + MI-1 (if CD approves) + MI-3 if not already taken, honouring MI-2's constraint throughout. All five touch `team-content.tsx:81–99`. **Do not make five sequential passes over these twenty lines.** RB-1 is the sign-off gate — request the CD wording decision first so this batch is not blocked behind the copy batch.

**Batch 3 — About copy, needs CD approval.** RI-2 + RI-3 as a **single revision to one paragraph** (`founding-leadership.tsx:29–35`). They edit overlapping text; separating them guarantees rework.

### Dependencies

- **RB-1 ↔ RI-1 ↔ MI-1 ↔ MI-3** — same JSX block. One edit.
- **RI-2 ↔ RI-3** — same paragraph. One revision.
- **RI-4** — independent of everything; can ship first or last.
- **MI-2** is a guard on Batches 2 and 3, not a task in either.
- **RB-1 Option 2** requires a fresh contrast measurement; RB-1 Option 1 does not.

---

# F. Regression watchlist

Re-check after each batch:

- **Contrast after any label or tone change** — RB-1 Option 2 and MI-1 both alter placeholder-card values. Measure by canvas readback against the composited ground `rgb(252,252,251)`, not against pure `paper`, and not estimated from class names.
- **Heading order** — currently `H1 → H2 → H3 → H3 → H2` with zero skips and exactly one `h1`. MI-2 forbids adding headings to placeholders; confirm the sequence is unchanged after Batch 2.
- **List semantics** — the card list must remain a `<ul>` whose every child is an `<li>`. RI-1 changes the element type to `motion.li`, which still renders `<li>`; verify.
- **Photo integrity** — `alt=""` on both images, `objectPosition` `50% 50%` / `50% 20%`, `loading="lazy"`, optimizer routing. RI-4 touches these props directly.
- **Monogram fallback survives** — the `leader.photo ? … : …` branch must remain. It is the mechanism BL-4 depends on and the reason the data model degrades correctly.
- **About card height parity** — 283px / 283px at 1280px. RI-2/RI-3 edit copy above that list.
- **Mobile integrity at 375px** — no horizontal overflow (`scrollWidth` 360 ≤ viewport), cards collapse to `column`, photos hold 64×64.
- **Bio content is verbatim client copy** — no batch in this brief edits `fullBio` or `bio` text. Any diff touching those strings is out of scope and should be rejected in review.
- **`FUTURE_DIRECTOR_SEATS` still governs the placeholder count** — no hard-coded pair of cards.

---

# G. Explicitly approved — do not "fix"

The Review Board explicitly endorsed these. Changing them is a regression, not an improvement.

- **Okolie's short `role` value (`"Director"`)** — deliberately terse to match Banks' "Founder" and to fit the eyebrow slot. Her full title lives in `fullBio`. Do not expand it (see RB-1's rejected option, §H).
- **Bio content, both leaders** — Okolie's three paragraphs are the client document verbatim; Banks' six are unchanged from the prior brief. Content fidelity scored **10/10**. Do not edit, condense, or "polish" this prose.
- **No fabrication for the empty seats** — no invented name, photo, credential, or headcount. This restraint is mandated by `site-data.ts` and was scored as a strength.
- **Photo implementation, apart from RI-4's dimension props** — `object-cover` circular crop, per-subject `objectPosition`, `alt=""` beside the adjacent `h3` (no double-announcement), `loading="lazy"`, optimizer routing. Correct as built.
- **The `photo?` / monogram fallback branch** — a clean, minimal data-model extension. Keep it even though both current leaders have photos.
- **`/team` header description** (`team/page.tsx:22`) — the F1 fix. Names the two disciplines actually represented, no longer restates the `h1`, no longer promises support staff.
- **`/team` section intro** (`team-content.tsx:30–34`) — de-duplicated from About and pre-frames the empty seats. MI-2 depends on its final clause; preserve it.
- **Flat navy page header (no `backgroundImage`)** — deliberate. This is the only interior page whose content *is* portraiture; a competing photo band above photographs would fight. Do not "align" it with the other interior pages.
- **All nine text/ground contrast pairs** — lowest is 5.80:1 against a 4.5:1 requirement. No token in the passing set needs adjustment.
- **Semantic structure** — landmarks, `aria-labelledby`, valid heading order, `aria-hidden` on the five decorative elements, `lang="en"`, `#main-content` skip target.
- **Focus treatment** — the page's single focusable element (`ContactCta`'s "Talk to Us") carries a correct gold ring with proper `ring-offset`. Preserve exactly.
- **`ContactCta` section** — unmodified shared component, correct as-is.
- **Design-token discipline** — no new colours, type scale, spacing or motion primitives were introduced. Every task above stays inside the locked system.
- **Data model scalability** — `photo?`, `photoPosition?`, `fullBio?` optional fields plus `FUTURE_DIRECTOR_SEATS` scored **9/10**. Do not restructure.
- **The placeholder-seat decision itself** — client-instructed and user-approved. §H.

---

# H. Reviewer notes carried forward

**The placeholder-seat decision is not open for re-litigation.** Rendering two visible "Director — Joining Lazfields" cards was a client instruction, presented to the user as an explicit either/or against a prep-only alternative, and chosen deliberately. The as-built review assessed only its *execution*. Do not propose removing the cards, hiding them behind a flag, or converting them to prep-only while implementing RB-1 — that is a strategy reversal, not a fix. The reviewer's one strategic reservation (peer firms rarely advertise unfilled seats) is recorded in the review's Risk Assessment as **watch, don't change**.

**One approach was tried and reverted during implementation — do not re-propose it.** Okolie's `role` was initially set to the client document's full compound string, `"Director | Public Health Consultant | Project Management Professional"`. At `text-xs` with `tracking-[0.15em]` uppercase, ~68 characters wrap to two or three lines directly beneath her name, beside Banks' single-word "Founder". It was reverted to `"Director"` before shipping. The `role` field is a typographic label slot, not a prose field.

**Three findings in this brief are self-introduced defects.** RB-1, RI-1 and RI-2 are consequences of the implementation pass that immediately preceded the as-built review, performed by the same agent. RI-3 corrects a closure previously reported as complete. They are recorded plainly rather than softened, and `team-page-review.md` carries a dated correction to its own Resolution note.

**Items deliberately not filed as defects — do not re-raise them as such.**
- **Banks' 1800px mobile card.** Long, but it is a complete leadership bio and peer firms publish comparable depth. Filed as **BL-1** (shape, for scanning), not as a defect.
- **The 1869px single-ground `paper` run.** Defensible at three sections. Filed as **BL-5**, conditional on a fourth section ever being added.
- **Placeholder icon (1.99:1) and dashed border (1.22:1).** Both decorative and `aria-hidden`, with text carrying all meaning — **not** WCAG 1.4.11 failures, and the same exemption the Services review applied to its numbering motif. **MI-1 is a visual-weight decision only.** Do not re-file as accessibility.
- **The flat navy header.** Deliberate, and listed in §G.

**Verification guidance — read before testing.**
- **Do not verify any task in this brief by screenshot.** Every section of `/team` animates via `whileInView`, and the automation tab pauses `IntersectionObserver`; during this review it additionally reported `innerWidth: 0` and refused `resize_window`, making capture impossible.
- The as-built evidence was gathered using a **fixed-size same-origin iframe harness** (1280×2400 and 375×3000) injected into the host page, which gives deterministic viewport control the host tab could not. Reuse that technique. Motion end-states were force-applied for geometry passes and deliberately **not** applied for the initial-paint pass that produced RI-1's evidence — if you force them, RI-1 becomes unobservable.
- **Contrast must be computed via canvas pixel readback.** Tailwind v4 resolves opacity-modified colours to `oklab()`, which cannot be fed directly into a WCAG relative-luminance formula. Composite over the *actual* background — for placeholder cards that means `mist/40` over `paper`, not `paper`.
- **Photo crop framing** can be verified by rendering the source onto a canvas with the same `object-cover` circular geometry the page applies. That technique confirmed both crops during implementation.

**Scoring context.** Overall **7.2/10**. The lowest dimensions — Leadership presentation (5), Executive scanning (6), Visual hierarchy (6), Trust & credibility (6), Premium enterprise quality (6), Motion & interaction (6) — are addressed by RB-1 (presentation, hierarchy, trust), RI-1 and RI-4 (motion, premium quality), and BL-1/BL-2 (scanning, deferred). Closing RB-1 and Batches 1–3 should lift presentation, hierarchy, trust and motion into the 8 range; Executive scanning stays at 6 until BL-1 is taken, which is a deliberate deferral rather than an oversight.
