# Development and Validation

This is a static Markdown site for a Hungarian-language website. The build and content utilities live in `.github/site-generator/scripts/`; the Pages workflow is `.github/workflows/pages.yml`.

Run the site build and content checks from the repository root:

```powershell
python -m pip install -r .github/site-generator/scripts/python-extensions.txt
python .github/site-generator/scripts/build_site.py
python .github/site-generator/scripts/verify.py
python .github/site-generator/scripts/check-dist.py
```

The site's look lives in `.github/site-generator/assets/site.css`; content assets (favicon, etc.) live in `CONTENT/assets/`. The build copies both into `dist/assets/` and fails if `site.css` or `favicon.svg` is missing. `check-dist.py` runs in the Pages workflow after the build and blocks deployment if any page lacks the stylesheet or references a missing `/assets/` or `/images/` file. When moving or renaming files, run all three commands before pushing.

The build writes generated output to `dist/`. Do not commit that directory or Python cache files. Preserve the RSS feed format and the configured empty `SITE_BASE_PATH` for the custom domain.
