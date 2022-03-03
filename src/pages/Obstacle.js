import Cube from "../components/Obstacle/Cube";
import Rock from "../components/Obstacle/Rock";
import Ball from "../components/Obstacle/Ball";
import Heart from "../components/Obstacle/Heart";

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
