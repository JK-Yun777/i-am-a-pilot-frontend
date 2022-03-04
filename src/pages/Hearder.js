import React, { useRef, useState, useMemo, useEffect } from "react";

import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

import { useStore } from "../utils/store";
import ProgressBar from "../components/ProgressBar";

function Hearder(props) {
  let initialEnergy = "85";
  const ref = useRef();
  const startTime = new Date();
  const memoizedTime = useMemo(() => startTime, [startTime]);
  const [runningTime, setRunningTime] = useState(memoizedTime);
  const [energy, setEnergy] = useState(initialEnergy);

  const points = useStore((state) => state.points);
  const distance = useStore((state) => state.distance);
  const startup = useStore((state) => state.startup);
  const getDistance = useStore((state) => state.getDistance);

  useEffect(() => {
    let interval;
    const { setRemainEnergy } = props;
    initialEnergy = Number(initialEnergy) + points * 0.5;

    if (!startup) {
      interval = setInterval(() => {
        setRunningTime(memoizedTime);
        getDistance(runningTime);
        setEnergy(initialEnergy - distance);
      }, 1000);
    }

    if (energy < 1) {
      clearInterval(interval);
    }

    setRemainEnergy(energy);

    return () => {
      clearInterval(interval);
    };
  }, [memoizedTime, points, energy]);

  useFrame(() => {
    ref.current.position.x = -5;
    ref.current.position.y = 14;
  });
  return (
    <group ref={ref} {...props}>
      <mesh>
        <Html
          scale={350}
          rotation={[Math.PI / 2, 0, 0]}
          position={[180, -350, 50]}
          transform
          occlude
        >
          <div className="header">
            <h1>I am a Pilot</h1>
            <h2>Fasten your Seat Belt</h2>
            <div className="score">
              <div className="score-content">
                <div className="score-label">distance</div>
                <div className="score-value score-value-distance">
                  {distance}
                </div>
              </div>
              <div className="score-content">
                <div className="score-label">energy</div>
                <div className="score-value score-value-energy">
                  <ProgressBar completed={energy} />
                  <div className="energy-bar"></div>
                </div>
              </div>
            </div>
          </div>
        </Html>
      </mesh>
    </group>
  );
}

export default Hearder;
