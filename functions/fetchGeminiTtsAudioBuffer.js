async function fetchGeminiTtsAudioBuffer(text, voiceName) {
    const cleanText = (text || '').trim();
    if (!cleanText) return null;

    const cacheKey = `${voiceName}::${cleanText}`;
    if (ttsAudioBufferCache.has(cacheKey)) {
        return ttsAudioBufferCache.get(cacheKey);
    }

    const ctx = ensureStudioAudioContext();
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;

    const payload = {
        contents: [{
            parts: [{ text: `Přečti přirozeně, srozumitelně a plynule česky jako učitel ve třídě: ${cleanText}` }]
        }],
        generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: voiceName || "Orus" }
                }
            }
        },
        model: "gemini-2.5-flash-preview-tts"
    };

    const delays = [600, 1200, 2400];
    for (let attempt = 0; attempt <= delays.length; attempt++) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const result = await response.json();
            const part = result?.candidates?.[0]?.content?.parts?.[0];
            const base64Audio = part?.inlineData?.data;
            const mimeType = part?.inlineData?.mimeType || 'audio/L16;rate=24000';

            if (base64Audio) {
                const rateMatch = mimeType.match(/rate=(\d+)/);
                const sampleRate = rateMatch ? parseInt(rateMatch[1], 10) : 24000;

                const binaryStr = atob(base64Audio);
                const byteLen = binaryStr.length;
                const bytes = new Uint8Array(byteLen);
                for (let i = 0; i < byteLen; i++) {
                    bytes[i] = binaryStr.charCodeAt(i);
                }

                const pcm16 = new Int16Array(bytes.buffer);
                const audioBuffer = ctx.createBuffer(1, pcm16.length, sampleRate);
                const channelData = audioBuffer.getChannelData(0);
                for (let i = 0; i < pcm16.length; i++) {
                    channelData[i] = pcm16[i] / 32768.0;
                }

                ttsAudioBufferCache.set(cacheKey, audioBuffer);
                return audioBuffer;
            }
            break;
        } catch (err) {
            if (attempt < delays.length) {
                await new Promise(r => setTimeout(r, delays[attempt]));
            }
        }
    }
    return null;
}
