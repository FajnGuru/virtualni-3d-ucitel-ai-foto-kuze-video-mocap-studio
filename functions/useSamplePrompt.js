function useSamplePrompt(str) {
    document.getElementById('chatInput').value = str;
    handleChatSubmit(new Event('submit'));
}
