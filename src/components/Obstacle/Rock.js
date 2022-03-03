import { useSphere } from "@react-three/cannon";
import { Sphere } from "@react-three/drei";

function Rock(props) {
  const [ref] = useSphere(() => ({
    mass: 1,
    position: [0, 5, 0],
    rotation: [0.4, 0.2, 0.5],
    ...props,
  }));
  return (
    <Sphere castShadow ref={ref} args={[1, 64, 64]}>
      <meshStandardMaterial color="red" />
    </Sphere>
  );
}

export default Rock;
