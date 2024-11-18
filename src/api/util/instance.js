import axios from "axios";
import { interceptor } from "./interceptor";

// baseAPI 함수: 기본 Axios 인스턴스 생성
const baseAPI = (url, options = {}) => {
  return axios.create({ baseURL: url, ...options });
};

// authAPI 함수: 인증이 필요한 Axios 인스턴스 생성
const authAPI = (url, options = {}) => {
  const instance = axios.create({ baseURL: url, ...options });
  // console.log(token)
  interceptor(instance);
  return instance;
};

const API_URL = process.env.REACT_APP_API_URL;

// 인스턴스 생성
export const baseInstance = baseAPI(API_URL);
export const authInstance = authAPI(API_URL);