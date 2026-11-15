window.setRigStyle = function (style) {
    rigStyle = style;
    ['skin', 'cyber', 'bones', 'xray'].forEach(s => {
        const btn = document.getElementById(`styleBtn-${s}`);
        if (!btn) return;
        btn.className = (s === style)
            ? 'px-2.5 py-1 rounded-md bg-sky-500 text-slate-950 font-semibold transition'
            : 'px-2.5 py-1 rounded-md text-slate-300 hover:text-white transition';
    });

    const { boneMat, jointMat } = rig.materials;
    if (style === 'skin') {
        boneMeshes.forEach(({ cylMesh, octMesh }) => { cylMesh.visible = false; octMesh.visible = false; });
        jointSpheres.forEach(s => { s.visible = false; });
        skinMeshes.forEach(m => { m.visible = true; });
        applyAvatarCustomization();
    } else {
        skinMeshes.forEach(m => { m.visible = false; });
        jointSpheres.forEach(s => { s.visible = true; });
        boneMat.wireframe = (style === 'xray');
        boneMat.transparent = (style !== 'cyber');
        boneMat.opacity = (style === 'xray') ? 0.45 : 0.9;
        jointMat.emissiveIntensity = (style === 'xray') ? 1.0 : 0.5;
        boneMeshes.forEach(({ cylMesh, octMesh }) => {
            cylMesh.visible = (style !== 'bones');
            octMesh.visible = (style === 'bones');
        });
    }
};
