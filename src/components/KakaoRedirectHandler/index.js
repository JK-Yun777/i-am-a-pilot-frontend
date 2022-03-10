import React, { useEffect, useState } from "react";

import { useHistory } from "react-router";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";

import Hearder from "../../components/Header";
import { getKakaoToken, kakaoLogin } from "../../api";

function KakaoRedirectHandler() {
  const [content, setContent] = useState(text);
  const text = "Loading";
  const speed = 300;
  const history = useHistory();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const timer = setInterval(() => {
      content === text + "..."
        ? setContent(content)
        : setContent((content) => content + ".");
    }, speed);

    return () => {
      clearInterval(timer);
    };
  });

  useEffect(() => {
    if (code) {
      getKakaoTokenHandler(code);
    }
  }, [code]);

  async function getKakaoTokenHandler(code) {
    try {
      const response = await getKakaoToken(code);

      const result = await kakaoLogin(response.data.access_token);

      if (result.status === 201 || result.status === 200) {
        const user = result.data.data;
        localStorage.setItem("user", user);
        history.push("/select");
      } else {
        console.log("Login failed. Please try again. Or try another email.");
      }
    } catch (err) {
      console.log(err);
    }
  }

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
      <Hearder position={[-5, 14, 0]} scale={0.001} />
      <mesh>
        <Html>
          <div className="loading-container ">
            <div className="loading">{content}</div>
          </div>
        </Html>
      </mesh>
    </Canvas>
  );
}

export default KakaoRedirectHandler;
