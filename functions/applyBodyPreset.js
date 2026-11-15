function applyBodyPreset(preset) {
    avatarConfig.bodyPreset = preset;
    if (preset === 'slim') {
        avatarConfig.shoulderWidth = 0.88; avatarConfig.torsoWidth = 0.84; avatarConfig.waistWidth = 0.76; avatarConfig.hipWidth = 0.88; avatarConfig.limbThickness = 0.82;
    } else if (preset === 'average') {
        avatarConfig.shoulderWidth = 1.0; avatarConfig.torsoWidth = 1.0; avatarConfig.waistWidth = 0.92; avatarConfig.hipWidth = 1.0; avatarConfig.limbThickness = 1.0;
    } else if (preset === 'athletic') {
        avatarConfig.shoulderWidth = 1.22; avatarConfig.torsoWidth = 1.08; avatarConfig.waistWidth = 0.82; avatarConfig.hipWidth = 0.95; avatarConfig.limbThickness = 1.14;
    } else if (preset === 'curvy') {
        avatarConfig.shoulderWidth = 0.94; avatarConfig.torsoWidth = 0.96; avatarConfig.waistWidth = 0.72; avatarConfig.hipWidth = 1.24; avatarConfig.bustSize = 1.15;
    } else if (preset === 'heavy') {
        avatarConfig.shoulderWidth = 1.15; avatarConfig.torsoWidth = 1.32; avatarConfig.waistWidth = 1.30; avatarConfig.hipWidth = 1.25; avatarConfig.limbThickness = 1.25;
    } else if (preset === 'tall') {
        avatarConfig.height = 1.12;
    }
    syncModalSlidersWithConfig();
    applyAvatarCustomization();
}
