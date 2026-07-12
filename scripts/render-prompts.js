const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const targets = [
  {
    path: path.join(root, 'hello.html'),
    transform: (content) => content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
    name: 'hello.html',
  },
  {
    path: path.join(root, 'README.md'),
    transform: (content) => content,
    name: 'README.md',
  },
];

const prompts = {
  'password-protected': path.join(root, 'skills', 'zocomputer-obsidian', 'prompts', 'password-protected.md'),
  'public-readonly': path.join(root, 'skills', 'zocomputer-obsidian', 'prompts', 'public-readonly.md'),
};

for (const target of targets) {
  let body = fs.readFileSync(target.path, 'utf8');

  for (const [name, promptPath] of Object.entries(prompts)) {
    const prompt = target.transform(fs.readFileSync(promptPath, 'utf8').trim());
    const pattern = new RegExp(
      `(<!-- prompt:${name}:start -->\\s*)[\\s\\S]*?(\\s*<!-- prompt:${name}:end -->)`,
    );
    if (!pattern.test(body)) {
      throw new Error(`Missing prompt markers for ${name} in ${target.name}`);
    }
    body = body.replace(pattern, `$1${prompt}$2`);
  }

  fs.writeFileSync(target.path, body);
}
