import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { Canvas } from "@react-three/fiber";

import Hearder from "../components/Header";
import Login from "./Login";

function Main() {
  const [googleEmail, setGoogleEmail] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (googleEmail) {
      history.push("/select");
    }
  }, [googleEmail]);

  return (
    <Canvas
      className="canvas"
      colorManagement
      shadows
      camera={{
        position: [0, 0, 20],
        fov: 70,
      }}
    >
      <ambientLight intensity={0.5} />
      <Hearder position={[-5, 14, 0]} scale={0.001} />
      <Login
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.25, 0]}
        scale={0.015}
        setGoogleEmail={setGoogleEmail}
      />
    </Canvas>
  );
}

export default Main;
