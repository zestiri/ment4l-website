# -*- coding: utf-8 -*-
"""Haalt de officiële ment4l-huisstijlfonts op als statische TTF's in fonts/.

build_pdf.py embedt deze fonts via reportlab. Draai dit script eenmalig na een
verse checkout (of wanneer fonts/ ontbreekt):

    python fetch_fonts.py

Benodigde bestanden in fonts/ (alle OFL-gelicentieerd, Google Fonts):
    IBMPlexSerif-Regular.ttf   IBMPlexSerif-Bold.ttf    (koppen / display)
    IBMPlexMono-Regular.ttf    IBMPlexMono-Bold.ttf     (eyebrows / labels / wordmark)
    Inter-Regular.ttf          Inter-Bold.ttf           (body / UI)
"""
import io
import os
import ssl
import urllib.request
import zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
FONT_DIR = os.path.join(HERE, "fonts")
CTX = ssl.create_default_context()
UA = {"User-Agent": "Mozilla/5.0"}

# IBM Plex Serif & Mono — statische per-gewicht TTF's uit de Google Fonts repo.
GF = "https://github.com/google/fonts/raw/main/ofl"
DIRECT = {
    "IBMPlexSerif-Regular.ttf": f"{GF}/ibmplexserif/IBMPlexSerif-Regular.ttf",
    "IBMPlexSerif-Bold.ttf":    f"{GF}/ibmplexserif/IBMPlexSerif-Bold.ttf",
    "IBMPlexMono-Regular.ttf":  f"{GF}/ibmplexmono/IBMPlexMono-Regular.ttf",
    "IBMPlexMono-Bold.ttf":     f"{GF}/ibmplexmono/IBMPlexMono-Bold.ttf",
}
# Inter staat in Google Fonts alleen als variable font (reportlab rendert daar
# geen echte bold uit), dus pakken we de statische TTF's uit de officiële release.
INTER_ZIP = "https://github.com/rsms/inter/releases/download/v4.1/Inter-4.1.zip"
INTER_FROM_ZIP = {
    "Inter-Regular.ttf": "extras/ttf/Inter-Regular.ttf",
    "Inter-Bold.ttf":    "extras/ttf/Inter-Bold.ttf",
}

VALID_MAGIC = (b"\x00\x01\x00\x00", b"true", b"OTTO", b"ttcf")


def _get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), context=CTX, timeout=300).read()


def _save(name, data):
    if data[:4] not in VALID_MAGIC:
        raise ValueError(f"{name}: lijkt geen geldige TTF (magic={data[:4]!r})")
    with open(os.path.join(FONT_DIR, name), "wb") as fh:
        fh.write(data)
    print(f"  OK  {name}  ({len(data)} bytes)")


def main():
    os.makedirs(FONT_DIR, exist_ok=True)
    print("IBM Plex Serif / Mono ...")
    for name, url in DIRECT.items():
        _save(name, _get(url))
    print(f"Inter (uit {os.path.basename(INTER_ZIP)}) ...")
    zf = zipfile.ZipFile(io.BytesIO(_get(INTER_ZIP)))
    for name, member in INTER_FROM_ZIP.items():
        _save(name, zf.read(member))
    print("Klaar -> fonts/")


if __name__ == "__main__":
    main()
