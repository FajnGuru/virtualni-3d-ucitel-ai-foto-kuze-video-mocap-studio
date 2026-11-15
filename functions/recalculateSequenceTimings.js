function recalculateSequenceTimings() {
    let accTime = 0;
    clipStartRootStates = [];
    let curRoot = { x: 0, z: 0, yaw: 0 };

    timelineSequence.forEach((clip, idx) => {
        clip.startTime = accTime;
        clip.endTime = accTime + clip.duration;
        accTime = clip.endTime;
        clipStartRootStates[idx] = { ...curRoot };

        const endPose = evaluateClipPose(clip, clip.duration);
        curRoot.x += Math.sin(curRoot.yaw) * endPose.rootPos.z + Math.cos(curRoot.yaw) * endPose.rootPos.x;
        curRoot.z += Math.cos(curRoot.yaw) * endPose.rootPos.z - Math.sin(curRoot.yaw) * endPose.rootPos.x;
        curRoot.yaw += (endPose.rootYawDelta || 0);
    });

    totalSequenceDuration = accTime;
    document.getElementById('totalTimeLabel').textContent = `${totalSequenceDuration.toFixed(1)}s`;
    document.getElementById('timelineScrubber').max = Math.max(totalSequenceDuration, 0.1);
}
