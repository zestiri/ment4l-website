---
name: nano-banana
description: >-
  Generate or edit brand-consistent photos and images via OpenRouter
  (Nano Banana / Gemini image models) using structured JSON prompts.
  Two steps: (1) author a JSON art-direction spec, (2) run the generator
  script. Use when the user wants to create images, fill photo placeholders,
  make mockups, or edit an existing image.
---

# nano-banana

Create photographic, on-brand images from a **structured JSON prompt** and
generate them through **OpenRouter** (default model
`google/gemini-3.1-flash-image-preview`, "Nano Banana 2").

The work is one skill in **two steps**:

1. **Author** a JSON art-direction spec (the contract).
2. **Generate** by running `scripts/generate.py` on that spec.

The JSON schema is the single source of truth shared by both steps. See
`reference/schema.md` for every field, and `templates/` for a `basic.json`
(quick) and `advanced.json` (full virtual-photography) starting point.

---

## Step 0 - Brand preset (do this first)

Images must look like they belong to the same project, so before writing a
spec, settle the house style **once** via a preset.

1. Look for a preset in the current project root: **`nano-banana.preset.json`**.
   (If you are unsure where it lives, ask the user.)
2. **If it exists:** good. The generator auto-merges it as the base layer, so
   each spec only needs to state what changes for that shot.
3. **If it does NOT exist:** ask the user for their brand/style basics, then
   offer to save them as `nano-banana.preset.json` so every future image stays
   on-brand. Ask about:
   - palette / mood (e.g. warm daylight, light uncluttered background)
   - photographic look (lens feel, depth of field, candid vs studio)
   - do's and don'ts (e.g. avoid logos, text overlays, plastic AI look)
   - default aspect ratio / size

A preset uses the exact same fields as a spec (see `reference/schema.md`); it
just holds the defaults. Anything in the per-shot spec overrides it.

---

## Step 1 - Author the JSON prompt

- Copy a template: `templates/basic.json` for a simple shot, or
  `templates/advanced.json` for full control (subject array, lighting, camera,
  composition, style, text rendering, constraints).
- Fill it in like a creative director briefing a photographer: be specific,
  use **positive** framing (describe what you want, not what you don't), and
  control the camera with real photographic terms.
- Save it anywhere, e.g. `shot.json`.

Two prompting styles are supported and you do not have to choose up front:
- **Structured (default):** the JSON is sent as art-direction. Best for
  complex, repeatable, multi-subject, on-brand work.
- **Narrative (`--narrative`):** the script flattens the JSON into a single
  natural-language paragraph (`[Subject] + [Action] + [Location] +
  [Composition] + [Style]`), which is Google's officially recommended style.
  Try this if a structured result feels stiff.

---

## Step 2 - Generate

```powershell
# from the skill's scripts folder (or pass full paths)
python generate.py shot.json --dry-run      # preview the request, no API call, no key needed
python generate.py shot.json                # real generation -> output/shot-<timestamp>.png
python generate.py shot.json --narrative    # compile to a narrative prompt instead
python generate.py shot.json --out scholen/public/images/hero.png   # choose the output path
python generate.py shot.json --model google/gemini-3-pro-image-preview   # use Nano Banana Pro
```

**Always run `--dry-run` first** to confirm the prompt and `image_config`
look right before spending tokens.

### API key (never paste it in chat)
The script reads `OPENROUTER_API_KEY` from the environment, or from a local
`.env` file (`OPENROUTER_API_KEY=sk-or-...`) in the working directory.
Set it in PowerShell for the session:

```powershell
$env:OPENROUTER_API_KEY = "sk-or-..."
```

Do not log, print, or commit the key. The `.env` file should stay out of
version control.

---

## Editing / using reference images

```powershell
python generate.py shot.json --edit photo.jpg
python generate.py shot.json --edit face.jpg,scene.jpg --out result.png
```

The input image(s) are base64-encoded and sent alongside the prompt; the JSON
spec then describes the change ("same person, now ...").

---

## Aspect ratio & size (set in `meta`)

`image_config` is derived from `meta` in the spec:

| meta.aspect_ratio | use for                         |
|-------------------|---------------------------------|
| `1:1`             | square portraits, theme cards   |
| `4:5`, `3:4`      | vertical portraits              |
| `4:3`             | general / category cards        |
| `16:9`            | heroes, wide moment shots       |

`meta.image_size`: `0.5K`, `1K`, `2K`, `4K`. Optional `meta.seed` for
reproducibility, and `meta.model` to pin a model in the spec itself.

---

## Models & cost

- Default: `google/gemini-3.1-flash-image-preview` (Nano Banana 2) - fast,
  cheap, Pro-level quality, great for edits.
- `--model google/gemini-3-pro-image-preview` - Nano Banana Pro: top quality
  and the strongest legible-text rendering, but pricier. Use for hero/key
  shots.

A few cents per image on Flash; Pro is several times that. Costs hit the
user's OpenRouter account, so prefer `--dry-run` while iterating.

---

## Notes

- Output goes to `output/` by default; pass `--out` to drop a file straight
  into a project (e.g. a website's `public/images/`).
- AI-generated people are **not** real minors, so there is no portrait-consent
  issue - but flag clearly when an image is AI, and treat these as polished
  placeholders/mockups, not a replacement for real photography where
  authenticity matters.
