function populateVoiceSelectDropdowns() {
    const voices = TTS_VOICE_CATALOG[avatarConfig.gender] || TTS_VOICE_CATALOG.male;
    const html = voices.map(v => `<option value="${v.id}" ${v.id === avatarConfig.voiceName ? 'selected' : ''}>${v.label}</option>`).join('');
    const sel1 = document.getElementById('ttsVoiceSelect');
    const sel2 = document.getElementById('modalTtsVoiceSelect');
    if (sel1) sel1.innerHTML = html;
    if (sel2) sel2.innerHTML = html;
}
