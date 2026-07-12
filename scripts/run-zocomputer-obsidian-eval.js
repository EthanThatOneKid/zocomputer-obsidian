const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const workspaceRoot = path.join(root, 'zocomputer-obsidian-workspace');
const iterationDir = path.join(workspaceRoot, 'iteration-1');

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + '\n');
}

function writeText(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
}

function slug(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function safeEvalPath(value) {
  const normalized = String(value).replace(/\\/g, '/');
  return normalized.includes('/tmp/zocomputer-obsidian-eval/')
    || normalized.includes('obsidian-web-eval-')
    || normalized.includes('obsidian-vault-eval-')
    || normalized.includes('public-obsidian-vault-eval-')
    || normalized.includes('explicit-vault-eval-');
}

function grade(expectations) {
  const passed = expectations.filter((item) => item.passed).length;
  const failed = expectations.length - passed;
  return {
    expectations,
    summary: {
      passed,
      failed,
      total: expectations.length,
      pass_rate: expectations.length === 0 ? 0 : passed / expectations.length,
    },
    execution_metrics: {
      tool_calls: {},
      total_tool_calls: 0,
      total_steps: 1,
      errors_encountered: failed,
      output_chars: JSON.stringify(expectations).length,
      transcript_chars: 0,
    },
    timing: {
      total_duration_seconds: 0,
    },
  };
}

function createRun({ evalId, evalName, prompt, output, expectations, configuration = 'with_skill' }) {
  const evalDir = path.join(iterationDir, `eval-${evalId}-${slug(evalName)}`);
  const runDir = path.join(evalDir, configuration, 'run-1');
  const outputsDir = path.join(runDir, 'outputs');

  writeJson(path.join(evalDir, 'eval_metadata.json'), {
    eval_id: evalId,
    eval_name: evalName,
    prompt,
    assertions: expectations.map((item) => item.text),
  });
  writeText(path.join(outputsDir, 'transcript.md'), output.transcript || '');
  for (const [name, value] of Object.entries(output.files || {})) {
    const target = path.join(outputsDir, name);
    if (typeof value === 'string') writeText(target, value);
    else writeJson(target, value);
  }
  writeJson(path.join(runDir, 'grading.json'), grade(expectations));
  writeJson(path.join(runDir, 'timing.json'), {
    total_tokens: 0,
    duration_ms: 0,
    total_duration_seconds: 0,
  });
}

function runStatic() {
  const config = readJson('evals/static-assertions.json');
  const expectations = [];
  const details = [];

  for (const assertion of config.assertions) {
    const filePath = path.join(root, assertion.file);
    const content = fs.readFileSync(filePath, 'utf8');
    for (const expected of assertion.contains) {
      const passed = content.includes(expected);
      expectations.push({
        text: `${assertion.id}: ${assertion.file} contains ${JSON.stringify(expected)}`,
        passed,
        evidence: passed ? `Found ${JSON.stringify(expected)}` : `Missing ${JSON.stringify(expected)}`,
      });
      details.push({ assertion: assertion.id, file: assertion.file, expected, passed });
    }
  }

  createRun({
    evalId: 0,
    evalName: 'static-prompt-assertions',
    prompt: 'Validate zocomputer-obsidian prompt source files against static policy assertions.',
    output: {
      transcript: '# Static Prompt Assertions\n\nChecked prompt source files for managed-service, safe-default, credential, and final-report requirements.\n',
      files: {
        'static-assertions.json': details,
      },
    },
    expectations,
  });
}

function importZoResults(resultsPath) {
  const results = JSON.parse(fs.readFileSync(path.resolve(resultsPath), 'utf8'));
  results.forEach((result, index) => {
    const teardownPaths = result.teardown && result.teardown.paths ? result.teardown.paths : [];
    const expectations = [
      {
        text: 'Service label is eval-scoped',
        passed: String(result.service_label || '').includes('obsidian-web-eval-'),
        evidence: result.service_label || 'missing service_label',
      },
      {
        text: 'Service URL is present',
        passed: String(result.service_url || '').startsWith('https://'),
        evidence: result.service_url || 'missing service_url',
      },
      {
        text: 'Vault path is eval-scoped',
        passed: safeEvalPath(result.vault_path || ''),
        evidence: result.vault_path || 'missing vault_path',
      },
      {
        text: 'Generated password is present when expected',
        passed: Boolean(result.password),
        evidence: result.password ? 'password present' : 'password missing',
      },
      {
        text: `Local HTTP status is ${result.expected_local_status}`,
        passed: Number(result.local_status) === Number(result.expected_local_status),
        evidence: `local_status=${result.local_status}`,
      },
      {
        text: 'Service URL verification passed',
        passed: Boolean(result.service_url_verification && result.service_url_verification.passed),
        evidence: JSON.stringify(result.service_url_verification || {}),
      },
      {
        text: 'Teardown only touched eval-scoped resources',
        passed: teardownPaths.every(safeEvalPath),
        evidence: JSON.stringify(teardownPaths),
      },
    ];

    createRun({
      evalId: index + 1,
      evalName: result.id || `zo-integration-${index + 1}`,
      prompt: result.prompt || result.description || 'Zo integration eval',
      output: {
        transcript: result.transcript || `# ${result.id}\n\nZo integration eval result imported.\n`,
        files: {
          'setup.json': result.setup || {},
          'service.json': result.service || {},
          'http-checks.json': result.http_checks || {},
          'teardown.json': result.teardown || {},
          'result.json': result,
        },
      },
      expectations,
    });
  });
}

function main() {
  const mode = process.argv[2] || 'static';
  if (mode === 'static') {
    runStatic();
    return;
  }
  if (mode === 'import-zo-results') {
    const resultsPath = process.argv[3];
    if (!resultsPath) throw new Error('Usage: node scripts/run-zocomputer-obsidian-eval.js import-zo-results <results.json>');
    importZoResults(resultsPath);
    return;
  }
  throw new Error(`Unknown mode: ${mode}`);
}

main();
