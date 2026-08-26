# JSON prompt schema

The same schema is used for **presets** (defaults) and **specs** (per shot).
The generator merges `preset <- spec`, then turns the result into either a
structured prompt (default) or a narrative paragraph (`--narrative`).

Only `subject` + a little of `scene`/`style` is needed for a usable image;
everything else is optional control. Start from `templates/basic.json` or
`templates/advanced.json`.

```jsonc
{
  // GLOBAL OUTPUT SETTINGS -> mapped to OpenRouter image_config
  "meta": {
    "aspect_ratio": "16:9",   // "1:1" | "4:5" | "3:4" | "4:3" | "16:9" ...
    "image_size": "2K",       // "0.5K" | "1K" | "2K" | "4K"
    "seed": 7,                 // optional, for reproducible variations
    "model": "google/gemini-3.1-flash-image-preview"  // optional override
  },

  // WHO / WHAT IS IN FRAME (array = multiple subjects, no color bleeding)
  "subject": [
    {
      "description": "short who/what",   // required per subject
      "age": "around 12",                // keep human, avoid exact numbers if unsure
      "appearance": "natural, warm",
      "wardrobe": "simple casual clothing, muted tones",
      "pose": "leaning in, pointing",
      "expression": "encouraging smile",
      "position": "left third of frame"  // helps composition
    }
  ],

  // WHERE
  "scene": {
    "setting": "real, lived-in school activity room",
    "location": "indoors",
    "time_of_day": "late afternoon",
    "weather": "clear",
    "background": "soft, uncluttered, slightly out of focus"
  },

  // LIGHT
  "lighting": {
    "setup": "large soft window light from camera-left",
    "quality": "soft, diffused",
    "direction": "side light with gentle fill",
    "mood": "warm and natural"
  },

  // VIRTUAL PHOTOGRAPHY (controls the visual DNA)
  "camera": {
    "device": "full-frame mirrorless",
    "lens": "35mm prime",
    "focal_length": "35mm",
    "aperture": "f/2.0 shallow depth of field",
    "shutter_speed": "1/250s",
    "iso": 200,
    "film_stock": "clean digital, true-to-life color"
  },

  // FRAMING
  "composition": {
    "framing": "medium-wide two-shot",
    "angle": "eye level",
    "focus": "sharp on faces and hands",
    "rule": "leave clear negative space on one side for a headline"
  },

  // LOOK
  "style": {
    "medium": "candid documentary photograph",
    "aesthetic": "authentic, editorial, human",
    "color_grade": "warm neutrals, gentle contrast",
    "mood": "trust, growth, focus",
    "references": []           // optional: named looks/photographers
  },

  // LEGIBLE TEXT IN THE IMAGE (use sparingly; Pro renders text best)
  "text": [
    { "content": "WELKOM", "font": "clean geometric sans", "placement": "top-left, small" }
  ],

  // GUARDRAILS
  "constraints": {
    "must_keep": ["natural skin tones", "uncluttered background", "diverse, real-looking people"],
    "avoid": ["logos", "text overlays", "watermarks", "distorted hands", "plastic AI look"]
  },

  // optional single-string negative (used only in structured mode)
  "negative_prompt": "cartoonish, oversaturated, busy background, watermark"
}
```

## Basic vs advanced

- **basic** = `meta` + one `subject` + a little `scene`/`style`. Fast to write,
  good for simple shots.
- **advanced** = the full schema above: subject array, lighting, camera,
  composition, text rendering, constraints. Use it when you need consistency
  across many shots, multiple people, precise framing, or in-image text.

## Why JSON (and when not to)

- JSON wins for **consistency, repeatability and fine control** - exactly what
  a brand needs across many images. Keep shared look in the preset; vary only
  per-shot fields.
- Google's own guidance favors **narrative** prompts and positive framing. If a
  structured result feels stiff or ignores a detail, regenerate with
  `--narrative` (the script flattens the same JSON into a paragraph).
- Tip: prefer the `constraints.avoid` / `must_keep` lists over a long
  `negative_prompt`; positive, concrete description beats negation.

## Field -> request mapping

| spec field          | becomes                                  |
|---------------------|------------------------------------------|
| `meta.aspect_ratio` | `image_config.aspect_ratio`              |
| `meta.image_size`   | `image_config.image_size`                |
| `meta.seed`         | `seed`                                   |
| `meta.model`        | request `model` (unless `--model` given) |
| everything else     | the prompt text (structured or narrative)|
