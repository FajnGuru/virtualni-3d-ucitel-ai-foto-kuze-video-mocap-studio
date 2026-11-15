function openExportStudioModal() {
    const m = document.getElementById('exportStudioModal');
    m.classList.remove('hidden');
    m.classList.add('flex');
    previewMotionsCodeInModal('js');
}
