function onJointSliderChange() {
    isPlayingSequence = false;
    manualMode = true;
    updateTransportButtonsUI();
    const dx = Number(document.getElementById('jointSliderX').value);
    const dy = Number(document.getElementById('jointSliderY').value);
    const dz = Number(document.getElementById('jointSliderZ').value);
    document.getElementById('jointValX').textContent = `${dx}°`;
    document.getElementById('jointValY').textContent = `${dy}°`;
    document.getElementById('jointValZ').textContent = `${dz}°`;
    manualPose[selectedJointId] = {
        x: THREE.MathUtils.degToRad(dx),
        y: THREE.MathUtils.degToRad(dy),
        z: THREE.MathUtils.degToRad(dz)
    };
    applyPoseToRig(manualPose, { x: 0, z: 0, yaw: 0 });
}
