function toggleJointAxes() {
    showAxes = !showAxes;
    jointAxesHelpers.forEach(a => { a.visible = showAxes; });
}
