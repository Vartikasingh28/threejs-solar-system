import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Camera setup
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 3000);
camera.position.set(0, 200, 700); // Adjusted for better solar system view
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true; // Smooth camera movement
orbit.minDistance = 100;
orbit.maxDistance = 1500;
orbit.update();

// Lighting
const ambientLight = new THREE.AmbientLight(0x888888, 1.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xFFFFFF, 3, 2000);
pointLight.position.set(0, 0, 0); // Light from the Sun
scene.add(pointLight);

// Texture loader
const textureLoader = new THREE.TextureLoader();

// Sun with glowing effect
const sunGeo = new THREE.SphereGeometry(50, 32, 32);
const sunMat = new THREE.MeshBasicMaterial({ 
    map: textureLoader.load('/img/sun.jpg'),
    emissive: 0xFFFF00, // Glow effect
    emissiveIntensity: 1
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

// Create planets with real scaling and orbiting motion
const planets = [
    { name: "Mercury", size: 2, distance: 70, speed: 0.04, texture: "/img/mercury.jpg" },
    { name: "Venus", size: 6, distance: 110, speed: 0.015, texture: "/img/venus.jpg" },
    { name: "Earth", size: 6.4, distance: 150, speed: 0.01, texture: "/img/earth.jpg", hasMoon: true },
    { name: "Mars", size: 3.4, distance: 200, speed: 0.008, texture: "/img/mars.jpg" },
    { name: "Jupiter", size: 20, distance: 300, speed: 0.002, texture: "/img/jupiter.jpg" },
    { name: "Saturn", size: 18, distance: 400, speed: 0.0009, texture: "/img/saturn.jpg" },
    { name: "Uranus", size: 15, distance: 500, speed: 0.0004, texture: "/img/uranus.jpg" },
    { name: "Neptune", size: 13, distance: 600, speed: 0.0001, texture: "/img/neptune.jpg" }
];

const planetMeshes = [];
let angles = Array(planets.length).fill(0);
const moons = []; // Store moons for animation

planets.forEach((planet, index) => {
    const geo = new THREE.SphereGeometry(planet.size, 32, 32);
    const mat = new THREE.MeshPhongMaterial({
        map: textureLoader.load(planet.texture)
    });

    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);
    planetMeshes.push(mesh);

    // Adding moons (Example: Earth’s Moon)
    if (planet.hasMoon) {
        const moonGeo = new THREE.SphereGeometry(1.7, 16, 16);
        const moonMat = new THREE.MeshPhongMaterial({ color: 0xAAAAAA });
        const moonMesh = new THREE.Mesh(moonGeo, moonMat);
        moonMesh.position.set(planet.distance + 8, 0, 0);
        scene.add(moonMesh);
        moons.push({ parent: mesh, moon: moonMesh, angle: 0 });
    }
});

// Animation loop
function animate() {
    sun.rotateY(0.004); // Sun rotation

    planets.forEach((planet, index) => {
        // Self-rotation
        planetMeshes[index].rotateY(0.02);

        // Orbital rotation
        angles[index] += planet.speed;
        planetMeshes[index].position.x = planets[index].distance * Math.cos(angles[index]);
        planetMeshes[index].position.z = planets[index].distance * Math.sin(angles[index]);
    });

    // Moons orbiting around planets
    moons.forEach(moonData => {
        moonData.angle += 0.02;
        const parentPos = moonData.parent.position;
        moonData.moon.position.x = parentPos.x + 10 * Math.cos(moonData.angle);
        moonData.moon.position.z = parentPos.z + 10 * Math.sin(moonData.angle);
    });

    orbit.update();
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
