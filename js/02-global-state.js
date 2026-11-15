/***********************************************************************
 * 2. GLOBÁLNÍ STAV APLIKACE A KONFIGURACE POSTAVY
 ***********************************************************************/
let scene, camera, renderer, clock;
let characterRoot;
let rig = {};
let jointAxesHelpers = [];
let boneMeshes = [];
let jointSpheres = [];
let skinMeshes = [];
let skinParts = {};
let skinMaterials = {};
let fingerRig = { L: [], R: [], thumbL: null, thumbR: null };

// Stav pro importovanou .GLB postavu a její animace
let defaultRigReferences = null;
let isCustomGlbAvatarActive = false;
let importedGlbContainer = null;
let importedGlbMixer = null;
let importedGlbAnimationsMap = {}; // { clipId: THREE.AnimationClip }
let importedJsonKeyframesMap = {}; // { clipId: [pose0, pose1, ...] }
let importedExtraNodes = { earL: null, earR: null, muscles: {} };
let importedHipsRestY = 0.98;

let rigStyle = 'skin';
let showAxes = false;
let followCamera = true;

let camSpherical = { radius: 3.4, theta: 0.12, phi: 1.36 };
let camTarget = new THREE.Vector3(0, 1.12, 0);
let isDraggingViewport = false;
let dragButton = 0;
let prevPointer = { x: 0, y: 0 };

let timelineSequence = [];
let isPlayingSequence = false;
let sequenceElapsed = 0;
let totalSequenceDuration = 0;
let activeClipIndex = -1;
let clipStartRootStates = [];

let manualMode = false;
let manualPose = {};
let selectedJointId = 'shoulderR';

let smartboardGroup = null;
let smartboardCanvas = null;
let smartboardTexture = null;
let showSmartboard = true;
let currentStepSpeechText = 'Dobrý den! Vítám vás u dnešní interaktivní lekce.';
let lastSpokenClipUid = null;
let isCurrentlySpeaking = false;

let avatarConfig = {
    gender: 'male',
    bodyPreset: 'average',
    height: 1.0,
    shoulderWidth: 1.0,
    torsoWidth: 1.0,
    waistWidth: 0.95,
    hipWidth: 1.0,
    bustSize: 0.0,
    limbThickness: 1.0,
    headScale: 1.0,
    skinHex: '#eab69f',
    hairStyle: 'short',
    hairHex: '#3b2618',
    eyeHex: '#2563eb',
    beardStyle: 'none',
    glassesStyle: 'none',
    outfitStyle: 'suit',
    topHex: '#1e3a8a',
    pantsHex: '#0f172a',
    shoesHex: '#18181b',
    voiceName: 'Orus',
    customFaceImage: null
};

let frameCount = 0;
let lastFpsUpdate = performance.now();
