import React, { useEffect } from "react";

import Cube from "../components/BonusObjects/Cube";
import Rock from "../components/BonusObjects/Rock";
import Ball from "../components/BonusObjects/Ball";
import Heart from "../components/BonusObjects/Heart";

import { useStore } from "../utils/store";

const positions = [
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

function Obstacle() {
  const distance = useStore((state) => state.distance);
  useEffect(() => {
    if (distance % 2) {
      positions.push([Math.random() * 20, Math.random() * 10, 0]);
    }

    positions.push([Math.random() * -20, Math.random() * 20, Math.random()]);
  }, [distance, positions]);

  return (
    <>
      {positions.map((position, idx) => (
        <>
          <Cube position={position} key={idx} />
          <Rock position={position} key={idx + 1} />
          <Ball position={position} key={idx + 2} />
          <Heart position={position} key={idx + 3} />
        </>
      ))}
    </>
  );
}

export default Obstacle;
