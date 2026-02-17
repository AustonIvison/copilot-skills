---
name: oh-my-posh-theme
description: A skill to list available oh-my-posh themes, let the user choose one, and update the .zshrc configuration.
---

# Oh My Posh Theme Change

Use this skill when the user wants to change their oh-my-posh terminal theme.

## Workflow

1. Run the script [list-themes](./scripts/list-themes.js) to fetch available themes from the oh-my-posh GitHub repository.

2. Present the list of themes to the user and ask them to choose one.

3. Run the script [update-theme](./scripts/update-theme.sh) with the chosen theme name as an argument to update ~/.zshrc.

4. Respond with [template{(./TEMPLATE.md)}]