import { useCallback, Suspense } from "react";

import { useSpring } from "@react-spring/three";

import { useStore } from "../../utils/store";
import Cube from "./Cube";
import Ball from "./Ball";
import Heart from "./Heart";
import Rock from "./Rock";

export function useCollide(onColide) {
  const contact = useStore((state) => state.contact);
  const [{ impact }, set] = useSpring({ impact: 0 }, []);
  const event = useCallback((e) => {
    set.start({ impact: 10, config: { immediate: true } });
    requestAnimationFrame(() => set.start({ impact: 0 }));
    if (onColide) onColide(e);
    contact(e);
  }, []);

  return [impact, event];
}

export function Bonus(props) {
  const { position } = props;
  return (
    <Suspense fallback={null}>
      <Cube position={position} />
      <Rock position={position} />
      <Ball position={position} />
      <Heart position={position} />
    </Suspense>
  );
}
