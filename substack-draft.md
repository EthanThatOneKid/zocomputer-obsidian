# Kill your Notion subscription

_Rebuilding a notes workspace with FOSS, Obsidian, and Zo Computer instead of renting your knowledge base from SaaS._

July's theme is simple: Kill Your SaaS.

Pick a tool you pay for every month and rebuild it on Zo, your way. Cancel the subscription. Own the software. Your CRM, your scheduler, your notes app, that analytics dashboard: make the version that actually fits how you work.

For me, the obvious target is the Notion-shaped part of knowledge work.

Not necessarily Notion the company. Notion is a good product. That is why it is dangerous as a default. It gives you notes, docs, wikis, databases, pages, sharing, permissions, templates, comments, AI, and just enough structure that you can convince yourself the system is yours.

But the center of gravity is still the service.

Your knowledge lives inside someone else's product boundary. Your pages inherit someone else's data model. Your workspace evolves according to someone else's roadmap. Export exists, but as a concession. The default assumption is that the service owns the shape of the work, and you rent access to it through the interface.

I do not want my working memory to live there.

I want the durable thing to be boring. Plain files. Local folders. Markdown. Something I can open, move, search, diff, back up, sync, print, publish, or abandon the app around without losing the thing itself.

That is the part Obsidian gets right: the app is useful, but the files are the product.

The tutorial I just published, [Zo Computer: Obsidian](https://ethanthatonekid.github.io/zocomputer-obsidian/), is technically about setting up `obsidian-web` on Zo. It shows how to run an Obsidian web renderer on your own server, point it at a vault, and choose whether that vault should be private or public-readonly.

But the bigger point is this:

This is a Notion replacement pattern.

Not a Notion clone. Not a worse Notion. A replacement for the part of Notion I actually need: a personal knowledge workspace with a private interior, a public surface, and files I own underneath.

I called the sneak peek ["Killing knowledge work with FOSS + Zo Computer"](https://x.com/etok_me/status/2075991076721377501?s=20). This tutorial is the concrete version: replace the rented knowledge workspace with free software, plain text, and a personal computer that can host the interface for you.

## What Notion gets right

It is worth being honest about why Notion wins.

Notion is not popular because people are wrong. It is popular because it compresses a lot of knowledge-work jobs into one place:

- Write notes.
- Organize projects.
- Build lightweight docs.
- Share a page with a URL.
- Keep private work private.
- Publish polished work when it is ready.
- Let non-technical people edit without thinking about files or servers.

That bundle is real.

The problem is not the bundle. The problem is the ownership model.

When your notes, docs, operating manual, content calendar, personal wiki, and company memory all live in a SaaS workspace, the workspace becomes a landlord. The more useful it gets, the harder it is to leave. The more your work adapts to its primitives, the less portable your thinking becomes.

That is the trade I want to unwind.

## What I do not want to rent

I do not want to rent my notes app.

I do not want to rent URLs for my own writing.

I do not want to rent a private wiki that becomes useless the moment I stop paying.

I do not want my knowledge base to be an account state inside a vendor database.

I do not want AI features stapled onto a closed workspace to become the only convenient way to interact with my own material.

The durable thing should be mine.

For notes, that means files. For infrastructure, that means a machine I can direct. For agents, that means instructions with visible effects and checks. For publishing, that means URLs I control instead of screenshots trapped inside feeds.

This is where Zo becomes interesting.

A personal server is not compelling because I want to become a sysadmin. I do not. It is compelling because an agent can operate the machine for me. I describe the desired state, and the agent performs the mechanical work: clone the repo, install dependencies, configure environment variables, start the service, verify the result, and report back.

That changes the shape of self-hosting. Less dashboard clicking. Less ritual. More delegation.

## The replacement stack

Here is the Notion-shaped bundle rebuilt with FOSS and Zo:

- Notes are Markdown files in an Obsidian vault.
- Docs and wikis are folders, links, backlinks, graph view, and search.
- The browser interface is `obsidian-web`, not a separate notes product.
- Private mode is password-protected Obsidian Web on your Zo.
- Public mode is readonly Obsidian Web: anyone can read, only you can edit.
- Setup is a prompt you paste into Zo, not a weekend of server chores.
- Hosting is a managed Zo HTTP service with a public URL.
- Portability is the folder. Back it up, sync it, version it, move it.

This does not recreate every Notion feature. That is fine. I am not trying to rebuild Notion's business. I am trying to rebuild my knowledge system.

The important inversion is that the browser becomes a window, not a prison.

In most SaaS tools, the browser is the product. Your data moves toward the service. In this setup, the service moves toward your data. `obsidian-web` loads Obsidian's original renderer and replaces the Electron dependencies with HTTP shims. The browser is just another surface over the same vault.

That distinction matters.

If I outgrow the web interface, the notes remain. If I change servers, the notes remain. If I want to publish some of the vault and keep the rest private, I can create zones instead of migrating to a new platform.

The folder is the root of trust.

## Private by default, public on purpose

The tutorial has two paths: password-protected and public readonly.

Password-protected mode is the safe default. Put the vault behind authentication. Only you can read or write. If your Obsidian vault contains journal entries, credentials, financial notes, family information, unfinished thoughts, or anything emotionally radioactive, this is the mode you want.

Public readonly mode is more interesting because it forces a question most note-taking tools avoid:

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

Run the setup end-to-end in one pass. Ask me a question only if there is no safe default or if using an existing private path could expose my data.

1. Clone https://github.com/EthanThatOneKid/obsidian-web.git into my home directory and name it obsidian-web.

2. Inside obsidian-web, create the vendor directory and run node scripts/update-obsidian.js to download the Obsidian browser renderer.

3. Install the server dependencies by running npm install inside the src/server directory.

4. Set VAULT_PATH safely. If I do not provide a vault path, create a new vault at ~/obsidian-vault, add a Welcome.md note, and use that path.

5. Protect the vault with authentication. Set AUTH_MODE to full. Generate a strong password if I do not provide one.

6. Start the server as a managed public Zo HTTP service, not only as a localhost process.

After each step, confirm it succeeded before moving on. When the service is running, tell me the HTTP status code from http://127.0.0.1:3000.
```

There is still technical specificity here. The prompt names the repo, directories, scripts, environment variables, ports, service settings, and verification checks. But the human action is different. You are not doing the setup. You are supervising it.

This is where agentic computing becomes less abstract to me.

The useful version is not "an AI that chats about your server." The useful version is an agent that can operate in a bounded environment, follow explicit instructions, verify each step, stop when something fails, and explain what changed.

The documentation changes too. Good docs for agents need to be unambiguous. They need observable success criteria. They need to say what not to do. They need to preserve user control while removing repetitive labor.

In this tiny case, the world is a Zo machine and an Obsidian vault.

## The honest caveat

Self-hosting your notes is not automatically safer.

Owning the server means you also own the consequences of misconfiguration. Public-read mode really means public-read. If your vault has secrets in it, do not expose it. If you do not set a password, authentication stays off. If you point the server at the wrong folder, you may publish more than you intended.

That is why I like that the tutorial makes you choose your mode upfront instead of pretending there is one happy path.

The point is not to make risk disappear. The point is to make the boundaries legible.

There is also a product caveat: this is not Notion-for-everyone. If you need collaborative databases, rich tables, enterprise permissions, comments, and polished team onboarding, Notion is going to feel better today.

But if what you actually need is a durable personal knowledge base with private notes, public docs, and a browser URL, this stack is already enough to start killing the subscription.

## Cancel the subscription, keep the system

The deeper move is not "use Obsidian instead of Notion."

The deeper move is to stop treating SaaS as the natural home for knowledge work.

Some tools should be services. Some software is worth paying for. But your notes, your operating memory, your private wiki, your research trail, your half-formed writing, your project context: those should not require a subscription to remain yours.

Running Obsidian in a browser is a small thing. It will not fix your knowledge system. It will not make your notes coherent. It will not turn a messy vault into a second brain.

But it gives your notes a web surface without moving the center of gravity away from the files.

That is enough to be interesting.

The future I want is not one where every tool becomes a closed AI workspace. It is one where plain files, personal servers, web interfaces, and agents cooperate. Your data stays legible. Your tools stay replaceable. Your computer becomes easier to command.

Notion is a great product. That is not the point.

The point is that my knowledge system should not require a subscription to remain mine.

Kill the SaaS. Keep the notes.

---

You can read the tutorial here: [Zo Computer: Obsidian](https://ethanthatonekid.github.io/zocomputer-obsidian/).

It is based on [`obsidian-web`](https://github.com/MusiCode1/obsidian-web) by Ethan Davidson.
