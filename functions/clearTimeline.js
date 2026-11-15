function clearTimeline() {
    timelineSequence = [];
    isPlayingSequence = false;
    sequenceElapsed = 0;
    activeClipIndex = -1;
    stopAllSpeechAudio();
    renderTimelineUI();
    updateTransportButtonsUI();
}
