function evaluateAndApplySequenceAtTime(timeSec) {
    if (timelineSequence.length === 0) return;
    let foundIdx = timelineSequence.findIndex(c => timeSec >= c.startTime && timeSec <= c.endTime);
    if (foundIdx === -1) foundIdx = timelineSequence.length - 1;

    const clip = timelineSequence[foundIdx];

    if (foundIdx !== activeClipIndex) {
        activeClipIndex = foundIdx;
        renderTimelineUI();
        const lessonTitle = document.getElementById('lessonTitleInput')?.value || 'Výuková lekce';
        const speechStr = clip.speech || `Provádím pohyb: ${clip.name}`;
        currentStepSpeechText = speechStr;

        updateSmartboardTexture(clip.boardTitle || lessonTitle, speechStr, foundIdx + 1, timelineSequence.length);

        document.getElementById('teacherSpeechTextDisplay').textContent = clip.speech ? `„${clip.speech}“` : `(${clip.name})`;
        document.getElementById('subtitleStepCounter').textContent = `Krok ${foundIdx + 1} / ${timelineSequence.length}`;
        document.getElementById('subtitleTopicBadge').textContent = clip.boardTitle || lessonTitle;

        if (isPlayingSequence && clip.speech && lastSpokenClipUid !== clip.uid) {
            lastSpokenClipUid = clip.uid;
            speakTeacherText(clip.speech, false);
        }
    }

    const localTime = Math.max(0, timeSec - clip.startTime);
    const baseRoot = clipStartRootStates[foundIdx] || { x: 0, z: 0, yaw: 0 };

    if (clip.isGlbNativeClip && importedGlbMixer && importedGlbAnimationsMap[clip.type]) {
        const glbAnim = importedGlbAnimationsMap[clip.type];
        importedGlbMixer.stopAllAction();
        const action = importedGlbMixer.clipAction(glbAnim);
        action.play();
        const loopedTime = glbAnim.duration > 0 ? ((localTime * (clip.speed || 1.0)) % glbAnim.duration) : 0;
        importedGlbMixer.setTime(loopedTime);

        characterRoot.position.set(baseRoot.x, 0, baseRoot.z);
        characterRoot.rotation.y = baseRoot.yaw;
        if (rig.groundRing && rig.hips) {
            rig.groundRing.position.x = baseRoot.x + rig.hips.position.x;
            rig.groundRing.position.z = baseRoot.z + rig.hips.position.z;
        }
        document.getElementById('currentActionBadge').textContent = `${foundIdx + 1}/${timelineSequence.length}: ${clip.name} [GLB]`;
        return;
    } else if (importedGlbMixer) {
        importedGlbMixer.stopAllAction();
    }

    let currentPose = evaluateClipPose(clip, localTime);

    const blendWindow = Math.min(clip.blendTime || 0.35, clip.duration * 0.45);
    if (foundIdx > 0 && localTime < blendWindow) {
        const prevClip = timelineSequence[foundIdx - 1];
        if (!prevClip.isGlbNativeClip) {
            const prevEndPose = evaluateClipPose(prevClip, prevClip.duration);
            prevEndPose.rootPos.x = 0; prevEndPose.rootPos.z = 0; prevEndPose.rootYawDelta = 0;
            currentPose = blendPoses(prevEndPose, currentPose, localTime / blendWindow);
        }
    }

    document.getElementById('currentActionBadge').textContent = `${foundIdx + 1}/${timelineSequence.length}: ${clip.name}`;

    const mouthOpen = (isCurrentlySpeaking || (isPlayingSequence && clip.speech))
        ? getLiveTtsMouthAperture(timeSec)
        : 0;
    if (rig.jaw) {
        const baseJawY = rig.jaw.userData?.restPos ? rig.jaw.userData.restPos.y : 0.03;
        rig.jaw.position.y = baseJawY - mouthOpen;
    }
    if (skinParts.skinJaw && !isCustomGlbAvatarActive) skinParts.skinJaw.position.y = 0.035 - mouthOpen;

    applyPoseToRig(currentPose, baseRoot);
}
