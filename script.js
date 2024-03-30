import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

console.clear();

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(30, innerWidth / innerHeight, 1, 1000);
camera.position.set(0, 10, 10).setLength(17);
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", event => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
})

let controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

let gu = {
  time: { value: 0 }
}

let params = {
  instanceCount: { value: 10 },
  instanceLength: { value: 1.75 },
  instanceGap: { value: 0.5 },
  profileFactor: { value: 1.5 }
}

let loader = new THREE.TextureLoader();
let texture = loader.load('./acapulco1.jpeg'); // Reemplaza 'path/to/your/image.jpg' con la ruta de tu imagen

let m = new THREE.MeshStandardMaterial({
  map: texture, // Aplicar la textura al material
  color: 0xffffff, // Color base del material
  roughness: 0.5, // Rugosidad del material
  metalness: 0.5 // Metalicidad del material
});

let o = new THREE.Mesh(ig, m);
scene.add(o)
o.rotation.z = -Math.PI * 0.25;

let clock = new THREE.Clock();
let t = 0;

renderer.setAnimationLoop(() => {
  let dt = clock.getDelta();
  t += dt;
  gu.time.value = t;
  controls.update();
  renderer.render(scene, camera);
})
