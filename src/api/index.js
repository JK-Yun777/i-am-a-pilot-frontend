import axios from "axios";

const CLIENT_ID = process.env.REACT_APP_KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

export const getKakaoToken = async (code) => {
  const url = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${code}`;
  const result = await axios({
    url,
    method: "post",
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  return result;
};

export const kakaoLogin = async (token) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/login/kakao`;
  const result = await axios({
    url,
    method: "post",
    data: {
      token,
    },
  });

  return result;
};

export const GoogleSocialLogin = async (email) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/login/google`;
  const result = await axios({
    url,
    method: "post",
    data: {
      email,
    },
  });

  return result;
};

export const sendGameResult = async (email, distance) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/user/distance`;
  const result = await axios({
    url,
    method: "post",
    data: {
      email,
      distance,
    },
  });

  return result;
};

export const getRankList = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}/user/rank`,
    });
    return response;
  } catch (err) {
    return err.message;
  }
};
