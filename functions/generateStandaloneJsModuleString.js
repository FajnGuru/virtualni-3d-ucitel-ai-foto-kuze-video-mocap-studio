function generateStandaloneJsModuleString() {
    const timelineClean = timelineSequence.map(c => ({
        type: c.type,
        name: c.name,
        duration: c.duration,
        speed: c.speed || 1,
        speech: c.speech || ''
    }));

    return `/**\n * SAMOSTATNÝ MODUL POHYBŮ PRO VYEXPORTOVANOU 3D POSTAVU (.GLB)\n * Vygenerováno z Virtuální 3D Učitel & Humanoid Rig Studia\n */\n\nexport const JOINT_NAMES = ${JSON.stringify(JOINT_METADATA.map(j => j.id))};\nexport const MOTION_TYPES = ${JSON.stringify(Object.keys(MOTION_CATALOG))};\nexport const TIMELINE_SEQUENCE = ${JSON.stringify(timelineClean, null, 2)};\n\n// ... full procedural motion functions\n`;
}
