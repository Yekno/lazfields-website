# Policies Page — Design Review

**Type:** First-look review — no prior review document exists for `/policies`.
**Artifact reviewed:** `/policies` — working tree at `master` (untracked: `src/app/policies/`, `src/components/policies/`), rendered live at `localhost:3001`, viewport 1280px.
**Related:** `PoliciesPreview` (`src/components/policies-preview.tsx`) renders the same `POLICIES` data on the homepage and links here via "View Our Policies". Both read from `site-data.ts:279–298`, which documents itself as the "Single source of truth for policy areas — used by the Home preview and the full Policies page."
**Date:** 2026-08-06
**Verdict:** ⚠ **Approved with Revisions — commit the route now, deepen when content arrives**

**Status:** F4 and F5 implemented 2026-08-06 (see Resolution). F1 reframed after the shipping-state check below. F2 open and client-gated. F3 open.
**Superseded by:** [`policies-page-as-built-review.md`](policies-page-as-built-review.md) — Design Review Board as-built pass over the same build, 2026-08-06. It re-grades these findings against the thirteen-dimension rubric (7.1/10, ⚠ Approved with Revisions) and adds four design-system findings this review did not reach. Task IDs there (RB-1, RI-1…RI-5, MI-1…MI-3) supersede F1–F5 for implementation.

---

## Shipping state — checked before anything else

`NAV_LINKS` (`site-data.ts:22`) and the footer (`footer.tsx:10`) both carry `{ label: "Policies", href: "/policies" }`, and **both files are committed on `master`.** The route is not — `git ls-files src/app/policies src/components/policies` returns nothing.

**So `master` currently serves a 404 from its own primary navigation.** That single fact sets the shape of this review. Whatever else is true about the page's depth, the route must be committed: a thin page is a quality defect, a 404 from the navbar on an executive corporate site is a worse one. This review therefore does **not** withhold approval from the route. It withholds sign-off from the page's content depth, which is a different thing and is tracked as F1/F2.

---

## Executive Summary

The page is technically clean. Heading order is valid, one `h1`, no horizontal overflow at 1280px, no console errors observed, and every colour token in use was already measured against WCAG AA in `team-page-as-built-review.md` (unchanged here). None of that is the problem.

**The problem is that this route does not yet contain a page distinct from the homepage.** `PoliciesContent` is `PoliciesPreview` with two paragraphs swapped for one. Same eyebrow, same `h2`, the same three cards rendered from the same array — and, measured side by side, **253 characters of prose is the entire difference between the homepage section and the dedicated route it links to.** A reader who clicks "View Our Policies" is returned to the section they just finished reading, one scroll up.

Underneath that is a content problem the code cannot solve. `POLICIES` holds three one-sentence summaries. There are no commitments, no standards named, no certification, no accountable owner, no review date. For a contractor pitching executives, government agencies and NGOs, `/policies` is a **due-diligence page** — a procurement reader arrives to verify that SHEQ management is real and documented. This page asserts that it exists and stops. Rearranging what's already there cannot fix that, and inventing the missing substance is out of bounds (see F2).

**This review's main output is a specific content request, not an implementation task list.**

---

## Measurements

Page depth across interior routes, 1280px, full document height including footer:

| Route | Height | Content sections |
|---|---|---|
| `/services` | 6260px | 5 |
| `/about` | 4211px | 4 |
| `/team` | 3133px | 1 |
| `/contact` | 2237px | 1 (form — depth is not the goal) |
| **`/policies`** | **2089px** | **1** |

`/team` is also a single-section page and is not thin, because its section carries 1866px of substantive content. `/policies` carries 852px, of which 230px is a card row identical to the homepage's.

Homepage `PoliciesPreview` vs `/policies` `PoliciesContent`, measured element for element:

| | Home preview | Policies page |
|---|---|---|
| Eyebrow | "OUR COMMITMENT" | "OUR COMMITMENT" — identical |
| `h2` | "Policies that guide everything we do" | identical |
| Intro block | 209px / 293 chars | 342px / 546 chars |
| Card grid | 230px, 3 × 230px cards | 230px, 3 × 230px cards — identical |
| Section total | 791px | 852px |

---

## Findings

### F1 — The dedicated route duplicates the homepage section · **Blocks sign-off, not shipping** · content architecture

**Observed.** `policies-content.tsx` and `policies-preview.tsx` render the same eyebrow string, the same `h2` string, and the same three `POLICIES` cards through near-identical markup (`policies-content.tsx:50–57` vs `policies-preview.tsx:34–41` — as reviewed; both now share `PolicyCard`, see Resolution). The only divergence is the intro copy — two paragraphs instead of one — and the preview's trailing "View Our Policies" link, which the full page naturally omits. Net gain for navigating to a top-level route: **253 characters of prose**, worth ~130px of added text against a ~68px link the page drops — **61px net** section height.

**Why it matters.** The house pattern elsewhere is preview → expansion, and it holds: About's `FoundingLeadership` shows condensed bios, `/team` shows `fullBio` in three paragraphs; the homepage's capabilities section fronts a five-section `/services`. `/policies` is the one place where the preview and the full page are the same artifact. That's not a thin page — it's a broken promise in the navigation. "View Our Policies" is a link that costs a click and returns nothing.

**Why this blocks sign-off rather than shipping.** A nav-level route on a corporate site is a claim that there is something there, and this page under-delivers on that claim at exactly the page a procurement reader visits to check whether the firm's governance is real. But the alternative is worse: the nav and footer links are already on `master` (see Shipping state), so withholding the route means shipping a 404 from the primary navigation. Removing the nav entries to match would be a third option, and a bad one — it deletes a page the client's own brief calls for rather than filling it.

**Fix.** Not a rewrite of the section — see F2. The route needs content the preview doesn't have, and that content does not exist in the repo. So: **commit the route as-is now**, and treat the depth gap as the open item this review hands to the content request. When policy content arrives, `PoliciesContent` diverges from `PoliciesPreview` naturally and F1 closes on its own.

An interim half-measure — reshuffling the existing three sentences into a longer-looking layout — is explicitly **not** recommended. It would consume the effort of a real revision, produce no new information for the reader, and make the page harder to rebuild once real content lands.

---

### F2 — There is no policy substance to build a policy page from · **Blocker** · content, client-dependent

**Observed.** `POLICIES` (`site-data.ts:279–298`) is three items, each a single sentence:

- *Corporate Social Responsibility* — "Investing in the communities where we operate…"
- *Fitness to Work* — "Protecting the health and wellbeing of every employee, contractor and site visitor…"
- *Safety, Health, Environment & Quality* — "Upholding rigorous SHEQ standards on every project…"

Every one of these states an intention. None states a commitment, a standard, a mechanism or an owner. The page names SHEQ and cites no framework; it claims rigour and offers nothing that can be checked. The `h1` — *"Disciplined by policy, not just intention"* — is, as built, contradicted by the page beneath it, which is intention and nothing else.

**The constraint.** `site-data.ts:265–268` already sets the house rule for absent client content: *"do not invent names, bios or photos for these seats in the meantime."* That rule binds harder here than it does on Team. A fabricated management-system reference, certification claim, or safety commitment on a page a client may rely on in a tender response is a commercial and legal exposure, not a copy defect. **Nothing in this category may be drafted speculatively, including as placeholder.**

**What is needed from the client.** `site-data.ts:272` cites an "About Us brief (revised 19.07.26) §Policies" as the source for the current copy. That document is not in the repo and was not available for this review. Request it first — it may already carry some of the following. Per policy area, the page needs at minimum:

1. **A commitment statement** — what the company binds itself to, in its own words, ideally the text of the signed policy.
2. **Standards or frameworks referenced**, if any — ISO 9001 / 45001 / 14001, local HSE regulation, client-specific SHEQ regimes. Certified, working-toward, or aligned-with: the distinction must come from the client, not be chosen here.
3. **Mechanism** — how the commitment is implemented on a live project (inductions, audits, incident reporting, competency checks, subcontractor requirements).
4. **Accountability** — who owns the policy, and the review cadence.
5. **Approval and date** — signatory and last review date, if the policies are formally issued.

Items 1–4 are what turns three cards into a page. Item 5 is what makes it a due-diligence artifact.

---

### F3 — Header is flat navy with no stated reason · Recommended · visual consistency

**Observed.** `/about` (`hero-commissioning.jpg`), `/services` (`hero-epci.jpg`) and `/contact` (`hero-pm.jpg`) all pass `backgroundImage` to `PageHeader`. `/team` and `/policies` do not. At 1280px the `/policies` header is 451px tall with roughly the right half empty navy.

`team-page-as-built-review.md` records flat navy as deliberate for `/team` — *"competing photography above photographs would fight"* — and states `/team` is "the only interior page whose header carries no `backgroundImage`." **That claim is now stale**: `/policies` was added afterwards and is the second. Team's justification does not transfer; nothing on `/policies` competes with a header image.

**Fix.** Either supply a band consistent with the other interior pages, or record an explicit reason in the page file so a later contributor doesn't "fix" it into inconsistency. Note that the existing three images are all site/engineering photography — a policies header wants something that reads as governance or people rather than plant, so this may itself become a small asset request. Correct the stale "only interior page" line in the Team review either way.

---

### F4 — Card markup is duplicated across two components · Recommended · maintainability

**Observed.** The icon tile, `h3` and description block is written twice, once in each component, with identical classes. AGENTS.md: *"Avoid duplication. Prefer composition over repetition."*

**Fix.** Extract a single `PolicyCard` consumed by both. Worth doing regardless of how F1/F2 resolve — if the page gains real content, the preview and the page will diverge in *content depth*, and the shared card is what keeps them visually one system while they do.

---

### F5 — Preview bypasses the shared motion helpers · Minor · consistency

**Observed.** `policies-preview.tsx:30–33` uses inline literals (`{opacity: 0, y: 20}`, `ease: "easeOut"`) while `policies-content.tsx:44–49` uses `fadeUp(20)` and `SECTION_EASE` from `@/lib/motion`.

**Not an accessibility defect.** `MotionProvider` sets `MotionConfig reducedMotion="user"` globally, so `prefers-reduced-motion` is honoured for both. This is consistency only: the preview animates on a different easing curve (`easeOut` vs the site's `[0.22, 1, 0.36, 1]`) from every other section on the homepage.

**Fix.** Adopt `fadeUp(20)` / `SECTION_EASE` in the preview. One-line change, folds naturally into F4.

---

## What is working

- Heading hierarchy is valid — one `h1`, `h2` per section, `h3` per card. No skipped levels.
- No horizontal overflow at 1280px; no element extends past the client width.
- No console errors after load.
- Colour tokens are unchanged from the set measured in `team-page-as-built-review.md` (`gold-500` and `white/70` on `navy-900`, `navy-700` and `ink/65` on `paper`) — all clear AA there and nothing on this page alters them.
- `metadata` is present, specific, and correctly scoped to the page.
- `POLICIES` as a single source of truth feeding both surfaces is the right architecture and should survive whatever follows. The defect is that the two surfaces currently consume it identically, not that they share it.

## Verification limits

- **375px was not measured this pass.** The automation window would not resize (two attempts, `innerWidth` stayed 1280). Layout risk is low — the grid is `sm:grid-cols-2 lg:grid-cols-3`, collapsing to a single column with no fixed widths anywhere — but this is unverified and must be checked at as-built.
- Console capture began after page load rather than before it; "no errors" covers the post-load window only.
- Contrast was inherited from the Team as-built measurements rather than re-measured, on the basis that the tokens and grounds are identical.

---

## Resolution — 2026-08-06

**F4 and F5: closed.** Landed in the same commit as this review, as a coordinated edit rather than two passes over the same markup:

- `src/components/policies/policy-card.tsx` — new. Single card component owning the icon tile, `h3`, description and the staggered reveal. Markup and classes are byte-identical to what both consumers previously inlined, so there is no visual change on either surface.
- `policies-content.tsx` and `policies-preview.tsx` now both render `<PolicyCard index={i} {...policy} />`. The preview picks up `fadeUp(20)` / `SECTION_EASE` by consequence, replacing its inline `{opacity: 0, y: 20}` / `"easeOut"` literals — closing F5 without a separate edit.
- `"use client"` stays on both consumers. `PoliciesPreview` no longer imports `framer-motion` directly, but it spreads `Icon` — a component reference — into a client component, which is not serialisable across the server/client boundary. The directive is load-bearing; do not remove it as dead code.
- `npm run lint` and `tsc --noEmit` clean.

**F1: reframed, open.** Route committed per the Shipping state check. Depth gap remains and closes on F2.
**F2: open, client-gated.** No work should begin against it before the content request is answered.
**F3: open.** Header treatment decision plus a correction to `team-page-as-built-review.md`.

---

## Recommendation

**The next action is the content request in F2, not a revision brief.** F1 and F2 are the same problem seen from two sides, and both resolve on client content that does not exist in the repo. Start by asking for the "About Us brief (revised 19.07.26)" cited at `site-data.ts:272` — it is the stated source for the copy already on the page and may carry more of §Policies than was used.

Once policy content arrives, the sequence is: revision brief → implementation → as-built review, matching the Services and Team trail.
