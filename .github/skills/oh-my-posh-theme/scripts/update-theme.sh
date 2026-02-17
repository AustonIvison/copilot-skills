#!/bin/bash
THEME="$1"
ZSHRC="$HOME/.zshrc"
sed -i '' "s|oh-my-posh init zsh --config '.*'|oh-my-posh init zsh --config 'https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/main/themes/${THEME}.omp.json'|" "$ZSHRC"
echo "Theme updated to: $THEME"