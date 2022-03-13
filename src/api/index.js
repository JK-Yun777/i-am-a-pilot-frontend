import axios from "axios";

const CLIENT_ID = process.env.REACT_APP_KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

export const getKakaoToken = async (code) => {
  console.log("kakaoCode>>>>", code);
  const url = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${code}`;
  try {
    const result = await axios({
      url,
      method: "post",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    console.log("getKakaoTokenAPI>>>>>>", result);
    return result;
  } catch (err) {
    return err.message;
  }
};

export const kakaoLogin = async (token) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/login/kakao`;
  try {
    const result = await axios({
      url,
      method: "post",
      data: {
        token,
      },
    });
    console.log("kakaoLoginAPI>>>>>>", result);
    return result;
  } catch (err) {
    return err.message;
  }
};

export const googleSocialLogin = async (email) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/login/google`;
  try {
    const result = await axios({
      url,
      method: "post",
      data: {
        email,
      },
    });
    console.log("googleSocialLoginAPI>>>>>>", result);
    return result;
  } catch (err) {
    return err.message;
  }
};

export const sendGameResult = async (userInfo, distance) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/user/distance`;
  try {
    const result = await axios({
      url,
      method: "post",
      data: {
        userInfo,
        distance,
      },
    });

    return result;
  } catch (err) {
    return err.message;
  }
};

export const getRankList = async () => {
  try {
    const result = await axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}/user/rank`,
    });

    return result;
  } catch (err) {
    return err.message;
  }
};
