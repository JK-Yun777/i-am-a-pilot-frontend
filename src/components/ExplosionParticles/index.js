import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";

import { color } from "../../utils/color";

const rfs = THREE.MathUtils.randFloatSpread;
const sphereGeometry = new THREE.BoxBufferGeometry(0.6, 0.6, 0.6);
const baubleMaterial = new THREE.MeshStandardMaterial({
  color: color.red,
  roughness: 0,
  envMapIntensity: 0.2,
});

function ExplosionParticles({
  mat = new THREE.Matrix4(),
  vec = new THREE.Vector3(),
}) {
  const [ref, api] = useSphere(() => ({
    args: [1],
    mass: 1,
    angularDamping: 0.1,
    linearDamping: 0.65,
    position: [rfs(-10), rfs(-10), rfs(-10)],
  }));

  useFrame(() => {
    for (let i = 0; i < 10; i++) {
      ref.current.getMatrixAt(i, mat);
      api
        .at(i)
        .applyForce(
          vec
            .setFromMatrixPosition(mat)
            .normalize()
            .multiplyScalar(20)
            .toArray(),
          [0, 0, 0]
        );
    }
  });
  return (
    <instancedMesh
      ref={ref}
      castShadow
      receiveShadow
      args={[null, null, 10]}
      geometry={sphereGeometry}
      material={baubleMaterial}
    />
  );
}

export default ExplosionParticles;
