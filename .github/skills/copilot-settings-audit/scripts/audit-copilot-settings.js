const fs = require('fs');
const path = require('path');
const os = require('os');

// Determine VS Code edition and paths
const isInsiders = process.env.VSCODE_EDITION === 'insiders' ||
  fs.existsSync(path.join(os.homedir(), '.vscode-insiders'));

const extensionsDir = path.join(
  os.homedir(),
  isInsiders ? '.vscode-insiders' : '.vscode',
  'extensions'
);

const settingsPath = path.join(
  os.homedir(),
  'Library', 'Application Support',
  isInsiders ? 'Code - Insiders' : 'Code',
  'User', 'settings.json'
);

// Find the Copilot Chat extension (which contains the copilot settings definitions)
function findCopilotExtension() {
  const entries = fs.readdirSync(extensionsDir);
  const copilotDir = entries.find(e => e.startsWith('github.copilot-chat-'));
  if (!copilotDir) {
    console.error('Could not find GitHub Copilot Chat extension');
    process.exit(1);
  }
  return path.join(extensionsDir, copilotDir, 'package.json');
}

// Extract all github.copilot.* settings from extension package.json
function getAvailableSettings(packageJsonPath) {
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const configs = Array.isArray(pkg.contributes?.configuration)
    ? pkg.contributes.configuration
    : [pkg.contributes?.configuration].filter(Boolean);

  const settings = {};
  for (const config of configs) {
    if (!config.properties) continue;
    for (const [key, value] of Object.entries(config.properties)) {
      if (key.startsWith('github.copilot')) {
        settings[key] = {
          type: value.type,
          default: value.default,
          description: (value.markdownDescription || value.description || '').replace(/\n/g, ' ').slice(0, 200),
          enum: value.enum,
          scope: value.scope
        };
      }
    }
  }
  return settings;
}

// Read user's current settings
function getUserSettings() {
  try {
    const raw = fs.readFileSync(settingsPath, 'utf8');
    // Strip comments (simple approach for JSONC)
    const stripped = raw.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
    return JSON.parse(stripped);
  } catch {
    return {};
  }
}

// Main
const packageJsonPath = findCopilotExtension();
const available = getAvailableSettings(packageJsonPath);
const userSettings = getUserSettings();

const userCopilotSettings = {};
for (const key of Object.keys(userSettings)) {
  if (key.startsWith('github.copilot')) {
    userCopilotSettings[key] = userSettings[key];
  }
}

const output = {
  edition: isInsiders ? 'VS Code Insiders' : 'VS Code',
  extensionPackageJson: packageJsonPath,
  settingsJsonPath: settingsPath,
  totalAvailableSettings: Object.keys(available).length,
  totalUserConfigured: Object.keys(userCopilotSettings).length,
  userConfigured: userCopilotSettings,
  available: available
};

console.log(JSON.stringify(output, null, 2));
