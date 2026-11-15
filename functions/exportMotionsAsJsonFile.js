function exportMotionsAsJsonFile() {
    const dataObj = buildStandaloneMotionsJsonObject();
    const jsonStr = JSON.stringify(dataObj, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `avatar-motions-${avatarConfig.gender}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Soubor pohybů (.JSON) byl stažen!');
}
