function scrubSequence(val) {
    if (timelineSequence.length === 0) return;
    sequenceElapsed = Number(val);
    manualMode = false;
    evaluateAndApplySequenceAtTime(sequenceElapsed);
}
