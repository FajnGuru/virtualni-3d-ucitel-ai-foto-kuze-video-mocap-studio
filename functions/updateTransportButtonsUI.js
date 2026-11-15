function updateTransportButtonsUI() {
    const icon = document.getElementById('playSequenceIcon');
    const text = document.getElementById('playSequenceText');
    if (isPlayingSequence) {
        if (icon) icon.className = 'fa-solid fa-pause';
        if (text) text.textContent = 'Pozastavit sekvenci';
    } else {
        if (icon) icon.className = 'fa-solid fa-play';
        if (text) text.textContent = 'Spustit celistvou animaci';
    }
}
