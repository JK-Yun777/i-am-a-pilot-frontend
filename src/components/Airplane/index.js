import * as THREE from "three";

import { color } from "../../utils/color";

export function CreateAirPlane() {
  this.mesh = new THREE.Object3D();

  const cabinGeometry = new THREE.CylinderGeometry(30, 40, 80);
  const cabinMaterial = new THREE.MeshPhongMaterial({
    color: color.red,
    flatShading: true,
  });
  const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
  cabin.position.x = -10;
  cabin.rotateZ(33);
  cabin.castShadow = true;
  cabin.receiveShadow = true;
  this.mesh.add(cabin);

  const engineGeomety = new THREE.BoxGeometry(20, 50, 50);
  const engineMaterial = new THREE.MeshPhongMaterial({
    color: color.white,
    flatShading: true,
  });
  const engine = new THREE.Mesh(engineGeomety, engineMaterial);
  engine.position.x = 40;
  engine.castShadow = true;
  engine.receiveShadow = true;
  this.mesh.add(engine);

  // const tailGeometry = new THREE.ConeGeometry(11, 32);
  // const tailMaterial = new THREE.MeshPhongMaterial({
  //   color: airplan.red,
  //   flatShading: true,
  // });
  // const tail = new THREE.Mesh(tailGeometry, tailMaterial);
  // tail.position.set(-80, 6, 0);
  // tail.rotateZ(20);
  // tail.castShadow = true;
  // tail.receiveShadow = true;
  // this.mesh.add(tail);

  const wingGeometry = new THREE.BoxGeometry(40, 8, 150);
  const wingMaterial = new THREE.MeshPhongMaterial({
    color: color.red,
    flatShading: true,
  });
  const wing = new THREE.Mesh(wingGeometry, wingMaterial);
  wing.castShadow = true;
  wing.receiveShadow = true;
  this.mesh.add(wing);

  const propellerGeometry = new THREE.BoxGeometry(20, 10, 10);
  const propellerMaterial = new THREE.MeshPhongMaterial({
    color: color.brown,
    flatShading: true,
  });
  this.propeller = new THREE.Mesh(propellerGeometry, propellerMaterial);
  this.propeller.castShadow = true;
  this.propeller.receiveShadow = true;

  const propellerShaftGeom = new THREE.BoxGeometry(1, 100, 20);
  const propellerShaftMat = new THREE.MeshPhongMaterial({
    color: color.darkBrown,
    flatShading: true,
  });

  const propellerShaft = new THREE.Mesh(propellerShaftGeom, propellerShaftMat);
  propellerShaft.position.set(8, 0, 0);
  propellerShaft.castShadow = true;
  propellerShaft.receiveShadow = true;
  this.propeller.add(propellerShaft);
  this.propeller.position.set(50, 0, 0);
  this.mesh.add(this.propeller);
}
