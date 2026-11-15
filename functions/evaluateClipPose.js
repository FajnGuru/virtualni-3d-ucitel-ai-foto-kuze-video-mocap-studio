function evaluateClipPose(clip, localTime) {
    const pose = createNeutralPose();
    const speed = clip.speed || 1.0;
    const t = localTime * speed;
    const progress = Math.min(Math.max(localTime / Math.max(clip.duration, 0.1), 0), 1);

    if (clip.type === 'customPose' && clip.customPose) {
        JOINT_METADATA.forEach(j => {
            if (clip.customPose[j.id]) pose[j.id] = { ...clip.customPose[j.id] };
        });
        applyHumanArmBiomechanics(pose, t, 'explain');
        return pose;
    }

    if (clip.type === 'videoMoCap' && Array.isArray(clip.keyframes) && clip.keyframes.length > 0) {
        const kfCount = clip.keyframes.length;
        if (kfCount === 1) return clip.keyframes[0];
        const scaled = progress * (kfCount - 1);
        const idxA = Math.floor(scaled);
        const idxB = Math.min(kfCount - 1, idxA + 1);
        const alpha = scaled - idxA;
        const blended = blendPoses(clip.keyframes[idxA], clip.keyframes[idxB], alpha);
        applyHumanArmBiomechanics(blended, t, 'explain');
        return blended;
    }

    if (importedJsonKeyframesMap[clip.type]) {
        const kfs = importedJsonKeyframesMap[clip.type];
        if (kfs.length === 1) return kfs[0];
        const scaled = progress * (kfs.length - 1);
        const idxA = Math.floor(scaled);
        const idxB = Math.min(kfs.length - 1, idxA + 1);
        const alpha = scaled - idxA;
        const blended = blendPoses(kfs[idxA], kfs[idxB], alpha);
        applyHumanArmBiomechanics(blended, t, 'explain');
        return blended;
    }

    switch (clip.type) {
        case 'explain': {
            pose.rootPos.y = 0.98 + Math.sin(t * 2.4) * 0.012;
            pose.spine.x = 0.04 + Math.sin(t * 2.0) * 0.03;
            pose.chest.y = Math.sin(t * 1.7) * 0.14;
            pose.head.y = Math.sin(t * 1.4) * 0.16;
            pose.head.x = Math.sin(t * 3.0) * 0.07;
            pose.shoulderL.x = -0.52 - Math.sin(t * 3.2) * 0.22;
            pose.shoulderR.x = -0.52 + Math.cos(t * 3.2) * 0.22;
            pose.shoulderL.z = -0.28 - Math.abs(Math.sin(t * 2.4)) * 0.25;
            pose.shoulderR.z = 0.28 + Math.abs(Math.cos(t * 2.4)) * 0.25;
            pose.elbowL.x = -1.12 + Math.sin(t * 3.2 - 0.45) * 0.28;
            pose.elbowR.x = -1.12 + Math.cos(t * 3.2 - 0.45) * 0.28;
            pose.elbowL.y = -0.35;
            pose.elbowR.y = 0.35;
            pose.wristL.z = Math.sin(t * 3.2 - 0.8) * 0.22;
            pose.wristR.z = -Math.cos(t * 3.2 - 0.8) * 0.22;
            break;
        }
        case 'pointBoard': {
            pose.hips.y = -0.35;
            pose.chest.y = -0.25;
            pose.head.y = 0.42 + Math.sin(t * 2.2) * 0.08;
            pose.shoulderR.z = 1.65 + Math.sin(t * 3.0) * 0.14;
            pose.shoulderR.x = 0.38;
            pose.elbowR.x = -0.22 + Math.sin(t * 3.5) * 0.12;
            pose.shoulderL.z = -0.22;
            pose.elbowL.x = -0.45;
            break;
        }
        case 'thinkPose': {
            pose.chest.x = 0.05;
            pose.head.z = -0.14;
            pose.head.x = 0.12 + Math.sin(t * 2.0) * 0.05;
            pose.shoulderR.x = -1.18;
            pose.elbowR.x = -1.88;
            pose.elbowR.z = -0.32;
            pose.shoulderL.x = -0.35;
            pose.elbowL.x = -1.05;
            pose.elbowL.y = -0.60;
            break;
        }
        case 'emphasize': {
            const pulse = Math.abs(Math.sin(t * 4.2));
            pose.rootPos.y = 0.98 - pulse * 0.025;
            pose.spine.x = pulse * 0.10;
            pose.head.x = pulse * 0.12;
            pose.shoulderL.x = -0.78 - pulse * 0.30;
            pose.shoulderR.x = -0.78 - pulse * 0.30;
            pose.elbowL.x = -1.15 + pulse * 0.32;
            pose.elbowR.x = -1.15 + pulse * 0.32;
            break;
        }
        case 'idle': {
            pose.rootPos.y = 0.98 + Math.sin(t * 2.0) * 0.01;
            pose.spine.x = Math.sin(t * 2.0) * 0.025;
            pose.head.y = Math.sin(t * 0.9) * 0.07;
            pose.shoulderL.z = -0.15 - Math.sin(t * 2.0) * 0.025;
            pose.shoulderR.z = 0.15 + Math.sin(t * 2.0) * 0.025;
            break;
        }
        case 'walk': {
            const phase = t * 5.0;
            pose.rootPos.y = 0.98 - Math.abs(Math.cos(phase)) * 0.04;
            pose.rootPos.z = localTime * 0.45 * speed;
            pose.hips.y = Math.sin(phase) * 0.11;
            pose.chest.y = -Math.sin(phase) * 0.09;
            pose.hipL.x = -Math.sin(phase) * 0.52;
            pose.hipR.x = Math.sin(phase) * 0.52;
            pose.kneeL.x = Math.max(0, Math.sin(phase - 0.6)) * 0.90;
            pose.kneeR.x = Math.max(0, -Math.sin(phase - 0.6)) * 0.90;
            pose.shoulderL.x = Math.sin(phase) * 0.42;
            pose.shoulderR.x = -Math.sin(phase) * 0.42;
            pose.elbowL.x = -0.32 - Math.max(0, -Math.sin(phase)) * 0.35;
            pose.elbowR.x = -0.32 - Math.max(0, Math.sin(phase)) * 0.35;
            break;
        }
        case 'run': {
            const phase = t * 8.5;
            pose.rootPos.y = 0.95 + Math.sin(phase * 2) * 0.06;
            pose.spine.x = 0.16;
            pose.hipL.x = -Math.sin(phase) * 0.90;
            pose.hipR.x = Math.sin(phase) * 0.90;
            pose.kneeL.x = Math.max(0.1, Math.sin(phase - 0.5) * 1.35);
            pose.kneeR.x = Math.max(0.1, -Math.sin(phase - 0.5) * 1.35);
            pose.shoulderL.x = Math.sin(phase) * 0.80;
            pose.shoulderR.x = -Math.sin(phase) * 0.80;
            pose.elbowL.x = -1.25;
            pose.elbowR.x = -1.25;
            break;
        }
        case 'waveR': {
            pose.spine.z = 0.05;
            pose.shoulderR.z = 2.15;
            pose.shoulderR.x = -0.25;
            pose.elbowR.z = 0.25 + Math.sin(t * 8.5) * 0.42;
            pose.elbowR.x = -0.45;
            pose.wristR.z = Math.sin(t * 8.5 - 0.5) * 0.28;
            break;
        }
        case 'waveL': {
            pose.spine.z = -0.05;
            pose.shoulderL.z = -2.15;
            pose.shoulderL.x = -0.25;
            pose.elbowL.z = -0.25 + Math.sin(t * 8.5) * 0.42;
            pose.elbowL.x = -0.45;
            break;
        }
        case 'squat': {
            const depth = (1 - Math.cos(t * 4.0)) * 0.5;
            pose.rootPos.y = 0.98 - depth * 0.40;
            pose.hips.x = depth * 0.32;
            pose.hipL.x = -depth * 1.40;
            pose.hipR.x = -depth * 1.40;
            pose.kneeL.x = depth * 2.05;
            pose.kneeR.x = depth * 2.05;
            pose.ankleL.x = -depth * 0.70;
            pose.ankleR.x = -depth * 0.70;
            pose.shoulderL.x = -depth * 1.30;
            pose.shoulderR.x = -depth * 1.30;
            break;
        }
        case 'jump': {
            const arc = Math.sin(progress * Math.PI);
            pose.rootPos.y = 0.98 + arc * 0.48;
            pose.shoulderL.z = -2.2 * arc;
            pose.shoulderR.z = 2.2 * arc;
            pose.kneeL.x = (1 - arc) * 0.5;
            pose.kneeR.x = (1 - arc) * 0.5;
            break;
        }
        case 'jumpingJacks': {
            const open = (1 - Math.cos(t * 6.2)) * 0.5;
            pose.rootPos.y = 0.98 + Math.abs(Math.sin(t * 6.2)) * 0.12;
            pose.hipL.z = -open * 0.45;
            pose.hipR.z = open * 0.45;
            pose.shoulderL.z = -0.15 - open * 2.45;
            pose.shoulderR.z = 0.15 + open * 2.45;
            break;
        }
        case 'bow': {
            const bend = Math.sin(progress * Math.PI);
            pose.hips.x = bend * 0.52;
            pose.spine.x = bend * 0.40;
            pose.chest.x = bend * 0.30;
            pose.shoulderR.x = -bend * 0.45;
            pose.elbowR.x = -bend * 1.25;
            break;
        }
        case 'clap': {
            const clapWave = Math.abs(Math.sin(t * 9.5));
            pose.shoulderL.x = -1.05;
            pose.shoulderR.x = -1.05;
            pose.shoulderL.y = -0.42 + clapWave * 0.24;
            pose.shoulderR.y = 0.42 - clapWave * 0.24;
            pose.elbowL.x = -1.10;
            pose.elbowR.x = -1.10;
            break;
        }
        case 'cheer': {
            const pump = Math.sin(t * 7.5);
            pose.shoulderL.z = -2.45 + pump * 0.2;
            pose.shoulderR.z = 2.45 - pump * 0.2;
            pose.elbowL.x = -0.35 + pump * 0.25;
            pose.elbowR.x = -0.35 - pump * 0.25;
            break;
        }
        case 'stretch': {
            const s = Math.sin(progress * Math.PI);
            pose.spine.x = -s * 0.22;
            pose.shoulderL.z = -1.60 * s;
            pose.shoulderR.z = 1.60 * s;
            break;
        }
        case 'dance': {
            const beat = t * 6.0;
            pose.rootPos.y = 0.95 - Math.abs(Math.sin(beat)) * 0.07;
            pose.hips.z = Math.sin(beat) * 0.20;
            pose.chest.y = -Math.cos(beat * 0.5) * 0.24;
            pose.shoulderL.z = -1.3 + Math.sin(beat) * 0.80;
            pose.shoulderR.z = 1.3 + Math.cos(beat) * 0.80;
            pose.elbowL.x = -1.0 + Math.cos(beat) * 0.55;
            pose.elbowR.x = -1.0 + Math.sin(beat) * 0.55;
            break;
        }
    }

    applyHumanArmBiomechanics(pose, t, clip.type);
    return pose;
}
