# Copilot Settings Audit

**VS Code Edition:** {edition}
**Extension Version:** {extension_version}

## Your Configured Settings ({user_count} of {total_count})

```json
{user_settings}
```

## Settings Categories

| Category | Available | Configured |
|----------|-----------|------------|
| Completions (`github.copilot.enable`, `selectedCompletionModel`) | {completions_available} | {completions_configured} |
| Next Edit Suggestions (`nextEditSuggestions.*`) | {nes_available} | {nes_configured} |
| Chat (`chat.*`) | {chat_available} | {chat_configured} |
| Agents (`agent.*`, `claude*`, `background*`) | {agents_available} | {agents_configured} |
| Code Generation (`codeGeneration.*`, `testGeneration.*`) | {codegen_available} | {codegen_configured} |
| Other | {other_available} | {other_configured} |

## Notable Settings You May Want to Review

{notable_settings}

---

Run `copilot settings audit` again anytime to check for new settings after a VS Code update.
