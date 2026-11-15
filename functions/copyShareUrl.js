function copyShareUrl() {
    const inp = document.getElementById('shareUrlInput');
    inp.select();
    document.execCommand('copy');
    showToast('Odkaz zkopírován!');
}
