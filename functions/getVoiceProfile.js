function getVoiceProfile(voiceId) {
    const all = [...TTS_VOICE_CATALOG.male, ...TTS_VOICE_CATALOG.female];
    return all.find(v => v.id === voiceId) || { id: 'Orus', pitch: 1.0, rate: 1.0 };
}
