import { useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

const CLIENT_ID = process.env.REACT_APP_KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

function Login(props) {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = -Math.PI / 1.75 + Math.cos(t / 4) / 8;
    ref.current.rotation.y = Math.sin(t / 4) / 8;
    ref.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20;
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
  });
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh>
        <Html
          scale={100}
          rotation={[Math.PI / 2, 0, 0]}
          position={[90, -350, 50]}
          transform
          occlude
        >
          <a href={KAKAO_AUTH_URL}>
            <div className="kakao-login-btn" />
          </a>
        </Html>
      </mesh>
    </group>
  );
}

export default Login;
