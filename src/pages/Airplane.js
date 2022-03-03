import { useFrame, useThree } from "@react-three/fiber";
import { Physics, useBox } from "@react-three/cannon";

import { CreateAirPlane } from "../components/Airplane";
import { useCollide } from "../components/Obstacle";

const airplane = new CreateAirPlane();
airplane.mesh.scale.set(0.035, 0.035, 0.035);
airplane.mesh.rotateY(-80);

airplane.castShadow = true;

function loop() {
  airplane.propeller.rotation.x += 0.3;

  requestAnimationFrame(loop);
}

loop();

function AirPlane() {
  const { viewport } = useThree();
  const { width, height } = viewport;
  const [, onCollide] = useCollide();

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
        <primitive ref={ref} object={airplane.mesh} position={[0, 0, -1]} />
      </Physics>
    </>
  );
}

export default AirPlane;
