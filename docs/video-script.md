# Video script: "Obsidian in Any Browser with Zo"

**Target:** ~2.5 min, single continuous recording  
**Format:** One fluid take. All windows pre-opened, ready to switch between.  
**Tone:** Direct, confident, relaxed. No fluff.

---

## Prep — open these before recording

- **Tab 1:** `zocomputer-obsidian` setup page (`hello.html`)
- **Tab 2:** `obsidian-web` instance on Zo (login page showing — pre-loaded after a test run so it is ready)
- **Window:** Zo chat, fresh session, cursor in the input field
- **Desktop:** Clean wallpaper, no icons. All three windows arranged in a stack so alt-tabbing is one tap each.

---

## Run of show — one continuous take

| Cue | Screen | Audio |
|-----|--------|-------|
| 1 | Face cam centered, plain background | "You can run Obsidian in any browser from your own Zo. Let me show you how." |
| 2 | Switch to **Tab 1** — setup page. Scroll down slowly past the password-protected prompt, pause on the public readonly prompt, then scroll back up to password-protected. Click the copy button. | "Two modes here. Password-protected is the default — only you can read and write. Or public readonly — anyone can view, only you can edit. I will go with password-protected. Copy the prompt." |
| 3 | Switch to **Zo window**. Paste the prompt. Hit enter. Agent starts streaming output. | "Paste it into Zo and hit enter. One prompt, the agent does the rest." |
| 4 | Zo streams clone, npm install, renderer download, config, server start. Let it run at real speed. Keep talking over it. | "It is cloning obsidian-web, installing the server dependencies, downloading the browser renderer, setting the vault path, configuring auth, then starting the server. About 50 seconds end to end." |
| 5 | Zo shows HTTP 302 — login page is live | "And there it is — 302. The login page is up." |
| 6 | Switch to **Tab 2** — obsidian-web login page. Type credentials. Hit enter. Vault loads. Click open a note. Click into search. | "Open a browser tab, log in with the credentials you gave the agent, and there is your vault. Every note, every folder, graph view — it is all there. The real Obsidian frontend, served from your Zo." |
| 7 | Switch to face cam | "Link in the description. Your notes stay yours. Now they have a front door." |

---

## Production notes

- **Single take.** Press record once. Switch between pre-opened windows by alt-tab. No cuts.
- **Face cam:** picture-in-picture corner overlay for the whole video, or start full-frame then shrink to corner after cue 1. Up to you.
- **Screen recording:** OBS, 1920x1080. Browser window ~1200px wide, centered. Cursor visible.
- **Zo pacing:** Let it run at real speed. Talk over it — the execution is the visual, your voice carries the timeline.
- **End card:** Static — QR code to tutorial URL + "Zo Computer: Obsidian" text. Hold 3 seconds. Either record it as the last 3 seconds of the take or add it in editing.

## Recording checklist

- [ ] Tab 1 — setup page, scrolled to the password-protected prompt, copy button visible
- [ ] Tab 2 — obsidian-web login page, pre-loaded and ready
- [ ] Zo window — fresh session, cursor in input
- [ ] Arrange windows so alt-tab cycles in order: Tab 1 → Zo → Tab 2
- [ ] Test-run the prompt beforehand so you know the expected output and timing
- [ ] Press record, click through in order, stop at end card
