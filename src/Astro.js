import * as THREE from "three";
import { GLTFLoader } from "../build/jsm/loaders/GLTFLoader.js";
import {scene} from "./main.js"

let loader = new GLTFLoader();

export class Astro {
  constructor(
 
    centerX,
    centerZ,
    radiusX,
    radiusZ,
    scale,
    PATH,
    yearAroundSun = 1,
    orbitSpeed = 0.00001
  ) {
    this.orbitSpeed = orbitSpeed; //Orbit Speed
    this.yearAroundSun = yearAroundSun;
    let start = 0; //Initial angle of the ellipse
    let angle = 2 * Math.PI; //Last point angle of the ellipse
    this.curve = new THREE.EllipseCurve(
      centerX,
      centerZ,
      radiusX,
      radiusZ,
      start,
      angle
    ); //Curve: {points center: centerX, centerZ},{radius length: radiusX, radiusZ}, {angles in degrees: start, angle};

    const geometry = new THREE.BufferGeometry().setFromPoints(this.curve.getSpacedPoints(200));
    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
    });

    this.orbit = new THREE.Line(geometry, material);
    this.orbit.rotateX(Math.PI / 2);
    scene.add(this.orbit);

    this.startPosition = this.curve.getPoint(0);
    const sx = this.startPosition.x;
    const sz = this.startPosition.y;

    const afterload = (object) => {
      this.obj = object;
      scene.add(this.obj);
    };

    function loaderObject3D(PATH) {
      loader.load(PATH, function (object) {
        object.scene.position.set(sx, 0, sz);
        object.scene.scale.set(scale, scale, scale);
        object.scene.traverse(function (child) {
          if (child) {
            object.scene.receiveShadow = true;
            object.scene.castShadow = true;
          }
        });

        afterload(object.scene);
      });
    }
    loaderObject3D(PATH);
  }

  updatePosition() {
    if (this.obj != undefined) {
      let time = this.orbitSpeed * performance.now();
      let position = this.curve.getPoint(
        (time % this.yearAroundSun) / this.yearAroundSun
      );
      this.obj.position.x = position.x;
      this.obj.position.z = position.y;
      this.obj.rotateY(0.01);
    }
  }
}
