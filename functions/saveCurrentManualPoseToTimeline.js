function saveCurrentManualPoseToTimeline() {
    addClipToTimeline({
        type: 'customPose',
        name: 'Vlastní póza kloubů',
        icon: 'fa-sliders',
        color: 'from-emerald-500 to-cyan-600',
        duration: 2.8,
        customPose: manualPose
    }, true);
    showToast('Póza uložena do časové osy!');
}
