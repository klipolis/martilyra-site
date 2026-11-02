# Közreműködői gyorsindító

## Webhelyépítés

A webhely helyi ellenőrzése a repó gyökeréből:

```powershell
python -m pip install -r \.github/site-generator/scripts/python-extensions.txt
python \.github/site-generator/scripts/build_site.py
python \.github/site-generator/scripts/ellenorzes.py
```

Az eredmény a `dist/` mappába kerül; ezt ne add hozzá a verziókezeléshez.

## AISI-nyilvántartás

AISI-tevékenységről csak megosztható, összesített adatot tarts fenn. Ne ments munkamenet-adatbázist, átiratot, egyedi kérést vagy azonosítót. A részletes szabályokat az AISI-átláthatósági útmutató tartalmazza.
