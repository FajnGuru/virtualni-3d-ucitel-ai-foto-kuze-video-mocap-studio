/***********************************************************************
 * 1. KATALOG POHYBŮ A 19 KLOUBŮ LIDSKÉ KOSTRY
 ***********************************************************************/
const MOTION_CATALOG = {
    explain: { id: 'explain', name: 'Výklad učiva (Gesta rukou)', icon: 'fa-chalkboard-user', color: 'from-sky-500 to-indigo-600', defaultDuration: 4.0, keywords: ['vysvětli', 'vysvetli', 'vysvětluj', 'vykládej', 'řekni', 'rekni', 'mluv', 'výklad'] },
    pointBoard: { id: 'pointBoard', name: 'Ukázat prstem na tabuli', icon: 'fa-hand-point-up', color: 'from-indigo-500 to-violet-600', defaultDuration: 3.5, keywords: ['tabul', 'ukaž', 'ukaz', 'vzorec', 'graf', 'nápis', 'bod'] },
    thinkPose: { id: 'thinkPose', name: 'Otázka k zamyšlení', icon: 'fa-lightbulb', color: 'from-amber-500 to-yellow-600', defaultDuration: 3.5, keywords: ['zamysli', 'otázka', 'otazka', 'přemýšlej', 'proč'] },
    emphasize: { id: 'emphasize', name: 'Zdůraznění klíčového bodu', icon: 'fa-circle-exclamation', color: 'from-rose-500 to-orange-600', defaultDuration: 3.2, keywords: ['zdůrazni', 'důležité', 'pozor', 'hlavní', 'zapamatuj'] },
    idle: { id: 'idle', name: 'Klidový postoj', icon: 'fa-person', color: 'from-slate-600 to-slate-700', defaultDuration: 2.5, keywords: ['stuj', 'klid', 'dýchej', 'idle', 'zastav'] },
    walk: { id: 'walk', name: 'Chůze vpřed', icon: 'fa-person-walking', color: 'from-emerald-500 to-teal-600', defaultDuration: 3.0, keywords: ['jdi', 'choď', 'chůze', 'krok', 'walk', 'vpřed'] },
    run: { id: 'run', name: 'Běh / Sprint', icon: 'fa-person-running', color: 'from-orange-500 to-amber-600', defaultDuration: 2.5, keywords: ['běž', 'běh', 'sprint', 'run', 'rychle'] },
    waveR: { id: 'waveR', name: 'Zamávat pravou rukou', icon: 'fa-hand-sparkles', color: 'from-sky-500 to-blue-600', defaultDuration: 2.8, keywords: ['zamávej', 'mávej', 'pozdrav', 'ahoj', 'přivítej'] },
    waveL: { id: 'waveL', name: 'Zamávat levou rukou', icon: 'fa-hand', color: 'from-cyan-500 to-sky-600', defaultDuration: 2.8, keywords: ['zamávej levou', 'levou rukou'] },
    squat: { id: 'squat', name: 'Dřepy (Posilování)', icon: 'fa-arrows-down-to-line', color: 'from-violet-500 to-purple-600', defaultDuration: 3.0, keywords: ['dřep', 'dřepy', 'squat'] },
    jump: { id: 'jump', name: 'Výskok do vzduchu', icon: 'fa-arrow-up-from-ground-water', color: 'from-pink-500 to-rose-600', defaultDuration: 2.0, keywords: ['vyskoč', 'skok', 'skoč', 'jump'] },
    jumpingJacks: { id: 'jumpingJacks', name: 'Skákací panák (Rozcvička)', icon: 'fa-child-reaching', color: 'from-amber-500 to-orange-600', defaultDuration: 3.5, keywords: ['panák', 'rozcvička', 'jacks'] },
    bow: { id: 'bow', name: 'Úklona (Rozloučení)', icon: 'fa-person-praying', color: 'from-indigo-500 to-blue-700', defaultDuration: 2.6, keywords: ['ukloň', 'úklona', 'poklona', 'rozluč'] },
    clap: { id: 'clap', name: 'Potlesk / Pochvala', icon: 'fa-hands-clapping', color: 'from-yellow-500 to-amber-600', defaultDuration: 2.8, keywords: ['tleskej', 'zatleskej', 'potlesk', 'pochval'] },
    cheer: { id: 'cheer', name: 'Vítězné gesto', icon: 'fa-trophy', color: 'from-emerald-400 to-green-600', defaultDuration: 2.8, keywords: ['raduj', 'oslavuj', 'vítěz', 'hurá'] },
    stretch: { id: 'stretch', name: 'Protažení těla', icon: 'fa-up-down-left-right', color: 'from-teal-400 to-cyan-600', defaultDuration: 3.2, keywords: ['protáhni', 'protažení', 'rozpaž'] },
    dance: { id: 'dance', name: 'Taneční kreace', icon: 'fa-music', color: 'from-fuchsia-500 to-pink-600', defaultDuration: 4.0, keywords: ['tancuj', 'tanči', 'tanec', 'dance'] }
};

const JOINT_METADATA = [
    { id: 'hips', name: '1. Pánev (Hips)' },
    { id: 'spine', name: '2. Bederní páteř (Spine)' },
    { id: 'chest', name: '3. Hrudní koš (Chest)' },
    { id: 'neck', name: '4. Krční páteř (Neck)' },
    { id: 'head', name: '5. Hlava (Head)' },
    { id: 'clavicleL', name: '6. Levá klíční kost (Clavicle L)' },
    { id: 'shoulderL', name: '7. Levé rameno (Shoulder L)' },
    { id: 'elbowL', name: '8. Levý loket (Elbow L)' },
    { id: 'wristL', name: '9. Levé zápěstí a dlaň (Wrist L)' },
    { id: 'clavicleR', name: '10. Pravá klíční kost (Clavicle R)' },
    { id: 'shoulderR', name: '11. Pravé rameno (Shoulder R)' },
    { id: 'elbowR', name: '12. Pravý loket (Elbow R)' },
    { id: 'wristR', name: '13. Pravé zápěstí a dlaň (Wrist R)' },
    { id: 'hipL', name: '14. Levá kyčel (Hip L)' },
    { id: 'kneeL', name: '15. Levé koleno (Knee L)' },
    { id: 'ankleL', name: '16. Levý kotník (Ankle L)' },
    { id: 'hipR', name: '17. Pravá kyčel (Hip R)' },
    { id: 'kneeR', name: '18. Pravé koleno (Knee R)' },
    { id: 'ankleR', name: '19. Pravý kotník (Ankle R)' }
];

const TTS_VOICE_CATALOG = {
    male: [
        { id: 'Orus', label: 'Orus (Muž – Profesorský hlubší)', pitch: 0.88, rate: 1.0 },
        { id: 'Charon', label: 'Charon (Muž – Klidný a jasný)', pitch: 0.94, rate: 0.98 },
        { id: 'Puck', label: 'Puck (Muž – Energický lektor)', pitch: 1.05, rate: 1.06 },
        { id: 'Fenrir', label: 'Fenrir (Muž – Důrazný mentor)', pitch: 0.82, rate: 1.0 }
    ],
    female: [
        { id: 'Kore', label: 'Kore (Žena – Jasná učitelka)', pitch: 1.18, rate: 1.02 },
        { id: 'Aoede', label: 'Aoede (Žena – Přátelská a vřelá)', pitch: 1.24, rate: 1.0 },
        { id: 'Leda', label: 'Leda (Žena – Mladistvá lektorka)', pitch: 1.30, rate: 1.05 },
        { id: 'Sulafat', label: 'Sulafat (Žena – Klidná vypravěčka)', pitch: 1.12, rate: 0.97 }
    ]
};
