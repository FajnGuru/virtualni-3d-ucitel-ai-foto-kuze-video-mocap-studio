# Virtuální 3D Učitel, AI Foto-Kůže & Video MoCap Studio

**Kompletní jemná modularizace — všech 110 funkcí ve vlastních souborech.**

## Struktura

- `js/catalogs.js` — MOTION_CATALOG, JOINT_METADATA, TTS_VOICE_CATALOG
- `js/globals.js` — globální stav a konfigurace avatara
- `functions/` — **110 jednotlivých funkcí**, každá ve vlastním `.js` souboru
- `index.html` — načítá katalogy, globals a všechny funkce ve správném pořadí

### Použití

Otevřete `index.html` v prohlížeči. Všechny skripty se načítají sekvenčně a sdílejí globální scope.

---

*Rozděleno podle jednotlivých funkcí. Všechny soubory nahrány.*
