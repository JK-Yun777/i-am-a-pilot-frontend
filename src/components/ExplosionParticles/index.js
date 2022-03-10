import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";

const rfs = THREE.MathUtils.randFloatSpread;

function ExplosionParticles({
  mat = new THREE.Matrix4(),
  vec = new THREE.Vector3(),
  color,
}) {
  const [ref, api] = useBox(() => ({
    args: [1, 1, 1],
    mass: 1,
    angularDamping: 0.2,
    linearDamping: 0.55,
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
            .multiplyScalar(30)
            .toArray(),
          [0, 0, 0]
        );
    }
  });

  return (
    <instancedMesh ref={ref} castShadow receiveShadow args={[null, null, 10]}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={color} roughness={3} />
    </instancedMesh>
  );
}

export default ExplosionParticles;
