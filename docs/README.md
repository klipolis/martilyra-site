# A webhely felépítése

Ez a dokumentum a Marti Lyra magyar nyelvű, Markdown-alapú statikus webhelyének forrásait, felépítését és közzétételét foglalja össze.

## Tartalom

- `CONTENT/dalok/`: a dalok oldala és annak forrásai; a front matter tartalmazza többek között a címet, a YouTube-videó azonosítóját és a borítókép nevét.
- `CONTENT/blog/`: dátummal ellátott blogbejegyzések és képeik.
- `CONTENT/assets/images/`: a dalok és bejegyzések képei.
- `CONTENT/assets/images/thumbnails/`: bélyegképek. A dalarchívum a bélyegképet használja, ha létezik, egyébként az eredeti képre vált vissza.

A Dalok-archívum nyitóoldala a `.github/site-generator/pages/index.md` fájlban van, a Blog archívumé a `.github/site-generator/pages/blog.md` fájlban. Az archívumok megjelenítését a `.github/site-generator/_includes/` sablonjai végzik. A régi `/dalok/` útvonal a gyökéroldali archívumra irányít; a navigációs Dalok ikon közvetlenül a szétnyitott archívumhoz vezet. A `.github/site-generator/pages/` oldalait a GitHub Actions munkafolyamat másolja a Jekyll forrásmappájába. Az oldalak elrendezése a `_layouts/` mappában, a közös cím- és útvonaladatok a `_data/site.yml` fájlban találhatók.

A bejegyzések és dalok útvonalát a forrásfájlok helye és a Jekyll `pretty` permalink-beállítása határozza meg. A fájlok áthelyezése vagy átnevezése módosíthat nyilvános URL-eket, ezért a meglévő útvonalakat meg kell őrizni.


## Építés és közzététel

A GitHub Actions a GitHub Pages-re telepíti az oldalt.

## Kapcsolódó dokumentumok

- [Változásnapló](./CHANGELOG.md): a kiadott változások összefoglalója.
- [Kiadás előtti változások](./changelog/unreleased.md): a következő kiadás jegyzetei.
