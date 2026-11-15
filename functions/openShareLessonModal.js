function openShareLessonModal() {
    const baseUrl = window.location.href.split('?')[0];
    document.getElementById('shareUrlInput').value = `${baseUrl}?mode=student`;
    const m = document.getElementById('shareLessonModal');
    m.classList.remove('hidden'); m.classList.add('flex');
}
