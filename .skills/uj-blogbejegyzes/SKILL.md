---
name: uj-blogbejegyzes
description: Új blogbejegyzés (és opcionális borítókép) hozzáadása a repóhoz, ellenőrzés és közzététel. Akkor használd, ha Domi új bejegyzést, borítóképet vagy bejegyzésjavítást kér a repóban.
---

# Új blogbejegyzés

Előbb olvasd el a repó gyökerében az `AGENTS.md`-t (formátum, nyelv, MD terminológia).

## 1. Fájl létrehozása

1. Slug a címből: kisbetű, ékezetek nélkül (á→a, é→e, í→i, ó/ö/ő→o, ú/ü/ű→u), minden más karakter helyett kötőjel, egymás utáni kötőjelek összevonva. Ha bármelyik évmappában létezik már ilyen nevű fájl, tegyél a végére `-2`-t.
2. Útvonal: `CONTENT/blog/<év>/<slug>.md`, ahol az év a `date` éve.
3. Frontmatter:

   ```
   ---
   title: <cím, idézőjelek nélkül>
   date: <ÉÉÉÉ-HH-NN óó:pp:mm, budapesti idő>
   image: -
   image_alt: <cím vagy a kép leírása>
   ---
   ```

4. Törzs: magyar, tegező, MD kanonikus szóhasználat, szövegközi forráshivatkozás nélkül. Ha Domi kész szöveget ad, ne írd át, csak formázd.

## 2. Borítókép (ha kérik)

1. Készíts egy PNG-t vagy JPG-t, legalább 1024 px szélesen, kb. 16:9 arányban, az MD arculatában (bordó `#6E1423`, arany `#9C7A3C`, törtfehér háttér, dupla arany keret, rombusz díszek). Ne használj jogvédett képet, ismert karaktert vagy valós személy fotóját.
2. Futtasd:

   ```bash
   python .claude/skills/uj-blogbejegyzes/scripts/kep_hozzaadasa.py <forraskep.png> <év> <slug>
   ```

   Ez legyártja a három AVIF-méretet a `CONTENT/images/<év>/` mappába, frissíti a `_manifest.json`-t, és kiírja a frontmatterbe való `image:` sort.
3. Írd be az `image:` sort a bejegyzés fejlécébe.

## 3. Ellenőrzés

```bash
python -m pip install -q -r .github/requirements.txt
python .github/build_site.py
python .claude/skills/uj-blogbejegyzes/scripts/ellenorzes.py
ls dist/blog/<slug>/index.html
```

Ha bármelyik hibát jelez, javítsd, mielőtt továbblépsz.

## 4. Közzététel

```bash
git pull --rebase origin main
git add CONTENT
git commit -m "Új bejegyzés: <cím>"
git push origin HEAD:main
```

Ha a pull ütközések tömegét hozza (a `main` közben `_init_site` újrafeltöltést kapott), ne oldd fel kézzel: klónozd újra a repót, másold át a saját fájljaidat, és onnan commitolj.

A push után az oldal 1–2 perc alatt frissül.

## 5. Visszajelzés

Röviden, magyarul, tegezve: a bejegyzés címe, a nyilvános link, és ha volt, minden eltérés vagy probléma. Ne sorold fel a lépéseket.
