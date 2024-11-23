import axios from "axios";
import { baseInstance } from "../util/instance"

export const saveChat = async({question, answer})=>{
    const response = await baseInstance.post(`/conversations`, {question: question, answer: answer});
    return response;
}

export const getChat = async(date)=>{
    const response = await baseInstance.get(`/conversations/${date}`);
    return response;
}