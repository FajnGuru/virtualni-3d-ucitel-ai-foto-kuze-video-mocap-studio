function applyAvatarArchetype(arch) {
    avatarConfig.customFaceImage = null;
    if (arch === 'prof_male') {
        setAvatarGender('male');
        Object.assign(avatarConfig, { hairStyle: 'short', hairHex: '#475569', beardStyle: 'full', glassesStyle: 'reading', outfitStyle: 'suit', topHex: '#1e293b', pantsHex: '#0f172a', voiceName: 'Orus' });
    } else if (arch === 'teacher_female') {
        setAvatarGender('female');
        Object.assign(avatarConfig, { hairStyle: 'long', hairHex: '#7c2d12', glassesStyle: 'reading', outfitStyle: 'skirtsuit', topHex: '#831843', pantsHex: '#1e1b4b', voiceName: 'Kore' });
    } else if (arch === 'scientist_female') {
        setAvatarGender('female');
        Object.assign(avatarConfig, { hairStyle: 'bun', hairHex: '#1c1917', eyeHex: '#10b981', glassesStyle: 'reading', outfitStyle: 'labcoat', pantsHex: '#1e293b', voiceName: 'Aoede' });
    } else if (arch === 'coach_male') {
        setAvatarGender('male');
        applyBodyPreset('athletic');
        Object.assign(avatarConfig, { hairStyle: 'short', hairHex: '#ca8a04', beardStyle: 'none', glassesStyle: 'none', outfitStyle: 'sport', topHex: '#dc2626', pantsHex: '#18181b', voiceName: 'Puck' });
    }
    populateVoiceSelectDropdowns();
    syncModalSlidersWithConfig();
    applyAvatarCustomization();
    showToast('Archetyp postavy a hlas nastaven!');
}
