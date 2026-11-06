# A webhely felépítése

Ez a dokumentum a Marti Lyra magyar nyelvű, Markdown-alapú statikus webhelyének forrásait, felépítését és közzétételét foglalja össze.

## Tartalom

- `CONTENT/index.md`: a nyitóoldal.
- `CONTENT/dalok/`: a dalok oldala és annak forrásai; a front matter tartalmazza többek között a címet, a YouTube-videó azonosítóját és a borítókép nevét.
- `CONTENT/blog/`: dátummal ellátott blogbejegyzések és képeik.
- `CONTENT/assets/images/`: a dalok és bejegyzések képei.
- `CONTENT/assets/images/thumbnails/`: bélyegképek. A dalarchívum a bélyegképet használja, ha létezik, egyébként az eredeti képre vált vissza.

A dal- és blogarchívum nyitóoldala a `.github/site-generator/pages/` mappában van, az archívumok megjelenítését a `.github/site-generator/_includes/` sablonjai végzik. Ezek a fájlok a tartalommal együtt kerülnek a Jekyll forrásmappájába, így az archívumlisták nem igényelnek külön, szerkesztett `CONTENT` indexfájlt. Az oldalak elrendezése a `_layouts/` mappában, a közös címadat a `_data/site.yml` fájlban található.

A bejegyzések és dalok útvonalát a forrásfájlok helye és a Jekyll `pretty` permalink-beállítása határozza meg. A fájlok áthelyezése vagy átnevezése módosíthat nyilvános URL-eket, ezért a meglévő útvonalakat meg kell őrizni.


## Építés és közzététel

A GitHub Actions a GitHub Pages-re telepíti az oldalt.

## Kapcsolódó dokumentumok

- [Változásnapló](./CHANGELOG.md): a kiadott változások összefoglalója.
- [Kiadás előtti változások](./changelog/unreleased.md): a következő kiadás jegyzetei.
