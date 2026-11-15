function exportMotionsAsJsModule() {
    const jsCode = generateStandaloneJsModuleString();
    const blob = new Blob([jsCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `avatar-motions.js`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Samostatný modul pohybů (avatar-motions.js) byl stažen!');
}
