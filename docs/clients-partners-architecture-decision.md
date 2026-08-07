# Clients & Partners — Architecture & Strategy Decision

**Type:** Pre-build architecture evaluation, acting as Executive Creative Director. **Not an implementation plan.** No page is specified, no component is designed.
**Question put:** the client was asked for Clients & Partners content and supplied a list of nine industries — no client names, partner names, logos, projects, case studies or other proof. Is that sufficient, and what should be built?
**Evidence base:** `src/lib/site-data.ts`, `src/components/hero.tsx`, `src/components/proof-strip.tsx`, `src/components/about/about-intro.tsx`, `src/components/services/proof-section.tsx`, and the `metadata` blocks of all six routes, as committed at `5c4223f`.
**Date:** 2026-08-07
**Recommendation:** **C — Do not build the page yet; request additional client information.** One evidence-backed data correction should proceed independently. Detail in §8.

---

## 1. What in the client's list is genuinely new

**Exactly one item of nine: Aerospace and Defence.**

Everything else either already exists in the site's sector model or is not a sector at all. That is the central finding of this evaluation, and it is what makes the "build a page" instinct wrong.

## 2. What is already represented elsewhere

`SECTORS` (`site-data.ts:46–55`) is the site's declared single source of truth for sectors. It renders as a chip list on the **hero** (`hero.tsx:186`) and on the **About** page (`about-intro.tsx:89`).

| # | Client's item | Already on the site? | Where |
|---|---|---|---|
| 1 | Aerospace and Defence | ❌ **Absent from `SECTORS`** | but evidenced — see §4 |
| 2 | Pharmaceuticals | ✅ | `SECTORS` — "Pharmaceutical" |
| 3 | Nuclear Power Plants (New Build…) | ✅ | `SECTORS` — "Nuclear Power" |
| 4 | Marine & Offshore Engineering S… | ⚠️ ambiguous | see §3 |
| 5 | Oil and Gas | ✅ | `SECTORS` — "Oil & Gas" |
| 6 | EPCI | ❌ **not a sector** | see §3 |
| 7 | Utilities and Water Framework | ✅ | `SECTORS` — "Utilities" |
| 8 | Civil Engineering & Construction | ✅ | `SECTORS` — "Construction" |
| 9 | Highways Construction | ✅ | `SECTORS` — "Highways" |

**Seven of nine are restatements** of sectors already published on two pages. One is new. One is a category error.

Note also: `SECTORS` contains **"Energy"**, which the client's list drops. Whether that is a deliberate narrowing or an oversight is unresolved and must be asked (§7).

### Sector information is already spread across four surfaces, and they disagree

This matters more than the new page question, because it is a live defect:

| Surface | Sector content | Count |
|---|---|---|
| `SECTORS` array → hero chips + About chips | Construction, Energy, Utilities, Oil & Gas, Nuclear Power, Pharmaceutical, Highways, Marine | **8** |
| `hero.tsx:15` prose | "construction, energy, oil & gas, nuclear power, pharmaceutical, highways and marine" | **7** — omits Utilities |
| `layout.tsx:19` site metadata | "construction, energy, oil & gas, nuclear, pharmaceutical, highways and marine sectors" | **7** — omits Utilities |
| `proof-strip.tsx:17` | `{ value: 8, label: "Core Sectors Served" }` | **8**, hard-coded |

The hero alone carries both an 8-item chip list and a 7-item prose sentence. **Adding a ninth sector to a model already inconsistent across four surfaces would compound the problem, not fix it.**

### The declared single source of truth is not actually wired up

`site-data.ts:44–45` states that `SECTORS` is *"used by the hero, proof strip and About page so the count can never drift between pages."*

**The proof strip does not import `SECTORS`.** Its imports are `react`, `framer-motion` and `@/lib/motion` only; the figure `8` is a literal in `STATS`. The comment describes an intent that was never implemented. The count *can* drift, and the moment Aerospace and Defence is added it *will* — hero and About would show nine chips beneath a strip asserting "8 Core Sectors Served".

## 3. Classification: industry vs service / delivery model

**EPCI is a delivery model, not an industry.** This is not a judgement call; the site says so in five places:

- `hero.tsx:12` — `tag: "EPCI Services"`
- `site-data.ts:205` — `label: "End-to-End (EPCI)"`, an entry in `ENGAGEMENT_MODES`
- `about-intro.tsx:46` — "…Installation (EPCI) services"
- `services/page.tsx:50` — `h1`: "EPCI and project management, without the handoffs"
- `layout.tsx:19`, `about/page.tsx:14`, `contact/page.tsx:10`, `services/page.tsx:16` — all four frame EPCI as what the firm *does* **across** sectors

Every one of those treats EPCI as the method applied *to* industries. Reclassifying it as an industry would contradict the Services `h1` and four metadata descriptions simultaneously. **It must not be added to a sector list**, whatever the client's list implies. Its presence there is best read as the client listing capabilities and markets in one breath — normal in a verbal brief, not a taxonomy.

**Two items cannot be classified because the supplied text is truncated.** Both arrived cut off, in the original message and again on re-supply:

- **"Nuclear Power Plants (New Build…"** — the parenthetical is incomplete. If it resolves to something including *decommissioning*, that overlaps `CAPABILITIES` #5, "Commissioning & Decommissioning" — a service, not a sector.
- **"Marine & Offshore Engineering S…"** — if this resolves to *"…Services"*, it is the existing `CAPABILITIES` #6, **"Marine & Offshore Services"** — a service. If it resolves to *"…Sector"*, it is the existing `SECTORS` entry "Marine". The site currently contains **both**, which is exactly why guessing is unsafe.

Completing these two strings by inference would be fabrication. They must come from the client verbatim.

## 4. Can Aerospace & Defence be added on existing evidence?

**Yes — and it should be, independently of any page decision.** Three independent sources, none invented:

1. `site-data.ts:240` — Ian Banks' biography, client-supplied: *"His work spans FPSO topside modifications, nuclear power, **aviation and aerospace defence**, pharmaceutical, utilities and construction…"*
2. `services/proof-section.tsx:14` — *"FPSO topside modifications, nuclear power, and **aviation and aerospace defence** — sectors where there's no margin for an inexperienced team."* Note this copy already calls it a **sector**.
3. The client's new list, naming it first.

**The site has been under-claiming a sector it can already evidence in its own published copy.** That is a real finding and the single most valuable thing this exercise surfaced. It requires no new client content.

**Constraint:** it cannot land alone. Adding it takes `SECTORS` to nine and breaks the hard-coded `8` in `proof-strip.tsx:17`. The count coupling must be resolved in the same change — either by deriving the figure from `SECTORS.length` or by updating the literal deliberately. This is a correctness fix, not an enhancement.

## 5. Is the supplied information sufficient for a Clients & Partners page?

**No. Not marginally — categorically.**

A Clients & Partners page exists to answer one question: **"who have you worked with, and who do you deliver through?"** The supplied list answers a different question — *"what industries do you work in?"* — and that question is already answered on the hero and About.

Supplied: nine industry labels. Supplied clients: **zero**. Partners: **zero**. Projects: **zero**. Case studies, logos, framework appointments, references, dates, outcomes: **zero**.

A page built from this would carry roughly nine short phrases, seven of which a visitor read on the homepage. It would be the site's **fifth** surface displaying sector information.

This is the same defect the Design Review Board recorded against `/policies` three days ago — RB-1, and **Trust & Credibility 4.0/10**: a page whose title promises evidence and whose body delivers assertion. That page is still blocked on it. Building Clients & Partners from this list would introduce the identical defect knowingly, on the one page where a procurement reader most expects proof. Two pages failing the same test stops looking like an oversight and starts looking like a pattern.

**The confidentiality position also has not changed.** `site-data.ts:14–16` records that the client list is subject to approval and that the page must not be re-added with placeholder content. Nothing supplied lifts that.

## 6. Should it be reframed as "Industries We Serve"?

**As a content model, yes. As a page, not yet — and renaming does not earn it one.**

Renaming fixes the *honesty* problem: a page called "Industries We Serve" containing industries is truthful, where "Clients & Partners" containing no clients is not. That is a genuine improvement and the right eventual title if this content is ever published on its own route.

But it does not fix the *duplication* problem, which is the one that actually blocks. Apply the same test the DRB applied to `/policies`: **what does a reader get here that they did not already get on the homepage?** Today the answer is "one additional industry and some longer labels." That is not a page. It is a data update to `SECTORS`.

**What would earn the page** is per-industry substance — what Lazfields actually delivers in nuclear new build versus highways, which of the six capabilities apply, what constraints or standards govern each. Two to four sentences per industry converts a list into a reason to visit. **None of that has been supplied.** The reframe is therefore correct in principle and premature in practice.

## 7. What to request from the client

### To justify a genuine Clients & Partners page

1. **Named clients**, each with explicit permission to name — or approved anonymised descriptors ("a UK nuclear new-build operator", "a Tier-1 highways contractor") where naming is restricted.
2. **Named partners and manufacturers** from the UK / US / Europe / China network the site already claims in four places (`about-intro.tsx:54`, `site-data.ts:80`, `site-data.ts:141`, `services/proof-section.tsx:18`) but never evidences, with permission to name.
3. **Project references** — scope, sector, Lazfields' role, dates, outcome.
4. **Framework appointments or approved-supplier status**, if any.
5. **Logo usage rights**, if logos are wanted.
6. **Testimonials or referees**, if available.

Items 1–3 are the minimum. Without at least one of them, the page cannot be what its title claims.

### To justify an "Industries We Serve" page

7. **Two to four sentences per industry** — what is actually delivered there, typical scope, constraints.
8. **Capability mapping** — which of the six `CAPABILITIES` apply per industry.
9. **Sector-specific standards or qualifications**, if any.

### Immediately, regardless of which page is built

10. **The full text of the two truncated items** (#3 and #4) — these have now arrived truncated twice and cannot be inferred.
11. **Confirmation of whether "Marine & Offshore Engineering S…" is a sector or the existing service.**
12. **Whether "Energy" is deliberately dropped** — it is in `SECTORS` and absent from the client's list.
13. **Confirmation that Aerospace and Defence may be published as a served sector** — the evidence is already on the site, so this is a confirmation, not a request for new material.

## 8. Recommendation

# C — Do not build the page yet; request additional client information.

**Why not A (build Clients & Partners now).** The supplied content contains no clients and no partners. The page would fail its own title on first read, on the page where credibility matters most, and would repeat the exact finding that currently blocks `/policies` at 4.0/10 for Trust. The confidentiality constraint recorded at `site-data.ts:14–16` is also still in force.

**Why not B (reframe as Industries We Serve).** The reframe is the right *eventual* title and the wrong *current* action. Seven of nine items already publish on the hero and About; a page carrying them a third time has no reason to exist, and creating one to house content we happen to have is the definition of building a page because we can fill it. B becomes correct the moment request items 7–9 are answered — not before.

**Why C.** Everything of value in the client's list either already exists, is misclassified, or is a single missing sector that should be handled as a data correction. Nothing in it needs a page. What a Clients & Partners page needs, the client has not yet supplied — and the gap is specific enough to ask for precisely (§7).

### What should happen next

1. **Send the client request** — §7 items 10–13 first, since they are quick and unblock the data work; then items 1–6, which determine whether the page exists at all.
2. **Proceed independently with the Aerospace & Defence correction.** It is evidenced by the site's own published copy, needs no new content, and closes a real under-claim. It must land together with the `proof-strip.tsx:17` count coupling and should also reconcile the 7-vs-8 divergence in `hero.tsx:15` and `layout.tsx:19`. Hold only for request item 13's confirmation. **This is a `SECTORS` data fix, not a page, and should not be bundled into any Clients & Partners work.**
3. **Do not add a nav entry.** `site-data.ts:14–16` stays as written; the nav remains six items. There is no 404 risk today precisely because the link was never added — that discipline should hold.
4. **Do not adopt the client's labels wholesale.** Where they are genuinely more precise ("Utilities and Water Framework" over "Utilities") they are an improvement worth taking; where they duplicate ("Civil Engineering & Construction" over "Construction") the gain is marginal against churn on two pages. Decide label-by-label once the truncated strings arrive — not as a bulk replacement.
5. **Revisit this decision when the client responds.** If items 1–3 arrive → **A**, with a full review trail. If only 7–9 arrive → **B**. If neither → the page does not exist, and that is a legitimate outcome, not a gap.

### Recorded so it is not re-litigated

**EPCI does not enter the sector model.** Whatever else changes, this one does not — five separate places in the codebase depend on EPCI being the delivery method applied across sectors, including the Services `h1`.
