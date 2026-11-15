function animateLoop() {
    requestAnimationFrame(animateLoop);
    const dt = Math.min(clock.getDelta(), 0.1);
    const elapsedTotal = clock.getElapsedTime();

    frameCount++;
    const now = performance.now();
    if (now - lastFpsUpdate >= 500) {
        const fpsEl = document.getElementById('fpsCounter');
        if (fpsEl) fpsEl.textContent = `${Math.round((frameCount * 1000) / (now - lastFpsUpdate))} FPS`;
        frameCount = 0;
        lastFpsUpdate = now;
    }

    if (isPlayingSequence && timelineSequence.length > 0) {
        sequenceElapsed += dt;
        if (sequenceElapsed >= totalSequenceDuration) {
            if (document.getElementById('loopSequenceToggle').checked) {
                sequenceElapsed = 0;
                activeClipIndex = -1;
                lastSpokenClipUid = null;
            } else {
                sequenceElapsed = totalSequenceDuration;
                isPlayingSequence = false;
                updateTransportButtonsUI();

                if (isRecordingCanvas && isRecordingFullLessonAutoStop) {
                    setTimeout(() => {
                        if (isRecordingCanvas) toggleCanvasVideoRecording();
                    }, 450);
                }
            }
        }
        document.getElementById('currentTimeLabel').textContent = `${sequenceElapsed.toFixed(1)}s`;
        document.getElementById('timelineScrubber').value = sequenceElapsed;
        evaluateAndApplySequenceAtTime(sequenceElapsed);
    } else if (!manualMode) {
        const idlePose = evaluateClipPose({ type: 'idle', duration: 4, speed: 1 }, elapsedTotal);
        const curBase = clipStartRootStates[activeClipIndex] || { x: 0, z: 0, yaw: 0 };

        const mouthOpen = getLiveTtsMouthAperture(elapsedTotal);
        if (rig.jaw) {
            const baseJawY = rig.jaw.userData?.restPos ? rig.jaw.userData.restPos.y : 0.03;
            rig.jaw.position.y = baseJawY - mouthOpen;
        }
        if (skinParts.skinJaw && !isCustomGlbAvatarActive) skinParts.skinJaw.position.y = 0.035 - mouthOpen;

        applyPoseToRig(idlePose, curBase);
    }

    updateCameraPosition();
    renderer.render(scene, camera);
}
