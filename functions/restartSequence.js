function restartSequence() {
    recalculateSequenceTimings();
    sequenceElapsed = 0;
    activeClipIndex = -1;
    lastSpokenClipUid = null;
    isPlayingSequence = timelineSequence.length > 0;
    manualMode = false;
    updateTransportButtonsUI();
}
