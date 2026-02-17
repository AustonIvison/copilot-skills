---
name: copilot-settings-audit
description: A skill to audit and explore available GitHub Copilot settings in VS Code, comparing what's configured vs what's available.
---

# Copilot Settings Audit

Use this skill when the user wants to check, audit, or explore GitHub Copilot settings in VS Code.

Trigger phrases: "copilot settings", "copilot settings audit", "what copilot settings are available", "check copilot config"

## Workflow

1. Run the script [audit-copilot-settings](./scripts/audit-copilot-settings.js) to discover all available `github.copilot.*` settings from the installed Copilot extension and compare them against the user's current settings.json.

2. Summarize the results for the user:
   - How many total settings are available vs how many they've configured
   - Show their current configured settings
   - Highlight notable settings they may want to enable/disable
   - Group settings by category (completions, chat, NES, agents, etc.)

3. If the user asks about a specific setting, provide its type, default value, and description from the extension metadata.

4. If the user wants to change a setting, explain what it does and what value to set.

5. Respond with [template{(./TEMPLATE.md)}]
