import * as THREE from "three";
import { TrackballControls } from "./build/jsm/controls/TrackballControls.js";
import { GLTFLoader } from "./build/jsm/loaders/GLTFLoader.js";
import {
  initRenderer,
  initDefaultSpotlight,
  onWindowResize,
} from "./libs/util/util.js";

var scene = new THREE.Scene(); // Create main scene
var light = initDefaultSpotlight(scene, new THREE.Vector3(25, 30, 20)); // Use default light
var renderer = initRenderer(); // View function in util/utils
renderer.setClearColor("rgb(30, 30, 30)");
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
camera.lookAt(0, 0, 0);
camera.position.set(5, 200, 40);
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
var axesHelper = new THREE.AxesHelper(20);
axesHelper.visible = false;
axesHelper.translateY(0.1);
scene.add(axesHelper);
let objs = [];

//----------------------------------BACKGROUND SESSION ---------------------------------------

var loader = new THREE.TextureLoader();
loader.load('./assets/img/milky_way.jpg', function ( texture ) {
  var geometry = new THREE.SphereGeometry(3000, 20, 20);
  var material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5,side: THREE.DoubleSide,});
  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
});

//------------------------------------background static --------------------------------------

// loader.load("./assets/img/milky_way.jpg", function (texture) {
//    scene.background = texture;
// });

//----------------------------------END BACKGROUND SESSION -----------------------------------

gerObj();
render();

function gerObj() {
  let loader = new GLTFLoader();
  loader.load("./assets/objs/sun/scene.gltf", function (gltf) {
    let obj = gltf.scene;
    obj.traverse(function (child) {
      if (child) child.castShadow = true;
    });
    objs.push(obj);
    scene.add(obj);
  });
}
let rote = 0.01;
function rotate() {
  objs.forEach((element) => {
    element.rotateZ(rote);
  });
}
function render() {
  rotate();
  trackballControls.update();
  light.position.set(5, 15, 40);
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
