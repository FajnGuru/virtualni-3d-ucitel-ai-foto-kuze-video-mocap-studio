function renderPresetLibraryUI() {
    const builtInItems = Object.values(MOTION_CATALOG).filter(m => !m.isGlbNativeClip && !m.id.startsWith('json_'));
    const importedItems = Object.values(MOTION_CATALOG).filter(m => m.isGlbNativeClip || m.id.startsWith('json_'));

    const grid = document.getElementById('presetGrid');
    if (grid) {
        grid.innerHTML = builtInItems.map(item => `
            <button onclick="addClipToTimeline({ type: '${item.id}', isGlbNativeClip: false }, true); showToast('Spuštěn preset: ${item.name}')"
                class="p-2.5 rounded-xl bg-studio-800/90 hover:bg-studio-700 border border-studio-700 flex items-center gap-2.5 text-left transition">
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white shrink-0">
                    <i class="fa-solid ${item.icon} text-xs"></i>
                </div>
                <div class="overflow-hidden">
                    <div class="text-xs font-semibold text-slate-200 truncate">${item.name}</div>
                    <div class="text-[10px] text-slate-400 font-mono">${item.defaultDuration}s • Retarget</div>
                </div>
            </button>
        `).join('');
    }

    const impBanner = document.getElementById('importedGlbClipsBanner');
    const impGrid = document.getElementById('importedPresetGrid');
    const impCount = document.getElementById('importedClipsCountBadge');
    if (impBanner && impGrid) {
        if (importedItems.length > 0) {
            impBanner.classList.remove('hidden');
            if (impCount) impCount.textContent = `${importedItems.length} klipů`;
            impGrid.innerHTML = importedItems.map(item => `
                <button onclick="addClipToTimeline({ type: '${item.id}', isGlbNativeClip: ${!!item.isGlbNativeClip} }, true); showToast('Přehrávám: ${item.name}')"
                    class="p-2 rounded-lg bg-studio-900 hover:bg-emerald-500/20 border border-emerald-500/40 flex items-center gap-2 text-left transition">
                    <div class="w-7 h-7 rounded-md bg-gradient-to-br ${item.color} flex items-center justify-center text-white shrink-0">
                        <i class="fa-solid ${item.icon} text-[10px]"></i>
                    </div>
                    <div class="overflow-hidden">
                        <div class="text-[11px] font-bold text-white truncate">${item.name}</div>
                        <div class="text-[9px] text-emerald-300 font-mono">${item.defaultDuration}s</div>
                    </div>
                </button>
            `).join('');
        } else {
            impBanner.classList.add('hidden');
            impGrid.innerHTML = '';
        }
    }
}
