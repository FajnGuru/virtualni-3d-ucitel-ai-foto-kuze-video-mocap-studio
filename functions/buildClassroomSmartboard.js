function buildClassroomSmartboard() {
    smartboardGroup = new THREE.Group();
    smartboardGroup.position.set(0, 1.42, -0.95);
    scene.add(smartboardGroup);

    const frameMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.8 });
    const frameMesh = new THREE.Mesh(new THREE.BoxGeometry(2.55, 1.32, 0.05), frameMat);
    frameMesh.castShadow = true;
    smartboardGroup.add(frameMesh);

    smartboardCanvas = document.createElement('canvas');
    smartboardCanvas.width = 1024;
    smartboardCanvas.height = 512;
    smartboardTexture = new THREE.CanvasTexture(smartboardCanvas);

    const screenMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2.42, 1.20),
        new THREE.MeshBasicMaterial({ map: smartboardTexture })
    );
    screenMesh.position.z = 0.028;
    smartboardGroup.add(screenMesh);

    updateSmartboardTexture('Sluneční soustava a gravitace', 'Připraveno k zahájení výuky...');
}
