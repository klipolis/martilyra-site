# Markdown-hivatkozások és útvonalak

A Markdown-fájlok közötti belső hivatkozásokat a forrásban `.md` fájlcélként add meg. Az oldalépítő a megfelelő belső oldalakra mutató hivatkozásokat a generált webhely útvonalaira alakítja.

A publikus oldalak gyökérútvonalat, a bejegyzések `/blog/<slug>/` útvonalat kapnak. A bejegyzés slugja a fájlnévből származik; meglévő fájlt ne nevezz át külön kérés nélkül, mert a nyilvános URL megváltozhat. Régi útvonal megtartásához használd az `alias` frontmatter-mezőt.

Külső hivatkozásnál az eredeti teljes URL-t használd. A belső útvonal-átalakítás nem változtathatja meg a külső hivatkozásokat.
