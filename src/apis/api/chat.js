import axios from "axios";
import { baseInstance, ngrokInstance } from "../util/instance"

export const saveChat = async({question, answer})=>{
    const response = await ngrokInstance.post(`/conversations`, {question: question, answer: answer});
    return response;
}

export const getChat = async(date)=>{
    const response = await ngrokInstance.get(`/conversations/${date}`);
    return response;
}