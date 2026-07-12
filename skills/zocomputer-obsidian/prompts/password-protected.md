Set up a password-protected Obsidian Web vault on my Zo so only I can access my notes from a browser.

Run the setup end-to-end in one pass. Ask me a question only if there is no safe default or if using an existing private path could expose my data.

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
- If I do not provide a password, generate a strong password via CLI using Python's secrets module or openssl, set OBSIDIAN_WEB_PASSWORD to it, and report it to me at the end.
- Set OBSIDIAN_WEB_REALM to "Obsidian Web".

6. Start the server as a managed public Zo HTTP service, not only as a localhost process:

- Use local_port 3000.
- Set the service workdir to obsidian-web/src/server.
- Set the service entrypoint to "node index.js".
- Pass the configured VAULT_PATH, AUTH_MODE, OBSIDIAN_WEB_USERNAME, OBSIDIAN_WEB_PASSWORD, and OBSIDIAN_WEB_REALM as service environment variables.
- Use public=true so I get a browser URL like https://obsidian-web-USER.zocomputer.io. The Obsidian Web AUTH_MODE is the app-level access control.
- Use the label obsidian-web unless it is already occupied. If it is occupied by this app, update it. If it is occupied by something else, use a safe unique label such as obsidian-web-2.
- If you cannot create or update a managed Zo HTTP service, stop and explain the blocker instead of reporting the setup as complete.

After each step, confirm it succeeded before moving on. When the service is running, tell me the HTTP status code from http://127.0.0.1:3000. If it is 302 and redirects to /login, the login page is working. Also verify the managed service URL and report whether it reaches the login page. At the end, report the service URL, vault path, username, generated password if any, local HTTP status, and service URL verification result.
