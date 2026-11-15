function addCustomTeacherStep() {
    const speech = document.getElementById('customStepSpeech').value.trim();
    const motion = document.getElementById('customStepMotion').value;
    const title = document.getElementById('lessonTitleInput').value || 'Výuka';
    if (!speech) {
        showToast('Zadejte větu pro učitele!');
        return;
    }
    addClipToTimeline({
        type: motion,
        duration: Math.max(3.2, Math.min(8, Math.round(speech.length / 13))),
        speech: speech,
        boardTitle: title
    }, true);
    document.getElementById('customStepSpeech').value = '';
}
