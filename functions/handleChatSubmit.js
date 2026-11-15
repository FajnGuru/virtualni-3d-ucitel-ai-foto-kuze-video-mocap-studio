function handleChatSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';

    const quoteMatch = text.match(/[„"“]([^”"]+)[“"]/);
    const speech = quoteMatch ? quoteMatch[1] : '';
    const lower = text.toLowerCase();

    let matched = MOTION_CATALOG.explain;
    for (const item of Object.values(MOTION_CATALOG)) {
        if (item.keywords.some(kw => lower.includes(kw))) {
            matched = item;
            break;
        }
    }

    addClipToTimeline({
        type: matched.id,
        name: matched.name,
        duration: speech ? Math.max(3.5, Math.round(speech.length / 13)) : matched.defaultDuration,
        speech: speech
    }, true);

    const box = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = 'bg-studio-800 border border-sky-500/30 rounded-xl p-2.5 text-slate-200';
    div.innerHTML = `<span class="text-sky-400 font-semibold">Přidáno:</span> ${matched.name} ${speech ? `— „${speech}“` : ''}`;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}
