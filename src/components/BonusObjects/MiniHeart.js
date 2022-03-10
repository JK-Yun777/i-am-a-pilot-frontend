import React, { useMemo } from "react";

import * as THREE from "three";
import { useSphere } from "@react-three/cannon";
import { Extrude } from "@react-three/drei";

function MiniHeart(props) {
  const [ref] = useSphere(() => ({
    mass: 1,
    position: [0, 5, 0],
    rotation: [0.4, 0.2, 0.5],
    ...props,
  }));

  const extrusionProps = useMemo(() => {
    const heartShape = new THREE.Shape();

    heartShape.moveTo(0.25, 0.25);
    heartShape.bezierCurveTo(0.25, 0.25, 0.2, 0, 0, 0);
    heartShape.bezierCurveTo(-0.3, 0, -0.3, 0.35, -0.3, 0.35);
    heartShape.bezierCurveTo(-0.3, 0.55, -0.1, 0.77, 0.25, 0.95);
    heartShape.bezierCurveTo(0.6, 0.77, 0.8, 0.55, 0.8, 0.35);
    heartShape.bezierCurveTo(0.8, 0.35, 0.8, 0, 0.5, 0);
    heartShape.bezierCurveTo(0.35, 0, 0.25, 0.25, 0.25, 0.25);

    return [heartShape, { depth: 0.3, bevelEnabled: false }];
  }, []);

  return (
    <group {...props} ref={ref} dispose={null}>
      <Extrude
        rotation={[0, 0, Math.PI]}
        scale={[1, 1, 1]}
        args={extrusionProps}
        material-color={props.color}
      />
    </group>
  );
}

export default MiniHeart;
