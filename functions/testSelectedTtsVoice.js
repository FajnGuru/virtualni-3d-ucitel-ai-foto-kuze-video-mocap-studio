function testSelectedTtsVoice() {
    const sampleText = avatarConfig.gender === 'female'
        ? `Dobrý den žáci! Jsem vaše virtuální učitelka a můj hlas se nahrává přímo do videa.`
        : `Dobrý den žáci! Jsem váš virtuální učitel a můj hlas se nahrává přímo do videa.`;
    speakTeacherText(sampleText, true);
    showToast(`Přehrávám zkoušku hlasu: ${avatarConfig.voiceName}`);
}
