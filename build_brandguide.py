# -*- coding: utf-8 -*-
"""
ment4l — Brand Guidelines (strak, professioneel)
Genereert: brand/ment4l-brand-guidelines.pdf

Pure huisstijl + de essentiële moderne UI/UX-regels. Echte merkfonts embedded.
Kleurmodel: wit/zand dominant · neutraal charcoal · blauw accent · koraal spaarzaam.
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, NextPageTemplate, HRFlowable,
)
from reportlab.lib.styles import ParagraphStyle

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(HERE, "brand", "fonts")
OUT = os.path.join(HERE, "brand", "ment4l-brand-guidelines.pdf")

# ---- fonts
def reg(n, f): pdfmetrics.registerFont(TTFont(n, os.path.join(FONTS, f)))
reg("Serif", "IBMPlexSerif-Regular.ttf"); reg("Serif-B", "IBMPlexSerif-Bold.ttf")
reg("Mono", "IBMPlexMono-Regular.ttf"); reg("Mono-B", "IBMPlexMono-Bold.ttf")
reg("Sans", "Inter-Regular.ttf"); reg("Sans-M", "Inter-Medium.ttf")
reg("Sans-SB", "Inter-SemiBold.ttf"); reg("Sans-B", "Inter-Bold.ttf")
pdfmetrics.registerFontFamily("Serif", normal="Serif", bold="Serif-B", italic="Serif", boldItalic="Serif-B")
pdfmetrics.registerFontFamily("Sans", normal="Sans", bold="Sans-B", italic="Sans", boldItalic="Sans-B")

# ---- palette
BRAND  = colors.HexColor("#1F66FF")
BRANDL = colors.HexColor("#4D85FF")
ACCENT = colors.HexColor("#EE634E")
DARK   = colors.HexColor("#1A1A1A")
DARK2  = colors.HexColor("#262626")
BG     = colors.HexColor("#FFFDFA")
BG2    = colors.HexColor("#FAF9F7")
CREAM  = colors.HexColor("#FFFDF5")
STONE  = colors.HexColor("#F2F0ED")
HAIR   = colors.HexColor("#E6E6E6")
INK    = colors.HexColor("#121212")
G700   = colors.HexColor("#4D4D4D")
G600   = colors.HexColor("#6C6E74")
G500   = colors.HexColor("#9C9C9C")
DO_TX  = colors.HexColor("#1F9D52")

PAGE_W, PAGE_H = A4
M = 20 * mm
CW = PAGE_W - 2 * M

def stl(name, **kw):
    kw.setdefault("fontName", "Sans"); kw.setdefault("fontSize", 9.5)
    kw.setdefault("leading", 15); kw.setdefault("textColor", G700)
    return ParagraphStyle(name, **kw)

S_KICK = stl("k", fontName="Mono-B", fontSize=8, textColor=BRAND, leading=11)
S_H1   = stl("h1", fontName="Serif-B", fontSize=22, textColor=DARK, leading=25)
S_SUB  = stl("sub", fontSize=10, leading=14.5, textColor=G700, spaceBefore=2)
S_H3   = stl("h3", fontName="Sans-SB", fontSize=10, textColor=DARK, leading=13.5, spaceBefore=10, spaceAfter=3)
S_BODY = stl("b", fontSize=9.5, leading=15, textColor=G700, spaceAfter=4)
S_LEAD = stl("lead", fontSize=11.5, leading=17, textColor=INK, spaceAfter=6)
S_LI   = stl("li", fontSize=9.3, leading=14, textColor=G700)
S_SPL  = stl("spl", fontSize=9, leading=13, textColor=INK, fontName="Sans-M")
S_SPV  = stl("spv", fontName="Mono", fontSize=8.5, leading=13, textColor=DARK)
S_CHIP = stl("chip", fontName="Sans-SB", fontSize=9, textColor=colors.white, leading=12)
S_CHIPD= stl("chipd", fontName="Sans-SB", fontSize=9, textColor=INK, leading=12)
S_CD   = stl("cd", fontName="Mono", fontSize=8, leading=12, textColor=INK)
S_ROLE = stl("role", fontSize=8.4, leading=11.5, textColor=G600)

# ---- page chrome
def cover(c, doc):
    c.saveState()
    c.setFillColor(DARK); c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(DARK2); c.setFont("Serif-B", 430); c.drawString(PAGE_W - 230, -60, "4")
    x = M; y = PAGE_H - 70 * mm
    c.setFont("Serif-B", 44); c.setFillColor(colors.white); c.drawString(x, y, "ment")
    wm = c.stringWidth("ment", "Serif-B", 44); c.setFillColor(ACCENT); c.drawString(x + wm, y, "4")
    w4 = c.stringWidth("4", "Serif-B", 44); c.setFillColor(colors.white); c.drawString(x + wm + w4, y, "l")
    c.setFillColor(BRANDL); c.setFont("Mono-B", 9.5); c.drawString(x, y + 24 * mm, "BRAND GUIDELINES")
    c.setFillColor(colors.white); c.setFont("Serif-B", 27)
    c.drawString(x, y - 24 * mm, "De huisstijl van ment4l")
    c.setFillColor(colors.HexColor("#BFBFBF")); c.setFont("Sans", 11.5)
    c.drawString(x, y - 24 * mm - 22, "Kleur · typografie · logo · UI — helder en consistent.")
    c.setStrokeColor(DARK2); c.setLineWidth(1); c.line(x, 26 * mm, PAGE_W - M, 26 * mm)
    c.setFont("Mono", 8); c.setFillColor(colors.HexColor("#8A8A8A"))
    c.drawString(x, 20 * mm, "VERSIE 1.0  ·  JUNI 2026  ·  BRON: MENT4L.NL")
    c.restoreState()

def chrome(c, doc):
    c.saveState()
    c.setFillColor(BG); c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFont("Mono", 7.5); c.setFillColor(G500)
    c.drawString(M, 11 * mm, "MENT4L — BRAND GUIDELINES")
    c.drawRightString(PAGE_W - M, 11 * mm, "%02d" % (doc.page - 1))
    c.restoreState()

# ---- builders
def section(num, kicker, title, sub=None):
    els = [Paragraph(f"{num}&nbsp;&nbsp;/&nbsp;&nbsp;{kicker}", S_KICK),
           Paragraph(title, S_H1),
           HRFlowable(width="100%", thickness=1.2, color=DARK, spaceBefore=5, spaceAfter=9, lineCap="round")]
    if sub:
        els.append(Paragraph(sub, S_SUB)); els.append(Spacer(1, 6))
    return els

def body(t): return Paragraph(t, S_BODY)
def h3(t): return Paragraph(t, S_H3)

def bullets(items):
    rows = [[Paragraph("•", stl("bd", fontName="Sans-B", textColor=BRAND, fontSize=9)), Paragraph(t, S_LI)] for t in items]
    tb = Table(rows, colWidths=[7, CW - 7])
    tb.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 1.5), ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5),
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0)]))
    return tb

def spec(rows):
    data = [[Paragraph(l, S_SPL), Paragraph(v, S_SPV)] for l, v in rows]
    t = Table(data, colWidths=[CW * 0.34, CW * 0.66])
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -2), 0.5, HAIR),
        ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 8)]))
    return t

def dodont(do, dont):
    do_c = [Paragraph("Wel", stl("dh", fontName="Sans-B", fontSize=9, textColor=DO_TX, leading=12, spaceAfter=5))]
    do_c += [Paragraph("+&nbsp;&nbsp;" + d, stl("d", fontSize=8.6, leading=12.5, textColor=INK, spaceAfter=3)) for d in do]
    no_c = [Paragraph("Niet", stl("nh", fontName="Sans-B", fontSize=9, textColor=ACCENT, leading=12, spaceAfter=5))]
    no_c += [Paragraph("–&nbsp;&nbsp;" + d, stl("n", fontSize=8.6, leading=12.5, textColor=INK, spaceAfter=3)) for d in dont]
    t = Table([[do_c, no_c]], colWidths=[CW / 2 - 6, CW / 2 - 6])
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (0, 0), 0), ("LEFTPADDING", (1, 0), (1, 0), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("LINEBEFORE", (1, 0), (1, 0), 0.6, HAIR),
        ("TOPPADDING", (0, 0), (-1, -1), 0)]))
    return t

def chips(items):
    cells = [Paragraph(t, stl("cp", fontName="Mono-B", fontSize=8.5, textColor=DARK, leading=11)) for t in items]
    t = Table([cells], colWidths=[CW / len(items)] * len(items))
    sty = [("TOPPADDING", (0, 0), (-1, -1), 8), ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
           ("LEFTPADDING", (0, 0), (-1, -1), 10), ("RIGHTPADDING", (0, 0), (-1, -1), 10),
           ("BACKGROUND", (0, 0), (-1, -1), STONE), ("BOX", (0, 0), (-1, -1), 3, BG),
           ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("ROUNDEDCORNERS", [6, 6, 6, 6])]
    t.setStyle(TableStyle(sty))
    return t

def swatches(rows):
    data = []
    for (name, hx, rgb, cmyk, role, light) in rows:
        data.append([Paragraph(name, S_CHIP if light else S_CHIPD), Paragraph(hx, S_CD),
                     Paragraph(rgb, S_CD), Paragraph(cmyk, S_CD), Paragraph(role, S_ROLE)])
    t = Table(data, colWidths=[CW * 0.21, CW * 0.13, CW * 0.16, CW * 0.20, CW * 0.30])
    sty = [("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
           ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
           ("LEFTPADDING", (0, 0), (0, 0), 9), ("LEFTPADDING", (1, 0), (-1, -1), 0),
           ("RIGHTPADDING", (0, 0), (-1, -1), 6), ("LINEBELOW", (0, 0), (-1, -1), 0.5, HAIR)]
    for i, (name, hx, rgb, cmyk, role, light) in enumerate(rows):
        sty.append(("BACKGROUND", (0, i), (0, i), colors.HexColor(hx)))
    t.setStyle(TableStyle(sty))
    return t

def ratiobar():
    row = [Paragraph("70% &nbsp;wit / zand", stl("r1", fontName="Mono-B", fontSize=8, textColor=INK, leading=11)),
           Paragraph("20% &nbsp;charcoal", stl("r2", fontName="Mono-B", fontSize=8, textColor=colors.white, leading=11)),
           Paragraph("7%", stl("r3", fontName="Mono-B", fontSize=7.5, textColor=colors.white, leading=10)),
           Paragraph("", stl("r4"))]
    t = Table([row], colWidths=[CW * 0.70, CW * 0.20, CW * 0.07, CW * 0.03], rowHeights=[40])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), BG), ("BOX", (0, 0), (0, 0), 0.6, HAIR),
        ("BACKGROUND", (1, 0), (1, 0), DARK), ("BACKGROUND", (2, 0), (2, 0), BRAND),
        ("BACKGROUND", (3, 0), (3, 0), ACCENT),
        ("VALIGN", (0, 0), (-1, -1), "BOTTOM"), ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7)]))
    return t

# ---------------------------------------------------------------- story
S = []
A = S.append
A(Spacer(1, 2)); A(PageBreak())   # page 1 = cover

# 01 MERK
for f in section("01", "MERK", "Het merk",
                 "ment4l is een jeugdcoaching- en groeimerk. De toon: warm en empowerend richting jongeren, "
                 "professioneel en betrouwbaar richting scholen en ouders."):
    A(f)
A(h3("Persoonlijkheid"))
A(chips(["WARM", "BETROUWBAAR", "JONG", "EMPOWEREND"]))
A(Spacer(1, 6))
A(h3("De ‘4’ en MENT4LITY"))
A(body("De <b>‘4’</b> vervangt consequent de ‘a’ in <b>ment4l</b> en <b>MENT4LITY</b> — het herkenbaarste merksignaal. "
       "MENT4LITY (de groei-mindset) altijd in hoofdletters; de merknaam in lopende tekst altijd ‘ment4l’."))
A(h3("Taglines — kies er één per uiting"))
A(spec([
    ("A · It's all about MENT4LITY", "Jongeren — speels, empowerend (posters, social, app)."),
    ("B · Jouw gids voor persoonlijke groei", "Uitleg — wat ment4l doet (website-hero, intro)."),
    ("C · Wij staan voor groei &amp; vooruitgang", "Zakelijk — scholen, gemeente (offerte, presentatie)."),
]))

# 02 LOGO
A(PageBreak())
for f in section("02", "LOGO", "Logo & wordmark",
                 "Het officiële vector-logo (SVG/EPS) wordt door ment4l aangeleverd en is leidend. Onderstaande regels gelden daarop."):
    A(f)
A(Spacer(1, 2))
wm = Table([[Paragraph("ment<font color='#EE634E'>4</font>l", stl("wm", fontName="Serif-B", fontSize=46, textColor=INK, leading=50))]], colWidths=[CW])
wm.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), BG2), ("BOX", (0, 0), (-1, -1), 0.6, HAIR),
    ("TOPPADDING", (0, 0), (-1, -1), 22), ("BOTTOMPADDING", (0, 0), (-1, -1), 22),
    ("LEFTPADDING", (0, 0), (-1, -1), 24), ("ROUNDEDCORNERS", [10, 10, 10, 10])]))
A(wm); A(Spacer(1, 10))
A(h3("Kleurvarianten"))
A(bullets([
    "Op wit/zand: wordmark in inkt #121212; de ‘4’ in koraal #EE634E of blauw #1F66FF.",
    "Op donker (charcoal): wordmark én ‘4’ in warm wit #FFFDFA — zoals op de site.",
    "Eénkleurig waar nodig: volledig charcoal of volledig warm wit.",
]))
A(h3("Beschermzone &amp; minimale maat"))
A(spec([
    ("Clear space", "Rondom min. de hoogte van de ‘4’ vrijhouden."),
    ("Minimaal — digitaal", "Wordmark 120 px · icoon-only (‘4’) 24 px"),
    ("Minimaal — druk", "Wordmark 30 mm · icoon-only (‘4’) 6 mm"),
]))
A(Spacer(1, 8))
A(dodont(
    ["‘4’ altijd herkenbaar houden.", "Genoeg clear space, rustige ondergrond.", "Alleen de officiële kleurvarianten."],
    ["Vervormen, roteren of herkleuren.", "De ‘4’ als gewone ‘a’ of los cijfer.", "Op een druk beeld of laag contrast."]))

# 03 KLEUR
A(PageBreak())
for f in section("03", "KLEUR", "Kleur",
                 "Wit/zand dominant, neutraal charcoal voor donker, blauw als accent — koraal heel spaarzaam. CMYK = richtwaarde (FOGRA39)."):
    A(f)
A(h3("Accent — blauw primair, koraal spaarzaam"))
A(swatches([
    ("Blauw", "#1F66FF", "31, 102, 255", "C85 M60 Y0 K0", "Primaire actie, links, nadruk", True),
    ("Licht blauw", "#4D85FF", "77, 133, 255", "C70 M48 Y0 K0", "Hover, highlights", True),
    ("Koraal", "#EE634E", "238, 99, 78", "C0 M70 Y65 K0", "Secundair accent — zeer spaarzaam", True),
]))
A(h3("Licht &amp; zand — de basis (dominant)"))
A(swatches([
    ("Warm wit", "#FFFDFA", "255, 253, 250", "C0 M1 Y3 K0", "Canvas / hoofdachtergrond", False),
    ("Zand / steen", "#F2F0ED", "242, 240, 237", "C2 M2 Y4 K3", "Secties, kaarten", False),
    ("Hairline", "#E6E6E6", "230, 230, 230", "C0 M0 Y0 K10", "Randen & lijnen", False),
]))
A(h3("Donker &amp; inkt — neutraal charcoal (geen navy)"))
A(swatches([
    ("Charcoal", "#1A1A1A", "26, 26, 26", "C0 M0 Y0 K90", "Donkere secties, nav, footer", True),
    ("Inkt", "#121212", "18, 18, 18", "K100", "Tekst & diepste dark", True),
    ("Grijs 700", "#4D4D4D", "77, 77, 77", "C0 M0 Y0 K70", "Secundaire tekst", True),
    ("Grijs 500", "#9C9C9C", "156, 156, 156", "C0 M0 Y0 K39", "Tertiair / placeholder", True),
]))
A(Spacer(1, 10))
A(h3("Balans · 70 / 20 / 10"))
A(ratiobar())
A(Spacer(1, 4))
A(body("70% wit/zand · 20% charcoal (donker + tekst) · 10% accent (±7% blauw, ±3% koraal). "
       "De donkere laag is <b>neutraal charcoal</b>, geen navyblauw."))

# 04 TYPOGRAFIE
A(PageBreak())
for f in section("04", "TYPOGRAFIE", "Typografie",
                 "Drie rollen: een warme serif voor koppen, mono voor labels, Inter voor tekst."):
    A(f)
A(spec([
    ("IBM Plex Serif — koppen", "400 &amp; 700 (incl. italic). Warmte &amp; vertrouwen."),
    ("IBM Plex Mono — labels", "400 &amp; 700. ALTIJD UPPERCASE met letter-spacing."),
    ("Inter — body / UI", "400 / 500 / 600 / 700 / 900. Helder en neutraal."),
]))
A(h3("Type-schaal"))
def tsr(a, b, cc, d):
    return [Paragraph(a, S_CD), Paragraph(b, S_ROLE), Paragraph(cc, S_CD), Paragraph(d, S_CD)]
sc = [[Paragraph(x, stl("th", fontName="Mono-B", fontSize=7.5, textColor=G600, leading=10)) for x in ["Niveau", "Font", "Web", "Regelh."]],
      tsr("Display", "Plex Serif 700", "64px", "1.05"), tsr("H1", "Plex Serif 700", "44px", "1.10"),
      tsr("H2", "Plex Serif 700", "32px", "1.15"), tsr("H3", "Plex Serif 400", "24px", "1.20"),
      tsr("Body-L", "Inter 400", "20px", "1.60"), tsr("Body", "Inter 400", "16px", "1.65"),
      tsr("Small", "Inter 400", "14px", "1.50"), tsr("Label", "Plex Mono 700", "13px", "1.0")]
t = Table(sc, colWidths=[CW * 0.20, CW * 0.34, CW * 0.20, CW * 0.26])
t.setStyle(TableStyle([("LINEBELOW", (0, 0), (-1, -1), 0.5, HAIR), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ("LEFTPADDING", (0, 0), (-1, -1), 0)]))
A(t); A(Spacer(1, 8))
A(dodont(
    ["Serif kop, Inter body, mono label.", "Eén serif-blikvanger per uiting.", "Body op web minimaal 16px."],
    ["Rollen omdraaien.", "Meer dan drie lettertypes.", "Mono voor lange lopende tekst."]))

# 05 LAYOUT
A(PageBreak())
for f in section("05", "LAYOUT", "Layout & ruimte",
                 "Een 8-punts ritme, ronde hoeken (pill is de signatuur) en veel lucht."):
    A(f)
A(spec([
    ("Spacing (8pt)", "4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96"),
    ("Hoekradius", "Pill 999px (knop/chip/nav) · kaart 16–24px · input 16px"),
    ("Grid (web)", "12 koloms · max 1200px · sectiepadding 96–120px"),
    ("Schaduw", "Zacht & neutraal — rgba(18,18,18,.06–.10)"),
    ("Witruimte", "Min. één rustige zone per uiting: canvas + 1 element"),
]))
A(Spacer(1, 6))
A(body("<b>Strak = rust.</b> Liever weinig elementen met veel lucht dan een vol vlak. Lijn alles uit op het 8pt-grid "
       "en houd de 70/20/10-balans aan."))

# 06 UI & COMPONENTEN
A(PageBreak())
for f in section("06", "UI", "UI & componenten",
                 "Moderne, herkenbare bouwstenen — consistent op web en app."):
    A(f)
A(spec([
    ("Knop · primair", "Blauw #1F66FF vlak, label #FFFDFA, Inter 600, pill 999px."),
    ("Knop · secundair", "Charcoal #1A1A1A vlak óf ghost (1.5px lijn #1F66FF)."),
    ("Knop · accent", "Koraal #EE634E — max. 1 per scherm, belangrijkste actie."),
    ("Kaart", "Achtergrond #FFFDFA / zand #F2F0ED (nooit puur wit), radius 16–24px, hairline + zachte schaduw."),
    ("Eyebrow / label", "IBM Plex Mono UPPERCASE, kleur inkt/charcoal."),
    ("Navigatie", "Zwevende charcoal pill (#1A1A1A, radius 999px); CTA = blauwe pill."),
    ("Invoerveld", "Hoogte 48px, radius 16px, rand 1.5px #E6E6E6; focus = rand #1F66FF."),
]))
A(Spacer(1, 6))
A(dodont(
    ["Knoppen altijd pill.", "Eén duidelijke primaire actie per scherm.", "Kaarten op warm wit / zand."],
    ["Scherpe hoeken op knoppen.", "Koraal voor grote vlakken of tekst.", "Puur wit #FFFFFF als groot vlak."]))

# 07 INTERACTIE & TOEGANKELIJKHEID
A(PageBreak())
for f in section("07", "UX", "Interactie & toegankelijkheid",
                 "Moderne UX-basis: leesbaar, bedienbaar, rustig in beweging."):
    A(f)
A(h3("Contrast (WCAG)"))
A(bullets([
    "Tekst altijd inkt #121212 of charcoal op wit (uitstekend contrast).",
    "Blauw of koraal met witte tekst alleen ≥18px bold — nooit voor kleine tekst/body.",
    "Kleur nooit als enige betekenis: combineer met icoon of tekst.",
]))
A(h3("Bediening"))
A(spec([
    ("Touch-target", "Minimaal 48 × 48 px (web én app)."),
    ("Body-tekst", "Minimaal 16px op web."),
    ("Focus-visible", "Overal 2px #1F66FF (op donker #FFFDFA), offset 2px."),
]))
A(h3("Beweging"))
A(bullets([
    "Subtiel: hover-lift knop −1px / kaart −4px; transities 120–320ms, ease-out.",
    "Respecteer @media (prefers-reduced-motion: reduce) → geen transform/animatie.",
]))

# 08 TONE OF VOICE
A(PageBreak())
for f in section("08", "TAAL", "Tone of voice",
                 "Warm, helder en empowerend. Jij-vorm naar jongeren, vertrouwen naar scholen."):
    A(f)
A(spec([
    ("Aanspreekvorm", "Jongeren ‘jij’ · scholen/ouders ‘jullie/u’."),
    ("Stijl", "Activerend, concreet, kort. Geen jargon."),
    ("Houding", "Hoopvol &amp; veilig — fouten mogen, groei staat centraal."),
    ("Schrijfwijze", "‘ment4l’ · MENT4LITY · programma’s voluit."),
]))
A(Spacer(1, 8))
A(dodont(
    ["“Wat wil jij maken? In 8 lessen bouw je je eigen track.”",
     "“Samen geven we leerlingen een podium.”",
     "“Fouten horen erbij — hier leer je doorzetten.”"],
    ["“Onze interventie versterkt de weerbaarheid van de doelgroep.”",
     "“Voor kwetsbare kinderen met een achterstand.”",
     "Jargon: stakeholders, synergie, ketenpartner."]))
A(Spacer(1, 14))
A(HRFlowable(width="100%", thickness=0.6, color=HAIR, spaceAfter=8))
A(Paragraph("Developers: de exacte design tokens staan in brand/tokens.css en brand/tokens.json. "
            "Een live overzicht: brand/design-board.html.", stl("ft", fontSize=8.4, leading=12, textColor=G600)))
A(Paragraph("ment4l · It's all about MENT4LITY", stl("end", fontName="Mono", fontSize=8, textColor=G500, leading=12, spaceBefore=4)))

# ---- build
doc = BaseDocTemplate(OUT, pagesize=A4, leftMargin=M, rightMargin=M, topMargin=20 * mm, bottomMargin=18 * mm,
                      title="ment4l — Brand Guidelines", author="ment4l")
frame = Frame(M, 18 * mm, CW, PAGE_H - 20 * mm - 18 * mm, id="m", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
doc.addPageTemplates([
    PageTemplate(id="cover", frames=[frame], onPage=cover),
    PageTemplate(id="content", frames=[frame], onPage=chrome),
])
S.insert(0, NextPageTemplate("content"))
doc.build(S)
print("OK ->", OUT, "| pages:", doc.page)
