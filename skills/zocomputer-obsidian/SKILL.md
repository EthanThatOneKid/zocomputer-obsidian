---
name: zocomputer-obsidian
description: Set up Obsidian Web on a user's Zo Computer as a one-prompt, end-to-end workflow. Use whenever the user asks to run Obsidian in a browser on Zo, set up obsidian-web, publish a public readonly Obsidian vault, or create a private password-protected Obsidian Web service, even if they do not explicitly mention this skill.
---

# Zo Computer Obsidian

Ensure `obsidian-web` is running on the user's Zo Computer. The user should be able to paste one prompt and get a working service without an interview loop, but do not rerun expensive setup work when the desired state is already present and healthy.

## Operating Policy

Work toward the desired state. Start with a fast-path health check for an existing managed service before cloning, reinstalling dependencies, or downloading renderer assets. Ask a question only when there is no safe default or when using an existing private path could expose user data.

If an existing service already matches the requested mode, points at the requested or default safe vault path, runs from `obsidian-web/src/server`, uses `local_port` 3000, and passes the relevant HTTP verification, stop after reporting that status. Do not run `git pull`, `node scripts/update-obsidian.js`, or `npm install` just to prove the setup path.

Use these defaults:

- Username: use `$ZO_USER` if set, otherwise `$ZO_HOST_KEY`, otherwise `obsidian`.
- Password: use a provided password if present. If none is provided but the matching managed service already has `OBSIDIAN_WEB_PASSWORD`, reuse it and report that the existing password was reused. Generate a new password only when creating the service, adding auth to a service without a password, or explicitly asked to rotate credentials.
- Vault path: use an explicitly provided vault path if present. If none is provided, create a new safe vault and use that.
- Existing vaults: do not scan for or expose existing personal vaults unless the user explicitly asks to connect an existing vault.
- Public readonly mode: never infer an existing vault. Use only an explicitly confirmed public vault path, otherwise create a new public starter vault.

## Password Generation

Do not write generated passwords or service environment variables to `.env`, `.env.local`, config files, shell history, or other files unless the user explicitly asks for a file. Pass secrets directly through the managed service environment API and report the generated password only in the final response.

Generate a shell-safe strong password with Python's `secrets` module when the user does not provide one:

```bash
python3 - <<'PY'
import secrets, string
alphabet = string.ascii_letters + string.digits + string.punctuation
alphabet = alphabet.replace('"', '').replace("'", '').replace('`', '').replace('\\', '').replace('$', '').replace(' ', '')
while True:
    password = ''.join(secrets.choice(alphabet) for _ in range(28))
    if (any(c.islower() for c in password)
        and any(c.isupper() for c in password)
        and any(c.isdigit() for c in password)
        and any(c in string.punctuation for c in password)):
        print(password)
        break
PY
```

## Prompt Variants

Use these copyable prompts as the source of truth for the website:

- [Password-protected setup](prompts/password-protected.md)
- [Public readonly setup](prompts/public-readonly.md)

## Verification

For password-protected setup, verify `http://127.0.0.1:3000` returns `302` and redirects to `/login`.

For public readonly setup, verify unauthenticated visitors can load the app, edit controls are hidden, and unauthenticated vault mutations are denied or no-oped.

Completion requires a managed public Zo HTTP service URL. A localhost-only process is not complete because the user asked for browser access from Zo.

If `node scripts/update-obsidian.js` fails but `vendor/obsidian` already exists and the managed service is healthy, report the updater failure as non-blocking instead of continuing into manual repair. Only repair the renderer install when the app cannot run without it.
