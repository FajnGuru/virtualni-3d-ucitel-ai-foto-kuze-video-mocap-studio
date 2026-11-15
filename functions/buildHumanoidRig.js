function buildHumanoidRig() {
    characterRoot = new THREE.Group();
    characterRoot.name = "HumanoidAvatarRoot";
    scene.add(characterRoot);

    const boneMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.35, metalness: 0.25 });
    const jointMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.45, roughness: 0.2, metalness: 0.6 });
    const ribMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.4, metalness: 0.2 });
    rig.materials = { boneMat, jointMat, ribMat };

    function createJoint(name, x, y, z, radius = 0.04, parentGroup = null) {
        const group = new THREE.Group();
        group.name = name;
        group.position.set(x, y, z);

        const sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 16, 16), jointMat);
        sphereMesh.castShadow = true;
        group.add(sphereMesh);
        jointSpheres.push(sphereMesh);

        const axes = new THREE.AxesHelper(0.14);
        axes.visible = showAxes;
        group.add(axes);
        jointAxesHelpers.push(axes);

        if (parentGroup) parentGroup.add(group);
        rig[name] = group;
        return group;
    }

    function createBoneSegment(parentJoint, toVec, rTop = 0.03, rBot = 0.022) {
        const len = toVec.length();
        if (len < 0.001) return;
        const wrap = new THREE.Group();
        wrap.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), toVec.clone().normalize());

        const cylGeo = new THREE.CylinderGeometry(rTop, rBot, len, 12);
        cylGeo.translate(0, len / 2, 0);
        const cylMesh = new THREE.Mesh(cylGeo, boneMat);
        cylMesh.castShadow = true;

        const octGeo = new THREE.OctahedronGeometry(1, 0);
        octGeo.translate(0, 1, 0);
        octGeo.scale(rTop * 1.4, len / 2, rTop * 1.4);
        const octMesh = new THREE.Mesh(octGeo, new THREE.MeshStandardMaterial({ color: 0x818cf8, roughness: 0.25, metalness: 0.5, flatShading: true }));
        octMesh.visible = false;

        wrap.add(cylMesh, octMesh);
        parentJoint.add(wrap);
        boneMeshes.push({ cylMesh, octMesh });
    }

    const hips = createJoint('hips', 0, 0.98, 0, 0.05, characterRoot);
    const spine = createJoint('spine', 0, 0.12, 0, 0.04, hips);
    createBoneSegment(hips, new THREE.Vector3(0, 0.12, 0));

    const chest = createJoint('chest', 0, 0.20, 0, 0.045, spine);
    createBoneSegment(spine, new THREE.Vector3(0, 0.20, 0));

    const neck = createJoint('neck', 0, 0.23, 0, 0.032, chest);
    createBoneSegment(chest, new THREE.Vector3(0, 0.23, 0));

    const head = createJoint('head', 0, 0.09, 0, 0.035, neck);
    createBoneSegment(neck, new THREE.Vector3(0, 0.09, 0));

    const jaw = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.05, 0.09), boneMat);
    jaw.position.set(0, 0.03, 0.03);
    head.add(jaw);
    rig.jaw = jaw;
    jointSpheres.push(jaw);

    const clavicleL = createJoint('clavicleL', 0.05, 0.19, 0.02, 0.03, chest);
    const shoulderL = createJoint('shoulderL', 0.16, 0, -0.01, 0.042, clavicleL);
    createBoneSegment(clavicleL, new THREE.Vector3(0.16, 0, -0.01));
    const elbowL = createJoint('elbowL', 0, -0.27, 0, 0.035, shoulderL);
    createBoneSegment(shoulderL, new THREE.Vector3(0, -0.27, 0));
    const wristL = createJoint('wristL', 0, -0.25, 0, 0.028, elbowL);
    createBoneSegment(elbowL, new THREE.Vector3(0, -0.25, 0));

    const clavicleR = createJoint('clavicleR', -0.05, 0.19, 0.02, 0.03, chest);
    const shoulderR = createJoint('shoulderR', -0.16, 0, -0.01, 0.042, clavicleR);
    createBoneSegment(clavicleR, new THREE.Vector3(-0.16, 0, -0.01));
    const elbowR = createJoint('elbowR', 0, -0.27, 0, 0.035, shoulderR);
    createBoneSegment(shoulderR, new THREE.Vector3(0, -0.27, 0));
    const wristR = createJoint('wristR', 0, -0.25, 0, 0.028, elbowR);
    createBoneSegment(elbowR, new THREE.Vector3(0, -0.25, 0));

    const hipL = createJoint('hipL', 0.11, -0.04, 0, 0.045, hips);
    const kneeL = createJoint('kneeL', 0, -0.43, 0, 0.04, hipL);
    createBoneSegment(hipL, new THREE.Vector3(0, -0.43, 0));
    const ankleL = createJoint('ankleL', 0, -0.42, 0, 0.032, kneeL);
    createBoneSegment(kneeL, new THREE.Vector3(0, -0.42, 0));

    const hipR = createJoint('hipR', -0.11, -0.04, 0, 0.045, hips);
    const kneeR = createJoint('kneeR', 0, -0.43, 0, 0.04, hipR);
    createBoneSegment(hipR, new THREE.Vector3(0, -0.43, 0));
    const ankleR = createJoint('ankleR', 0, -0.42, 0, 0.032, kneeR);
    createBoneSegment(kneeR, new THREE.Vector3(0, -0.42, 0));
}
