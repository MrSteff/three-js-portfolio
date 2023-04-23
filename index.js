//import 'style.css'
import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { AmbientLight, Material } from 'https://unpkg.com/three/build/three.module.js';
//import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);


const material = new THREE.MeshStandardMaterial({  color: 0xFF6347});


const pointLight= new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);



const ambientlight= new THREE.AmbientLight(0xffffff);
scene.add(pointLight,ambientlight);

const lighthelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lighthelper,gridHelper); //no gridhelper



function addStar(){
  const geometry = new THREE.SphereGeometry(Math.random(), 24,24);
  const material = new THREE.MeshStandardMaterial({  color: 0xffffff});
  const star = new THREE.Mesh(geometry,material);

  const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(220));

  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('fondo2.jpg');
scene.background = spaceTexture;

const planetTexture = new THREE.TextureLoader().load('planet.jpg');
const normalTexture = new THREE.TextureLoader().load('noiseTexture.jpg');

const planet = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({map: planetTexture, normalMap: normalTexture})
);

planet.position.z=35;
planet.position.x=-5;
planet.rotation.z = 41;

// scene.add(planet);

//const controls = new OrbitControls(camera, renderer.domElement);

function moveCamera() {
   const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
   
}
const dodecahedronGeometry = new THREE.DodecahedronGeometry(5,0);
const dodecahedronMaterial = new THREE.MeshDistanceMaterial();
dodecahedronMaterial.wireframe = false;


const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial);
const geometry = new THREE.TorusGeometry(10,3,16,100);
const torus = new THREE.Mesh(geometry, material);

var orbit = new THREE.Group();
orbit.add(planet);
dodecahedron.rotation.z = 1;


orbit.add(torus);
orbit.add(camera);
scene.add(orbit);

document.body.onscroll= moveCamera;

function animate(){
  requestAnimationFrame(animate);

  
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  

  orbit.rotation.y += 0.005;

  planet.rotation.y += 0.040;
  

  renderer.render(scene, camera);
}

animate();



