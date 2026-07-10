# Your notes should have a front door

_A small experiment in plain-text ownership, agent-operated servers, and personal knowledge that can move between private and public space._

I do not want my notes to live inside someone else's product roadmap.

That sounds dramatic until you think about how much of your working memory now lives in software: half-formed ideas, private research, meeting notes, project plans, recipes for future work, lists of what you keep forgetting, fragments of language you want to reuse, and the occasional sentence that feels too true to delete.

For a lot of people, that pile lives in a notes app. For a smaller but stubborn group of us, it lives in plain Markdown files.

That stubbornness is the point.

Markdown is not glamorous. It does not promise a new cognitive paradigm. It does not need a launch video. It is boring in the way a good notebook is boring: you can open it, move it, search it, back it up, sync it, print it, diff it, or abandon the app around it without losing the thing itself.

That is why Obsidian has always made sense to me. The app is useful, but the files are the product. The interface can change. The folder remains.

The tutorial I just published, [Zo Computer: Obsidian](https://ethanthatonekid.github.io/zocomputer-obsidian/), is technically about setting up `obsidian-web` on Zo. It shows how to run an Obsidian web renderer on your own server, point it at a vault, and choose whether that vault should be private or public-read.

But the part I find more interesting is not the web server.

It is the shape of the interaction.

You do not manually perform every step. You copy a prompt into your Zo agent, and the agent operates the machine for you. It clones the repo, installs dependencies, downloads the Obsidian renderer, starts the server, configures authentication, verifies status codes, and reports back.

The tutorial is a guide, but it is also a prompt reference. It is documentation written for both humans and agents.

That feels like a real shift.

## The browser should be a window, not a prison

A lot of web software quietly turns the browser into the source of truth.

Your notes live in the app. Your projects live in the app. Your history lives in the app. Export exists, maybe, but as a concession. The default assumption is that the service owns the shape of the data, and you rent access to it through the interface.

The Obsidian model reverses that. Your vault is a directory. Your notes are files. The app is an interpreter.

`obsidian-web` extends that model into the browser. It loads Obsidian's original renderer and replaces the Electron dependencies with HTTP shims. That means the browser is not a separate notes product. It is a window into the same vault.

That distinction matters.

If the browser is the product, your knowledge moves toward the service. If the browser is a window, the service moves toward your knowledge.

This is the part that feels aligned with Zo. A personal server is most interesting when it does not ask you to become a full-time sysadmin. The computer is yours, but the operational burden should not be. You describe the desired state, and an agent does the mechanical work.

That is a different relationship with infrastructure. Less dashboard clicking. Less ritual. More delegation.

## Private by default, public on purpose

The tutorial has two paths: password-protected (default) and public readonly.

The private mode is the obvious safe default. Put the vault behind authentication. Only you can read or write. If your Obsidian vault contains journal entries, credentials, financial notes, family information, unfinished thoughts, or anything emotionally radioactive, this is the mode you want.

The public mode is more interesting because it forces a question most note-taking tools avoid:

Which parts of your thinking should have a URL?

Not every note should be public. Most notes probably should not be public. But some notes get better when they leave the private garden. Project notes can become working docs. Research can become a public trail. A personal explanation can become a resource for the next person trying to understand the same thing.

Readonly mode creates a useful middle ground: anyone can read, only you can edit.

That is a small configuration detail with a larger implication. Your knowledge base does not have to choose between locked diary and polished publication. It can have zones. A private interior. A public porch. A front door.

The web is still good at that.

## Prompt-native infrastructure

The most practical part of the tutorial is also the weirdest part: the install instructions are prompts.

Not prose around commands. Not a checklist that assumes you are the shell. Actual instructions for an agent:

```text
Set up a password-protected Obsidian Web vault on my Zo so only I can access my notes from a browser.

1. Clone https://github.com/EthanThatOneKid/obsidian-web.git into my home directory and name it obsidian-web.

2. Inside obsidian-web, create the vendor directory and run node scripts/update-obsidian.js to download the Obsidian browser renderer.

3. Install the server dependencies by running npm install inside the src/server directory.

4. Set VAULT_PATH to the absolute path of my Obsidian vault. The default is user-data/demo-vault if I do not set it.

5. Protect the vault with authentication. Set AUTH_MODE to full. Set OBSIDIAN_WEB_USERNAME to ethan. Set OBSIDIAN_WEB_PASSWORD to a strong password. I will provide one when you ask. Set OBSIDIAN_WEB_REALM to "Obsidian Web".

6. Start the server on port 3000.

After each step, confirm it succeeded before moving on. When the server is running, tell me the HTTP status code from http://127.0.0.1:3000. If it is 302, the login page is working.
```

There is still technical specificity here. The prompt names the repo, directories, scripts, environment variables, ports, and verification checks. But the human action is different. You are not doing the setup. You are supervising it.

This is where agentic computing becomes less abstract to me.

The useful version is not "an AI that chats about your server." The useful version is an agent that can operate in a bounded environment, follow explicit instructions, verify each step, stop when something fails, and explain what changed.

The documentation changes too. Good docs for agents need to be unambiguous. They need observable success criteria. They need to say what not to do. They need to preserve user control while removing repetitive labor.

That maps cleanly onto how Wazoo thinks about digital environments: agents need persistent context, auditable memory, and deterministic places to act. A prompt is not magic by itself. It becomes useful when it is attached to a world the agent can inspect and modify.

In this tiny case, the world is a Zo machine and an Obsidian vault.

## The honest caveat

Self-hosting your notes is not automatically safer.

Owning the server means you also own the consequences of misconfiguration. Public-read mode really means public-read. If your vault has secrets in it, do not expose it. If you do not set a password, authentication stays off. If you point the server at the wrong folder, you may publish more than you intended.

That is why I like that the tutorial lets you choose your mode upfront instead of pretending there is one happy path.

The point is not to make risk disappear. The point is to make the boundaries legible.

## Why this feels worth doing

I keep coming back to the same principle: the durable thing should be yours.

For notes, that means files. For infrastructure, that means a machine you can direct. For agents, that means instructions with visible effects and checks. For publishing, that means URLs you control instead of screenshots trapped inside feeds.

Running Obsidian in a browser is a small thing. It will not fix your knowledge system. It will not make your notes coherent. It will not turn a messy vault into a second brain.

But it gives your notes a new surface area without moving the center of gravity away from the files.

That is enough to be interesting.

The future I want is not one where every tool becomes a closed AI workspace. It is one where plain files, personal servers, web interfaces, and agents cooperate. Your data stays legible. Your tools stay replaceable. Your computer becomes easier to command.

The tutorial is a small step in that direction.

Your notes stay yours.

Now they can have a front door.

---

You can read the tutorial here: [Zo Computer: Obsidian](https://ethanthatonekid.github.io/zocomputer-obsidian/).

It is based on [`obsidian-web`](https://github.com/MusiCode1/obsidian-web) by Ethan Davidson.
