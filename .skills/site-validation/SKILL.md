---
name: site-validation
description: A statikus webhely és bejegyzésképeinek ellenőrzése a helyi build előtt. Akkor használd, ha buildet, tartalomellenőrzést vagy GitHub Pages kiadást kell validálni.
---

# Webhely-ellenőrzés

Futtasd a parancsokat a repó gyökeréből:

```powershell
python -m pip install -r \.github/site-generator/scripts/python-extensions.txt
python \.github/site-generator/scripts/build_site.py
python \.github/site-generator/scripts/ellenorzes.py
```

Sikeres build esetén nézd meg, hogy a várt útvonal létrejött-e a `dist/` alatt, és hogy a build nem jelez hibát. Az „unavailable local image sources” figyelmeztetést jelentsd, ne kezeld sikeres kép-helyreállításként.

Ne commitold a generált `dist/` mappát.
