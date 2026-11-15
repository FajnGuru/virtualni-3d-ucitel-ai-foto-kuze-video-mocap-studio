function buildAllBakedThreeAnimationClips() {
    const clips = [];

    if (timelineSequence.length > 0) {
        const timelineAnim = bakeMotionClipToThreeAnimation('Timeline_Full_Sequence', timelineSequence, 30);
        if (timelineAnim) clips.push(timelineAnim);
    }

    Object.values(MOTION_CATALOG).forEach(motion => {
        const singleAnim = bakeMotionClipToThreeAnimation(motion.id, [{
            type: motion.id,
            duration: motion.defaultDuration,
            speed: 1.0
        }], 30);
        if (singleAnim) clips.push(singleAnim);
    });

    return clips;
}
