function showToast(msg) {
    const box = document.getElementById('toastBox');
    document.getElementById('toastText').textContent = msg;
    box.classList.remove('opacity-0');
    box.classList.add('opacity-100');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        box.classList.remove('opacity-100');
        box.classList.add('opacity-0');
    }, 2600);
}
