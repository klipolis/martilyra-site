---
name: repo-audit
description: A blog-archívum dokumentációjának, útvonalainak, képjegyzékének és agent skilljeinek ellenőrzése. Akkor használd, ha a repó állapotát vagy a fejlesztői útmutatók egyezőségét kell auditálni.
---

# Repó audit

Az ellenőrzést csak a kért hatókörben végezd. A webhely tartalma magyar, az útmutatók angolok, kivéve a közönségnek szánt `documentation` dokumentációt.

## Ellenőrzési lista

1. Olvasd el a `AGENTS.md` fájlt és az érintett `.agents/` útmutatókat.
2. Ellenőrizd, hogy a README a `docs/README.md` rendszerismertetőre mutat-e.
3. Ellenőrizd, hogy a workflow, a fejlesztői útmutató és a tartalomfeltöltő skill ugyanazokat a `\.github/site-generator/scripts/` útvonalakat használja-e.
4. Ellenőrizd a `CONTENT/` módosítások hatókört, slugokat, helyi képeket és `_manifest.json` bejegyzéseket; csak akkor módosíts tartalmat, ha arra a felhasználó kifejezetten megkért.
5. Keress elavult Claude-skill- és buildszkript-hivatkozásokat az aktív útmutatókban.
6. Ha buildváltozás érintett, futtasd az oldalépítőt és a bejegyzés-ellenőrzőt.

Az audit végén sorold fel a hibákat és a kihagyott ellenőrzéseket; ne állítsd, hogy az audit teljes, ha bármely releváns ellenőrzés kimaradt.
