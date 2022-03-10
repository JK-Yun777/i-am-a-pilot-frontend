import React, { useCallback, Suspense } from "react";

import { useSpring } from "@react-spring/three";

import { useStore } from "../../utils/store";
import { color } from "../../utils/color";
import Heart from "./Heart";
import MiniHeart from "./MiniHeart";

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
  const {
    position,
    miniHeartPositions,
    heartPositions,
    miniPinkHeartPositions,
  } = props;

  return (
    <Suspense fallback={null}>
      <Heart position={position} color={color.red} />
      <Heart position={heartPositions} color={color.hotpink} />
      <MiniHeart position={miniHeartPositions} color={color.hotpink} />
      <MiniHeart position={miniPinkHeartPositions} color={color.red} />
    </Suspense>
  );
}
