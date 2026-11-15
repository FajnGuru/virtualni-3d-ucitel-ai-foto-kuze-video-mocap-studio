function selectJointForInspector(jointId) {
    selectedJointId = jointId;
    if (!manualMode) {
        manualPose = createNeutralPose();
        JOINT_METADATA.forEach(j => {
            if (rig[j.id]) {
                manualPose[j.id] = { x: rig[j.id].rotation.x, y: rig[j.id].rotation.y, z: rig[j.id].rotation.z };
            }
        });
    }
    const rot = manualPose[jointId] || { x: 0, y: 0, z: 0 };
    const dx = Math.round(THREE.MathUtils.radToDeg(rot.x));
    const dy = Math.round(THREE.MathUtils.radToDeg(rot.y));
    const dz = Math.round(THREE.MathUtils.radToDeg(rot.z));
    document.getElementById('jointSliderX').value = dx;
    document.getElementById('jointSliderY').value = dy;
    document.getElementById('jointSliderZ').value = dz;
    document.getElementById('jointValX').textContent = `${dx}°`;
    document.getElementById('jointValY').textContent = `${dy}°`;
    document.getElementById('jointValZ').textContent = `${dz}°`;
}
