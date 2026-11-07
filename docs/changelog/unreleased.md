# Kiadásra váró változások

## Megjelenés

- A nyitóoldal zenei borítókból épülő, lassan forgó, tükrös diszkógömböt és átlátszó hátterű, letisztult címet mutat; a Dalok-archívum önálló, lemezhatású rácsban érhető el.
- A bal oldali sávon kapott helyet az oldalkép, a címmel megjelenő buborékos súgóval.
- A fénysugarak nem forognak, színintenzitásuk lassan változik, és sötét módban is láthatók.
- A blogbejegyzések szövege a kép mellé került, a dátum után pedig forgó minilemez mutatja a kapcsolódó dalt; a daloldalak lejátszási idővonalat, a lejátszást megszakítás nélkül megtartó nagyított nézetet és színes platformikonokat kaptak.
- A fényhatások pulzálása változó ütemű, a diszkógömb tükrös csempéin pedig külön-külön mozgó fényvisszaverődés jelenik meg.

## Dokumentáció és fejlesztői munkafolyamat

- A közös tartalomfeltöltési készség új oldalra, blogbejegyzésre, szövegmódosításra, valamint képek hozzáadására és cseréjére is kiterjed.
- A blog buildje és tartalomsegédletei a megosztott fejlesztői szkriptek közé kerülnek, a GitHub Actions az új helyről futtatja őket.
- Az agent útmutatók a magyar nyelvű webhelyhez és a tényleges repószerkezethez igazodnak.
- A README rövid rendszerismertetőre és magyar változásnaplóra hivatkozik.

## Mérés

- A matedomokos.hu minden oldalán működik a Google Analytics (G-JL5KR1VJCM) látogatottságmérés.

## Javítás

- Helyreállt a matedomokos.hu megjelenése: a szerkezeti átrendezéskor a `site.css` a generátor mellé került, de a build csak a `CONTENT/assets` mappát másolta, így az oldalak arculat nélkül jelentek meg. A build most mindkét helyről másol, és leáll, ha az arculati fájl hiányzik.
- Új élesítés előtti ellenőrzés (`check-dist.py`): ha bármelyik oldalról hiányzik a stíluslap vagy nem létező fájlra hivatkozik, a GitHub Actions nem telepíti az új változatot, a régi működő oldal marad kint.
