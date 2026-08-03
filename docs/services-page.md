# Services Page — Status: READY FOR BLUEPRINT FINALIZATION

**Status:** 🟢 Architecture, IA, grouping, imagery & copy decisions all locked. No structural blockers remain. Only remaining item is §4 depth *enrichment* (writable now from existing content; deeper specifics can be client-supplied later — non-blocking).
**Phase:** Built and reviewed. The blueprint → Design Review Board step is **complete**.
- Implementation audit: [`services-page-review.md`](services-page-review.md) — verdict ⚠ Approved with Revisions (6.3/10), architecture validated, no rework required.
- Actionable tasks: [`services-page-revision-brief.md`](services-page-revision-brief.md) — 3 release blockers, 9 recommended, 9 minor, 7 backlog. **All implemented.**
- As-built verification: [`services-page-as-built-review.md`](services-page-as-built-review.md) — verdict ⚠ Approved with Minor Revisions (8.1/10); both revisions applied 2026-08-01. Services page complete; only backlog items (BL-1 … BL-7) remain.

This file remains the durable architecture record. The one fidelity gap the first review found — mode 3's "integrated route" element (decision #4 below) dropped in implementation — was **restored via RI-1** and verified as built; the page now expresses Option B structurally as well as verbally.
**Do not:** fabricate named projects, metrics, or client/partner proof. Everything below is derivable from existing `site-data` + confirmed client input.
**Last updated:** 2026-08-01

---

## Decisions LOCKED (client-confirmed)

1. **One long-form Services page** — not hub-and-spoke.
2. **Card system = index + depth, spoke-ready.** Cards are the scannable index (§3); each anchors down to that service's **problem → approach → outcome** block (§4). Any card can later become a dedicated page with no rebuild.
3. **Icon-surface cards** (not photo-background) — only 3 photos exist and no more are coming; photos go on section bands instead.
4. **"Three ways to engage" is REAL** — confirmed by client. This is the actual grouping (not a fallback):
   - **Advise us** → Project Management Consultancy · Engineering Design & Technical Consultancy
   - **Deliver for us** → Procurement & Supply Chain · Construction & Installation
   - **End-to-end (EPCI)** → integrated route + Commissioning & Decommissioning · Marine & Offshore (specialist)
   - *(Assignment of each service to a mode is provisional-per-draft; client to flag if any sits wrong.)*
5. **Sectors: SKIPPED on Services** — the 8 sectors already appear on Home and About; no per-service sector cue and no repeated chip strip here.
6. **Client/partner proof: OFF Services** — lives on `/clients-partners`. §6 "Why Lazfields" uses only **owned** proof via `ProofStrip` (20+ yrs, 6 countries, 8 sectors, PMP), so Services needs no external logos/references.
7. **Header image:** `hero-epci` (the only one of the 3 not already used as a page header).
8. **Positioning = Option B (integrated capability is the hero), decided on evidence — not client preference.** The value proposition is the *complete, integrated delivery capability* (EPCI + PM, one team, no handoffs), not any single service. Evidence: tagline is a compound of three; About = "EPCI services **together with** PM consultancy" + "one accountable team, concept to handover"; Home capabilities = "bring together… under one accountable team"; Home hero leads with EPCI; founder's documented work is EPCI/engineering delivery (FPSO, nuclear), not advisory-only. **Option A (feature PM Consultancy as the single core) is rejected** — it would drop the firm into the commoditised PM-consultancy lane where it loses to the giants on scale. *(Corrects an earlier drift toward featuring PM as the core card.)*
   - **Card weighting under Option B — REVISED 2026-07-30:** all six cards render identically (same `bg-navy-900` surface, no pill, no weight distinction). The earlier "two weights" plan (a lighter, labelled "Specialist" treatment for Marine & Offshore) was tried and explicitly rejected by client review — reverted before the Services page review pass. The "don't flatten" intent (Marine ≠ PM in substance) is still carried entirely by the §4 depth copy, not by card styling.

---

## Card system (§3) — spec

**Surface:** navy card + the service's own icon (from `site-data` `CAPABILITIES`: ClipboardList, PenTool, Truck, HardHat, Wrench, Ship) + `01–06` number motif + service name + short teaser.

**Interaction (mandatory — never hover-only):**
- Desktop: name always visible; teaser fades in on **hover**.
- Touch/mobile: teaser **always visible**; card tappable to jump to depth.
- Keyboard: teaser revealed on **focus**; whole card is a focusable link.
- Motion: quiet opacity reveal; degrades cleanly under reduced-motion.

**Role:** link/anchor to the service's §4 depth block. Never carries the full explanation — it's the hook. Cards are grouped under the three engagement modes (decision #4).

## Service Depth (§4) — retained, non-negotiable

Each service keeps a **problem → approach → outcome** block beneath the index — the writing Home doesn't have, and the reason Services is a separate page. **Writable now** from the existing `CAPABILITIES` descriptions + the firm's established positioning (real, not fabricated). Deeper specifics (named projects, metrics) are a *future enrichment* the client can supply — they are NOT required to ship a solid v1 and must never be invented.

## Teaser copy (from existing `site-data` — no new claims)

> **SEO note:** keep teasers **distinct from Home's** capability-card copy (avoid verbatim duplication across pages). The versions below are already shortened/rephrased; hold that distinctness. The unique differentiation lives in §4.

1. **Project Management Consultancy** — Disciplined planning, controls and reporting — visibility at every stage.
2. **Engineering Design & Technical Consultancy** — FEED to detailed design, with technical assurance across disciplines.
3. **Procurement & Supply Chain** — Sourcing and delivery through a trusted UK, US, Europe and China network.
4. **Construction & Installation** — On-site delivery to schedule, cost and quality — safety never compromised.
5. **Commissioning & Decommissioning** — Assets brought safely online, and supported to responsible end-of-life.
6. **Marine & Offshore Services** — Specialist marine, offshore and topside modification support.

## Image strategy (3 photos)

`hero-pm`, `hero-epci`, `hero-commissioning` used as full-bleed section-band backgrounds on 2–3 sections (Delivery Model / How We Run / Why Lazfields), approved grayscale + heavy-navy-scrim treatment. Header = `hero-epci`.

---

## Section stack (7)

1. Page Header (`PageHeader`, navy, `hero-epci`) — "Am I in the right place?"
2. The Delivery Model (positioning thesis, mist — revised 2026-08-01 for RI-5/RI-6 ground rhythm) — "Why read this as different?"
3. **How You Can Engage Us — icon-card index, grouped by the 3 engagement modes** (paper) — "What do you do / how do I buy?"
4. **Service Depth** (per-service problem → approach → outcome; cards anchor here, mist) — "How does each solve *my* problem?"
5. How We Run a Project (engagement method, navy-900 + `hero-pm` photo band) — "How will this actually work?"
6. Why Lazfields (differentiation + owned proof via `ProofStrip`, paper — revised 2026-08-01 for RI-5/RI-6 ground rhythm) — "Why you?"
7. Conversion Close (`ContactCta`, navy, new heading) — "Next step?"

Strategic spine: Home = *what*, About = *who*, **Services = *how we deliver and why us***. Differentiation = **integrated EPCI + independent PM under one accountable, senior-led team, no handoffs.**

---

## SEO (folded into v2)

SEO was not the primary design driver (executive trust + conversion were), but the architecture is mostly SEO-friendly and these are locked in:
- **Visible, crawlable content** — accordion/expand-in-place was rejected partly for SEO; §4 depth stays visible, not hidden behind interaction.
- **Unique §4 copy** (Option-B integrated framing) — the biggest on-page factor; no boilerplate.
- **Semantic structure** — one `h1` (PageHeader), `h2` sections, `h3` per service.
- **Server-rendered + fast** (Next.js, `next/image`, minimal client JS) — good Core Web Vitals.
- **Distinct teasers** — not verbatim Home (see teaser note).
- **Metadata + structured data** — strong `<title>` / meta description (as on Contact), plus `schema.org` JSON-LD (`Organization` + per-service `Service`). *(New; add at implementation.)*

**Honest trade-off:** the single-long-page choice is weaker for SEO than dedicated per-service pages (one URL vs. six focused ones). Mitigation = the **spoke-ready** structure: promote services to their own pages as content matures — that's the SEO growth path. Realistic wins now are specific / long-tail / local (sector + service + UK/Taunton), not generic terms the giants own.

## Services count: 10 (client brief) → 6 (site cards) — reconciled 2026-07-30

The client's revised About-Us brief (`Lazfields Limited - About Us - Revised - 19.07.26.docx`) lists **ten** service lines. The site keeps **six** cards (decision #2, design-driven) and consolidates the ten into them. Mapping:

| Brief (10) | Site card (6) |
|---|---|
| Project management consultancy | **Project Management Consultancy** |
| Portfolio, programme & project controls | ↳ folded in |
| Planning, scheduling, monitoring & reporting | ↳ folded in |
| Risk, cost, quality & change management | ↳ folded in (now named in teaser + description) |
| Engineering design & technical consultancy | Engineering Design & Technical Consultancy |
| Procurement & supply-chain support | Procurement & Supply Chain |
| Construction & installation services | Construction & Installation |
| Commissioning & decommissioning support | Commissioning & Decommissioning |
| **Technical & maintenance services** | ↳ folded into Commissioning & Decommissioning as through-life maintenance/technical support |
| Marine & offshore services | Marine & Offshore Services |

Decision: **keep 6, plug the leaks** (not expand to 10 — that breaks the 6-card / 6-icon / 3-engagement-mode design). Two items had leaked out of the consolidation and were restored in `site-data.ts`: *risk/cost/quality/change management* (into the PM card teaser + description) and *technical & maintenance services* (into the Commissioning & Decommissioning teaser, description and depth). Cards render `SERVICE_DETAILS.teaser`; `CAPABILITIES.description` feeds Home + Services JSON-LD — both were updated to stay consistent.

## Remaining (non-blocking)

- **§4 depth enrichment** — client may later supply named projects/metrics to deepen the per-service blocks. Until then, write honest problem→approach→outcome from existing content. Do not invent specifics.

## Resolved — nav 404s (2026-07-30)

`NAV_LINKS` pointed to `/team`, `/policies`, `/clients-partners`, none of which existed.

- **`/team`** and **`/policies`** — built. Content (leader bios, policy areas) hoisted into `site-data.ts` as `LEADERS` and `POLICIES` — single source shared with the Home/About preview sections, so nothing drifts between the preview and full page.
- **`/clients-partners`** — removed from `NAV_LINKS` instead of building. The client's own brief says the list is *"subject to approval and confidentiality"* — there is no approved content, and inventing client/partner names would violate the no-fabrication rule (decision #6). Re-add the nav link only once the client supplies an approved list.

## Resolved — `<html>` hydration mismatch (2026-07-30)

False alarm, not a code bug. The mismatched attributes (`data-theme="light"`, CSS vars `--white`/`--dark`/`--border-radius`/`--font-family`) appear nowhere in `layout.tsx` or the CSS — a browser extension in the dev Chrome profile was injecting them into `<html>` before React hydrated. React's own warning names this exact cause. No action needed.

---

## Design-system guardrails (locked, reused as-is)

navy `#0a1045` / gold `#f2c230`, Inter/Manrope, paper/mist/navy ground rhythm, eyebrow `uppercase tracking-[0.2em]`, `font-display` h2s, card + `01/02` numbering motif, `fadeUp` + `SECTION_EASE` motion (`whileInView` once). Reuse `ProofStrip` / `ContactCta` / `PageHeader`. No new colours, type scale, or motion primitives. Card teaser reveal must not be hover-only (touch + keyboard parity).

> v1 full blueprint (11 CD deliverables) + Beeproj IA analysis are in the transcript of 2026-07-27. This file is the durable v2 record and supersedes v1.
