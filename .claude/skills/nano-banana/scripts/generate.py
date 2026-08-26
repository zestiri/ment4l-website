#!/usr/bin/env python3
"""Generate / edit images with Nano Banana (Gemini image models) via OpenRouter.

Reads a JSON art-direction spec (see ../templates and ../reference/schema.md),
turns it into a prompt, calls OpenRouter, and saves the returned PNG.

Examples:
  python generate.py shot.json --dry-run
  python generate.py shot.json
  python generate.py shot.json --narrative
  python generate.py shot.json --edit photo.jpg --out scholen/public/images/hero.png
  python generate.py shot.json --model google/gemini-3-pro-image-preview
"""
import argparse
import base64
import copy
import json
import os
import sys
import time
from pathlib import Path

try:
    import requests
except ImportError:
    sys.exit("Missing dependency 'requests'. Run: pip install -r requirements.txt")

API_URL = "https://openrouter.ai/api/v1/chat/completions"
DEFAULT_MODEL = "google/gemini-3.1-flash-image-preview"  # Nano Banana 2
PRESET_NAME = "nano-banana.preset.json"


def load_env_file():
    """Lightweight .env loader so the key need not stay in the shell forever."""
    env = Path.cwd() / ".env"
    if not env.is_file():
        return
    for line in env.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


def deep_merge(base, override):
    """Recursively merge override onto base (override wins)."""
    if not isinstance(base, dict) or not isinstance(override, dict):
        return override
    out = dict(base)
    for k, v in override.items():
        out[k] = deep_merge(base.get(k), v) if isinstance(v, dict) else v
    return out


def discover_preset(explicit):
    if explicit:
        return json.loads(Path(explicit).read_text(encoding="utf-8")), explicit
    local = Path.cwd() / PRESET_NAME
    if local.is_file():
        return json.loads(local.read_text(encoding="utf-8")), str(local)
    return None, None


def _join(d, keys):
    return ", ".join(str(d[k]) for k in keys if d.get(k))


def to_narrative(spec):
    """Flatten the spec into a Google-style narrative prompt:
    [Subject] + [Action] + [Location] + [Composition] + [Style]."""
    parts = []
    subs = spec.get("subject") or []
    if isinstance(subs, dict):
        subs = [subs]
    subj_bits = []
    for s in subs:
        bit = s.get("description", "")
        extra = _join(s, ("age", "appearance", "wardrobe", "expression", "pose", "position"))
        if extra:
            bit = f"{bit} ({extra})" if bit else extra
        if bit:
            subj_bits.append(bit)
    if subj_bits:
        parts.append("; ".join(subj_bits))

    loc = _join(spec.get("scene") or {}, ("setting", "location", "time_of_day", "weather", "background"))
    if loc:
        parts.append(f"Setting: {loc}")

    light = _join(spec.get("lighting") or {}, ("setup", "quality", "direction", "mood"))
    if light:
        parts.append(f"Lighting: {light}")

    cam = _join(spec.get("camera") or {}, ("device", "lens", "focal_length", "aperture", "shutter_speed", "iso", "film_stock"))
    if cam:
        parts.append(f"Camera: {cam}")

    comp = _join(spec.get("composition") or {}, ("framing", "angle", "focus", "rule"))
    if comp:
        parts.append(f"Composition: {comp}")

    style = _join(spec.get("style") or {}, ("medium", "aesthetic", "color_grade", "mood"))
    if style:
        parts.append(f"Style: {style}")

    for t in spec.get("text") or []:
        if t.get("content"):
            seg = f'Include the text "{t["content"]}"'
            if t.get("font"):
                seg += f' in a {t["font"]} font'
            if t.get("placement"):
                seg += f", {t['placement']}"
            parts.append(seg)

    must = (spec.get("constraints") or {}).get("must_keep") or []
    if must:
        parts.append("Keep: " + ", ".join(must))

    return ". ".join(p for p in parts if p) + "."


def to_structured(spec):
    """Send the JSON itself as art-direction, minus the output meta."""
    clean = {k: v for k, v in spec.items() if k != "meta"}
    return (
        "Generate ONE photographic image that exactly matches this art-direction "
        "spec. Interpret the JSON as creative direction; do NOT draw the JSON, its "
        "keys, or braces in the image. Only render text that appears under a "
        '"text" entry.\n\n'
        + json.dumps(clean, ensure_ascii=False, indent=2)
    )


def build_image_config(meta):
    cfg = {}
    if meta.get("aspect_ratio"):
        cfg["aspect_ratio"] = meta["aspect_ratio"]
    if meta.get("image_size"):
        cfg["image_size"] = meta["image_size"]
    return cfg


def encode_image(path):
    data = Path(path).read_bytes()
    ext = Path(path).suffix.lower().lstrip(".") or "png"
    mime = "jpeg" if ext in ("jpg", "jpeg") else ext
    return f"data:image/{mime};base64," + base64.b64encode(data).decode()


def main():
    ap = argparse.ArgumentParser(description="Generate images via OpenRouter (Nano Banana).")
    ap.add_argument("spec", help="Path to the JSON prompt spec.")
    ap.add_argument("--preset", help=f"Preset JSON to merge as defaults (else auto-detects ./{PRESET_NAME}).")
    ap.add_argument("--model", help="Override the model slug.")
    ap.add_argument("--narrative", action="store_true", help="Compile the spec to a narrative prompt instead of sending JSON.")
    ap.add_argument("--edit", help="Comma-separated input image(s) to edit / use as reference.")
    ap.add_argument("--out", help="Output PNG path (default: output/<spec>-<timestamp>.png).")
    ap.add_argument("--dry-run", action="store_true", help="Print the request and exit without calling the API.")
    args = ap.parse_args()

    load_env_file()

    spec = json.loads(Path(args.spec).read_text(encoding="utf-8"))
    preset, preset_src = discover_preset(args.preset)
    if preset:
        spec = deep_merge(preset, spec)
        print(f"* preset merged: {preset_src}")

    meta = spec.get("meta") or {}
    model = args.model or meta.get("model") or DEFAULT_MODEL
    prompt = to_narrative(spec) if args.narrative else to_structured(spec)

    content = prompt
    if args.edit:
        content = [{"type": "text", "text": prompt}]
        for p in [x.strip() for x in args.edit.split(",") if x.strip()]:
            content.append({"type": "image_url", "image_url": {"url": encode_image(p)}})

    body = {
        "model": model,
        "messages": [{"role": "user", "content": content}],
        "modalities": ["image", "text"],
    }
    img_cfg = build_image_config(meta)
    if img_cfg:
        body["image_config"] = img_cfg
    if meta.get("seed") is not None:
        body["seed"] = meta["seed"]

    if args.dry_run:
        preview = copy.deepcopy(body)
        msg = preview["messages"][0]["content"]
        if isinstance(msg, list):
            for part in msg:
                if part.get("type") == "image_url":
                    u = part["image_url"]["url"]
                    part["image_url"]["url"] = u[:40] + f"...<{len(u)} chars>"
        print("=== MODE ===", "narrative" if args.narrative else "structured")
        print("=== MODEL ===", model)
        print("=== IMAGE_CONFIG ===", img_cfg or "(model default)")
        print("\n=== PROMPT ===\n" + prompt)
        print("\n=== REQUEST BODY ===")
        print(json.dumps(preview, ensure_ascii=False, indent=2))
        print("\n[dry-run] no API call made.")
        return

    key = os.environ.get("OPENROUTER_API_KEY")
    if not key:
        sys.exit(
            'OPENROUTER_API_KEY not set.\n'
            '  PowerShell: $env:OPENROUTER_API_KEY = "sk-or-..."\n'
            "  or put OPENROUTER_API_KEY=sk-or-... in a .env file in this folder."
        )

    headers = {
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://ment4l.nl",
        "X-Title": "ment4l nano-banana",
    }
    print(f"* model: {model} | image_config: {img_cfg or '(default)'} | mode: {'narrative' if args.narrative else 'structured'}")
    resp = requests.post(API_URL, headers=headers, json=body, timeout=180)
    if resp.status_code != 200:
        sys.exit(f"OpenRouter error {resp.status_code}: {resp.text[:600]}")

    data = resp.json()
    try:
        url = data["choices"][0]["message"]["images"][0]["image_url"]["url"]
    except (KeyError, IndexError, TypeError):
        sys.exit("No image in response. Raw: " + json.dumps(data)[:600])

    b64 = url.split(",", 1)[1] if "," in url else url
    raw = base64.b64decode(b64)

    out = args.out
    if not out:
        ts = time.strftime("%Y%m%d-%H%M%S")
        out = str(Path("output") / f"{Path(args.spec).stem}-{ts}.png")
    Path(out).parent.mkdir(parents=True, exist_ok=True)
    Path(out).write_bytes(raw)
    print(f"OK saved {out} ({len(raw) // 1024} KB)")


if __name__ == "__main__":
    main()
