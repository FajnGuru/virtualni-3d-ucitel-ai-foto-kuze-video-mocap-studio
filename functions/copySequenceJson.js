function copySequenceJson() {
    const area = document.getElementById('exportTextarea');
    area.select();
    document.execCommand('copy');
    showToast('Kód zkopírován do schránky!');
}
