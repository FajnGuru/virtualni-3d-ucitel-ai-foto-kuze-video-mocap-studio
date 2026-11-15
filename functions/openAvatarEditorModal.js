function openAvatarEditorModal() {
    const modal = document.getElementById('avatarEditorModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    syncModalSlidersWithConfig();
    generateProceduralFaceTexture();
}
