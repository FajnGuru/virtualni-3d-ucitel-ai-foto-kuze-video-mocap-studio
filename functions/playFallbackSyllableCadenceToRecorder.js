function playFallbackSyllableCadenceToRecorder(text, profile, muteToSpeakers = true) {
    try {
        const ctx = ensureStudioAudioContext();
        const words = (text || '').trim().split(/\s+/);
        let cursor = ctx.currentTime + 0.04;
        const baseFreq = avatarConfig.gender === 'female' ? 215 * (profile.pitch || 1) : 125 * (profile.pitch || 1);

        words.forEach((w, idx) => {
            const sylCount = Math.max(1, Math.min(4, Math.ceil(w.length / 3)));
            for (let s = 0; s < sylCount; s++) {
                const dur = 0.11 + (s === sylCount - 1 ? 0.05 : 0);
                const osc = ctx.createOscillator();
                const filter = ctx.createBiquadFilter();
                const env = ctx.createGain();

                osc.type = 'sawtooth';
                const pitchVar = baseFreq * (0.94 + Math.sin(idx * 1.7 + s) * 0.12);
                osc.frequency.setValueAtTime(pitchVar, cursor);

                filter.type = 'bandpass';
                filter.frequency.setValueAtTime(avatarConfig.gender === 'female' ? 820 : 620, cursor);
                filter.Q.value = 2.5;

                env.gain.setValueAtTime(0.0001, cursor);
                env.gain.linearRampToValueAtTime(0.12, cursor + 0.025);
                env.gain.exponentialRampToValueAtTime(0.0001, cursor + dur);

                osc.connect(filter);
                filter.connect(env);
                env.connect(recordingAudioDestination);
                env.connect(ttsAnalyserNode);
                if (!muteToSpeakers) {
                    env.connect(ctx.destination);
                }

                osc.start(cursor);
                osc.stop(cursor + dur + 0.01);
                activeFallbackOscillators.push(osc);
                cursor += dur + 0.035;
            }
            cursor += 0.06;
        });
    } catch (e) {}
}
