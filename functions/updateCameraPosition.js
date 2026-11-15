function updateCameraPosition() {
    if (followCamera && characterRoot) {
        camTarget.x = THREE.MathUtils.lerp(camTarget.x, characterRoot.position.x, 0.1);
        camTarget.z = THREE.MathUtils.lerp(camTarget.z, characterRoot.position.z, 0.1);
    }
    const x = camTarget.x + camSpherical.radius * Math.sin(camSpherical.phi) * Math.sin(camSpherical.theta);
    const y = camTarget.y + camSpherical.radius * Math.cos(camSpherical.phi);
    const z = camTarget.z + camSpherical.radius * Math.sin(camSpherical.phi) * Math.cos(camSpherical.theta);
    camera.position.set(x, y, z);
    camera.lookAt(camTarget);
}
