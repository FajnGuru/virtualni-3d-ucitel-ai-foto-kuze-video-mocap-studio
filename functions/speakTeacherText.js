async function speakTeacherText(text, forceSpeak = false) {
    const ttsToggle = document.getElementById('voiceTtsToggle');
    if (!forceSpeak && (!ttsToggle || !ttsToggle.checked)) return;
    if (!text || !text.trim()) return;

    const cleanText = text.trim();
    const voiceName = avatarConfig.voiceName || (avatarConfig.gender === 'female' ? 'Kore' : 'Orus');
    const profile = getVoiceProfile(voiceName);
    const statusEl = document.getElementById('ttsStatusIndicator');

    ensureStudioAudioContext();
    stopAllSpeechAudio();

    const cacheKey = `${voiceName}::${cleanText}`;
    if (ttsAudioBufferCache.has(cacheKey)) {
        playAudioBufferThroughStudio(ttsAudioBufferCache.get(cacheKey), voiceName);
        return;
    }

    if (statusEl) statusEl.textContent = `⏳ Generuji AI hlas (${voiceName})...`;
    isCurrentlySpeaking = true;

    const audioBuffer = await fetchGeminiTtsAudioBuffer(cleanText, voiceName);
    if (audioBuffer) {
        playAudioBufferThroughStudio(audioBuffer, voiceName);
        return;
    }

    // Fallback pokud Gemini TTS API neodpovědělo:
    isCurrentlySpeaking = true;
    if (statusEl) statusEl.textContent = `🔊 Mluví (${profile.id})...`;

    const estDurationMs = Math.max(2200, Math.min(10000, cleanText.length * 75));
    speechSynthTimer = setTimeout(() => {
        isCurrentlySpeaking = false;
        if (statusEl) statusEl.textContent = 'Hlas připraven';
    }, estDurationMs);

    const hasSpeechSynth = ('speechSynthesis' in window);
    playFallbackSyllableCadenceToRecorder(cleanText, profile, hasSpeechSynth);

    if (hasSpeechSynth) {
        try {
            const utter = new SpeechSynthesisUtterance(cleanText);
            utter.lang = 'cs-CZ';
            utter.pitch = profile.pitch;
            utter.rate = profile.rate;

            const voices = window.speechSynthesis.getVoices();
            const czVoices = voices.filter(v => v.lang.toLowerCase().includes('cs') || v.lang.toLowerCase().includes('cz'));
            if (czVoices.length > 0) {
                utter.voice = czVoices[0];
            }

            utter.onend = () => {
                isCurrentlySpeaking = false;
                clearTimeout(speechSynthTimer);
                if (statusEl) statusEl.textContent = 'Hlas připraven';
            };
            window.speechSynthesis.speak(utter);
        } catch (err) {
            console.warn("Web Speech fallback:", err);
        }
    }
}
