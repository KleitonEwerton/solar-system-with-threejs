import * as THREE from "three";
import { GLTFLoader } from "../build/jsm/loaders/GLTFLoader.js";

let loader = new GLTFLoader();

export class Astro {
  constructor(scene, posX, posY, posZ, scale, PATH) {
    //! Função auxiliar para trabalhar com a função assincrona loaderObject3D
    const afterload = (object) => {
      this.obj = object;
      scene.add(this.obj);
    };

    //! função assincrona loaderObject3D -> load objeto 3d
    function loaderObject3D(PATH) {
      loader.load(PATH, function (object) {
        object.scene.position.set(posX, posY, posZ);
        object.scene.scale.set(scale, scale, scale);
        object.receiveShadow = false;
        object.castShadow = true;
        afterload(object.scene);
      });
    }
    loaderObject3D(PATH);
  }

  getObj() {
    return this.obj;
  }
  rotateX(angle) {
    if (this.obj != undefined) this.obj.rotateX((angle * Math.PI) / 180);
  }
  rotateY(angle) {
    if (this.obj != undefined) this.obj.rotateY((angle * Math.PI) / 180);
  }
  rotateZ(angle) {
    if (this.obj != undefined) this.obj.rotateZ((angle * Math.PI) / 180);
  }
  translate(z) {
    if (this.obj != undefined) this.obj.translateZ(z);
  }
  receiveShadow(isR) {
    if (this.obj != undefined) this.obj.receiveShadow = isR;
  }
  castShadow(isC) {
    if (this.obj != undefined) this.obj.castShadow = isC;
  }
}
