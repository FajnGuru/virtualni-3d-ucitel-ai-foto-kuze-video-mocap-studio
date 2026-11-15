async function exportAvatarToGlb(includeAnimations = true) {
    if (!characterRoot || typeof THREE.GLTFExporter === 'undefined') {
        showToast('Chyba: GLTFExporter není načten.');
        return;
    }

    if (rigStyle !== 'skin') {
        setRigStyle('skin');
    }

    showToast(includeAnimations
        ? 'Zapékání 3D geometrie, PNG textury a 18 animací do .GLB...'
        : 'Generuji 3D model postavy s PNG texturou (.GLB)...'
    );

    jointAxesHelpers.forEach(a => {
        if (a.parent) {
            a.userData._savedParent = a.parent;
            a.parent.remove(a);
        }
    });

    const previousCanvasTex = await prepareFaceTextureForGlbExport();

    const animations = includeAnimations ? buildAllBakedThreeAnimationClips() : [];

    applyPoseToRig(createNeutralPose(), { x: 0, z: 0, yaw: 0 });
    characterRoot.updateMatrixWorld(true);

    const exporter = new THREE.GLTFExporter();
    exporter.parse(
        characterRoot,
        function (result) {
            jointAxesHelpers.forEach(a => {
                if (a.userData._savedParent) {
                    a.userData._savedParent.add(a);
                }
            });
            if (previousCanvasTex) {
                skinMaterials.face.map = previousCanvasTex;
                skinMaterials.face.needsUpdate = true;
            }

            let blob;
            if (result instanceof ArrayBuffer) {
                blob = new Blob([result], { type: 'model/gltf-binary' });
            } else {
                blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
            }

            const sizeKB = Math.round(blob.size / 1024);
            const sizeFormatted = sizeKB >= 1024
                ? `${(sizeKB / 1024).toFixed(2)} MB`
                : `${sizeKB} KB`;

            const badgeId = includeAnimations ? 'glbAnimSizeBadge' : 'glbMeshSizeBadge';
            const badgeEl = document.getElementById(badgeId);
            if (badgeEl) badgeEl.textContent = sizeFormatted;

            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const suffix = includeAnimations ? 's-animacemi' : 'cisty-model';
            link.download = `3d-postava-${avatarConfig.gender}-${suffix}.glb`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            showToast(includeAnimations
                ? `Staženo .GLB (${sizeFormatted}) včetně ${animations.length} animací!`
                : `Staženo čisté 3D .GLB postavy (${sizeFormatted})!`
            );
        },
        function (err) {
            jointAxesHelpers.forEach(a => {
                if (a.userData._savedParent) a.userData._savedParent.add(a);
            });
            if (previousCanvasTex) {
                skinMaterials.face.map = previousCanvasTex;
                skinMaterials.face.needsUpdate = true;
            }
            console.error('GLB Export Error:', err);
            showToast('Nepodařilo se exportovat .GLB soubor.');
        },
        {
            binary: true,
            onlyVisible: true,
            embedImages: true,
            animations: animations
        }
    );
}
