# Kiadásra váró változások

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
