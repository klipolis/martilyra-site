# Repository Instructions

This repository contains a Hungarian-language static archive of Máté Domokos's website and blog. Keep the website's user-facing content in Hungarian; write these agent instructions in English.

- Bejegyzés URL-je: `https://matedomokos.hu<fájlnév kiterjesztés nélkül>/`
- A gyökér (`/`) a blog-archívum első oldala.
Ez a repó Máté Domokos (Domi) személyes weboldala (matedomokos.hu): Markdown-fájlokból épülő statikus oldal, amely GitHub Pages-en fut.

- Felosztás (2026. október): a matedomokos.hu Domi maga, emberként; az mdmegvalositorendszer.hu (WordPress) az általa alkotott rendszer.

- [Content and language rules](.agents/language-and-content.md)
- [Build, scripts, and validation](.agents/development.md)
- [Documentation and changelog](.agents/documentation.md)
- [Git and release workflow](.agents/git-and-release.md)
- [System overview](./docs/README.md)

Do not edit `CONTENT/` unless the user explicitly requests content changes. Preserve existing public post slugs and URLs. Never include `dist/` or generated Python cache files in commits.
