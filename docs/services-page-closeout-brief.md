# Services Page — Closeout Implementation Brief

**Source:** `docs/services-page-as-built-review.md` → *Closeout Verification (2026-08-05)*
**Architecture baseline:** `docs/services-page.md` v2 — unchanged, no rework required
**Created:** 2026-08-05
**Status:** CO-1 and CO-3 implemented and verified 2026-08-05. **CO-2 remains open — human-only, not actionable by an agent.**

This brief translates **only** the open items from the 2026-08-05 closeout verification into implementation tasks. It introduces no new findings and re-argues no accepted decision. The 8.1 as-built verdict stands; nothing below re-scores it.

Task IDs are stable — reference them in commit messages.

## Scope and gates

| ID | Item | Type | Gates release? | Status |
|---|---|---|---|---|
| **CO-1** | leadElement connectors dangle below 673px | Code — Services §3 | No (cosmetic), but it is the only known open defect on the page | ✅ **Done** |
| **CO-2** | Reduced motion never observed live | Verification only — no code · **human, not agent** | No | ⏸ **Open** — needs a human at DevTools |
| **CO-3** | `npm run lint` exits 1 | Code or waiver — outside Services | **Yes** — red CI gate | ✅ **Done** |

**Do not** touch anything not named in these three tasks. The as-built review verified the rest of the page clean, including ground rhythm, heading order, contrast, RB-1 touch gating and card CTA alignment. Regressing verified work to "tidy" adjacent code is out of scope.

---

# CO-1 — leadElement step chain: connectors dangle at wrapped line ends

**Review ref:** Closeout Verification 2026-08-05 · New finding · §3 · cosmetic
**File:** `src/components/services/service-index.tsx` — the steps row, **L59–L70**
**Severity:** Cosmetic. Not an accessibility defect — connectors are `aria-hidden`, contrast untouched.

## Problem

Each step label **and its trailing connector** share one flex item inside a `flex-wrap` row. When the row wraps, the connector travels with the label preceding it — so every wrapped line except the last ends with a 16px gold rule pointing at nothing.

The row occupies **560px** and needs **561px** of panel content width to sit on one line. Panel content width is `vw−96` below 640px (`px-6` + `p-6`), `vw−112` from 640–1023px (`px-6` + `p-8`). No viewport below **673px** provides it.

Measured:

| Viewport | Lines | Dangling connectors |
|---|---|---|
| 360px | 4 | **3** |
| 375px | 3 | **2** |
| 390–672px | 2 | **1** |
| 673px+ | 1 | 0 |

At 375px the route reads as three fragments — `Engineering —` / `Procurement —` / `Construction — Installation`. This inverts RI-1's purpose: the panel exists to express the E→P→C→I route *structurally*, and on mobile the structure reads as a broken list.

## Change — leading connector

Emit the rule **before** each item after the first, instead of after each item before the last.

In `src/components/services/service-index.tsx`, replace L59–L70:

```tsx
<div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
  {mode.leadElement.steps.map((step, i, steps) => (
    <div key={step} className="flex items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-navy-700">
        {step}
      </span>
      {i < steps.length - 1 && (
        <span aria-hidden="true" className="h-px w-4 bg-gold-500/60" />
      )}
    </div>
  ))}
</div>
```

with:

```tsx
<div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
  {mode.leadElement.steps.map((step, i) => (
    <div key={step} className="flex items-center gap-3">
      {i > 0 && (
        <span aria-hidden="true" className="h-px w-4 bg-gold-500/60" />
      )}
      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-navy-700">
        {step}
      </span>
    </div>
  ))}
</div>
```

Note the third map parameter (`steps`) is no longer referenced and is dropped above. Remove it — an unused trailing parameter is dead signal regardless of whether this repo's ESLint config flags it, and CO-3 exists precisely to get lint to zero.

**Why this shape.** A wrapped line now *opens* with the continuation mark rather than closing on a dangling one, which reads as "…continued from above". It closes the defect at every width with no breakpoint to tune, and it is a two-line change.

**Why the spacing does not shift.** Current item = `[label, gap-3, rule]` with `gap-x-3` between items, giving `label —12px— rule —12px— label`. New item = `[rule, gap-3, label]`, giving the identical sequence. Desktop rendering is unchanged.

## Acceptance criteria

- **Zero dangling connectors at every viewport.** No wrapped line may end with the `w-4` rule.
- **Desktop rendering pixel-identical.** At 1280px, label left-offsets within the panel must remain `0 / 141 / 293 / 453` and rule left-offsets `113 / 265 / 425`.
- **Single line preserved at ≥673px**; still one line at 1024px and 1280px.
- Modes 1 and 2 render unchanged — they have no `leadElement` and must not acquire one.
- Connectors stay `aria-hidden="true"`. Step labels remain real text in DOM order E → P → C → I.
- `npx tsc --noEmit` clean; `npm run build` succeeds.

**Pre-verified — this is the expected result, not a hope.** The fix was measured against the live DOM before this brief was written: dangling connectors drop to **0** at 360 / 375 / 390 / 480 / 640 / 672px, desktop label and rule positions match the current build exactly, and 1280px stays single-line.

## If you verify by measurement

The automation tab reports `outerWidth: 0` and ignores `resize_window`, so a real narrow viewport may not be available. Clone the row into a fixed-width offscreen host at the panel content widths above (`vw−96` / `vw−112`). This is valid **only** because neither the row, the per-step wrapper, the label `span` nor the connector `span` carries any `sm:`/`md:`/`lg:` variant — responsive variants inside a cloned subtree resolve against the real viewport, not the harness width.

**Do not verify by screenshot.** All six `/services` sections are `whileInView` + `fadeUp`; the hidden automation tab pauses `IntersectionObserver` and they capture blank. Any finding from a screenshot here is a false positive.

## Regression notes

- Do not alter the panel's `rounded-xl border border-line p-6 sm:p-8` primitive — it is the established card primitive and shared with four other components.
- Do not change `gap-x-3` / `gap-y-2` / `gap-3` to "improve" wrapping. The measured result above depends on them.
- `bg-gold-500/60` is the approved connector tone — unchanged.

## Rejected alternative — recorded so it is not re-proposed

Stacking vertically below a breakpoint (`flex-col items-start sm:flex-row`) **does not close this finding**: `sm:` is 640px, leaving the 640–672px band still wrapping with one dangling connector. If stacking is ever preferred on visual grounds, the breakpoint must be **`md:` (768px)** — panel content width at 767px is 655px, clear of the 561px requirement. The leading-connector fix is preferred regardless: no breakpoint to get wrong.

---

# CO-2 — Observe reduced motion live

**Review ref:** RB-3 (2026-08-01, code-inspection only) · re-confirmed unverified 2026-08-05
**Files:** none — **this is a verification task, not a code change**
**Severity:** Does not gate the Services verdict. Converts an inspected claim into an observed one.

## Why it is still open

`MotionConfig reducedMotion="user"` (`src/components/motion-provider.tsx`, wired at `layout.tsx:39`) resolves `matchMedia('(prefers-reduced-motion: reduce)')` at hydration. The available browser tooling exposes no CDP `setEmulatedMedia`, and patching `matchMedia` after load is not honoured by an already-hydrated provider. Two reviews have now declined to report this as observed. **Do not claim it as observed unless you actually ran the steps below.**

## Procedure

1. `npm run dev`, open `/services`.
2. DevTools → Cmd/Ctrl-Shift-P → *Show Rendering* → **Emulate CSS media feature `prefers-reduced-motion: reduce`**.
3. **Reload the page** — the setting must be active at hydration, not applied afterwards.
4. Scroll the full page.

## Expected

- Section content appears **without vertical travel** — `fadeUp`'s `y` transform suppressed, opacity transition retained. Not a blanket kill: content still fades.
- `ProofStrip` counters land on the true values **20+ / 6 / 8 / PMP** with no count-up animation.
- Hero (`/`) inline `y` animation and the `layoutId` dot transition are likewise damped.
- Nothing is invisible, clipped, or stuck mid-transition at any scroll position.

## On completion

Append the observed result to `docs/services-page-as-built-review.md` under the Closeout Verification section. If behaviour matches, RB-3 moves from *inspected* to *observed* and this item closes. If it does not match, **stop and report** — that would be a genuine finding against the root layout affecting every page, not a Services-page issue.

---

# CO-3 — `npm run lint` exits 1

**Review ref:** Risk Assessment (2026-08-01) · re-confirmed red 2026-08-05
**File:** `src/components/navbar.tsx` — **L23–L25**
**Severity:** **Gates release.** Does not affect the Services page verdict — pre-existing, unrelated file, `next build` passes — but a red lint gate will fail CI.

## Problem

```
src/components/navbar.tsx
  24:5  error  Calling setState synchronously within an effect can trigger
               cascading renders   react-hooks/set-state-in-effect
```

The effect closes the mobile menu on route change:

```tsx
useEffect(() => {
  setOpen(false);
}, [pathname]);
```

This is the "reset state when a value changes" pattern, which React now recommends expressing during render rather than in an effect.

## Preferred change — adjust state during render

Replace L23–L25 with:

```tsx
const [lastPathname, setLastPathname] = useState(pathname);
if (lastPathname !== pathname) {
  setLastPathname(pathname);
  setOpen(false);
}
```

Place it immediately after the existing `usePathname()` call, before the scroll effect. This is React's documented approach for adjusting state on prop/value change: the re-render happens before the browser paints, so the menu never renders open on the new route.

Keep the `useEffect` import — the scroll effect at L16–L21 still uses it. `useState` is already imported.

**Pre-verified.** This exact patch was applied to `navbar.tsx` on 2026-08-05 and `npm run lint` exited **0** — no errors, no new warnings — then reverted so the tree ships clean to implementation. The React Compiler ruleset that flags `set-state-in-effect` does **not** flag this guarded render-phase form. You are not expected to discover a new rule violation here.

## Acceptance criteria

- `npm run lint` exits **0** with no errors and no new warnings.
- Open the mobile menu (<1024px), tap a nav link → menu closes and the new route renders.
- Open the menu, then use browser **Back** → menu closes. *(This is the case an `onClick`-only fix would miss — see below.)*
- Menu still closes on its X button and its own toggle.
- The `scrolled || open` header background logic is unaffected: with the menu open at scroll 0, the header stays `bg-navy-900/95`.
- No `eslint-disable` comment is introduced by the preferred route.

## Alternatives, ranked

1. **Render-phase adjustment (above)** — preferred. Covers every navigation, including Back/Forward.
2. **Close in the link `onClick`** — simpler, but only covers link clicks. A menu left open across a Back navigation stays open. Acceptable only if 1 proves problematic.
3. **Documented waiver** — last resort. If taken, add a scoped `// eslint-disable-next-line react-hooks/set-state-in-effect` with a one-line justification **and** record the waiver in `docs/`, per AGENTS.md. A bare disable with no rationale is not acceptable.

## Regression notes

- `navbar.tsx` is a **shared** component on all six pages. Verify at least `/` and `/services` after the change.
- Do not refactor the scroll effect (L16–L21) — it is not flagged and is out of scope.

---

# Definition of done

- [x] CO-1 implemented; dangling connectors zero at 360/375/390/480/640/672/1024/1280px on the live component; desktop offsets unchanged (`0/141/293/453` labels, `113/265/425` rules).
- [ ] **CO-2 — human only.** Not implementable by an agent: it needs a person at DevTools (see CO-2 for why the tooling cannot emulate it). An implementing agent should **skip this and say so**, not check it off and not stall on it.
- [x] CO-3 fixed; `npm run lint` exits 0. Live-verified: mobile menu opens, closes on nav-link click with route change, and closes on browser Back.
- [x] `npx tsc --noEmit` clean, `npm run build` succeeds, all 9 routes still prerender static.
- [x] `docs/services-page-as-built-review.md` closeout section updated with outcomes (2026-08-05 implementation note).

**CO-1 and CO-3 are closed as of 2026-08-05.** With CO-3 closed, the release-gating red lint check is resolved. **CO-2 remains the sole open item** on the Services page — it requires a human DevTools pass and cannot be closed by an agent. Once CO-2 is observed, the Services page has no open items beyond the documented backlog (BL-1 … BL-7); no further Design Review Board cycle is warranted.
