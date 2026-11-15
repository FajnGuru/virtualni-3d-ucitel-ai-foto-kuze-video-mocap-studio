function buildHumanSkinAndClothingLayer() {
    skinMaterials = {
        skin: new THREE.MeshStandardMaterial({ color: avatarConfig.skinHex, roughness: 0.55, metalness: 0.05 }),
        face: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, metalness: 0.05 }),
        hair: new THREE.MeshStandardMaterial({ color: avatarConfig.hairHex, roughness: 0.75, metalness: 0.08 }),
        top: new THREE.MeshStandardMaterial({ color: avatarConfig.topHex, roughness: 0.65, metalness: 0.08 }),
        pants: new THREE.MeshStandardMaterial({ color: avatarConfig.pantsHex, roughness: 0.75, metalness: 0.05 }),
        shoes: new THREE.MeshStandardMaterial({ color: avatarConfig.shoesHex, roughness: 0.4, metalness: 0.2 }),
        whiteShirt: new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.6 }),
        tie: new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.45 }),
        gold: new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.25, metalness: 0.8 }),
        glasses: new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, metalness: 0.8 })
    };

    function addSkinMesh(jointName, geo, mat, pos = [0, 0, 0], scale = [1, 1, 1]) {
        const j = rig[jointName];
        if (!j) return null;
        const m = new THREE.Mesh(geo, mat);
        m.position.set(pos[0], pos[1], pos[2]);
        m.scale.set(scale[0], scale[1], scale[2]);
        m.castShadow = true;
        m.receiveShadow = true;
        j.add(m);
        skinMeshes.push(m);
        return m;
    }

    const headGeo = new THREE.SphereGeometry(0.118, 32, 32);
    headGeo.rotateY(-Math.PI / 2);
    skinParts.headMesh = addSkinMesh('head', headGeo, skinMaterials.face, [0, 0.11, 0.01], [0.92, 1.12, 1.0]);
    skinParts.skinJaw = addSkinMesh('head', new THREE.SphereGeometry(0.068, 20, 16), skinMaterials.skin, [0, 0.035, 0.035], [1.05, 0.65, 0.95]);

    addSkinMesh('head', new THREE.SphereGeometry(0.026, 12, 12), skinMaterials.skin, [0.108, 0.105, -0.005], [0.45, 1.1, 0.7]);
    addSkinMesh('head', new THREE.SphereGeometry(0.026, 12, 12), skinMaterials.skin, [-0.108, 0.105, -0.005], [0.45, 1.1, 0.7]);

    const hairShort = new THREE.Group();
    const capShort = new THREE.Mesh(new THREE.SphereGeometry(0.123, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.58), skinMaterials.hair);
    capShort.position.set(0, 0.118, -0.005);
    capShort.rotation.x = -0.18;
    hairShort.add(capShort);
    rig.head.add(hairShort);
    skinMeshes.push(capShort);
    skinParts.hairShort = hairShort;

    const hairLong = new THREE.Group();
    const capLong = capShort.clone();
    const backFlow = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.135, 0.36, 20), skinMaterials.hair);
    backFlow.position.set(0, -0.03, -0.055);
    backFlow.scale.set(1.05, 1.0, 0.55);
    const strandL = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.025, 0.30, 12), skinMaterials.hair);
    strandL.position.set(0.095, -0.01, 0.03);
    const strandR = strandL.clone();
    strandR.position.x = -0.095;
    hairLong.add(capLong, backFlow, strandL, strandR);
    rig.head.add(hairLong);
    [capLong, backFlow, strandL, strandR].forEach(m => skinMeshes.push(m));
    skinParts.hairLong = hairLong;

    const hairBun = new THREE.Group();
    const capBun = capShort.clone();
    const bunSphere = new THREE.Mesh(new THREE.SphereGeometry(0.058, 18, 18), skinMaterials.hair);
    bunSphere.position.set(0, 0.19, -0.115);
    hairBun.add(capBun, bunSphere);
    rig.head.add(hairBun);
    [capBun, bunSphere].forEach(m => skinMeshes.push(m));
    skinParts.hairBun = hairBun;

    const hairCurly = new THREE.Group();
    const afroSphere = new THREE.Mesh(new THREE.SphereGeometry(0.155, 24, 24), skinMaterials.hair);
    afroSphere.position.set(0, 0.155, -0.015);
    afroSphere.scale.set(1.08, 0.95, 1.05);
    hairCurly.add(afroSphere);
    rig.head.add(hairCurly);
    skinMeshes.push(afroSphere);
    skinParts.hairCurly = hairCurly;

    skinParts.mustache = addSkinMesh('head', new THREE.BoxGeometry(0.068, 0.016, 0.025), skinMaterials.hair, [0, 0.066, 0.112]);
    skinParts.beardFull = addSkinMesh('head', new THREE.SphereGeometry(0.092, 18, 16), skinMaterials.hair, [0, 0.042, 0.032], [1.02, 0.85, 1.05]);

    const glassesGroup = new THREE.Group();
    const rimL = new THREE.Mesh(new THREE.TorusGeometry(0.028, 0.004, 8, 20), skinMaterials.glasses);
    rimL.position.set(0.044, 0.112, 0.115);
    const rimR = rimL.clone();
    rimR.position.x = -0.044;
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.005, 0.005), skinMaterials.glasses);
    bridge.position.set(0, 0.115, 0.116);
    glassesGroup.add(rimL, rimR, bridge);
    rig.head.add(glassesGroup);
    [rimL, rimR, bridge].forEach(m => skinMeshes.push(m));
    skinParts.glassesGroup = glassesGroup;

    skinParts.neck = addSkinMesh('neck', new THREE.CylinderGeometry(0.048, 0.056, 0.11, 20), skinMaterials.skin, [0, 0.04, 0]);
    skinParts.chest = addSkinMesh('chest', new THREE.CylinderGeometry(0.155, 0.132, 0.27, 24), skinMaterials.top, [0, 0.09, 0.01], [1.16, 1, 0.78]);
    skinParts.spine = addSkinMesh('spine', new THREE.CylinderGeometry(0.132, 0.128, 0.17, 24), skinMaterials.top, [0, 0.09, 0.01], [1.10, 1, 0.74]);
    skinParts.hips = addSkinMesh('hips', new THREE.CylinderGeometry(0.14, 0.148, 0.16, 24), skinMaterials.pants, [0, 0.02, 0], [1.20, 1, 0.80]);

    const bustGroup = new THREE.Group();
    const bustL = new THREE.Mesh(new THREE.SphereGeometry(0.072, 20, 20), skinMaterials.top);
    bustL.position.set(0.062, 0.11, 0.095);
    bustL.scale.set(0.95, 0.88, 0.85);
    const bustR = bustL.clone();
    bustR.position.x = -0.062;
    bustGroup.add(bustL, bustR);
    rig.chest.add(bustGroup);
    [bustL, bustR].forEach(m => skinMeshes.push(m));
    skinParts.bustGroup = bustGroup;

    skinParts.tie = addSkinMesh('chest', new THREE.BoxGeometry(0.036, 0.24, 0.015), skinMaterials.tie, [0, 0.08, 0.118]);

    const necklace = new THREE.Mesh(new THREE.TorusGeometry(0.068, 0.006, 8, 24), skinMaterials.gold);
    necklace.rotation.x = Math.PI / 2 + 0.25;
    necklace.position.set(0, 0.21, 0.035);
    rig.chest.add(necklace);
    skinMeshes.push(necklace);
    skinParts.necklace = necklace;

    skinParts.skirt = addSkinMesh('hips', new THREE.CylinderGeometry(0.142, 0.215, 0.36, 28), skinMaterials.pants, [0, -0.14, 0], [1.18, 1, 0.86]);
    skinParts.labCoatSkirt = addSkinMesh('hips', new THREE.CylinderGeometry(0.148, 0.185, 0.38, 24), skinMaterials.whiteShirt, [0, -0.14, -0.005], [1.22, 1, 0.84]);

    skinParts.limbs = [];
    ['L', 'R'].forEach(side => {
        const sign = side === 'L' ? 1 : -1;
        const shSphere = addSkinMesh(`shoulder${side}`, new THREE.SphereGeometry(0.062, 16, 16), skinMaterials.top, [0, 0, 0]);
        const upperArm = addSkinMesh(`shoulder${side}`, new THREE.CylinderGeometry(0.054, 0.044, 0.27, 18), skinMaterials.top, [0, -0.135, 0]);
        const elSphere = addSkinMesh(`elbow${side}`, new THREE.SphereGeometry(0.043, 16, 16), skinMaterials.skin, [0, 0, 0]);
        const foreArm = addSkinMesh(`elbow${side}`, new THREE.CylinderGeometry(0.043, 0.033, 0.25, 18), skinMaterials.skin, [0, -0.125, 0]);
        addSkinMesh(`wrist${side}`, new THREE.BoxGeometry(0.058, 0.072, 0.024), skinMaterials.skin, [0, -0.038, 0]);

        skinParts.limbs.push(shSphere, upperArm, elSphere, foreArm);

        fingerRig[side] = [];
        for (let f = 0; f < 4; f++) {
            const xOff = (f - 1.5) * 0.0135;
            const fGroup = new THREE.Group();
            fGroup.name = `finger_${side}_${f}`;
            fGroup.position.set(xOff, -0.072, 0);
            const fMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.0048, 0.058, 8), skinMaterials.skin);
            fMesh.position.y = -0.029;
            fGroup.add(fMesh);
            rig[`wrist${side}`].add(fGroup);
            skinMeshes.push(fMesh);
            fingerRig[side].push(fGroup);
        }

        const thumbGroup = new THREE.Group();
        thumbGroup.name = `thumb_${side}`;
        thumbGroup.position.set(sign * 0.030, -0.035, 0.012);
        thumbGroup.rotation.z = sign * 0.55;
        const thumbMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.0055, 0.046, 8), skinMaterials.skin);
        thumbMesh.position.y = -0.023;
        thumbGroup.add(thumbMesh);
        rig[`wrist${side}`].add(thumbGroup);
        skinMeshes.push(thumbMesh);
        fingerRig[`thumb${side}`] = thumbGroup;
    });

    skinParts.calves = [];
    ['L', 'R'].forEach(side => {
        const hipSphere = addSkinMesh(`hip${side}`, new THREE.SphereGeometry(0.072, 16, 16), skinMaterials.pants, [0, 0, 0]);
        const thigh = addSkinMesh(`hip${side}`, new THREE.CylinderGeometry(0.074, 0.056, 0.43, 20), skinMaterials.pants, [0, -0.215, 0]);
        const kneeSphere = addSkinMesh(`knee${side}`, new THREE.SphereGeometry(0.053, 16, 16), skinMaterials.pants, [0, 0, 0]);
        const calf = addSkinMesh(`knee${side}`, new THREE.CylinderGeometry(0.054, 0.038, 0.42, 20), skinMaterials.pants, [0, -0.21, 0]);
        addSkinMesh(`ankle${side}`, new THREE.BoxGeometry(0.088, 0.052, 0.20), skinMaterials.shoes, [0, -0.03, 0.055]);

        skinParts.limbs.push(hipSphere, thigh, kneeSphere, calf);
        skinParts.calves.push(kneeSphere, calf);
    });

    defaultRigReferences = {};
    JOINT_METADATA.forEach(j => { defaultRigReferences[j.id] = rig[j.id]; });
    defaultRigReferences.jaw = rig.jaw;
    defaultRigReferences.fingerRig = {
        L: [...fingerRig.L],
        R: [...fingerRig.R],
        thumbL: fingerRig.thumbL,
        thumbR: fingerRig.thumbR
    };

    applyAvatarCustomization();
    setRigStyle('skin');
}
