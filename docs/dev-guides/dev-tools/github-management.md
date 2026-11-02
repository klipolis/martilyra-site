# GitHub-kezelés

## Közzététel

A `main` ágra érkező változásokat a GitHub Actions munkafolyamata automatikusan felépíti és telepíti a GitHub Pages-re. A legfrissebb futások a repó **Actions** lapján ellenőrizhetők.

## Együttműködés

- A változtatásokhoz használj célzott branchet és pull requestet, ha közös ellenőrzés szükséges.
- A `main` az éles webhely forrása.
- Push előtt ellenőrizd a diffet, a buildet és a bejegyzés-ellenőrzőt.
- Történetátírást csak kifejezett kérésre végezz.

## Helyi ellenőrzés

```powershell
python -m pip install -r \.github/site-generator/scripts/python-extensions.txt
python \.github/site-generator/scripts/build_site.py
python \.github/site-generator/scripts/ellenorzes.py
```

## Munkafolyamat-hiba

Nyisd meg a hibás Actions-futást, ellenőrizd a sikertelen lépés naplóját, javítsd a kiváltó okot, majd indíts új futást. Ne töltsd fel kézzel a generált `dist/` mappát.
