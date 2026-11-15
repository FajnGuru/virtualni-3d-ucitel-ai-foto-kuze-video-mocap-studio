function playAudioBufferThroughStudio(audioBuffer, voiceLabel = 'AI Hlas') {
    const ctx = ensureStudioAudioContext();
    stopAllSpeechAudio();

    const statusEl = document.getElementById('ttsStatusIndicator');
    isCurrentlySpeaking = true;
    if (statusEl) statusEl.textContent = `🔊 Mluví (${voiceLabel} • WebAudio+REC)`;

    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(masterTtsGainNode);
    activeTtsBufferSource = source;

    source.onended = () => {
        if (activeTtsBufferSource === source) {
            isCurrentlySpeaking = false;
            activeTtsBufferSource = null;
            if (statusEl) statusEl.textContent = 'Hlas připraven (WebAudio)';
            const vuBar = document.getElementById('ttsVuMeterBar');
            if (vuBar) vuBar.style.width = '0%';
        }
    };

    source.start(0);
    return audioBuffer.duration;
}
