function resetAllManualJoints() {
    manualPose = createNeutralPose();
    selectJointForInspector(selectedJointId);
    onJointSliderChange();
}
