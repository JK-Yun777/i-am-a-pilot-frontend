import React, { useEffect } from "react";

import { Bonus } from "../components/BonusObjects";
import { useStore } from "../utils/store";

let positions = [
  [9, 5, 0],
  [-9, 10, 0],
  [29, 50, 0],
  [0, 200, 0],
  [-1, 15, 0],
  [-2, 65, -10],
  [0, 120, 0],
  [-10, 538, 0],
  [8, 5, -10],
];

function BonusObjects() {
  const distance = useStore((state) => state.distance);
  const restart = useStore((state) => state.restart);

  useEffect(() => {
    if (distance % 2) {
      positions.push([Math.random() * 20, Math.random() * 10, 0]);
    }

    positions.push([Math.random() * -20, Math.random() * 20, Math.random()]);
  }, [distance, positions]);

  useEffect(() => {
    if (restart) {
      positions = [
        [9, 5, 0],
        [-9, 10, 0],
        [29, 50, 0],
        [0, 200, 0],
        [-1, 15, 0],
        [-2, 65, -10],
        [0, 120, 0],
        [-10, 538, 0],
        [8, 5, -10],
      ];
    }
  }, [restart]);

  return (
    <>
      {positions.map((position, idx) => (
        <>
          <Bonus position={position} key={idx} />
        </>
      ))}
    </>
  );
}

export default BonusObjects;
