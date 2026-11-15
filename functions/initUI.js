function initUI() {
    renderPresetLibraryUI();

    const select = document.getElementById('jointSelect');
    select.innerHTML = JOINT_METADATA.map(j => `<option value="${j.id}">${j.name}</option>`).join('');

    populateVoiceSelectDropdowns();
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => {};
    }

    loadSampleCurriculum('solar', false);
}
