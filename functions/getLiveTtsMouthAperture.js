function getLiveTtsMouthAperture(timeSec) {
    const vuBar = document.getElementById('ttsVuMeterBar');
    if (isCurrentlySpeaking && ttsAnalyserNode && ttsAnalyserDataArray) {
        ttsAnalyserNode.getByteTimeDomainData(ttsAnalyserDataArray);
        let sumSq = 0;
        for (let i = 0; i < ttsAnalyserDataArray.length; i++) {
            const norm = (ttsAnalyserDataArray[i] - 128) / 128;
            sumSq += norm * norm;
        }
        const rms = Math.sqrt(sumSq / ttsAnalyserDataArray.length);
        if (vuBar) {
            const pct = Math.min(100, Math.round(rms * 380));
            vuBar.style.width = `${pct}%`;
        }
        if (rms > 0.008) {
            return Math.min(0.032, rms * 0.11);
        }
    } else if (vuBar) {
        vuBar.style.width = isCurrentlySpeaking ? `${30 + Math.round(Math.abs(Math.sin(timeSec * 12)) * 55)}%` : '0%';
    }

    if (isCurrentlySpeaking) {
        return Math.abs(Math.sin(timeSec * 15) * Math.cos(timeSec * 7)) * 0.022;
    }
    return 0;
}
