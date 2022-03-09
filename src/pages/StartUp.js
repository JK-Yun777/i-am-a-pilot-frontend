import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

import { StyledText } from "../utils/text";

function Startup() {
  const ref = useRef();
  useFrame((state) => {
    const s = 1 + 0.01 * (1 + Math.sin(state.clock.getElapsedTime() * 2)) * 2;
    ref.current.scale.set(s, s, s);
  });
  return (
    <group>
      <Html position={[-11, 4, 0]}>
        <div className="game-info">
          <h4>가장 멀리가는 유저가 승리하는 게임입니다.</h4>
          <br />
          <div className="game-rule">[ 게임 규칙 ]</div>
          <div className="game-rule">
            1. 마우스를 움직여 비행기를 조종할 수 있습니다.
          </div>
          <div className="game-rule">
            2. 에너지바는 시간의 경과에 따라 감소하며, 0이 되면 게임이
            종료됩니다.
          </div>
          <div className="game-rule">
            3. 쏟아지는 보너스 타겟을 터치하면 에너지가 증가합니다.
          </div>
          <div className="game-rule-volume">✅ 스피커 소리를 조절해주세요!</div>
        </div>
      </Html>
      <StyledText
        position={[0, -6.5, 1]}
        fontSize={2.5}
        ref={ref}
        children={"Click to start!"}
      />
    </group>
  );
}

export default Startup;
