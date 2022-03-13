import React, { useRef } from "react";

import { Html, Float } from "@react-three/drei";
import { GoogleLogin } from "react-google-login";

import { googleSocialLogin } from "../api";
import { color } from "../utils/color";
import { Plane, Cable } from "../components/Airplane";

const CLIENT_ID = process.env.REACT_APP_KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const customBtnStyle = {
  width: "0",
  border: "none",
  cursor: "pointer",
};

const customImgStyle = {
  width: "300px",
  height: "50px",
};

function Login(props) {
  const ref = useRef();
  const plane = useRef();
  const { setGoogleEmail } = props;

  const handleGoogleLogin = async (googleResponse) => {
    const {
      profileObj: { email },
    } = googleResponse;

    localStorage.setItem("user", email);
    console.log("googleResponse>>>>>>", googleResponse);
    const result = await googleSocialLogin(email);
    console.log("회신", result);
    if (result.status === 201 || result.status === 200) {
      const user = result.data.data;
      localStorage.setItem("user", user);
      console.log("localstorage>>>>", localStorage.getItem("user"));
      setGoogleEmail(result.data.data);
    } else {
      console.log("Login failed. Please try again. Or try another email.");
    }
  };

  const handleLoginError = (err) => {
    console.log("err Detail", err);
    console.log("Login failed. Please try again. Or try another email.");
  };

  return (
    <>
      <Float scale={0.75} position={[-12, -6, 0]} rotation={[-3.8, -1.5, -9.5]}>
        <Plane ref={plane} airplaneColor={color.red} />
      </Float>
      <Float
        position={[0, 3, 0]}
        rotation={[Math.PI / 28.5, 0, 0]}
        rotationIntensity={1}
        floatIntensity={10}
        speed={0.5}
      >
        <group ref={ref} {...props} dispose={null}>
          <mesh>
            <Html
              scale={90}
              rotation={[Math.PI / 2, 0, 0]}
              position={[10, -350, 50]}
              transform
              occlude
            >
              <a href={KAKAO_AUTH_URL}>
                <div className="kakao-login-btn" />
              </a>
              <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                onSuccess={handleGoogleLogin}
                onFailure={handleLoginError}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    style={customBtnStyle}
                  >
                    <img src="/img/GoogleLoginBtn.png" style={customImgStyle} />
                  </button>
                )}
                buttonText="Login"
              />
            </Html>
          </mesh>
        </group>
      </Float>
      <Cable start={plane} end={ref} />
    </>
  );
}

export default Login;
