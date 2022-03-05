import { useBox } from "@react-three/cannon";

import { color } from "../../utils/color";

function Cube(props) {
  const [ref] = useBox(() => ({
    mass: 1,
    position: [0, 5, 0],
    rotation: [0.4, 0.2, 0.5],
    ...props,
  }));
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxGeometry />
      <meshLambertMaterial color={color.hotpink} />
    </mesh>
  );
}

export default Cube;
