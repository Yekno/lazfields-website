# Services Page — Design Review Board: Final As-Built Review

**Type:** As-built verification review (not architecture, not implementation-discovery)
**Artifact reviewed:** `/services` — working tree at `master` (uncommitted), rendered at `localhost:3000` viewport 1280px, plus generated **production** CSS (`.next/static/chunks/1tjdw_u24zutf.css` from a clean `next build`)
**Baselines:** `docs/services-page.md` (approved architecture v2) · `docs/services-page-review.md` (prior DRB audit, 6.3/10) · `docs/services-page-revision-brief.md` (implemented brief)
**Date:** 2026-08-01
**Verdict:** ⚠ **Approved with Minor Revisions** *(both revisions applied same-day — see Resolution; verdict itself unchanged)*

---

## Resolution (2026-08-01, post-review)

Both Remaining Issues were fixed immediately after this review. The findings below are preserved as written — this is a point-in-time record, not rewritten history.

1. **§1 description rewritten.** `src/app/services/page.tsx` now reads *"Engineering, procurement, construction and installation, with project management consultancy that can be engaged in its own right — all led by senior professionals across the full project lifecycle."* The handoffs restatement is gone; the description now expands the EPCI acronym (clarity + SEO) and introduces the standalone-PM route, which the `h1` cannot carry. This matches the house pattern on every other page, where the description adds substance rather than echoing the title. `<title>` and meta description unchanged — still consistent.
2. **Documentation corrected.** `services-page.md:68` §2 → **mist** (with revision note), `:71` §5 → **navy-900 + `hero-pm` photo band**; the stale RI-1 note in the header replaced with its resolved state; `services-page-revision-brief.md:6` status line closed out for Batch 4.

**The ⚠ verdict below stands as issued** — a review does not upgrade its own verdict on the strength of its own fixes. What is now true, factually: both Remaining Issues are closed, and no further implementation work on the Services page is outstanding beyond the documented backlog (BL-1 … BL-7).

Two items remain open **outside the Services page**, and both must be settled before "ready for release" is true of the site as a whole:
- One manual reduced-motion pass to convert RB-3 from code-inspection to observed (see RB-3).
- A decision on the pre-existing `npm run lint` failure in `navbar.tsx` — fix or documented waiver (see Risk Assessment).

---

## Executive Summary

**All three release blockers are closed, with production-grade evidence for each.** This is not a hedged pass on the blockers — RB-1 is proven against generated production CSS, RB-2 against computed contrast values, RB-3 against the motion token shape it governs. The sign-off gates are cleared.

The revision work is, on the whole, well executed. Two changes stand out as genuinely raising the page rather than merely patching it:

- **RI-1 gives Option B a structure, not just a sentence.** The `leadElement` panel renders the E→P→C→I route as a visible step chain above the two through-life cards, and mode 3's description was rewritten so it no longer over-claims. The previous review's sharpest finding — *"the mode named EPCI contains none of E, P, C or I"* — is fully resolved, and resolved the way the brief preferred (restore the element) rather than the way it warned against (rename the mode).
- **RI-5+RI-6 restored the ground rhythm.** Measured live: navy → mist → paper → mist → navy → paper → navy. No two adjacent content sections share a ground, and the continuous dark run fell from 2059px (34%) to 787px (12.6%), confined to the exempt §7+footer bookend.

Overall quality moves **6.3 → 8.1**. Every dimension the brief predicted would reach 7–8 did so; Accessibility overshot it.

Two items keep this from a clean ✅, and both are one-line fixes:

1. **RI-8 fixed the Home collision but introduced a local redundancy.** The new `h1` — *"EPCI and project management, without the handoffs"* — sits directly above a description that says *"…with no handoffs across the lifecycle."* The description was not touched when the title changed. Both halves of a seven-word headline are restated ~40px below it. This is precisely the assert-then-re-assert pattern the prior review scored 6/10 on premium quality for, reintroduced at the page's most prominent position.
2. **`docs/services-page.md` no longer describes the page it governs.** Line 68 records §2 as `paper` (actual: **mist**) and line 71 records §5 as `paper` (actual: **navy-900 + photo**). §6 was correctly updated for this revision; §2 was not, and §5 was already stale beforehand. The file self-describes as *"the durable architecture record"*, and AGENTS.md requires implementation decisions to live in `docs/`.

Neither is a defect in the built page's function, accessibility, or strategy. Both are required before the page can honestly be called complete.

---

## Verification of Previous Release Blockers

### RB-1 — Card teasers hidden on touch devices ≥640px · ✅ **RESOLVED**

Verified against **generated production CSS**, the standard the prior review set:

```css
@media (min-width:40rem){
  @media (hover:hover) and (pointer:fine){
    .sm\:can-hover\:opacity-0{opacity:0}
    @media (hover:hover){
      .sm\:can-hover\:group-hover\:opacity-100:is(:where(.group):hover *){opacity:1}
    }
    .sm\:can-hover\:group-focus-visible\:opacity-100:is(:where(.group):focus-visible *){opacity:1}
  }
}
```

The nesting is exactly what the brief's acceptance criteria demanded. Confirmed:

- The hide is now gated on **input capability**, not viewport width. On a coarse-pointer device at 768px or 1024px the inner query fails, `opacity:0` never applies, and the base `opacity-100` stands — teaser visible at rest. The blocker's failure mode is structurally impossible.
- **The bare `.sm\:opacity-0` rule is gone from production CSS** (grepped, no match) — the brief's explicit "do not fall back" instruction was honoured; no `@custom-variant` misbehaviour, no arbitrary-variant fallback needed.
- **Keyboard parity is intact.** The `group-focus-visible` restore is present in production CSS. It now sits *inside* the capability wrapper rather than outside it, which is the correct scoping: hide and restore share one scope, so where nothing hides, nothing needs restoring. This is an improvement on the prior arrangement, not a regression of it.
- Live at 1280px on a hover-capable pointer: teaser computed `opacity: 0` at rest — desktop behaviour preserved.

**Hybrid-device note (not a defect):** on a touch laptop reporting `pointer: fine`, the teaser still hides at rest. RI-2 is what de-risks this — the always-visible "See how" plus a whole-card link means the affordance survives regardless. The two fixes reinforce each other.

### RB-2 — §4 column labels fail WCAG AA · ✅ **RESOLVED**

All three `<dt>` elements are `text-ink/60` (`service-depth.tsx:61,67,73`). Computed against the actual composited ground:

| Token | Ground | Ratio | AA |
|---|---|---|---|
| `text-ink/60` `<dt>` | mist | **4.78:1** | ✅ |
| `text-ink/70` `<dd>` | mist | 6.76:1 | ✅ |

The brief's recommendation (`/60`, not `/65`) was followed, preserving tonal separation from the `<dd>` value text. The label/value distinction remains legible.

**Repo-wide sweep clean:** `text-ink/50` and `text-white/50` return **zero matches** across `src/`. The brief's "also in scope" clause is satisfied.

Every other revised or ground-moved token was re-measured, since RI-5/RI-6 relocated text between grounds. All pass:

| Token | Ground | Ratio |
|---|---|---|
| §2 `dd` `text-ink/65` | mist | 5.67:1 |
| §6 `dd` `text-ink/65` | paper | 5.82:1 |
| §3 intro `text-ink/65` | paper | 5.82:1 |
| §3 mode desc `text-ink/60` | paper | 4.89:1 |
| §3 leadElement body `text-ink/70` | paper | 6.98:1 |
| §3 leadElement steps `navy-700` | paper | 12.91:1 |
| card teaser `white/70` | navy-900 | 9.04:1 |
| card teaser `white/70` | navy-800 *(new hover state)* | 8.22:1 |
| `gold-500` "See how" | navy-800 *(new hover state)* | 9.36:1 |

The new `hover:bg-navy-800` surface introduced by RI-2 does **not** degrade any foreground below AA.

### RB-3 — Motion ignores `prefers-reduced-motion` · ✅ **RESOLVED**

`src/components/motion-provider.tsx` is a minimal client wrapper around `<MotionConfig reducedMotion="user">`; `layout.tsx:39` wraps `{children}` with it. The Server-Component constraint the brief identified was handled exactly as specified.

Coverage is correct by construction: `fadeUp` (`src/lib/motion.ts`) animates `{opacity, y}`. Under `reducedMotion="user"` Framer suppresses the **transform** (`y`) and retains **opacity** — the brief's "degrades cleanly, not a blanket kill". Because it sits in the root layout, this covers every page, and `hero.tsx`'s inline `y` animations and `layoutId` dot transition are covered too.

`ProofStrip`'s independent count-up handling is untouched and still lands on the true value (`proof-strip.tsx:27–33`).

**Evidence basis — stated honestly:** this is verified by **code inspection**, not live emulation. The browser extension disconnected before a reduced-motion media emulation could be run, and I did not have headless tooling available to substitute. The reasoning is sound and the mechanism is standard, but no one has yet *watched* the page under an OS reduced-motion setting. Recommend one manual pass (DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`) before release — see Remaining Issues.

---

## Verification of Recommended Improvements

| ID | Status | Evidence |
|---|---|---|
| **RI-1** | ✅ Correct | `leadElement` optional field on `EngagementMode`; renders only for mode 3 (conditional, `service-index.tsx:51`). Modes 1 and 2 render unchanged. Mode 3's description rewritten from the over-claiming *"One accountable team, start to finish — the full integrated route"* to *"The final phase of one continuous delivery route…"*, so the description now honestly covers its two cards while the panel carries the route. |
| **RI-2** | ✅ Correct | "See how" computed `opacity: 1` at rest (live) — no longer in the hover-gated set. `hover:bg-navy-800 focus-visible:bg-navy-800` gives a real surface change on both pointer and keyboard. `transition-colors` is no longer dead. All six cards render identically — the rejected two-weight treatment did not reappear (see Regression Check). |
| **RI-3** | ✅ Correct | All three `EVIDENCE` items rewritten. No item restates a `ProofStrip` figure (20+/6/8/PMP) — the "8 sectors and 6 countries" prose is gone entirely. Each lead now matches its body, closing **MI-6** as predicted. |
| **RI-4** | ✅ Correct | Four distinct promises. Former #1/#3 merged into "One team, one roof"; new distinct fourth ("Disciplined controls"). #2 rewritten — no longer near-verbatim `team/page.tsx:22`; no sentence appears verbatim on another page. |
| **RI-5+6** | ✅ Correct | Live-measured `backgroundColor` per section: navy-900 → mist → paper → mist → navy-900 → paper → navy-900. No two adjacent **content** sections (§1–§6) share a ground. Dark run 2059px/34% → 787px/12.6%, confined to the exempt §7+footer bookend. `ProofStrip` contrast re-checked on its new paper ground. |
| **RI-7** | ✅ Correct | `mt-auto` + `pt-4` on the "See how" span (the brief's preferred fix over hard-coded height reservation). Live-measured offsets from card top, per row: **191.5/191.5**, **168.75/168.75**, **191.5/191.5** — pixel-identical within every row, and stable regardless of hover state because the teaser hides via `opacity` and retains its layout box. Holds after RB-1 and RI-2, as required. |
| **RI-8** | ⚠ Correct-but-incomplete | Home's `h2` is "Complete project delivery, engineered for certainty"; the new Services `h1` is "EPCI and project management, without the handoffs" — **no shared opening clause** ✅, and it does not pre-empt §2's `h2` ✅. Option B is not weakened — the h1 names both halves and the integration ✅. **But the description beneath it was left unchanged and now restates it.** See Remaining Issues #1. |
| **RI-9** | ✅ Correct | Live-measured: mode `h3` **24px** vs card `h4` **16px** — modes now unambiguously outrank the items they organise. Heading order stays valid (`h2` → `h3` mode → `h4` leadElement/service). `text-2xl` is an established scale step (`contact-cta`, `about-vision`, `footer`, `navbar`) — no new type primitive. Correctly accounts for RI-1's added element. |

---

## Regression Check

**No regressions found.** Verified specifically:

- **`npm run build` succeeds**; TypeScript clean (`tsc --noEmit`, no output). All 9 routes prerender static.
- **Rejected "Specialist" two-weight treatment has not returned.** The `specialist?: boolean` field is removed from `ServiceDetail`, the pill markup is gone, and no orphaned styles remain. The only surviving "specialist" string in `src/` is prose ("not a single-sector specialist"), not the removed data flag. All six cards share one surface — `docs/services-page.md:28` upheld.
- **`ProofStrip` count-up intact.** MI-9 swapped `useInView`+`animate` for `whileInView`+`onViewportEnter`+`viewport={{once:true, margin:"-80px"}}` — functionally equivalent trigger, same margin, now consistent with every other component. The reduced-motion zero-duration path is untouched and still lands on 20+/6/8/PMP.
- **Skip link target exists on every page.** `id="main-content"` is present on all six `<main>` elements (`/`, `/about`, `/team`, `/services`, `/policies`, `/contact`). A skip link whose target existed on only one page would have been a silent site-wide defect; it does not occur.
- **Shared components not forked.** `PageHeader`, `ProofStrip`, `ContactCta` remain single implementations. `PageHeader`'s only change is the additive `sizes="100vw"`.
- **No new design primitives.** The leadElement panel reuses the established `rounded-xl border border-line p-6` card primitive (`capabilities-section`, `policies-preview`, `lifecycle-band`, `team-content`). No new colours; the step connector uses existing `gold-500` at 60%.
- **Content integrity holds — no fabrication.** Every rewritten proof claim traces to existing `site-data`:
  - "FPSO topside modifications, nuclear power, and aviation and aerospace defence" → `LEADERS[0].bio` / `fullBio` (founder's documented record).
  - "partner network spanning the UK, US, Europe and China" → Procurement `description` / `teaser` / `depth.approach`.
  - "Strategy and delivery sit with the same accountable leader" → established positioning, asserts no new fact.
  No named clients, projects or metrics were invented. `/clients-partners` restraint still holds.
- **Explicitly-approved work untouched.** §4's risk→approach→advantage structure, the 280px label column and hairline dividers are unchanged apart from the RB-2 `<dt>` tone. §1/§5 scrim values are byte-identical. §7 `ContactCta` unchanged. Focus rings preserved exactly per §G.

**One observation, deliberately not filed as a defect:** RI-2's `focus-visible:bg-navy-800` means the focused card surface (navy-800) now differs slightly from its `ring-offset-navy-900`, producing a faint 2px band between card and gold ring. It is cosmetic, focus-state-only, and §G instructs that focus rings be preserved exactly. Contrast is unaffected (gold on navy-800 = 9.36:1). Recorded for completeness, not for action.

---

## Remaining Issues

Two items. Both are one-line fixes; neither affects accessibility or function.

### 1. `h1` and its own description restate each other — §1 · copy

**Observed** (`src/app/services/page.tsx:50–51`):

> **h1:** "EPCI and project management, without the handoffs"
> **description:** "Engineering, procurement, construction and project management consultancy — delivered by one accountable, senior-led team, **with no handoffs across the lifecycle**."

The description expands the h1's subject ("EPCI and project management" → "Engineering, procurement, construction and project management consultancy") *and* repeats its differentiator ("without the handoffs" → "with no handoffs across the lifecycle"). Both halves of a seven-word headline are restated in the sentence directly beneath it.

**Why this matters.** The git diff shows only the title line changed — the description is untouched from when the h1 was "Complete project delivery, engineered as one integrated capability", where "no handoffs" was genuinely *new* information. RI-8 moved that phrase up into the h1 without releasing it from the description. The prior review scored Premium enterprise quality 6/10 explicitly on *"asserts, re-asserts, and then asserts again"*; this reintroduces that pattern at the page's most prominent position, where it costs the most.

**Fix.** Rewrite the **description**, not the h1 (the h1 satisfies every RI-8 criterion). Let it carry what the h1 cannot — scope, seniority, lifecycle span — and drop the handoffs restatement. `<title>` and meta description need no change.

### 2. `docs/services-page.md` no longer matches the built page — documentation

| Line | Doc says | Actual |
|---|---|---|
| `:68` §2 Delivery Model | paper | **mist** (changed by RI-5) |
| `:71` §5 How We Run | paper | **navy-900 + photo** (stale before this revision) |

§6 *was* correctly updated for RI-5/RI-6 (`:72` carries the revision note), which makes the §2 omission an oversight in the same edit rather than a deliberate deferral. The file is the project's durable architecture record and AGENTS.md requires implementation decisions to be documented in `docs/` — a ground-rhythm table that misstates two of seven sections will mislead the next reader.

**Also:** `docs/services-page-revision-brief.md:6` still reads *"Remaining: MI-1 (done), MI-2, MI-4–MI-9 — minors batched for later."* All nine minors are implemented and verified. The status line should be closed out.

### Verified-complete but worth one manual pass before release

- **Reduced motion** was confirmed by code inspection, not live emulation (see RB-3). One DevTools pass would convert this to observed fact.
- **MI-1, `text-ink/45` on mist, computes 2.98:1** — fractionally under the 3:1 the prior review itself set (*"Lift the numbering motif above 3:1"*). **The implementation is faithful**: the brief prescribed `text-ink/45` explicitly, and that is what shipped — the *specification* was marginally off its own target, not the build. The element is `aria-hidden` and decorative, so this is not a WCAG failure and 2.98 vs 3.00 is imperceptible. If ever revisited, prefer **`text-ink/55` (4.05:1)** over `/50` (3.46:1), purely so the `text-ink/50` token RB-2 just eliminated is not reintroduced for a reader to re-derive the decorative exemption. The card-side half of MI-1 is clean: `white/45` on navy-900 = **4.37:1**.
- **leadElement step chain at <640px — unverified.** Each step and its trailing connector share one flex item inside a `flex-wrap` row, so a connector wraps with its label and can land as the trailing element on a wrapped line. At 375px the four uppercase `tracking-[0.15em]` labels will wrap within ~279px of panel content width. I could not measure this live and am **not** asserting a defect — worth 30 seconds at 375px to confirm it reads cleanly.

---

## Strengths

- **RI-1 is the standout.** Option B is now expressed **structurally** — a labelled route panel with a visible E→P→C→I chain — and not merely asserted in prose. The optional `leadElement` field is a clean, minimal data-model extension that leaves modes 1 and 2 untouched and stays spoke-ready. This closes the prior review's most consequential finding without abandoning approved structure.
- **The blocker fixes are the right shape, not just effective.** RB-1 gates on input capability rather than viewport, which is the correct axis and eliminates the failure class rather than the instance. RB-3 is one provider at the root covering every page. Neither is a workaround.
- **Ground rhythm and the dark tail are genuinely fixed**, and the coupled RI-5/RI-6 decision was correctly taken as one sequence rather than patched independently — avoiding the mist–mist adjacency the brief warned about.
- **§4 Service Depth remains the strongest work on the site**, correctly left alone apart from its `<dt>` tone.
- **Verification discipline carried forward.** The `can-hover` variant was confirmed in generated CSS rather than trusted from source, exactly as the brief's Reviewer Notes instructed — the failure mode that produced the prior review's one false positive was avoided.
- **No-fabrication rule held under copy rewrite.** Three proof items were rewritten and every surviving claim still traces to `site-data`.

---

## Risk Assessment

| Risk | Likelihood | Impact | Notes |
|---|---|---|---|
| Headline redundancy reads as insistence to a senior buyer | Medium | Low–Medium | Remaining Issue #1. Most visible position on the page; cheapest possible fix. |
| Architecture doc misleads a future contributor on ground rhythm | Medium | Low | Remaining Issue #2. Compounds silently as more revisions land. |
| Reduced motion behaves unexpectedly in a real browser | Low | Medium | Mechanism is standard and correctly wired; only *unobserved*. One DevTools pass retires this. |
| leadElement step chain wraps awkwardly on small phones | Low–Medium | Low | Cosmetic; unverified at <640px. |
| **`npm run lint` exits 1** (`navbar.tsx:24`, `react-hooks/set-state-in-effect`) | **Certain** | Low for this page; Medium for release | **Does not block the Services verdict** — pre-existing, unrelated file, untouched by this revision, and `next build` passes. But "ready for sign-off" implies shippable, and a red lint gate will fail CI. Fix or explicitly waive before release. |
| Touch teaser hidden on hover-capable hybrid laptops | Low | Low | By design; RI-2's persistent affordance covers it. |

---

## Scores

Same 17 dimensions as the prior audit, so movement is legible line by line.

| Dimension | Prior | Now | Δ |
|---|---|---|---|
| Information hierarchy | 7 | **8** | ▲1 |
| Executive scanning | 5 | **8** | ▲3 |
| Typography | 8 | **8** | — |
| Layout rhythm & whitespace | 6 | **8** | ▲2 |
| Visual hierarchy | 6 | **8** | ▲2 |
| Trust & credibility | 7 | **8** | ▲1 |
| Premium enterprise quality | 6 | **7** | ▲1 |
| Accessibility (WCAG AA) | 5 | **9** | ▲4 |
| Mobile & touch experience | 4 | **8** | ▲4 |
| Motion & interaction | 5 | **8** | ▲3 |
| Content fidelity | 8 | **9** | ▲1 |
| Component consistency | 6 | **8** | ▲2 |
| Narrative flow | 7 | **8** | ▲1 |
| Option B positioning | 5 | **8** | ▲3 |
| Differentiation from Home/About/Contact | 6 | **7** | ▲1 |
| Design-system consistency | 8 | **9** | ▲1 |
| Scalability | 8 | **8** | — |
| **Overall** | **6.3** | **8.1** | **▲1.8** |

**Against the brief's own prediction** — *"Closing Batches 1–3 should move every one of those into the 7–8 range"*:

| Dimension | Predicted | Actual | Met? |
|---|---|---|---|
| Mobile & touch | 7–8 | 8 | ✅ |
| Executive scanning | 7–8 | 8 | ✅ |
| Accessibility | 7–8 | 9 | ✅ exceeded |
| Motion & interaction | 7–8 | 8 | ✅ |
| Option B positioning | 7–8 | 8 | ✅ |

All five met; Accessibility overshot. The two dimensions still at 7 — Premium enterprise quality and Differentiation — are both held there by Remaining Issue #1, the single copy fix.

---

## Final Verdict

⚠ **Approved with Minor Revisions**

Every release blocker is closed with production-grade evidence, every recommended improvement is correctly implemented, all nine minors landed without regression, and no previously approved work was altered. Option B is now carried by structure as well as copy — the change this page most needed. The page is functionally, visually and accessibly ready.

It is held back from ✅ by two one-line fixes, neither structural:

1. Rewrite the §1 description so it stops restating the new `h1`.
2. Correct the §2 and §5 ground entries in `docs/services-page.md`, and close out the stale status line in `docs/services-page-revision-brief.md`.

Additionally recommended before release, outside the Services page itself: one manual reduced-motion pass, and a decision on the pre-existing `npm run lint` failure in `navbar.tsx` (fix or documented waiver).

**On completion:** with those two fixes applied, the Services page is complete and requires no further implementation work beyond the documented backlog (BL-1 … BL-7) and future enhancements. Re-review is **not** warranted — both items are verifiable on inspection and need no further Design Review Board cycle.

---

### Review methodology

Findings are evidence-based and independently re-derived, not inherited from the brief's own claims:

- **Contrast** computed from design tokens with correct alpha compositing against actual composited grounds (WCAG 2.x relative-luminance formula), not estimated.
- **RB-1 / touch gating** verified against **generated production CSS** from a clean `next build` — the same standard the prior audit used — including a negative check that the bare `.sm\:opacity-0` rule no longer exists.
- **Ground colours, section heights, card CTA alignment and computed font sizes** measured in the live DOM at 1280px.
- **Dynamic and animated state** was read via computed styles and DOM inspection, never screenshots — per the prior review's carried-forward warning that hidden automation tabs pause `requestAnimationFrame` and `IntersectionObserver`. The discarded "6+ / 2 / 2" ProofStrip false positive was **not** re-raised.

**Limits of this review, stated plainly:** reduced-motion behaviour and sub-640px rendering were **not** exercised live — the browser extension disconnected mid-session and no headless tooling was available in the project. Both are assessed by code inspection and flagged as such rather than reported as observed. Nothing in this review claims verification it does not have.
