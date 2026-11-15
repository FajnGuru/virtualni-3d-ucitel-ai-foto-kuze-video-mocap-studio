function ensureStudioAudioContext() {
    if (!studioAudioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        studioAudioContext = new AudioCtx();

        masterTtsGainNode = studioAudioContext.createGain();
        masterTtsGainNode.gain.value = 1.0;

        ttsAnalyserNode = studioAudioContext.createAnalyser();
        ttsAnalyserNode.fftSize = 256;
        ttsAnalyserNode.smoothingTimeConstant = 0.65;
        ttsAnalyserDataArray = new Uint8Array(ttsAnalyserNode.frequencyBinCount);

        recordingAudioDestination = studioAudioContext.createMediaStreamDestination();

        masterTtsGainNode.connect(studioAudioContext.destination);
        masterTtsGainNode.connect(ttsAnalyserNode);
        masterTtsGainNode.connect(recordingAudioDestination);

        try {
            keepAliveOscillator = studioAudioContext.createOscillator();
            const silentGain = studioAudioContext.createGain();
            silentGain.gain.value = 0.00001;
            keepAliveOscillator.frequency.value = 440;
            keepAliveOscillator.connect(silentGain);
            silentGain.connect(recordingAudioDestination);
            keepAliveOscillator.start();
        } catch (e) {}
    }

    if (studioAudioContext.state === 'suspended') {
        studioAudioContext.resume().catch(() => {});
    }
    return studioAudioContext;
}
