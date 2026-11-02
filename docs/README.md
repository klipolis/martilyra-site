# Az oldal működése

Ez a dokumentum a Máté Domokos weboldalához tartozó magyar nyelvű, Markdown-alapú archívum működését foglalja össze.

## Miért külön statikus webhely?

A WordPress kezeli a központi webhelyet, szerkesztőfelületet, médiatárat és piszkozatokat. A blog archívuma ezzel szemben a GitHub Pages-en futó statikus webhely. A Markdown-források és a képek a Gitben követhetők, a `main` ágra kerülő változást a GitHub Actions építi és telepíti.

| Szempont | WordPress | GitHub Pages |
| --- | --- | --- |
| Előnyök | Beépített adminisztráció, médiatár és piszkozatkezelés. | Gyors, ingyenes statikus tárhely; a tartalom és a módosítások Gitben követhetők. |
| Hátrányok | Szerver-, adatbázis-, frissítési és biztonsági karbantartást igényel. | Nincs adminfelület; a közzététel GitHub Actions builddel történik. |

## Tartalom és útvonalak

- `CONTENT/*.md`: önálló oldalak; a `_index.md` a blog gyökéroldala.
- `CONTENT/blog/<év>/<slug>.md`: bejegyzések; a slug a fájlnév, az év a dátum éve.
- `CONTENT/images/<év>/`: helyi AVIF-képek.
- `CONTENT/images/_manifest.json`: képméretek és reszponzív `srcset` adatok.
- `CONTENT/assets/`: stílusok és statikus felületi elemek.

Az önálló oldalak gyökérútvonalat kapnak, a bejegyzések címe `/blog/<slug>/`. A régi slugokat `alias` mezővel lehet átirányítani. A `feed.xml` az RSS-fogyasztók számára a legfrissebb 20 bejegyzést tartalmazza. Formátumát és útvonalát kompatibilisen kell tartani.

## Képek

A borítóképek 400, 768 és 1024 képpont széles AVIF-változatban kerülnek a képtárba. A közös segédprogram elkészíti a változatokat és frissíti a manifestet. A bejegyzés `image` mezője a `CONTENT/images/` alatti 1024 képpontos változatra mutat.

Néhány régi, eredeti webhelyre mutató szövegközi képhivatkozás már nem érhető el. A build ezeket figyelmeztetésben jelzi; csak a forrás rendelkezésre állásakor lehet őket visszaállítani.

## Építés és közzététel

A build- és tartalomsegédletek a `\.github/site-generator/scripts/` mappában vannak:

- `build_site.py`: Markdown-forrásokból előállítja a statikus webhelyet.
- `ellenorzes.py`: ellenőrzi a bejegyzések dátumát, slugját és borítóképét.
- `kep_hozzaadasa.py`: elkészíti a reszponzív AVIF-borítóképeket és frissíti a manifestet.
- `python-extensions.txt`: a helyi buildhez szükséges Python-csomagok.

A helyi ellenőrzés a repó gyökeréből:

```powershell
python -m pip install -r \.github/site-generator/scripts/python-extensions.txt
python \.github/site-generator/scripts/build_site.py
python \.github/site-generator/scripts/ellenorzes.py
```

A build a `dist/` mappába ír. A Pages-munkafolyamat a `main` ágra történő push után ugyanezt a buildet futtatja, majd telepíti az eredményt. A saját domain miatt a `SITE_BASE_PATH` értéke üres marad; a `.github/workflows/pages.yml` a közzététel belépési pontja.

## Agent-útmutatók és változásnapló

A projekt agent útmutatói a `.agents/` mappában, a megosztott feladatkészségek a gyökér `.skills/` mappájában találhatók. A Claude Code készségei rövid hivatkozók, amelyek azonos gyökérbeli leírásra irányítják az ügynököt.

A kiadott változatok összefoglalója a [CHANGELOG.md](./CHANGELOG.md) fájlban olvasható. A következő kiadás még ki nem adott jegyzetei a `docs/changelog/unreleased.md` fájlba kerülnek.

Az AISI-fejlesztés kizárólagos összesítését az [AISI report](./aisi-activity/aisi-reports/project-stats-totals.md) tartalmazza; az egyedi sessionök és üzenetek nem kerülnek a repóba.

