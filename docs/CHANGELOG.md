# Változásnapló

## [v2.0.0]

### Hozzáadva

- A WordPress-alapú webhely blogarchívuma Markdown-forrásokból épülő statikus webhellyé válik, amely GitHub Pages-en érhető el.
- A migráció az önálló oldalakat, a közzétett bejegyzéseket és a helyben tárolt piszkozatokat külön kezeli; a bejegyzések évenkénti mappákban maradnak.
- A képtár helyi AVIF-változatokkal és reszponzív képadatokkal egészül ki.
- A GitHub Actions munkafolyamat automatikusan építi és telepíti a webhelyet a `main` ágra érkező változtatások után.
- A blogarchívum lapozást, bejegyzésenkénti útvonalakat, régi címekhez átirányításokat és RSS-hírcsatornát kap.
- A megjelenés a központi webhely arculatához igazodik, és kis, illetve nagy képernyőkön is használható.
- A közös képfeldolgozó, bejegyzés-ellenőrző és agent munkakészségek elérhetővé válnak a fejlesztők és AISI-ügynökök számára.
- A közös tartalomfeltöltési készség új oldalra, blogbejegyzésre, szövegmódosításra, valamint képek hozzáadására és cseréjére is kiterjed.
- A blog buildje és tartalomsegédletei a megosztott fejlesztői szkriptek közé kerülnek, a GitHub Actions az új helyről futtatja őket.
- Az agent útmutatók a magyar nyelvű webhelyhez és a tényleges repószerkezethez igazodnak.
- A README rövid rendszerismertetőre és magyar változásnaplóra hivatkozik.
- A közös tartalomfeltöltési skill új oldalra, blogbejegyzésre, szövegmódosításra, valamint képek hozzáadására és cseréjére is kiterjed.
- A blog buildje és tartalomsegédletei a megosztott fejlesztői scriptek közé kerülnek, a GitHub Actions az új helyről futtatja őket.
- Magyar nyelvű rendszerismertető és tartalmi statisztika foglalja össze az archívum szerkezetét és közzétételét.
- A magyar olvasóknak szóló reportok és fejlesztői útmutatók egységes, közérthető leírást adnak a webhelyről és a közreműködésről.
- Az agent útmutatók a magyar nyelvű webhelyhez és a tényleges repószerkezethez igazodnak.
- A README rövid rendszerismertetőre és magyar változásnaplóra hivatkozik.
- Az AISI-adatok egy Copilot session és 30 felhasználói üzenet ellenőrizhető összesítésére korlátozódnak; az egyedi sessionadatok nem kerülnek a repóba.
- Az AISI-fájlnevek és hivatkozások következetesek, a párhuzamos és más projektekből átvett reportok helyett egyetlen egyeztetett összesítés marad.
- A kapcsolatoldal kattintható elérhetőségeket, a közös fejléc és lábléc pedig kis és nagy képernyőhöz igazodó elrendezést kap.
- A visszaállítható blogképek helyi, reszponzív változatként jelennek meg; a nem elérhető régi forrásokat a build figyelmeztetéssel jelzi.
- A changelog a teljes v2 fejlesztési ívet foglalja össze a WordPress-archívum átvételétől a dokumentáció és reportok rendezéséig.

### Javítva

- A helyben tárolt bejegyzésképek, a manifest és a generált képhivatkozások egyeznek.
- A régi vagy hiányzó helyi képfájlok nem maradnak észrevétlenek: az építés figyelmeztetést ad róluk.
- A helyi build és a GitHub Actions ugyanazokat a fejlesztői szkripteket és függőségeket használja.
