function exitStudentPresentationMode() {
    document.body.classList.remove('student-mode');
    setTimeout(onWindowResize, 60);
}
