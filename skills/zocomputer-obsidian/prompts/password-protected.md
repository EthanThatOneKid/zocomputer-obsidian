Set up a password-protected Obsidian Web vault on my Zo so only I can access my notes from a browser.

Ensure the desired state in one pass. Ask me a question only if there is no safe default or if using an existing private path could expose my data.

Fast path before setup:

- First check whether a managed Zo service labeled obsidian-web already exists.
- If it exists, is enabled, mode=http, public=true, local_port=3000, workdir is obsidian-web/src/server, entrypoint is "node index.js", AUTH_MODE=full, has OBSIDIAN_WEB_PASSWORD set, uses the requested vault path or the default safe vault path below, and http://127.0.0.1:3000 redirects to /login, do not reinstall, rerun renderer downloads, or rotate credentials. Just verify the managed URL reaches /login and report the existing status.
- If only VAULT_PATH differs and I explicitly provided the new vault path, update only VAULT_PATH while preserving the existing auth credentials.
- Batch independent checks where possible.

1. Clone https://github.com/EthanThatOneKid/obsidian-web.git into my home directory and name it obsidian-web. If obsidian-web already exists, reuse it and pull the latest changes if safe.

2. Inside obsidian-web, create the vendor directory and run node scripts/update-obsidian.js to download the Obsidian browser renderer.

3. Install the server dependencies by running npm install inside the src/server directory.

4. Set VAULT_PATH safely:

- If I explicitly provide an Obsidian vault path in this prompt, use that absolute path.
- If I do not provide a vault path, create a new vault at ~/obsidian-vault, add a Welcome.md note, and use that path.
- Do not scan for or expose existing personal vaults unless I explicitly ask you to connect an existing vault.

5. Protect the vault with authentication:

- Set AUTH_MODE to full.
- Set OBSIDIAN_WEB_USERNAME to $ZO_USER if it is set, otherwise $ZO_HOST_KEY, otherwise obsidian.
- If I provide OBSIDIAN_WEB_PASSWORD in this prompt, use it.
- If I do not provide a password and a matching managed service already has OBSIDIAN_WEB_PASSWORD set, reuse the existing password and report that it was reused.
- If I do not provide a password and no matching managed service password exists, generate a strong password via CLI using Python's secrets module or openssl, set OBSIDIAN_WEB_PASSWORD to it, and report it to me at the end.
- Set OBSIDIAN_WEB_REALM to "Obsidian Web".
- Do not write OBSIDIAN_WEB_PASSWORD or other service environment variables to .env, .env.local, config files, shell history, or any other file unless I explicitly ask for a file.

6. Start the server as a managed public Zo HTTP service, not only as a localhost process:

- Use local_port 3000.
- Set the service workdir to obsidian-web/src/server.
- Set the service entrypoint to "node index.js".
- Pass the configured VAULT_PATH, AUTH_MODE, OBSIDIAN_WEB_USERNAME, OBSIDIAN_WEB_PASSWORD, and OBSIDIAN_WEB_REALM as service environment variables.
- Use public=true so I get a browser URL like https://obsidian-web-USER.zocomputer.io. The Obsidian Web AUTH_MODE is the app-level access control.
- Use the label obsidian-web unless it is already occupied. If it is occupied by this app, update it. If it is occupied by something else, use a safe unique label such as obsidian-web-2.
- If you cannot create or update a managed Zo HTTP service, stop and explain the blocker instead of reporting the setup as complete.

Installer fallback:

- If node scripts/update-obsidian.js fails but vendor/obsidian already exists and the service reaches /login, treat the installer failure as non-blocking and report it instead of manually repairing the renderer.

When the service is running, tell me the HTTP status code from http://127.0.0.1:3000. If it is 302 and redirects to /login, the login page is working. Also verify the managed service URL and report whether it reaches the login page. At the end, report only the service URL, vault path, username, whether the password was generated or reused, generated password if any, local HTTP status, and service URL verification result.
