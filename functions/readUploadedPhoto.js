function readUploadedPhoto() {
    return new Promise((resolve, reject) => {
        const input = document.getElementById('photoUploadInput');
        const file = input?.files?.[0];
        if (!file) {
            showToast('Nejprve vyberte fotografii v poli nahrávání!');
            return reject('No file');
        }
        const reader = new FileReader();
        reader.onload = e => {
            const dataUrl = e.target.result;
            const base64 = dataUrl.split(',')[1];
            const img = new Image();
            img.onload = () => resolve({ base64, mimeType: file.type || 'image/jpeg', img });
            img.src = dataUrl;
        };
        reader.readAsDataURL(file);
    });
}
