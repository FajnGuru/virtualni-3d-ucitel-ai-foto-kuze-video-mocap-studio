function onTtsVoiceChange(voiceId) {
    avatarConfig.voiceName = voiceId;
    populateVoiceSelectDropdowns();
    updateAvatarUiBadges();
    showToast(`Vybrán hlas: ${voiceId}`);
}
