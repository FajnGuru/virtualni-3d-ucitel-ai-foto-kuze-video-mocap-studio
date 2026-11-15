function switchTab(tabName) {
    ['teacher', 'studio', 'chat', 'library', 'joints'].forEach(t => {
        const btn = document.getElementById(`tabBtn-${t}`);
        const panel = document.getElementById(`tabPanel-${t}`);
        if (!btn || !panel) return;
        if (t === tabName) {
            btn.className = 'py-2 rounded-lg bg-studio-800 text-sky-400 border border-studio-700/80 flex items-center justify-center gap-1 transition';
            panel.classList.remove('hidden');
            panel.classList.add('flex');
        } else {
            btn.className = 'py-2 rounded-lg text-slate-400 hover:text-white flex items-center justify-center gap-1 transition';
            panel.classList.add('hidden');
            panel.classList.remove('flex');
        }
    });
    if (tabName === 'joints') selectJointForInspector(selectedJointId);
}
