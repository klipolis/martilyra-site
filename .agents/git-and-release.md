# Git and Release Workflow

- Make only changes requested by the user. Do not edit `CONTENT/` unless the user explicitly asks for content work.
- Do not stage, commit, push, or rewrite history unless the user explicitly requests the relevant Git operation.
- Preserve public routes and post slugs. If a slug must change at the user's request, keep the old route as an alias.
- Use short Hungarian commit messages for content changes and descriptive messages for system changes.
- Never commit `dist/`, credentials, or generated Python cache files.
- Before pushing, inspect the branch and remote state. Rewrite shared history only when the user explicitly asks for it.
