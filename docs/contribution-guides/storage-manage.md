# A GitHub-repó kezelése

A GitHub Pages-re telepített webhely a repó `main` ágából épül.

## Hozzáférés

A repó tulajdonosa kezeli a hozzáférést és a jogosultsági szinteket. Csak olyan közreműködő kapjon írási vagy adminisztrátori jogosultságot, akinek erre szüksége van. A hozzáférés módosítását a GitHub **Settings** → **Collaborators** felületén lehet elvégezni.

## Változtatások biztonságos kezelése

- A `main` ág a közzétett webhely forrása.
- Nagyobb vagy közös ellenőrzést igénylő módosítást pull requesten keresztül vezess be.
- Push előtt ellenőrizd a módosításokat, futtasd a buildet és a bejegyzés-ellenőrzőt.
- Ne commitold a `dist/` mappát, a hitelesítő adatokat vagy a helyi AISI-munkamenet-adatokat.
- Történetátírást vagy force push-t csak kifejezett tulajdonosi kérésre végezz.

## Helyi ellenőrzés

```powershell
python -m pip install -r \.github/site-generator/scripts/python-extensions.txt
python \.github/site-generator/scripts/build_site.py
python \.github/site-generator/scripts/ellenorzes.py
```
