---
target: ambulante begeleiding funnel
total_score: 35
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 1
timestamp: 2026-08-28T15-44-06Z
slug: src-app-ambulante-begeleiding-page-tsx
---
# Critique: ambulante begeleiding funnel (src/app/ambulante-begeleiding/page.tsx)

Method: dual-agent (design review + deterministic detector, isolated sub-agents). Browser visualization unavailable (pane cannot composite). Detector: [] / exit 0.

## Design Health Score: 35/36 (heuristic 7 n/a for Persuade) — Exceptional
1 Visibility 4 · 2 Match 4 · 3 Control 3 (no submission edit; no out-of-area signal) · 4 Consistency 4 · 5 Error prevention 4 · 6 Recognition 4 · 7 Flexibility n/a · 8 Minimalist 4 · 9 Error recovery 4 · 10 Help 4

## Specificity: authored for this product (time-axis timeline, real SKJ-register link, "meedenken kost niets", crisis escape hatch). Detector 0 findings; 0 em dashes, 0 hardcoded hex in components, conversion hooks present, tap targets covered on rendered path. ~267 words closed / 581 open.

## Priority issues
[P1] Mobile form-second reflow: below lg the form renders after the whole promise stack (~1.5 screens down); thesis only holds on desktop. Fix: order-first on the form column base/sm, flip at lg. -> layout
[P2] Perishable live signal: green ping + "Nu geen wachtlijst" + dated stamp can lie once stale; degrade honestly (drop ping / soften copy past ~10 days). -> harden
[P2] Figcaption contrast: bento labels text-white on from-black/60 scrim can fail AA over bright photos. Raise scrim / text-shadow. -> harden
[P2] No CTA at the timeline peak + smooth-scroll teleport back to hero form. Add anchor after timeline / phone-first in slot band. -> optimize
[P3] "4 uur" repeated ~6x undercuts calm thesis; keep at form + timeline, demote FEITEN. -> distill

## Persona red flags
Overwhelmed mobile parent: P1 reflow; nav number hidden < sm; grain+blur jank risk on low-end.
"Not bad enough" doubter: served, but calm tone can read as "for milder cases"; spoed distinction only in FAQ8.
Assistive-tech: mostly served; residual figcaption + near-AA grey microcopy.

## Minor: FEITEN comment says "drie" but ships four (chip wrap risk ~360px); stock photography vs "warm real" promise; wachttijden card mist ~1.04:1; global smooth-scroll long jumps.
