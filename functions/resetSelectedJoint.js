function resetSelectedJoint() {
    manualPose[selectedJointId] = { x: 0, y: 0, z: 0 };
    selectJointForInspector(selectedJointId);
    onJointSliderChange();
}
