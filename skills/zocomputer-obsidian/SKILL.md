---
name: zocomputer-obsidian
description: Set up Obsidian Web on a user's Zo Computer as a one-prompt, end-to-end workflow. Use whenever the user asks to run Obsidian in a browser on Zo, set up obsidian-web, publish a public readonly Obsidian vault, or create a private password-protected Obsidian Web service, even if they do not explicitly mention this skill.
---

# Zo Computer Obsidian

Set up `obsidian-web` on the user's Zo Computer in one pass. The user should be able to paste one prompt and get a working service without an interview loop.

## Operating Policy

Run the setup end-to-end. Ask a question only when there is no safe default or when using an existing private path could expose user data.

Use these defaults:

- Username: use `$ZO_USER` if set, otherwise `$ZO_HOST_KEY`, otherwise `obsidian`.
- Password: use a provided password if present. If none is provided, generate a strong password via CLI and report it at the end.
- Vault path: use an explicitly provided vault path if present. If none is provided, create a new safe vault and use that.
- Existing vaults: do not scan for or expose existing personal vaults unless the user explicitly asks to connect an existing vault.
- Public readonly mode: never infer an existing vault. Use only an explicitly confirmed public vault path, otherwise create a new public starter vault.

## Password Generation

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
