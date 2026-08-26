# -*- coding: utf-8 -*-
"""Bouwt het ment4l-programmaframework als nette, merkconsistente PDF."""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    PageBreak, FrameBreak, NextPageTemplate, KeepTogether
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# ---------------------------------------------------------------- huisstijl-fonts
# Officiële merk-fonts (zie brand/tokens.css): IBM Plex Serif (koppen), IBM Plex
# Mono (eyebrows/labels/wordmark), Inter (body). De TTF's staan in fonts/.
# Ontbreekt een bestand, dan valt die familie netjes terug op een base-14 font
# zodat het script altijd een PDF blijft genereren.
FONT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")

# (logische naam, regular-bestand, bold-bestand, fallback-regular, fallback-bold)
_FONT_SPECS = [
    ("IBMPlexSerif", "IBMPlexSerif-Regular.ttf", "IBMPlexSerif-Bold.ttf", "Times-Roman", "Times-Bold"),
    ("IBMPlexMono",  "IBMPlexMono-Regular.ttf",  "IBMPlexMono-Bold.ttf",  "Courier",     "Courier-Bold"),
    ("Inter",        "Inter-Regular.ttf",        "Inter-Bold.ttf",        "Helvetica",   "Helvetica-Bold"),
]

def _register_brand_fonts():
    resolved, missing = {}, []
    for name, reg, bold, fb_reg, fb_bold in _FONT_SPECS:
        reg_path, bold_path = os.path.join(FONT_DIR, reg), os.path.join(FONT_DIR, bold)
        if os.path.exists(reg_path) and os.path.exists(bold_path):
            pdfmetrics.registerFont(TTFont(name, reg_path))
            pdfmetrics.registerFont(TTFont(name + "-Bold", bold_path))
            pdfmetrics.registerFontFamily(name, normal=name, bold=name + "-Bold")
            resolved[name] = (name, name + "-Bold")
        else:
            missing += [p for p in (reg_path, bold_path) if not os.path.exists(p)]
            resolved[name] = (fb_reg, fb_bold)
    if missing:
        print("LET OP: huisstijl-fonts ontbreken — terugval op standaardfonts.")
        print("Plaats deze TTF-bestanden in de map 'fonts/' (Google Fonts: IBM Plex Serif, IBM Plex Mono, Inter):")
        for m in missing:
            print("   -", os.path.basename(m))
    return resolved

_F = _register_brand_fonts()
HEAD, HEAD_B = _F["IBMPlexSerif"]   # koppen / display
MONO, MONO_B = _F["IBMPlexMono"]    # eyebrows / labels / wordmark
BODY, BODY_B = _F["Inter"]          # body / UI

# ---- huisstijl-tokens (officieel ment4l: blauw · koraal · navy) ----
BLUE    = colors.HexColor("#1F66FF")   # primair blauw (koppen, tabelkop)
CORAL   = colors.HexColor("#EE634E")   # koraal accent (wordmark-4, kicker, quote)
NAVY    = colors.HexColor("#28293E")   # donker navy (cover, eindshowcase)
INK     = colors.HexColor("#121212")
GREY    = colors.HexColor("#4D4D4D")
LIGHT   = colors.HexColor("#EAF1FF")   # licht blauw vlak
LIGHT2  = colors.HexColor("#FBFAF7")   # warm-wit
DARKBG  = colors.HexColor("#28293E")   # cover-achtergrond (navy)

PAGE_W, PAGE_H = A4
M = 20 * mm

# ---------------------------------------------------------------- styles
ss = getSampleStyleSheet()
def S(name, **kw):
    kw.setdefault("fontName", BODY)
    kw.setdefault("bulletFontName", BODY)
    kw.setdefault("textColor", INK)
    kw.setdefault("fontSize", 10.5)
    kw.setdefault("leading", 15.5)
    return ParagraphStyle(name, parent=ss["Normal"], **kw)

st_body   = S("body", spaceAfter=8)
st_lead   = S("lead", fontSize=12, leading=18, textColor=GREY, spaceAfter=10)
st_h1      = S("h1", fontName=HEAD_B, fontSize=21, leading=25,
               textColor=INK, spaceBefore=6, spaceAfter=10)
st_h2      = S("h2", fontName=HEAD_B, fontSize=15, leading=19,
               textColor=BLUE, spaceBefore=16, spaceAfter=7)
st_kicker  = S("kicker", fontName=MONO_B, fontSize=9, leading=12,
               textColor=CORAL, spaceAfter=2)
st_quote   = S("quote", fontSize=11, leading=16, textColor=INK,
               leftIndent=10, borderPadding=(0,0,0,0), spaceAfter=10,
               backColor=LIGHT, borderColor=CORAL)
st_cell    = S("cell", fontSize=9, leading=12.5)
st_cellb   = S("cellb", fontName=BODY_B, fontSize=9, leading=12.5)
st_cellw   = S("cellw", fontName=BODY_B, fontSize=9, leading=12.5, textColor=colors.white)
st_small   = S("small", fontSize=8.5, leading=12, textColor=GREY)
# cover
st_cv_kick = S("cvk", fontName=MONO_B, fontSize=11, leading=14,
               textColor=CORAL, alignment=TA_LEFT)
st_cv_title= S("cvt", fontName=HEAD_B, fontSize=32, leading=36,
               textColor=colors.white, alignment=TA_LEFT, spaceBefore=10)
st_cv_sub  = S("cvs", fontSize=13, leading=19, textColor=colors.HexColor("#C9C4E6"),
               alignment=TA_LEFT, spaceBefore=12)

def wordmark(size=18, light=False):
    base = colors.white if light else INK
    return (f'<font name="{MONO_B}" size="{size}" color="#{base.hexval()[2:]}">MENT'
            f'</font><font name="{MONO_B}" size="{size}" color="#{CORAL.hexval()[2:]}">4</font>'
            f'<font name="{MONO_B}" size="{size}" color="#{base.hexval()[2:]}">L</font>')

# ---------------------------------------------------------------- page furniture
def on_cover(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(DARKBG); canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    # accent blobs
    canvas.setFillColor(BLUE); canvas.setFillAlpha(0.30)
    canvas.circle(PAGE_W*0.12, PAGE_H*0.93, 150, fill=1, stroke=0)
    canvas.setFillColor(CORAL); canvas.setFillAlpha(0.22)
    canvas.circle(PAGE_W*0.95, PAGE_H*0.78, 120, fill=1, stroke=0)
    canvas.setFillColor(CORAL); canvas.setFillAlpha(0.12)
    canvas.circle(PAGE_W*0.80, PAGE_H*0.10, 160, fill=1, stroke=0)
    canvas.setFillAlpha(1)
    canvas.restoreState()

def on_content(canvas, doc):
    canvas.saveState()
    # top rule
    canvas.setStrokeColor(LIGHT); canvas.setLineWidth(1)
    canvas.line(M, PAGE_H-15*mm, PAGE_W-M, PAGE_H-15*mm)
    canvas.setFont(MONO_B, 8); canvas.setFillColor(GREY)
    canvas.drawString(M, PAGE_H-13*mm, "MENT4L  ·  Programmaframework")
    canvas.drawRightString(PAGE_W-M, PAGE_H-13*mm, "School & Omgeving · Gelijke Kansen Alliantie")
    # footer
    canvas.setStrokeColor(LIGHT); canvas.line(M, 15*mm, PAGE_W-M, 15*mm)
    canvas.setFont(MONO, 8); canvas.setFillColor(GREY)
    canvas.drawString(M, 11*mm, "It's all about MENT4LITY")
    canvas.drawRightString(PAGE_W-M, 11*mm, "Pagina %d" % doc.page)
    canvas.restoreState()

# ---------------------------------------------------------------- tables
def lesson_table(rows, header):
    data = [[Paragraph(h, st_cellw) for h in header]]
    for r in rows:
        data.append([Paragraph(str(c), st_cellb if i == 0 else st_cell) for i, c in enumerate(r)])
    t = Table(data, colWidths=widths_for(len(header)), repeatRows=1)
    style = [
        ("BACKGROUND", (0,0), (-1,0), BLUE),
        ("TOPPADDING", (0,0), (-1,-1), 6),
        ("BOTTOMPADDING", (0,0), (-1,-1), 6),
        ("LEFTPADDING", (0,0), (-1,-1), 8),
        ("RIGHTPADDING", (0,0), (-1,-1), 8),
        ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("LINEBELOW", (0,0), (-1,-1), 0.5, LIGHT),
        ("ROWBACKGROUNDS", (0,1), (-1,-1), [colors.white, LIGHT2]),
    ]
    t.setStyle(TableStyle(style))
    return t

CONTENT_W = PAGE_W - 2*M
def widths_for(n):
    if n == 5:  # Les | Fase | Coaching | Vehikel | Mijlpaal
        return [CONTENT_W*x for x in (0.06, 0.17, 0.27, 0.32, 0.18)]
    if n == 4:
        return [CONTENT_W*x for x in (0.06, 0.20, 0.50, 0.24)]
    if n == 2:
        return [CONTENT_W*0.30, CONTENT_W*0.70]
    return [CONTENT_W/n]*n

# ---------------------------------------------------------------- data
BACKBONE = [
    ("1","Veilige basis","Veiligheid & erbij horen","Programma & eindshowcase onthuld; 'wat wil jij laten zien?'","Groeidoel gekozen"),
    ("2","Durven beginnen","Fouten mogen maken (fouten = data)","Eerste kleine, laagdrempelige opdracht — bewust mogen falen","Eerste poging gemaakt"),
    ("3","Ontdekken","Nieuwsgierigheid boven perfectie","Technieken/basics van de skill verkennen","Eigen richting gekozen"),
    ("4","Bouwen","Doorzetten bij tegenslag","Aan eigen eindproduct werken","Versie 1 af"),
    ("5","Bijschaven","Feedback is een cadeau","Itereren op het eigen werk","Versie 2 + feedback"),
    ("6","Meesterles","Rolmodellen & 'ik kan dit ook'","Gastexpert: inspiratie + masterclass","Tip expert verwerkt"),
    ("7","Generale","Spanning hoort erbij (zenuwen)","Afmaken + presentatie oefenen","Eindproduct klaar"),
    ("8","Podiummoment","Trots & erkenning","Eindshowcase voor publiek","Showcase + certificaat"),
]
RITUEEL = [
    ("Check-in (5 min)","Hoe sta je erbij? (duimen / stemmingsmeter)"),
    ("ment4l-moment (10 min)","Coachingsthema van die les"),
    ("Doen (40–60 min)","Werken aan de skill / het eindproduct"),
    ("Check-out (10 min)","Groeimeter: wat lukte, waar trots op, volgende keer?"),
]
THEMES = [
    ("Wereldkeuken Bakken","Koken & bakken met gerechten uit de hele wereld.",
     "Pop-up proeverij — kinderen presenteren hun signatuurgerecht en laten publiek proeven.",
     "Trots op je eigen (culturele) achtergrond.",
     ["Kennismaken via eten: 'welk gerecht hoort bij jou?'.",
      "Eerste bak-opdracht met bewuste 'oeps-momenten'.",
      "Smaken van de wereld proeven en verkennen.",
      "Eerste versie van het eigen signatuurgerecht.",
      "Proeverij in tweetallen: feedback verwerken.",
      "Gastkok/bakker: verhaal + masterclass presentatie.",
      "Definitief gerecht + presentatie oefenen.",
      "Pop-up proeverij voor publiek."]),
    ("Rap & Muziektalent","Van woord en ritme naar een echte track.",
     "Showcase-concert — elk kind brengt de eigen track op een echt podium.",
     "Stem geven aan je eigen verhaal; podiumvrees.",
     ["Muziek waar jij sterk van wordt; samen een beat.",
      "Eerste regels op een beat / freestyle in veilige kring.",
      "Experimenteren met beats, rijm en stijlen.",
      "Eerste couplet/tekst schrijven.",
      "Teksten delen; flow en rijm aanscherpen.",
      "Gastrapper/producer: verhaal + masterclass flow.",
      "Track opnemen + optreden oefenen.",
      "Showcase-concert: live optreden."]),
    ("AI-applicatie Bouwen","Van idee naar een werkende AI-app.",
     "Demo-day — elk kind toont de werkende app en pitcht welk probleem het oplost.",
     "Probleemoplossend denken; fouten/debuggen = normaal.",
     ["Wat zou jij willen dat een app oplost? App uitproberen.",
      "Mini-opdracht: iets kleins laten werken, mét bugs.",
      "Mogelijkheden van de tool verkennen.",
      "Eerste werkende versie (prototype) bouwen.",
      "Apps onderling testen en verbeteren.",
      "Gast-developer: verhaal + masterclass idee & pitch.",
      "App afmaken + pitch/demo oefenen.",
      "Demo-day: pitchen en demonstreren."]),
]

# ---------------------------------------------------------------- build story
story = []
# COVER
story.append(NextPageTemplate("content"))
story.append(Spacer(1, 60*mm))
story.append(Paragraph(wordmark(20, light=True), S("wm", alignment=TA_LEFT)))
story.append(Paragraph("PROGRAMMAFRAMEWORK", st_cv_kick))
story.append(Paragraph("Naschoolse jeugdcoaching<br/>op scholen", st_cv_title))
story.append(Paragraph("Eén vaste ruggengraat van 8 lessen, waarop we per blok één nieuw thema "
                       "toepassen — altijd toewerkend naar één podiummoment. "
                       "Werken aan zelfvertrouwen en faalangst, in het kader van de subsidie "
                       "School &amp; Omgeving — Gelijke Kansen Alliantie.", st_cv_sub))
story.append(Spacer(1, 18*mm))
story.append(Paragraph('<font color="#EE634E">It\'s all about MENT4LITY</font> '
                       '<font color="#C9C4E6">· wij staan voor groei &amp; vooruitgang</font>',
                       S("tg", fontSize=11, leading=15)))
story.append(PageBreak())

# 1. WAAROM
story.append(Paragraph("De ment4l-aanpak", st_kicker))
story.append(Paragraph("Waarom dit framework", st_h1))
story.append(Paragraph(
    "De activiteit — bakken, rappen, een AI-app bouwen — is de aantrekkelijke buitenkant. "
    "De échte opbrengst is coaching: kinderen bouwen zelfvertrouwen op en leren omgaan met "
    "faalangst, en zo dragen we bij aan gelijke kansen.", st_lead))
story.append(Paragraph(
    "<b>Het kernidee:</b> er is één vaste ruggengraat (de 8-lessenboog + coaching + ritueel) "
    "waar we per blok één nieuw thema op toepassen. Het thema wisselt (bakken, rap, AI, …), "
    "de ruggengraat blijft gelijk. Zo bouwen we eindeloos verder zonder de aanpak opnieuw te "
    "bedenken.", st_quote))

# 2. VEHIKEL & MOTOR
story.append(Paragraph("Kernprincipe: het vehikel en de motor", st_h2))
vm = Table([
    [Paragraph("HET VEHIKEL", st_cellw), Paragraph("DE MOTOR", st_cellw)],
    [Paragraph("<b>De leuke skill.</b> Bakken, rappen, bouwen — de hook waarmee we kinderen "
               "binnenhalen en motiveren. Wat het kind ziet.", st_cell),
     Paragraph("<b>De groei.</b> Zelfvertrouwen, faalangst hanteren, trots ervaren. Waar de "
               "jeugdcoach op stuurt — élke les.", st_cell)],
], colWidths=[CONTENT_W/2]*2)
vm.setStyle(TableStyle([
    ("BACKGROUND",(0,0),(0,0),NAVY), ("BACKGROUND",(1,0),(1,0),BLUE),
    ("TOPPADDING",(0,0),(-1,-1),8), ("BOTTOMPADDING",(0,0),(-1,-1),8),
    ("LEFTPADDING",(0,0),(-1,-1),10), ("RIGHTPADDING",(0,0),(-1,-1),10),
    ("VALIGN",(0,0),(-1,-1),"TOP"),
    ("BACKGROUND",(0,1),(0,1),LIGHT2), ("BACKGROUND",(1,1),(1,1),LIGHT),
    ("BOX",(0,0),(-1,-1),0.5,colors.HexColor("#ECE7DF")),
]))
story.append(vm)
story.append(Spacer(1,6))
story.append(Paragraph("De skill is het middel, de groei is het doel. De vakdocent/expert levert "
                       "de skill; de jeugdcoach bewaakt de motor.", st_small))

# 3. RUGGENGRAAT
story.append(Paragraph("De vaste ruggengraat: 8 lessen, één podiummoment", st_h2))
story.append(Paragraph("Alle thema's volgen exact deze boog. Er wordt altijd ergens naartoe "
                       "gewerkt: de eindshowcase.", st_body))
story.append(lesson_table(BACKBONE, ["#","Fase","Coachingsfocus (motor)","Wat er gebeurt (vehikel)","Mijlpaal"]))

# 4. RITUEEL
story.append(Paragraph("Het vaste lesritueel (elke les, ~60–90 min)", st_h2))
story.append(lesson_table(RITUEEL, ["Onderdeel","Wat gebeurt er"]))
story.append(Spacer(1,4))
story.append(Paragraph("De <b>groeimeter</b> is een simpele schaal die elk kind bij de check-out "
                       "invult op het persoonlijke groeidoel. In les 8 zie je de hele lijn: "
                       "'toen vs. nu'.", st_small))

# 5. EXPERTLES
story.append(Paragraph("De expertles (les 6) — 'De Meesterles'", st_h2))
story.append(Paragraph("Vast format zodat elke gastexpert plug-and-play inzetbaar is. Het draait "
                       "om <b>identificatie</b>: 'iemand die ook ergens begon en ook faalde, is "
                       "hierin geslaagd — dan kan ik dat ook.' Kies een rolmodel dat herkenbaar "
                       "is voor de doelgroep, niet per se de grootste naam.", st_body))
story.append(lesson_table([
    ("1","Check-in & ment4l-moment: thema 'rolmodellen / ik kan dit ook'."),
    ("2","Verhaal van de expert — inclusief eigen twijfels en mislukkingen (verplicht)."),
    ("3","Interactieve mini-masterclass: samen doen, geen lezing."),
    ("4","Q&A."),
    ("5","Elk kind formuleert één concrete tip om in les 7 te verwerken."),
], ["#","Onderdeel van de meesterles"]))

# 6. PO/VO
story.append(Paragraph("Schaalbaar: PO en VO", st_h2))
story.append(lesson_table([
    ("PO (groep 6–8)","Speels & veilig, kortere werkblokken, meer begeleiding; showcase = feestelijk."),
    ("VO (onderbouw)","Meer eigenaarschap, identiteit & peer-druk, faalangst rond cijfers/social media; showcase = 'echt podium'."),
], ["Doelgroep","Toon & aanpak"]))

story.append(PageBreak())

# 7. THEMES
story.append(Paragraph("De thema's op de ruggengraat", st_kicker))
story.append(Paragraph("Onze eerste drie thema's", st_h1))
story.append(Paragraph("Elk thema vult dezelfde 8 lessen in met een eigen skill en eindshowcase. "
                       "Een nieuw thema toevoegen = alleen deze 'buitenkant' invullen.", st_lead))

theme_colors = [colors.HexColor("#EE634E"), colors.HexColor("#1F66FF"), NAVY]
for (title, pitch, showcase, haak, lessons), acc in zip(THEMES, theme_colors):
    block = []
    bar = Table([[Paragraph(f'<font color="white"><b>{title}</b></font>', st_cell)]],
                colWidths=[CONTENT_W])
    bar.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),acc),
                             ("TOPPADDING",(0,0),(-1,-1),7),("BOTTOMPADDING",(0,0),(-1,-1),7),
                             ("LEFTPADDING",(0,0),(-1,-1),10)]))
    block.append(bar)
    block.append(Spacer(1,4))
    block.append(Paragraph(pitch, st_body))
    block.append(Paragraph(f"<b>Eindshowcase:</b> {showcase}", st_small))
    block.append(Paragraph(f"<b>Coaching-haak:</b> {haak}", st_small))
    block.append(Spacer(1,5))
    rows = [(str(i+1), BACKBONE[i][1], lessons[i]) for i in range(8)]
    block.append(lesson_table(rows, ["#","Fase","Wat het kind doet (dit thema)"]))
    block.append(Spacer(1,12))
    story.append(KeepTogether(block) if False else Spacer(1,0))
    for el in block:
        story.append(el)

# 8. NIEUW THEMA / DATAMODEL
story.append(Paragraph("Een nieuw thema toevoegen", st_h2))
story.append(Paragraph("Omdat de ruggengraat vaststaat, vul je voor elk nieuw blok alleen in: "
                       "(1) de skill/het thema, (2) de skill-activiteit per les, (3) de "
                       "eindshowcase, (4) de coaching-haak, en (5) de gastexpert voor les 6. "
                       "De coachingsthema's, het ritueel en de showcase-logica blijven gelijk.", st_body))
story.append(Paragraph("Zo sluiten het inhoudelijke framework en de online presentatie naadloos "
                       "op elkaar aan: dezelfde structuur, eindeloos veel thema's.", st_small))

# ---------------------------------------------------------------- doc templates
# NB: reportlab declareert op elke pagina één /Helvetica-referentie in een leeg
# tekstobject (zonder zichtbare glyphs). Dat is een ingebakken artefact — het
# font wordt niet ingesloten en er wordt niets mee getekend; alle zichtbare tekst
# staat in IBM Plex Serif / IBM Plex Mono / Inter.
cover_frame = Frame(0, 0, PAGE_W, PAGE_H, leftPadding=M, rightPadding=M,
                    topPadding=M, bottomPadding=M, id="cover")
content_frame = Frame(M, 18*mm, PAGE_W-2*M, PAGE_H-36*mm, id="content")

doc = BaseDocTemplate("ment4l-programmaframework.pdf", pagesize=A4,
                      title="MENT4L — Programmaframework Naschoolse Jeugdcoaching",
                      author="ment4l", subject="Naschoolse programma's · Gelijke Kansen Alliantie")
doc.addPageTemplates([
    PageTemplate(id="cover", frames=[cover_frame], onPage=on_cover),
    PageTemplate(id="content", frames=[content_frame], onPage=on_content),
])
doc.build(story)
print("OK -> ment4l-programmaframework.pdf")
