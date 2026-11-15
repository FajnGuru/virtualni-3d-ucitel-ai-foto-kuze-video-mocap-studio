function enterStudentPresentationMode() {
    document.body.classList.add('student-mode');
    setTimeout(onWindowResize, 60);
}
