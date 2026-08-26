# -*- coding: utf-8 -*-
"""
ment4l — Fotobriefing voor team/fotograaf (scholen-site)
Genereert: brand/ment4l-fotolijst.pdf

Per foto een briefing-kaart: bestandsnaam (= aanleveren-titel), ratio, coach,
en setting / leeftijd kinderen / leeftijd coach / sfeer / shot / plaatsing.
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.enums import TA_RIGHT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, NextPageTemplate,
)
from reportlab.lib.styles import ParagraphStyle

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(HERE, "brand", "fonts")
OUT = os.path.join(HERE, "brand", "ment4l-fotolijst.pdf")

def reg(n, f): pdfmetrics.registerFont(TTFont(n, os.path.join(FONTS, f)))
reg("Serif", "IBMPlexSerif-Regular.ttf"); reg("Serif-B", "IBMPlexSerif-Bold.ttf")
reg("Mono", "IBMPlexMono-Regular.ttf"); reg("Mono-B", "IBMPlexMono-Bold.ttf")
reg("Sans", "Inter-Regular.ttf"); reg("Sans-M", "Inter-Medium.ttf")
reg("Sans-SB", "Inter-SemiBold.ttf"); reg("Sans-B", "Inter-Bold.ttf")
pdfmetrics.registerFontFamily("Sans", normal="Sans", bold="Sans-B", italic="Sans", boldItalic="Sans-B")

DARK = colors.HexColor("#1A1A1A")
BG = colors.HexColor("#FFFDFA")
BG2 = colors.HexColor("#FAF9F7")
CREAM = colors.HexColor("#FFFDF5")
HAIR = colors.HexColor("#E6E6E6")
INK = colors.HexColor("#121212")
G700 = colors.HexColor("#4D4D4D")
G600 = colors.HexColor("#6C6E74")
G500 = colors.HexColor("#9C9C9C")
BRAND = colors.HexColor("#1F66FF")
JA = colors.HexColor("#1F9D52")
OPT = colors.HexColor("#B8860B")

PAGE_W, PAGE_H = A4
M = 16 * mm
CW = PAGE_W - 2 * M

def stl(n, **k):
    k.setdefault("fontName", "Sans"); k.setdefault("fontSize", 8.6)
    k.setdefault("leading", 11.8); k.setdefault("textColor", INK)
    return ParagraphStyle(n, **k)

S_FILE = stl("file", fontName="Mono-B", fontSize=10, textColor=DARK, leading=12)
S_TAGS = stl("tags", fontName="Mono", fontSize=8.5, textColor=G600, leading=12, alignment=TA_RIGHT)
S_WAT = stl("wat", fontName="Sans-SB", fontSize=9.2, textColor=INK, leading=12.5)
S_LBL = stl("lbl", fontName="Mono-B", fontSize=7.2, textColor=G500, leading=10.5)
S_VAL = stl("val", fontSize=8.5, textColor=G700, leading=11.6)

COACH_COL = {"Ja": "#1F9D52", "Optioneel": "#B8860B", "Nee": "#9C9C9C"}

def chrome_cover(c, doc):
    c.saveState()
    c.setFillColor(DARK); c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(colors.HexColor("#262626")); c.setFont("Serif-B", 420); c.drawString(PAGE_W - 230, -60, "4")
    x = M; y = PAGE_H - 70 * mm
    c.setFont("Serif-B", 42); c.setFillColor(colors.white); c.drawString(x, y, "ment")
    wm = c.stringWidth("ment", "Serif-B", 42); c.setFillColor(colors.HexColor("#EE634E")); c.drawString(x + wm, y, "4")
    w4 = c.stringWidth("4", "Serif-B", 42); c.setFillColor(colors.white); c.drawString(x + wm + w4, y, "l")
    c.setFillColor(colors.HexColor("#4D85FF")); c.setFont("Mono-B", 9.5); c.drawString(x, y + 24 * mm, "FOTOBRIEFING · VOOR TEAM & FOTOGRAAF")
    c.setFillColor(colors.white); c.setFont("Serif-B", 26); c.drawString(x, y - 24 * mm, "Welke foto's hebben we nodig")
    c.setFillColor(colors.HexColor("#BFBFBF")); c.setFont("Sans", 11.5)
    c.drawString(x, y - 24 * mm - 22, "Per foto: setting, leeftijd, sfeer, shot, ratio en plaatsing.")
    c.setStrokeColor(colors.HexColor("#262626")); c.setLineWidth(1); c.line(x, 26 * mm, PAGE_W - M, 26 * mm)
    c.setFont("Mono", 8); c.setFillColor(colors.HexColor("#8A8A8A"))
    c.drawString(x, 20 * mm, "30 FOTO'S · NASCHOOLS AANBOD · v2.0 · JUNI 2026")
    c.restoreState()

def chrome(c, doc):
    c.saveState()
    c.setFillColor(BG); c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFont("Mono", 7.5); c.setFillColor(G500)
    c.drawString(M, 9 * mm, "MENT4L · FOTOBRIEFING")
    c.drawRightString(PAGE_W - M, 9 * mm, "%d" % (doc.page - 1))
    c.restoreState()

def section_band(num, title, accent_hex, sub):
    acc = colors.HexColor(accent_hex)
    inner = [Paragraph(num, stl("bn", fontName="Mono-B", fontSize=8, textColor=colors.white, leading=11)),
             Paragraph(title, stl("bt", fontName="Serif-B", fontSize=15, textColor=colors.white, leading=18)),
             Paragraph(sub, stl("bs", fontSize=8.4, textColor=colors.HexColor("#E6E6E6"), leading=11, spaceBefore=2))]
    t = Table([[inner]], colWidths=[CW])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), acc),
        ("LEFTPADDING", (0, 0), (-1, -1), 14), ("RIGHTPADDING", (0, 0), (-1, -1), 14),
        ("TOPPADDING", (0, 0), (-1, -1), 10), ("BOTTOMPADDING", (0, 0), (-1, -1), 11),
        ("ROUNDEDCORNERS", [7, 7, 7, 7])]))
    return t

def photo_card(p):
    cc = COACH_COL[p["coach"]]
    header = Table(
        [[Paragraph(p["file"], S_FILE),
          Paragraph(f'{p["ratio"]} &nbsp;·&nbsp; <font color="{cc}">Coach: {p["coach"]}</font>', S_TAGS)]],
        colWidths=[CW - 28 - 150, 150],
    )
    header.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 2), ("VALIGN", (0, 0), (-1, -1), "MIDDLE")]))

    specs = [("Setting", p["setting"]), ("Leeftijd", p["leeftijd"]),
             ("Sfeer", p["sfeer"]), ("Shot", p["shot"]), ("Plaatsing", p["waar"])]
    spec_rows = [[Paragraph(l, S_LBL), Paragraph(v, S_VAL)] for l, v in specs]
    spec = Table(spec_rows, colWidths=[64, CW - 28 - 64])
    spec.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 2.5), ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5)]))

    cell = [header,
            Paragraph(p["wat"], S_WAT),
            Spacer(1, 5),
            spec]
    card = Table([[cell]], colWidths=[CW])
    card.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), BG2), ("BOX", (0, 0), (-1, -1), 0.7, HAIR),
        ("LEFTPADDING", (0, 0), (-1, -1), 14), ("RIGHTPADDING", (0, 0), (-1, -1), 14),
        ("TOPPADDING", (0, 0), (-1, -1), 11), ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
        ("LINEBELOW", (0, 0), (0, 0), 0.5, HAIR), ("ROUNDEDCORNERS", [10, 10, 10, 10])]))
    return KeepTogether([card, Spacer(1, 9)])

def callout(title, lines):
    cellc = [Paragraph(title, stl("ct", fontName="Mono-B", fontSize=8, textColor=BRAND, leading=11, spaceAfter=4))]
    for l in lines:
        cellc.append(Paragraph("•&nbsp;&nbsp;" + l, stl("cl", fontSize=8.6, leading=12.5, textColor=INK, spaceAfter=2)))
    t = Table([[cellc]], colWidths=[CW])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), CREAM), ("BOX", (0, 0), (-1, -1), 0.7, HAIR),
        ("LEFTPADDING", (0, 0), (-1, -1), 13), ("RIGHTPADDING", (0, 0), (-1, -1), 13),
        ("TOPPADDING", (0, 0), (-1, -1), 11), ("BOTTOMPADDING", (0, 0), (-1, -1), 11),
        ("ROUNDEDCORNERS", [8, 8, 8, 8])]))
    return t

def P(file, ratio, coach, wat, setting, leeftijd, sfeer, shot, waar):
    return dict(file=file, ratio=ratio, coach=coach, wat=wat, setting=setting,
                leeftijd=leeftijd, sfeer=sfeer, shot=shot, waar=waar)

COACH_PORTRET = "Effen warme muur of zachte, lichte binnenruimte. Rustig, niet druk."

SECTIES = [
    ("00", "Algemeen", "#1F66FF", "Sfeer van het merk. Hier mag de jeugdcoach duidelijk in beeld.", [
        P("hero.jpg", "4:5 staand", "Ja",
          "Jeugdcoach en 2-3 kinderen samen aan de slag, lachend en betrokken.",
          "Echte les-setting (schoolkeuken of lokaal), licht en opgeruimd, warme achtergrond.",
          "Kinderen 9-14 jr (mix PO/VO) · Coach 22-35 jr, divers",
          "Warm, betrokken, plezier, vertrouwen.",
          "Medium-wide. Coach geknield op ooghoogte van het kind. Daglicht, ondiepe scherptediepte. Houd 1 zijde rustig/leeg: daar komt de kop naast.",
          "Homepage, grote hero rechts van de titel."),
        P("uniek.jpg", "4:5 staand", "Ja",
          "Een-op-een moment: de coach geeft een kind aandacht of uitleg.",
          "Binnen, tijdens een activiteit; rustige, lichte achtergrond.",
          "Kind 9-14 jr · Coach 22-35 jr",
          "Warm, persoonlijk, aanmoedigend.",
          "Medium close-up van coach en kind samen, licht van opzij, candid. Warme tinten.",
          "Homepage, blok 'Wat ons uniek maakt'."),
    ]),
    ("01", "Professionals", "#1F66FF", "De mensen achter ment4l. Portretten en begeleiding.", [
        P("professionals-hero.jpg", "1:1 vierkant", "Ja",
          "Coach met een klein groepje (3-4) kinderen, open en vertrouwd.",
          "Neutrale, lichte ruimte of les-setting; achtergrond niet druk.",
          "Kinderen 9-15 jr (mix) · Coach 22-35 jr",
          "Toegankelijk, warm, professioneel.",
          "Medium, iedereen ontspannen met natuurlijke interactie of oogcontact. Vierkant kadreren, groep gecentreerd.",
          "Pagina Professionals, hero."),
        P("coach-1.jpg", "4:5 staand", "Ja",
          "Portret van een jeugdcoach.", COACH_PORTRET,
          "Coach 22-35 jr, divers, benaderbaar (jong rolmodel)",
          "Open, vriendelijk, vertrouwenwekkend.",
          "Portret tot borsthoogte, ooghoogte, oogcontact, lichte glimlach. Ondiepe scherptediepte.",
          "Professionals, teamkaart 1 (+ kleine teaser op homepage)."),
        P("coach-2.jpg", "4:5 staand", "Ja",
          "Portret van een tweede jeugdcoach.", COACH_PORTRET,
          "Coach 22-35 jr, divers", "Open, vriendelijk, warm.",
          "Zelfde stijl als coach-1: portret tot borsthoogte, ooghoogte, oogcontact.",
          "Professionals, teamkaart 2."),
        P("vakdocent.jpg", "4:5 staand", "Ja",
          "Portret van een vakdocent, met een attribuut van het vak (garde, microfoon, laptop).",
          "Passend bij het vak (keuken/gym/studio), rustige achtergrond.",
          "Vakdocent 25-45 jr, divers", "Deskundig en toch warm.",
          "Portret tot borsthoogte, ooghoogte; attribuut subtiel in beeld.",
          "Professionals, teamkaart 3."),
    ]),
    ("02", "Wereldkeuken", "#EE634E", "Koken en bakken. Focus op handen, ingredienten en plezier.", [
        P("wereldkeuken.jpg", "4:3 liggend", "Nee",
          "Kinderen koken en bakken samen, handen in het deeg, kleurrijke ingredienten.",
          "Schoolkeuken of kooklokaal, opgeruimd, daglicht.",
          "Kinderen 9-14 jr (mix PO/VO)", "Energie, plezier, samen.",
          "Medium-wide. 2-3 kinderen actief, rustige achtergrond, ruimte rondom.",
          "Categoriekaart + hero detailpagina."),
        P("wereldkeuken-taarten.jpg", "1:1 vierkant", "Nee",
          "Versierde taarten of cupcakes; een kind dat versiert (spuitzak).",
          "Werkblad in de keuken; close.", "Kind 9-15 jr (PO/VO)",
          "Zoet, vrolijk, trots.",
          "Close-up op handen + cupcake, gecentreerd, ondiepe scherptediepte.",
          "Thema 'Taarten & cupcakes'."),
        P("wereldkeuken-koekjes.jpg", "1:1 vierkant", "Nee",
          "Koekjes of brownies; deeg uitsteken op een bakplaat.",
          "Keuken, bakplaat, deeg.", "Kind 9-16 jr (PO/VO/ISK)",
          "Ontspannen, samen, lekker.",
          "Close-up/detail: handen + uitsteekvormpjes, gecentreerd.",
          "Thema 'Koekjes & brownies'."),
        P("wereldkeuken-wereldgerechten.jpg", "1:1 vierkant", "Nee",
          "Een kleurrijk gerecht of bord; kruiden, samen opscheppen.",
          "Keuken; diverse, kleurrijke gerechten.", "Kind 12-16 jr (VO/ISK)",
          "Trots op het eigen (culturele) gerecht; warm.",
          "Top-down of close van het bord + handen, gecentreerd.",
          "Thema 'Wereldgerechten'."),
        P("wereldkeuken-streetfood.jpg", "1:1 vierkant", "Nee",
          "Snacks of streetfood samen klaarmaken en uitdelen.",
          "Keuken of uitgiftepunt.", "Kind 9-15 jr (PO/VO)",
          "Speels, smakelijk.",
          "Close/medium: handen + snack, gecentreerd.",
          "Thema 'Snacks & streetfood'."),
        P("eindmoment-wereldkeuken.jpg", "16:9 breed", "Optioneel",
          "Pop-up proeverij: een kind biedt trots zijn gerecht aan ouders/publiek aan.",
          "Aula of lokaal ingericht als markt; tafels, publiek.",
          "Kinderen 9-16 jr + ouders/publiek; coach evt. klein op achtergrond",
          "Trots, feestelijk, markt.",
          "Wide. Trots kind op de voorgrond, publiek zacht onscherp erachter. Ruimte voor sfeer.",
          "Eindmoment-blok."),
    ]),
    ("03", "Sport & beweging", "#16A34A", "Beweging en energie. Actie bevriezen.", [
        P("sport.jpg", "4:3 liggend", "Nee",
          "Kinderen bewegen en sporten met energie.",
          "Gymzaal of schoolplein, daglicht.", "Kinderen 9-14 jr (mix)",
          "Energie, beweging, samen.",
          "Medium-wide, actie met lichte beweging, rustige achtergrond.",
          "Categoriekaart + hero detailpagina."),
        P("sport-urban.jpg", "1:1 vierkant", "Nee",
          "Skaten of freerunning; beweging mooi bevriezen.",
          "Schoolplein of skatepark.", "Kind 12-16 jr (VO/ISK)",
          "Stoer, vrij, energiek.",
          "Action-shot, beweging bevriezen, lage hoek mag, gecentreerd.",
          "Thema 'Urban sports'."),
        P("sport-voetbal.jpg", "1:1 vierkant", "Nee",
          "Voetbal of teamspel; samenspelen en juichen.",
          "Veld of gymzaal.", "Kind 9-15 jr (PO/VO)",
          "Teamgevoel, fanatiek, plezier.",
          "Action: bal + kind in beweging, gecentreerd.",
          "Thema 'Voetbal & teamspel'."),
        P("sport-bootcamp.jpg", "1:1 vierkant", "Nee",
          "Bootcamp of fitness-oefening; inspanning met plezier.",
          "Gymzaal of buiten.", "Kind 12-16 jr (VO/ISK)",
          "Inspanning + plezier, aanmoediging.",
          "Medium: kind(eren) in een oefening, gecentreerd.",
          "Thema 'Bootcamp & fitness'."),
        P("sport-zelfverdediging.jpg", "1:1 vierkant", "Nee",
          "Judo of boksen op matten; veilig en gecontroleerd (pads/handschoenen).",
          "Mat/dojo of gymzaal.", "Kind 9-15 jr (PO/VO)",
          "Sterk, veilig, respect.",
          "Medium: techniek met pads, gecontroleerd, gecentreerd.",
          "Thema 'Zelfverdediging'."),
        P("eindmoment-sport.jpg", "16:9 breed", "Optioneel",
          "Eindtoernooi: kinderen in actie met publiek, of een prijsuitreiking met medaille.",
          "Gymzaal of veld met publiek.", "Kinderen 9-16 jr + publiek",
          "Spanning, trots, juichen.",
          "Wide: het moment van winst of de medaille, ruimte rondom.",
          "Eindmoment-blok."),
    ]),
    ("04", "AI & Tech", "#6D5CF0", "Maken op het scherm. Toon het scherm en de concentratie.", [
        P("ai-tech.jpg", "4:3 liggend", "Nee",
          "Kinderen achter laptops, geconcentreerd en enthousiast, scherm zichtbaar.",
          "Computerlokaal of lokaal met laptops, opgeruimd.", "Kinderen 10-15 jr (mix)",
          "Focus, ontdekken, enthousiasme.",
          "Medium: kind + scherm, over-the-shoulder mag, rustige achtergrond.",
          "Categoriekaart + hero detailpagina."),
        P("ai-website.jpg", "1:1 vierkant", "Nee",
          "Een kind bouwt een website; browser of editor op het scherm.",
          "Laptop in het lokaal.", "Kind 12-16 jr (VO/ISK)",
          "Trots op de eigen pagina.",
          "Close: scherm + gezicht/handen, gecentreerd.",
          "Thema 'Website bouwen'."),
        P("ai-game.jpg", "1:1 vierkant", "Nee",
          "Game maken; game-editor of zelfgemaakt personage op het scherm.",
          "Laptop.", "Kind 10-15 jr (PO/VO)",
          "Speels, creatief, focus.",
          "Close: scherm + kind, gecentreerd.",
          "Thema 'Game maken'."),
        P("ai-kunst.jpg", "1:1 vierkant", "Nee",
          "AI-beeld op het scherm; een kind kijkt verwonderd naar het resultaat.",
          "Laptop of scherm.", "Kind 10-16 jr (PO/VO/ISK)",
          "Verwondering, creatief.",
          "Close: gezicht + kleurrijk scherm, gecentreerd.",
          "Thema 'AI-kunst maken'."),
        P("ai-app.jpg", "1:1 vierkant", "Nee",
          "Een app op telefoon of scherm; een kind test het.",
          "Telefoon of laptop.", "Kind 12-15 jr (VO)",
          "Doelgericht, trots.",
          "Close: handen + telefoon/scherm, gecentreerd.",
          "Thema 'App bouwen'."),
        P("eindmoment-ai.jpg", "16:9 breed", "Optioneel",
          "Demo-day: een kind pitcht zijn werk op een scherm of beamer voor publiek.",
          "Lokaal of aula met beamer, publiek.", "Kinderen 10-16 jr + publiek",
          "Trots, presenteren, spotlight.",
          "Wide: kind voor het scherm, publiek erbij, ruimte rondom.",
          "Eindmoment-blok."),
    ]),
    ("05", "Muziek & dans", "#E5398B", "Stem, ritme en beweging. Expressie en podium.", [
        P("muziek-dans.jpg", "4:3 liggend", "Nee",
          "Kinderen met een microfoon of dansend; beweging en expressie.",
          "Muzieklokaal, aula of studio.", "Kinderen 9-14 jr (mix)",
          "Energie, ritme, expressie.",
          "Medium-wide: beweging, rustige achtergrond.",
          "Categoriekaart + hero detailpagina."),
        P("muziek-rap.jpg", "1:1 vierkant", "Nee",
          "Een kind met microfoon en tekstblad; focus en flow.",
          "Studio of lokaal, microfoon.", "Kind 10-16 jr (PO/VO/ISK)",
          "Zelfverzekerd, focus.",
          "Close: gezicht + microfoon, gecentreerd.",
          "Thema 'Rap & tekst'."),
        P("muziek-choreografie.jpg", "1:1 vierkant", "Nee",
          "Een dansgroepje in beweging, mooi synchroon.",
          "Danszaal of aula (spiegelwand mag).", "Kind 9-15 jr (PO/VO)",
          "Energie, samen, ritme.",
          "Medium: beweging bevriezen, gecentreerd.",
          "Thema 'Dans & choreografie'."),
        P("muziek-beats.jpg", "1:1 vierkant", "Nee",
          "Laptop of mengpaneel met koptelefoon; beats maken.",
          "Studio of laptop.", "Kind 12-15 jr (VO)",
          "In de zone, creatief.",
          "Close: handen + koptelefoon/pads, gecentreerd.",
          "Thema 'Beats & producen'."),
        P("muziek-zang.jpg", "1:1 vierkant", "Nee",
          "Een kind zingt in een microfoon; veel expressie.",
          "Studio of podium, microfoon.", "Kind 9-15 jr (PO/VO)",
          "Durven, schitteren.",
          "Close: gezicht + microfoon, gecentreerd.",
          "Thema 'Zang & podium'."),
        P("eindmoment-muziek.jpg", "16:9 breed", "Optioneel",
          "Showcase: een kind op een echt podium met microfoon; publiek en licht.",
          "Echt podium of aula, podiumlicht, publiek.", "Kinderen 9-16 jr + publiek",
          "Trots, spotlight, applaus.",
          "Wide: kind in de spotlight op het podium, publiek als silhouet. Ruimte rondom.",
          "Eindmoment-blok."),
    ]),
]

S = []
A = S.append
A(Spacer(1, 2)); A(PageBreak())

A(Paragraph("Zo gebruik je deze briefing", stl("h", fontName="Serif-B", fontSize=20, textColor=DARK, leading=23, spaceAfter=6)))
A(Paragraph("Elke foto heeft een eigen kaart met setting, leeftijd, sfeer, shot, ratio en plaatsing. "
            "Lever de foto aan met exact de bestandsnaam en in de aangegeven ratio, dan plaatsen wij "
            "hem automatisch op de juiste plek.",
            stl("i", fontSize=10, leading=15, textColor=G700, spaceAfter=12)))
A(callout("STIJL VAN DE SITE (rode draad)", [
    "Warm en echt: daglicht, natuurlijke poses, candid. Geen geposeerde stockbeelden.",
    "Rustige, lichte achtergronden (de site is warm-wit en strak) zodat de foto's mooi 'ademen'.",
    "Divers gezelschap: verschillende achtergronden, huidskleuren en genders.",
    "Hero's en eindmomenten: kader ruim, met lucht aan een zijde, zodat tekst ernaast past.",
    "Thema-foto's: strak en vierkant gekadreerd, onderwerp gecentreerd (kleine tegels op de site).",
]))
A(Spacer(1, 9))
A(callout("LEEFTIJDEN & MENSEN", [
    "PO = groep 6-8 (ca. 9-12 jr) · VO = onderbouw (ca. 12-16 jr) · ISK = nieuwkomers (ca. 12-18 jr).",
    "Jeugdcoaches: jong en benaderbaar (ca. 22-35 jr), divers, echte rolmodellen.",
    "Vakdocenten: ervaren in hun vak (ca. 25-45 jr).",
    "Coach in beeld: alleen bij Algemeen en Professionals. Thema-foto's draaien om de kinderen/activiteit; eindmomenten = coach optioneel op de achtergrond.",
    "AVG / portretrecht: schriftelijke toestemming van ouder/voogd voor elk herkenbaar kind.",
    "Aanleveren: JPG, minimaal 2000 px aan de lange zijde (300 dpi indien ook gedrukt).",
]))

for (num, title, acc, sub, photos) in SECTIES:
    A(PageBreak())
    A(section_band(num, title, acc, sub))
    A(Spacer(1, 10))
    for p in photos:
        A(photo_card(p))

doc = BaseDocTemplate(OUT, pagesize=A4, leftMargin=M, rightMargin=M, topMargin=16 * mm, bottomMargin=14 * mm,
                      title="ment4l — Fotobriefing", author="ment4l")
frame = Frame(M, 14 * mm, CW, PAGE_H - 16 * mm - 14 * mm, id="m", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
doc.addPageTemplates([
    PageTemplate(id="cover", frames=[frame], onPage=chrome_cover),
    PageTemplate(id="content", frames=[frame], onPage=chrome),
])
S.insert(0, NextPageTemplate("content"))
doc.build(S)
print("OK ->", OUT, "| pages:", doc.page)
