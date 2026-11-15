function parsePastedGlbOrMotionJson() {
    const rawText = document.getElementById('rawGlbJsonPasteInput')?.value || '';
    if (!rawText.trim()) {
        showToast('Nejprve vložte JSON nebo glTF text do pole!');
        return;
    }
    processImportedMotionJsonString(rawText, 'Vložený glTF/JSON');
}
