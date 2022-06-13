import * as THREE from "three";
import { TrackballControls } from "../build/jsm/controls/TrackballControls.js";
import { GLTFLoader } from "../build/jsm/loaders/GLTFLoader.js";
import {
  initRenderer,
  onWindowResize,
  degreesToRadians,
} from "../libs/util/util.js";
import { Astro } from "./Astro.js";

//Variaveis
var loader, scene, renderer, camera, light;

//Declarações
loader = new THREE.TextureLoader();
scene = new THREE.Scene(); // Create main scene
renderer = initRenderer(); // View function in util/utils
light = new THREE.AmbientLight(0x1e1e1e); // soft white light

camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);

scene.add(light);

camera.lookAt(0, 0, 0);
camera.position.set(200, 50, 200);
camera.up.set(0, 1, 0);

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);

// Listen window size changes
window.addEventListener(
  "resize",
  function () {
    onWindowResize(camera, renderer);
  },
  false
);

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(3000);
axesHelper.visible = true;
scene.add(axesHelper);

//----------------------------------BACKGROUND SESSION ---------------------------------------

background();

//----------------------------------END BACKGROUND SESSION -----------------------------------

let sun = new Astro(scene, 0, 0, 0, 1, "../assets/objs/sun/scene.gltf");
let earth = new Astro(scene, 50, 0, 0, 0.05, "../assets/objs/earth/scene.gltf");
let mars = new Astro(scene, 70, 0, 0, 5, "../assets/objs/mars/scene.gltf");
luz(0, 0, 0);

render();

function rotate() {
  sun.rotateX(0.01);
  sun.rotateY(0.01);
  earth.rotateY(-0.25);
  earth.translate(0.3);
  mars.rotateY(-0.28);
  mars.translate(0.5);
}

function render() {
  rotate();
  trackballControls.update();
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function luz(posX, posY, posZ) {
  var spotLight = new THREE.SpotLight("rgb(255,255,255)");
  spotLight.position.copy(new THREE.Vector3(posX, posY, posZ));
  spotLight.angle = Math.PI;
  spotLight.castShadow = true;
  spotLight.penumbra = 0.1;
  scene.add(spotLight);
}

function background(){
  loader.load("../assets/img/milky_way.jpg", function (texture) {
    var geometry = new THREE.SphereGeometry(3000, 20, 20);
    var material = new THREE.MeshBasicMaterial({
      map: texture,
      overdraw: 0.5,
      side: THREE.DoubleSide,
    });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  });
}