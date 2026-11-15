function stopAllSpeechAudio() {
    isCurrentlySpeaking = false;
    clearTimeout(speechSynthTimer);

    if (activeTtsBufferSource) {
        try {
            activeTtsBufferSource.onended = null;
            activeTtsBufferSource.stop();
            activeTtsBufferSource.disconnect();
        } catch (e) {}
        activeTtsBufferSource = null;
    }

    activeFallbackOscillators.forEach(node => {
        try { node.stop(); node.disconnect(); } catch (e) {}
    });
    activeFallbackOscillators = [];

    if ('speechSynthesis' in window) {
        try { window.speechSynthesis.cancel(); } catch (e) {}
    }

    const vuBar = document.getElementById('ttsVuMeterBar');
    if (vuBar) vuBar.style.width = '0%';
}
