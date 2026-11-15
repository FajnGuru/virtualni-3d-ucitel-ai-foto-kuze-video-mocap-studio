function blendPoses(poseA, poseB, alpha) {
    const t = alpha * alpha * (3 - 2 * alpha);
    const result = createNeutralPose();
    result.rootPos.x = THREE.MathUtils.lerp(poseA.rootPos.x, poseB.rootPos.x, t);
    result.rootPos.y = THREE.MathUtils.lerp(poseA.rootPos.y, poseB.rootPos.y, t);
    result.rootPos.z = THREE.MathUtils.lerp(poseA.rootPos.z, poseB.rootPos.z, t);
    result.rootYawDelta = THREE.MathUtils.lerp(poseA.rootYawDelta || 0, poseB.rootYawDelta || 0, t);

    JOINT_METADATA.forEach(j => {
        const a = poseA[j.id] || { x: 0, y: 0, z: 0 };
        const b = poseB[j.id] || { x: 0, y: 0, z: 0 };
        result[j.id] = {
            x: THREE.MathUtils.lerp(a.x, b.x, t),
            y: THREE.MathUtils.lerp(a.y, b.y, t),
            z: THREE.MathUtils.lerp(a.z, b.z, t)
        };
    });
    return result;
}
