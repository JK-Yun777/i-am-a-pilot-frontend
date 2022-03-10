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
let miniHeartPositions = [Math.random() * 3, Math.random() * 2, 0];
let miniPinkHeartPositions = [Math.random() * -3, Math.random() * 5, 0];
let heartPositions = [Math.random() * -9, Math.random() * 20, 0];

function BonusObjects() {
  const distance = useStore((state) => state.distance);
  const restart = useStore((state) => state.restart);

  useEffect(() => {
    if (restart || positions.length > 20) {
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
      miniHeartPositions = [Math.random() * 3, Math.random() * 2, 0];
      heartPositions = [Math.random() * -9, Math.random() * 20, 0];
      miniPinkHeartPositions = [Math.random() * -3, Math.random() * 5, 0];
    }

    if (distance % 2) {
      positions.push([Math.random() * 20, Math.random() * 10, 0]);
      miniHeartPositions = [Math.random() * 3, Math.random() * 2, 0];
      heartPositions = [Math.random() * -9, Math.random() * 20, 0];
      miniPinkHeartPositions = [Math.random() * -3, Math.random() * 5, 0];
    }

    positions.push([Math.random() * -20, Math.random() * 20, Math.random()]);
    miniHeartPositions = [Math.random() * -3, Math.random() * 25, 0];
    miniPinkHeartPositions = [Math.random() * 3, Math.random() * 15, 0];
  }, [
    distance,
    positions,
    restart,
    miniHeartPositions,
    heartPositions,
    miniPinkHeartPositions,
  ]);

  return (
    <>
      {positions.map((position, idx) => (
        <Bonus
          position={position}
          key={idx}
          dispose={null}
          miniHeartPositions={miniHeartPositions}
          heartPositions={heartPositions}
          miniPinkHeartPositions={miniPinkHeartPositions}
        />
      ))}
    </>
  );
}

export default BonusObjects;
