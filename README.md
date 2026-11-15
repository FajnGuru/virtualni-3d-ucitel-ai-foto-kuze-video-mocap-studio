# Virtuální 3D Učitel, AI Foto-Kůže & Video MoCap Studio

Jemně modularizovaná verze — **každá funkce ve vlastním souboru**.

## Struktura

- `js/catalogs.js` — MOTION_CATALOG, JOINT_METADATA, TTS_VOICE_CATALOG
- `js/globals.js` — všechny globální proměnné a konfigurace avatara
- `functions/` — **110 jednotlivých funkcí**, každá ve vlastním `.js` souboru (pojmenovaném podle funkce)
- `index.html` — načítá vše ve správném pořadí (sdílený globální scope)
- `original/` — původní monolitický HTML

### Použití

Otevřete `index.html` v prohlížeči. Všechny skripty se načítají sekvenčně.

*Rozděleno podle jednotlivých funkcí podle pokynů.*
