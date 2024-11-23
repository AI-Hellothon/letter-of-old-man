import axios from "axios";
import { interceptor } from "./interceptor";

// baseAPI 함수: 기본 Axios 인스턴스 생성
// 기본 Axios 인스턴스 생성 함수
const baseAPI = (url, options = {}) => {
  const defaultOptions = {
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
      ...options.headers, // 사용자 정의 헤더 병합
    },
    ...options, // 나머지 옵션 병합
  };
  return axios.create(defaultOptions);
};

// authAPI 함수: 인증이 필요한 Axios 인스턴스 생성
const authAPI = (url, options = {}) => {
  const instance = axios.create({ baseURL: url, ...options });
  // console.log(token)
  interceptor(instance);
  return instance;
};

const ngrokAPI = (url, options={})=>{
  const defaultOptions = {
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "any", // ngrok 경고 우회
      ...options.headers, // 사용자 정의 헤더 병합
    },
    ...options, // 나머지 옵션 병합
  };
  return axios.create(defaultOptions);

}

const API_URL = process.env.REACT_APP_API_URL;

// 인스턴스 생성
export const baseInstance = baseAPI(API_URL);
export const authInstance = authAPI(API_URL);
export const ngrokInstance = ngrokAPI(API_URL);