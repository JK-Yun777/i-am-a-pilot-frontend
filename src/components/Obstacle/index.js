import { useCallback } from "react";

import { useSpring } from "@react-spring/three";

import { useStore } from "../../utils/store";

export function useCollide(onColide) {
  const contact = useStore((state) => state.contact);
  const [{ impact }, set] = useSpring({ impact: 0 }, []);
  const event = useCallback((e) => {
    set({ impact: 10, config: { immediate: true } });
    requestAnimationFrame(() => set({ impact: 0 }));
    if (onColide) onColide(e);
    contact(e);
  }, []);

  return [impact, event];
}

// export function InstancedSpheres({ factor, speed, xFactor, yFactor, zFactor }) {
//   const [ref] = useSphere(() => ({
//     mass: 1,
//     position: [Math.random() - 0.5, Math.random() * 10, 0],
//     args: [1],
//   }));

//   useFrame((state) => {
//     const t = factor + state.clock.elapsedTime * (speed / 2);
//     ref.current.scale.setScalar(Math.max(1.5, Math.cos(t) * 5));
//     ref.current.position.set(
//       Math.cos(t) +
//         Math.sin(t * 1) / 10 +
//         xFactor +
//         Math.cos((t / 10) * factor) +
//         (Math.sin(t * 1) * factor) / 10,
//       Math.sin(t) +
//         Math.cos(t * 2) / 10 +
//         yFactor +
//         Math.sin((t / 10) * factor) +
//         (Math.cos(t * 2) * factor) / 10,
//       Math.sin(t) +
//         Math.cos(t * 2) / 10 +
//         zFactor +
//         Math.cos((t / 10) * factor) +
//         (Math.sin(t * 3) * factor) / 10
//     );
//   });

//   return (
//     <instancedMesh ref={ref} castShadow receiveShadow args={[null, null, 1]}>
//       <dodecahedronBufferGeometry args={[1, 0]} />
//       <meshPhongMaterial color={airplane.white} />
//     </instancedMesh>
//   );
// }

// function Enemy({
//   long = false,
//   right = false,
//   y = 2,
//   speed = 0.1,
//   color = "hotpink",
// }) {
//   const { viewport } = useThree();
//   const { width } = viewport;
//   const [impact, onCollide] = useCollide();
//   const [ref, api] = useBox(() => ({
//     mass: 1,
//     args: [long ? 2.25 : 1.25, 0.75, 1],
//     rotation: [0, 0, right ? 0.1 : -0.1],
//     onCollide,
//   }));
//   let initial = right ? width : -width;
//   let x = initial;
//   useFrame(() => {
//     api.position.set((x = right ? x - speed : x + speed), y, 0);
//     if (right ? x + 2 < -width / 2 : x - 2 > width / 2) x = initial;
//   });
//   return (
//     <Box
//       receiveShadow
//       castShadow
//       ref={ref}
//       args={[long ? 2.25 : 1.25, 0.75, 1]}
//     >
//       <a.meshStandardMaterial color={impact.to([0, 1], [color, "white"])} />
//     </Box>
//   );
// }

// export function Enemies() {
//   const enemies = useStore((state) => state.enemies);
//   return enemies.map((props, i) => <Enemy key={i} {...props} />);
// }
