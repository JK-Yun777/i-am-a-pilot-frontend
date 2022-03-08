import { useFrame, useThree } from "@react-three/fiber";
import { Physics, useBox } from "@react-three/cannon";

import { useStore } from "../utils/store";

import { Plane } from "../components/Airplane";
import { useCollide } from "../components/BonusObjects";

function AirPlane() {
  const { viewport } = useThree();
  const { width, height } = viewport;
  const [, onCollide] = useCollide();
  const airplaneColor = useStore((state) => state.airplaneColor);

  const [ref, api] = useBox(() => ({
    type: "Kinematic",
    args: [2.25, 0.75, 1],
    onCollide,
  }));

  useFrame((state) => {
    api.position.set(
      state.mouse.x * (width / 2 + 2),
      state.mouse.y * (height / 2 + 2),
      0
    );

    api.rotation.set(0, 1.5, (state.mouse.x * Math.PI) / 5);
  });

  return (
    <>
      <Physics>
        <mesh ref={ref}>
          <Plane airplaneColor={airplaneColor} />
        </mesh>
      </Physics>
    </>
  );
}

export default AirPlane;
