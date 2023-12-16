let scene, camera, renderer, model;
let controls;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 60, 65); // Adjust camera to shift the model to the left

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('about-model').appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 0, 5);
    scene.add(directionalLight);

    const loader = new THREE.GLTFLoader();
    loader.load('assets/video/fantasy-keris/scene.gltf', function (gltf) {
        model = gltf.scene;
        scene.add(model);

        model.position.x -= 20; // Adjust this value as needed to move the model to the left

        // Update the target of the OrbitControls if used
        if (controls) {
            controls.target.set(model.position.x, model.position.y, model.position.z);
            controls.update();
        }

        // Update the center point for OrbitControls
        requestAnimationFrame(() => {
            updateOrbitControlsTarget();
        });

        animate();

    }, undefined, function (error) {
        console.error('An error happened:', error);
    });

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
}

function updateOrbitControlsTarget() {
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    controls.target.set(center.x, center.y, center.z);
    controls.update();
}

function animate() {
    requestAnimationFrame(animate);
    if (model) model.rotation.y += 0.005;
    controls.update();
    renderer.render(scene, camera);
}

function addFallbackGeometry() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
}

document.addEventListener('DOMContentLoaded', (event) => {
    init();
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
