function createNeutralPose() {
    const pose = { rootPos: { x: 0, y: 0.98, z: 0 }, rootYawDelta: 0 };
    JOINT_METADATA.forEach(j => { pose[j.id] = { x: 0, y: 0, z: 0 }; });
    pose.shoulderL.z = -0.15;
    pose.shoulderR.z = 0.15;
    pose.elbowL.x = -0.18;
    pose.elbowR.x = -0.18;
    return pose;
}
