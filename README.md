# Virtuální 3D Učitel, AI Foto-Kůže & Video MoCap Studio

Modularizovaná verze původní monolitické HTML aplikace.

## Struktura

Původní single-file HTML byl rozdělen podle logických sekcí JS kódu (označených komentáři v originále) do jednotlivých souborů v `js/`.

### JS moduly (v pořadí načítání):

1. `01-motion-catalog.js` — Katalog pohybů a 19 kloubů lidské kostry
2. `02-global-state.js` — Globální stav aplikace a konfigurace postavy
3. `03-init-scene-rig.js` — Inicializace 3D scény, kostry, kůže a artikulovaných prstů
4. `04-biomechanics-hands.js` — Realistická biomechanika rukou a artikulace prstů
5. `05-procedural-motion.js` — Procedurální generátor pohybů a póz
6. `06-web-audio-tts.js` — Web Audio Studio Engine (Gemini TTS + audio sběrnice)
7. `07-animation-baker.js` — Pekárna klíčových snímků pro .GLB, .JS a .JSON
8. `08-avatar-editor-modal.js` — Modální editor postavy, nastavení žena/muž a archetypy
9. `09-photo-skin-mocap.js` — Foto-kůže, Video Motion Capture a nahrávání videa
10. `10-classroom-timeline.js` — 3D školní tabule, timeline, výuka a ovládání scény
11. `10b-glb-import-retarget.js` — Import .GLB postavy, retargeting na preset pohyby a import .JSON
12. `11-ui-camera-chat.js` — Nastavení vzhledu, chat a kamera + hlavní init

### Použití

Otevřete `index.html` v prohlížeči (nebo hostujte). Všechny skripty se načítají v pořadí a sdílejí globální scope (jako v originále).

Původní monolitický soubor je v `original/virtu_ln_3d_u_itel_ai_foto_k_e_video_mocap_studio.html` pro referenci.

---

*Rozděleno podle JS logiky a funkcí.*
