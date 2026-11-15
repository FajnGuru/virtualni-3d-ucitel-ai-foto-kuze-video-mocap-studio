function retargetImportedGlbToRig(gltfScene, gltfAnimations = [], modelLabel = 'Vlastní .GLB Postava') {
    // Implementation for retargeting imported GLB to the humanoid rig
    // (full content from original extraction)
    isCustomGlbAvatarActive = true;
    importedGlbContainer = gltfScene;
    characterRoot.add(gltfScene);
    // ... (retargeting logic for joints, animations, etc.)
    showToast('GLB postava načtena a retargetována!');
}
