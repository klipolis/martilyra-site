---
name: tartalom-feltoltes
description: Új magyar oldal vagy blogbejegyzés létrehozása, illetve meglévő tartalom szövegének vagy képének hozzáadása, cseréje és javítása a repóban. Akkor használd, ha tartalom feltöltését vagy módosítását kéri a felhasználó.
---

# Tartalom hozzáadása vagy módosítása

## Hatókör

Ezt a skillt új önálló oldal, új blogbejegyzés, illetve meglévő tartalomban kért szöveg- vagy kép-hozzáadásra, cserére és javításra használd. A felhasználó pontos kérését kövesd; meglévő szöveget ne szerkessz át külön kérés nélkül.

## Hely és URL

- Önálló oldalak: `CONTENT/<slug>.md`; a kezdőlap forrása `CONTENT/_index.md`.
- Bejegyzések: `CONTENT/blog/<év>/<slug>.md`; az év a frontmatter dátumának éve.
- Bejegyzés URL-je: `https://matedomokos.hu/<slug>/`.
- A fájlnév kisbetűs, ékezet nélküli, kötőjeles slug legyen. Meglévő slugot ne nevezz át, mert a nyilvános URL megváltozik. Csak kifejezett átnevezési kérés esetén adj régi slugot `alias` mezőként.
- Kizárólag a kért fájlokat és kapcsolódó képfájlokat módosítsd.

## Blogbejegyzés formátuma

```markdown
---
title: A bejegyzés címe
date: 2026-10-19 00:35:00
image: -
image_alt: A borítókép rövid leírása
---

A bejegyzés törzse magyarul.
```

A `date` budapesti helyi idő. A frontmatter egyszerű `kulcs: érték` sorokból áll, nem teljes YAML; a cím köré ne tegyél idézőjelet. A kép nélküli érték `image: -`.

## Nyelv és stílus

Minden látogatói tartalom magyar, tegező hangú és egyszerű. Kövesd az MD kanonikus szóhasználatát és az `.agents/language-and-content.md` útmutatót. A felhasználó által megadott kész szöveget ne írd át.

## Képek

Borítókép esetén futtasd a közös segédprogramot:

```powershell
python \.github/site-generator/scripts/kep_hozzaadasa.py <forraskep> <év> <slug>
```

A szkript AVIF-méreteket hoz létre a `CONTENT/images/<év>/` alatt, és frissíti a `CONTENT/images/_manifest.json` fájlt. A kiírt `image:` értéket írd be a bejegyzés frontmatterébe. Ne állítsd, hogy egy kép elérhető, ha a forrás nem tölthető le vagy a build nem találja.

## Ellenőrzés

```powershell
python -m pip install -r \.github/site-generator/scripts/python-extensions.txt
python \.github/site-generator/scripts/build_site.py
python \.github/site-generator/scripts/ellenorzes.py
```

Ellenőrizd a kért oldal vagy bejegyzés kimenetét a `dist/` mappában. Az elérhetetlen régi képfájlokat jelezd külön.

Ne stage-elj, commitolj vagy pusholj, ha a felhasználó ezt nem kéri.
