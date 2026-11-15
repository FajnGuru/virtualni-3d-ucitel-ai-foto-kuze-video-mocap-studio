function handleVideoFileSelected(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const video = document.getElementById('mocapSourceVideo');
    video.src = URL.createObjectURL(file);
    video.classList.remove('hidden');
    video.play();
    showToast('Video načteno – klikněte na Převést na 3D pohyb');
}
