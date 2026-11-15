function previewMotionsCodeInModal(mode) {
    const area = document.getElementById('exportTextarea');
    if (!area) return;
    if (mode === 'js') {
        area.value = generateStandaloneJsModuleString();
    } else {
        area.value = JSON.stringify(timelineSequence, null, 2);
    }
}
