function randomizeAvatarAppearance() {
    const skins = ['#f5d0c5', '#eab69f', '#d49a78', '#a66e4e', '#6f442c'];
    const hairs = ['#1c1917', '#3b2618', '#7c2d12', '#ca8a04', '#64748b'];
    const eyes = ['#2563eb', '#16a34a', '#78350f', '#0d9488'];
    const tops = ['#1e3a8a', '#065f46', '#7f1d1d', '#4c1d95', '#334155'];
    const hairStyles = ['short', 'long', 'bun', 'curly'];

    avatarConfig.skinHex = skins[Math.floor(Math.random() * skins.length)];
    avatarConfig.hairHex = hairs[Math.floor(Math.random() * hairs.length)];
    avatarConfig.eyeHex = eyes[Math.floor(Math.random() * eyes.length)];
    avatarConfig.topHex = tops[Math.floor(Math.random() * tops.length)];
    avatarConfig.hairStyle = hairStyles[Math.floor(Math.random() * hairStyles.length)];
    avatarConfig.customFaceImage = null;

    applyAvatarCustomization();
    showToast('Vygenerován náhodný vzhled postavy!');
}
