# Blog v2

## A report célja

Ez a report a WordPress-alapú blogarchívum Markdown- és GitHub Pages-alapú változatát foglalja össze.


## Átmenet a v2-re

A v2 a meglévő oldalakat és bejegyzéseket Markdown-forrásként kezeli, és a nyilvános archívumot statikus webhelyként teszi közzé. A migráció során a cél az eredeti tartalom és a működő nyilvános URL-ek megőrzése volt.

## Mi változott?

- Az önálló oldalak és blogbejegyzések Markdown-forrásként kezelhetők.
- A bejegyzések év szerinti mappákban vannak, a nyilvános címük továbbra is `/blog/<slug>/`.
- A borítóképek helyi, több méretű AVIF-változatokból jelennek meg.
- A GitHub Actions buildeli és teszi közzé a statikus webhelyet.
- Az archívum lapozást, RSS feedet és régi slugokhoz átirányítást használ.
- A fejléc és a lábléc a központi webhelyhez kapcsolódik, az oldal kis és nagy képernyőn is használható.

## WordPress és GitHub Pages

| Szempont | WordPress | GitHub Pages |
| --- | --- | --- |
| Szerkesztés | Beépített adminfelület és médiatár | Szövegszerkesztővel módosítható Markdown-forrás |
| Verziókövetés | A tartalmi változások összehasonlítása korlátozott | A módosítások Gitben követhetők |
| Közzététel | Az adminfelületről indítható | Automatikus build és deploy a `main` ágra érkező változások után |
| Karbantartás | WordPress, adatbázis és bővítmények kezelése szükséges | Statikus tárhely, build workflow és forrásfájlok karbantartása szükséges |
| Előny | Vizuális szerkesztés, központi médiatár | Hordozható szövegforrás, átlátható változások, gyors statikus kiszolgálás |
| Korlát | A rendszer és adatbázis üzemeltetése szükséges | Nincs vizuális adminfelület; a változtatás után build és ellenőrzés szükséges |

## Tartalmi hűség és korlátok

A bejegyzések címe, dátuma és nyilvános slugja az archívum rendezésének és elérhetőségének része. Meglévő slugot nem szabad külön kérés nélkül megváltoztatni.

A rendelkezésre álló képeket a rendszer helyi változatként tárolja. Néhány régi, eredeti webhelyre mutató szövegközi kép már nem érhető el; ezek pótlásához a WordPress médiatár mentése vagy másik forrás szükséges.

## Közzététel és minőség

A GitHub Actions a `main` ágra érkező változásokból építi fel a webhelyet és telepíti GitHub Pages-re. A helyi build és a bejegyzések ellenőrzése segít a hibás dátumok, slugok és hiányzó borítóképek felismerésében.


## Why This Update Matte

The original website was built with WordPress. This edition moves the archive to an open, standard format that:

- Can be edited with any text editor
- Tracks every change with full history
- Allows multiple contributors
- Works reliably on modern and future devices
- Can be hosted anywhere (GitHub Pages, personal server, local computer)

## For Contributors

If you're helping maintain the archive:

- All content in plain text files
- Standard folder structure
- Clear contribution guidelines
- Automated checks for common issues
- Full change history for accountability


## Adatvédelem

A nyilvános archívumban csak a webhelyre szánt oldalakat és bejegyzéseket kell közzétenni. A fejlesztési AISI-adatokból kizárólag összesített statisztika osztható meg; egyedi kérések, sessionök és átiratok nem.
