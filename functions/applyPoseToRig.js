function applyPoseToRig(pose, baseRoot = { x: 0, z: 0, yaw: 0 }) {
    if (!rig.hips) return;
    const yaw = baseRoot.yaw + (pose.rootYawDelta || 0);
    const forwardX = Math.sin(baseRoot.yaw) * pose.rootPos.z + Math.cos(baseRoot.yaw) * pose.rootPos.x;
    const forwardZ = Math.cos(baseRoot.yaw) * pose.rootPos.z - Math.sin(baseRoot.yaw) * pose.rootPos.x;

    const worldX = baseRoot.x + forwardX;
    const worldZ = baseRoot.z + forwardZ;

    characterRoot.position.set(worldX, 0, worldZ);
    characterRoot.rotation.y = yaw;

    const hipScaleRatio = isCustomGlbAvatarActive ? (importedHipsRestY / 0.98) : 1.0;
    rig.hips.position.set(0, pose.rootPos.y * hipScaleRatio, 0);

    if (rig.groundRing) {
        rig.groundRing.position.x = worldX;
        rig.groundRing.position.z = worldZ;
    }

    JOINT_METADATA.forEach(j => {
        const jointObj = rig[j.id];
        const rot = pose[j.id];
        if (jointObj && rot) {
            const rest = jointObj.userData?.restEuler;
            if (isCustomGlbAvatarActive && rest) {
                jointObj.rotation.set(rest.x + rot.x, rest.y + rot.y, rest.z + rot.z);
            } else {
                jointObj.rotation.set(rot.x, rot.y, rot.z);
            }
        }
    });

    if (isCustomGlbAvatarActive) {
        const tNow = clock ? clock.getElapsedTime() : 0;
        if (importedExtraNodes.earL && importedExtraNodes.earL.userData.restEuler) {
            const re = importedExtraNodes.earL.userData.restEuler;
            importedExtraNodes.earL.rotation.set(
                re.x + Math.sin(tNow * 3.5) * 0.08 - (pose.head?.x || 0) * 0.3,
                re.y,
                re.z + Math.cos(tNow * 2.8) * 0.05
            );
        }
        if (importedExtraNodes.earR && importedExtraNodes.earR.userData.restEuler) {
            const re = importedExtraNodes.earR.userData.restEuler;
            importedExtraNodes.earR.rotation.set(
                re.x + Math.sin(tNow * 3.5 + 0.4) * 0.08 - (pose.head?.x || 0) * 0.3,
                re.y,
                re.z - Math.cos(tNow * 2.8 + 0.4) * 0.05
            );
        }
        const flexArmL = Math.max(0, -(pose.elbowL?.x || 0)) * 0.14;
        const flexArmR = Math.max(0, -(pose.elbowR?.x || 0)) * 0.14;
        const flexKneeL = Math.max(0, (pose.kneeL?.x || 0)) * 0.12;
        const flexKneeR = Math.max(0, (pose.kneeR?.x || 0)) * 0.12;

        const applyMuscleFlex = (node, bulge) => {
            if (!node || !node.userData.restScale) return;
            const rs = node.userData.restScale;
            node.scale.set(rs.x * (1 + bulge), rs.y, rs.z * (1 + bulge));
        };
        applyMuscleFlex(importedExtraNodes.muscles.Muscle_Biceps_L, flexArmL);
        applyMuscleFlex(importedExtraNodes.muscles.Muscle_Triceps_L, flexArmL * 0.6);
        applyMuscleFlex(importedExtraNodes.muscles.Muscle_Biceps_R, flexArmR);
        applyMuscleFlex(importedExtraNodes.muscles.Muscle_Triceps_R, flexArmR * 0.6);
        applyMuscleFlex(importedExtraNodes.muscles.Muscle_Quadriceps_L, flexKneeL);
        applyMuscleFlex(importedExtraNodes.muscles.Muscle_Hamstrings_L, flexKneeL * 0.8);
        applyMuscleFlex(importedExtraNodes.muscles.Muscle_Gastrocnemius_L, flexKneeL * 0.5);
        applyMuscleFlex(importedExtraNodes.muscles.Muscle_Quadriceps_R, flexKneeR);
        applyMuscleFlex(importedExtraNodes.muscles.Muscle_Hamstrings_R, flexKneeR * 0.8);
        applyMuscleFlex(importedExtraNodes.muscles.Muscle_Gastrocnemius_R, flexKneeR * 0.5);
    }

    const hudPos = document.getElementById('hudRootPos');
    if (hudPos) hudPos.textContent = `X: ${worldX.toFixed(2)}  Y: ${(pose.rootPos.y * hipScaleRatio).toFixed(2)}  Z: ${worldZ.toFixed(2)}`;
}
