function addClipToTimeline(clipConfig, playImmediately = false) {
    const newClip = {
        uid: 'clip_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
        type: clipConfig.type || 'idle',
        name: clipConfig.name || MOTION_CATALOG[clipConfig.type]?.name || 'Vlastní pohyb',
        icon: clipConfig.icon || MOTION_CATALOG[clipConfig.type]?.icon || 'fa-person-rays',
        color: clipConfig.color || MOTION_CATALOG[clipConfig.type]?.color || 'from-sky-500 to-indigo-600',
        duration: Number(clipConfig.duration) || MOTION_CATALOG[clipConfig.type]?.defaultDuration || 3.0,
        speed: Number(clipConfig.speed) || 1.0,
        blendTime: 0.35,
        speech: clipConfig.speech || '',
        boardTitle: clipConfig.boardTitle || '',
        customPose: clipConfig.customPose ? JSON.parse(JSON.stringify(clipConfig.customPose)) : null,
        keyframes: clipConfig.keyframes || null
    };

    timelineSequence.push(newClip);
    recalculateSequenceTimings();
    renderTimelineUI();

    if (playImmediately) {
        sequenceElapsed = newClip.startTime;
        activeClipIndex = -1;
        lastSpokenClipUid = null;
        isPlayingSequence = true;
        manualMode = false;
        updateTransportButtonsUI();
    }
}
