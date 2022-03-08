import React, { useRef, useState } from "react";

import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

import { color } from "../../utils/color";
import { useStore } from "../../utils/store";
import { Cabin, Engine, Wing, Propeller } from "../Airplane";

function SelectAirplaneColor() {
  const [airplaneColor, setAirplaneColor] = useState(color.red);
  const setColor = useStore((state) => state.setColor);

  const handleRed = () => {
    setAirplaneColor(color.red);
    setColor("#FF0000");
  };

  const handlePuple = () => {
    setAirplaneColor(color.puple);
    setColor("#9900FF");
  };

  const handleYellow = () => {
    setAirplaneColor(color.yellow);
    setColor("#FFFF00");
  };

  const handleBlue = () => {
    setAirplaneColor(color.blue);
    setColor("#0000FF");
  };

  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.x =
      ref.current.rotation.y =
      ref.current.rotation.z +=
        0.005;
  });

  return (
    <>
      <group scale={0.1} ref={ref} position={[-9, 0, 0]}>
        <Cabin airplaneColor={airplaneColor} />
        <Engine />
        <Wing airplaneColor={airplaneColor} />
        <Propeller />
      </group>
      <group>
        <Text position={[12, 7, 0]} scale={9} color={color.white}>
          Available Colors:
        </Text>
        <Text
          position={[8, 5, 0]}
          scale={8}
          color={color.red}
          onClick={handleRed}
        >
          RED
        </Text>
        <Text
          position={[10.5, 5, 0]}
          scale={8}
          color={color.puple}
          onClick={handlePuple}
        >
          PUPLE
        </Text>
        <Text
          position={[13.8, 5, 0]}
          scale={8}
          color={color.yellow}
          onClick={handleYellow}
        >
          YELLOW
        </Text>
        <Text
          position={[17, 5, 0]}
          scale={8}
          color={color.blue}
          onClick={handleBlue}
        >
          BLUE
        </Text>
      </group>
    </>
  );
}

// export function Cabin(props) {
//   const ref = useRef();
//   const { selectedColor } = props;
//   useFrame(() => {
//     ref.current.rotation.z = 33;
//   });
//   return (
//     <mesh castShadow receiveShadow ref={ref}>
//       <cylinderGeometry args={[30, 40, 80]} />
//       <meshPhongMaterial color={selectedColor} flatShading />
//     </mesh>
//   );
// }

// function Engine() {
//   return (
//     <mesh position-x={40} castShadow receiveShadow>
//       <boxGeometry args={[20, 50, 50]} />
//       <meshPhongMaterial color={color.white} flatShading />
//     </mesh>
//   );
// }

// function Wing(props) {
//   const { selectedColor } = props;
//   return (
//     <mesh castShadow receiveShadow>
//       <boxGeometry args={[40, 8, 150]} />
//       <meshPhongMaterial color={selectedColor} flatShading />
//     </mesh>
//   );
// }

// function Propeller() {
//   return (
//     <mesh position-x={50} castShadow receiveShadow>
//       <boxGeometry args={[20, 10, 10]} />
//       <meshPhongMaterial color={color.brown} flatShading />
//       <PropellerShaft />
//     </mesh>
//   );
// }

// function PropellerShaft() {
//   let r = useRef();
//   useFrame(() => {
//     r.current.rotation.x += 0.3;
//   });

//   return (
//     <mesh position-x={6} castShadow receiveShadow ref={r}>
//       <boxGeometry args={[1, 80, 13]} />
//       <meshPhongMaterial color={color.brown} flatShading />
//     </mesh>
//   );
// }
export default SelectAirplaneColor;
